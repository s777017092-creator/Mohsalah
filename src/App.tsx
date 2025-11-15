import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
import CompaniesPage from './pages/CompaniesPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminLoginPage from './pages/AdminLoginPage'
import EmployerDashboard from './pages/EmployerDashboard'
import SeekerDashboard from './pages/SeekerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import ErrorBoundary from './components/common/ErrorBoundary'

console.log('App component loaded')

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
                        <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            
            <Route path="/profile" element={
              <ProtectedRoute roles={['candidate', 'employer', 'admin']}>
                <ProfilePage />
              </ProtectedRoute>
            } />
            
            <Route path="/employer" element={
              <ProtectedRoute roles={['employer']}>
                <EmployerDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/seeker" element={
              <ProtectedRoute roles={['candidate']}>
                <SeekerDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App