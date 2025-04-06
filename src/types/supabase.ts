export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          email: string
          role: 'admin' | 'operator'
          assigned_belt: string | null
          last_login: string | null
          status: 'active' | 'inactive'
          created_at: string
          approval_status: 'pending' | 'approved' | 'rejected'
          full_name: string
        }
        Insert: {
          id?: string
          username: string
          email: string
          role: 'admin' | 'operator'
          assigned_belt?: string | null
          last_login?: string | null
          status?: 'active' | 'inactive'
          created_at?: string
          approval_status?: 'pending' | 'approved' | 'rejected'
          full_name: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          role?: 'admin' | 'operator'
          assigned_belt?: string | null
          last_login?: string | null
          status?: 'active' | 'inactive'
          created_at?: string
          approval_status?: 'pending' | 'approved' | 'rejected'
          full_name?: string
        }
      }
      sorting_results: {
        Row: {
          id: string
          item_type: 'plastic' | 'non-plastic'
          confidence: number
          image_url: string | null
          timestamp: string
          belt_id: string
          created_at: string
        }
        Insert: {
          id?: string
          item_type: 'plastic' | 'non-plastic'
          confidence: number
          image_url?: string | null
          timestamp?: string
          belt_id: string
          created_at?: string
        }
        Update: {
          id?: string
          item_type?: 'plastic' | 'non-plastic'
          confidence?: number
          image_url?: string | null
          timestamp?: string
          belt_id?: string
          created_at?: string
        }
      }
      conveyor_belts: {
        Row: {
          id: string
          name: string
          status: 'active' | 'inactive' | 'maintenance'
          speed: number
          camera_quality: string
          camera_zoom: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          status?: 'active' | 'inactive' | 'maintenance'
          speed?: number
          camera_quality?: string
          camera_zoom?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          status?: 'active' | 'inactive' | 'maintenance'
          speed?: number
          camera_quality?: string
          camera_zoom?: number
          created_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          title: string
          message: string
          type: 'error' | 'warning' | 'info' | 'success'
          source: string
          is_read: boolean
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          message: string
          type: 'error' | 'warning' | 'info' | 'success'
          source: string
          is_read?: boolean
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          message?: string
          type?: 'error' | 'warning' | 'info' | 'success'
          source?: string
          is_read?: boolean
          timestamp?: string
          created_at?: string
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
  }
}
