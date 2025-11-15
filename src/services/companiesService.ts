/**
 * Companies Service
 * Manages company profiles and information
 */

import { supabase } from '../lib/supabase'

export interface Company {
  id: number
  owner_id: string
  name: string
  description: string
  logo_url?: string
  cover_image?: string
  website?: string
  industry: string
  company_size: string
  location: string
  founded_year?: number
  email?: string
  phone?: string
  linkedin_url?: string
  twitter_url?: string
  facebook_url?: string
  is_verified: boolean
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  created_at: string
  updated_at: string
}

export interface CompanyStats {
  activeJobs: number
  totalApplications: number
  totalViews: number
  averageRating: number
  reviewCount: number
}

class CompaniesService {
  /**
   * Get all companies
   */
  async getAll(filters?: {
    industry?: string
    location?: string
    size?: string
    search?: string
  }): Promise<Company[]> {
    if (!supabase) {
      return this.getMockCompanies()
    }

    try {
      let query = supabase.from('companies').select('*').eq('status', 'approved')

      if (filters?.industry) {
        query = query.eq('industry', filters.industry)
      }
      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`)
      }
      if (filters?.size) {
        query = query.eq('company_size', filters.size)
      }
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      const { data, error } = await query

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching companies:', error)
      return this.getMockCompanies()
    }
  }

  /**
   * Get company by ID
   */
  async getById(id: number): Promise<Company | null> {
    if (!supabase) {
      return this.getMockCompanies()[0]
    }

    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching company:', error)
      return null
    }
  }

  /**
   * Get company by owner ID
   */
  async getByOwnerId(ownerId: string): Promise<Company | null> {
    if (!supabase) {
      return this.getMockCompanies()[0]
    }

    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('owner_id', ownerId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching company by owner:', error)
      return null
    }
  }

  /**
   * Create new company
   */
  async create(companyData: Partial<Company>): Promise<{ success: boolean; data?: Company; error?: string }> {
    if (!supabase) {
      return { success: false, error: 'Database not connected' }
    }

    try {
      const { data, error } = await supabase
        .from('companies')
        .insert({
          ...companyData,
          status: 'pending',
          is_verified: false,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('Error creating company:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Update company
   */
  async update(
    id: number,
    updates: Partial<Company>
  ): Promise<{ success: boolean; data?: Company; error?: string }> {
    if (!supabase) {
      return { success: false, error: 'Database not connected' }
    }

    try {
      const { data, error } = await supabase
        .from('companies')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      console.error('Error updating company:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Delete company
   */
  async delete(id: number): Promise<{ success: boolean; error?: string }> {
    if (!supabase) {
      return { success: false, error: 'Database not connected' }
    }

    try {
      const { error } = await supabase.from('companies').delete().eq('id', id)

      if (error) throw error
      return { success: true }
    } catch (error: any) {
      console.error('Error deleting company:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Get company statistics
   */
  async getStats(companyId: number): Promise<CompanyStats> {
    if (!supabase) {
      return {
        activeJobs: 12,
        totalApplications: 247,
        totalViews: 3456,
        averageRating: 4.2,
        reviewCount: 89,
      }
    }

    try {
      // Get active jobs
      const { count: activeJobs } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId)
        .eq('status', 'published')

      // Get total applications
      const { data: jobs } = await supabase
        .from('jobs')
        .select('id')
        .eq('company_id', companyId)

      const jobIds = jobs?.map(j => j.id) || []

      const { count: totalApplications } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .in('job_id', jobIds)

      // Get total views
      const { count: totalViews } = await supabase
        .from('job_views')
        .select('*', { count: 'exact', head: true })
        .in('job_id', jobIds)

      // Get average rating
      const { data: reviews } = await supabase
        .from('company_reviews')
        .select('rating')
        .eq('company_id', companyId)

      const averageRating =
        reviews && reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0

      return {
        activeJobs: activeJobs || 0,
        totalApplications: totalApplications || 0,
        totalViews: totalViews || 0,
        averageRating: Math.round(averageRating * 10) / 10,
        reviewCount: reviews?.length || 0,
      }
    } catch (error) {
      console.error('Error fetching company stats:', error)
      return {
        activeJobs: 0,
        totalApplications: 0,
        totalViews: 0,
        averageRating: 0,
        reviewCount: 0,
      }
    }
  }

  /**
   * Get companies pending approval
   */
  async getPendingApprovals(): Promise<Company[]> {
    if (!supabase) {
      return []
    }

    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching pending companies:', error)
      return []
    }
  }

  /**
   * Approve company
   */
  async approve(companyId: number): Promise<{ success: boolean; error?: string }> {
    return this.update(companyId, { status: 'approved' })
  }

  /**
   * Reject company
   */
  async reject(companyId: number): Promise<{ success: boolean; error?: string }> {
    return this.update(companyId, { status: 'rejected' })
  }

  /**
   * Verify company
   */
  async verify(companyId: number): Promise<{ success: boolean; error?: string }> {
    return this.update(companyId, { is_verified: true })
  }

  /**
   * Get featured companies
   */
  async getFeatured(limit = 6): Promise<Company[]> {
    if (!supabase) {
      return this.getMockCompanies().slice(0, limit)
    }

    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('status', 'approved')
        .eq('is_verified', true)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching featured companies:', error)
      return []
    }
  }

  /**
   * Search companies
   */
  async search(query: string): Promise<Company[]> {
    if (!supabase) {
      return this.getMockCompanies().filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    }

    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('status', 'approved')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,industry.ilike.%${query}%`)
        .limit(20)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error searching companies:', error)
      return []
    }
  }

  /**
   * Get industries list
   */
  getIndustries(): string[] {
    return [
      'Technology',
      'Finance',
      'Healthcare',
      'Education',
      'Retail',
      'Manufacturing',
      'Telecommunications',
      'Energy',
      'Transportation',
      'Real Estate',
      'Media & Entertainment',
      'Hospitality',
      'Construction',
      'Consulting',
      'Legal',
      'Marketing & Advertising',
      'E-commerce',
      'Automotive',
      'Aerospace',
      'Agriculture',
    ]
  }

  /**
   * Get company sizes
   */
  getCompanySizes(): string[] {
    return [
      '1-10 employees',
      '11-50 employees',
      '51-200 employees',
      '201-500 employees',
      '501-1000 employees',
      '1001-5000 employees',
      '5001+ employees',
    ]
  }

  /**
   * Mock companies data
   */
  private getMockCompanies(): Company[] {
    return [
      {
        id: 1,
        owner_id: '1',
        name: 'TechCorp Solutions',
        description:
          'Leading technology company specializing in innovative software solutions and digital transformation.',
        logo_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
        website: 'https://techcorp.example.com',
        industry: 'Technology',
        company_size: '201-500 employees',
        location: 'Dubai, UAE',
        founded_year: 2015,
        email: 'hr@techcorp.example.com',
        phone: '+971 4 123 4567',
        is_verified: true,
        status: 'approved',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        owner_id: '2',
        name: 'Growth Marketing Agency',
        description:
          'Full-service digital marketing agency helping businesses grow through innovative strategies.',
        logo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        website: 'https://growthagency.example.com',
        industry: 'Marketing & Advertising',
        company_size: '51-200 employees',
        location: 'Riyadh, Saudi Arabia',
        founded_year: 2018,
        email: 'careers@growthagency.example.com',
        is_verified: true,
        status: 'approved',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]
  }
}

// Export singleton instance
export const companiesService = new CompaniesService()
export default companiesService
