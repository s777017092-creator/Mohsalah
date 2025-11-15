import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Globe, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  console.log('LoginPage: Component rendered')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('يرجى ملء جميع الحقول')
      return
    }

    console.log('LoginPage: Login attempt with email:', email)
    setLoading(true)

    try {
      await login(email, password)
      navigate('/')
    } catch (error) {
      console.error('LoginPage: Login failed:', error)
    } finally {
      setLoading(false)
    }
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
            تسجيل الدخول إلى SkillHunt
          </CardTitle>
          <p className="text-gray-600">
            ادخل إلى حسابك للوصول إلى لوحة التحكم
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                'تسجيل الدخول'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <div className="text-sm text-gray-600">
              حسابات تجريبية للاختبار:
            </div>
            <div className="space-y-2 text-xs bg-gray-50 p-3 rounded-lg">
              <div><strong>مدير:</strong> admin@skillhunt.com</div>
              <div><strong>صاحب عمل:</strong> employer@skillhunt.com</div>
              <div><strong>باحث عن عمل:</strong> user@skillhunt.com</div>
              <div className="text-gray-500">كلمة المرور: أي كلمة مرور</div>
            </div>
            
            <div className="text-sm text-gray-600">
              ليس لديك حساب؟{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                إنشاء حساب جديد
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage