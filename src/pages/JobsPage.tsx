import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Checkbox } from '../ui/checkbox'
import { Slider } from '../ui/slider'
import JobCard from '../components/features/JobCard'
import JobFilters from '../components/features/JobFilters'
import { 
  Search, 
  MapPin, 
  Filter,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react'

function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    experience: '',
    salaryRange: [0, 50000],
    remote: false,
    skills: []
  })

  console.log('JobsPage: Component rendered')

  // Enhanced jobs data
  const jobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=faces',
      location: 'Dubai, UAE',
      salary: { min: 15000, max: 25000, currency: 'AED' },
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
      benefits: ['Health Insurance', 'Annual Bonus', 'Remote Work', 'Learning Budget'],
      companySize: '100-500',
      industry: 'Technology'
    },
    {
      id: 2,
      title: 'Digital Marketing Manager',
      company: 'Growth Marketing Agency',
      companyLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces',
      location: 'Riyadh, Saudi Arabia',
      salary: { min: 12000, max: 18000, currency: 'SAR' },
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
      benefits: ['Competitive Salary', 'Career Development', 'Team Events'],
      companySize: '50-100',
      industry: 'Marketing'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Creative Design Studio',
      companyLogo: 'https://images.unsplash.com/photo-1494790108755-2616c6e55cb2?w=64&h=64&fit=crop&crop=faces',
      location: 'Cairo, Egypt',
      salary: { min: 8000, max: 12000, currency: 'EGP' },
      type: 'Full-time',
      experience: '1-3 years',
      postedAt: '3 days ago',
      urgent: false,
      featured: false,
      applicants: 67,
      views: 289,
      matchScore: 82,
      description: 'Create beautiful and intuitive user experiences for web and mobile applications.',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Wireframing'],
      remote: true,
      benefits: ['Flexible Hours', 'Creative Environment', 'Project Variety'],
      companySize: '10-50',
      industry: 'Design'
    }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('JobsPage: Search submitted with query:', searchQuery)
  }

  const toggleSavedJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      location: '',
      jobType: '',
      experience: '',
      salaryRange: [0, 50000],
      remote: false,
      skills: []
    })
  }

  const locations = [
    'Dubai, UAE', 'Riyadh, Saudi Arabia', 'Cairo, Egypt', 'Kuwait City, Kuwait',
    'Amman, Jordan', 'Beirut, Lebanon', 'Doha, Qatar', 'Manama, Bahrain'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              اكتشف فرصتك القادمة
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              استكشف آلاف الفرص الوظيفية من أفضل الشركات العالمية
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="imploy-card p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Main Search Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="المسمى الوظيفي، المهارات، أو الشركة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 h-12 text-lg"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="pr-10 h-12 text-lg">
                    <SelectValue placeholder="الموقع" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="imploy-button-primary h-12 text-lg font-semibold"
              >
                <Search className="w-5 h-5 mr-2" />
                بحث
              </Button>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex items-center justify-between">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>فلاتر متقدمة</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
              
              <div className="text-sm text-gray-600">
                عرض <span className="font-semibold">{jobs.length}</span> من أصل <span className="font-semibold">15,420+</span> وظيفة
              </div>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1">
              <JobFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          )}

          {/* Job Listings */}
          <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-6`}>
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedJobs={savedJobs}
                onSaveJob={toggleSavedJob}
                showMatchScore={true}
              />
            ))}

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button variant="outline" disabled className="px-4">
                  السابق
                </Button>
                <Button className="imploy-button-primary px-4">1</Button>
                <Button variant="outline" className="px-4">2</Button>
                <Button variant="outline" className="px-4">3</Button>
                <Button variant="outline" className="px-4">
                  التالي
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobsPage