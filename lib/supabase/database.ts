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
      new_orders: {
        Row: {
          account: string | null
          created_at: string | null
          delivery: number
          id: number
          order_number: number
          order_products: Json | null
          order_total_price: number
        }
        Insert: {
          account?: string | null
          created_at?: string | null
          delivery?: number
          id?: number
          order_number?: number
          order_products?: Json | null
          order_total_price?: number
        }
        Update: {
          account?: string | null
          created_at?: string | null
          delivery?: number
          id?: number
          order_number?: number
          order_products?: Json | null
          order_total_price?: number
        }
      }
      orders: {
        Row: {
          account: string
          created_at: string | null
          delivery: number
          id: number
          order_number: number
          products: number[]
          total_price: number
        }
        Insert: {
          account: string
          created_at?: string | null
          delivery: number
          id?: number
          order_number?: number
          products: number[]
          total_price?: number
        }
        Update: {
          account?: string
          created_at?: string | null
          delivery?: number
          id?: number
          order_number?: number
          products?: number[]
          total_price?: number
        }
      }
      products: {
        Row: {
          category_id: number
          description: string | null
          featured_in: number | null
          id: number
          name: string
          preview: string
          price: number
          sale: boolean | null
          sale_price: number | null
          sale_text: string | null
          stock: number | null
        }
        Insert: {
          category_id?: number
          description?: string | null
          featured_in?: number | null
          id?: number
          name?: string
          preview?: string
          price?: number
          sale?: boolean | null
          sale_price?: number | null
          sale_text?: string | null
          stock?: number | null
        }
        Update: {
          category_id?: number
          description?: string | null
          featured_in?: number | null
          id?: number
          name?: string
          preview?: string
          price?: number
          sale?: boolean | null
          sale_price?: number | null
          sale_text?: string | null
          stock?: number | null
        }
      }
      shipping: {
        Row: {
          created_at: string | null
          id: number
          name: string
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string
          type?: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          type?: string
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
