import React, { useState, FormEvent } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Checkbox } from '../components/ui/checkbox'
import { 
  Plus, 
  Search,
  Eye, 
  Users, 
  Briefcase, 
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  Edit,
  Trash2,
  Star,
  Building2,
  Send,
  Filter,
  UserCheck,
  Target,
  Award,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Download,
  User,
  AlertCircle,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Mail,
  Phone,
  Globe,
  Share2,
  Bookmark,
  Bell,
  Settings,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Zap,
  Rocket,
  Shield,
  ChevronRight,
  ChevronDown,
  Activity,
  ChevronUp,
  GraduationCap
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'sonner'
import ATSApplicationsView from '../components/admin/ATSApplicationsView'
import CreateJobModal from '../components/employer/CreateJobModal'

// Types
type JobStatus = 'published' | 'pending' | 'rejected' | 'expired'
type ApplicantStatus = 'suitable' | 'not_suitable' | 'pending' | 'interviewed' | 'hired'
type UrgencyLevel = 'High' | 'Medium' | 'Low'

interface Applicant {
  id: number
  name: string
  email: string
  phone: string
  appliedAt: string
  matchScore: number
  status: ApplicantStatus
  cvUrl: string
  skills: string[]
  experience: string
  education: string
  location: string
  currentSalary: string
  expectedSalary: string
  noticePeriod: string
  profileImage: string
}

interface Job {
  id: number
  title: string
  department: string
  location: string
  type: string
  salary: string
  postedAt: string
  status: JobStatus
  applications: number
  views: number
  saves: number
  urgency: UrgencyLevel
  expiresAt: string
  featured: boolean
  remote: boolean
  requirements: string[]
  description: string
  applicants: Applicant[]
  analytics: {
    dailyViews: number[]
    topSources: string[]
    applicationTrend: number[]
  }
}

interface TalentResult {
  id: number
  name: string
  email: string
  phone: string
  location: string
  experience: string
  skills: string[]
  matchScore: number
  cvUrl: string
  summary: string
  currentSalary: string
  expectedSalary: string
  availability: string
  profileImage: string
}

function EmployerDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showJobForm, setShowJobForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [applicantFilter, setApplicantFilter] = useState('all')
  const [talentFilter, setTalentFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAnalytics, setShowAnalytics] = useState(false)

  console.log('EmployerDashboard: Rendering enhanced version for user:', user)

  // Enhanced employer statistics
  const stats = {
    activeJobs: 12,
    pendingJobs: 3,
    totalApplications: 247,
    newApplications: 18,
    suitableApplicants: 42,
    interviewsScheduled: 8,
    rejectedApplicants: 89,
    talentSearched: 156,
    profileViews: 1240,
    companyFollowers: 89,
    averageMatchScore: 78,
    responseRate: 85
  }

  // Enhanced jobs data with comprehensive information
  const [myJobs, setMyJobs] = useState<Job[]>([
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Dubai, UAE',
      type: 'Full-time',
      salary: '15,000 - 25,000 AED',
      postedAt: '2024-01-15',
      status: 'published',
      applications: 45,
      views: 328,
      saves: 89,
      urgency: 'High',
      expiresAt: '2024-02-15',
      featured: true,
      remote: true,
      requirements: ['React', 'Node.js', 'TypeScript', '5+ years experience'],
      description: 'Join our innovative tech team to build cutting-edge web applications...',
      applicants: [
        {
          id: 1,
          name: 'أحمد محمد علي',
          email: 'ahmed@example.com',
          phone: '+971501234567',
          appliedAt: '2024-01-16',
          matchScore: 92,
          status: 'pending',
          cvUrl: '/cv/ahmed-cv.pdf',
          skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
          experience: '6 years',
          education: 'Computer Engineering',
          location: 'Dubai, UAE',
          currentSalary: '12,000 AED',
          expectedSalary: '18,000 AED',
          noticePeriod: '1 month',
          profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop'
        },
        {
          id: 2,
          name: 'سارة أحمد محمود',
          email: 'sara@example.com',
          phone: '+971507654321',
          appliedAt: '2024-01-17',
          matchScore: 85,
          status: 'suitable',
          cvUrl: '/cv/sara-cv.pdf',
          skills: ['React', 'JavaScript', 'Express', 'MySQL', 'Docker'],
          experience: '4 years',
          education: 'Software Engineering',
          location: 'Abu Dhabi, UAE',
          currentSalary: '10,000 AED',
          expectedSalary: '15,000 AED',
          noticePeriod: '2 weeks',
          profileImage: 'https://images.unsplash.com/photo-1494790108755-2616c6e55cb2?w=64&h=64&fit=crop'
        },
        {
          id: 3,
          name: 'محمد حسن علي',
          email: 'mohamed@example.com',
          phone: '+971509876543',
          appliedAt: '2024-01-18',
          matchScore: 68,
          status: 'not_suitable',
          cvUrl: '/cv/mohamed-cv.pdf',
          skills: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP'],
          experience: '2 years',
          education: 'Information Technology',
          location: 'Sharjah, UAE',
          currentSalary: '6,000 AED',
          expectedSalary: '12,000 AED',
          noticePeriod: '1 month',
          profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop'
        }
      ],
      analytics: {
        dailyViews: [12, 18, 24, 19, 15, 22, 28],
        topSources: ['Direct', 'LinkedIn', 'Indeed', 'Company Website'],
        applicationTrend: [2, 5, 8, 12, 15, 18, 22]
      }
    },
    {
      id: 2,
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'Riyadh, Saudi Arabia',
      type: 'Full-time',
      salary: '12,000 - 18,000 SAR',
      postedAt: '2024-01-10',
      status: 'published',
      applications: 31,
      views: 203,
      saves: 45,
      urgency: 'Medium',
      expiresAt: '2024-02-10',
      featured: false,
      remote: false,
      requirements: ['SEO', 'Google Ads', 'Social Media', '3+ years experience'],
      description: 'Lead digital marketing campaigns and drive growth...',
      applicants: [
        {
          id: 4,
          name: 'فاطمة أحمد السيد',
          email: 'fatima@example.com',
          phone: '+966501234567',
          appliedAt: '2024-01-12',
          matchScore: 88,
          status: 'suitable',
          cvUrl: '/cv/fatima-cv.pdf',
          skills: ['SEO', 'Google Ads', 'Facebook Ads', 'Content Marketing'],
          experience: '5 years',
          education: 'Marketing',
          location: 'Riyadh, Saudi Arabia',
          currentSalary: '10,000 SAR',
          expectedSalary: '15,000 SAR',
          noticePeriod: '1 month',
          profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop'
        }
      ],
      analytics: {
        dailyViews: [8, 12, 16, 14, 18, 20, 25],
        topSources: ['LinkedIn', 'Direct', 'Google', 'Facebook'],
        applicationTrend: [1, 3, 6, 9, 12, 15, 18]
      }
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Cairo, Egypt',
      type: 'Contract',
      salary: '8,000 - 12,000 EGP',
      postedAt: '2024-01-05',
      status: 'pending',
      applications: 0,
      views: 98,
      saves: 23,
      urgency: 'Low',
      expiresAt: '2024-02-05',
      featured: false,
      remote: true,
      requirements: ['Figma', 'Adobe XD', 'UI Design', '2+ years experience'],
      description: 'Create beautiful and intuitive user experiences...',
      applicants: [],
      analytics: {
        dailyViews: [5, 8, 12, 10, 14, 16, 20],
        topSources: ['Direct', 'Behance', 'Dribbble', 'LinkedIn'],
        applicationTrend: [0, 0, 0, 0, 0, 0, 0]
      }
    }
  ])

  // Enhanced talent search results
  const [talentResults, setTalentResults] = useState<TalentResult[]>([])
  const [markedTalent, setMarkedTalent] = useState<Record<number, ApplicantStatus>>({})

  // Talent search form
  const [talentSearchForm, setTalentSearchForm] = useState({
    title: '',
    type: '',
    skills: '',
    experience: '',
    education: '',
    city: '',
    salary: ''
  })



  const handleTalentSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Enhanced mock talent results with ATS matching
    const mockTalentResults: TalentResult[] = [
      {
        id: 1,
        name: 'عمر محمد أحمد',
        email: 'omar@example.com',
        phone: '+971501234567',
        location: 'Dubai, UAE',
        experience: '6+ years',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Python'],
        matchScore: 95,
        cvUrl: '/cv/omar-cv.pdf',
        summary: 'Senior Full Stack Developer with extensive experience in modern web technologies',
        currentSalary: '14,000 AED',
        expectedSalary: '20,000 AED',
        availability: 'Immediate',
        profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop'
      },
      {
        id: 2,
        name: 'ليلى حسن محمود',
        email: 'laila@example.com',
        phone: '+966501234567',
        location: 'Riyadh, Saudi Arabia',
        experience: '4 years',
        skills: ['SEO', 'Google Ads', 'Content Marketing', 'Analytics', 'Social Media'],
        matchScore: 88,
        cvUrl: '/cv/laila-cv.pdf',
        summary: 'Digital Marketing Specialist with proven track record in performance marketing',
        currentSalary: '8,000 SAR',
        expectedSalary: '12,000 SAR',
        availability: '1 month notice',
        profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=64&h=64&fit=crop'
      },
      {
        id: 3,
        name: 'كريم عبدالله',
        email: 'karim@example.com',
        phone: '+20123456789',
        location: 'Cairo, Egypt',
        experience: '3 years',
        skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping'],
        matchScore: 82,
        cvUrl: '/cv/karim-cv.pdf',
        summary: 'UX/UI Designer focused on creating intuitive and engaging user experiences',
        currentSalary: '15,000 EGP',
        expectedSalary: '20,000 EGP',
        availability: '2 weeks notice',
        profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=64&h=64&fit=crop'
      }
    ]
    
    setTalentResults(mockTalentResults)
    toast.success(`تم العثور على ${mockTalentResults.length} مرشح مطابق للمتطلبات`)
  }

  const markApplicant = (jobId: number, applicantId: number, status: ApplicantStatus) => {
    setMyJobs(prev => prev.map(job => 
      job.id === jobId 
        ? {
            ...job,
            applicants: job.applicants.map(applicant =>
              applicant.id === applicantId ? { ...applicant, status } : applicant
            )
          }
        : job
    ))
    toast.success(`تم تعديل حالة المتقدم إلى ${status === 'suitable' ? 'مناسب' : 'غير مناسب'}`)
  }

  const markTalent = (talentId: number, status: ApplicantStatus) => {
    setMarkedTalent(prev => ({ ...prev, [talentId]: status }))
    toast.success(`تم تعديل حالة المرشح إلى ${status === 'suitable' ? 'مناسب' : 'غير مناسب'}`)
  }

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">منشورة</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">قيد المراجعة</Badge>
      case 'rejected':
        return <Badge variant="destructive">مرفوضة</Badge>
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-800">منتهية الصلاحية</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getApplicantStatusBadge = (status: ApplicantStatus) => {
    switch (status) {
      case 'suitable':
        return <Badge className="bg-green-100 text-green-800">مناسب</Badge>
      case 'not_suitable':
        return <Badge className="bg-red-100 text-red-800">غير مناسب</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">قيد المراجعة</Badge>
      case 'interviewed':
        return <Badge className="bg-blue-100 text-blue-800">تمت المقابلة</Badge>
      case 'hired':
        return <Badge className="bg-purple-100 text-purple-800">تم التوظيف</Badge>
      default:
        return <Badge variant="outline">قيد المراجعة</Badge>
    }
  }

  const getMatchScoreBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-100 text-green-800">{score}% ممتاز</Badge>
    if (score >= 80) return <Badge className="bg-blue-100 text-blue-800">{score}% جيد جداً</Badge>
    if (score >= 70) return <Badge className="bg-yellow-100 text-yellow-800">{score}% جيد</Badge>
    return <Badge className="bg-red-100 text-red-800">{score}% ضعيف</Badge>
  }

  const getUrgencyBadge = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case 'High':
        return <Badge className="bg-red-100 text-red-800">أولوية عالية</Badge>
      case 'Medium':
        return <Badge className="bg-yellow-100 text-yellow-800">أولوية متوسطة</Badge>
      case 'Low':
        return <Badge className="bg-gray-100 text-gray-800">أولوية منخفضة</Badge>
      default:
        return <Badge variant="outline">{urgency}</Badge>
    }
  }

  const filteredApplicants = (applicants: Applicant[]) => {
    let filtered = applicants
    
    if (searchQuery) {
      filtered = filtered.filter(app => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    switch (applicantFilter) {
      case 'suitable':
        return filtered.filter(app => app.status === 'suitable')
      case 'not_suitable':
        return filtered.filter(app => app.status === 'not_suitable')
      case 'pending':
        return filtered.filter(app => app.status === 'pending')
      case 'high_match':
        return filtered.filter(app => app.matchScore >= 85)
      default:
        return filtered
    }
  }

  const filteredTalent = (): TalentResult[] => {
    switch (talentFilter) {
      case 'suitable':
        return talentResults.filter(talent => markedTalent[talent.id] === 'suitable')
      case 'not_suitable':
        return talentResults.filter(talent => markedTalent[talent.id] === 'not_suitable')
      case 'high_match':
        return talentResults.filter(talent => talent.matchScore >= 85)
      default:
        return talentResults
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                مرحباً بك، {user?.name}
              </h1>
              <p className="text-gray-600 mt-1 flex items-center space-x-2 space-x-reverse">
                <Building2 className="w-4 h-4" />
                <span>لوحة إدارة التوظيف المتقدمة</span>
                <Badge className="bg-blue-100 text-blue-800 ml-2">Pro Recruiter</Badge>
              </p>
            </div>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <Button variant="outline" className="flex items-center space-x-2 space-x-reverse">
                <Bell className="w-4 h-4" />
                <span>الإشعارات</span>
                <Badge className="bg-red-500 text-white text-xs">3</Badge>
              </Button>
              
              <Button 
                onClick={() => setShowJobForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center space-x-2 space-x-reverse"
              >
                <Plus className="w-4 h-4" />
                <span>نشر وظيفة جديدة</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setActiveTab('talent')}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <Search className="w-4 h-4" />
                <span>البحث عن المواهب</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الوظائف النشطة</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.activeJobs}</p>
                  <p className="text-xs text-green-600 mt-1">+2 هذا الأسبوع</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendingJobs}</p>
                  <p className="text-xs text-yellow-600 mt-1">متوسط الموافقة: 2 أيام</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                  <p className="text-2xl font-bold text-green-600">{stats.totalApplications}</p>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    <span>+15% من الشهر الماضي</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">طلبات جديدة</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.newApplications}</p>
                  <p className="text-xs text-purple-600 mt-1">آخر 24 ساعة</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-indigo-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">المتقدمون المناسبون</p>
                  <p className="text-2xl font-bold text-indigo-600">{stats.suitableApplicants}</p>
                  <p className="text-xs text-indigo-600 mt-1">معدل التطابق: {stats.averageMatchScore}%</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">المقابلات المجدولة</p>
                  <p className="text-2xl font-bold text-red-600">{stats.interviewsScheduled}</p>
                  <p className="text-xs text-red-600 mt-1">هذا الأسبوع</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Bar */}
        <Card className="mb-8 border-2 border-dashed border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Rocket className="w-5 h-5 mr-2 text-blue-600" />
              الإجراءات السريعة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                className="h-16 bg-white border-2 border-blue-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 justify-start"
                onClick={() => setShowJobForm(true)}
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">نشر وظيفة جديدة</div>
                    <div className="text-xs text-gray-500">استقطب أفضل المواهب</div>
                  </div>
                </div>
              </Button>
              
              <Button 
                className="h-16 bg-white border-2 border-green-200 text-gray-700 hover:bg-green-50 hover:text-green-700 justify-start"
                onClick={() => setActiveTab('talent')}
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Search className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">البحث في قاعدة المواهب</div>
                    <div className="text-xs text-gray-500">اكتشف المرشحين المثاليين</div>
                  </div>
                </div>
              </Button>
              
              <Button 
                className="h-16 bg-white border-2 border-purple-200 text-gray-700 hover:bg-purple-50 hover:text-purple-700 justify-start"
                onClick={() => setShowAnalytics(true)}
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">تحليلات الأداء</div>
                    <div className="text-xs text-gray-500">مراقبة نجاح التوظيف</div>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2 space-x-reverse">
              <BarChart3 className="w-4 h-4" />
              <span>لوحة المعلومات</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center space-x-2 space-x-reverse">
              <Briefcase className="w-4 h-4" />
              <span>وظائفي ({myJobs.length})</span>
            </TabsTrigger>
            <TabsTrigger value="ats" className="flex items-center space-x-2 space-x-reverse">
              <Target className="w-4 h-4" />
              <span>نظام ATS</span>
            </TabsTrigger>
            <TabsTrigger value="talent" className="flex items-center space-x-2 space-x-reverse">
              <Users className="w-4 h-4" />
              <span>استقطاب المواهب</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2 space-x-reverse">
              <TrendingUp className="w-4 h-4" />
              <span>التحليلات المتقدمة</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Activity className="w-5 h-5" />
                    <span>النشاط الأخير</span>
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 space-x-reverse p-3 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm font-medium">متقدم جديد عالي التطابق</p>
                      <p className="text-xs text-gray-500">أحمد محمد - مطور Full Stack (92% تطابق)</p>
                      <p className="text-xs text-gray-400">منذ 5 دقائق</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">جديد</Badge>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm font-medium">وظيفة تمت الموافقة عليها</p>
                      <p className="text-xs text-gray-500">مطور Full Stack - تم النشر بنجاح</p>
                      <p className="text-xs text-gray-400">منذ ساعتين</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse p-3 bg-yellow-50 rounded-lg">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm font-medium">مقابلة مجدولة</p>
                      <p className="text-xs text-gray-500">سارة أحمد - غداً في 2:00 مساءً</p>
                      <p className="text-xs text-gray-400">منذ 3 ساعات</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse p-3 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Eye className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm font-medium">زيادة في المشاهدات</p>
                      <p className="text-xs text-gray-500">وظيفة مدير التسويق - 45 مشاهدة جديدة</p>
                      <p className="text-xs text-gray-400">اليوم</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <TrendingUp className="w-5 h-5" />
                    <span>نظرة عامة على الأداء</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">85%</div>
                      <div className="text-sm text-blue-900">معدل الاستجابة</div>
                      <div className="text-xs text-blue-600 mt-1">+5% من الشهر الماضي</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">78%</div>
                      <div className="text-sm text-green-900">متوسط التطابق</div>
                      <div className="text-xs text-green-600 mt-1">+3% من الشهر الماضي</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>جودة المتقدمين</span>
                        <span className="font-medium">82%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>معدل التوظيف</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>سرعة الاستجابة</span>
                        <span className="font-medium">91%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Jobs */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Star className="w-5 h-5" />
                    <span>الوظائف الأكثر نجاحاً</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myJobs.filter(job => job.status === 'published').slice(0, 3).map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex-1 text-right">
                          <h4 className="font-medium text-gray-900">{job.title}</h4>
                          <p className="text-sm text-gray-600">{job.department} • {job.location}</p>
                        </div>
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{job.applications}</div>
                            <div className="text-xs text-gray-500">طلب</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{job.views}</div>
                            <div className="text-xs text-gray-500">مشاهدة</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">{job.saves}</div>
                            <div className="text-xs text-gray-500">حفظ</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <div className="space-y-6">
              {/* Enhanced Filters and Search */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2" />
                      إدارة الوظائف ({myJobs.length})
                    </h2>
                    <Button onClick={() => setShowJobForm(true)} className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Plus className="w-4 h-4 ml-2" />
                      نشر وظيفة جديدة
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="البحث في المتقدمين..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10"
                      />
                    </div>

                    <Select value={applicantFilter} onValueChange={setApplicantFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="تصفية المتقدمين" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع المتقدمين</SelectItem>
                        <SelectItem value="suitable">المناسبون فقط</SelectItem>
                        <SelectItem value="not_suitable">غير المناسبين فقط</SelectItem>
                        <SelectItem value="pending">قيد المراجعة</SelectItem>
                        <SelectItem value="high_match">تطابق عالي (85%+)</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" className="flex items-center space-x-2 space-x-reverse">
                      <Filter className="w-4 h-4" />
                      <span>فلاتر متقدمة</span>
                    </Button>

                    <Button variant="outline" className="flex items-center space-x-2 space-x-reverse">
                      <Download className="w-4 h-4" />
                      <span>تصدير البيانات</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Jobs List */}
              <div className="space-y-6">
                {myJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {/* Enhanced Job Header */}
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="text-right flex-1">
                                <div className="flex items-center space-x-3 space-x-reverse mb-2">
                                  <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                  {job.featured && <Badge className="bg-yellow-100 text-yellow-800">مميزة</Badge>}
                                  {job.remote && <Badge variant="outline">عمل عن بُعد</Badge>}
                                </div>
                                <p className="text-primary font-medium text-lg">{job.department}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mt-3">
                                  <div className="flex items-center space-x-2 space-x-reverse">
                                    <MapPin className="w-4 h-4" />
                                    <span>{job.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 space-x-reverse">
                                    <DollarSign className="w-4 h-4" />
                                    <span>{job.salary}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 space-x-reverse">
                                    <Calendar className="w-4 h-4" />
                                    <span>نُشر في: {job.postedAt}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 space-x-reverse">
                                    <Clock className="w-4 h-4" />
                                    <span>ينتهي في: {job.expiresAt}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end space-y-2">
                                {getStatusBadge(job.status)}
                                {getUrgencyBadge(job.urgency)}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Job Performance Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-1 space-x-reverse mb-1">
                              <Users className="w-4 h-4 text-blue-600" />
                              <div className="text-lg font-bold text-blue-600">{job.applications}</div>
                            </div>
                            <div className="text-sm text-gray-600">متقدم</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-1 space-x-reverse mb-1">
                              <Eye className="w-4 h-4 text-green-600" />
                              <div className="text-lg font-bold text-green-600">{job.views}</div>
                            </div>
                            <div className="text-sm text-gray-600">مشاهدة</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-1 space-x-reverse mb-1">
                              <Bookmark className="w-4 h-4 text-purple-600" />
                              <div className="text-lg font-bold text-purple-600">{job.saves}</div>
                            </div>
                            <div className="text-sm text-gray-600">حفظ</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-1 space-x-reverse mb-1">
                              <UserCheck className="w-4 h-4 text-indigo-600" />
                              <div className="text-lg font-bold text-indigo-600">
                                {job.applicants.filter(app => app.status === 'suitable').length}
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">مناسب</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-1 space-x-reverse mb-1">
                              <Target className="w-4 h-4 text-red-600" />
                              <div className="text-lg font-bold text-red-600">
                                {job.applicants.length > 0 ? Math.round(job.applicants.reduce((sum, app) => sum + app.matchScore, 0) / job.applicants.length) : 0}%
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">متوسط التطابق</div>
                          </div>
                        </div>

                        {/* Enhanced Applicants Section */}
                        {job.applicants.length > 0 && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-gray-900 flex items-center">
                                <Users className="w-4 h-4 ml-2" />
                                المتقدمون ({filteredApplicants(job.applicants).length})
                              </h4>
                              <div className="flex space-x-2 space-x-reverse">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                                >
                                  {selectedJob?.id === job.id ? (
                                    <>
                                      <ChevronUp className="w-4 h-4 ml-1" />
                                      إخفاء التفاصيل
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="w-4 h-4 ml-1" />
                                      عرض التفاصيل
                                    </>
                                  )}
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="w-4 h-4 ml-1" />
                                  تصدير القائمة
                                </Button>
                              </div>
                            </div>
                            
                            {selectedJob?.id === job.id && (
                              <div className="space-y-3 border-t pt-4">
                                {filteredApplicants(job.applicants).map((applicant) => (
                                  <Card key={applicant.id} className="border-l-4 border-l-green-400">
                                    <CardContent className="p-4">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 space-x-reverse flex-1">
                                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                                            <img 
                                              src={applicant.profileImage} 
                                              alt={applicant.name}
                                              className="w-full h-full object-cover"
                                            />
                                          </div>
                                          
                                          <div className="flex-1 text-right">
                                            <div className="flex justify-between items-start mb-2">
                                              <div className="flex space-x-2 space-x-reverse">
                                                {getMatchScoreBadge(applicant.matchScore)}
                                                {getApplicantStatusBadge(applicant.status)}
                                              </div>
                                              <div>
                                                <h5 className="font-semibold text-gray-900 text-lg">{applicant.name}</h5>
                                                <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                                                  <div className="flex items-center space-x-1 space-x-reverse">
                                                    <Mail className="w-3 h-3" />
                                                    <span>{applicant.email}</span>
                                                  </div>
                                                  <div className="flex items-center space-x-1 space-x-reverse">
                                                    <Phone className="w-3 h-3" />
                                                    <span>{applicant.phone}</span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                                              <div>
                                                <span className="text-gray-500 font-medium">الخبرة:</span>
                                                <span className="mr-2">{applicant.experience}</span>
                                              </div>
                                              <div>
                                                <span className="text-gray-500 font-medium">التعليم:</span>
                                                <span className="mr-2">{applicant.education}</span>
                                              </div>
                                              <div>
                                                <span className="text-gray-500 font-medium">الموقع:</span>
                                                <span className="mr-2">{applicant.location}</span>
                                              </div>
                                              <div>
                                                <span className="text-gray-500 font-medium">تاريخ التقديم:</span>
                                                <span className="mr-2">{applicant.appliedAt}</span>
                                              </div>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-2 mb-3">
                                              {applicant.skills.map((skill) => (
                                                <Badge key={skill} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                                  {skill}
                                                </Badge>
                                              ))}
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                                              <div>
                                                <span className="font-medium">الراتب الحالي:</span>
                                                <span className="mr-1">{applicant.currentSalary}</span>
                                              </div>
                                              <div>
                                                <span className="font-medium">الراتب المتوقع:</span>
                                                <span className="mr-1">{applicant.expectedSalary}</span>
                                              </div>
                                              <div>
                                                <span className="font-medium">فترة الإشعار:</span>
                                                <span className="mr-1">{applicant.noticePeriod}</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div className="flex flex-col space-y-2 ml-4">
                                          <Button size="sm" variant="outline" asChild>
                                            <a href={applicant.cvUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 space-x-reverse">
                                              <Download className="w-3 h-3" />
                                              <span>السيرة الذاتية</span>
                                            </a>
                                          </Button>
                                          
                                          <div className="flex space-x-1 space-x-reverse">
                                            {applicant.status === 'pending' && (
                                              <>
                                                <Button 
                                                  size="sm" 
                                                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                                                  onClick={() => markApplicant(job.id, applicant.id, 'suitable')}
                                                >
                                                  <CheckCircle className="w-3 h-3" />
                                                </Button>
                                                <Button 
                                                  size="sm" 
                                                  variant="destructive"
                                                  className="flex-1"
                                                  onClick={() => markApplicant(job.id, applicant.id, 'not_suitable')}
                                                >
                                                  <XCircle className="w-3 h-3" />
                                                </Button>
                                              </>
                                            )}
                                            
                                            {applicant.status === 'suitable' && (
                                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                                <MessageSquare className="w-3 h-3 ml-1" />
                                                مراسلة
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {job.applicants.length === 0 && (
                          <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p className="text-gray-500 font-medium">لا يوجد متقدمون لهذه الوظيفة بعد</p>
                            <p className="text-sm text-gray-400 mt-1">ستظهر الطلبات هنا عند تقديم المرشحين</p>
                          </div>
                        )}

                        {/* Job Actions */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <div className="flex space-x-2 space-x-reverse">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 ml-1" />
                              تعديل
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="w-4 h-4 ml-1" />
                              مشاركة
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="w-4 h-4 ml-1" />
                              إحصائيات
                            </Button>
                          </div>
                          
                          <div className="flex space-x-2 space-x-reverse">
                            {job.status === 'pending' && (
                              <Badge className="bg-yellow-100 text-yellow-800 flex items-center space-x-1 space-x-reverse">
                                <Clock className="w-3 h-3" />
                                <span>في انتظار الموافقة الإدارية</span>
                              </Badge>
                            )}
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4 ml-1" />
                              حذف
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ats">
            <ATSApplicationsView />
          </TabsContent>

          <TabsContent value="talent">
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  استقطاب المواهب باستخدام ATS
                </h2>
                
                <div className="flex space-x-2 space-x-reverse">
                  <Select value={talentFilter} onValueChange={setTalentFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="تصفية المرشحين" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع المرشحين</SelectItem>
                      <SelectItem value="suitable">المناسبون فقط</SelectItem>
                      <SelectItem value="not_suitable">غير المناسبين فقط</SelectItem>
                      <SelectItem value="high_match">تطابق عالي (85%+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Enhanced Talent Search Form */}
              <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>البحث الذكي في قاعدة المواهب</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTalentSearch} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">المسمى الوظيفي المطلوب</label>
                        <Input
                          value={talentSearchForm.title}
                          onChange={(e) => setTalentSearchForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="مثل: مطور Full Stack"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">نوع الوظيفة</label>
                        <Select value={talentSearchForm.type} onValueChange={(value) => setTalentSearchForm(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر النوع" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">دوام كامل</SelectItem>
                            <SelectItem value="part-time">دوام جزئي</SelectItem>
                            <SelectItem value="contract">عقد</SelectItem>
                            <SelectItem value="freelance">عمل حر</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">المدينة</label>
                        <Input
                          value={talentSearchForm.city}
                          onChange={(e) => setTalentSearchForm(prev => ({ ...prev, city: e.target.value }))}
                          placeholder="دبي، الرياض، القاهرة..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">المهارات المطلوبة</label>
                        <Input
                          value={talentSearchForm.skills}
                          onChange={(e) => setTalentSearchForm(prev => ({ ...prev, skills: e.target.value }))}
                          placeholder="React, Node.js, TypeScript..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">سنوات الخبرة</label>
                        <Select value={talentSearchForm.experience} onValueChange={(value) => setTalentSearchForm(prev => ({ ...prev, experience: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الخبرة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 سنة</SelectItem>
                            <SelectItem value="1-3">1-3 سنوات</SelectItem>
                            <SelectItem value="3-5">3-5 سنوات</SelectItem>
                            <SelectItem value="5+">أكثر من 5 سنوات</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">نطاق الراتب</label>
                        <Input
                          value={talentSearchForm.salary}
                          onChange={(e) => setTalentSearchForm(prev => ({ ...prev, salary: e.target.value }))}
                          placeholder="10,000 - 15,000"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
                        <Search className="w-4 h-4 ml-2" />
                        البحث باستخدام ATS الذكي
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Enhanced Talent Results */}
              {talentResults.length > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      نتائج البحث ({filteredTalent().length} مرشح)
                    </h3>
                    <Button variant="outline">
                      <Download className="w-4 h-4 ml-2" />
                      تصدير النتائج
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredTalent().map((talent) => (
                      <Card key={talent.id} className="hover:shadow-md transition-shadow border-l-4 border-l-purple-400">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 space-x-reverse flex-1">
                              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                                <img 
                                  src={talent.profileImage} 
                                  alt={talent.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              <div className="flex-1 text-right">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex space-x-2 space-x-reverse">
                                    {getMatchScoreBadge(talent.matchScore)}
                                    {markedTalent[talent.id] && getApplicantStatusBadge(markedTalent[talent.id])}
                                    <Badge className="bg-purple-100 text-purple-800">متاح للتوظيف</Badge>
                                  </div>
                                  <div>
                                    <h4 className="text-xl font-bold text-gray-900">{talent.name}</h4>
                                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600 mt-1">
                                      <div className="flex items-center space-x-1 space-x-reverse">
                                        <MapPin className="w-3 h-3" />
                                        <span>{talent.location}</span>
                                      </div>
                                      <div className="flex items-center space-x-1 space-x-reverse">
                                        <Briefcase className="w-3 h-3" />
                                        <span>{talent.experience}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <p className="text-gray-700 mb-3">{talent.summary}</p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                                  <div>
                                    <span className="text-gray-500 font-medium">الراتب الحالي:</span>
                                    <span className="mr-2 text-green-600 font-medium">{talent.currentSalary}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 font-medium">الراتب المطلوب:</span>
                                    <span className="mr-2 text-blue-600 font-medium">{talent.expectedSalary}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 font-medium">الإتاحية:</span>
                                    <span className="mr-2">{talent.availability}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 font-medium">البريد:</span>
                                    <span className="mr-2">{talent.email}</span>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                  {talent.skills.map((skill) => (
                                    <Badge key={skill} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col space-y-2 ml-6">
                              <Button size="sm" variant="outline" asChild>
                                <a href={talent.cvUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 space-x-reverse">
                                  <Eye className="w-3 h-3" />
                                  <span>عرض السيرة</span>
                                </a>
                              </Button>
                              
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                <MessageSquare className="w-3 h-3 ml-1" />
                                تواصل
                              </Button>
                              
                              {!markedTalent[talent.id] && (
                                <div className="flex space-x-1 space-x-reverse">
                                  <Button 
                                    size="sm" 
                                    className="bg-green-600 hover:bg-green-700 text-white flex-1"
                                    onClick={() => markTalent(talent.id, 'suitable')}
                                  >
                                    <CheckCircle className="w-3 h-3" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => markTalent(talent.id, 'not_suitable')}
                                  >
                                    <XCircle className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {talentResults.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      ابحث عن أفضل المواهب
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      استخدم نموذج البحث أعلاه للعثور على المرشحين المثاليين لوظائفك باستخدام تقنية ATS المتقدمة
                    </p>
                    <Button onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}>
                      ابدأ البحث الآن
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  التحليلات المتقدمة
                </h2>
                <div className="flex space-x-2 space-x-reverse">
                  <Button variant="outline">
                    <Download className="w-4 h-4 ml-2" />
                    تصدير التقرير
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 ml-2" />
                    تحديث البيانات
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Analytics */}
                <Card>
                  <CardHeader>
                    <CardTitle>أداء التوظيف الشهري</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">247</div>
                          <div className="text-sm text-blue-900">طلبات هذا الشهر</div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">18</div>
                          <div className="text-sm text-green-900">توظيف ناجح</div>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">7.3%</div>
                          <div className="text-sm text-purple-900">معدل التحويل</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Job Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>أداء الوظائف</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myJobs.slice(0, 3).map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="text-right">
                            <h4 className="font-medium text-gray-900">{job.title}</h4>
                            <p className="text-sm text-gray-600">{job.applications} طلب • {job.views} مشاهدة</p>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">
                              {job.applicants.length > 0 ? Math.round(job.applicants.reduce((sum, app) => sum + app.matchScore, 0) / job.applicants.length) : 0}%
                            </div>
                            <div className="text-xs text-gray-500">تطابق</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Source Analytics */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>مصادر المتقدمين</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">45%</div>
                        <div className="text-sm text-blue-900">LinkedIn</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">28%</div>
                        <div className="text-sm text-green-900">مباشر</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">18%</div>
                        <div className="text-sm text-purple-900">Indeed</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-xl font-bold text-orange-600">9%</div>
                        <div className="text-sm text-orange-900">أخرى</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Professional Job Posting Modal */}
        <CreateJobModal 
          isOpen={showJobForm}
          onClose={() => setShowJobForm(false)}
          onSuccess={() => {
            toast.success('تم إرسال الوظيفة للمراجعة بنجاح!')
            // Refresh jobs list here if needed
          }}
          companyId={1} // Replace with actual company ID from user
        />
      </div>
    </div>
  )
}

export default EmployerDashboard
