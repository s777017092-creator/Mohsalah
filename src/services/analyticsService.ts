/**
 * Analytics Service
 * Provides comprehensive analytics for recruitment platform
 */

export interface DashboardStats {
  totalJobs: number
  activeJobs: number
  totalApplications: number
  totalCandidates: number
  avgMatchScore: number
  successRate: number
  growthRate: number
}

export interface JobAnalytics {
  jobId: number
  views: number
  applications: number
  conversionRate: number
  avgMatchScore: number
  topSkills: string[]
  avgTimeToApply: number
  applicantDemographics: {
    location: Map<string, number>
    experience: Map<string, number>
    education: Map<string, number>
  }
}

export interface CandidateAnalytics {
  profileViews: number
  applicationsSent: number
  averageMatchScore: number
  interviewRate: number
  responseRate: number
  topMatchedSkills: string[]
  suggestedImprovements: string[]
}

export interface TimeSeriesData {
  date: string
  value: number
}

export interface TrendData {
  label: string
  current: number
  previous: number
  change: number
  changePercent: number
  trend: 'up' | 'down' | 'stable'
}

class AnalyticsService {
  /**
   * Get dashboard statistics
   */
  async getDashboardStats(userId?: string, role?: string): Promise<DashboardStats> {
    // In a real implementation, this would fetch from the backend
    // For now, return mock data with realistic calculations
    
    const mockData = {
      totalJobs: 15420,
      activeJobs: 8947,
      totalApplications: 45680,
      totalCandidates: 89500,
      avgMatchScore: 78.5,
      successRate: 24.3,
      growthRate: 18.7,
    }

    return mockData
  }

  /**
   * Get job-specific analytics
   */
  async getJobAnalytics(jobId: number): Promise<JobAnalytics> {
    // Mock implementation
    return {
      jobId,
      views: 1247,
      applications: 89,
      conversionRate: 7.14,
      avgMatchScore: 82.3,
      topSkills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
      avgTimeToApply: 3.5,
      applicantDemographics: {
        location: new Map([
          ['Dubai, UAE', 35],
          ['Riyadh, Saudi Arabia', 24],
          ['Cairo, Egypt', 18],
          ['Remote', 12],
        ]),
        experience: new Map([
          ['0-2 years', 15],
          ['3-5 years', 42],
          ['6-8 years', 24],
          ['9+ years', 8],
        ]),
        education: new Map([
          ['Bachelor', 52],
          ['Master', 28],
          ['PhD', 5],
          ['Other', 4],
        ]),
      },
    }
  }

  /**
   * Get candidate analytics
   */
  async getCandidateAnalytics(userId: string): Promise<CandidateAnalytics> {
    // Mock implementation
    return {
      profileViews: 234,
      applicationsSent: 18,
      averageMatchScore: 85.2,
      interviewRate: 22.2,
      responseRate: 66.7,
      topMatchedSkills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS'],
      suggestedImprovements: [
        'Add more project examples to your portfolio',
        'Complete your education section',
        'Update your resume with recent achievements',
        'Add certifications to boost credibility',
      ],
    }
  }

  /**
   * Get time series data for charts
   */
  async getTimeSeriesData(
    metric: 'jobs' | 'applications' | 'candidates',
    period: 'week' | 'month' | 'year'
  ): Promise<TimeSeriesData[]> {
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 365
    const data: TimeSeriesData[] = []

    // Generate mock time series data
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      // Generate realistic values with some variance
      const baseValue = metric === 'jobs' ? 50 : metric === 'applications' ? 120 : 200
      const variance = Math.random() * 40 - 20
      const value = Math.max(0, Math.round(baseValue + variance))

      data.push({
        date: date.toISOString().split('T')[0],
        value,
      })
    }

