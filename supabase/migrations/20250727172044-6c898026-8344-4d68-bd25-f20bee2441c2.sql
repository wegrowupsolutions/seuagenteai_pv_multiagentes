-- PHASE 1: EMERGENCY DATABASE SECURITY FIXES

-- 1. First, enable RLS on tables that don't have it
ALTER TABLE public.agente_afiliado_base_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agente_afiliado_mensagens ENABLE ROW LEVEL SECURITY;

-- 2. Create user roles enum and profiles table for proper authentication
CREATE TYPE public.app_role AS ENUM ('admin', 'business_user', 'user');

-- 3. Create profiles table with proper user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Create security definer functions to prevent RLS recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.has_role(_role app_role)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = _role
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- 5. Create function to check if user owns a record by remotejid
CREATE OR REPLACE FUNCTION public.user_owns_remotejid(_remotejid TEXT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = auth.uid() 
    AND p.email = _remotejid
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- 6. Drop all existing dangerous policies and create secure ones

-- Drop existing policies on all tables
DROP POLICY IF EXISTS "ALL" ON public.afiliado;
DROP POLICY IF EXISTS "ALL" ON public.agendamentos;
DROP POLICY IF EXISTS "ALL" ON public.assistants_portfolio;
DROP POLICY IF EXISTS "ALL" ON public.cliente01_petrobras_base_leads;
DROP POLICY IF EXISTS "ALL" ON public.cliente01_petrobras_mensagens;
DROP POLICY IF EXISTS "ALL" ON public.leads_portifolio;
DROP POLICY IF EXISTS "ALL" ON public.lista_tools;

-- 7. Create secure RLS policies for profiles table
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role('admin'));

-- 8. Create secure policies for business data tables

-- Agendamentos (appointments) - users can only see their own
CREATE POLICY "Users can view their own appointments"
  ON public.agendamentos FOR SELECT
  USING (public.user_owns_remotejid(remotejid) OR public.has_role('admin'));

CREATE POLICY "Users can insert their own appointments"
  ON public.agendamentos FOR INSERT
  WITH CHECK (public.user_owns_remotejid(remotejid) OR public.has_role('admin'));

CREATE POLICY "Users can update their own appointments"
  ON public.agendamentos FOR UPDATE
  USING (public.user_owns_remotejid(remotejid) OR public.has_role('admin'));

CREATE POLICY "Users can delete their own appointments"
  ON public.agendamentos FOR DELETE
  USING (public.user_owns_remotejid(remotejid) OR public.has_role('admin'));

-- Leads portfolio - business users and admins only
CREATE POLICY "Business users can view leads"
  ON public.leads_portifolio FOR SELECT
  USING (public.has_role('business_user') OR public.has_role('admin'));

CREATE POLICY "Business users can manage leads"
  ON public.leads_portifolio FOR ALL
  USING (public.has_role('business_user') OR public.has_role('admin'));

-- AI Assistants - admin only
CREATE POLICY "Admins can manage assistants"
  ON public.assistants_portfolio FOR ALL
  USING (public.has_role('admin'));

-- Tools list - admin only
CREATE POLICY "Admins can manage tools"
  ON public.lista_tools FOR ALL
  USING (public.has_role('admin'));

-- Message tables - users can only see their own conversations
CREATE POLICY "Users can view their own messages - afiliado"
  ON public.agente_afiliado_mensagens FOR SELECT
  USING (public.user_owns_remotejid(remotejid) OR public.has_role('admin'));

CREATE POLICY "Users can insert their own messages - afiliado"
  ON public.agente_afiliado_mensagens FOR INSERT
  WITH CHECK (public.user_owns_remotejid(remotejid) OR public.has_role('admin'));

CREATE POLICY "Users can view their own messages - petrobras"
  ON public.cliente01_petrobras_mensagens FOR SELECT
  USING (public.user_owns_remotejid(remotejid) OR public.has_role('admin'));

CREATE POLICY "Users can insert their own messages - petrobras"
  ON public.cliente01_petrobras_mensagens FOR INSERT
  WITH CHECK (public.user_owns_remotejid(remotejid) OR public.has_role('admin'));

-- Lead tables - business users and admins only
CREATE POLICY "Business users can view leads - afiliado"
  ON public.agente_afiliado_base_leads FOR SELECT
  USING (public.has_role('business_user') OR public.has_role('admin'));

CREATE POLICY "Business users can manage leads - afiliado"
  ON public.agente_afiliado_base_leads FOR ALL
  USING (public.has_role('business_user') OR public.has_role('admin'));

CREATE POLICY "Business users can view leads - petrobras"
  ON public.cliente01_petrobras_base_leads FOR SELECT
  USING (public.has_role('business_user') OR public.has_role('admin'));

CREATE POLICY "Business users can manage leads - petrobras"
  ON public.cliente01_petrobras_base_leads FOR ALL
  USING (public.has_role('business_user') OR public.has_role('admin'));

-- Afiliado table - admin only for now (contains passwords)
CREATE POLICY "Admins can manage affiliates"
  ON public.afiliado FOR ALL
  USING (public.has_role('admin'));

-- 9. Create trigger to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email),
    'user'::app_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 10. Create function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();