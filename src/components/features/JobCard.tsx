import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { 
  MapPin, 
  Clock, 
  Briefcase, 
  Building2,
  DollarSign,
  Users,
  Star,
  Heart,
  Share2,
  Eye,
  Target,
  Bookmark
} from 'lucide-react'
import { formatDate, calculateDaysAgo } from '../../lib/utils'

interface Job {
  id: number
  title: string
  company: string
  companyLogo: string
  location: string
  salary: { min: number; max: number; currency: string }
  type: string
  experience: string
  postedAt: string
  urgent: boolean
  featured: boolean
  applicants: number
  views: number
  matchScore: number
  description: string
  skills: string[]
  remote: boolean
  benefits: string[]
  companySize: string
  industry: string
}

interface JobCardProps {
  job: Job
  savedJobs: number[]
  onSaveJob: (jobId: number) => void
  showMatchScore?: boolean
}

export default function JobCard({ job, savedJobs, onSaveJob, showMatchScore = true }: JobCardProps) {
  return (
    <Card className="group imploy-card hover:border-primary/20">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Job Header */}
          <div className="flex items-start justify-between">
            <div className="flex space-x-4 space-x-reverse flex-1">
              {/* Company Logo */}
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                <img 
                  src={job.companyLogo} 
                  alt={job.company}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Job Info */}
              <div className="flex-1 space-y-2 text-right">
                <div className="flex items-center justify-end space-x-2 space-x-reverse flex-wrap gap-2">
                  {job.urgent && (
                    <Badge className="bg-red-100 text-red-800 text-xs font-medium">
                      عاجل
                    </Badge>
                  )}
                  {job.featured && (
                    <Badge className="bg-green-100 text-green-800 text-xs font-medium">
                      مميزة
                    </Badge>
                  )}
                  {job.remote && (
                    <Badge variant="outline" className="text-xs">
                      عمل عن بُعد
                    </Badge>
                  )}
                </div>
                
                <Link to={`/jobs/${job.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">
                    {job.title}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-end space-x-2 space-x-reverse text-primary">
                  <Building2 className="w-4 h-4" />
                  <span className="font-medium">{job.company}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{job.companySize} موظف</span>
                </div>

                <p className="text-gray-600 leading-relaxed line-clamp-2 text-right">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2"
                onClick={() => onSaveJob(job.id)}
              >
                <Bookmark className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-current text-primary' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Job Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center justify-end space-x-2 space-x-reverse text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{job.location}</span>
            </div>
            
            <div className="flex items-center justify-end space-x-2 space-x-reverse text-green-600 font-semibold">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">
                {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-end space-x-2 space-x-reverse text-gray-600">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{job.experience}</span>
            </div>

            <div className="flex items-center justify-end space-x-2 space-x-reverse text-gray-600">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{calculateDaysAgo(job.postedAt)}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 justify-end">
            {job.skills.slice(0, 4).map((skill) => (
              <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                +{job.skills.length - 4} أكثر
              </span>
            )}
          </div>

          {/* Match Score */}
          {showMatchScore && (
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Target className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">نسبة التطابق</span>
              </div>
              <div className="text-lg font-bold text-green-600">
                {job.matchScore}%
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
              <div className="flex items-center space-x-1 space-x-reverse">
                <Users className="w-4 h-4" />
                <span>{job.applicants} متقدم</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Eye className="w-4 h-4" />
                <span>{job.views} مشاهدة</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {job.type}
              </Badge>
            </div>
            
            <div className="flex space-x-2 space-x-reverse">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/jobs/${job.id}`}>
                  <Eye className="w-4 h-4 mr-2" />
                  التفاصيل
                </Link>
              </Button>
              <Button size="sm" className="imploy-button-primary">
                تقدم الآن
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}