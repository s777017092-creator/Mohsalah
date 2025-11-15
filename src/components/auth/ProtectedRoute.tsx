import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
  roles?: string[]
}

function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  console.log('ProtectedRoute: Checking access for user:', user, 'Required roles:', roles)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    console.log('ProtectedRoute: User not authenticated, redirecting to login')
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.includes(user.role)) {
    console.log('ProtectedRoute: User role not authorized, redirecting to home')
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute