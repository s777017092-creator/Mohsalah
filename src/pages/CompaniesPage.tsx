import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Search, 
  MapPin, 
  Users, 
  Building2,
  ExternalLink,
  Star,
  Briefcase,
  Globe,
  Filter
} from 'lucide-react'

function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const companies = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop',
      industry: 'Technology',
      location: 'Dubai, UAE',
      size: '100-500',
      rating: 4.5,
      openJobs: 12,
      description: 'شركة رائدة في مجال تطوير البرمجيات والحلول التقنية المبتكرة',
      website: 'https://techcorp.com',
      founded: '2015'
    },
    {
      id: 2,
      name: 'Growth Marketing Agency',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
      industry: 'Marketing',
      location: 'Riyadh, Saudi Arabia',
      size: '50-100',
      rating: 4.3,
      openJobs: 8,
      description: 'وكالة تسويق رقمي متخصصة في النمو والاستراتيجيات التسويقية',
      website: 'https://growthmarketing.com',
      founded: '2018'
    },
    {
      id: 3,
      name: 'Creative Design Studio',
      logo: 'https://images.unsplash.com/photo-1494790108755-2616c6e55cb2?w=80&h=80&fit=crop',
      industry: 'Design',
      location: 'Cairo, Egypt',
      size: '10-50',
      rating: 4.7,
      openJobs: 5,
      description: 'استوديو تصميم إبداعي متخصص في التصميم الجرافيكي وتجربة المستخدم',
      website: 'https://creativedesign.com',
      founded: '2020'
    },
    {
      id: 4,
      name: 'Global Finance Corp',
      logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
      industry: 'Finance',
      location: 'Kuwait City, Kuwait',
      size: '500+',
      rating: 4.2,
      openJobs: 15,
      description: 'شركة خدمات مالية عالمية تقدم حلول مصرفية واستثمارية متقدمة',
      website: 'https://globalfinance.com',
      founded: '2010'
    }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching companies:', searchQuery)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              اكتشف أفضل الشركات
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              تصفح آلاف الشركات الرائدة واكتشف الفرص الوظيفية المتاحة
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="imploy-card p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="البحث عن الشركات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-12 text-lg"
              />
            </div>
            <Button type="submit" className="imploy-button-primary h-12 px-8">
              <Search className="w-5 h-5 mr-2" />
              بحث
            </Button>
            <Button variant="outline" className="h-12 px-6">
              <Filter className="w-4 h-4 mr-2" />
              تصفية
            </Button>
          </form>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <p className="text-gray-600">
            عرض <span className="font-semibold">{companies.length}</span> من أصل <span className="font-semibold">2,100+</span> شركة
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Card key={company.id} className="imploy-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Company Header */}
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                      <img 
                        src={company.logo} 
                        alt={company.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {company.name}
                      </h3>
                      <p className="text-primary font-medium">{company.industry}</p>
                      <div className="flex items-center justify-end space-x-1 space-x-reverse mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{company.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Company Info */}
                  <p className="text-gray-600 text-sm leading-relaxed text-right">
                    {company.description}
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{company.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{company.size} موظف</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                        <Building2 className="w-4 h-4" />
                        <span>تأسست في {company.founded}</span>
                      </div>
                    </div>
                  </div>

                  {/* Open Jobs */}
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">الوظائف المتاحة</span>
                    </div>
                    <Badge className="bg-primary text-white">
                      {company.openJobs} وظيفة
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 space-x-reverse pt-4 border-t border-gray-100">
                    <Button asChild className="flex-1 imploy-button-primary">
                      <Link to={`/jobs?company=${company.id}`}>
                        <Briefcase className="w-4 h-4 mr-2" />
                        عرض الوظائف
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="p-3">
                      <Globe className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-3">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
  )
}

export default CompaniesPage