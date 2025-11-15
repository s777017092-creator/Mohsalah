import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { toast } from 'sonner'

interface User {
  id: string
  name: string
  email: string
  role: 'candidate' | 'employer' | 'admin'
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('AuthProvider: Checking for stored user session...')
    // Check for stored auth token and user data
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user_data')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        console.log('AuthProvider: User session restored:', parsedUser)
      } catch (error) {
        console.error('AuthProvider: Error parsing stored user data:', error)
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
      }
    }
    
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    console.log('AuthProvider: Login attempt for:', email)
    
    try {
      // Mock login - in real app, this would call your backend API
      const mockUser: User = {
        id: '1',
        name: email === 'admin@skillhunt.com' ? 'مدير النظام' : 
              email === 'employer@skillhunt.com' ? 'صاحب عمل' : 'باحث عن عمل',
        email,
        role: email === 'admin@skillhunt.com' ? 'admin' : 
              email === 'employer@skillhunt.com' ? 'employer' : 'candidate'
      }
      
      // Store auth data
      localStorage.setItem('auth_token', 'mock_jwt_token')
      localStorage.setItem('user_data', JSON.stringify(mockUser))
      
      setUser(mockUser)
      toast.success('تم تسجيل الدخول بنجاح')
      console.log('AuthProvider: Login successful for user:', mockUser)
    } catch (error) {
      console.error('AuthProvider: Login failed:', error)
      toast.error('فشل في تسجيل الدخول')
      throw error
    }
  }

  const register = async (name: string, email: string, password: string, role: string) => {
    console.log('AuthProvider: Registration attempt:', { name, email, role })
    
    try {
      // Mock registration - in real app, this would call your backend API
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: role as 'candidate' | 'employer' | 'admin'
      }
      
      // Store auth data
      localStorage.setItem('auth_token', 'mock_jwt_token')
      localStorage.setItem('user_data', JSON.stringify(newUser))
      
      setUser(newUser)
      toast.success('تم إنشاء الحساب بنجاح')
      console.log('AuthProvider: Registration successful for user:', newUser)
    } catch (error) {
      console.error('AuthProvider: Registration failed:', error)
      toast.error('فشل في إنشاء الحساب')
      throw error
    }
  }

  const logout = () => {
    console.log('AuthProvider: User logging out')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    setUser(null)
    toast.success('تم تسجيل الخروج بنجاح')
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}