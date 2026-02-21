'use client'

import { useState } from 'react'
import { useMockDataStore } from '@/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  MapPin,
} from 'lucide-react'

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export function AppointmentCalendar() {
  const { appointments, patients } = useMockDataStore()
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1))
  }

  const getAppointmentsForDay = (day: number) => {
    const dateStr = new Date(year, month, day).toDateString()
    return appointments.filter(
      (a) => new Date(a.scheduledDate).toDateString() === dateStr
    )
  }

  const renderDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayAppointments = getAppointmentsForDay(day)
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString()

      days.push(
        <div
          key={day}
          className={`h-24 p-1 border-t border-r border-gray-100 ${
            isToday ? 'bg-purple-50' : 'bg-white'
          } hover:bg-gray-50 transition-colors`}
        >
          <div className={`text-sm ${isToday ? 'font-bold text-purple-600' : 'text-gray-600'}`}>
            {day}
          </div>
          <div className="space-y-1 mt-1">
            {dayAppointments.slice(0, 2).map((appointment) => (
              <div
                key={appointment.id}
                className={`text-xs px-1 py-0.5 rounded truncate ${
                  appointment.type === 'online'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {new Date(appointment.scheduledDate).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            ))}
            {dayAppointments.length > 2 && (
              <div className="text-xs text-gray-400">+{dayAppointments.length - 2} mais</div>
            )}
          </div>
        </div>
      )
    }

    return days
  }

  // Get today's appointments
  const todayAppointments = appointments.filter(
    (a) => new Date(a.scheduledDate).toDateString() === new Date().toDateString()
  )

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {months[month]} {year}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Days of week header */}
          <div className="grid grid-cols-7 mb-1">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500 py-2 bg-gray-50"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 border border-gray-100 rounded-lg overflow-hidden">
            {renderDays()}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-100 rounded" />
              <span className="text-gray-600">Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-100 rounded" />
              <span className="text-gray-600">Presencial</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Consultas de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todayAppointments.length > 0 ? (
            <div className="space-y-3">
              {todayAppointments.map((appointment) => {
                const patient = patients.find((p) => p.id === appointment.patientId)
                return (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          appointment.type === 'online'
                            ? 'bg-blue-100'
                            : 'bg-green-100'
                        }`}
                      >
                        {appointment.type === 'online' ? (
                          <Video className="h-5 w-5 text-blue-600" />
                        ) : (
                          <MapPin className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          Paciente #{appointment.patientId}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          {new Date(appointment.scheduledDate).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                          <span>•</span>
                          <span>R$ {appointment.price.toFixed(2).replace('.', ',')}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={appointment.status === 'confirmed' ? 'default' : 'outline'}
                    >
                      {appointment.status === 'confirmed' ? 'Confirmado' : 'Agendado'}
                    </Badge>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Nenhuma consulta agendada para hoje
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
