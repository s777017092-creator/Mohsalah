import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import JobApplicationModal from '../components/job-application/JobApplicationModal'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Users, 
  Calendar,
  Briefcase,
  BookOpen,
  Star,
  ArrowLeft,
  Target,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send
} from 'lucide-react'
import { toast } from 'sonner'

function JobDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)

  console.log('JobDetailPage: Viewing job ID:', id, 'User:', user)

  // Enhanced mock job data
  const job = {
    id: Number(id) || 1,
    title: 'مطور تطبيقات موبايل React Native',
    company: 'شركة التكنولوجيا المتقدمة',
    location: 'الرياض، السعودية',
    salary: '8000 - 12000 ريال',
    type: 'دوام كامل',
    postedAt: 'منذ يومين',
    experience: '2-4 سنوات',
    remote: true,
    urgent: true,
    featured: true,
    applicants: 23,
    views: 145,
    skills: ['React Native', 'JavaScript', 'TypeScript', 'Firebase', 'Redux', 'API Integration'],
    requirements: [
      'بكالوريوس في علوم الحاسوب أو مجال مشابه',
      'خبرة 2-4 سنوات في React Native',
      'إتقان JavaScript و TypeScript',
      'خبرة في Redux/Context API',
      'معرفة بـ Git وأدوات التطوير',
      'قدرة على العمل تحت الضغط',
      'مهارات تواصل ممتازة'
    ],
    description: `نحن نبحث عن مطور تطبيقات موبايل ماهر وشغوف للانضمام إلى فريقنا المتنامي. ستكون مسؤولاً عن تطوير وصيانة تطبيقات موبايل عالية الجودة باستخدام React Native.

## المسؤوليات الرئيسية:
- تطوير تطبيقات موبايل باستخدام React Native
- التعاون مع فريق التصميم لتنفيذ واجهات مستخدم جذابة
- كتابة كود نظيف وقابل للصيانة
- اختبار وتصحيح التطبيقات
- التكامل مع APIs والخدمات الخارجية
- المشاركة في مراجعة الكود وتحسين الأداء

## ما نبحث عنه:
- خبرة 2-4 سنوات في تطوير تطبيقات React Native
- فهم عميق لـ JavaScript و TypeScript
- خبرة في Redux أو Context API
- معرفة بـ Firebase وخدمات البيانات
- فهم لمبادئ التصميم المتجاوب
- قدرة على العمل في فريق
- رغبة في التعلم والتطوير المستمر`,
    benefits: [
      'راتب تنافسي مع بدلات',
      'تأمين صحي شامل',
      'إجازات مدفوعة الأجر',
      'بيئة عمل مرنة',
      'فرص التدريب والتطوير',
      'عمل عن بعد جزئي',
      'بونص أداء سنوي'
    ],
    companyInfo: {
      name: 'شركة التكنولوجيا المتقدمة',
      size: '100-500 موظف',
      industry: 'تكنولوجيا المعلومات',
      founded: '2015',
      description: 'شركة رائدة في مجال تطوير الحلول التقنية والتطبيقات المبتكرة'
    }
  }

  const handleQuickApply = () => {
    if (!user) {
      toast.error('يجب تسجيل الدخول أولاً للتقديم على الوظيفة')
      return
    }

    if (user.role !== 'candidate') {
      toast.error('هذه الوظيفة متاحة للباحثين عن عمل فقط')
      return
    }

    setIsApplicationModalOpen(true)
  }

  const calculateUserMatchScore = () => {
    // Mock matching score calculation based on user profile
    return Math.floor(Math.random() * 30) + 70 // 70-100%
  }

  const matchScore = calculateUserMatchScore()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/jobs" className="flex items-center space-x-2 space-x-reverse">
              <ArrowLeft className="w-4 h-4" />
              <span>العودة إلى الوظائف</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 space-x-reverse flex-wrap gap-2">
                      {job.urgent && (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                          عاجل
                        </Badge>
                      )}
                      {job.featured && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          مميزة
                        </Badge>
                      )}
                      {job.remote && (
                        <Badge variant="outline">عمل عن بُعد</Badge>
                      )}
                    </div>
                    
                    <CardTitle className="text-2xl leading-tight">{job.title}</CardTitle>
                    
                    <div className="flex items-center space-x-2 space-x-reverse text-blue-600">
                      <Building2 className="w-5 h-5" />
                      <span className="text-lg font-medium">{job.company}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 text-right">
                    <Badge variant="default" className="text-center">
                      {job.type}
                    </Badge>
                    <div className="text-sm text-gray-500">
                      {job.applicants} متقدم • {job.views} مشاهدة
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{job.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span>{job.salary}</span>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span>{job.experience}</span>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{job.postedAt}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <BookOpen className="w-5 h-5" />
                  <span>وصف الوظيفة</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none rtl:prose-rtl">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {job.description}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>المتطلبات والمؤهلات</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>المزايا والفوائد</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2 space-x-reverse">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-center">التقديم على الوظيفة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user?.role === 'candidate' && (
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <span className="text-lg font-bold text-blue-600">
                        {matchScore}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      نسبة التطابق مع مهاراتك
                    </div>
                    <div className="flex justify-center">
                      {matchScore >= 80 ? (
                        <Badge className="bg-green-100 text-green-800 flex items-center space-x-1 space-x-reverse">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>مطابقة ممتازة</span>
                        </Badge>
                      ) : matchScore >= 60 ? (
                        <Badge className="bg-yellow-100 text-yellow-800 flex items-center space-x-1 space-x-reverse">
                          <AlertCircle className="w-3 h-3" />
                          <span>مطابقة جيدة</span>
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 flex items-center space-x-1 space-x-reverse">
                          <AlertCircle className="w-3 h-3" />
                          <span>مطابقة منخفضة</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={handleQuickApply}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold"
                  size="lg"
                >
                  {user ? (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Send className="w-5 h-5" />
                      <span>التقديم عبر النموذج الذكي</span>
                    </div>
                  ) : (
                    'سجل دخولك للتقديم'
                  )}
                </Button>
                
                <div className="text-xs text-gray-500 text-center">
                  سيتم إرسال ملفك الشخصي عبر نظام ATS الذكي
                </div>

                {user?.role === 'candidate' && (
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <div className="text-sm font-medium text-blue-900 mb-1">
                      نموذج التقديم الذكي
                    </div>
                    <div className="text-xs text-blue-700">
                      استمارة شاملة مع حساب نسبة التطابق التلقائي
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <Building2 className="w-5 h-5" />
                  <span>عن الشركة</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{job.companyInfo.name}</h4>
                  <p className="text-sm text-gray-600">{job.companyInfo.description}</p>
                </div>
                
                <Separator />
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">حجم الشركة:</span>
                    <span className="font-medium">{job.companyInfo.size}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجال:</span>
                    <span className="font-medium">{job.companyInfo.industry}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">تاريخ التأسيس:</span>
                    <span className="font-medium">{job.companyInfo.founded}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>وظائف مشابهة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: 2, title: 'مطور iOS Swift', company: 'شركة التطبيقات', score: 85 },
                  { id: 3, title: 'مطور Android Kotlin', company: 'تك سوليوشنز', score: 78 },
                  { id: 4, title: 'مطور Flutter', company: 'الشركة المبتكرة', score: 82 }
                ].map((similarJob) => (
                  <Link
                    key={similarJob.id}
                    to={`/jobs/${similarJob.id}`}
                    className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">
                          {similarJob.title}
                        </div>
                        <div className="text-xs text-gray-600">
                          {similarJob.company}
                        </div>
                      </div>
                      {user?.role === 'candidate' && (
                        <Badge variant="outline" className="text-xs">
                          {similarJob.score}% تطابق
                        </Badge>
                      )}
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <JobApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        job={job}
      />
    </div>
  )
}

export default JobDetailPage