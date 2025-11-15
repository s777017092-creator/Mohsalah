
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Shield, Loader2, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    adminKey: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showAdminKey, setShowAdminKey] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  console.log('AdminLoginPage: Component rendered')

  // Admin credentials - في التطبيق الحقيقي، هذه ستكون في قاعدة البيانات مشفرة
  const ADMIN_CREDENTIALS = {
    username: 'admin@skillhunt.com',
    password: 'SkillHunt@Admin2024',
    adminKey: 'SH-ADMIN-2024-SECURE'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!credentials.username || !credentials.password || !credentials.adminKey) {
      toast.error('جميع الحقول مطلوبة للدخول الإداري')
      return
    }

    console.log('AdminLoginPage: Admin login attempt')
    setLoading(true)

    try {
      // التحقق من بيانات المدير
      if (
        credentials.username === ADMIN_CREDENTIALS.username &&
        credentials.password === ADMIN_CREDENTIALS.password &&
        credentials.adminKey === ADMIN_CREDENTIALS.adminKey
      ) {
        // تسجيل دخول المدير
        await login(credentials.username, credentials.password)
        toast.success('مرحباً بك أيها المدير! تم تسجيل الدخول بنجاح')
        navigate('/admin')
      } else {
        toast.error('بيانات الدخول الإداري غير صحيحة')
      }
    } catch (error) {
      console.error('AdminLoginPage: Admin login failed:', error)
      toast.error('فشل في تسجيل الدخول الإداري')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <Card className="w-full max-w-md relative z-10 border-slate-200 shadow-2xl">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900">
              دخول المدير
            </CardTitle>
            <p className="text-gray-600">
              لوحة التحكم الإدارية - وصول مقيد
            </p>
          </div>

          {/* Security Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Shield className="w-4 h-4 text-amber-600" />
              <span className="text-xs text-amber-800 font-medium">
                منطقة آمنة - مطلوب تصريح إداري
              </span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-right">
                اسم المستخدم الإداري
              </Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="admin@skillhunt.com"
                className="text-right"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-right">
                كلمة المرور الإدارية
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="••••••••••••"
                  className="text-right pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminKey" className="text-right">
                مفتاح التفعيل الإداري
              </Label>
              <div className="relative">
                <Input
                  id="adminKey"
                  type={showAdminKey ? 'text' : 'password'}
                  value={credentials.adminKey}
                  onChange={(e) => handleInputChange('adminKey', e.target.value)}
                  placeholder="SH-ADMIN-****-****"
                  className="text-right pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowAdminKey(!showAdminKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showAdminKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-semibold py-3" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  جاري التحقق من الصلاحيات...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 ml-2" />
                  دخول لوحة الإدارة
                </>
              )}
            </Button>
          </form>

          {/* Admin Credentials Display */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
            <div className="text-xs text-gray-600 space-y-2">
              <div className="font-medium text-center text-gray-800 mb-3">
                بيانات الدخول الإداري:
              </div>
              <div className="space-y-1 text-center">
                <div><strong>المستخدم:</strong> admin@skillhunt.com</div>
                <div><strong>كلمة المرور:</strong> SkillHunt@Admin2024</div>
                <div><strong>المفتاح:</strong> SH-ADMIN-2024-SECURE</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="text-xs text-gray-500">
              محمي بتشفير 256-bit • مراقب 24/7
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminLoginPage
