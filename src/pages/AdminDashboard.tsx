import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import ATSApplicationsView from '../components/admin/ATSApplicationsView'
import AdminApprovalSystem from '../components/admin/AdminApprovalSystem'
import { 
  Users, 
  Briefcase, 
  Building2, 
  TrendingUp,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Calendar,
  Award,
  Globe,
  Shield,
  Zap,
  UserCheck,
  Settings,
  Download,
  Upload,
  Bell,
  MessageSquare
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'sonner'

function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  console.log('AdminDashboard: Rendering for user:', user)

  // Enhanced mock data for admin dashboard
  const stats = {
    totalUsers: 25420,
    activeJobs: 3847,
    totalCompanies: 1892,
    monthlyGrowth: 18.5,
    successfulHires: 1250,
    averageMatchScore: 82,
    totalApplications: 15680,
    activeRecruiters: 245,
    pendingApprovals: 12,
    systemHealth: 99.8
  }

  const recentUsers = [
    {
      id: 1,
      name: 'أحمد محمد علي',
      email: 'ahmed@example.com',
      role: 'candidate',
      joinedAt: '2024-01-15',
      status: 'active',
      location: 'الرياض، السعودية',
      lastActive: '2 hours ago',
      applications: 5,
      matchRate: 85
    },
    {
      id: 2,
      name: 'شركة التكنولوجيا المتقدمة',
      email: 'hr@techcorp.com',
      role: 'employer',
      joinedAt: '2024-01-10',
      status: 'active',
      location: 'الرياض، السعودية',
      lastActive: '1 day ago',
      jobsPosted: 12,
      hires: 3
    },
    {
      id: 3,
      name: 'فاطمة أحمد السيد',
      email: 'fatima@example.com',
      role: 'candidate',
      joinedAt: '2024-01-12',
      status: 'pending',
      location: 'القاهرة، مصر',
      lastActive: '5 days ago',
      applications: 8,
      matchRate: 78
    },
    {
      id: 4,
      name: 'مختبرات الابتكار',
      email: 'info@innovationlabs.com',
      role: 'employer',
      joinedAt: '2024-01-08',
      status: 'active',
      location: 'الكويت، الكويت',
      lastActive: '3 hours ago',
      jobsPosted: 8,
      hires: 2
    }
  ]

  const pendingJobs = [
    {
      id: 1,
      title: 'مطور تطبيقات React Native أول',
      company: 'شركة التكنولوجيا المتقدمة',
      postedAt: '2024-01-15',
      status: 'pending',
      salary: '15,000 - 25,000 ريال',
      location: 'الرياض، السعودية',
      applicants: 0,
      urgency: 'high',
      category: 'Technology',
      description: 'نحن نبحث عن مطور تطبيقات موبايل ماهر...',
      requirements: ['خبرة 3+ سنوات في React Native', 'إتقان JavaScript و TypeScript', 'خبرة في Redux/Context API']
    },
    {
      id: 2,
      title: 'مدير تسويق رقمي',
      company: 'وكالة النمو التسويقي',
      postedAt: '2024-01-14',
      status: 'pending',
      salary: '12,000 - 18,000 ريال',
      location: 'الرياض، السعودية',
      applicants: 0,
      urgency: 'medium',
      category: 'Marketing',
      description: 'قيادة حملات التسويق الرقمي وإستراتيجيات النمو...',
      requirements: ['خبرة 3+ سنوات في التسويق', 'خبرة في SEO & SEM', 'مهارات تحليلية']
    },
    {
      id: 3,
      title: 'مصمم واجهات مستخدم UI/UX',
      company: 'استوديو التصميم الإبداعي',
      postedAt: '2024-01-13',
      status: 'rejected',
      salary: '8,000 - 12,000 جنيه',
      location: 'القاهرة، مصر',
      applicants: 0,
      urgency: 'low',
      category: 'Design',
      description: 'إنشاء تصاميم جميلة وتجارب مستخدم بديهية...',
      requirements: ['خبرة في Figma', 'فهم UX principles', 'Portfolio قوي']
    }
  ]

  const platformAnalytics = {
    userGrowth: [
      { month: 'يناير', users: 18200, jobs: 2800, applications: 12500 },
      { month: 'فبراير', users: 19450, jobs: 3100, applications: 13800 },
      { month: 'مارس', users: 21650, jobs: 3450, applications: 15200 },
      { month: 'أبريل', users: 23890, jobs: 3720, applications: 16800 },
      { month: 'مايو', users: 25100, jobs: 3847, applications: 18200 },
      { month: 'يونيو', users: 26350, jobs: 4080, applications: 19600 }
    ],
    topCompanies: [
      { name: 'شركة التكنولوجيا المتقدمة', jobs: 45, applications: 892, hires: 23 },
      { name: 'وكالة النمو التسويقي', jobs: 32, applications: 654, hires: 18 },
      { name: 'استوديو التصميم الإبداعي', jobs: 28, applications: 521, hires: 15 },
      { name: 'مختبرات الابتكار', jobs: 24, applications: 445, hires: 12 }
    ],
    industryBreakdown: [
      { industry: 'التكنولوجيا', percentage: 35, jobs: 1348 },
      { industry: 'التسويق', percentage: 22, jobs: 846 },
      { industry: 'التصميم', percentage: 18, jobs: 692 },
      { industry: 'المالية', percentage: 15, jobs: 577 },
      { industry: 'الصحة', percentage: 10, jobs: 384 }
    ]
  }

  const handleApproveJob = (jobId: number) => {
    console.log('AdminDashboard: Approving job:', jobId)
    toast.success('تم الموافقة على الوظيفة بنجاح')
  }

  const handleRejectJob = (jobId: number) => {
    console.log('AdminDashboard: Rejecting job:', jobId)
    toast.success('تم رفض الوظيفة')
  }

  const handleSuspendUser = (userId: number) => {
    console.log('AdminDashboard: Suspending user:', userId)
    toast.success('تم إيقاف المستخدم')
  }

  const handleActivateUser = (userId: number) => {
    console.log('AdminDashboard: Activating user:', userId)
    toast.success('تم تفعيل المستخدم')
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'candidate':
        return <Badge variant="secondary">باحث عن عمل</Badge>
      case 'employer':
        return <Badge variant="default">صاحب عمل</Badge>
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800">مدير</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">قيد المراجعة</Badge>
      case 'suspended':
        return <Badge variant="destructive">موقوف</Badge>
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">مُوافق</Badge>
      case 'rejected':
        return <Badge variant="destructive">مرفوض</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">أولوية عالية</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">أولوية متوسطة</Badge>
      case 'low':
        return <Badge className="bg-gray-100 text-gray-800">أولوية منخفضة</Badge>
      default:
        return <Badge variant="outline">{urgency}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 space-x-reverse mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">لوحة إدارة SkillHunt</h1>
                  <p className="text-gray-600">إدارة شاملة للمنصة مع التحليلات والإحصائيات</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse text-sm">
                <div className="flex items-center space-x-1 space-x-reverse text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>جميع الأنظمة تعمل بشكل طبيعي</span>
                </div>
                <div className="text-gray-500">•</div>
                <div className="text-gray-600">آخر تحديث: الآن</div>
              </div>
            </div>
            
            <div className="flex space-x-3 space-x-reverse">
              <Button variant="outline" className="flex items-center space-x-2 space-x-reverse">
                <Download className="w-4 h-4" />
                <span>تصدير البيانات</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2 space-x-reverse">
                <Settings className="w-4 h-4" />
                <span>إعدادات النظام</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">+{stats.monthlyGrowth}% هذا الشهر</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الوظائف النشطة</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeJobs.toLocaleString()}</p>
                  <p className="text-xs text-blue-600 mt-1">+12.3% هذا الشهر</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الشركات الشريكة</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCompanies.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">+8.7% هذا الشهر</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">التوظيف الناجح</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.successfulHires.toLocaleString()}</p>
                  <p className="text-xs text-purple-600 mt-1">+15.2% هذا الشهر</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">متوسط نسبة التطابق</p>
                  <p className="text-2xl font-bold text-primary">{stats.averageMatchScore}%</p>
                </div>
                <Target className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalApplications.toLocaleString()}</p>
                </div>
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">الموظفون النشطون</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeRecruiters}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">صحة المنصة</p>
                  <p className="text-2xl font-bold text-green-600">{stats.systemHealth}%</p>
                </div>
                <Shield className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="approvals">الموافقات</TabsTrigger>
            <TabsTrigger value="users">المستخدمون</TabsTrigger>
            <TabsTrigger value="jobs">الوظائف</TabsTrigger>
            <TabsTrigger value="applications">نظام ATS</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>النشاط الأخير على المنصة</CardTitle>
                  <Button variant="outline" size="sm">
                    عرض الكل
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 space-x-reverse p-3 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm font-medium">تسجيل شركة جديدة</p>
                      <p className="text-xs text-gray-500">انضمت شركة التكنولوجيا المتقدمة منذ ساعتين</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm font-medium">وظيفة عالية الأولوية</p>
                      <p className="text-xs text-gray-500">وظيفة مطور أول - 45 طلب</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse p-3 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm font-medium">توظيف ناجح</p>
                      <p className="text-xs text-gray-500">تم ملء منصب مدير التسويق</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse p-3 bg-yellow-50 rounded-lg">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm font-medium">وظيفة تتطلب مراجعة</p>
                      <p className="text-xs text-gray-500">مصمم UI/UX - قيد الموافقة</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Approvals Alert */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 space-x-reverse text-yellow-800">
                    <Bell className="w-5 h-5" />
                    <span>الموافقات المعلقة</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.pendingApprovals}</div>
                      <div className="text-sm text-yellow-800">وظيفة في انتظار الموافقة</div>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => setActiveTab('approvals')}
                    >
                      مراجعة الطلبات
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Top Companies */}
              <Card>
                <CardHeader>
                  <CardTitle>أفضل الشركات أداءً</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {platformAnalytics.topCompanies.map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-400' : 
                          index === 2 ? 'bg-orange-500' : 'bg-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="text-right">
                          <h4 className="font-medium text-gray-900">{company.name}</h4>
                          <p className="text-sm text-gray-600">{company.jobs} وظيفة نشطة</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{company.applications}</p>
                        <p className="text-xs text-gray-500">طلب</p>
                        <p className="text-xs text-green-600">{company.hires} توظيف</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle>حالة النظام</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">أداء الخادم</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-600">ممتاز</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">حالة قاعدة البيانات</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-600">متصل</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">خدمة البريد الإلكتروني</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-600">يعمل</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">معالجة ATS</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-600">نشط</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">التخزين السحابي</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium text-yellow-600">78% السعة</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="approvals">
            <AdminApprovalSystem />
          </TabsContent>

          <TabsContent value="applications">
            <ATSApplicationsView />
          </TabsContent>

          <TabsContent value="users">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-900">إدارة المستخدمين</h2>
                <div className="flex space-x-2 space-x-reverse">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="البحث في المستخدمين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 w-64"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    تصفية
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="text-right">
                              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                              <p className="text-gray-600">{user.email}</p>
                              <p className="text-sm text-gray-500">{user.location}</p>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              {getRoleBadge(user.role)}
                              {getStatusBadge(user.status)}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">انضم:</span>
                              <span className="font-medium mr-1">{user.joinedAt}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">آخر نشاط:</span> 
                              <span className="font-medium mr-1">{user.lastActive}</span>
                            </div>
                            {user.role === 'candidate' && (
                              <>
                                <div>
                                  <span className="text-gray-500">الطلبات:</span>
                                  <span className="font-medium mr-1">{user.applications}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">نسبة التطابق:</span>
                                  <span className="font-medium mr-1">{user.matchRate}%</span>
                                </div>
                              </>
                            )}
                            {user.role === 'employer' && (
                              <>
                                <div>
                                  <span className="text-gray-500">الوظائف المنشورة:</span>
                                  <span className="font-medium mr-1">{user.jobsPosted}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">التوظيف الناجح:</span>
                                  <span className="font-medium mr-1">{user.hires}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 lg:w-48">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            عرض الملف الشخصي
                          </Button>
                          <div className="flex space-x-2 space-x-reverse">
                            {user.status === 'active' ? (
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleSuspendUser(user.id)}
                              >
                                <Ban className="w-4 h-4" />
                                إيقاف
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleActivateUser(user.id)}
                              >
                                <CheckCircle className="w-4 h-4" />
                                تفعيل
                              </Button>
                            )}
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="w-4 h-4" />
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

          <TabsContent value="jobs">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">إدارة الوظائف</h2>
                <div className="flex space-x-2 space-x-reverse">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    تصفية حسب الحالة
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {pendingJobs.map((job) => (
                  <Card key={job.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div className="text-right">
                              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                              <p className="text-primary font-medium">{job.company}</p>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              {getStatusBadge(job.status)}
                              {getUrgencyBadge(job.urgency)}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">الموقع: </span>
                              {job.location}
                            </div>
                            <div>
                              <span className="font-medium">الراتب: </span>
                              {job.salary}
                            </div>
                            <div>
                              <span className="font-medium">المتقدمون: </span>
                              {job.applicants}
                            </div>
                            <div>
                              <span className="font-medium">تاريخ النشر: </span>
                              {job.postedAt}
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 text-right">{job.description}</p>
                        </div>

                        <div className="flex flex-col space-y-2 lg:w-48">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            عرض التفاصيل
                          </Button>
                          
                          {job.status === 'pending' && (
                            <div className="flex space-x-2 space-x-reverse">
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleApproveJob(job.id)}
                              >
                                <CheckCircle className="w-4 h-4" />
                                موافقة
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                className="flex-1"
                                onClick={() => handleRejectJob(job.id)}
                              >
                                <XCircle className="w-4 h-4" />
                                رفض
                              </Button>
                            </div>
                          )}
                          
                          {job.status !== 'pending' && (
                            <div className="flex space-x-2 space-x-reverse">
                              <Button variant="outline" size="sm" className="flex-1">
                                <Edit className="w-4 h-4" />
                                تعديل
                              </Button>
                              <Button variant="destructive" size="sm" className="flex-1">
                                <Trash2 className="w-4 h-4" />
                                حذف
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">تحليلات المنصة</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Growth Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 space-x-reverse">
                      <BarChart3 className="w-5 h-5" />
                      <span>نمو المنصة</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {platformAnalytics.userGrowth.map((data, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 w-12">{data.month}</span>
                          <div className="flex-1 mx-4">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span>المستخدمون: {data.users.toLocaleString()}</span>
                              <span>الوظائف: {data.jobs}</span>
                              <span>الطلبات: {data.applications.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary rounded-full h-2" 
                                style={{ width: `${(data.users / 30000) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Industry Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 space-x-reverse">
                      <PieChart className="w-5 h-5" />
                      <span>توزيع الصناعات</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {platformAnalytics.industryBreakdown.map((industry, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">{industry.industry}</span>
                          <div className="text-right">
                            <span className="text-sm font-bold text-primary">{industry.percentage}%</span>
                            <div className="text-xs text-gray-500">{industry.jobs} وظيفة</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2" 
                            style={{ width: `${industry.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Activity Stats */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 space-x-reverse">
                      <Activity className="w-5 h-5" />
                      <span>النشاط في الوقت الفعلي</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-1">247</div>
                        <div className="text-sm text-blue-900">طلبات يومية</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">18</div>
                        <div className="text-sm text-green-900">وظائف جديدة اليوم</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600 mb-1">32</div>
                        <div className="text-sm text-yellow-900">مقابلات مجدولة</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 mb-1">5</div>
                        <div className="text-sm text-purple-900">شركات جديدة</div>
                      </div>
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

export default AdminDashboard