    return data
  }

  /**
   * Get trend data comparing current vs previous period
   */
  async getTrendData(metrics: string[]): Promise<TrendData[]> {
    // Mock implementation with realistic trends
    const mockTrends: { [key: string]: TrendData } = {
      jobs: {
        label: 'Active Jobs',
        current: 8947,
        previous: 7854,
        change: 1093,
        changePercent: 13.9,
        trend: 'up',
      },
      applications: {
        label: 'Applications',
        current: 45680,
        previous: 38420,
        change: 7260,
        changePercent: 18.9,
        trend: 'up',
      },
      candidates: {
        label: 'Candidates',
        current: 89500,
        previous: 75430,
        change: 14070,
        changePercent: 18.7,
        trend: 'up',
      },
      matchScore: {
        label: 'Avg Match Score',
        current: 78.5,
        previous: 76.2,
        change: 2.3,
        changePercent: 3.0,
        trend: 'up',
      },
      successRate: {
        label: 'Success Rate',
        current: 24.3,
        previous: 23.1,
        change: 1.2,
        changePercent: 5.2,
        trend: 'up',
      },
    }

    return metrics.map(metric => mockTrends[metric] || mockTrends.jobs)
  }

  /**
   * Get top performing jobs
   */
  async getTopPerformingJobs(limit = 10): Promise<any[]> {
    // Mock implementation
    return Array.from({ length: limit }, (_, i) => ({
      id: i + 1,
      title: `Position ${i + 1}`,
      applications: Math.floor(Math.random() * 200) + 50,
      views: Math.floor(Math.random() * 2000) + 500,
      conversionRate: (Math.random() * 15 + 5).toFixed(2),
      avgMatchScore: (Math.random() * 30 + 70).toFixed(1),
    }))
  }

  /**
   * Get application funnel data
   */
  async getApplicationFunnel(): Promise<{ stage: string; count: number; percentage: number }[]> {
    const totalViews = 15000

    return [
      { stage: 'Job Views', count: totalViews, percentage: 100 },
      { stage: 'Started Application', count: 3750, percentage: 25 },
      { stage: 'Completed Application', count: 2625, percentage: 17.5 },
      { stage: 'Reviewed', count: 1050, percentage: 7 },
      { stage: 'Interviewed', count: 450, percentage: 3 },
      { stage: 'Offered', count: 150, percentage: 1 },
      { stage: 'Hired', count: 120, percentage: 0.8 },
    ]
  }

  /**
   * Get skill demand analytics
   */
  async getSkillDemand(limit = 20): Promise<{ skill: string; demand: number; growth: number }[]> {
    const skills = [
      { skill: 'React', demand: 1247, growth: 23.4 },
      { skill: 'Node.js', demand: 1089, growth: 18.7 },
      { skill: 'TypeScript', demand: 987, growth: 45.2 },
      { skill: 'Python', demand: 876, growth: 15.3 },
      { skill: 'AWS', demand: 765, growth: 28.9 },
      { skill: 'Docker', demand: 654, growth: 34.1 },
      { skill: 'Kubernetes', demand: 543, growth: 52.3 },
      { skill: 'Java', demand: 532, growth: 8.2 },
      { skill: 'SQL', demand: 498, growth: 12.5 },
      { skill: 'GraphQL', demand: 432, growth: 67.8 },
      { skill: 'Vue.js', demand: 398, growth: 21.3 },
      { skill: 'Angular', demand: 365, growth: -5.4 },
      { skill: 'MongoDB', demand: 321, growth: 19.7 },
      { skill: 'Redis', demand: 287, growth: 31.2 },
      { skill: 'Go', demand: 254, growth: 78.4 },
      { skill: 'Rust', demand: 198, growth: 124.5 },
      { skill: 'Flutter', demand: 176, growth: 98.3 },
      { skill: 'Swift', demand: 165, growth: 14.8 },
      { skill: 'Kotlin', demand: 154, growth: 42.1 },
      { skill: 'TensorFlow', demand: 143, growth: 56.7 },
    ]

    return skills.slice(0, limit)
  }

  /**
   * Get salary insights
   */
  async getSalaryInsights(
    jobTitle?: string,
    location?: string
  ): Promise<{
    average: number
    median: number
    min: number
    max: number
    percentile25: number
    percentile75: number
    currency: string
  }> {
    // Mock implementation
    return {
      average: 18500,
      median: 17000,
      min: 8000,
      max: 35000,
      percentile25: 12000,
      percentile75: 24000,
      currency: 'AED',
    }
  }

  /**
   * Get hiring timeline analytics
   */
  async getHiringTimeline(): Promise<{
    avgTimeToHire: number
    avgTimeToInterview: number
    avgTimeToOffer: number
    stages: { stage: string; avgDays: number }[]
  }> {
    return {
      avgTimeToHire: 28,
      avgTimeToInterview: 7,
      avgTimeToOffer: 14,
      stages: [
        { stage: 'Application to Review', avgDays: 2 },
        { stage: 'Review to Interview', avgDays: 5 },
        { stage: 'Interview to Decision', avgDays: 7 },
        { stage: 'Decision to Offer', avgDays: 3 },
        { stage: 'Offer to Acceptance', avgDays: 5 },
        { stage: 'Acceptance to Start', avgDays: 14 },
      ],
    }
  }

  /**
   * Export analytics data
   */
  async exportAnalytics(
    format: 'csv' | 'excel' | 'pdf',
    dataType: 'jobs' | 'applications' | 'candidates'
  ): Promise<Blob> {
    // In a real implementation, this would generate and return the file
    // For now, return a mock blob
    const mockData = `Date,${dataType}\n2024-01-01,100\n2024-01-02,120\n`
    return new Blob([mockData], { type: 'text/csv' })
  }

  /**
   * Calculate conversion rates
   */
  calculateConversionRate(numerator: number, denominator: number): number {
    if (denominator === 0) return 0
    return Math.round((numerator / denominator) * 100 * 10) / 10
  }

  /**
   * Calculate percentage change
   */
  calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return 0
    return Math.round(((current - previous) / previous) * 100 * 10) / 10
  }

  /**
   * Get real-time metrics
   */
  async getRealTimeMetrics(): Promise<{
    activeUsers: number
    activeApplications: number
    systemLoad: number
    responseTime: number
  }> {
    return {
      activeUsers: Math.floor(Math.random() * 500) + 100,
      activeApplications: Math.floor(Math.random() * 50) + 10,
      systemLoad: Math.random() * 50 + 30,
      responseTime: Math.random() * 100 + 50,
    }
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService()
export default analyticsService
