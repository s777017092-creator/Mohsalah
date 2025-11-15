/**
 * Notification Service
 * Manages user notifications and alerts
 */

import { toast } from 'sonner'

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error' | 'job_match' | 'application_update' | 'message'
  link?: string
  read: boolean
  createdAt: Date
  metadata?: Record<string, any>
}

export interface NotificationPreferences {
  email: boolean
  push: boolean
  inApp: boolean
  jobMatches: boolean
  applicationUpdates: boolean
  messages: boolean
  promotions: boolean
}

class NotificationService {
  private notifications: Notification[] = []
  private listeners: Set<(notifications: Notification[]) => void> = new Set()

  constructor() {
    this.loadNotifications()
  }

  /**
   * Load notifications from storage
   */
  private loadNotifications(): void {
    try {
      const stored = localStorage.getItem('notifications')
      if (stored) {
        this.notifications = JSON.parse(stored).map((n: any) => ({
          ...n,
          createdAt: new Date(n.createdAt),
        }))
      }
    } catch (error) {
      console.error('Error loading notifications:', error)
    }
  }

  /**
   * Save notifications to storage
   */
  private saveNotifications(): void {
    try {
      localStorage.setItem('notifications', JSON.stringify(this.notifications))
    } catch (error) {
      console.error('Error saving notifications:', error)
    }
  }

  /**
   * Notify all listeners
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.notifications]))
  }

  /**
   * Subscribe to notification updates
   */
  subscribe(callback: (notifications: Notification[]) => void): () => void {
    this.listeners.add(callback)
    callback([...this.notifications])

    return () => {
      this.listeners.delete(callback)
    }
  }

  /**
   * Create a new notification
   */
  create(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      read: false,
    }

    this.notifications.unshift(newNotification)
    this.saveNotifications()
    this.notifyListeners()

    // Show toast notification
    this.showToast(newNotification)

