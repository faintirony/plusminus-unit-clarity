import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Типы для TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      marketplace_credentials: {
        Row: {
          id: string
          user_id: string
          marketplace: 'wildberries' | 'ozon'
          encrypted_api_key: string
          is_valid: boolean
          last_validated_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          marketplace: 'wildberries' | 'ozon'
          encrypted_api_key: string
          is_valid?: boolean
          last_validated_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          marketplace?: 'wildberries' | 'ozon'
          encrypted_api_key?: string
          is_valid?: boolean
          last_validated_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          user_id: string
          marketplace: 'wildberries' | 'ozon'
          sku: string
          name: string
          current_price: number | null
          cost_price: number | null
          commission: number | null
          logistics_cost: number | null
          advertising_cost: number | null
          margin_rub: number | null
          margin_percent: number | null
          is_profitable: boolean | null
          is_active: boolean
          last_synced_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          marketplace: 'wildberries' | 'ozon'
          sku: string
          name: string
          current_price?: number | null
          cost_price?: number | null
          commission?: number | null
          logistics_cost?: number | null
          advertising_cost?: number | null
          is_active?: boolean
          last_synced_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          marketplace?: 'wildberries' | 'ozon'
          sku?: string
          name?: string
          current_price?: number | null
          cost_price?: number | null
          commission?: number | null
          logistics_cost?: number | null
          advertising_cost?: number | null
          is_active?: boolean
          last_synced_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      sales_data: {
        Row: {
          id: string
          product_id: string
          date: string
          revenue: number
          quantity: number
          returns: number
          ad_spend: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          date: string
          revenue?: number
          quantity?: number
          returns?: number
          ad_spend?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          date?: string
          revenue?: number
          quantity?: number
          returns?: number
          ad_spend?: number
          created_at?: string
        }
      }
      sync_logs: {
        Row: {
          id: string
          user_id: string
          marketplace: 'wildberries' | 'ozon' | null
          status: 'pending' | 'running' | 'completed' | 'failed'
          started_at: string
          completed_at: string | null
          products_synced: number
          error_message: string | null
          metadata: any | null
        }
        Insert: {
          id?: string
          user_id: string
          marketplace?: 'wildberries' | 'ozon' | null
          status: 'pending' | 'running' | 'completed' | 'failed'
          started_at?: string
          completed_at?: string | null
          products_synced?: number
          error_message?: string | null
          metadata?: any | null
        }
        Update: {
          id?: string
          user_id?: string
          marketplace?: 'wildberries' | 'ozon' | null
          status?: 'pending' | 'running' | 'completed' | 'failed'
          started_at?: string
          completed_at?: string | null
          products_synced?: number
          error_message?: string | null
          metadata?: any | null
        }
      }
      filter_presets: {
        Row: {
          id: string
          user_id: string
          name: string
          filters: any
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          filters: any
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          filters?: any
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_user_metrics: {
        Args: {
          user_uuid: string
        }
        Returns: {
          total_products: number
          profitable_products: number
          unprofitable_products: number
          avg_margin_percent: number
          total_revenue_today: number
        }[]
      }
      search_products: {
        Args: {
          user_uuid: string
          search_term?: string
          marketplace_filter?: 'wildberries' | 'ozon' | null
          min_margin?: number | null
          max_margin?: number | null
          only_unprofitable?: boolean
        }
        Returns: Database['public']['Tables']['products']['Row'][]
      }
    }
    Enums: {
      marketplace_type: 'wildberries' | 'ozon'
      sync_status_type: 'pending' | 'running' | 'completed' | 'failed'
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']