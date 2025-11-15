import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Upload,
  Save,
  Plus,
  X,
  Edit,
  Camera
} from 'lucide-react'
import { toast } from 'sonner'

function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+966501234567',
    location: 'الرياض، السعودية',
    headline: 'مطور تطبيقات React Native',
    summary: 'مطور برمجيات متمرس بخبرة أكثر من 5 سنوات في تطوير تطبيقات الويب والموبايل',
    skills: ['React', 'React Native', 'JavaScript', 'TypeScript', 'Node.js', 'Firebase'],
    experience: [
      {
        title: 'مطور React Native أول',
        company: 'شركة التكنولوجيا المتقدمة',
        location: 'الرياض، السعودية',
        startDate: '2022-01',
        endDate: 'الآن',
        description: 'قيادة فريق تطوير التطبيقات وإدارة المشاريع التقنية'
      }
    ],
    education: [
      {
        degree: 'بكالوريوس هندسة الحاسوب',
        school: 'جامعة الملك سعود',
        location: 'الرياض، السعودية',
        startDate: '2015',
        endDate: '2019'
      }
    ],
    certifications: ['AWS Certified Developer', 'React Native Certification'],
    languages: ['العربية (اللغة الأم)', 'الإنجليزية (متقدم)']
  })

  const [newSkill, setNewSkill] = useState('')

  const handleSave = () => {
    console.log('Saving profile:', profileData)
    setIsEditing(false)
    toast.success('تم حفظ الملف الشخصي بنجاح')
  }

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">الملف الشخصي</h1>
              <p className="text-gray-600 mt-1">إدارة معلوماتك الشخصية والمهنية</p>
            </div>
            
            <div className="flex space-x-3 space-x-reverse">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="imploy-button-primary">
                    <Save className="w-4 h-4 mr-2" />
                    حفظ التغييرات
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    إلغاء
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="imploy-button-primary">
                  <Edit className="w-4 h-4 mr-2" />
                  تعديل الملف الشخصي
                </Button>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">المعلومات الأساسية</TabsTrigger>
            <TabsTrigger value="experience">الخبرة</TabsTrigger>
            <TabsTrigger value="education">التعليم</TabsTrigger>
            <TabsTrigger value="skills">المهارات</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Picture */}
              <Card>
                <CardHeader>
                  <CardTitle>الصورة الشخصية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-16 h-16 text-primary" />
                      </div>
                      {isEditing && (
                        <Button size="sm" className="absolute bottom-0 right-0 rounded-full p-2">
                          <Camera className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        رفع صورة
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Basic Info */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>المعلومات الأساسية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">الموقع</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="headline">العنوان المهني</Label>
                    <Input
                      id="headline"
                      value={profileData.headline}
                      onChange={(e) => setProfileData(prev => ({ ...prev, headline: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary">نبذة تعريفية</Label>
                    <Textarea
                      id="summary"
                      value={profileData.summary}
                      onChange={(e) => setProfileData(prev => ({ ...prev, summary: e.target.value }))}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="experience">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>الخبرة العملية</CardTitle>
                {isEditing && (
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة خبرة
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="border-r-2 border-primary pr-4 space-y-2">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input placeholder="المسمى الوظيفي" defaultValue={exp.title} />
                          <Input placeholder="اسم الشركة" defaultValue={exp.company} />
                          <Input placeholder="الموقع" defaultValue={exp.location} />
                          <div className="flex space-x-2 space-x-reverse">
                            <Input placeholder="من" defaultValue={exp.startDate} />
                            <Input placeholder="إلى" defaultValue={exp.endDate} />
                          </div>
                        </div>
                        <Textarea placeholder="وصف المهام" defaultValue={exp.description} rows={3} />
                      </div>
                    ) : (
                      <>
                        <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                        <p className="text-primary font-medium">{exp.company}</p>
                        <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <MapPin className="w-3 h-3" />
                            <span>{exp.location}</span>
                          </div>
                          <span>{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{exp.description}</p>
                      </>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>التعليم</CardTitle>
                {isEditing && (
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة مؤهل
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="border-r-2 border-green-500 pr-4 space-y-2">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input placeholder="الدرجة العلمية" defaultValue={edu.degree} />
                          <Input placeholder="اسم المؤسسة" defaultValue={edu.school} />
                          <Input placeholder="الموقع" defaultValue={edu.location} />
                          <div className="flex space-x-2 space-x-reverse">
                            <Input placeholder="من" defaultValue={edu.startDate} />
                            <Input placeholder="إلى" defaultValue={edu.endDate} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                        <p className="text-green-600 font-medium">{edu.school}</p>
                        <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <MapPin className="w-3 h-3" />
                            <span>{edu.location}</span>
                          </div>
                          <span>{edu.startDate} - {edu.endDate}</span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <div className="space-y-6">
              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>المهارات التقنية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing && (
                    <div className="flex space-x-2 space-x-reverse">
                      <Input
                        placeholder="إضافة مهارة جديدة"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1">
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="mr-2 text-gray-500 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle>الشهادات المهنية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {profileData.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span>{cert}</span>
                        {isEditing && (
                          <Button variant="ghost" size="sm">
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardHeader>
                  <CardTitle>اللغات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {profileData.languages.map((lang, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span>{lang}</span>
                        {isEditing && (
                          <Button variant="ghost" size="sm">
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProfilePage