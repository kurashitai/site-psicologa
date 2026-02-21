'use client'

import { useNotificationStore, type Notification } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  User,
  FileText,
  ShoppingCart,
  Calendar,
  X,
  Check,
  Bell,
  Mail,
  Phone,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface NotificationPanelProps {
  open: boolean
  onClose: () => void
}

const notificationIcons = {
  new_patient: User,
  new_anamnese: FileText,
  course_sale: ShoppingCart,
  appointment_cancelled: Calendar,
  appointment_confirmed: Calendar,
}

const notificationColors = {
  new_patient: 'bg-green-100 text-green-600',
  new_anamnese: 'bg-blue-100 text-blue-600',
  course_sale: 'bg-purple-100 text-purple-600',
  appointment_cancelled: 'bg-red-100 text-red-600',
  appointment_confirmed: 'bg-green-100 text-green-600',
}

export function NotificationPanel({ open, onClose }: NotificationPanelProps) {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    getUnreadCount 
  } = useNotificationStore()

  const unreadCount = getUnreadCount()

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
              {unreadCount > 0 && (
                <Badge className="bg-[#5B21B6]">{unreadCount}</Badge>
              )}
            </SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-[#78716C]">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>Nenhuma notificação</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={() => markAsRead(notification.id)}
                onDelete={() => deleteNotification(notification.id)}
              />
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function NotificationItem({ 
  notification, 
  onMarkRead, 
  onDelete 
}: { 
  notification: Notification
  onMarkRead: () => void
  onDelete: () => void
}) {
  const Icon = notificationIcons[notification.type]
  const colorClass = notificationColors[notification.type]

  return (
    <div 
      className={`p-4 rounded-xl border transition-all ${
        notification.read 
          ? 'bg-white border-gray-100' 
          : 'bg-[#F3E8FF] border-[#E9D5FF]'
      }`}
    >
      <div className="flex gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-[#1C1917] text-sm">{notification.title}</p>
            {!notification.read && (
              <div className="w-2 h-2 bg-[#5B21B6] rounded-full flex-shrink-0 mt-1.5" />
            )}
          </div>
          <p className="text-sm text-[#78716C] mt-1">{notification.message}</p>
          <p className="text-xs text-[#A8A29E] mt-2">
            {formatDistanceToNow(new Date(notification.timestamp), { 
              addSuffix: true,
              locale: ptBR 
            })}
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
        {!notification.read && (
          <Button size="sm" variant="ghost" onClick={onMarkRead}>
            <Check className="h-3 w-3 mr-1" />
            Marcar como lida
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={onDelete} className="text-red-600 hover:text-red-700">
          <X className="h-3 w-3 mr-1" />
          Remover
        </Button>
      </div>
    </div>
  )
}
