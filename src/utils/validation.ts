/**
 * Validation Utilities
 * Form and data validation helpers
 */

import { z } from 'zod'

// User validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  role: z.enum(['candidate', 'employer']),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// Profile validation schemas
export const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number'),
  location: z.string().min(2, 'Location is required'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  portfolio: z.string().url('Invalid portfolio URL').optional().or(z.literal('')),
})

// Job posting validation schema
export const jobSchema = z.object({
  title: z.string().min(3, 'Job title must be at least 3 characters'),
  department: z.string().min(2, 'Department is required'),
  location: z.string().min(2, 'Location is required'),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']),
  salaryMin: z.number().min(0, 'Minimum salary must be positive'),
  salaryMax: z.number().min(0, 'Maximum salary must be positive'),
  currency: z.string().min(3, 'Currency is required'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  requirements: z.array(z.string()).min(1, 'At least one requirement is needed'),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  experience: z.string().min(2, 'Experience level is required'),
  education: z.string().min(2, 'Education level is required'),
  remote: z.boolean(),
  urgent: z.boolean().optional(),
}).refine(data => data.salaryMax >= data.salaryMin, {
  message: 'Maximum salary must be greater than or equal to minimum salary',
  path: ['salaryMax'],
})

// Company validation schema
export const companySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  industry: z.string().min(2, 'Industry is required'),
  companySize: z.string().min(2, 'Company size is required'),
  location: z.string().min(2, 'Location is required'),
  foundedYear: z.number().min(1800).max(new Date().getFullYear()).optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
})

// Application validation schema
export const applicationSchema = z.object({
  coverLetter: z.string().min(100, 'Cover letter must be at least 100 characters'),
  expectedSalary: z.number().min(0, 'Expected salary must be positive').optional(),
  availability: z.string().min(2, 'Availability is required'),
  resumeUrl: z.string().url('Resume is required'),
})

// Experience validation schema
export const experienceSchema = z.object({
  jobTitle: z.string().min(2, 'Job title is required'),
  companyName: z.string().min(2, 'Company name is required'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrent: z.boolean(),
  description: z.string().min(50, 'Description must be at least 50 characters'),
})

// Education validation schema
export const educationSchema = z.object({
  institution: z.string().min(2, 'Institution name is required'),
  degree: z.string().min(2, 'Degree is required'),
  fieldOfStudy: z.string().min(2, 'Field of study is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrent: z.boolean(),
  grade: z.string().optional(),
})

// Certification validation schema
export const certificationSchema = z.object({
  name: z.string().min(2, 'Certification name is required'),
  issuingOrganization: z.string().min(2, 'Issuing organization is required'),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
})

// Message validation schema
export const messageSchema = z.object({
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  body: z.string().min(10, 'Message must be at least 10 characters'),
})

// Review validation schema
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  review: z.string().min(50, 'Review must be at least 50 characters'),
  pros: z.string().optional(),
  cons: z.string().optional(),
  employmentStatus: z.string().optional(),
  jobTitle: z.string().optional(),
})

// Search query validation
export const searchQuerySchema = z.object({
  query: z.string().min(2, 'Search query must be at least 2 characters').optional(),
  location: z.array(z.string()).optional(),
  jobTypes: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  salaryMin: z.number().min(0).optional(),
  salaryMax: z.number().min(0).optional(),
  remote: z.boolean().optional(),
})

// Custom validation functions
export const validators = {
  /**
   * Validate password strength
   */
  validatePasswordStrength(password: string): {
    isStrong: boolean
    score: number
    feedback: string[]
  } {
    const feedback: string[] = []
    let score = 0

    if (password.length >= 8) {
      score += 20
    } else {
      feedback.push('Password should be at least 8 characters long')
    }

    if (password.length >= 12) {
      score += 10
    }

    if (/[a-z]/.test(password)) {
      score += 20
    } else {
      feedback.push('Add lowercase letters')
    }

    if (/[A-Z]/.test(password)) {
      score += 20
    } else {
      feedback.push('Add uppercase letters')
    }

    if (/[0-9]/.test(password)) {
      score += 20
    } else {
      feedback.push('Add numbers')
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
      score += 10
    } else {
      feedback.push('Add special characters')
    }

    return {
      isStrong: score >= 70,
      score,
      feedback,
    }
  },

  /**
   * Validate file upload
   */
  validateFile(
    file: File,
    options: {
      maxSize?: number
      allowedTypes?: string[]
      allowedExtensions?: string[]
    }
  ): { isValid: boolean; error?: string } {
    const { maxSize = 10 * 1024 * 1024, allowedTypes, allowedExtensions } = options

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`,
      }
    }

    if (allowedTypes && !allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'File type not allowed',
      }
    }

    if (allowedExtensions) {
      const extension = file.name.split('.').pop()?.toLowerCase()
      if (!extension || !allowedExtensions.includes(extension)) {
        return {
          isValid: false,
          error: `Only ${allowedExtensions.join(', ')} files are allowed`,
        }
      }
    }

    return { isValid: true }
  },

  /**
   * Validate image file
   */
  validateImage(file: File): { isValid: boolean; error?: string } {
    return validators.validateFile(file, {
      maxSize: 5 * 1024 * 1024,
      allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    })
  },

  /**
   * Validate resume file
   */
  validateResume(file: File): { isValid: boolean; error?: string } {
    return validators.validateFile(file, {
      maxSize: 5 * 1024 * 1024,
      allowedTypes: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
      ],
    })
  },

  /**
   * Validate date range
   */
  validateDateRange(startDate: string, endDate: string): { isValid: boolean; error?: string } {
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (isNaN(start.getTime())) {
      return { isValid: false, error: 'Invalid start date' }
    }

    if (isNaN(end.getTime())) {
      return { isValid: false, error: 'Invalid end date' }
    }

    if (start > end) {
      return { isValid: false, error: 'Start date must be before end date' }
    }

    return { isValid: true }
  },

  /**
   * Validate salary range
   */
  validateSalaryRange(min: number, max: number): { isValid: boolean; error?: string } {
    if (min < 0 || max < 0) {
      return { isValid: false, error: 'Salary must be positive' }
    }

    if (min > max) {
      return { isValid: false, error: 'Minimum salary must be less than maximum salary' }
    }

    return { isValid: true }
  },

  /**
   * Validate URL
   */
  validateUrl(url: string): { isValid: boolean; error?: string } {
    try {
      new URL(url)
      return { isValid: true }
    } catch {
      return { isValid: false, error: 'Invalid URL' }
    }
  },

  /**
   * Validate phone number
   */
  validatePhone(phone: string): { isValid: boolean; error?: string } {
    const cleaned = phone.replace(/\D/g, '')

    if (cleaned.length < 10) {
      return { isValid: false, error: 'Phone number must have at least 10 digits' }
    }

    if (cleaned.length > 15) {
      return { isValid: false, error: 'Phone number is too long' }
    }

    return { isValid: true }
  },

  /**
   * Validate skills array
   */
  validateSkills(skills: string[]): { isValid: boolean; error?: string } {
    if (skills.length === 0) {
      return { isValid: false, error: 'At least one skill is required' }
    }

    if (skills.length > 50) {
      return { isValid: false, error: 'Maximum 50 skills allowed' }
    }

    const invalidSkills = skills.filter(skill => skill.trim().length < 2)
    if (invalidSkills.length > 0) {
      return { isValid: false, error: 'All skills must have at least 2 characters' }
    }

    return { isValid: true }
  },
}

export default validators
