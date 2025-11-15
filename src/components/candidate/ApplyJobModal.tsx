import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Checkbox } from '../ui/checkbox'
import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Calendar,
  Target,
  Send
} from 'lucide-react'
import { toast } from 'sonner'
import { applicationsApi } from '../../lib/api'
import { aiMatchingService } from '../../services/aiMatchingService'

// Validation schema
const applicationSchema = z.object({
  fullName: z.string().min(3, 'الاسم الكامل يجب أن يكون 3 أحرف على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z.string().min(10, 'رقم الهاتف غير صحيح'),
  currentLocation: z.string().min(2, 'الموقع الحالي مطلوب'),
  yearsOfExperience: z.string().min(1, 'سنوات الخبرة مطلوبة'),
  currentCompany: z.string().optional(),
  currentPosition: z.string().optional(),
  educationLevel: z.string().min(1, 'المستوى التعليمي مطلوب'),
  fieldOfStudy: z.string().optional(),
  expectedSalary: z.number().min(0, 'الراتب المتوقع يجب أن يكون موجباً'),
  availability: z.string().min(1, 'التوفر مطلوب'),
  noticePeriod: z.string().optional(),
  coverLetter: z.string().min(100, 'خطاب التغطية يجب أن يكون 100 حرف على الأقل'),
  resumeUrl: z.string().min(1, 'السيرة الذاتية مطلوبة'),
})

type ApplicationFormData = z.infer<typeof applicationSchema>

interface ApplyJobModalProps {
  isOpen: boolean
  onClose: () => void
  job: {
    id: number
    title: string
    company: string
    location: string
    type: string
    salary_min?: number
    salary_max?: number
    currency?: string
    skills: string[]
    experience: string
    education: string
  }
  userId: string
}

export default function ApplyJobModal({ isOpen, onClose, job, userId }: ApplyJobModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [matchScore, setMatchScore] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      expectedSalary: 0,
      coverLetter: '',
    }
  })

  const watchedValues = watch()
  const completeness = calculateCompleteness(watchedValues)

  function calculateCompleteness(data: any): number {
    let score = 0
    const fields = [
      data.fullName?.length >= 3,
      data.email?.includes('@'),
      data.phone?.length >= 10,
      data.currentLocation?.length >= 2,
      data.yearsOfExperience?.length > 0,
      data.educationLevel?.length > 0,
      data.expectedSalary > 0,
      data.availability?.length > 0,
      data.coverLetter?.length >= 100,
      data.resumeUrl?.length > 0,
      selectedSkills.length >= 3,
    ]

    fields.forEach(field => {
      if (field) score += 100 / fields.length
    })

    return Math.round(score)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      toast.error('حجم الملف يجب أن يكون أقل من 5 ميجابايت')
      return
    }

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      toast.error('نوع الملف غير مدعوم. يرجى رفع ملف PDF أو Word')
      return
    }

    setUploadingResume(true)

    try {
      // In production, upload to Supabase Storage or similar
      // For now, simulate upload
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const fakeUrl = `https://storage.example.com/resumes/${userId}/${file.name}`
      setValue('resumeUrl', fakeUrl)
      toast.success('تم رفع السيرة الذاتية بنجاح')

      // Auto-parse resume (if AI service is available)
      // const parsed = await resumeParserService.parseFile(file)
      // Auto-fill some fields if available
    } catch (error) {
      console.error('Error uploading resume:', error)
      toast.error('حدث خطأ أثناء رفع السيرة الذاتية')
    } finally {
      setUploadingResume(false)
    }
  }

  const calculateMatch = () => {
    const candidateProfile = {
      skills: selectedSkills,
      experience: watchedValues.yearsOfExperience || '0',
      education: watchedValues.educationLevel || '',
      location: watchedValues.currentLocation || '',
      jobTypes: [job.type],
      remotePreference: false,
    }

    const jobRequirements = {
      skills: job.skills,
      experience: job.experience,
      education: job.education,
      location: job.location,
      type: job.type,
      remote: false,
    }

    const result = aiMatchingService.calculateMatchScore(candidateProfile, jobRequirements)
    setMatchScore(result.overallScore)
    
    if (result.overallScore >= 70) {
      toast.success(`تطابق ممتاز! نسبة التطابق: ${result.overallScore}%`)
    } else if (result.overallScore >= 50) {
      toast.info(`تطابق جيد. نسبة التطابق: ${result.overallScore}%`)
    } else {
      toast.warning(`نسبة التطابق منخفضة: ${result.overallScore}%`)
    }
  }

  const onSubmit = async (data: ApplicationFormData) => {
    if (selectedSkills.length < 3) {
      toast.error('يرجى اختيار 3 مهارات على الأقل')
      return
    }

    setIsSubmitting(true)

    try {
      // Calculate match score before submission
      const candidateProfile = {
        skills: selectedSkills,
        experience: data.yearsOfExperience,
        education: data.educationLevel,
        location: data.currentLocation,
        jobTypes: [job.type],
        remotePreference: false,
      }

      const jobRequirements = {
        skills: job.skills,
        experience: job.experience,
        education: job.education,
        location: job.location,
        type: job.type,
        remote: false,
      }

      const matchResult = aiMatchingService.calculateMatchScore(candidateProfile, jobRequirements)

      const applicationData = {
        job_id: job.id,
        user_id: userId,
        personal_info: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          location: data.currentLocation,
        },
        career_prefs: {
          expectedSalary: data.expectedSalary,
          availability: data.availability,
          noticePeriod: data.noticePeriod,
        },
        employment: {
          currentCompany: data.currentCompany,
          currentPosition: data.currentPosition,
          yearsOfExperience: data.yearsOfExperience,
        },
        education: {
          level: data.educationLevel,
          fieldOfStudy: data.fieldOfStudy,
        },
        skills: selectedSkills,
        cover_letter: data.coverLetter,
        resume_url: data.resumeUrl,
        match_score: matchResult.overallScore,
        ai_analysis: {
          breakdown: matchResult.breakdown,
          strengths: matchResult.strengths,
          weaknesses: matchResult.weaknesses,
          recommendations: matchResult.recommendations,
        },
      }

      const result = await applicationsApi.create(applicationData)

      if (result.success) {
        toast.success('تم إرسال طلبك بنجاح! سيتم مراجعته قريباً.')
        reset()
        setSelectedSkills([])
        setMatchScore(null)
        onClose()
      } else {
        toast.error(result.message || 'حدث خطأ أثناء إرسال الطلب')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error('حدث خطأ أثناء إرسال الطلب')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            التقديم على: {job.title}
          </DialogTitle>
          <DialogDescription>
            {job.company} - {job.location}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              اكتمال الطلب: {completeness}%
            </span>
            {matchScore !== null && (
              <Badge className={matchScore >= 70 ? 'bg-green-600' : matchScore >= 50 ? 'bg-blue-600' : 'bg-yellow-600'}>
                نسبة التطابق: {matchScore}%
              </Badge>
            )}
          </div>
          <Progress value={completeness} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mb-6">
          {[
            { step: 1, label: 'المعلومات الشخصية', icon: User },
            { step: 2, label: 'الخبرة والتعليم', icon: Briefcase },
            { step: 3, label: 'المهارات والملفات', icon: FileText },
          ].map(({ step, label, icon: Icon }) => (
            <div
              key={step}
              className={`flex flex-col items-center flex-1 ${
                currentStep === step ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep === step
                    ? 'bg-primary text-white'
                    : currentStep > step
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {currentStep > step ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <span className="text-xs text-center">{label}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    المعلومات الشخصية
                  </CardTitle>
                  <CardDescription>أدخل معلوماتك الشخصية</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">الاسم الكامل *</Label>
                    <Input
                      id="fullName"
                      {...register('fullName')}
                      placeholder="الاسم الكامل"
                      className={errors.fullName ? 'border-red-500' : ''}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="example@email.com"
                          className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="phone"
                          {...register('phone')}
                          placeholder="+971501234567"
                          className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Current Location */}
                  <div className="space-y-2">
                    <Label htmlFor="currentLocation">الموقع الحالي *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="currentLocation"
                        {...register('currentLocation')}
                        placeholder="دبي، الإمارات"
                        className={`pl-10 ${errors.currentLocation ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.currentLocation && (
                      <p className="text-sm text-red-500">{errors.currentLocation.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="button" onClick={() => setCurrentStep(2)}>
                  التالي
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Experience & Education */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    الخبرة العملية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Years of Experience */}
                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience">سنوات الخبرة *</Label>
                    <Controller
                      name="yearsOfExperience"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className={errors.yearsOfExperience ? 'border-red-500' : ''}>
                            <SelectValue placeholder="اختر سنوات الخبرة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">أقل من سنة</SelectItem>
                            <SelectItem value="1-2">1-2 سنة</SelectItem>
                            <SelectItem value="3-5">3-5 سنوات</SelectItem>
                            <SelectItem value="6-8">6-8 سنوات</SelectItem>
                            <SelectItem value="9-12">9-12 سنة</SelectItem>
                            <SelectItem value="12+">أكثر من 12 سنة</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.yearsOfExperience && (
                      <p className="text-sm text-red-500">{errors.yearsOfExperience.message}</p>
                    )}
                  </div>

                  {/* Current Position & Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPosition">المسمى الوظيفي الحالي</Label>
                      <Input
                        id="currentPosition"
                        {...register('currentPosition')}
                        placeholder="مطور برمجيات"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentCompany">الشركة الحالية</Label>
                      <Input
                        id="currentCompany"
                        {...register('currentCompany')}
                        placeholder="اسم الشركة"
                      />
                    </div>
                  </div>

                  {/* Expected Salary & Availability */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expectedSalary">الراتب المتوقع ({job.currency || 'AED'}) *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="expectedSalary"
                          type="number"
                          {...register('expectedSalary', { valueAsNumber: true })}
                          placeholder="15000"
                          className={`pl-10 ${errors.expectedSalary ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.expectedSalary && (
                        <p className="text-sm text-red-500">{errors.expectedSalary.message}</p>
                      )}
                      {job.salary_min && job.salary_max && (
                        <p className="text-sm text-gray-600">
                          نطاق الوظيفة: {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()} {job.currency}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability">التوفر للعمل *</Label>
                      <Controller
                        name="availability"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className={errors.availability ? 'border-red-500' : ''}>
                              <SelectValue placeholder="اختر التوفر" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">فوري</SelectItem>
                              <SelectItem value="1week">خلال أسبوع</SelectItem>
                              <SelectItem value="2weeks">خلال أسبوعين</SelectItem>
                              <SelectItem value="1month">خلال شهر</SelectItem>
                              <SelectItem value="2months">خلال شهرين</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.availability && (
                        <p className="text-sm text-red-500">{errors.availability.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Notice Period */}
                  <div className="space-y-2">
                    <Label htmlFor="noticePeriod">فترة الإشعار</Label>
                    <Input
                      id="noticePeriod"
                      {...register('noticePeriod')}
                      placeholder="شهر واحد"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    التعليم
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Education Level */}
                  <div className="space-y-2">
                    <Label htmlFor="educationLevel">المستوى التعليمي *</Label>
                    <Controller
                      name="educationLevel"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className={errors.educationLevel ? 'border-red-500' : ''}>
                            <SelectValue placeholder="اختر المستوى التعليمي" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high_school">الثانوية العامة</SelectItem>
                            <SelectItem value="diploma">دبلوم</SelectItem>
                            <SelectItem value="bachelor">بكالوريوس</SelectItem>
                            <SelectItem value="master">ماجستير</SelectItem>
                            <SelectItem value="phd">دكتوراه</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.educationLevel && (
                      <p className="text-sm text-red-500">{errors.educationLevel.message}</p>
                    )}
                  </div>

                  {/* Field of Study */}
                  <div className="space-y-2">
                    <Label htmlFor="fieldOfStudy">التخصص</Label>
                    <Input
                      id="fieldOfStudy"
                      {...register('fieldOfStudy')}
                      placeholder="علوم الحاسوب"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                  السابق
                </Button>
                <Button type="button" onClick={() => setCurrentStep(3)}>
                  التالي
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Skills & Files */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    المهارات المطلوبة
                  </CardTitle>
                  <CardDescription>
                    اختر المهارات التي تمتلكها من المهارات المطلوبة للوظيفة
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                        className="cursor-pointer hover:bg-primary hover:text-white transition-colors px-4 py-2"
                        onClick={() => toggleSkill(skill)}
                      >
                        {selectedSkills.includes(skill) && (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        )}
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {selectedSkills.length < 3 && (
                    <p className="text-sm text-yellow-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      يرجى اختيار 3 مهارات على الأقل
                    </p>
                  )}

                  {selectedSkills.length >= 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={calculateMatch}
                      className="w-full"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      احسب نسبة التطابق
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    السيرة الذاتية
                  </CardTitle>
                  <CardDescription>
                    ارفع سيرتك الذاتية (PDF, DOC, DOCX - حد أقصى 5MB)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="resume" className="cursor-pointer">
                      {uploadingResume ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          <span className="text-sm text-gray-600">جاري الرفع...</span>
                        </div>
                      ) : watchedValues.resumeUrl ? (
                        <div className="flex flex-col items-center gap-2 text-green-600">
                          <CheckCircle className="w-8 h-8" />
                          <span className="text-sm font-medium">تم رفع السيرة الذاتية</span>
                          <span className="text-xs text-gray-600">انقر للتغيير</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-600">انقر لرفع السيرة الذاتية</span>
                          <span className="text-xs text-gray-500">PDF, DOC, DOCX (حد أقصى 5MB)</span>
                        </div>
                      )}
                    </label>
                  </div>
                  {errors.resumeUrl && (
                    <p className="text-sm text-red-500">{errors.resumeUrl.message}</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    خطاب التغطية
                  </CardTitle>
                  <CardDescription>
                    اكتب خطاب تغطية مقنع يوضح سبب ملاءمتك للوظيفة
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    {...register('coverLetter')}
                    rows={8}
                    placeholder="اشرح لماذا أنت المرشح المثالي لهذه الوظيفة، وما الذي يجعلك مميزاً..."
                    className={errors.coverLetter ? 'border-red-500' : ''}
                  />
                  <div className="flex justify-between items-center">
                    {errors.coverLetter && (
                      <p className="text-sm text-red-500">{errors.coverLetter.message}</p>
                    )}
                    <p className="text-sm text-gray-500 mr-auto">
                      {watchedValues.coverLetter?.length || 0} / 100 حرف على الأقل
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                  السابق
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || completeness < 100}
                  className="gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      إرسال الطلب
                    </>
                  )}
                </Button>
              </div>

              {completeness < 100 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-1">يرجى استكمال جميع المعلومات المطلوبة:</p>
                      <ul className="space-y-1">
                        {!watchedValues.fullName && <li>• الاسم الكامل</li>}
                        {!watchedValues.email && <li>• البريد الإلكتروني</li>}
                        {!watchedValues.phone && <li>• رقم الهاتف</li>}
                        {selectedSkills.length < 3 && <li>• المهارات (3 على الأقل)</li>}
                        {!watchedValues.resumeUrl && <li>• السيرة الذاتية</li>}
                        {(!watchedValues.coverLetter || watchedValues.coverLetter.length < 100) && <li>• خطاب التغطية</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
