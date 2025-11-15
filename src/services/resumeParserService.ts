/**
 * Resume Parser Service
 * Extracts structured data from resumes
 */

export interface ParsedResume {
  personalInfo: {
    name?: string
    email?: string
    phone?: string
    location?: string
    linkedin?: string
    github?: string
    portfolio?: string
  }
  summary?: string
  experience: Array<{
    title: string
    company: string
    location?: string
    startDate?: string
    endDate?: string
    current: boolean
    description?: string
    achievements?: string[]
  }>
  education: Array<{
    degree: string
    institution: string
    field?: string
    startDate?: string
    endDate?: string
    gpa?: string
    achievements?: string[]
  }>
  skills: string[]
  certifications: Array<{
    name: string
    issuer: string
    date?: string
    expiryDate?: string
    credentialId?: string
  }>
  languages: Array<{
    language: string
    proficiency: string
  }>
  projects?: Array<{
    name: string
    description: string
    technologies: string[]
    link?: string
  }>
}

class ResumeParserService {
  private emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
  private phoneRegex = /(\+?\d{1,4}[\s-]?)?(\(?\d{1,4}\)?[\s-]?)?[\d\s-]{6,}/g
  private urlRegex = /(https?:\/\/[^\s]+)/g
  private dateRegex = /(\d{4})|(\d{1,2}\/\d{4})|(\w+\s+\d{4})/g

  /**
   * Parse text content from resume
   */
  async parseText(text: string): Promise<ParsedResume> {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)

