'use client'

import { useState } from 'react'
import { useMockDataStore } from '@/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  MapPin,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  User,
  FileText,
  Phone,
  Mail,
  Heart,
  X,
} from 'lucide-react'
import { AnamneseDetailView } from './AnamneseDetailView'

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
]

interface AppointmentFormData {
  patientId: string
  date: string
  time: string
  type: 'online' | 'presencial'
  duration: number
  price: number
  notes: string
}

export function CalendarManager() {
  const { appointments, patients, anamneses, addAppointment, updateAppointment } = useMockDataStore()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<string | null>(null)
  const [selectedPatientForView, setSelectedPatientForView] = useState<string | null>(null)
  const [selectedAnamneseForView, setSelectedAnamneseForView] = useState<string | null>(null)

  const [formData, setFormData] = useState<AppointmentFormData>({
    patientId: '',
    date: '',
    time: '10:00',
    type: 'online',
    duration: 50,
    price: 200,
    notes: '',
  })

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()

  // Available slots configuration (mock)
  const [availableSlots, setAvailableSlots] = useState({
    online: { start: '08:00', end: '18:00', days: [1, 2, 3, 4, 5] },
    presencial: { start: '09:00', end: '16:00', days: [1, 3, 5] },
  })

  const prevMonth = () => setCurrentDate(new Date(year, month - 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1))

  const getAppointmentsForDay = (day: number) => {
    const dateStr = new Date(year, month, day).toDateString()
    return appointments.filter(a => new Date(a.scheduledDate).toDateString() === dateStr)
  }

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(year, month, day)
    setSelectedDate(clickedDate)
  }

  const handleAppointmentClick = (appointmentId: string) => {
    const appointment = appointments.find(a => a.id === appointmentId)
    if (appointment) {
      setEditingAppointment(appointmentId)
      setFormData({
        patientId: appointment.patientId,
        date: new Date(appointment.scheduledDate).toISOString().split('T')[0],
        time: new Date(appointment.scheduledDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        type: appointment.type,
        duration: appointment.durationMinutes,
        price: appointment.price,
        notes: appointment.sessionNotes || '',
      })
      setIsModalOpen(true)
    }
  }

  const handleSaveAppointment = () => {
    if (!formData.patientId || !formData.date || !formData.time) return

    const scheduledDate = new Date(`${formData.date}T${formData.time}:00`)

    if (editingAppointment) {
      updateAppointment(editingAppointment, {
        scheduledDate,
        type: formData.type,
        durationMinutes: formData.duration,
        price: formData.price,
        sessionNotes: formData.notes,
      })
    } else {
      addAppointment({
        id: `apt-${Date.now()}`,
        patientId: formData.patientId,
        scheduledDate,
        durationMinutes: formData.duration,
        type: formData.type,
        status: 'scheduled',
        price: formData.price,
        paymentStatus: 'pending',
        sessionNotes: formData.notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    setIsModalOpen(false)
    setEditingAppointment(null)
    setFormData({
      patientId: '',
      date: '',
      time: '10:00',
      type: 'online',
      duration: 50,
      price: 200,
      notes: '',
    })
  }

  const handleStatusChange = (appointmentId: string, status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled') => {
    updateAppointment(appointmentId, { status })
  }

  const renderDays = () => {
    const days: React.ReactNode[] = []

    // Empty cells for days before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-28 bg-gray-50/50" />
      )
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
      const isToday = date.toDateString() === today.toDateString()
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
      const dayOfWeek = date.getDay()
      const isWorkingDay = availableSlots.online.days.includes(dayOfWeek)
      const dayAppointments = getAppointmentsForDay(day)

      days.push(
        <div
          key={day}
          onClick={() => handleDayClick(day)}
          className={`h-28 p-1 border-t border-r border-gray-100 transition-all duration-200 cursor-pointer ${isSelected ? 'bg-purple-100 ring-2 ring-purple-400 ring-inset' :
            isPast ? 'bg-gray-100 opacity-60' :
              isToday ? 'bg-purple-50 hover:bg-purple-100' :
                isWorkingDay ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
            }`}
        >
          <div className={`text-sm font-medium mb-1 ${isSelected ? 'bg-purple-700 text-white w-6 h-6 rounded-full flex items-center justify-center' :
            isToday ? 'bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center' :
              isPast ? 'text-gray-400' : 'text-gray-700'
            }`}>
            {day}
          </div>
          <div className="space-y-0.5 overflow-hidden">
            {dayAppointments.slice(0, 3).map(apt => (
              <div
                key={apt.id}
                onClick={(e) => {
                  e.stopPropagation()
                  handleAppointmentClick(apt.id)
                }}
                className={`text-xs px-1.5 py-0.5 rounded truncate cursor-pointer transition-transform hover:scale-[1.02] ${apt.type === 'online' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}
              >
                {new Date(apt.scheduledDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            ))}
            {dayAppointments.length > 3 && (
              <div className="text-xs text-gray-400 pl-1">+{dayAppointments.length - 3}</div>
            )}
          </div>
        </div>
      )
    }

    return days
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <CardTitle className="text-lg">Gerenciar Agenda</CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-100 rounded" />
              <span>Online</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-100 rounded" />
              <span>Presencial</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsConfigOpen(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Configurar Horários
          </Button>
          <Button
            className="bg-[#5B21B6] hover:bg-[#4C1D95]"
            onClick={() => {
              setEditingAppointment(null)
              const dt = selectedDate || today
              setFormData({
                patientId: '',
                date: dt.toISOString().split('T')[0],
                time: '10:00',
                type: 'online',
                duration: 50,
                price: 200,
                notes: '',
              })
              setIsModalOpen(true)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Consulta
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {months[month]} {year}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(today)}>
                  Hoje
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days header */}
            <div className="grid grid-cols-7 mb-1">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2 bg-gray-50">
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 border border-gray-100 rounded-lg overflow-hidden">
              {renderDays()}
            </div>
          </CardContent>
        </Card>

        {/* Today's schedule side panel */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              {selectedDate && selectedDate.toDateString() !== today.toDateString()
                ? `Consultas de ${selectedDate.toLocaleDateString('pt-BR')}`
                : 'Consultas de Hoje'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const displayDate = selectedDate || today
              const displayAppointments = appointments.filter(
                a => new Date(a.scheduledDate).toDateString() === displayDate.toDateString()
              ).sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())

              if (displayAppointments.length === 0) {
                return (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Nenhuma consulta marcada.</p>
                    <Button variant="link" className="mt-2" onClick={() => {
                      setEditingAppointment(null)
                      setFormData({
                        patientId: '',
                        date: displayDate.toISOString().split('T')[0],
                        time: '10:00',
                        type: 'online',
                        duration: 50,
                        price: 200,
                        notes: '',
                      })
                      setIsModalOpen(true)
                    }}>
                      Adicionar consulta
                    </Button>
                  </div>
                )
              }

              return (
                <div className="space-y-3">
                  {displayAppointments.map(apt => {
                    const patient = patients.find(p => p.id === apt.patientId)
                    const anamnese = anamneses.find(a => a.patientId === apt.patientId)
                    return (
                      <div
                        key={apt.id}
                        className="p-3 bg-[#FAFAF9] rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => {
                          setEditingAppointment(apt.id)
                          setSelectedPatientForView(apt.patientId)
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-[#5B21B6] text-white text-sm">
                                {patient?.occupation?.charAt(0) || 'P'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm text-[#1C1917]">
                                Paciente #{apt.patientId}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-[#78716C]">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {new Date(apt.scheduledDate).toLocaleTimeString('pt-BR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                                <span>•</span>
                                <span>{apt.durationMinutes} min</span>
                              </div>
                            </div>
                          </div>
                          <Badge className={`${apt.type === 'online' ? 'bg-[#DBEAFE] text-[#4F46E5]' : 'bg-[#DCFCE7] text-[#16A34A]'
                            }`}>
                            {apt.type === 'online' ? <Video className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
                            {apt.type === 'online' ? 'Online' : 'Presencial'}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <div onClick={(e) => e.stopPropagation()}>
                              <Select
                                value={apt.status}
                                onValueChange={(value: 'scheduled' | 'confirmed' | 'completed' | 'cancelled') =>
                                  handleStatusChange(apt.id, value)
                                }
                              >
                                <SelectTrigger className="w-24 h-7 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="scheduled">Agendado</SelectItem>
                                  <SelectItem value="confirmed">Confirmado</SelectItem>
                                  <SelectItem value="completed">Concluído</SelectItem>
                                  <SelectItem value="cancelled">Cancelado</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {anamnese && (
                              <Badge variant="outline" className="text-xs">
                                <FileText className="h-3 w-3 mr-1" />
                                Anamnese
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm font-medium text-[#16A34A]">
                            R$ {apt.price.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })()}
          </CardContent>
        </Card>
      </div>

      {/* New/Edit Appointment Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingAppointment ? 'Editar Consulta' : 'Nova Consulta'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Paciente</label>
              <Select
                value={formData.patientId}
                onValueChange={(value) => setFormData({ ...formData, patientId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o paciente" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>
                      Paciente #{patient.id} - {patient.occupation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Data</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Horário</label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => setFormData({ ...formData, time: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Tipo</label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'online' | 'presencial') => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="presencial">Presencial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Duração (min)</label>
                <Select
                  value={formData.duration.toString()}
                  onValueChange={(value) => setFormData({ ...formData, duration: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="50">50 min</SelectItem>
                    <SelectItem value="60">60 min</SelectItem>
                    <SelectItem value="90">90 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Valor (R$)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Observações</label>
              <Textarea
                placeholder="Notas sobre a consulta..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#5B21B6] hover:bg-[#4C1D95]"
              onClick={handleSaveAppointment}
            >
              {editingAppointment ? 'Salvar' : 'Agendar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Config Modal */}
      <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurar Disponibilidade</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Configure seus horários de atendimento. Os pacientes só poderão agendar nestes horários.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Atendimento Online</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input placeholder="08:00" defaultValue="08:00" />
                    <span className="flex items-center text-gray-400">até</span>
                    <Input placeholder="18:00" defaultValue="18:00" />
                  </div>
                  <p className="text-xs text-gray-500">Seg a Sex</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Atendimento Presencial</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input placeholder="09:00" defaultValue="09:00" />
                    <span className="flex items-center text-gray-400">até</span>
                    <Input placeholder="16:00" defaultValue="16:00" />
                  </div>
                  <p className="text-xs text-gray-500">Seg, Qua, Sex</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#5B21B6] hover:bg-[#4C1D95]"
              onClick={() => setIsConfigOpen(false)}
            >
              Salvar Configurações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Patient Details Modal */}
      <Dialog open={!!selectedPatientForView} onOpenChange={() => setSelectedPatientForView(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Paciente</DialogTitle>
          </DialogHeader>
          {selectedPatientForView && (() => {
            const patient = patients.find(p => p.id === selectedPatientForView)
            const anamnese = anamneses.find(a => a.patientId === selectedPatientForView)
            const patientAppointments = appointments.filter(a => a.patientId === selectedPatientForView)

            if (!patient) return <p>Paciente não encontrado</p>

            return (
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-[#5B21B6] text-white text-xl">
                      {patient.occupation?.charAt(0) || 'P'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1C1917]">Paciente #{patient.id}</h3>
                    <p className="text-[#78716C]">{patient.occupation}</p>
                    <p className="text-sm text-[#A8A29E]">{patient.addressCity}, {patient.addressState}</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#E9D5FF] rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-[#5B21B6]">{patientAppointments.length}</p>
                    <p className="text-xs text-[#5B21B6]">Consultas</p>
                  </div>
                  <div className="bg-[#DCFCE7] rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-[#16A34A]">
                      {patientAppointments.filter(a => a.status === 'completed').length}
                    </p>
                    <p className="text-xs text-[#16A34A]">Realizadas</p>
                  </div>
                  <div className="bg-[#DBEAFE] rounded-lg p-3 text-center">
                    <p className="text-xl font-bold text-[#4F46E5]">
                      {anamnese ? 'Sim' : 'Não'}
                    </p>
                    <p className="text-xs text-[#4F46E5]">Anamnese</p>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm">
                  {patient.gender && (
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">Gênero</span>
                      <span className="text-[#1C1917] capitalize">{patient.gender}</span>
                    </div>
                  )}
                  {patient.dateOfBirth && (
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">Idade</span>
                      <span className="text-[#1C1917]">
                        {Math.floor((Date.now() - new Date(patient.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))} anos
                      </span>
                    </div>
                  )}
                  {patient.maritalStatus && (
                    <div className="flex justify-between">
                      <span className="text-[#78716C]">Estado Civil</span>
                      <span className="text-[#1C1917] capitalize">{patient.maritalStatus.replace('_', ' ')}</span>
                    </div>
                  )}
                </div>

                {/* Anamnese Link */}
                {anamnese && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between p-3 bg-[#F3E8FF] rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-[#5B21B6]" />
                        <div>
                          <p className="font-medium text-[#1C1917]">Anamnese Disponível</p>
                          <p className="text-xs text-[#78716C]">
                            {anamnese.status === 'approved' ? 'Aprovada' :
                              anamnese.status === 'pending_review' ? 'Pendente de revisão' : 'Revisada'}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedAnamneseForView(anamnese.id)}
                      >
                        Ver Anamnese
                      </Button>
                    </div>
                  </div>
                )}

                {/* Medical History & Session Notes */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-[#1C1917] mb-3">Histórico de Sessões</h4>
                  {patientAppointments.length > 0 ? (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                      {patientAppointments
                        .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
                        .map(apt => (
                          <div key={apt.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-[#5B21B6]">
                                {new Date(apt.scheduledDate).toLocaleDateString('pt-BR')}
                              </span>
                              <Badge variant="outline" className="text-[10px] h-5">
                                {apt.status === 'completed' ? 'Concluída' : 'Agendada'}
                              </Badge>
                            </div>
                            <p className="text-[#4B5563] mt-1 whitespace-pre-wrap">
                              {apt.sessionNotes || 'Nenhuma anotação registrada.'}
                            </p>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Nenhuma sessão registrada.</p>
                  )}
                </div>

                {/* Contact */}
                {patient.emergencyContactName && (
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-[#1C1917] mb-2">Contato de Emergência</h4>
                    <div className="flex items-center gap-2 text-sm text-[#78716C]">
                      <Phone className="h-4 w-4" />
                      <span>{patient.emergencyContactName} ({patient.emergencyContactRelationship})</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })()}
        </DialogContent>
      </Dialog>

      {/* Anamnese Details Modal */}
      <Dialog open={!!selectedAnamneseForView} onOpenChange={() => setSelectedAnamneseForView(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Anamnese Completa</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedAnamneseForView(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          {selectedAnamneseForView && <AnamneseDetailView anamneseId={selectedAnamneseForView} />}
        </DialogContent>
      </Dialog>
    </div >
  )
}
