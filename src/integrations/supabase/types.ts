export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      contrast_analyses: {
        Row: {
          color_pairs: Json
          id: string
          screenshot: string
          summary: Json
          timestamp: string
          url: string
        }
        Insert: {
          color_pairs: Json
          id?: string
          screenshot: string
          summary: Json
          timestamp?: string
          url: string
        }
        Update: {
          color_pairs?: Json
          id?: string
          screenshot?: string
          summary?: Json
          timestamp?: string
          url?: string
        }
        Relationships: []
      }
      Dzesa: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          created_at: string | null
          html_content: string
          id: string
          name: string
          subject: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          html_content: string
          id?: string
          name: string
          subject: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          html_content?: string
          id?: string
          name?: string
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      eportfolios: {
        Row: {
          certifications: string[] | null
          created_at: string | null
          education: Json[] | null
          experience: Json[] | null
          id: string
          publications: Json[] | null
          skills: string[] | null
          summary: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          certifications?: string[] | null
          created_at?: string | null
          education?: Json[] | null
          experience?: Json[] | null
          id?: string
          publications?: Json[] | null
          skills?: string[] | null
          summary?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          certifications?: string[] | null
          created_at?: string | null
          education?: Json[] | null
          experience?: Json[] | null
          id?: string
          publications?: Json[] | null
          skills?: string[] | null
          summary?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      error_logs: {
        Row: {
          context: Json | null
          error_message: string
          id: string
          stack_trace: string | null
          timestamp: string | null
          user_info: Json | null
        }
        Insert: {
          context?: Json | null
          error_message: string
          id?: string
          stack_trace?: string | null
          timestamp?: string | null
          user_info?: Json | null
        }
        Update: {
          context?: Json | null
          error_message?: string
          id?: string
          stack_trace?: string | null
          timestamp?: string | null
          user_info?: Json | null
        }
        Relationships: []
      }
      external_submissions: {
        Row: {
          created_at: string | null
          external_service: string
          id: string
          response: Json | null
          status: string
          submission_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          external_service: string
          id?: string
          response?: Json | null
          status: string
          submission_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          external_service?: string
          id?: string
          response?: Json | null
          status?: string
          submission_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "external_submissions_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "foster_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      foster_submissions: {
        Row: {
          calculations: Json | null
          children_data: Json
          created_at: string | null
          id: string
          status: string | null
          synced: boolean | null
          updated_at: string | null
          user_info: Json
        }
        Insert: {
          calculations?: Json | null
          children_data: Json
          created_at?: string | null
          id?: string
          status?: string | null
          synced?: boolean | null
          updated_at?: string | null
          user_info: Json
        }
        Update: {
          calculations?: Json | null
          children_data?: Json
          created_at?: string | null
          id?: string
          status?: string | null
          synced?: boolean | null
          updated_at?: string | null
          user_info?: Json
        }
        Relationships: []
      }
      jobs: {
        Row: {
          certifications: string | null
          company: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          description: string
          experience: string | null
          id: string
          location: string
          rejection_reason: string | null
          salary: string | null
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          type: string | null
          updated_at: string | null
          user_id: string | null
          work_arrangement: string
        }
        Insert: {
          certifications?: string | null
          company: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description: string
          experience?: string | null
          id?: string
          location: string
          rejection_reason?: string | null
          salary?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
          work_arrangement: string
        }
        Update: {
          certifications?: string | null
          company?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string
          experience?: string | null
          id?: string
          location?: string
          rejection_reason?: string | null
          salary?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
          work_arrangement?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_profile_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mapping_collections: {
        Row: {
          array_mappers: Json | null
          created_at: string
          description: string | null
          edges: Json
          id: string
          name: string
          nodes: Json
          source_json: string
          target_json: string
          template_variables: Json | null
          transforms: Json
          updated_at: string
        }
        Insert: {
          array_mappers?: Json | null
          created_at?: string
          description?: string | null
          edges: Json
          id?: string
          name: string
          nodes: Json
          source_json: string
          target_json: string
          template_variables?: Json | null
          transforms: Json
          updated_at?: string
        }
        Update: {
          array_mappers?: Json | null
          created_at?: string
          description?: string | null
          edges?: Json
          id?: string
          name?: string
          nodes?: Json
          source_json?: string
          target_json?: string
          template_variables?: Json | null
          transforms?: Json
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string | null
          full_name: string | null
          id: string
          is_employer: boolean | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          is_employer?: boolean | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_employer?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      requests: {
        Row: {
          config: Json
          error: string | null
          id: string
          response: Json | null
          timestamp: number
        }
        Insert: {
          config: Json
          error?: string | null
          id: string
          response?: Json | null
          timestamp: number
        }
        Update: {
          config?: Json
          error?: string | null
          id?: string
          response?: Json | null
          timestamp?: number
        }
        Relationships: []
      }
      theme_configuration: {
        Row: {
          colors: Json
          created_at: string | null
          id: string
          is_active: boolean | null
          mode: Database["public"]["Enums"]["theme_mode"]
          name: string
          updated_at: string | null
        }
        Insert: {
          colors: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          mode: Database["public"]["Enums"]["theme_mode"]
          name: string
          updated_at?: string | null
        }
        Update: {
          colors?: Json
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          mode?: Database["public"]["Enums"]["theme_mode"]
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string | null
        }
        Relationships: []
      }
      webhook_configs: {
        Row: {
          collection_id: string
          created_at: string
          enabled: boolean
          endpoint: string
          headers: Json
          id: string
          method: string
          name: string
          updated_at: string
        }
        Insert: {
          collection_id: string
          created_at?: string
          enabled?: boolean
          endpoint: string
          headers?: Json
          id?: string
          method: string
          name: string
          updated_at?: string
        }
        Update: {
          collection_id?: string
          created_at?: string
          enabled?: boolean
          endpoint?: string
          headers?: Json
          id?: string
          method?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_configs_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "mapping_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_scripts: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          script: string
          updated_at: string | null
          webhook_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          script: string
          updated_at?: string | null
          webhook_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          script?: string
          updated_at?: string | null
          webhook_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhook_scripts_webhook_id_fkey"
            columns: ["webhook_id"]
            isOneToOne: false
            referencedRelation: "webhooks"
            referencedColumns: ["id"]
          },
        ]
      }
      webhooks: {
        Row: {
          body_template: Json | null
          created_at: string | null
          description: string | null
          headers: Json | null
          id: string
          method: string
          name: string
          query_params: Json | null
          requires_auth: boolean | null
          updated_at: string | null
          url: string
        }
        Insert: {
          body_template?: Json | null
          created_at?: string | null
          description?: string | null
          headers?: Json | null
          id?: string
          method: string
          name: string
          query_params?: Json | null
          requires_auth?: boolean | null
          updated_at?: string | null
          url: string
        }
        Update: {
          body_template?: Json | null
          created_at?: string | null
          description?: string | null
          headers?: Json | null
          id?: string
          method?: string
          name?: string
          query_params?: Json | null
          requires_auth?: boolean | null
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      whitelabel_settings: {
        Row: {
          company_name: string
          created_at: string | null
          email_template: string | null
          id: string
          logo_url: string | null
          primary_color: string
          tooltip_content: Json | null
          updated_at: string | null
          welcome_message: string | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          email_template?: string | null
          id?: string
          logo_url?: string | null
          primary_color?: string
          tooltip_content?: Json | null
          updated_at?: string | null
          welcome_message?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          email_template?: string | null
          id?: string
          logo_url?: string | null
          primary_color?: string
          tooltip_content?: Json | null
          updated_at?: string | null
          welcome_message?: string | null
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
      app_role: "admin" | "user" | "superadmin"
      job_status: "pending" | "approved" | "rejected"
      theme_mode: "light" | "dark"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
