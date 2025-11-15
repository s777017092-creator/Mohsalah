# SkillHunt Pro - Smart Recruitment Platform

## 🚀 Overview

SkillHunt Pro is a comprehensive, AI-powered recruitment platform that connects talented professionals with leading companies across the Middle East and beyond. Built with modern technologies and featuring intelligent matching algorithms, the platform streamlines the entire recruitment process from job posting to hiring.

## ✨ Key Features

### For Job Seekers
- **AI-Powered Job Matching** - Get personalized job recommendations based on your skills, experience, and preferences
- **Smart Resume Parser** - Automatically extract information from your resume to build your profile
- **Application Tracking** - Monitor all your applications in one dashboard
- **Match Score Insights** - See how well you match with each job and get improvement suggestions
- **Job Alerts** - Get notified when new jobs matching your criteria are posted
- **Company Reviews** - Read reviews from current and former employees
- **Salary Insights** - Access salary data for different positions and locations
- **Career Analytics** - Track your job search performance and optimize your strategy

### For Employers
- **Applicant Tracking System (ATS)** - Manage all applications efficiently
- **AI Candidate Matching** - Automatically score and rank candidates
- **Advanced Filtering** - Find the best candidates quickly
- **Communication Tools** - Message candidates directly through the platform
- **Analytics Dashboard** - Track job performance and hiring metrics
- **Team Collaboration** - Work with your hiring team seamlessly
- **Company Profile** - Showcase your company culture and benefits

### For Administrators
- **Platform Management** - Oversee all platform activities
- **Content Moderation** - Approve and manage job postings and companies
- **User Management** - Handle user accounts and permissions
- **Analytics & Reporting** - Access comprehensive platform statistics
- **System Monitoring** - Track platform health and performance

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Tanstack Query** - Data fetching and caching

### Backend & Services
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Storage
  - Row Level Security

### Key Services

#### AI Matching Service (`src/services/aiMatchingService.ts`)
Intelligent candidate-job matching using weighted algorithms:
- Skills matching (35%)
- Experience matching (25%)
- Education matching (15%)
- Location matching (10%)
- Salary matching (10%)
- Job type matching (5%)

#### Analytics Service (`src/services/analyticsService.ts`)
Comprehensive platform analytics:
- Dashboard statistics
- Time series data
- Trend analysis
- Conversion metrics
- Skill demand tracking
- Hiring timeline analytics

#### Notification Service (`src/services/notificationService.ts`)
Real-time notification system:
- In-app notifications
- Email notifications (configurable)
- Push notifications (configurable)
- Notification preferences
- Multiple notification types

#### Resume Parser Service (`src/services/resumeParserService.ts`)
Intelligent resume parsing:
- Extract personal information
- Parse work experience
- Identify education
- Extract skills
- Find certifications
- Calculate completeness score

#### Companies Service (`src/services/companiesService.ts`)
Company management:
- Company profiles
- Statistics and analytics
- Verification system
- Industry categorization

#### Search Service (`src/services/searchService.ts`)
Advanced search capabilities:
- Full-text search
- Faceted filtering
- Search suggestions
- Popular searches
- Saved searches
- Search history

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── features/        # Feature-specific components
│   ├── layout/          # Layout components
│   ├── auth/            # Authentication components
│   ├── admin/           # Admin components
│   └── job-application/ # Application components
├── pages/               # Page components
├── services/            # Business logic services
├── contexts/            # React contexts
├── hooks/               # Custom React hooks
├── lib/                 # Library configurations
├── utils/               # Utility functions
├── config/              # Configuration files
└── types/               # TypeScript type definitions

supabase/
└── migrations/          # Database migrations
```

## 🗄️ Database Schema

### Core Tables
- **users** - User accounts and authentication
- **user_profiles** - Extended user information
- **companies** - Company profiles
- **jobs** - Job postings
- **applications** - Job applications
- **experiences** - Work experience
- **education** - Educational background
- **certifications** - Professional certifications
- **skills** - User skills
- **saved_jobs** - Bookmarked jobs
- **job_views** - Job view tracking
- **notifications** - User notifications
- **messages** - Direct messaging
- **company_reviews** - Company ratings and reviews

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Supabase account (optional, works with mock data)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd skillhunt-pro
```

