/**
 * AI-Powered Job Matching Service
 * Analyzes candidate profiles and job requirements to calculate match scores
 */

export interface CandidateProfile {
  skills: string[]
  experience: string
  education: string
  location: string
  jobTypes: string[]
  desiredSalaryMin?: number
  desiredSalaryMax?: number
  remotePreference: boolean
  languages?: string[]
}

export interface JobRequirements {
  skills: string[]
  experience: string
  education: string
  location: string
  type: string
  salaryMin?: number
  salaryMax?: number
  remote: boolean
}

export interface MatchResult {
  overallScore: number
  breakdown: {
    skillsMatch: number
    experienceMatch: number
    educationMatch: number
    locationMatch: number
    salaryMatch: number
    typeMatch: number
  }
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
}

class AIMatchingService {
  /**
   * Calculate match score between candidate and job
   */
  calculateMatchScore(
    candidate: CandidateProfile,
    job: JobRequirements
  ): MatchResult {
    const breakdown = {
      skillsMatch: this.calculateSkillsMatch(candidate.skills, job.skills),
      experienceMatch: this.calculateExperienceMatch(candidate.experience, job.experience),
      educationMatch: this.calculateEducationMatch(candidate.education, job.education),
      locationMatch: this.calculateLocationMatch(candidate, job),
      salaryMatch: this.calculateSalaryMatch(candidate, job),
      typeMatch: this.calculateJobTypeMatch(candidate.jobTypes, job.type),
    }

    // Weighted average (skills and experience are most important)
    const weights = {
      skillsMatch: 0.35,
      experienceMatch: 0.25,
      educationMatch: 0.15,
      locationMatch: 0.10,
      salaryMatch: 0.10,
      typeMatch: 0.05,
    }

    const overallScore = Object.entries(breakdown).reduce(
      (sum, [key, value]) => sum + value * weights[key as keyof typeof weights],
      0
    )

    const strengths = this.identifyStrengths(breakdown)
    const weaknesses = this.identifyWeaknesses(breakdown)
    const recommendations = this.generateRecommendations(breakdown, candidate, job)

    return {
      overallScore: Math.round(overallScore),
      breakdown,
      strengths,
      weaknesses,
      recommendations,
    }
  }

  /**
   * Calculate skills match percentage
   */
  private calculateSkillsMatch(candidateSkills: string[], requiredSkills: string[]): number {
    if (!requiredSkills || requiredSkills.length === 0) return 100

    const normalizedCandidateSkills = candidateSkills.map(s => s.toLowerCase().trim())
    const normalizedRequiredSkills = requiredSkills.map(s => s.toLowerCase().trim())

    const matchedSkills = normalizedRequiredSkills.filter(skill =>
      normalizedCandidateSkills.some(cs =>
        cs.includes(skill) || skill.includes(cs) || this.areSimilarSkills(cs, skill)
      )
    )

    return Math.round((matchedSkills.length / normalizedRequiredSkills.length) * 100)
  }

  /**
   * Check if two skills are similar (e.g., "JavaScript" and "JS", "React" and "ReactJS")
   */
  private areSimilarSkills(skill1: string, skill2: string): boolean {
    const similarityMap: { [key: string]: string[] } = {
      javascript: ['js', 'ecmascript', 'es6', 'es5'],
      typescript: ['ts'],
      react: ['reactjs', 'react.js'],
      vue: ['vuejs', 'vue.js'],
      angular: ['angularjs'],
      node: ['nodejs', 'node.js'],
      python: ['py'],
      'machine learning': ['ml'],
      'artificial intelligence': ['ai'],
      database: ['db', 'databases'],
      sql: ['mysql', 'postgresql', 'postgres'],
      nosql: ['mongodb', 'dynamodb', 'cassandra'],
    }

    for (const [key, variants] of Object.entries(similarityMap)) {
      if (
        (skill1.includes(key) && variants.some(v => skill2.includes(v))) ||
        (skill2.includes(key) && variants.some(v => skill1.includes(v)))
      ) {
        return true
      }
    }

    return false
  }

