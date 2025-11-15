/**
 * Platform Configuration
 * Central configuration for the recruitment platform
 */

export const platformConfig = {
  // Platform Information
  name: 'SkillHunt Pro',
  tagline: 'Smart Recruitment Platform',
  description: 'AI-powered recruitment platform connecting top talent with leading companies',
  version: '1.0.0',
  
  // Contact Information
  contact: {
    email: 'support@skillhunt.com',
    phone: '+971 4 123 4567',
    address: 'Dubai, United Arab Emirates',
  },

  // Social Media
  social: {
    linkedin: 'https://linkedin.com/company/skillhunt',
    twitter: 'https://twitter.com/skillhunt',
    facebook: 'https://facebook.com/skillhunt',
    instagram: 'https://instagram.com/skillhunt',
  },

  // Features Configuration
  features: {
    aiMatching: true,
    resumeParsing: true,
    videoInterviews: false,
    skillAssessments: true,
    chatMessaging: true,
    emailNotifications: true,
    pushNotifications: false,
    analytics: true,
    companyReviews: true,
    salaryInsights: true,
  },

  // Job Configuration
  jobs: {
    types: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
    experienceLevels: [
      'Entry Level (0-2 years)',
      'Mid Level (3-5 years)',
      'Senior Level (6-8 years)',
      'Lead Level (9-12 years)',
      'Executive Level (12+ years)',
    ],
    educationLevels: [
      'High School',
      'Associate Degree',
      'Bachelor\'s Degree',
      'Master\'s Degree',
      'PhD',
      'Professional Certification',
    ],
    salaryRanges: [
      { label: 'Under 5,000', min: 0, max: 5000 },
      { label: '5,000 - 10,000', min: 5000, max: 10000 },
      { label: '10,000 - 15,000', min: 10000, max: 15000 },
      { label: '15,000 - 20,000', min: 15000, max: 20000 },
      { label: '20,000 - 30,000', min: 20000, max: 30000 },
      { label: '30,000 - 50,000', min: 30000, max: 50000 },
      { label: '50,000+', min: 50000, max: 999999 },
    ],
    defaultExpiryDays: 30,
    maxFeaturedJobs: 5,
  },

  // Company Configuration
  companies: {
    sizes: [
      '1-10 employees',
      '11-50 employees',
      '51-200 employees',
      '201-500 employees',
      '501-1000 employees',
      '1001-5000 employees',
      '5001+ employees',
    ],
    industries: [
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
    ],
  },

  // Locations
  locations: [
    'Dubai, UAE',
    'Abu Dhabi, UAE',
    'Sharjah, UAE',
    'Riyadh, Saudi Arabia',
    'Jeddah, Saudi Arabia',
    'Dammam, Saudi Arabia',
    'Cairo, Egypt',
    'Alexandria, Egypt',
    'Kuwait City, Kuwait',
    'Amman, Jordan',
    'Beirut, Lebanon',
    'Doha, Qatar',
    'Manama, Bahrain',
    'Muscat, Oman',
    'Remote',
  ],

  // Currencies
  currencies: [
    { code: 'AED', name: 'UAE Dirham', symbol: 'AED' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR' },
    { code: 'EGP', name: 'Egyptian Pound', symbol: 'EGP' },
    { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'KWD' },
    { code: 'JOD', name: 'Jordanian Dinar', symbol: 'JOD' },
    { code: 'QAR', name: 'Qatari Riyal', symbol: 'QAR' },
    { code: 'BHD', name: 'Bahraini Dinar', symbol: 'BHD' },
    { code: 'OMR', name: 'Omani Rial', symbol: 'OMR' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
  ],

  // Languages
  languages: [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ar', name: 'Arabic', native: 'العربية' },
  ],

  // Skills Categories
  skillCategories: {
    'Programming Languages': [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C#',
      'C++',
      'Ruby',
      'Go',
      'Rust',
      'Swift',
      'Kotlin',
      'PHP',
    ],
    'Frontend Development': [
      'React',
      'Vue.js',
      'Angular',
      'HTML',
      'CSS',
      'Sass',
      'Tailwind CSS',
      'Next.js',
      'Nuxt.js',
      'Svelte',
    ],
    'Backend Development': [
      'Node.js',
      'Express',
      'Django',
      'Flask',
      'Spring Boot',
      'Laravel',
      'Ruby on Rails',
      'ASP.NET',
      'FastAPI',
    ],
    'Mobile Development': [
      'React Native',
      'Flutter',
      'Swift',
      'Kotlin',
      'iOS Development',
      'Android Development',
    ],
    'Database': [
      'SQL',
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'Elasticsearch',
      'Cassandra',
      'DynamoDB',
    ],
    'Cloud & DevOps': [
      'AWS',
      'Azure',
      'GCP',
      'Docker',
      'Kubernetes',
      'Jenkins',
      'GitLab CI',
      'GitHub Actions',
      'Terraform',
    ],
    'Data Science & ML': [
      'Machine Learning',
      'Deep Learning',
      'TensorFlow',
      'PyTorch',
      'scikit-learn',
      'Data Analysis',
      'Statistics',
    ],
    'Design': [
      'UI Design',
      'UX Design',
      'Figma',
      'Adobe XD',
      'Sketch',
      'Photoshop',
      'Illustrator',
      'Prototyping',
    ],
    'Marketing': [
      'Digital Marketing',
      'SEO',
      'Content Marketing',
      'Social Media Marketing',
      'Email Marketing',
      'Google Ads',
      'Facebook Ads',
      'Analytics',
    ],
    'Business': [
      'Project Management',
      'Product Management',
      'Business Analysis',
      'Agile',
      'Scrum',
      'Strategy',
      'Leadership',
    ],
  },

  // Application Configuration
  applications: {
    statuses: [
      { value: 'pending', label: 'Pending Review', color: 'gray' },
      { value: 'reviewed', label: 'Reviewed', color: 'blue' },
      { value: 'shortlisted', label: 'Shortlisted', color: 'yellow' },
      { value: 'interviewed', label: 'Interviewed', color: 'purple' },
      { value: 'offered', label: 'Offered', color: 'green' },
      { value: 'hired', label: 'Hired', color: 'green' },
      { value: 'rejected', label: 'Not Selected', color: 'red' },
      { value: 'withdrawn', label: 'Withdrawn', color: 'gray' },
    ],
    maxResumeSize: 5 * 1024 * 1024, // 5MB
    allowedResumeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
  },

  // Matching Configuration
  matching: {
    minMatchScore: 60,
    goodMatchScore: 75,
    excellentMatchScore: 85,
    weights: {
      skills: 0.35,
      experience: 0.25,
      education: 0.15,
      location: 0.10,
      salary: 0.10,
      jobType: 0.05,
    },
  },

  // Pagination
  pagination: {
    defaultPageSize: 20,
    pageSizes: [10, 20, 50, 100],
    maxPageSize: 100,
  },

  // File Upload
  uploads: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    allowedDocumentTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },

  // Search
  search: {
    minQueryLength: 2,
    maxQueryLength: 100,
    suggestionsLimit: 5,
    historyLimit: 10,
  },

  // Cache
  cache: {
    jobsListTTL: 5 * 60 * 1000, // 5 minutes
    jobDetailTTL: 10 * 60 * 1000, // 10 minutes
    companyDetailTTL: 30 * 60 * 1000, // 30 minutes
  },

  // Rate Limiting
  rateLimit: {
    searchPerMinute: 60,
    applicationsPerDay: 50,
    jobPostsPerDay: 20,
  },

  // Email Templates
  emails: {
    fromAddress: 'noreply@skillhunt.com',
    fromName: 'SkillHunt Pro',
    templates: {
      welcome: 'welcome',
      applicationReceived: 'application-received',
      applicationStatusUpdate: 'application-status-update',
      jobMatch: 'job-match',
      interviewInvitation: 'interview-invitation',
      jobAlert: 'job-alert',
    },
  },

  // Security
  security: {
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    passwordMinLength: 8,
    passwordRequireNumbers: true,
    passwordRequireSymbols: true,
    passwordRequireUppercase: true,
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
  },

  // Analytics
  analytics: {
    trackPageViews: true,
    trackEvents: true,
    trackErrors: true,
    sampleRate: 1.0, // 100% sampling
  },

  // Legal
  legal: {
    termsOfServiceUrl: '/terms',
    privacyPolicyUrl: '/privacy',
    cookiePolicyUrl: '/cookies',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: 'SkillHunt Pro',
  },
}

export default platformConfig