2. **Install dependencies**
```bash
bun install
# or
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up database** (if using Supabase)
```bash
# Run migrations
supabase migration up
```

5. **Start development server**
```bash
bun run dev
# or
npm run dev
```

6. **Open browser**
Navigate to `http://localhost:5173`

## 🔐 Authentication

The platform supports three user roles:

### Candidate
- Browse and search jobs
- Apply to positions
- Track applications
- Build profile
- Access: `/register` with role "candidate"

### Employer
- Post jobs
- Review applications
- Manage company profile
- Access analytics
- Access: `/register` with role "employer"

### Admin
- Manage all users
- Approve jobs and companies
- Access platform analytics
- System configuration
- Access: `/admin-login`

### Demo Accounts
```
Admin:
- Email: admin@skillhunt.com
- Password: (any password in mock mode)

Employer:
- Email: employer@skillhunt.com
- Password: (any password in mock mode)

Candidate:
- Email: any email
- Password: (any password in mock mode)
```

## 🎨 Customization

### Branding
Update `src/config/platform.ts` to customize:
- Platform name
- Contact information
- Social media links
- Feature flags
- Configuration options

### Styling
The platform uses Tailwind CSS with a custom design system:
- Colors: Defined in `src/index.css`
- Components: Custom classes in `@layer components`
- Theme: Configurable via CSS variables

### Features
Enable/disable features in `src/config/platform.ts`:
```typescript
features: {
  aiMatching: true,
  resumeParsing: true,
  videoInterviews: false,
  skillAssessments: true,
  // ...
}
```

## 📊 Analytics

The platform tracks:
- Job views and applications
- User engagement
- Conversion rates
- Match score distribution
- Popular skills
- Hiring timelines
- Platform growth

Access analytics:
- **Candidates**: `/seeker` dashboard
- **Employers**: `/employer` dashboard
- **Admins**: `/admin` dashboard

## 🔔 Notifications

Users receive notifications for:
- New job matches
- Application status updates
- Messages from employers
- Profile views
- Job expiring soon

Configure notification preferences:
- In-app notifications
- Email notifications
- Push notifications (when enabled)

## 🔍 Search

Advanced search features:
- Full-text search across jobs
- Filter by location, type, salary, skills
- Sort by relevance, date, salary, match score
- Search suggestions
- Saved searches
- Search history

## 📱 Responsive Design

The platform is fully responsive and works on:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🧪 Testing

```bash
# Run tests
bun test

# Run linter
bun run lint

# Type checking
bun run type-check
```

## 🚀 Deployment

### Build for production
```bash
bun run build
```

### Preview production build
```bash
bun run preview
```

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Netlify
```bash
netlify deploy
```

## 🔒 Security

- Row Level Security (RLS) enabled
- Authentication via Supabase Auth
- Secure file uploads
- Input validation with Zod
- XSS protection
- CSRF protection

## 📈 Performance

- Code splitting
- Lazy loading
- Image optimization
- Caching strategies
- Debounced search
- Virtualized lists for large datasets

## 🌐 Internationalization

Currently supports:
- English (en)
- Arabic (ar) - UI ready

Add more languages by:
1. Creating translation files
2. Updating `src/config/platform.ts`
3. Using i18n library

## 🤝 Contributing

This is a proprietary platform. For contributions:
1. Follow the code style
2. Write tests for new features
3. Update documentation
4. Submit pull requests

## 📝 License

Copyright © 2024 SkillHunt Pro. All rights reserved.

## 📞 Support

For support and inquiries:
- Email: support@skillhunt.com
- Documentation: [Link to docs]
- Discord: [Link to Discord]

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core platform features
- ✅ AI matching algorithm
- ✅ Resume parsing
- ✅ Basic analytics

### Phase 2 (Q1 2024)
- ⏳ Video interviews
- ⏳ Skill assessments
- ⏳ Advanced analytics
- ⏳ Mobile app

### Phase 3 (Q2 2024)
- ⏳ AI resume screening
- ⏳ Chatbot assistant
- ⏳ API for integrations
- ⏳ Multi-language support

## 🏆 Credits

Built with:
- React & TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Vite

---

**SkillHunt Pro** - Connecting Talent with Opportunity 🚀