    return {
      personalInfo: this.extractPersonalInfo(text, lines),
      summary: this.extractSummary(lines),
      experience: this.extractExperience(lines),
      education: this.extractEducation(lines),
      skills: this.extractSkills(text, lines),
      certifications: this.extractCertifications(lines),
      languages: this.extractLanguages(lines),
      projects: this.extractProjects(lines),
    }
  }

  /**
   * Parse resume from file
   */
  async parseFile(file: File): Promise<ParsedResume> {
    try {
      const text = await this.extractTextFromFile(file)
      return await this.parseText(text)
    } catch (error) {
      console.error('Error parsing resume file:', error)
      throw new Error('Failed to parse resume file')
    }
  }

  /**
   * Extract text from file
   */
  private async extractTextFromFile(file: File): Promise<string> {
    // In a real implementation, this would handle PDF, DOCX, etc.
    // For now, we'll handle text files
    if (file.type === 'text/plain') {
      return await file.text()
    }

    // For other file types, we would use libraries like pdf-parse or mammoth
    throw new Error(`Unsupported file type: ${file.type}. Please use PDF, DOCX, or TXT files.`)
  }

  /**
   * Extract personal information
   */
  private extractPersonalInfo(text: string, lines: string[]): ParsedResume['personalInfo'] {
    const info: ParsedResume['personalInfo'] = {}

    // Extract name (usually first line)
    if (lines.length > 0) {
      const firstLine = lines[0]
      if (firstLine.length < 50 && !firstLine.includes('@')) {
        info.name = firstLine
      }
    }

    // Extract email
    const emailMatch = text.match(this.emailRegex)
    if (emailMatch) {
      info.email = emailMatch[0].toLowerCase()
    }

    // Extract phone
    const phoneMatch = text.match(this.phoneRegex)
    if (phoneMatch) {
      info.phone = phoneMatch[0].trim()
    }

    // Extract LinkedIn
    const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i)
    if (linkedinMatch) {
      info.linkedin = `https://${linkedinMatch[0]}`
    }

    // Extract GitHub
    const githubMatch = text.match(/github\.com\/[\w-]+/i)
    if (githubMatch) {
      info.github = `https://${githubMatch[0]}`
    }

    // Extract portfolio
    const portfolioMatch = text.match(/portfolio:?\s*(https?:\/\/[^\s]+)/i)
    if (portfolioMatch) {
      info.portfolio = portfolioMatch[1]
    }

    return info
  }

  /**
   * Extract professional summary
   */
  private extractSummary(lines: string[]): string | undefined {
    const summaryKeywords = ['summary', 'profile', 'objective', 'about me', 'overview']
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase()
      if (summaryKeywords.some(keyword => line.includes(keyword))) {
        // Get next few lines as summary
        const summaryLines = []
        for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
          if (lines[j].length > 30) {
            summaryLines.push(lines[j])
          } else {
            break
          }
        }
        return summaryLines.join(' ')
      }
    }

    return undefined
  }

  /**
   * Extract work experience
   */
  private extractExperience(lines: string[]): ParsedResume['experience'] {
    const experience: ParsedResume['experience'] = []
    const experienceKeywords = ['experience', 'employment', 'work history', 'professional experience']
    
    let inExperienceSection = false
    let currentJob: any = null

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const lowerLine = line.toLowerCase()

      // Check if entering experience section
      if (experienceKeywords.some(keyword => lowerLine.includes(keyword))) {
        inExperienceSection = true
        continue
      }

      // Check if leaving experience section
      if (inExperienceSection && this.isNewSection(lowerLine)) {
        inExperienceSection = false
        if (currentJob) {
          experience.push(currentJob)
        }
        break
      }

      if (inExperienceSection) {
        // Try to identify job title and company
        const hasDate = this.dateRegex.test(line)
        
        if (hasDate && line.length < 100) {
          // Save previous job
          if (currentJob) {
            experience.push(currentJob)
          }

          // Start new job entry
          const parts = line.split(/\s+-\s+|\s+at\s+|\s+@\s+/i)
          currentJob = {
            title: parts[0] || '',
            company: parts[1] || '',
            current: lowerLine.includes('present') || lowerLine.includes('current'),
            description: '',
            achievements: [],
          }

          // Extract dates
          const dates = line.match(this.dateRegex)
          if (dates && dates.length >= 1) {
            currentJob.startDate = dates[0]
            if (dates.length >= 2) {
              currentJob.endDate = dates[1]
            }
          }
        } else if (currentJob && line.length > 20) {
          // Add to description or achievements
          if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
            currentJob.achievements.push(line.replace(/^[•\-*]\s*/, ''))
          } else {
            currentJob.description = (currentJob.description + ' ' + line).trim()
          }
        }
      }
    }

    // Add last job
    if (currentJob) {
      experience.push(currentJob)
    }

    return experience
  }

  /**
   * Extract education
   */
  private extractEducation(lines: string[]): ParsedResume['education'] {
    const education: ParsedResume['education'] = []
    const educationKeywords = ['education', 'academic', 'qualification']
    
    let inEducationSection = false
    let currentEdu: any = null

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const lowerLine = line.toLowerCase()

      if (educationKeywords.some(keyword => lowerLine.includes(keyword))) {
        inEducationSection = true
        continue
      }

      if (inEducationSection && this.isNewSection(lowerLine)) {
        inEducationSection = false
        if (currentEdu) {
          education.push(currentEdu)
        }
        break
      }

      if (inEducationSection) {
        const degreeKeywords = ['bachelor', 'master', 'phd', 'diploma', 'certificate', 'degree', 'b.s', 'm.s', 'b.a', 'm.a']
        
        if (degreeKeywords.some(keyword => lowerLine.includes(keyword))) {
          if (currentEdu) {
            education.push(currentEdu)
          }

          currentEdu = {
            degree: line,
            institution: '',
            current: lowerLine.includes('present') || lowerLine.includes('current'),
            achievements: [],
          }

          // Extract dates
          const dates = line.match(this.dateRegex)
          if (dates && dates.length >= 1) {
            currentEdu.startDate = dates[0]
            if (dates.length >= 2) {
              currentEdu.endDate = dates[1]
            }
          }
        } else if (currentEdu && !currentEdu.institution && line.length > 5) {
          currentEdu.institution = line
        } else if (currentEdu && line.startsWith('•')) {
          currentEdu.achievements.push(line.replace(/^•\s*/, ''))
        }
      }
    }

    if (currentEdu) {
      education.push(currentEdu)
    }

    return education
  }

  /**
   * Extract skills
   */
  private extractSkills(text: string, lines: string[]): string[] {
    const skills: Set<string> = new Set()
    const skillsKeywords = ['skills', 'technical skills', 'technologies', 'competencies']
    
    let inSkillsSection = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const lowerLine = line.toLowerCase()

      if (skillsKeywords.some(keyword => lowerLine.includes(keyword))) {
        inSkillsSection = true
        continue
      }

      if (inSkillsSection && this.isNewSection(lowerLine)) {
        break
      }

      if (inSkillsSection) {
        // Split by common delimiters
        const parts = line.split(/[,;|•·]/).map(s => s.trim()).filter(s => s.length > 0)
        parts.forEach(skill => {
          if (skill.length > 1 && skill.length < 50) {
            skills.add(skill)
          }
        })
      }
    }

    // Also extract common tech skills from entire text
    const commonSkills = [
      'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
      'React', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel',
      'HTML', 'CSS', 'Sass', 'Tailwind', 'Bootstrap',
      'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch',
      'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab', 'GitHub',
      'Git', 'Agile', 'Scrum', 'REST API', 'GraphQL', 'Microservices',
      'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'scikit-learn',
    ]

    commonSkills.forEach(skill => {
      const regex = new RegExp(`\\b${skill}\\b`, 'gi')
      if (regex.test(text)) {
        skills.add(skill)
      }
    })

    return Array.from(skills)
  }

  /**
   * Extract certifications
   */
  private extractCertifications(lines: string[]): ParsedResume['certifications'] {
    const certifications: ParsedResume['certifications'] = []
    const certKeywords = ['certification', 'certificate', 'license']
    
    let inCertSection = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const lowerLine = line.toLowerCase()

      if (certKeywords.some(keyword => lowerLine.includes(keyword))) {
        inCertSection = true
        continue
      }

      if (inCertSection && this.isNewSection(lowerLine)) {
        break
      }

      if (inCertSection && line.length > 5) {
        const parts = line.split(/\s+-\s+/)
        certifications.push({
          name: parts[0],
          issuer: parts[1] || '',
        })
      }
    }

    return certifications
  }

  /**
   * Extract languages
   */
  private extractLanguages(lines: string[]): ParsedResume['languages'] {
    const languages: ParsedResume['languages'] = []
    const langKeywords = ['language']
    
    let inLangSection = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const lowerLine = line.toLowerCase()

      if (langKeywords.some(keyword => lowerLine.includes(keyword))) {
        inLangSection = true
        continue
      }

      if (inLangSection && this.isNewSection(lowerLine)) {
        break
      }

      if (inLangSection && line.length > 2) {
        const parts = line.split(/\s+-\s+|:\s+/)
        if (parts.length >= 2) {
          languages.push({
            language: parts[0],
            proficiency: parts[1],
          })
        }
      }
    }

    return languages
  }

  /**
   * Extract projects
   */
  private extractProjects(lines: string[]): ParsedResume['projects'] {
    const projects: ParsedResume['projects'] = []
    const projectKeywords = ['project', 'portfolio']
    
    let inProjectSection = false
    let currentProject: any = null

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const lowerLine = line.toLowerCase()

      if (projectKeywords.some(keyword => lowerLine.includes(keyword))) {
        inProjectSection = true
        continue
      }

      if (inProjectSection && this.isNewSection(lowerLine)) {
        if (currentProject) {
          projects.push(currentProject)
        }
        break
      }

      if (inProjectSection) {
        if (line.length > 10 && line.length < 100 && !line.startsWith('•')) {
          if (currentProject) {
            projects.push(currentProject)
          }

          currentProject = {
            name: line,
            description: '',
            technologies: [],
          }
        } else if (currentProject && line.length > 10) {
          if (!currentProject.description) {
            currentProject.description = line
          } else {
            // Try to extract technologies
            const techs = line.split(/[,;|]/).map(t => t.trim()).filter(t => t.length > 0)
            currentProject.technologies.push(...techs)
          }
        }
      }
    }

    if (currentProject) {
      projects.push(currentProject)
    }

    return projects
  }

  /**
   * Check if line is a new section header
   */
  private isNewSection(line: string): boolean {
    const sectionKeywords = [
      'experience', 'education', 'skills', 'certification', 'language', 'project',
      'reference', 'hobby', 'interest', 'award', 'publication'
    ]
    
    return sectionKeywords.some(keyword => line.includes(keyword)) && line.length < 50
  }

  /**
   * Calculate completeness score
   */
  calculateCompleteness(resume: ParsedResume): number {
    let score = 0
    let maxScore = 100

    // Personal info (20 points)
    if (resume.personalInfo.name) score += 5
    if (resume.personalInfo.email) score += 5
    if (resume.personalInfo.phone) score += 5
    if (resume.personalInfo.location) score += 5

    // Summary (10 points)
    if (resume.summary && resume.summary.length > 50) score += 10

    // Experience (25 points)
    if (resume.experience.length > 0) score += 15
    if (resume.experience.length >= 2) score += 5
    if (resume.experience.some(e => e.achievements && e.achievements.length > 0)) score += 5

    // Education (15 points)
    if (resume.education.length > 0) score += 15

    // Skills (20 points)
    if (resume.skills.length >= 3) score += 10
    if (resume.skills.length >= 5) score += 5
    if (resume.skills.length >= 10) score += 5

    // Certifications (10 points)
    if (resume.certifications.length > 0) score += 10

    return Math.round((score / maxScore) * 100)
  }
}

// Export singleton instance
export const resumeParserService = new ResumeParserService()
export default resumeParserService
