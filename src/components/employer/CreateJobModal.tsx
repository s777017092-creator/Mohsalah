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
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Building2,
  Calendar,
  Zap,
  Target,
  Globe,
  Eye,
  Save,
  Send
} from 'lucide-react'
import { toast } from 'sonner'
import { jobsApi } from '../../lib/api'
import platformConfig from '../../config/platform'

// Validation schema
const jobSchema = z.object({
  title: z.string().min(3, 'يجب أن يكون عنوان الوظيفة 3 أحرف على الأقل'),
  department: z.string().min(2, 'القسم مطلوب'),
  location: z.string().min(2, 'الموقع مطلوب'),
  type: z.string().min(1, 'نوع الوظيفة مطلوب'),
  salary_min: z.number().min(0, 'الحد الأدنى للراتب يجب أن يكون موجباً'),
  salary_max: z.number().min(0, 'الحد الأقصى للراتب يجب أن يكون موجباً'),
  currency: z.string().min(3, 'العملة مطلوبة'),
  description: z.string().min(100, 'الوصف يجب أن يكون 100 حرف على الأقل'),
  experience: z.string().min(2, 'مستوى الخبرة مطلوب'),
  education: z.string().min(2, 'المستوى التعليمي مطلوب'),
  remote: z.boolean(),
  urgent: z.boolean(),
}).refine(data => data.salary_max >= data.salary_min, {
  message: 'الحد الأقصى للراتب يجب أن يكون أكبر من أو يساوي الحد الأدنى',
  path: ['salary_max'],
})

type JobFormData = z.infer<typeof jobSchema>

interface CreateJobModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  companyId: number
}

