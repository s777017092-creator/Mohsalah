/**
 * Advanced Search Service
 * Provides intelligent search and filtering capabilities
 */

export interface SearchFilters {
  query?: string
  location?: string[]
  jobTypes?: string[]
  experienceLevels?: string[]
  salaryRange?: {
    min?: number
    max?: number
  }
  remote?: boolean
  skills?: string[]
  industries?: string[]
  companySize?: string[]
  postedWithin?: number // days
  sortBy?: 'relevance' | 'date' | 'salary' | 'match_score'
  page?: number
  limit?: number
}

export interface SearchResult<T> {
  items: T[]
  total: number
  page: number
  totalPages: number
  facets?: SearchFacets
}

export interface SearchFacets {
  locations: { value: string; count: number }[]
  jobTypes: { value: string; count: number }[]
  experienceLevels: { value: string; count: number }[]
  skills: { value: string; count: number }[]
  industries: { value: string; count: number }[]
  salaryRanges: { range: string; count: number }[]
}

export interface SavedSearch {
  id: string
  userId: string
  name: string
  filters: SearchFilters
  notifyOnNewResults: boolean
  createdAt: Date
  lastChecked?: Date
}

class SearchService {
  /**
   * Build search query
   */
  buildQuery(filters: SearchFilters): string {
    const parts: string[] = []

    if (filters.query) {
      parts.push(`query:"${filters.query}"`)
    }

    if (filters.location && filters.location.length > 0) {
      parts.push(`location:[${filters.location.join(',')}]`)
    }

    if (filters.jobTypes && filters.jobTypes.length > 0) {
      parts.push(`type:[${filters.jobTypes.join(',')}]`)
    }

    if (filters.remote !== undefined) {
      parts.push(`remote:${filters.remote}`)
    }

    if (filters.skills && filters.skills.length > 0) {
      parts.push(`skills:[${filters.skills.join(',')}]`)
    }

    if (filters.salaryRange) {
      if (filters.salaryRange.min) {
        parts.push(`salary_min:${filters.salaryRange.min}`)
      }
      if (filters.salaryRange.max) {
        parts.push(`salary_max:${filters.salaryRange.max}`)
      }
    }

    return parts.join(' AND ')
  }

  /**
   * Parse search query into filters
   */
  parseQuery(query: string): Partial<SearchFilters> {
    const filters: Partial<SearchFilters> = {}

    // Extract location
    const locationMatch = query.match(/location:(?:\[([^\]]+)\]|(\S+))/i)
    if (locationMatch) {
      filters.location = locationMatch[1]?.split(',') || [locationMatch[2]]
    }