  /**
   * Calculate experience match percentage
   */
  private calculateExperienceMatch(candidateExp: string, requiredExp: string): number {
    const candidateYears = this.extractYearsFromExperience(candidateExp)
    const requiredYears = this.extractYearsFromExperience(requiredExp)

    if (requiredYears === 0) return 100
    if (candidateYears === 0) return 0

    if (candidateYears >= requiredYears) {
      // Candidate meets or exceeds requirement
      return Math.min(100, 80 + (candidateYears - requiredYears) * 5)
    } else {
      // Candidate has less experience
      const ratio = candidateYears / requiredYears
      return Math.round(ratio * 70) // Max 70% if below requirement
    }
  }

  /**
   * Extract years from experience string (e.g., "3-5 years" -> 4, "2+ years" -> 2)
   */
  private extractYearsFromExperience(exp: string): number {
    const matches = exp.match(/(\d+)/)
    if (!matches) return 0

    const years = parseInt(matches[1])
    if (exp.includes('-')) {
      const secondMatch = exp.match(/(\d+)-(\d+)/)
      if (secondMatch) {
        return (parseInt(secondMatch[1]) + parseInt(secondMatch[2])) / 2
      }
    }

    return years
  }

  /**
   * Calculate education match percentage
   */
  private calculateEducationMatch(candidateEdu: string, requiredEdu: string): number {
    const educationLevels = [
      'high school',
      'diploma',
      'associate',
      'bachelor',
      'master',
      'phd',
      'doctorate',
    ]

    const candidateLevel = this.getEducationLevel(candidateEdu, educationLevels)
    const requiredLevel = this.getEducationLevel(requiredEdu, educationLevels)

    if (requiredLevel === -1) return 100 // No specific requirement
    if (candidateLevel === -1) return 50 // Unknown education

    if (candidateLevel >= requiredLevel) {
      return 100
    } else {
      const diff = requiredLevel - candidateLevel
      return Math.max(0, 100 - diff * 20)
    }
  }

  /**
   * Get education level index
   */
  private getEducationLevel(education: string, levels: string[]): number {
    const normalized = education.toLowerCase()
    return levels.findIndex(level => normalized.includes(level))
  }

  /**
   * Calculate location match percentage
   */
  private calculateLocationMatch(candidate: CandidateProfile, job: JobRequirements): number {
    if (job.remote || candidate.remotePreference) {
      return 100
    }

    if (!candidate.location || !job.location) {
      return 50
    }

    const candidateLoc = candidate.location.toLowerCase()
    const jobLoc = job.location.toLowerCase()

    if (candidateLoc === jobLoc) {
      return 100
    }

    // Check if same city or country
    const candidateParts = candidateLoc.split(',').map(p => p.trim())
    const jobParts = jobLoc.split(',').map(p => p.trim())

    const hasCommonPart = candidateParts.some(part => jobParts.includes(part))

    return hasCommonPart ? 70 : 30
  }

  /**
   * Calculate salary match percentage
   */
  private calculateSalaryMatch(candidate: CandidateProfile, job: JobRequirements): number {
    if (!candidate.desiredSalaryMin || !job.salaryMin) {
      return 100 // No salary info to compare
    }

    const candidateMin = candidate.desiredSalaryMin
    const candidateMax = candidate.desiredSalaryMax || candidateMin * 1.5
    const jobMin = job.salaryMin
    const jobMax = job.salaryMax || jobMin * 1.5

    // Check if ranges overlap
    if (candidateMin <= jobMax && candidateMax >= jobMin) {
      const overlapMin = Math.max(candidateMin, jobMin)
      const overlapMax = Math.min(candidateMax, jobMax)
      const overlapSize = overlapMax - overlapMin

      const candidateRange = candidateMax - candidateMin
      const jobRange = jobMax - jobMin

      const avgRange = (candidateRange + jobRange) / 2
      const overlapRatio = overlapSize / avgRange

      return Math.round(overlapRatio * 100)
    }

    return 0
  }