export default function CreateJobModal({ isOpen, onClose, onSuccess, companyId }: CreateJobModalProps) {
  const [currentTab, setCurrentTab] = useState('basic')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [requirements, setRequirements] = useState<string[]>([])
  const [responsibilities, setResponsibilities] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [benefits, setBenefits] = useState<string[]>([])
  const [newItem, setNewItem] = useState('')
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      remote: false,
      urgent: false,
      salary_min: 0,
      salary_max: 0,
      currency: 'AED',
      type: 'Full-time',
    }
  })

  const watchedValues = watch()
  const completeness = calculateCompleteness(watchedValues, requirements, responsibilities, skills)

  function calculateCompleteness(data: any, req: string[], resp: string[], sk: string[]): number {
    let score = 0
    const checks = [
      data.title?.length >= 3,
      data.department?.length >= 2,
      data.location?.length >= 2,
      data.type?.length > 0,
      data.salary_min > 0,
      data.salary_max > 0,
      data.description?.length >= 100,
      data.experience?.length >= 2,
      data.education?.length >= 2,
      req.length >= 3,
      resp.length >= 3,
      sk.length >= 3,
    ]
    
    checks.forEach(check => {
      if (check) score += 100 / checks.length
    })
    
    return Math.round(score)
  }

  const addItem = (type: 'requirements' | 'responsibilities' | 'skills' | 'benefits') => {
    if (!newItem.trim()) return

    const setters = {
      requirements: setRequirements,
      responsibilities: setResponsibilities,
      skills: setSkills,
      benefits: setBenefits,
    }

    const getters = {
      requirements,
      responsibilities,
      skills,
      benefits,
    }

    const currentItems = getters[type]
    if (!currentItems.includes(newItem.trim())) {
      setters[type]([...currentItems, newItem.trim()])
      setNewItem('')
    } else {
      toast.error('هذا العنصر موجود بالفعل')
    }
  }

  const removeItem = (type: 'requirements' | 'responsibilities' | 'skills' | 'benefits', index: number) => {
    const setters = {
      requirements: setRequirements,
      responsibilities: setResponsibilities,
      skills: setSkills,
      benefits: setBenefits,
    }

    const getters = {
      requirements,
      responsibilities,
      skills,
      benefits,
    }

    setters[type](getters[type].filter((_, i) => i !== index))
  }

  const onSubmit = async (data: JobFormData) => {
    if (requirements.length < 2) {
      toast.error('يرجى إضافة متطلبين على الأقل للوظيفة')
      setCurrentTab('details')
      return
    }

    if (skills.length < 2) {
      toast.error('يرجى إضافة مهارتين على الأقل')
      setCurrentTab('details')
      return
    }

    setIsSubmitting(true)

    try {
      const jobData = {
        ...data,
        company_id: companyId,
        requirements,
        responsibilities,
        skills,
        benefits,
        status: 'pending', // سيذهب للأدمن للموافقة
        views: 0,
        saves: 0,
        application_count: 0,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 يوم
      }

      const result = await jobsApi.create(jobData)

      if (result.success) {
        toast.success('تم إرسال الوظيفة للمراجعة بنجاح! ستظهر بعد موافقة الإدارة.')
        reset()
        setRequirements([])
        setResponsibilities([])
        setSkills([])
        setBenefits([])
        onSuccess?.()
        onClose()
      } else {
        toast.error(result.message || 'حدث خطأ أثناء إنشاء الوظيفة')
      }
    } catch (error) {
      console.error('Error creating job:', error)
      toast.error('حدث خطأ أثناء إنشاء الوظيفة')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            نشر وظيفة جديدة
          </DialogTitle>
          <DialogDescription>
            أكمل جميع المعلومات المطلوبة لنشر الوظيفة
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              اكتمال البيانات: {completeness}%
            </span>
            <div className="flex items-center gap-2">
              {completeness === 100 ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              )}
            </div>
          </div>
          <Progress value={completeness} className="h-2" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                المعلومات الأساسية
              </TabsTrigger>
              <TabsTrigger value="details" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                التفاصيل والمتطلبات
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                معاينة ونشر
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Basic Information */}
            <TabsContent value="basic" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    معلومات الوظيفة
                  </CardTitle>
                  <CardDescription>أدخل المعلومات الأساسية للوظيفة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Job Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">عنوان الوظيفة *</Label>
                    <Input
                      id="title"
                      {...register('title')}
                      placeholder="مثال: مطور Full Stack"
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title.message}</p>
                    )}
                  </div>

                  {/* Department & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">القسم *</Label>
                      <Input
                        id="department"
                        {...register('department')}
                        placeholder="مثال: تطوير البرمجيات"
                        className={errors.department ? 'border-red-500' : ''}
                      />
                      {errors.department && (
                        <p className="text-sm text-red-500">{errors.department.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">الموقع *</Label>
                      <Controller
                        name="location"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className={errors.location ? 'border-red-500' : ''}>
                              <SelectValue placeholder="اختر الموقع" />
                            </SelectTrigger>
                            <SelectContent>
                              {platformConfig.locations.map((loc) => (
                                <SelectItem key={loc} value={loc}>
                                  {loc}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.location && (
                        <p className="text-sm text-red-500">{errors.location.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Job Type & Remote */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">نوع الوظيفة *</Label>
                      <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر نوع الوظيفة" />
                            </SelectTrigger>
                            <SelectContent>
                              {platformConfig.jobs.types.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    <div className="flex items-center space-x-2 space-x-reverse pt-8">
                      <Controller
                        name="remote"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="remote"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="remote" className="flex items-center gap-2 cursor-pointer">
                        <Globe className="w-4 h-4" />
                        عمل عن بُعد
                      </Label>
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div className="space-y-4">
                    <Label>نطاق الراتب *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="salary_min">الحد الأدنى</Label>
                        <Input
                          id="salary_min"
                          type="number"
                          {...register('salary_min', { valueAsNumber: true })}
                          placeholder="10000"
                          className={errors.salary_min ? 'border-red-500' : ''}
                        />
                        {errors.salary_min && (
                          <p className="text-sm text-red-500">{errors.salary_min.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salary_max">الحد الأقصى</Label>
                        <Input
                          id="salary_max"
                          type="number"
                          {...register('salary_max', { valueAsNumber: true })}
                          placeholder="20000"
                          className={errors.salary_max ? 'border-red-500' : ''}
                        />
                        {errors.salary_max && (
                          <p className="text-sm text-red-500">{errors.salary_max.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currency">العملة</Label>
                        <Controller
                          name="currency"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {platformConfig.currencies.map((currency) => (
                                  <SelectItem key={currency.code} value={currency.code}>
                                    {currency.code} - {currency.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Experience & Education */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">مستوى الخبرة *</Label>
                      <Controller
                        name="experience"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className={errors.experience ? 'border-red-500' : ''}>
                              <SelectValue placeholder="اختر مستوى الخبرة" />
                            </SelectTrigger>
                            <SelectContent>
                              {platformConfig.jobs.experienceLevels.map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.experience && (
                        <p className="text-sm text-red-500">{errors.experience.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="education">المستوى التعليمي *</Label>
                      <Controller
                        name="education"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className={errors.education ? 'border-red-500' : ''}>
                              <SelectValue placeholder="اختر المستوى التعليمي" />
                            </SelectTrigger>
                            <SelectContent>
                              {platformConfig.jobs.educationLevels.map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.education && (
                        <p className="text-sm text-red-500">{errors.education.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">وصف الوظيفة *</Label>
                    <Textarea
                      id="description"
                      {...register('description')}
                      rows={6}
                      placeholder="اكتب وصفاً تفصيلياً للوظيفة، المهام الرئيسية، وبيئة العمل..."
                      className={errors.description ? 'border-red-500' : ''}
                    />
                    <div className="flex justify-between items-center">
                      {errors.description && (
                        <p className="text-sm text-red-500">{errors.description.message}</p>
                      )}
                      <p className="text-sm text-gray-500 mr-auto">
                        {watchedValues.description?.length || 0} / 100 حرف على الأقل
                      </p>
                    </div>
                  </div>

                  {/* Urgent Checkbox */}
                  <div className="flex items-center space-x-2 space-x-reverse p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <Controller
                      name="urgent"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="urgent"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="urgent" className="flex items-center gap-2 cursor-pointer">
                      <Zap className="w-4 h-4 text-yellow-600" />
                      <span>وظيفة عاجلة (ستظهر في الأعلى)</span>
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="button" onClick={() => setCurrentTab('details')}>
                  التالي: التفاصيل والمتطلبات
                </Button>
              </div>
            </TabsContent>

            {/* Tab 2: Details & Requirements */}
            <TabsContent value="details" className="space-y-6 mt-6">
              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    متطلبات الوظيفة *
                  </CardTitle>
                  <CardDescription>أضف المتطلبات الأساسية للوظيفة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="مثال: خبرة 3 سنوات في React"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addItem('requirements')
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => addItem('requirements')}
                      size="icon"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {requirements.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {requirements.map((req, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-2 px-3 py-1"
                        >
                          {req}
                          <button
                            type="button"
                            onClick={() => removeItem('requirements', index)}
                            className="hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {requirements.length < 2 && (
                    <p className="text-sm text-yellow-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      يرجى إضافة متطلبين على الأقل
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Responsibilities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    المسؤوليات
                  </CardTitle>
                  <CardDescription>حدد المسؤوليات الرئيسية للوظيفة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="مثال: تطوير واجهات المستخدم"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addItem('responsibilities')
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => addItem('responsibilities')}
                      size="icon"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {responsibilities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {responsibilities.map((resp, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-2 px-3 py-1"
                        >
                          {resp}
                          <button
                            type="button"
                            onClick={() => removeItem('responsibilities', index)}
                            className="hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    المهارات المطلوبة *
                  </CardTitle>
                  <CardDescription>حدد المهارات التقنية المطلوبة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="مثال: React, TypeScript, Node.js"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addItem('skills')
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => addItem('skills')}
                      size="icon"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="flex items-center gap-2 px-3 py-1 bg-primary text-white"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeItem('skills', index)}
                            className="hover:text-red-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {skills.length < 2 && (
                    <p className="text-sm text-yellow-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      يرجى إضافة مهارتين على الأقل
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    المزايا والحوافز
                  </CardTitle>
                  <CardDescription>أضف المزايا التي تقدمها الشركة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="مثال: تأمين صحي، بونص سنوي"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addItem('benefits')
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => addItem('benefits')}
                      size="icon"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {benefits.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {benefits.map((benefit, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="flex items-center gap-2 px-3 py-1"
                        >
                          {benefit}
                          <button
                            type="button"
                            onClick={() => removeItem('benefits', index)}
                            className="hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setCurrentTab('basic')}>
                  السابق
                </Button>
                <Button type="button" onClick={() => setCurrentTab('preview')}>
                  التالي: المعاينة
                </Button>
              </div>
            </TabsContent>

            {/* Tab 3: Preview */}
            <TabsContent value="preview" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    معاينة الوظيفة
                  </CardTitle>
                  <CardDescription>
                    راجع جميع المعلومات قبل النشر
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Job Header */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {watchedValues.title || 'عنوان الوظيفة'}
                        </h2>
                        <p className="text-gray-600 mt-1">
                          {watchedValues.department || 'القسم'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {watchedValues.urgent && (
                          <Badge className="bg-red-500">عاجل</Badge>
                        )}
                        {watchedValues.remote && (
                          <Badge variant="outline">عن بُعد</Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {watchedValues.location || 'الموقع'}
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {watchedValues.type || 'نوع الوظيفة'}
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {watchedValues.salary_min && watchedValues.salary_max
                          ? `${watchedValues.salary_min.toLocaleString()} - ${watchedValues.salary_max.toLocaleString()} ${watchedValues.currency}`
                          : 'الراتب'}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {watchedValues.experience || 'مستوى الخبرة'}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {watchedValues.description && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">الوصف</h3>
                      <p className="text-gray-600 whitespace-pre-wrap">
                        {watchedValues.description}
                      </p>
                    </div>
                  )}

                  {/* Requirements */}
                  {requirements.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">المتطلبات</h3>
                      <ul className="space-y-2">
                        {requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Responsibilities */}
                  {responsibilities.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">المسؤوليات</h3>
                      <ul className="space-y-2">
                        {responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills */}
                  {skills.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">المهارات المطلوبة</h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge key={index} className="bg-primary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  {benefits.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">المزايا</h3>
                      <div className="flex flex-wrap gap-2">
                        {benefits.map((benefit, index) => (
                          <Badge key={index} variant="outline">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Validation Messages */}
                  {completeness < 100 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-900">
                            يرجى استكمال جميع المعلومات المطلوبة
                          </p>
                          <ul className="mt-2 space-y-1 text-sm text-yellow-800">
                            {!watchedValues.title && <li>• عنوان الوظيفة</li>}
                            {!watchedValues.description || watchedValues.description.length < 100 && <li>• وصف الوظيفة (100 حرف على الأقل)</li>}
                            {requirements.length < 2 && <li>• المتطلبات (متطلبان على الأقل)</li>}
                            {skills.length < 2 && <li>• المهارات (مهارتان على الأقل)</li>}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setCurrentTab('details')}>
                  السابق
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting || completeness < 100}
                    className="gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        جاري النشر...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        نشر الوظيفة
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </DialogContent>
    </Dialog>
  )
}
