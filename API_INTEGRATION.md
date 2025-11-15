# API Integration Guide

## Overview

This document explains how to integrate the SkillHunt Pro platform with external services and APIs.

## Supabase Integration

### Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Add to `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Database Setup

Run the migration file to set up your database:

```bash
# Using Supabase CLI
supabase migration up

# Or manually in Supabase SQL Editor
# Copy and execute content from: supabase/migrations/001_initial_schema.sql
```

### Row Level Security (RLS) Policies

Add these RLS policies in Supabase:

```sql
-- Jobs: Anyone can read published jobs
CREATE POLICY "Anyone can view published jobs"
ON jobs FOR SELECT
USING (status = 'published');

-- Jobs: Employers can create/update their company's jobs
CREATE POLICY "Employers can manage their jobs"
ON jobs FOR ALL
USING (
  company_id IN (
    SELECT id FROM companies WHERE owner_id = auth.uid()
  )
);

-- Applications: Users can view their own applications
CREATE POLICY "Users can view own applications"
ON applications FOR SELECT
USING (user_id = auth.uid());

-- Applications: Users can create applications
CREATE POLICY "Users can create applications"
ON applications FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Companies: Anyone can view approved companies
CREATE POLICY "Anyone can view approved companies"
ON companies FOR SELECT
USING (status = 'approved');

-- Companies: Owners can update their company
CREATE POLICY "Owners can update company"
ON companies FOR UPDATE
USING (owner_id = auth.uid());
```

## Email Service Integration (Resend)

### Setup

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Configure in backend:

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Send application notification
await resend.emails.send({
  from: 'noreply@skillhunt.com',
  to: 'employer@company.com',
  subject: 'New Application Received',
  html: '<strong>A new candidate has applied!</strong>'
})
```

### Email Templates

Create email templates for:
- Welcome emails
- Application received
- Application status updates
- Job match alerts
- Interview invitations

## Stripe Integration (Optional)

For premium features and job posting payments:

### Setup

1. Create Stripe account
2. Get API keys
3. Add to environment:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Implementation

```typescript
import { loadStripe } from '@stripe/stripe-js'

const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

// Create payment intent for job posting
const { error } = await stripe.confirmPayment({
  elements,
  confirmParams: {
    return_url: 'https://yoursite.com/payment/success',
  },
})
```

## File Upload Service

### Using Supabase Storage

```typescript
import { supabase } from './lib/supabase'

// Upload resume
async function uploadResume(file: File, userId: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}-${Date.now()}.${fileExt}`
  const filePath = `resumes/${fileName}`

  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(filePath, file)

  if (error) throw error

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('resumes')
    .getPublicUrl(filePath)

  return publicUrl
}

// Upload company logo
async function uploadLogo(file: File, companyId: number) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${companyId}-logo.${fileExt}`
  const filePath = `logos/${fileName}`

  const { data, error } = await supabase.storage
    .from('logos')
    .upload(filePath, file, { upsert: true })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('logos')
    .getPublicUrl(filePath)

  return publicUrl
}
```

### Create Storage Buckets

In Supabase Dashboard:
1. Go to Storage
2. Create buckets:
   - `resumes` (private)
   - `logos` (public)
   - `avatars` (public)

## AI Services Integration

### OpenAI Integration (Optional)

For enhanced resume parsing and matching:

```typescript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Enhanced resume parsing
async function parseResumeWithAI(resumeText: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Extract structured information from the resume..."
      },
      {
        role: "user",
        content: resumeText
      }
    ],
  })

  return JSON.parse(completion.choices[0].message.content)
}

// Generate job description
async function generateJobDescription(title: string, requirements: string[]) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Generate a compelling job description..."
      },
      {
        role: "user",
        content: `Title: ${title}\nRequirements: ${requirements.join(', ')}`
      }
    ],
  })

  return completion.choices[0].message.content
}
```

## Analytics Integration

### Google Analytics

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Custom Event Tracking

```typescript
// Track job application
function trackJobApplication(jobId: number, jobTitle: string) {
  if (window.gtag) {
    window.gtag('event', 'job_application', {
      job_id: jobId,
      job_title: jobTitle,
    })
  }
}

