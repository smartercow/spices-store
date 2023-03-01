export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          city: string | null
          email: string | null
          full_name: string | null
          id: string
          mobile_number: string | null
          street: string | null
          updated_at: string | null
          user_info_added: boolean
          zip_code: string | null
        }
        Insert: {
          city?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          mobile_number?: string | null
          street?: string | null
          updated_at?: string | null
          user_info_added?: boolean
          zip_code?: string | null
        }
        Update: {
          city?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          mobile_number?: string | null
          street?: string | null
          updated_at?: string | null
          user_info_added?: boolean
          zip_code?: string | null
        }
      }
      categories: {
        Row: {
          created_at: string
          description: string
          id: number
          image: string
          name: string
          path: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string
          id?: number
          image?: string
          name?: string
          path?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          image?: string
          name?: string
          path?: string
          updated_at?: string | null
        }
      }
      featured: {
        Row: {
          created_at: string | null
          id: number
          name: string
          path: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string
          path?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          path?: string
          updated_at?: string | null
        }
      }
      products: {
        Row: {
          category_id: number | null
          description: string | null
          featured_in: number | null
          id: number
          name: string | null
          preview: string | null
          price: number
          sale: boolean | null
          sale_price: number | null
          sale_text: string | null
          stock: number | null
        }
        Insert: {
          category_id?: number | null
          description?: string | null
          featured_in?: number | null
          id?: number
          name?: string | null
          preview?: string | null
          price?: number
          sale?: boolean | null
          sale_price?: number | null
          sale_text?: string | null
          stock?: number | null
        }
        Update: {
          category_id?: number | null
          description?: string | null
          featured_in?: number | null
          id?: number
          name?: string | null
          preview?: string | null
          price?: number
          sale?: boolean | null
          sale_price?: number | null
          sale_text?: string | null
          stock?: number | null
        }
      }
      test: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
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
