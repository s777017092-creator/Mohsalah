import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Textarea } from '../ui/textarea'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Eye,
  MessageSquare,
  Calendar,
  Building2,
  MapPin,
  DollarSign,
  User,
  FileText,
  Send
} from 'lucide-react'
import { toast } from 'sonner'

interface PendingJob {
  id: number
  title: string
  company: string
  companyLogo: string
  location: string
  salary: string
  type: string
  submittedAt: string
  submittedBy: string
  description: string
  requirements: string[]
  status: 'pending' | 'approved' | 'rejected'
  priority: 'low' | 'medium' | 'high'
  category: string
  applicants: number
}

export default function AdminApprovalSystem() {
  const [pendingJobs, setPendingJobs] = useState<PendingJob[]>([
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop',
      location: 'Dubai, UAE',
      salary: '15,000 - 25,000 AED',
      type: 'Full-time',
      submittedAt: '2024-01-15T10:30:00',
      submittedBy: 'hr@techcorp.com',
      description: 'We are looking for a skilled Full Stack Developer to join our growing team...',
      requirements: ['5+ years experience', 'React & Node.js', 'Team leadership'],
      status: 'pending',
      priority: 'high',
      category: 'Technology',
      applicants: 0
    },
    {
      id: 2,
      title: 'Digital Marketing Manager',
      company: 'Growth Marketing Agency',
      companyLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop',
      location: 'Riyadh, Saudi Arabia',
      salary: '12,000 - 18,000 SAR',
      type: 'Full-time',
      submittedAt: '2024-01-14T14:20:00',
      submittedBy: 'recruiter@growthagency.com',
      description: 'Join our marketing team to drive digital campaigns and growth strategies...',
      requirements: ['3+ years marketing experience', 'SEO & SEM expertise', 'Analytics skills'],
      status: 'pending',
      priority: 'medium',
      category: 'Marketing',
      applicants: 0
    }
  ])

  const [selectedJob, setSelectedJob] = useState<PendingJob | null>(null)
  const [reviewComment, setReviewComment] = useState('')

  const handleApproveJob = (jobId: number) => {
    setPendingJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'approved' } : job
    ))
    toast.success('تم الموافقة على نشر الوظيفة')
    setSelectedJob(null)
    setReviewComment('')
  }

  const handleRejectJob = (jobId: number) => {
    if (!reviewComment.trim()) {
      toast.error('يرجى إضافة سبب الرفض')
      return
    }
    
    setPendingJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'rejected' } : job
    ))
    toast.success('تم رفض نشر الوظيفة')
    setSelectedJob(null)
    setReviewComment('')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">قيد المراجعة</Badge>
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">مُوافق</Badge>
      case 'rejected':
        return <Badge variant="destructive">مرفوض</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">أولوية عالية</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">أولوية متوسطة</Badge>
      case 'low':
        return <Badge className="bg-gray-100 text-gray-800">أولوية منخفضة</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const pendingCount = pendingJobs.filter(job => job.status === 'pending').length
  const approvedToday = pendingJobs.filter(job => job.status === 'approved').length
  const rejectedToday = pendingJobs.filter(job => job.status === 'rejected').length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مُوافق اليوم</p>
                <p className="text-2xl font-bold text-green-600">{approvedToday}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">مرفوض اليوم</p>
                <p className="text-2xl font-bold text-red-600">{rejectedToday}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل الموافقة</p>
                <p className="text-2xl font-bold text-blue-600">
                  {approvedToday + rejectedToday > 0 
                    ? Math.round((approvedToday / (approvedToday + rejectedToday)) * 100) 
                    : 0}%
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Jobs List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            الوظائف المطلوب مراجعتها ({pendingCount})
          </h2>
          
          {pendingJobs.filter(job => job.status === 'pending').map((job) => (
            <Card 
              key={job.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedJob?.id === job.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedJob(job)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4 space-x-reverse flex-1">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                        <img 
                          src={job.companyLogo} 
                          alt={job.company}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-primary font-medium">{job.company}</p>
                        
                        <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <MapPin className="w-3 h-3" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <DollarSign className="w-3 h-3" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(job.submittedAt).toLocaleDateString('ar-SA')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {getPriorityBadge(job.priority)}
                      {getStatusBadge(job.status)}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span>مُقدم من: </span>
                    <span className="font-medium">{job.submittedBy}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {pendingCount === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  لا توجد وظائف قيد المراجعة
                </h3>
                <p className="text-gray-600">
                  جميع الوظائف المُقدمة تم مراجعتها
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Job Details */}
        <div className="space-y-4">
          {selectedJob ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <Eye className="w-5 h-5" />
                    <span>تفاصيل الوظيفة</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">الوصف</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {selectedJob.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">المتطلبات</h4>
                      <ul className="space-y-1">
                        {selectedJob.requirements.map((req, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-center space-x-2 space-x-reverse">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">الفئة:</span>
                        <span className="font-medium mr-2">{selectedJob.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">النوع:</span>
                        <span className="font-medium mr-2">{selectedJob.type}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse">
                    <MessageSquare className="w-5 h-5" />
                    <span>مراجعة إدارية</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      ملاحظات المراجعة (اختياري للموافقة، مطلوب للرفض)
                    </label>
                    <Textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="أضف ملاحظاتك حول هذه الوظيفة..."
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-3 space-x-reverse">
                    <Button
                      onClick={() => handleApproveJob(selectedJob.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      موافقة ونشر
                    </Button>
                    
                    <Button
                      onClick={() => handleRejectJob(selectedJob.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      رفض
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 text-center">
                    سيتم إشعار صاحب العمل بالقرار تلقائياً
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  اختر وظيفة للمراجعة
                </h3>
                <p className="text-gray-600">
                  انقر على أي وظيفة من القائمة لعرض تفاصيلها ومراجعتها
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}