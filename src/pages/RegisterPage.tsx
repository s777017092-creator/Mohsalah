import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { Globe, Loader2, User, Building2 } from 'lucide-react'
import { toast } from 'sonner'

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidate'
  })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  console.log('RegisterPage: Component rendered')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('يرجى ملء جميع الحقول المطلوبة')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('كلمتا المرور غير متطابقتين')
      return
    }

    if (formData.password.length < 6) {
      toast.error('يجب أن تكون كلمة المرور 6 أحرف على الأقل')
      return
    }

    console.log('RegisterPage: Registration attempt:', formData)
    setLoading(true)

    try {
      await register(formData.name, formData.email, formData.password, formData.role)
      navigate('/')
    } catch (error) {
      console.error('RegisterPage: Registration failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            إنشاء حساب جديد
          </CardTitle>
          <p className="text-gray-600">
            انضم إلى SkillHunt واكتشف الفرص اللا محدودة
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="أدخل اسمك الكامل"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-3">
              <Label>نوع الحساب</Label>
              <RadioGroup 
                value={formData.role} 
                onValueChange={(value) => handleInputChange('role', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 space-x-reverse p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <RadioGroupItem value="candidate" id="candidate" />
                  <User className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <Label htmlFor="candidate" className="font-medium cursor-pointer">
                      باحث عن عمل
                    </Label>
                    <p className="text-sm text-gray-500">
                      أبحث عن فرص وظيفية جديدة
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <RadioGroupItem value="employer" id="employer" />
                  <Building2 className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <Label htmlFor="employer" className="font-medium cursor-pointer">
                      صاحب عمل
                    </Label>
                    <p className="text-sm text-gray-500">
                      أريد نشر وظائف وتوظيف مواهب
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  جاري إنشاء الحساب...
                </>
              ) : (
                'إنشاء حساب'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <div className="text-sm text-gray-600">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterPage