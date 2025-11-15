import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Checkbox } from '../ui/checkbox'
import { Textarea } from '../ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'
import { 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Phone, 
  Upload,
  AlertCircle,
  CheckCircle2,
  FileText,
  Target,
  Star
} from 'lucide-react'
import { toast } from 'sonner'

interface JobApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  job: {
    id: number
    title: string
    company: string
    location: string
    requirements: string[]
    skills: string[]
  }
}

interface ApplicationFormData {
  // Personal Information
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  nationality: string
  
  // Career Preferences
  preferredLocation1: string
  preferredLocation2: string
  preferredLocation3: string
  
  // Current Employment
  currentCompany: string
  currentPosition: string
  currentSalary: string
  noticePeriod: string
  yearsOfExperience: string
  seniorityLevel: string
  
  // Education
  hasUniversityDegree: boolean
  isCurrentStudent: boolean
  educationLevel: string
  fieldOfStudy: string
  
  // Skills & Qualifications
  skills: string[]
  certifications: string[]
  languages: string[]
  
  // Additional Information
  drivingLicense: boolean
  licenseCountry: string
  arabicLevel: string
  
  // Resume Upload
  resumeFile: File | null
  coverLetter: string
}

export default function JobApplicationModal({ isOpen, onClose, job }: JobApplicationModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    preferredLocation1: '',
    preferredLocation2: '',
    preferredLocation3: '',
    currentCompany: '',
    currentPosition: '',
    currentSalary: '',
    noticePeriod: '',
    yearsOfExperience: '',
    seniorityLevel: '',
    hasUniversityDegree: false,
    isCurrentStudent: false,
    educationLevel: '',
    fieldOfStudy: '',
    skills: [],
    certifications: [],
    languages: [],
    drivingLicense: false,
    licenseCountry: '',
    arabicLevel: '',
    resumeFile: null,
    coverLetter: ''
  })

  const [matchingScore, setMatchingScore] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const steps = [
    { id: 0, title: 'المعلومات الشخصية', icon: User },
    { id: 1, title: 'تفضيلات المهنة', icon: MapPin },
    { id: 2, title: 'الوظيفة الحالية', icon: Briefcase },
    { id: 3, title: 'التعليم', icon: GraduationCap },
    { id: 4, title: 'المهارات والشهادات', icon: Star },
    { id: 5, title: 'السيرة الذاتية', icon: FileText }
  ]

  const countries = [
    'السعودية', 'الإمارات', 'الكويت', 'قطر', 'البحرين', 'عمان', 
    'مصر', 'الأردن', 'لبنان', 'العراق', 'المغرب', 'تونس', 'الجزائر'
  ]

  const cities = [
    'الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة',
    'دبي', 'أبوظبي', 'الشارقة', 'عجمان',
    'الكويت', 'حولي', 'الفروانية',
    'الدوحة', 'الوكرة',
    'المنامة', 'المحرق',
    'مسقط', 'صحار',
    'القاهرة', 'الإسكندرية', 'الجيزة',
    'عمان', 'إربد', 'الزرقاء',
    'بيروت', 'طرابلس'
  ]

  const experienceLevels = [
    { value: '0-1', label: '0-1 سنة (حديث التخرج)' },
    { value: '1-3', label: '1-3 سنوات' },
    { value: '3-5', label: '3-5 سنوات' },
    { value: '5-10', label: '5-10 سنوات' },
    { value: '10+', label: 'أكثر من 10 سنوات' }
  ]

  const seniorityLevels = [
    { value: 'student', label: 'طالب/حديث التخرج', description: 'أقل من سنة خبرة' },
    { value: 'junior', label: 'مهني مبتدئ', description: '1-3 سنوات خبرة' },
    { value: 'experienced', label: 'مهني خبير', description: 'أكثر من 4 سنوات خبرة' },
    { value: 'supervisor', label: 'مشرف/مدير', description: 'أكثر من 6 سنوات خبرة' },
    { value: 'executive', label: 'إدارة عليا/مدير عام', description: 'قائد في المنظمة' }
  ]

  const educationLevels = [
    'ثانوية عامة أو أقل',
    'دبلوم متوسط',
    'دبلوم عالي',
    'بكالوريوس',
    'ماجستير',
    'دكتوراه'
  ]

  const fieldsOfStudy = [
    'إدارة الأعمال', 'المحاسبة', 'التمويل', 'التسويق', 'الموارد البشرية',
    'هندسة الحاسوب', 'علوم الحاسوب', 'تقنية المعلومات', 'أمن المعلومات',
    'الهندسة المدنية', 'الهندسة الكهربائية', 'الهندسة الميكانيكية', 'هندسة البترول',
    'الطب', 'طب الأسنان', 'الصيدلة', 'التمريض',
    'القانون', 'العلوم السياسية', 'العلاقات الدولية',
    'التصميم الجرافيكي', 'الفنون', 'العمارة',
    'التعليم', 'اللغة الإنجليزية', 'اللغة العربية'
  ]

  const commonSkills = [
    'Microsoft Office', 'Excel متقدم', 'PowerPoint', 'Word',
    'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign',
    'AutoCAD', 'SolidWorks', '3D Max',
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js',
    'إدارة المشاريع', 'تحليل البيانات', 'إدارة الوقت', 'القيادة',
    'التواصل', 'العمل الجماعي', 'حل المشكلات', 'التفاوض'
  ]

  const arabicLevels = [
    { value: 'none', label: 'لا أتحدث العربية' },
    { value: 'basic', label: 'أساسي' },
    { value: 'intermediate', label: 'متوسط' },
    { value: 'advanced', label: 'متقدم' },
    { value: 'native', label: 'لغتي الأم' }
  ]

  // Calculate matching score based on form data and job requirements
  const calculateMatchingScore = () => {
    let score = 0
    let totalCriteria = 0

    // Experience level matching (30%)
    totalCriteria += 30
    if (formData.yearsOfExperience) {
      const experienceYears = parseInt(formData.yearsOfExperience.split('-')[0])
      if (experienceYears >= 3) score += 30
      else if (experienceYears >= 1) score += 20
      else score += 10
    }

    // Skills matching (40%)
    totalCriteria += 40
    const matchedSkills = formData.skills.filter(skill => 
      job.skills.some(jobSkill => 
        jobSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(jobSkill.toLowerCase())
      )
    )
    score += (matchedSkills.length / Math.max(job.skills.length, 1)) * 40

    // Education matching (20%)
    totalCriteria += 20
    if (formData.hasUniversityDegree) score += 20
    else if (formData.educationLevel.includes('دبلوم')) score += 15
    else score += 10

    // Location preference matching (10%)
    totalCriteria += 10
    const jobLocation = job.location.toLowerCase()
    if (
      formData.preferredLocation1.toLowerCase().includes(jobLocation) ||
      formData.preferredLocation2.toLowerCase().includes(jobLocation) ||
      formData.preferredLocation3.toLowerCase().includes(jobLocation)
    ) {
      score += 10
    } else score += 5

    return Math.round(score)
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('حجم الملف يجب أن يكون أقل من 5 ميجابايت')
        return
      }
      setFormData(prev => ({ ...prev, resumeFile: file }))
      toast.success('تم رفع السيرة الذاتية بنجاح')
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Calculate final matching score
    const finalScore = calculateMatchingScore()
    setMatchingScore(finalScore)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log('Application submitted:', {
      jobId: job.id,
      applicantData: formData,
      matchingScore: finalScore
    })

    toast.success('تم إرسال طلبك بنجاح! سيتم مراجعته قريباً')
    setIsSubmitting(false)
    onClose()
  }

  const isStepValid = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return formData.fullName && formData.email && formData.phone && formData.gender
      case 1:
        return formData.preferredLocation1
      case 2:
        return formData.yearsOfExperience && formData.seniorityLevel
      case 3:
        return formData.educationLevel
      case 4:
        return formData.skills.length > 0
      case 5:
        return formData.resumeFile || formData.coverLetter
      default:
        return true
    }
  }

  const getCompletionPercentage = () => {
    let completed = 0
    const totalSteps = steps.length
    
    for (let i = 0; i < totalSteps; i++) {
      if (isStepValid(i)) completed++
    }
    
    return (completed / totalSteps) * 100
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-2xl text-right">
            التقديم على: {job.title}
          </DialogTitle>
          <DialogDescription className="text-right">
            {job.company} - {job.location}
          </DialogDescription>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>اكتمال الاستمارة</span>
              <span>{Math.round(getCompletionPercentage())}%</span>
            </div>
            <Progress value={getCompletionPercentage()} className="h-2" />
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Steps Navigation */}
          <div className="md:col-span-1">
            <nav className="space-y-2">
              {steps.map((step) => {
                const Icon = step.icon
                const isCompleted = isStepValid(step.id)
                const isCurrent = currentStep === step.id
                
                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg transition-colors text-right ${
                      isCurrent
                        ? 'bg-primary text-primary-foreground'
                        : isCompleted
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {isCompleted && !isCurrent ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </button>
                )
              })}
            </nav>

            {/* Matching Score Preview */}
            {formData.skills.length > 0 && (
              <Card className="mt-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center space-x-2 space-x-reverse">
                    <Target className="w-4 h-4" />
                    <span>نسبة التطابق</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {calculateMatchingScore()}%
                    </div>
                    <div className="text-xs text-gray-500">
                      مع متطلبات الوظيفة
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Form Content */}
          <div className="md:col-span-3">
            <div className="space-y-6">
              {/* Step 0: Personal Information */}
              {currentStep === 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 space-x-reverse">
                      <User className="w-5 h-5" />
                      <span>المعلومات الشخصية</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">الاسم الكامل *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => updateFormData('fullName', e.target.value)}
                          placeholder="محمد صلاح أحمد"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          placeholder="mohammed@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="+966501234567"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">تاريخ الميلاد</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>الجنس *</Label>
                        <RadioGroup
                          value={formData.gender}
                          onValueChange={(value) => updateFormData('gender', value)}
                          className="flex space-x-6 space-x-reverse"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">ذكر</Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">أنثى</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nationality">الجنسية</Label>
                        <Select value={formData.nationality} onValueChange={(value) => updateFormData('nationality', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الجنسية" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Driving License */}
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id="drivingLicense"
                          checked={formData.drivingLicense}
                          onCheckedChange={(checked) => updateFormData('drivingLicense', checked)}
                        />
                        <Label htmlFor="drivingLicense">هل تحمل رخصة قيادة سارية؟</Label>
                      </div>

                      {formData.drivingLicense && (
                        <div className="space-y-2">
                          <Label htmlFor="licenseCountry">الدولة المصدرة للرخصة</Label>
                          <Select value={formData.licenseCountry} onValueChange={(value) => updateFormData('licenseCountry', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الدولة" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    {/* Arabic Level */}
                    <div className="space-y-2">
                      <Label>ما هو مستوى معرفتك باللغة العربية؟</Label>
                      <RadioGroup
                        value={formData.arabicLevel}
                        onValueChange={(value) => updateFormData('arabicLevel', value)}
                        className="space-y-2"
                      >
                        {arabicLevels.map((level) => (
                          <div key={level.value} className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value={level.value} id={level.value} />
                            <Label htmlFor={level.value}>{level.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 1: Career Preferences */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 space-x-reverse">
                      <MapPin className="w-5 h-5" />
                      <span>تفضيلات المهنة</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredLocation1">ما هو المكان المفضل الأول للعمل؟ *</Label>
                      <Select value={formData.preferredLocation1} onValueChange={(value) => updateFormData('preferredLocation1', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredLocation2">ما هو المكان المفضل الثاني للعمل؟</Label>
                      <Select value={formData.preferredLocation2} onValueChange={(value) => updateFormData('preferredLocation2', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredLocation3">ما هو المكان المفضل الثالث للعمل؟</Label>
                      <Select value={formData.preferredLocation3} onValueChange={(value) => updateFormData('preferredLocation3', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Current Employment */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 space-x-reverse">
                      <Briefcase className="w-5 h-5" />
                      <span>الوظيفة الحالية</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentCompany">ما اسم الشركة التي تعمل بها؟</Label>
                      <Input
                        id="currentCompany"
                        value={formData.currentCompany}
                        onChange={(e) => updateFormData('currentCompany', e.target.value)}
                        placeholder="اسم الشركة أو 'لا أعمل حالياً'"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentPosition">ما هو منصبك الحالي أو المسمى الوظيفي؟</Label>
                      <Input
                        id="currentPosition"
                        value={formData.currentPosition}
                        onChange={(e) => updateFormData('currentPosition', e.target.value)}
                        placeholder="المسمى الوظيفي"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience">إجمالاً، كم عدد سنوات الخبرة في العمل بدوام كامل؟ *</Label>
                      <Select value={formData.yearsOfExperience} onValueChange={(value) => updateFormData('yearsOfExperience', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر سنوات الخبرة" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="noticePeriod">ما هي فترة الإشعار المطلوبة من صاحب العمل؟</Label>
                      <Select value={formData.noticePeriod} onValueChange={(value) => updateFormData('noticePeriod', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر فترة الإشعار" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">فوري</SelectItem>
                          <SelectItem value="1week">أسبوع واحد</SelectItem>
                          <SelectItem value="2weeks">أسبوعين</SelectItem>
                          <SelectItem value="1month">شهر واحد</SelectItem>
                          <SelectItem value="2months">شهرين</SelectItem>
                          <SelectItem value="3months">3 أشهر</SelectItem>
                          <SelectItem value="other">فترة أخرى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>كيف تصف مستوى خبرتك في الشركة؟ *</Label>
                      <RadioGroup
                        value={formData.seniorityLevel}
                        onValueChange={(value) => updateFormData('seniorityLevel', value)}
                        className="space-y-3"
                      >
                        {seniorityLevels.map((level) => (
                          <div key={level.value} className="flex items-start space-x-3 space-x-reverse p-3 border rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value={level.value} id={level.value} className="mt-1" />
                            <div className="flex-1 text-right">
                              <Label htmlFor={level.value} className="font-medium cursor-pointer">
                                {level.label}
                              </Label>
                              <p className="text-sm text-gray-600 mt-1">{level.description}</p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Education */}
              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 space-x-reverse">
                      <GraduationCap className="w-5 h-5" />
                      <span>التعليم</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="hasUniversityDegree"
                        checked={formData.hasUniversityDegree}
                        onCheckedChange={(checked) => updateFormData('hasUniversityDegree', checked)}
                      />
                      <Label htmlFor="hasUniversityDegree">هل لديك شهادة جامعية؟</Label>
                    </div>

                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="isCurrentStudent"
                        checked={formData.isCurrentStudent}
                        onCheckedChange={(checked) => updateFormData('isCurrentStudent', checked)}
                      />
                      <Label htmlFor="isCurrentStudent">هل أنت طالب جامعي حالياً أو خريج حديث؟</Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="educationLevel">أي خيار يصف بشكل أفضل موضوع دراستك الجامعية؟ *</Label>
                      <Select value={formData.educationLevel} onValueChange={(value) => updateFormData('educationLevel', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المستوى التعليمي" />
                        </SelectTrigger>
                        <SelectContent>
                          {educationLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.hasUniversityDegree && (
                      <div className="space-y-2">
                        <Label htmlFor="fieldOfStudy">التخصص الجامعي</Label>
                        <Select value={formData.fieldOfStudy} onValueChange={(value) => updateFormData('fieldOfStudy', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر التخصص" />
                          </SelectTrigger>
                          <SelectContent>
                            {fieldsOfStudy.map((field) => (
                              <SelectItem key={field} value={field}>
                                {field}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Skills & Qualifications */}
              {currentStep === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 space-x-reverse">
                      <Star className="w-5 h-5" />
                      <span>المهارات والشهادات</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label>اختر المهارات التي تمتلكها: *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {commonSkills.map((skill) => (
                          <div
                            key={skill}
                            onClick={() => handleSkillToggle(skill)}
                            className={`p-2 border rounded-lg cursor-pointer transition-colors text-center text-sm ${
                              formData.skills.includes(skill)
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-white hover:bg-gray-50 border-gray-200'
                            }`}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Job-specific skills matching */}
                    {job.skills.length > 0 && (
                      <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                        <Label className="text-blue-900">المهارات المطلوبة لهذه الوظيفة:</Label>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant={formData.skills.some(s => s.toLowerCase().includes(skill.toLowerCase())) ? 'default' : 'outline'}
                              className={
                                formData.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
                                  ? 'bg-green-100 text-green-800 border-green-200'
                                  : 'bg-red-50 text-red-600 border-red-200'
                              }
                            >
                              {skill}
                              {formData.skills.some(s => s.toLowerCase().includes(skill.toLowerCase())) && (
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                              )}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="certifications">الشهادات والدورات (اختيارية)</Label>
                      <Textarea
                        id="certifications"
                        value={formData.certifications.join('\n')}
                        onChange={(e) => updateFormData('certifications', e.target.value.split('\n').filter(Boolean))}
                        placeholder="اذكر الشهادات المهنية والدورات التي حصلت عليها"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 5: Resume Upload */}
              {currentStep === 5 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 space-x-reverse">
                      <FileText className="w-5 h-5" />
                      <span>السيرة الذاتية</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          id="resume-upload"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <label htmlFor="resume-upload" className="cursor-pointer">
                          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <div className="text-sm text-gray-600">
                            {formData.resumeFile ? (
                              <div className="text-green-600 font-medium">
                                ✓ {formData.resumeFile.name}
                              </div>
                            ) : (
                              <>
                                <div>انقر لرفع السيرة الذاتية</div>
                                <div className="text-xs mt-1">PDF, DOC, DOCX (حد أقصى 5MB)</div>
                              </>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coverLetter">خطاب التقديم (اختياري)</Label>
                      <Textarea
                        id="coverLetter"
                        value={formData.coverLetter}
                        onChange={(e) => updateFormData('coverLetter', e.target.value)}
                        placeholder="اكتب خطاب تقديم يوضح سبب اهتمامك بهذه الوظيفة ومؤهلاتك..."
                        rows={6}
                      />
                    </div>

                    {/* Final matching score */}
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {calculateMatchingScore()}%
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        نسبة التطابق مع متطلبات الوظيفة
                      </div>
                      <div className="flex justify-center">
                        {calculateMatchingScore() >= 80 ? (
                          <Badge className="bg-green-100 text-green-800">
                            مطابقة ممتازة
                          </Badge>
                        ) : calculateMatchingScore() >= 60 ? (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            مطابقة جيدة
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">
                            مطابقة منخفضة
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  السابق
                </Button>

                {currentStep === steps.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStepValid(currentStep) || isSubmitting}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                        جاري الإرسال...
                      </>
                    ) : (
                      'إرسال الطلب'
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    disabled={!isStepValid(currentStep)}
                  >
                    التالي
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}