// Track job view
function trackJobView(jobId: number, jobTitle: string) {
  if (window.gtag) {
    window.gtag('event', 'job_view', {
      job_id: jobId,
      job_title: jobTitle,
    })
  }
}
```

## Real-time Features

### Supabase Realtime

```typescript
import { supabase } from './lib/supabase'

// Subscribe to new job postings
const subscription = supabase
  .channel('jobs')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'jobs',
      filter: 'status=eq.published'
    },
    (payload) => {
      console.log('New job posted:', payload.new)
      // Show notification to relevant users
    }
  )
  .subscribe()

// Subscribe to application updates
const applicationSub = supabase
  .channel('applications')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'applications',
      filter: `user_id=eq.${userId}`
    },
    (payload) => {
      console.log('Application updated:', payload.new)
      // Notify user
    }
  )
  .subscribe()

// Cleanup
subscription.unsubscribe()
```

## Search Integration

### Algolia (Optional)

For advanced search capabilities:

```typescript
import algoliasearch from 'algoliasearch'

const client = algoliasearch('APP_ID', 'SEARCH_API_KEY')
const jobsIndex = client.initIndex('jobs')

// Index a job
await jobsIndex.saveObject({
  objectID: job.id,
  title: job.title,
  description: job.description,
  location: job.location,
  skills: job.skills,
  _tags: [job.type, job.industry],
})

// Search jobs
const { hits } = await jobsIndex.search('React Developer', {
  filters: 'location:Dubai',
  facets: ['type', 'skills'],
})
```

## Social Authentication

### Google OAuth

```typescript
import { supabase } from './lib/supabase'

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://yoursite.com/auth/callback'
    }
  })
}
```

### LinkedIn OAuth

```typescript
async function signInWithLinkedIn() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'linkedin',
    options: {
      redirectTo: 'https://yoursite.com/auth/callback'
    }
  })
}
```

## Webhook Integration

### Handling Webhooks from Stripe

```typescript
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function handleWebhook(req, res) {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      // Update job status to published
      await publishJob(paymentIntent.metadata.jobId)
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({ received: true })
}
```

## Rate Limiting

### Using Upstash Redis

```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export async function checkRateLimit(identifier: string) {
  const { success } = await ratelimit.limit(identifier)
  return success
}
```

## Monitoring & Error Tracking

### Sentry Integration

```typescript
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

// Capture errors
try {
  // code that might fail
} catch (error) {
  Sentry.captureException(error)
}
```

## Testing API Endpoints

### Example API Tests

```typescript
import { describe, it, expect } from 'vitest'
import { jobsApi } from './lib/api'

describe('Jobs API', () => {
  it('should fetch all jobs', async () => {
    const jobs = await jobsApi.getAll()
    expect(jobs).toBeInstanceOf(Array)
  })

  it('should create a job', async () => {
    const jobData = {
      title: 'Test Job',
      description: 'Test Description',
      // ... other fields
    }
    const result = await jobsApi.create(jobData)
    expect(result.success).toBe(true)
  })
})
```

## Environment Variables

Complete list of environment variables:

```env
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Stripe (Optional)
VITE_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email (Resend)
RESEND_API_KEY=

# OpenAI (Optional)
OPENAI_API_KEY=

# Analytics
VITE_GA_MEASUREMENT_ID=

# Algolia (Optional)
VITE_ALGOLIA_APP_ID=
VITE_ALGOLIA_SEARCH_KEY=
ALGOLIA_ADMIN_KEY=

# Sentry (Optional)
VITE_SENTRY_DSN=

# Upstash Redis (Optional)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Use server-side keys for sensitive operations
3. **Error Handling**: Always handle API errors gracefully
4. **Rate Limiting**: Implement rate limiting for public endpoints
5. **Caching**: Cache frequently accessed data
6. **Logging**: Log all API calls for debugging
7. **Security**: Validate all inputs and sanitize outputs
8. **Testing**: Write tests for all API integrations

## Support

For integration support:
- Email: dev@skillhunt.com
- Discord: [Link]
- Documentation: [Link]
