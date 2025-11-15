import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  Search, 
  MapPin, 
  Clock, 
  Briefcase, 
  Users, 
  TrendingUp,
  Globe,
  Building2,
  Star,
  DollarSign,
  ArrowRight,
  Shield,
  Zap,
  Target,
  CheckCircle,
  Award,
  Rocket,
  UserCheck,
  BarChart3,
  HeadphonesIcon,
  Sparkles,
  Play,
  ChevronRight
} from 'lucide-react'

function HomePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('')

  console.log('HomePage: Rendering with user:', user)

  // Enhanced stats data
  const platformStats = {
    activeJobs: '15,420+',
    registeredCandidates: '89,500+',
    successfulHires: '12,800+',
    partnerCompanies: '2,100+'
  }

  // Featured jobs with enhanced data
  const featuredJobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=faces',
      location: 'Dubai, UAE',
      salary: '15,000 - 25,000',
      currency: 'AED',
      type: 'Full-time',
      experience: '3-5 years',
      postedAt: '2 days ago',
      urgent: true,
      featured: true,
      applicants: 45,
      views: 234,
      matchScore: 95,
      description: 'Join our innovative team building next-generation web applications using cutting-edge technologies.',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'GraphQL'],
      remote: true,
      benefits: ['Health Insurance', 'Annual Bonus', 'Remote Work', 'Learning Budget']
    },
    {
      id: 2,
      title: 'Digital Marketing Manager',
      company: 'Growth Marketing Agency',
      companyLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces',
      location: 'Riyadh, Saudi Arabia',
      salary: '12,000 - 18,000',
      currency: 'SAR',
      type: 'Full-time',
      experience: '2-4 years',
      postedAt: '1 day ago',
      urgent: false,
      featured: true,
      applicants: 28,
      views: 156,
      matchScore: 88,
      description: 'Lead digital marketing campaigns and drive growth for our diverse client portfolio.',
      skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics', 'Content Marketing'],
      remote: false,
      benefits: ['Competitive Salary', 'Career Development', 'Team Events']
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Creative Design Studio',
      companyLogo: 'https://images.unsplash.com/photo-1494790108755-2616c6e55cb2?w=64&h=64&fit=crop&crop=faces',
      location: 'Cairo, Egypt',
      salary: '8,000 - 12,000',
      currency: 'EGP',
      type: 'Full-time',
      experience: '1-3 years',
      postedAt: '3 days ago',
      urgent: false,
      featured: true,
      applicants: 67,
      views: 289,
      matchScore: 82,
      description: 'Create beautiful and intuitive user experiences for web and mobile applications.',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Wireframing'],
      remote: true,
      benefits: ['Flexible Hours', 'Creative Environment', 'Project Variety']
    }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/jobs')
  }

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']
  const locations = [
    'Dubai, UAE', 'Riyadh, Saudi Arabia', 'Cairo, Egypt', 'Kuwait City, Kuwait',
    'Amman, Jordan', 'Beirut, Lebanon', 'Doha, Qatar', 'Manama, Bahrain'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section - Imploy Style */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8 mb-12">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                <Sparkles className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium text-gray-700">The Future of Recruitment is Here</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Find Your Perfect
                <span className="block text-primary">Career Match</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Connect with top employers and discover opportunities that match your skills, 
                experience, and career aspirations with our AI-powered platform.
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Job title, skills, or company"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-primary"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-primary">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger className="h-12 text-lg border-2 border-gray-200 focus:border-primary">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="h-12 imploy-button-primary text-lg font-semibold"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Jobs
                  </Button>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 pt-4 border-t border-gray-100 mt-4">
                  <span>Popular searches: React Developer, Marketing Manager, UI Designer</span>
                  <Link to="/jobs" className="text-primary hover:text-primary/80 font-medium flex items-center">
                    Browse all jobs
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">{platformStats.activeJobs}</div>
                <div className="text-gray-600">Active Jobs</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">{platformStats.registeredCandidates}</div>
                <div className="text-gray-600">Registered Candidates</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">{platformStats.successfulHires}</div>
                <div className="text-gray-600">Successful Hires</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">{platformStats.partnerCompanies}</div>
                <div className="text-gray-600">Partner Companies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
              <Star className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Featured Opportunities</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Latest Job Openings
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Discover hand-picked opportunities from top companies actively hiring talented professionals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="group imploy-card hover:border-primary/20">
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
                            {job.featured && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Featured
                              </Badge>
                            )}
                            {job.remote && (
                              <Badge variant="outline" className="text-xs">
                                Remote
                              </Badge>
                            )}
                          </div>
                          
                          <Link to={`/jobs/${job.id}`}>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">
                              {job.title}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center space-x-2 text-primary">
                            <Building2 className="w-4 h-4" />
                            <span className="font-medium">{job.company}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">{job.postedAt}</div>
                        <Badge variant="outline" className="text-xs">
                          {job.type}
                        </Badge>
                      </div>
                    </div>

                    {/* Job Details */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {job.description}
                    </p>

                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-green-600 font-semibold">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.currency} {job.salary}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.experience}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{job.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Match Score */}
                    {user?.role === 'candidate' && (
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-700">Match Score</span>
                        </div>
                        <div className="text-lg font-bold text-green-600">
                          {job.matchScore}%
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{job.applicants} applicants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{job.views} views</span>
                        </div>
                      </div>
                      
                      <Button asChild size="sm" className="imploy-button-primary">
                        <Link to={`/jobs/${job.id}`}>
                          Apply Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="imploy-button-primary px-8">
              <Link to="/jobs">
                View All Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - Imploy Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose Our Platform?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Advanced recruitment technology meets human expertise to deliver exceptional hiring experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6">
              <div className="feature-icon mx-auto">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">AI-Powered Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Our advanced AI algorithm matches candidates with the most suitable positions based on skills, experience, and preferences.
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="feature-icon mx-auto">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Verified Companies</h3>
              <p className="text-gray-600 leading-relaxed">
                All partner companies are thoroughly vetted to ensure legitimate opportunities and professional work environments.
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="feature-icon mx-auto">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized guidance from our recruitment experts throughout your job search and application process.
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="feature-icon mx-auto">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Career Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Track your application progress and get insights into market trends to optimize your job search strategy.
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="feature-icon mx-auto">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Fast Hiring Process</h3>
              <p className="text-gray-600 leading-relaxed">
                Streamlined application process with quick response times and efficient communication channels.
              </p>
            </div>

            <div className="text-center space-y-4 p-6">
              <div className="feature-icon mx-auto">
                <HeadphonesIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Round-the-clock customer support to assist you with any questions or technical issues you may encounter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Success Stories
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Real stories from professionals who found their dream jobs through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="imploy-card p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-500"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah Ahmed</h4>
                    <p className="text-sm text-gray-600">Software Engineer at TechCorp</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The AI matching system helped me find the perfect role that aligned with my skills and career goals. The entire process was seamless!"
                </p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            <div className="imploy-card p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mohammed Ali</h4>
                    <p className="text-sm text-gray-600">Marketing Director at GrowthCo</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Within 2 weeks of joining, I received multiple offers. The platform's quality and reach is impressive!"
                </p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            <div className="imploy-card p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Lisa Chen</h4>
                    <p className="text-sm text-gray-600">UX Designer at CreativeStudio</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The career support team provided excellent guidance throughout my job search. Highly recommended!"
                </p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-16 bg-gradient-to-r from-primary to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Find Your Dream Job?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Join thousands of professionals who have already found their perfect career match
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  <Link to="/register">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold">
                  <Link to="/jobs">Browse Jobs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default HomePage