    return newNotification
  }

  /**
   * Get all notifications for a user
   */
  getAll(userId: string): Notification[] {
    return this.notifications.filter(n => n.userId === userId)
  }

  /**
   * Get unread notifications count
   */
  getUnreadCount(userId: string): number {
    return this.notifications.filter(n => n.userId === userId && !n.read).length
  }

  /**
   * Mark notification as read
   */
  markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
      this.saveNotifications()
      this.notifyListeners()
    }
  }

  /**
   * Mark all notifications as read for a user
   */
  markAllAsRead(userId: string): void {
    this.notifications
      .filter(n => n.userId === userId)
      .forEach(n => (n.read = true))

    this.saveNotifications()
    this.notifyListeners()
  }

  /**
   * Delete a notification
   */
  delete(notificationId: string): void {
    this.notifications = this.notifications.filter(n => n.id !== notificationId)
    this.saveNotifications()
    this.notifyListeners()
  }

  /**
   * Delete all notifications for a user
   */
  deleteAll(userId: string): void {
    this.notifications = this.notifications.filter(n => n.userId !== userId)
    this.saveNotifications()
    this.notifyListeners()
  }

  /**
   * Show toast notification
   */
  private showToast(notification: Notification): void {
    const message = notification.message.substring(0, 100)

    switch (notification.type) {
      case 'success':
      case 'application_update':
        toast.success(notification.title, { description: message })
        break
      case 'error':
        toast.error(notification.title, { description: message })
        break
      case 'warning':
        toast.warning(notification.title, { description: message })
        break
      case 'job_match':
        toast.info(notification.title, {
          description: message,
          action: notification.link
            ? {
                label: 'View',
                onClick: () => window.location.href = notification.link!,
              }
            : undefined,
        })
        break
      default:
        toast(notification.title, { description: message })
    }
  }

  /**
   * Notify about new job match
   */
  notifyJobMatch(userId: string, jobTitle: string, matchScore: number, jobId: number): void {
    this.create({
      userId,
      title: 'New Job Match!',
      message: `We found a great match for you: ${jobTitle} (${matchScore}% match)`,
      type: 'job_match',
      link: `/jobs/${jobId}`,
      metadata: { jobId, matchScore },
    })
  }

  /**
   * Notify about application status update
   */
  notifyApplicationUpdate(
    userId: string,
    jobTitle: string,
    status: string,
    applicationId: number
  ): void {
    const statusMessages: { [key: string]: string } = {
      reviewed: 'Your application has been reviewed',
      shortlisted: 'Congratulations! You have been shortlisted',
      interviewed: 'Interview scheduled',
      offered: 'Job offer received!',
      hired: 'Congratulations on your new position!',
      rejected: 'Application status updated',
    }

    this.create({
      userId,
      title: statusMessages[status] || 'Application Update',
      message: `${jobTitle} - ${status}`,
      type: 'application_update',
      link: `/applications/${applicationId}`,
      metadata: { applicationId, status },
    })
  }

  /**
   * Notify about new message
   */
  notifyNewMessage(
    userId: string,
    senderName: string,
    subject: string,
    messageId: string
  ): void {
    this.create({
      userId,
      title: 'New Message',
      message: `${senderName}: ${subject}`,
      type: 'message',
      link: `/messages/${messageId}`,
      metadata: { messageId, senderName },
    })
  }

  /**
   * Notify about profile view
   */
  notifyProfileView(userId: string, viewerName: string, viewerRole: string): void {
    this.create({
      userId,
      title: 'Profile Viewed',
      message: `${viewerName} (${viewerRole}) viewed your profile`,
      type: 'info',
      link: '/profile',
      metadata: { viewerName, viewerRole },
    })
  }

  /**
   * Notify about job expiring soon
   */
  notifyJobExpiring(userId: string, jobTitle: string, daysLeft: number, jobId: number): void {
    this.create({
      userId,
      title: 'Job Expiring Soon',
      message: `${jobTitle} will expire in ${daysLeft} days`,
      type: 'warning',
      link: `/jobs/${jobId}`,
      metadata: { jobId, daysLeft },
    })
  }

  /**
   * Get notification preferences
   */
  getPreferences(userId: string): NotificationPreferences {
    try {
      const stored = localStorage.getItem(`notif_prefs_${userId}`)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading notification preferences:', error)
    }

    // Default preferences
    return {
      email: true,
      push: true,
      inApp: true,
      jobMatches: true,
      applicationUpdates: true,
      messages: true,
      promotions: false,
    }
  }

  /**
   * Update notification preferences
   */
  updatePreferences(userId: string, preferences: Partial<NotificationPreferences>): void {
    const current = this.getPreferences(userId)
    const updated = { ...current, ...preferences }

    try {
      localStorage.setItem(`notif_prefs_${userId}`, JSON.stringify(updated))
      toast.success('Notification preferences updated')
    } catch (error) {
      console.error('Error saving notification preferences:', error)
      toast.error('Failed to update preferences')
    }
  }

  /**
   * Send bulk notifications (for admin use)
   */
  sendBulk(
    userIds: string[],
    notification: Omit<Notification, 'id' | 'userId' | 'createdAt' | 'read'>
  ): void {
    userIds.forEach(userId => {
      this.create({ ...notification, userId })
    })
  }

  /**
   * Get notification statistics
   */
  getStats(userId: string): {
    total: number
    unread: number
    byType: Record<string, number>
  } {
    const userNotifications = this.getAll(userId)

    const byType = userNotifications.reduce((acc, notif) => {
      acc[notif.type] = (acc[notif.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      total: userNotifications.length,
      unread: this.getUnreadCount(userId),
      byType,
    }
  }

  /**
   * Clear old notifications (older than 30 days)
   */
  clearOldNotifications(): void {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    this.notifications = this.notifications.filter(n => n.createdAt > thirtyDaysAgo)
    this.saveNotifications()
    this.notifyListeners()
  }
}

// Export singleton instance
export const notificationService = new NotificationService()
export default notificationService
