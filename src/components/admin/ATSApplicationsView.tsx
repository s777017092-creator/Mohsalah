import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  Briefcase,
  GraduationCap,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Target,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import { toast } from 'sonner'

interface Application {
  id: number
  jobId: number
  jobTitle: string
  company: string
  applicantName: string
  email: string
  phone: string
  appliedAt: string
  matchingScore: number
  status: 'pending' | 'approved' | 'rejected' | 'interviewed'
  resumeUrl?: string
  
  // ATS Data
  personalInfo: {
    fullName: string
    gender: string
    nationality: string
    drivingLicense: boolean
    arabicLevel: string
  }
  
  careerPrefs: {
    preferredLocation1: string
    preferredLocation2?: string
    preferredLocation3?: string
  }
  
  employment: {
    currentCompany?: string
    currentPosition?: string
    yearsOfExperience: string
    seniorityLevel: string
    noticePeriod: string
  }
  
  education: {
    hasUniversityDegree: boolean
    educationLevel: string
    fieldOfStudy?: string
    isCurrentStudent: boolean
  }
  
  skills: string[]
  certifications: string[]
  coverLetter?: string
}

export default function ATSApplicationsView() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      jobId: 1,
      jobTitle: 'مطور تطبيقات موبايل React Native',
      company: 'شركة التكنولوجيا المتقدمة',
      applicantName: 'أحمد محمد علي',
      email: 'ahmed@example.com',
      phone: '+966501234567',
      appliedAt: '2024-01-15T10:30:00',
      matchingScore: 92,
      status: 'pending',
      resumeUrl: '/resumes/ahmed_resume.pdf',
      
      personalInfo: {
        fullName: 'أحمد محمد علي',
        gender: 'male',
        nationality: 'السعودية',
        drivingLicense: true,
        arabicLevel: 'native'
      },
      
      careerPrefs: {
        preferredLocation1: 'الرياض',
        preferredLocation2: 'جدة',
        preferredLocation3: 'الدمام'
      },
      
      employment: {
        currentCompany: 'شركة البرمجيات الذكية',
        currentPosition: 'مطور تطبيقات',
        yearsOfExperience: '3-5',
        seniorityLevel: 'experienced',
        noticePeriod: '1month'
      },
      
      education: {
        hasUniversityDegree: true,
        educationLevel: 'بكالوريوس',
        fieldOfStudy: 'هندسة الحاسوب',
        isCurrentStudent: false
      },
      
      skills: ['React Native', 'JavaScript', 'TypeScript', 'Firebase', 'Redux', 'Node.js'],
      certifications: ['AWS Certified Developer', 'React Native Certification'],
      coverLetter: 'أتطلع للانضمام إلى فريقكم المتميز وأؤمن بأن خبرتي في تطوير التطبيقات ستضيف قيمة للشركة...'
    },
    {
      id: 2,
      jobId: 2,
      jobTitle: 'مصمم واجهات مستخدم UI/UX',
      company: 'وكالة التصميم الإبداعي',
      applicantName: 'فاطمة أحمد السيد',
      email: 'fatima@example.com',
      phone: '+971501234567',
      appliedAt: '2024-01-14T14:20:00',
      matchingScore: 78,
      status: 'approved',
      resumeUrl: '/resumes/fatima_resume.pdf',
      
      personalInfo: {
        fullName: 'فاطمة أحمد السيد',
        gender: 'female',
        nationality: 'مصر',
        drivingLicense: false,
        arabicLevel: 'native'
      },
      
      careerPrefs: {
        preferredLocation1: 'دبي',
        preferredLocation2: 'أبوظبي'
      },
      
      employment: {
        currentCompany: 'استوديو التصميم',
        currentPosition: 'مصممة جرافيك',
        yearsOfExperience: '1-3',
        seniorityLevel: 'junior',
        noticePeriod: '2weeks'
      },
      
      education: {
        hasUniversityDegree: true,
        educationLevel: 'بكالوريوس',
        fieldOfStudy: 'التصميم الجرافيكي',
        isCurrentStudent: false
      },
      
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'Prototyping'],
      certifications: ['Google UX Design Certificate'],
      coverLetter: 'شغوفة بتصميم تجارب مستخدم استثنائية وأسعى للمساهمة في نجاح مشاريعكم الإبداعية...'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [scoreFilter, setScoreFilter] = useState('all')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    
    const matchesScore = 
      scoreFilter === 'all' ||
      (scoreFilter === 'high' && app.matchingScore >= 80) ||
      (scoreFilter === 'medium' && app.matchingScore >= 60 && app.matchingScore < 80) ||
      (scoreFilter === 'low' && app.matchingScore < 60)
    
    return matchesSearch && matchesStatus && matchesScore
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">قيد المراجعة</Badge>
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800">مقبول</Badge>
      case 'rejected':
        return <Badge variant="destructive">مرفوض</Badge>
      case 'interviewed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">مقابلة</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) {
      return <Badge className="bg-green-100 text-green-800">ممتاز {score}%</Badge>
    } else if (score >= 60) {
      return <Badge className="bg-yellow-100 text-yellow-800">جيد {score}%</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800">ضعيف {score}%</Badge>
    }
  }

  const handleStatusUpdate = (applicationId: number, newStatus: string) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: newStatus as any } : app
    ))
    toast.success('تم تحديث حالة الطلب بنجاح')
  }

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application)
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    highMatch: applications.filter(app => app.matchingScore >= 80).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">نظام ATS - طلبات التوظيف</h1>
          <p className="text-gray-600">إدارة ومراجعة طلبات التوظيف مع نسب التطابق الذكية</p>
        </div>
        
        <div className="flex space-x-2 space-x-reverse">
          <Button variant="outline" className="flex items-center space-x-2 space-x-reverse">
            <Download className="w-4 h-4" />
            <span>تصدير البيانات</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <User className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مقبول</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">تطابق عالي</p>
                <p className="text-2xl font-bold text-blue-600">{stats.highMatch}</p>
              </div>
              <Target className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في الطلبات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="حالة الطلب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد المراجعة</SelectItem>
                <SelectItem value="approved">مقبول</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
                <SelectItem value="interviewed">مقابلة</SelectItem>
              </SelectContent>
            </Select>

            <Select value={scoreFilter} onValueChange={setScoreFilter}>
              <SelectTrigger>
                <SelectValue placeholder="نسبة التطابق" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع النسب</SelectItem>
                <SelectItem value="high">عالية (80%+)</SelectItem>
                <SelectItem value="medium">متوسطة (60-79%)</SelectItem>
                <SelectItem value="low">منخفضة (&lt;60%)</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center space-x-2 space-x-reverse">
              <Filter className="w-4 h-4" />
              <span>تصفية متقدمة</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Applicant Info */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {application.applicantName}
                      </h3>
                      <p className="text-sm text-gray-600">{application.jobTitle}</p>
                      <p className="text-xs text-blue-600">{application.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                    <Mail className="w-3 h-3" />
                    <span>{application.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                    <Phone className="w-3 h-3" />
                    <span>{application.phone}</span>
                  </div>
                </div>

                {/* ATS Summary */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">الخبرة:</span>
                      <span className="font-medium mr-1">
                        {application.employment.yearsOfExperience.replace('-', ' - ')} سنة
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-gray-500">التعليم:</span>
                      <span className="font-medium mr-1">
                        {application.education.educationLevel}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-gray-500">الموقع المفضل:</span>
                      <span className="font-medium mr-1">
                        {application.careerPrefs.preferredLocation1}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-gray-500">فترة الإشعار:</span>
                      <span className="font-medium mr-1">
                        {application.employment.noticePeriod}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {application.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {application.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{application.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Status & Score */}
                <div className="lg:col-span-2 space-y-2">
                  <div className="flex flex-col items-end space-y-2">
                    {getScoreBadge(application.matchingScore)}
                    {getStatusBadge(application.status)}
                  </div>
                  
                  <div className="text-xs text-gray-500 text-right">
                    <Calendar className="w-3 h-3 inline ml-1" />
                    {new Date(application.appliedAt).toLocaleDateString('ar-SA')}
                  </div>
                </div>

                {/* Actions */}
                <div className="lg:col-span-2 space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewDetails(application)}
                    className="w-full flex items-center space-x-2 space-x-reverse"
                  >
                    <Eye className="w-3 h-3" />
                    <span>عرض التفاصيل</span>
                  </Button>
                  
                  <div className="flex space-x-1 space-x-reverse">
                    {application.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(application.id, 'approved')}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          قبول
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusUpdate(application.id, 'rejected')}
                          className="flex-1"
                        >
                          رفض
                        </Button>
                      </>
                    )}
                    
                    {application.status === 'approved' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(application.id, 'interviewed')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        جدولة مقابلة
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Application Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    تفاصيل طلب التوظيف
                  </h2>
                  <p className="text-gray-600">{selectedApplication.applicantName}</p>
                </div>
                <Button variant="ghost" onClick={() => setSelectedApplication(null)}>
                  ✕
                </Button>
              </div>

              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="details">التفاصيل الكاملة</TabsTrigger>
                  <TabsTrigger value="matching">تحليل التطابق</TabsTrigger>
                  <TabsTrigger value="resume">السيرة الذاتية</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 space-x-reverse">
                          <User className="w-5 h-5" />
                          <span>المعلومات الشخصية</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">الاسم:</span>
                          <span>{selectedApplication.personalInfo.fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الجنس:</span>
                          <span>{selectedApplication.personalInfo.gender === 'male' ? 'ذكر' : 'أنثى'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">الجنسية:</span>
                          <span>{selectedApplication.personalInfo.nationality}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">رخصة القيادة:</span>
                          <span>{selectedApplication.personalInfo.drivingLicense ? 'نعم' : 'لا'}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 space-x-reverse">
                          <Briefcase className="w-5 h-5" />
                          <span>الخبرة المهنية</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">الشركة الحالية:</span>
                          <span>{selectedApplication.employment.currentCompany || 'غير محدد'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">المنصب:</span>
                          <span>{selectedApplication.employment.currentPosition || 'غير محدد'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">سنوات الخبرة:</span>
                          <span>{selectedApplication.employment.yearsOfExperience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">المستوى:</span>
                          <span>{selectedApplication.employment.seniorityLevel}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="matching" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Target className="w-5 h-5" />
                          <span>تحليل التطابق مع متطلبات الوظيفة</span>
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {selectedApplication.matchingScore}%
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">المهارات المطلوبة</h4>
                          <div className="space-y-1">
                            {['React Native', 'JavaScript', 'TypeScript', 'Firebase'].map((skill) => (
                              <div key={skill} className="flex items-center justify-between text-sm">
                                <span>{skill}</span>
                                {selectedApplication.skills.includes(skill) ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-600" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">التقييم العام</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>الخبرة المطلوبة:</span>
                              <Badge className="bg-green-100 text-green-800">مطابق</Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>المؤهل التعليمي:</span>
                              <Badge className="bg-green-100 text-green-800">مطابق</Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>الموقع الجغرافي:</span>
                              <Badge className="bg-green-100 text-green-800">مطابق</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}