  /**
   * Calculate job type match percentage
   */
  private calculateJobTypeMatch(candidateTypes: string[], jobType: string): number {
    if (!candidateTypes || candidateTypes.length === 0) {
      return 100 // No preference specified
    }

    const normalizedCandidateTypes = candidateTypes.map(t => t.toLowerCase())
    const normalizedJobType = jobType.toLowerCase()

    return normalizedCandidateTypes.includes(normalizedJobType) ? 100 : 50
  }

  /**
   * Identify strengths based on match breakdown
   */
  private identifyStrengths(breakdown: MatchResult['breakdown']): string[] {
    const strengths: string[] = []

    if (breakdown.skillsMatch >= 80) {
      strengths.push('Strong technical skills match')
    }
    if (breakdown.experienceMatch >= 80) {
      strengths.push('Excellent experience level')
    }
    if (breakdown.educationMatch >= 90) {
      strengths.push('Education requirements met or exceeded')
    }
    if (breakdown.locationMatch === 100) {
      strengths.push('Perfect location match')
    }
    if (breakdown.salaryMatch >= 80) {
      strengths.push('Salary expectations aligned')
    }

    return strengths
  }

  /**
   * Identify weaknesses based on match breakdown
   */
  private identifyWeaknesses(breakdown: MatchResult['breakdown']): string[] {
    const weaknesses: string[] = []

    if (breakdown.skillsMatch < 60) {
      weaknesses.push('Some required skills are missing')
    }
    if (breakdown.experienceMatch < 60) {
      weaknesses.push('Experience level below requirement')
    }
    if (breakdown.educationMatch < 70) {
      weaknesses.push('Education requirement not fully met')
    }
    if (breakdown.locationMatch < 50) {
      weaknesses.push('Location mismatch')
    }

    return weaknesses
  }

  /**
   * Generate recommendations for improving match
   */
  private generateRecommendations(
    breakdown: MatchResult['breakdown'],
    candidate: CandidateProfile,
    job: JobRequirements
  ): string[] {
    const recommendations: string[] = []

    if (breakdown.skillsMatch < 80) {
      const missingSkills = job.skills.filter(
        skill => !candidate.skills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
      )
      if (missingSkills.length > 0) {
        recommendations.push(
          `Consider highlighting or acquiring these skills: ${missingSkills.slice(0, 3).join(', ')}`
        )
      }
    }

    if (breakdown.experienceMatch < 80) {
      recommendations.push('Emphasize relevant project experience and achievements')
    }

    if (breakdown.locationMatch < 80 && !job.remote) {
      recommendations.push('Consider mentioning willingness to relocate if applicable')
    }

    if (breakdown.salaryMatch < 80) {
      recommendations.push('Review salary expectations to align with market standards')
    }

    if (recommendations.length === 0) {
      recommendations.push('Great match! Craft a compelling cover letter to stand out')
    }

    return recommendations
  }

  /**
   * Batch calculate match scores for multiple jobs
   */
  calculateBatchMatchScores(
    candidate: CandidateProfile,
    jobs: JobRequirements[]
  ): Array<MatchResult & { jobIndex: number }> {
    return jobs
      .map((job, index) => ({
        ...this.calculateMatchScore(candidate, job),
        jobIndex: index,
      }))
      .sort((a, b) => b.overallScore - a.overallScore)
  }

  /**
   * Get recommended jobs based on match score threshold
   */
  getRecommendedJobs(
    candidate: CandidateProfile,
    jobs: JobRequirements[],
    minScore = 70
  ): Array<{ job: JobRequirements; matchResult: MatchResult; index: number }> {
    const matchResults = this.calculateBatchMatchScores(candidate, jobs)

    return matchResults
      .filter(result => result.overallScore >= minScore)
      .map(result => ({
        job: jobs[result.jobIndex],
        matchResult: result,
        index: result.jobIndex,
      }))
  }
}

// Export singleton instance
export const aiMatchingService = new AIMatchingService()
export default aiMatchingService
