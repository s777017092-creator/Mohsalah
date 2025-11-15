import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/button'
import { 
  Search, 
  Briefcase, 
  User, 
  LogOut, 
  Menu,
  Globe,
  Building2,
  Users,
  Settings,
  Bell,
  ChevronDown,
  Plus,
  Target,
  FileText,
  Calendar,
  Shield
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  console.log('Header: Rendering with user:', user)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getUserDashboardPath = () => {
    if (!user) return '/'
    switch (user.role) {
      case 'admin': return '/admin'
      case 'employer': return '/employer'
      case 'candidate': return '/seeker'
      default: return '/'
    }
  }

  // Role-specific navigation items
  const getNavItems = () => {
    if (!user) {
      return [
        { path: '/jobs', label: 'Find Jobs', icon: Search },
        { path: '/companies', label: 'Companies', icon: Building2 }
      ]
    }

    switch (user.role) {
      case 'employer':
        return [
          { path: '/employer?tab=talent', label: 'Search Talent', icon: Users },
          { path: '/jobs', label: 'Browse Jobs', icon: Search }
        ]
      case 'candidate':
        return [
          { path: '/jobs', label: 'Find Jobs', icon: Search },
          { path: '/seeker?tab=recommendations', label: 'Recommended', icon: Target },
          { path: '/companies', label: 'Companies', icon: Building2 }
        ]
      case 'admin':
        return [
          { path: '/jobs', label: 'All Jobs', icon: Search },
          { path: '/admin', label: 'Admin Panel', icon: Settings }
        ]
      default:
        return [
          { path: '/jobs', label: 'Find Jobs', icon: Search },
          { path: '/companies', label: 'Companies', icon: Building2 }
        ]
    }
  }

  // Role-specific quick actions
  const getQuickActions = () => {
    if (!user) return []

    switch (user.role) {
      case 'employer':
        return [
          { 
            path: '/employer?action=post-job', 
            label: 'Post Job', 
            icon: Plus, 
            primary: true 
          }
        ]
      case 'candidate':
        return [
          { 
            path: '/seeker?tab=applications', 
            label: 'My Applications', 
            icon: FileText 
          }
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()
  const quickActions = getQuickActions()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">SkillHunt</span>
              <span className="text-xs text-primary block leading-none">Global Talent Platform</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors font-medium"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            {/* Quick Actions */}
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link 
                  key={action.path}
                  to={action.path} 
                  className={`flex items-center space-x-2 transition-colors font-medium ${
                    action.primary 
                      ? 'text-primary hover:text-primary/80' 
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative p-2">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                    3
                  </span>
                </Button>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="hidden sm:block text-left">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500 capitalize">
                          {user.role === 'candidate' && 'Job Seeker'}
                          {user.role === 'employer' && 'Employer'}
                          {user.role === 'admin' && 'Administrator'}
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate(getUserDashboardPath())}>
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    
                    {user.role === 'candidate' && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/seeker?tab=applications')}>
                          <FileText className="w-4 h-4 mr-2" />
                          <span>My Applications</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/seeker?tab=interviews')}>
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Interviews</span>
                        </DropdownMenuItem>
                      </>
                    )}

                    {user.role === 'employer' && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/employer?tab=jobs')}>
                          <Briefcase className="w-4 h-4 mr-2" />
                          <span>My Jobs</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/employer?tab=applications')}>
                          <FileText className="w-4 h-4 mr-2" />
                          <span>Applications</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="w-4 h-4 mr-2" />
                      <span>My Profile</span>
                    </DropdownMenuItem>

                    {user.role === 'admin' && (
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <Settings className="w-4 h-4 mr-2" />
                        <span>Admin Panel</span>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" onClick={() => navigate('/login')} className="font-medium">
                  Sign In
                </Button>

                {/* Admin Login Link - Only show when not logged in */}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/admin-login')} 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium px-3 py-2"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Admin
                </Button>

                <Button 
                  onClick={() => navigate('/register')} 
                  className="imploy-button-primary"
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden p-2">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header