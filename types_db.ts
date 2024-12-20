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
      attachments: {
        Row: {
          created_at: string | null
          creator_id: string | null
          file_name: string | null
          file_url: string
          id: number
          post_id: number
          post_seq: number
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          file_name?: string | null
          file_url: string
          id?: number
          post_id: number
          post_seq: number
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          file_name?: string | null
          file_url?: string
          id?: number
          post_id?: number
          post_seq?: number
        }
        Relationships: [
          {
            foreignKeyName: "attachments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_likes: {
        Row: {
          created_at: string
          creator_id: string
          id: number
        }
        Insert: {
          created_at?: string
          creator_id?: string
          id: number
        }
        Update: {
          created_at?: string
          creator_id?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "comment_likes_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          comment: string | null
          created_at: string | null
          creator_id: string | null
          id: number
          modified_at: string | null
          parent_id: number | null
          post_id: number
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          creator_id?: string | null
          id?: number
          modified_at?: string | null
          parent_id?: number | null
          post_id: number
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          creator_id?: string | null
          id?: number
          modified_at?: string | null
          parent_id?: number | null
          post_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "comments_creator_id_fkey1"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string | null
          follow_st: boolean | null
          follower_id: string
          following_id: string
        }
        Insert: {
          created_at?: string | null
          follow_st?: boolean | null
          follower_id: string
          following_id: string
        }
        Update: {
          created_at?: string | null
          follow_st?: boolean | null
          follower_id?: string
          following_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey1"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey1"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      message: {
        Row: {
          created_at: string
          id: number
          is_deleted: boolean
          message: string
          receiver: string
          sender: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_deleted?: boolean
          message: string
          receiver: string
          sender?: string
        }
        Update: {
          created_at?: string
          id?: number
          is_deleted?: boolean
          message?: string
          receiver?: string
          sender?: string
        }
        Relationships: []
      }
      movie: {
        Row: {
          id: number
          image_url: string
          overview: string
          popularity: number
          release_date: string
          title: string
          vote_average: number
        }
        Insert: {
          id?: number
          image_url: string
          overview: string
          popularity: number
          release_date: string
          title: string
          vote_average: number
        }
        Update: {
          id?: number
          image_url?: string
          overview?: string
          popularity?: number
          release_date?: string
          title?: string
          vote_average?: number
        }
        Relationships: []
      }
      post_likes: {
        Row: {
          created_at: string
          creator_id: string
          id: number
        }
        Insert: {
          created_at?: string
          creator_id?: string
          id: number
        }
        Update: {
          created_at?: string
          creator_id?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          creator_id: string
          id: number
          modified_at: string
          modifier_id: string
        }
        Insert: {
          content: string
          created_at?: string
          creator_id?: string
          id?: number
          modified_at?: string
          modifier_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          creator_id?: string
          id?: number
          modified_at?: string
          modifier_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_creator_id_fkey1"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_modifier_id_fkey1"
            columns: ["modifier_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          id: string
          name: string | null
          profile_img_url: string | null
          secret_tp: boolean | null
        }
        Insert: {
          id: string
          name?: string | null
          profile_img_url?: string | null
          secret_tp?: boolean | null
        }
        Update: {
          id?: string
          name?: string | null
          profile_img_url?: string | null
          secret_tp?: boolean | null
        }
        Relationships: []
      }
      todo: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: number
          title: string | null
          updated_at: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: number
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: number
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_info: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          name: string
          profile_img_url: string
          post_count: number
          follow_count: number
          following_count: number
          secret_tp: boolean
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
