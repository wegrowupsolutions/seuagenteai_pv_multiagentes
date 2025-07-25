export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agendamentos: {
        Row: {
          data_cancela: string | null
          data_fim: string | null
          data_inicio: string | null
          data_lembre1: string | null
          data_lembre2: string | null
          evento_id: string | null
          id: number
          nome: string | null
          remotejid: string | null
          servico: string | null
          status_agendamento: string | null
          url_agenda: string | null
        }
        Insert: {
          data_cancela?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          data_lembre1?: string | null
          data_lembre2?: string | null
          evento_id?: string | null
          id?: number
          nome?: string | null
          remotejid?: string | null
          servico?: string | null
          status_agendamento?: string | null
          url_agenda?: string | null
        }
        Update: {
          data_cancela?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          data_lembre1?: string | null
          data_lembre2?: string | null
          evento_id?: string | null
          id?: number
          nome?: string | null
          remotejid?: string | null
          servico?: string | null
          status_agendamento?: string | null
          url_agenda?: string | null
        }
        Relationships: []
      }
      assistants_portfolio: {
        Row: {
          assistant_id: string | null
          id: number
          model: string | null
          nome_agente: string | null
          prompt_agente: string | null
          temperatura: number | null
          tools: Json | null
        }
        Insert: {
          assistant_id?: string | null
          id: number
          model?: string | null
          nome_agente?: string | null
          prompt_agente?: string | null
          temperatura?: number | null
          tools?: Json | null
        }
        Update: {
          assistant_id?: string | null
          id?: number
          model?: string | null
          nome_agente?: string | null
          prompt_agente?: string | null
          temperatura?: number | null
          tools?: Json | null
        }
        Relationships: []
      }
      cliente01_petrobras_base_leads: {
        Row: {
          id: number
          name: string | null
          remotejid: string | null
          timestamp: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          remotejid?: string | null
          timestamp?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          remotejid?: string | null
          timestamp?: string | null
        }
        Relationships: []
      }
      cliente01_petrobras_mensagens: {
        Row: {
          conversation_history: Json | null
          id: number
          remotejid: string | null
          timestamp: string | null
        }
        Insert: {
          conversation_history?: Json | null
          id?: number
          remotejid?: string | null
          timestamp?: string | null
        }
        Update: {
          conversation_history?: Json | null
          id?: number
          remotejid?: string | null
          timestamp?: string | null
        }
        Relationships: []
      }
      leads_portifolio: {
        Row: {
          id: string
          nome_completo: string | null
          possui_thread: string | null
          sessionID: string | null
          telefone: string | null
          thread_id: string | null
          timestamp: string | null
        }
        Insert: {
          id: string
          nome_completo?: string | null
          possui_thread?: string | null
          sessionID?: string | null
          telefone?: string | null
          thread_id?: string | null
          timestamp?: string | null
        }
        Update: {
          id?: string
          nome_completo?: string | null
          possui_thread?: string | null
          sessionID?: string | null
          telefone?: string | null
          thread_id?: string | null
          timestamp?: string | null
        }
        Relationships: []
      }
      lista_tools: {
        Row: {
          description: string | null
          id: number
          name: string | null
          tool: Json | null
          type: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          name?: string | null
          tool?: Json | null
          type?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          name?: string | null
          tool?: Json | null
          type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
