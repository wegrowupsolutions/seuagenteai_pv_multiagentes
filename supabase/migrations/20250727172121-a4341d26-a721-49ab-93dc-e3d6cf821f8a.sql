-- Fix function search path security warnings

-- Update functions with proper search path
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE
SET search_path = ''
AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.has_role(_role app_role)
RETURNS BOOLEAN 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.user_owns_remotejid(_remotejid TEXT)
RETURNS BOOLEAN 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = auth.uid() 
    AND p.email = _remotejid
  );
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email),
    'user'::public.app_role
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;