    // Extract job types
    const typeMatch = query.match(/type:(?:\[([^\]]+)\]|(\S+))/i)
    if (typeMatch) {
      filters.jobTypes = typeMatch[1]?.split(',') || [typeMatch[2]]
    }

    // Extract remote
    const remoteMatch = query.match(/remote:(true|false)/i)
    if (remoteMatch) {
      filters.remote = remoteMatch[1].toLowerCase() === 'true'
    }

    // Extract skills
    const skillsMatch = query.match(/skills:\[([^\]]+)\]/i)
    if (skillsMatch) {
      filters.skills = skillsMatch[1].split(',').map(s => s.trim())
    }

    // Extract salary range
    const salaryMinMatch = query.match(/salary_min:(\d+)/i)
    const salaryMaxMatch = query.match(/salary_max:(\d+)/i)
    if (salaryMinMatch || salaryMaxMatch) {
      filters.salaryRange = {
        min: salaryMinMatch ? parseInt(salaryMinMatch[1]) : undefined,
        max: salaryMaxMatch ? parseInt(salaryMaxMatch[1]) : undefined,
      }
    }

    // Extract plain text query (everything not matched above)
    const cleanQuery = query
      .replace(/location:(?:\[[^\]]+\]|\S+)/gi, '')
      .replace(/type:(?:\[[^\]]+\]|\S+)/gi, '')
      .replace(/remote:(true|false)/gi, '')
      .replace(/skills:\[[^\]]+\]/gi, '')
      .replace(/salary_min:\d+/gi, '')
      .replace(/salary_max:\d+/gi, '')
      .trim()

    if (cleanQuery) {
      filters.query = cleanQuery
    }

    return filters
  }

  /**
   * Get search suggestions
   */
  async getSuggestions(partial: string, type: 'all' | 'jobs' | 'companies' | 'skills' = 'all'): Promise<{
    jobs?: string[]
    companies?: string[]
    skills?: string[]
    locations?: string[]
  }> {
    // Mock implementation - in production, this would query the database
    const suggestions: any = {}

    if (type === 'all' || type === 'jobs') {
      suggestions.jobs = this.mockJobSuggestions.filter(s =>
        s.toLowerCase().includes(partial.toLowerCase())
      ).slice(0, 5)
    }

    if (type === 'all' || type === 'companies') {
      suggestions.companies = this.mockCompanySuggestions.filter(s =>
        s.toLowerCase().includes(partial.toLowerCase())
      ).slice(0, 5)
    }

    if (type === 'all' || type === 'skills') {
      suggestions.skills = this.mockSkillSuggestions.filter(s =>
        s.toLowerCase().includes(partial.toLowerCase())
      ).slice(0, 5)
    }

    if (type === 'all') {
      suggestions.locations = this.mockLocationSuggestions.filter(s =>
        s.toLowerCase().includes(partial.toLowerCase())
      ).slice(0, 5)
    }

    return suggestions
  }

  /**
   * Get popular searches
   */
  async getPopularSearches(limit = 10): Promise<string[]> {
    return this.mockPopularSearches.slice(0, limit)
  }

  /**
   * Get trending skills
   */
  async getTrendingSkills(limit = 20): Promise<{ skill: string; trend: number }[]> {
    return this.mockTrendingSkills.slice(0, limit)
  }

  /**
   * Save search
   */
  async saveSearch(search: Omit<SavedSearch, 'id' | 'createdAt'>): Promise<SavedSearch> {
    const savedSearch: SavedSearch = {
      ...search,
      id: `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    }

    // In production, save to database
    const saved = this.getSavedSearches(search.userId)
    saved.push(savedSearch)
    localStorage.setItem(`saved_searches_${search.userId}`, JSON.stringify(saved))

    return savedSearch
  }

  /**
   * Get saved searches
   */
  getSavedSearches(userId: string): SavedSearch[] {
    try {
      const saved = localStorage.getItem(`saved_searches_${userId}`)
      if (saved) {
        return JSON.parse(saved).map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          lastChecked: s.lastChecked ? new Date(s.lastChecked) : undefined,
        }))
      }
    } catch (error) {
      console.error('Error loading saved searches:', error)
    }
    return []
  }

  /**
   * Delete saved search
   */
  deleteSavedSearch(userId: string, searchId: string): void {
    const saved = this.getSavedSearches(userId).filter(s => s.id !== searchId)
    localStorage.setItem(`saved_searches_${userId}`, JSON.stringify(saved))
  }

  /**
   * Get search history
   */
  getSearchHistory(userId: string, limit = 10): string[] {
    try {
      const history = localStorage.getItem(`search_history_${userId}`)
      if (history) {
        return JSON.parse(history).slice(0, limit)
      }
    } catch (error) {
      console.error('Error loading search history:', error)
    }
    return []
  }

  /**
   * Add to search history
   */
  addToSearchHistory(userId: string, query: string): void {
    try {
      const history = this.getSearchHistory(userId, 50)
      
      // Remove duplicates
      const filtered = history.filter(q => q !== query)
      filtered.unshift(query)

      localStorage.setItem(`search_history_${userId}`, JSON.stringify(filtered.slice(0, 50)))
    } catch (error) {
      console.error('Error saving search history:', error)
    }
  }

  /**
   * Clear search history
   */
  clearSearchHistory(userId: string): void {
    localStorage.removeItem(`search_history_${userId}`)
  }

  /**
   * Build filter counts/facets
   */
  buildFacets(items: any[]): SearchFacets {
    const facets: SearchFacets = {
      locations: [],
      jobTypes: [],
      experienceLevels: [],
      skills: [],
      industries: [],
      salaryRanges: [],
    }

    // Count locations
    const locationCounts = new Map<string, number>()
    items.forEach(item => {
      if (item.location) {
        locationCounts.set(item.location, (locationCounts.get(item.location) || 0) + 1)
      }
    })
    facets.locations = Array.from(locationCounts.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count)

    // Count job types
    const typeCounts = new Map<string, number>()
    items.forEach(item => {
      if (item.type) {
        typeCounts.set(item.type, (typeCounts.get(item.type) || 0) + 1)
      }
    })
    facets.jobTypes = Array.from(typeCounts.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count)

    // Count skills
    const skillCounts = new Map<string, number>()
    items.forEach(item => {
      if (item.skills && Array.isArray(item.skills)) {
        item.skills.forEach((skill: string) => {
          skillCounts.set(skill, (skillCounts.get(skill) || 0) + 1)
        })
      }
    })
    facets.skills = Array.from(skillCounts.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20)

    return facets
  }

  // Mock data
  private mockJobSuggestions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Data Scientist',
    'UI/UX Designer',
    'Product Manager',
    'Marketing Manager',
    'Sales Representative',
    'Business Analyst',
  ]

  private mockCompanySuggestions = [
    'TechCorp Solutions',
    'Growth Marketing Agency',
    'Creative Design Studio',
    'Innovation Labs',
    'Digital Dynamics',
  ]

  private mockSkillSuggestions = [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'AWS',
    'Docker',
    'Kubernetes',
    'SQL',
  ]

  private mockLocationSuggestions = [
    'Dubai, UAE',
    'Riyadh, Saudi Arabia',
    'Cairo, Egypt',
    'Kuwait City, Kuwait',
    'Amman, Jordan',
    'Doha, Qatar',
    'Remote',
  ]

  private mockPopularSearches = [
    'React Developer',
    'Product Manager',
    'Data Scientist',
    'DevOps Engineer',
    'UI/UX Designer',
    'Marketing Manager',
    'Full Stack Developer',
    'Business Analyst',
    'Sales Manager',
    'Project Manager',
  ]

  private mockTrendingSkills = [
    { skill: 'React', trend: 23.4 },
    { skill: 'TypeScript', trend: 45.2 },
    { skill: 'AWS', trend: 28.9 },
    { skill: 'Docker', trend: 34.1 },
    { skill: 'Kubernetes', trend: 52.3 },
    { skill: 'Python', trend: 15.3 },
    { skill: 'Node.js', trend: 18.7 },
    { skill: 'GraphQL', trend: 67.8 },
    { skill: 'Go', trend: 78.4 },
    { skill: 'Rust', trend: 124.5 },
  ]
}

// Export singleton instance
export const searchService = new SearchService()
export default searchService
