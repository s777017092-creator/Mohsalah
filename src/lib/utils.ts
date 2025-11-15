import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  const d = new Date(date)
  return d.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatSalary(min: number, max: number, currency: string) {
  return `${min.toLocaleString()} - ${max.toLocaleString()} ${currency}`
}

export function calculateDaysAgo(date: string | Date) {
  const now = new Date()
  const past = new Date(date)
  const diffTime = Math.abs(now.getTime() - past.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'منذ يوم'
  if (diffDays < 7) return `منذ ${diffDays} أيام`
  if (diffDays < 30) return `منذ ${Math.floor(diffDays / 7)} أسابيع`
  return `منذ ${Math.floor(diffDays / 30)} شهر`
}

export function generateMatchScore() {
  return Math.floor(Math.random() * 30) + 70 // 70-100%
}