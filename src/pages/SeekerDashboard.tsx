import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Progress } from '../components/ui/progress'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  User, 
  Briefcase, 
  FileText, 
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  DollarSign,
  Star,
  TrendingUp,
  Target,
  BookOpen,
  Search,
  Filter,
  Bell,
  Calendar,
  Award,
  Send,
  Download,
  Upload,
  Edit,
  Heart,
  Bookmark
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

function SeekerDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [jobSearch, setJobSearch] = useState('')
  const [savedJobs, setSavedJobs] = useState<number[]>([1, 3])

  console.log('SeekerDashboard: Rendering for user:', user)

  // Job seeker specific data
  const stats = {
    applicationsSubmitted: 18,
    interviewsScheduled: 3,
    jobsViewed: 45,
    profileViews: 127,
    savedJobs: 12,
    alertsSet: 5
  }

  const myApplications = [
    {
      id: 1,
      jobTitle: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      appliedAt: '2 days ago',
      status: 'Under Review',
      matchScore: 92,
      location: 'Dubai, UAE',
      salary: '15,000 - 25,000 AED',
      type: 'Full-time'
    },
    {
      id: 2,
      jobTitle: 'React Developer',
      company: 'Digital Innovation',
      appliedAt: '4 days ago',
      status: 'Interview Scheduled',
      matchScore: 88,
      location: 'Riyadh, Saudi Arabia',
      salary: '12,000 - 18,000 SAR',
      type: 'Full-time'
    },
    {
      id: 3,
      jobTitle: 'Frontend Engineer',
      company: 'StartupTech',
      appliedAt: '1 week ago',
      status: 'Rejected',
      matchScore: 75,
      location: 'Cairo, Egypt',
      salary: '15,000 - 25,000 EGP',
      type: 'Contract'
    },
    {
      id: 4,
      jobTitle: 'Mobile App Developer',
      company: 'Mobile Solutions Inc',
      appliedAt: '2 weeks ago',
      status: 'Accepted',
      matchScore: 85,
      location: 'Amman, Jordan',
      salary: '800 - 1,200 JOD',
      type: 'Full-time'
    }
  ]

  const recommendedJobs = [
    {
      id: 5,
      title: 'Senior React Developer',
      company: 'Tech Solutions',
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop',
      location: 'Dubai, UAE',
      salary: '18,000 - 28,000 AED',
      matchScore: 95,
      postedAt: '1 day ago',
      type: 'Full-time',
      skills: ['React', 'TypeScript', 'Node.js'],
      remote: true,
      urgent: true
    },
    {
      id: 6,
      title: 'Flutter Developer',
      company: 'Mobile Innovations',
      companyLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop',
      location: 'Kuwait City, Kuwait',
      salary: '1,800 - 2,500 KWD',
      matchScore: 89,
      postedAt: '3 days ago',
      type: 'Full-time',
      skills: ['Flutter', 'Dart', 'Firebase'],
      remote: false,
      urgent: false
    },
    {
      id: 7,
      title: 'Frontend Engineer',
      company: 'Creative Studio',
      companyLogo: 'https://images.unsplash.com/photo-1494790108755-2616c6e55cb2?w=64&h=64&fit=crop',
      location: 'Beirut, Lebanon',
      salary: '1,500 - 2,200 USD',
      matchScore: 82,
      postedAt: '5 days ago',
      type: 'Contract',
      skills: ['Vue.js', 'JavaScript', 'CSS'],
      remote: true,
      urgent: false
    }
  ]

  const upcomingInterviews = [
    {
      id: 1,
      jobTitle: 'React Developer',
      company: 'Digital Innovation',
      date: 'Tomorrow',
      time: '2:00 PM',
      type: 'Video Interview',
      interviewerName: 'Ahmed Mohamed'
    },
    {
      id: 2,
      jobTitle: 'Senior React Developer',
      company: 'Tech Solutions',
      date: 'Friday',
      time: '10:00 AM',
      type: 'In-person',
      interviewerName: 'Sarah Ali'
    }
  ]

  const jobAlerts = [
    {
      id: 1,
      name: 'React Developer Jobs',
      criteria: 'React, JavaScript, Dubai',
      frequency: 'Daily',
      newJobs: 3
    },
    {
      id: 2,
      name: 'Remote Frontend Jobs',
      criteria: 'Frontend, Remote, 15000+',
      frequency: 'Weekly',
      newJobs: 7
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Under Review':
        return <Badge variant="secondary">Under Review</Badge>
      case 'Interview Scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Interview Scheduled</Badge>
      case 'Accepted':
        return <Badge className="bg-green-100 text-green-800">Accepted</Badge>
      case 'Rejected':
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Under Review':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'Interview Scheduled':
        return <Calendar className="w-4 h-4 text-blue-600" />
      case 'Accepted':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const handleApplyToJob = (jobId: number) => {
    console.log('SeekerDashboard: Applying to recommended job:', jobId)
    toast.success('Application submitted successfully!')
  }

  const handleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
    toast.success(savedJobs.includes(jobId) ? 'Job removed from saved' : 'Job saved successfully!')
  }

  const profileCompleteness = 75

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}
              </h1>
              <p className="text-gray-600 mt-1">Find your next great opportunity</p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={() => setActiveTab('search')}
                className="imploy-button-primary flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Jobs</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setActiveTab('profile')}
                className="flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Update Profile</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.applicationsSubmitted}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Interviews</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.interviewsScheduled}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Jobs Viewed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.jobsViewed}</p>
                </div>
                <Eye className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.profileViews}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Saved Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.savedJobs}</p>
                </div>
                <Bookmark className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Job Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.alertsSet}</p>
                </div>
                <Bell className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="search">Job Search</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="recommendations">Recommended</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full justify-start h-16 text-left" 
                    onClick={() => setActiveTab('search')}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Search className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">Search Jobs</div>
                        <div className="text-sm text-gray-600">Find new opportunities</div>
                      </div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-16 text-left"
                    onClick={() => setActiveTab('recommendations')}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold">View Recommendations</div>
                        <div className="text-sm text-gray-600">Jobs matched to your profile</div>
                      </div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-16 text-left"
                    onClick={() => setActiveTab('profile')}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold">Update Profile</div>
                        <div className="text-sm text-gray-600">Improve your visibility</div>
                      </div>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              {/* Profile Completion */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Profile Completion</span>
                    <span className="text-sm font-normal text-gray-600">{profileCompleteness}%</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={profileCompleteness} className="w-full" />
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-green-600">✓ Basic Information</span>
                      <span className="text-gray-500">Complete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600">✓ Work Experience</span>
                      <span className="text-gray-500">Complete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-600">○ Skills & Certifications</span>
                      <span className="text-gray-500">Incomplete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-600">○ Portfolio</span>
                      <span className="text-gray-500">Missing</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline" onClick={() => setActiveTab('profile')}>
                    <User className="w-4 h-4 mr-2" />
                    Complete Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Interviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Interviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div key={interview.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">{interview.jobTitle}</h4>
                        <p className="text-sm text-primary">{interview.company}</p>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{interview.date} at {interview.time}</span>
                          <Badge variant="outline">{interview.type}</Badge>
                        </div>
                        <p className="text-xs text-gray-500">Interviewer: {interview.interviewerName}</p>
                      </div>
                    </div>
                  ))}
                  {upcomingInterviews.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No upcoming interviews</p>
                  )}
                </CardContent>
              </Card>

              {/* Job Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{alert.name}</h4>
                          <p className="text-xs text-gray-600">{alert.criteria}</p>
                          <p className="text-xs text-gray-500">{alert.frequency} updates</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-primary">{alert.newJobs}</span>
                          <p className="text-xs text-gray-500">new jobs</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="search">
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-900">Job Search</h2>
              </div>

              {/* Search Form */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative md:col-span-2">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Job title, skills, or company..."
                        value={jobSearch}
                        onChange={(e) => setJobSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dubai">Dubai, UAE</SelectItem>
                        <SelectItem value="riyadh">Riyadh, Saudi Arabia</SelectItem>
                        <SelectItem value="cairo">Cairo, Egypt</SelectItem>
                        <SelectItem value="kuwait">Kuwait City, Kuwait</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button className="imploy-button-primary">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Search Results would go here */}
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Job Search</h3>
                <p className="text-gray-600">Use the search form above to find jobs that match your skills and preferences</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">My Applications ({myApplications.length})</h2>
              
              <div className="space-y-4">
                {myApplications.map((application) => (
                  <Card key={application.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{application.jobTitle}</h3>
                              <p className="text-primary font-medium">{application.company}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
                                <Star className="w-4 h-4 text-yellow-600" />
                                <span className="text-sm font-medium text-yellow-800">{application.matchScore}%</span>
                              </div>
                              {getStatusBadge(application.status)}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>{application.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4" />
                              <span>{application.salary}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Briefcase className="w-4 h-4" />
                              <span>{application.type}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            {getStatusIcon(application.status)}
                            <span>Applied {application.appliedAt}</span>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 lg:w-32">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/jobs/${application.id}`}>View Job</Link>
                          </Button>
                          {application.status === 'Interview Scheduled' && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Interview Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Recommended Jobs for You</h2>
                <Button variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Update Preferences
                </Button>
              </div>

              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Job Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex space-x-4 flex-1">
                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                              <img 
                                src={job.companyLogo} 
                                alt={job.company}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1 space-y-2">
                              <div className="flex items-center space-x-2 flex-wrap gap-2">
                                {job.urgent && (
                                  <Badge className="bg-red-100 text-red-800 text-xs">
                                    Urgent
                                  </Badge>
                                )}
                                {job.remote && (
                                  <Badge variant="outline" className="text-xs">
                                    Remote
                                  </Badge>
                                )}
                              </div>
                              
                              <Link to={`/jobs/${job.id}`}>
                                <h3 className="text-lg font-bold text-gray-900 hover:text-primary transition-colors leading-tight">
                                  {job.title}
                                </h3>
                              </Link>
                              
                              <p className="text-primary font-medium">{job.company}</p>
                            </div>
                          </div>

                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-2"
                            onClick={() => handleSaveJob(job.id)}
                          >
                            <Heart className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-current text-red-500' : ''}`} />
                          </Button>
                        </div>

                        {/* Job Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-green-600 font-semibold">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>

                          <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{job.postedAt}</span>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Match Score */}
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-gray-700">Match Score</span>
                          </div>
                          <div className="text-lg font-bold text-green-600">
                            {job.matchScore}%
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <Badge variant="outline">{job.type}</Badge>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/jobs/${job.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </Button>
                            <Button 
                              size="sm" 
                              className="imploy-button-primary"
                              onClick={() => handleApplyToJob(job.id)}
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interviews">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Interview Schedule</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Interviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingInterviews.map((interview) => (
                      <div key={interview.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900">{interview.jobTitle}</h4>
                          <p className="text-sm text-primary">{interview.company}</p>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{interview.date} at {interview.time}</span>
                            <Badge variant="outline">{interview.type}</Badge>
                          </div>
                          <p className="text-xs text-gray-500">Interviewer: {interview.interviewerName}</p>
                          <div className="flex space-x-2 mt-3">
                            <Button size="sm" variant="outline">Reschedule</Button>
                            <Button size="sm">Prepare</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {upcomingInterviews.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No upcoming interviews</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interview Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">Research the Company</h4>
                          <p className="text-sm text-gray-600">Learn about their mission, values, and recent news</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">Practice Common Questions</h4>
                          <p className="text-sm text-gray-600">Prepare answers for behavioral and technical questions</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">Prepare Your Questions</h4>
                          <p className="text-sm text-gray-600">Show your interest by asking thoughtful questions</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">My Profile</h2>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
                      <p className="text-gray-600">Full Stack Developer</p>
                    </div>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span>Dubai, UAE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experience:</span>
                        <span>5+ years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Availability:</span>
                        <span className="text-green-600">Available</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-l-2 border-primary pl-4">
                      <h4 className="font-medium text-gray-900">Senior Full Stack Developer</h4>
                      <p className="text-primary text-sm">Tech Solutions Inc.</p>
                      <p className="text-gray-500 text-sm">2022 - Present</p>
                      <p className="text-gray-700 text-sm mt-2">
                        Leading development of scalable web applications using React and Node.js. 
                        Managed team of 5 developers and improved application performance by 40%.
                      </p>
                    </div>
                    <div className="border-l-2 border-gray-200 pl-4">
                      <h4 className="font-medium text-gray-900">Frontend Developer</h4>
                      <p className="text-primary text-sm">Digital Agency</p>
                      <p className="text-gray-500 text-sm">2020 - 2022</p>
                      <p className="text-gray-700 text-sm mt-2">
                        Developed responsive web applications with focus on user experience and performance optimization.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default SeekerDashboard