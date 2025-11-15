import { supabase } from './supabase'
import type { Job, Application, Company, UserProfile } from './supabase'
import { aiMatchingService } from '../services/aiMatchingService'
import { notificationService } from '../services/notificationService'

// Helper function to check if Supabase is connected
const isSupabaseConnected = () => !!supabase

// Jobs API
export const jobsApi = {
  // Get all published jobs
  async getAll(filters?: { location?: string; type?: string; search?: string }) {
    if (!isSupabaseConnected()) {
      return getMockJobs()
    }

    try {
      let query = supabase!
        .from('jobs')
        .select('*, companies(*)')
        .eq('status', 'published')

      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`)
      }
      if (filters?.type) {
        query = query.eq('type', filters.type)
      }
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      const { data, error } = await query

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching jobs:', error)
      return getMockJobs()
    }
  },

  // Get job by ID
  async getById(id: number) {
    if (!isSupabaseConnected()) {
      return getMockJobs().find(job => job.id === id)
    }

    try {
      const { data, error } = await supabase!
        .from('jobs')
        .select('*, companies(*)')
        .eq('id', id)
        .single()

      if (error) throw error

      // Increment view count
      await supabase!
        .from('jobs')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', id)

      return data
    } catch (error) {
      console.error('Error fetching job:', error)
      return null
    }
  },

  // Create new job
  async create(jobData: Partial<Job>) {
    if (!isSupabaseConnected()) {
      console.warn('Supabase not connected. Job will not be saved.')
      return { success: false, message: 'Database not connected' }
    }

    try {
      const { data, error } = await supabase!
        .from('jobs')
        .insert({
          ...jobData,
          status: 'pending', // All jobs start as pending
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('Error creating job:', error)
      return { success: false, message: error.message }
    }
  },

  // Update job
  async update(id: number, updates: Partial<Job>) {
    if (!isSupabaseConnected()) {
      return { success: false, message: 'Database not connected' }
    }

    try {
      const { data, error } = await supabase!
        .from('jobs')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('Error updating job:', error)
      return { success: false, message: error.message }
    }
  },

  // Delete job
  async delete(id: number) {
    if (!isSupabaseConnected()) {
      return { success: false, message: 'Database not connected' }
    }

    try {
      const { error } = await supabase!
        .from('jobs')
        .delete()
        .eq('id', id)

      if (error) throw error
      return { success: true }
    } catch (error: any) {
      console.error('Error deleting job:', error)
      return { success: false, message: error.message }
    }
  },

  // Get jobs by employer
  async getByEmployer(userId: number) {
    if (!isSupabaseConnected()) {
      return getMockJobs().slice(0, 3)
    }

    try {
      const { data, error } = await supabase!
        .from('jobs')
        .select('*, companies!inner(*)')
        .eq('companies.owner_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching employer jobs:', error)
      return []
    }
  },

  // Get pending jobs (admin only)
  async getPending() {
    if (!isSupabaseConnected()) {
      return getMockJobs().filter(job => job.status === 'pending')
    }

    try {
      const { data, error } = await supabase!
        .from('jobs')
        .select('*, companies(*)')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching pending jobs:', error)
      return []
    }
  }
}

// Applications API
export const applicationsApi = {
  // Submit application
  async create(applicationData: Partial<Application>) {
    if (!isSupabaseConnected()) {
      console.warn('Supabase not connected. Application will not be saved.')
      return { success: false, message: 'Database not connected' }
    }

    try {
      const { data, error } = await supabase!
        .from('applications')
        .insert({
          ...applicationData,
          status: 'pending',
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('Error creating application:', error)
      return { success: false, message: error.message }
    }
  },

  // Get applications for a job
  async getByJob(jobId: number) {
    if (!isSupabaseConnected()) {
      return getMockApplications()
    }

    try {
      const { data, error } = await supabase!
        .from('applications')
        .select('*, users(*), user_profiles(*)')
        .eq('job_id', jobId)
        .order('match_score', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching applications:', error)
      return []
    }
  },

  // Get applications by user
  async getByUser(userId: number) {
    if (!isSupabaseConnected()) {
      return getMockApplications()
    }

    try {
      const { data, error } = await supabase!
        .from('applications')
        .select('*, jobs(*, companies(*))')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching user applications:', error)
      return []
    }
  },

  // Update application status
  async updateStatus(id: number, status: Application['status']) {
    if (!isSupabaseConnected()) {
      return { success: false, message: 'Database not connected' }
    }

    try {
      const { data, error } = await supabase!
        .from('applications')
        .update({ status })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('Error updating application status:', error)
      return { success: false, message: error.message }
    }
  },

  // Get all applications (admin)
  async getAll() {
    if (!isSupabaseConnected()) {
      return getMockApplications()
    }

    try {
      const { data, error } = await supabase!
        .from('applications')
        .select('*, jobs(*, companies(*)), users(*), user_profiles(*)')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching all applications:', error)
      return []
    }
  }
}

// Stats API
export const statsApi = {
  // Get platform stats (admin)
  async getPlatformStats() {
    if (!isSupabaseConnected()) {
      return getMockStats()
    }

    try {
      const [
        { count: totalUsers },
        { count: activeJobs },
        { count: totalApplications },
        { count: totalCompanies }
      ] = await Promise.all([
        supabase!.from('users').select('*', { count: 'exact', head: true }),
        supabase!.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase!.from('applications').select('*', { count: 'exact', head: true }),
        supabase!.from('companies').select('*', { count: 'exact', head: true })
      ])

      return {
        totalUsers: totalUsers || 0,
        activeJobs: activeJobs || 0,
        totalApplications: totalApplications || 0,
        totalCompanies: totalCompanies || 0
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      return getMockStats()
    }
  },

  // Get employer stats
  async getEmployerStats(userId: number) {
    if (!isSupabaseConnected()) {
      return {
        activeJobs: 12,
        totalApplications: 247,
        newApplications: 18,
        suitableApplicants: 42
      }
    }

    try {
      // Get employer's company
      const { data: company } = await supabase!
        .from('companies')
        .select('id')
        .eq('owner_id', userId)
        .single()

      if (!company) return { activeJobs: 0, totalApplications: 0, newApplications: 0, suitableApplicants: 0 }

      // Get jobs count
      const { count: activeJobs } = await supabase!
        .from('jobs')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', company.id)
        .eq('status', 'published')

      // Get applications count
      const { data: jobs } = await supabase!
        .from('jobs')
        .select('id')
        .eq('company_id', company.id)

      const jobIds = jobs?.map(j => j.id) || []

      const [
        { count: totalApplications },
        { count: suitableApplicants }
      ] = await Promise.all([
        supabase!.from('applications').select('*', { count: 'exact', head: true }).in('job_id', jobIds),
        supabase!.from('applications').select('*', { count: 'exact', head: true }).in('job_id', jobIds).eq('status', 'suitable')
      ])

      return {
        activeJobs: activeJobs || 0,
        totalApplications: totalApplications || 0,
        newApplications: 0, // Would need timestamp logic
        suitableApplicants: suitableApplicants || 0
      }
    } catch (error) {
      console.error('Error fetching employer stats:', error)
      return { activeJobs: 0, totalApplications: 0, newApplications: 0, suitableApplicants: 0 }
    }
  },

  // Get seeker stats
  async getSeekerStats(userId: number) {
    if (!isSupabaseConnected()) {
      return {
        applicationsSubmitted: 18,
        interviewsScheduled: 3,
        profileViews: 127,
        savedJobs: 12
      }
    }

    try {
      const [
        { count: applicationsSubmitted },
        { count: interviewsScheduled },
        { count: savedJobs }
      ] = await Promise.all([
        supabase!.from('applications').select('*', { count: 'exact', head: true }).eq('user_id', userId),
        supabase!.from('applications').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('status', 'interviewed'),
        supabase!.from('saved_jobs').select('*', { count: 'exact', head: true }).eq('user_id', userId)
      ])

      return {
        applicationsSubmitted: applicationsSubmitted || 0,
        interviewsScheduled: interviewsScheduled || 0,
        profileViews: 0, // Would need tracking
        savedJobs: savedJobs || 0
      }
    } catch (error) {
      console.error('Error fetching seeker stats:', error)
      return { applicationsSubmitted: 0, interviewsScheduled: 0, profileViews: 0, savedJobs: 0 }
    }
  }
}

// Mock data for when Supabase is not connected
function getMockJobs(): any[] {
  return [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: { name: 'TechCorp Solutions', logo_url: '' },
      department: 'Engineering',
      location: 'Dubai, UAE',
      type: 'Full-time',
      salary_min: 15000,
      salary_max: 25000,
      currency: 'AED',
      description: 'Join our innovative tech team...',
      requirements: ['React', 'Node.js', 'TypeScript'],
      skills: ['React', 'Node.js', 'TypeScript', '5+ years experience'],
      status: 'published',
      urgency: 'High',
      remote: true,
      featured: true,
      views: 328,
      saves: 89,
      created_at: new Date().toISOString()
    }
  ]
}

function getMockApplications(): any[] {
  return [
    {
      id: 1,
      job_id: 1,
      user_id: 1,
      status: 'pending',
      match_score: 92,
      personal_info: {
        fullName: 'أحمد محمد علي',
        email: 'ahmed@example.com',
        phone: '+966501234567'
      },
      created_at: new Date().toISOString()
    }
  ]
}

function getMockStats() {
  return {
    totalUsers: 25420,
    activeJobs: 3847,
    totalApplications: 15680,
    totalCompanies: 1892
  }
}
