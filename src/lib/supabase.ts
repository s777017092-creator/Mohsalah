import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not configured. Using mock data mode.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types
export interface Job {
  id: number
  title: string
  company_id: number
  department: string
  location: string
  type: string
  salary_min: number
  salary_max: number
  currency: string
  description: string
  requirements: string[]
  skills: string[]
  experience: string
  education: string
  benefits: string
  company_description: string
  working_hours: string
  remote: boolean
  urgent: boolean
  featured: boolean
  status: 'pending' | 'published' | 'rejected' | 'expired'
  urgency: 'High' | 'Medium' | 'Low'
  expires_at: string
  created_at: string
  updated_at: string
  views: number
  saves: number
}

export interface Application {
  id: number
  job_id: number
  user_id: number
  status: 'pending' | 'suitable' | 'not_suitable' | 'interviewed' | 'hired'
  match_score: number
  personal_info: any
  career_prefs: any
  employment: any
  education: any
  skills: string[]
  certifications: string[]
  cover_letter: string
  resume_url: string
  created_at: string
}

export interface Company {
  id: number
  name: string
  description: string
  owner_id: number
  logo_url: string
  website: string
  industry: string
  size: string
  location: string
  created_at: string
}

export interface UserProfile {
  id: number
  user_id: number
  full_name: string
  phone: string
  location: string
  bio: string
  experience: string
  education: string
  skills: string[]
  resume_url: string
  profile_image: string
  created_at: string
}
