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
      league_teams: {
        Row: {
          league_id: string
          registration_date: string
          team_id: string
        }
        Insert: {
          league_id: string
          registration_date?: string
          team_id: string
        }
        Update: {
          league_id?: string
          registration_date?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "league_teams_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "league_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      leagues: {
        Row: {
          created_at: string | null
          current_teams: number
          description: string | null
          end_date: string
          id: string
          max_teams: number
          name: string
          organizer_id: string
          region: Database["public"]["Enums"]["riot_region"]
          start_date: string
          status: Database["public"]["Enums"]["tournament_status"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_teams?: number
          description?: string | null
          end_date: string
          id?: string
          max_teams: number
          name: string
          organizer_id: string
          region: Database["public"]["Enums"]["riot_region"]
          start_date: string
          status?: Database["public"]["Enums"]["tournament_status"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_teams?: number
          description?: string | null
          end_date?: string
          id?: string
          max_teams?: number
          name?: string
          organizer_id?: string
          region?: Database["public"]["Enums"]["riot_region"]
          start_date?: string
          status?: Database["public"]["Enums"]["tournament_status"]
          updated_at?: string | null
        }
        Relationships: []
      }
      matches: {
        Row: {
          created_at: string | null
          end_time: string | null
          id: string
          round: number
          start_time: string
          status: Database["public"]["Enums"]["tournament_status"]
          team1_id: string
          team2_id: string
          tournament_id: string
          updated_at: string | null
          winner_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_time?: string | null
          id?: string
          round: number
          start_time: string
          status?: Database["public"]["Enums"]["tournament_status"]
          team1_id: string
          team2_id: string
          tournament_id: string
          updated_at?: string | null
          winner_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_time?: string | null
          id?: string
          round?: number
          start_time?: string
          status?: Database["public"]["Enums"]["tournament_status"]
          team1_id?: string
          team2_id?: string
          tournament_id?: string
          updated_at?: string | null
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_team1_id_fkey"
            columns: ["team1_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team2_id_fkey"
            columns: ["team2_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      org_members: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["org_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id: string
          role: Database["public"]["Enums"]["org_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["org_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          contact_email: string | null
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          contact_email?: string | null
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          contact_email?: string | null
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      players: {
        Row: {
          created_at: string | null
          id: string
          profile_id: string
          rank: Database["public"]["Enums"]["player_rank"] | null
          region: Database["public"]["Enums"]["riot_region"]
          role: Database["public"]["Enums"]["player_role"]
          summoner_name: string
          team_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          profile_id: string
          rank?: Database["public"]["Enums"]["player_rank"] | null
          region: Database["public"]["Enums"]["riot_region"]
          role: Database["public"]["Enums"]["player_role"]
          summoner_name: string
          team_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          profile_id?: string
          rank?: Database["public"]["Enums"]["player_rank"] | null
          region?: Database["public"]["Enums"]["riot_region"]
          role?: Database["public"]["Enums"]["player_role"]
          summoner_name?: string
          team_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "players_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          puuid: string | null
          region: Database["public"]["Enums"]["riot_region"] | null
          summoner_name: string | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          puuid?: string | null
          region?: Database["public"]["Enums"]["riot_region"] | null
          summoner_name?: string | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          puuid?: string | null
          region?: Database["public"]["Enums"]["riot_region"] | null
          summoner_name?: string | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      staff_members: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          role: Database["public"]["Enums"]["staff_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role: Database["public"]["Enums"]["staff_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role?: Database["public"]["Enums"]["staff_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          captain_id: string
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          organization_id: string | null
          region: Database["public"]["Enums"]["riot_region"]
          tag: string
          updated_at: string | null
        }
        Insert: {
          captain_id: string
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          organization_id?: string | null
          region: Database["public"]["Enums"]["riot_region"]
          tag: string
          updated_at?: string | null
        }
        Update: {
          captain_id?: string
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          organization_id?: string | null
          region?: Database["public"]["Enums"]["riot_region"]
          tag?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_teams: {
        Row: {
          registration_date: string
          team_id: string
          tournament_id: string
        }
        Insert: {
          registration_date?: string
          team_id: string
          tournament_id: string
        }
        Update: {
          registration_date?: string
          team_id?: string
          tournament_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_teams_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          created_at: string | null
          current_teams: number
          description: string | null
          end_date: string
          id: string
          max_teams: number
          name: string
          organizer_id: string
          region: Database["public"]["Enums"]["riot_region"]
          start_date: string
          status: Database["public"]["Enums"]["tournament_status"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_teams?: number
          description?: string | null
          end_date: string
          id?: string
          max_teams: number
          name: string
          organizer_id: string
          region: Database["public"]["Enums"]["riot_region"]
          start_date: string
          status?: Database["public"]["Enums"]["tournament_status"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_teams?: number
          description?: string | null
          end_date?: string
          id?: string
          max_teams?: number
          name?: string
          organizer_id?: string
          region?: Database["public"]["Enums"]["riot_region"]
          start_date?: string
          status?: Database["public"]["Enums"]["tournament_status"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_manage_team: {
        Args: {
          team_id: string
          user_id: string
        }
        Returns: boolean
      }
      can_team_join_tournament: {
        Args: {
          team_id: string
          tournament_id: string
        }
        Returns: boolean
      }
      create_initial_owner: {
        Args: {
          owner_id: string
        }
        Returns: undefined
      }
      is_org_admin: {
        Args: {
          org_id: string
          user_id: string
        }
        Returns: boolean
      }
      is_owner: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      is_platform_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      is_super_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      is_tournament_registration_open: {
        Args: {
          tournament_id: string
        }
        Returns: boolean
      }
      uuid_generate_v1: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uuid_generate_v1mc: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uuid_generate_v3: {
        Args: {
          namespace: string
          name: string
        }
        Returns: string
      }
      uuid_generate_v4: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uuid_generate_v5: {
        Args: {
          namespace: string
          name: string
        }
        Returns: string
      }
      uuid_nil: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uuid_ns_dns: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uuid_ns_oid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uuid_ns_url: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uuid_ns_x500: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      org_role: "org_owner" | "org_manager" | "org_staff"
      player_rank:
        | "iron"
        | "bronze"
        | "silver"
        | "gold"
        | "platinum"
        | "emerald"
        | "diamond"
        | "master"
        | "grandmaster"
        | "challenger"
      player_role: "top" | "jungle" | "mid" | "adc" | "support" | "substitute"
      riot_region:
        | "BR"
        | "EUN"
        | "EUW"
        | "LAN"
        | "LAS"
        | "NA"
        | "OCE"
        | "RU"
        | "TR"
        | "JP"
        | "KR"
        | "PH"
        | "SG"
        | "TH"
        | "TW"
        | "VN"
      staff_role:
        | "owner"
        | "platform_admin"
        | "customer_service"
        | "tournament_director"
        | "tournament_coordinator"
        | "league_director"
        | "league_coordinator"
      tournament_status:
        | "draft"
        | "registration"
        | "in_progress"
        | "completed"
        | "cancelled"
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
