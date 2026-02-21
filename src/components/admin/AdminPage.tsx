'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore, useMockDataStore, useNotificationStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  ArrowLeft,
  Users,
  Calendar,
  DollarSign,
  FileText,
  TrendingUp,
  TrendingDown,
  Search,
  Eye,
  Plus,
  Clock,
  Video,
  MapPin,
  CheckCircle,
  ChevronRight,
  Activity,
  BarChart3,
  Settings,
  Bell,
  AlertCircle,
  User,
} from 'lucide-react'
import { FinanceCharts } from './FinanceCharts'
import { PatientDetailView } from './PatientDetailView'
import { AnamneseDetailView } from './AnamneseDetailView'
import { CalendarManager } from './CalendarManager'
import { AnalyticsPanel } from './AnalyticsPanel'
import { NotificationPanel } from './NotificationPanel'
import { ProfileEditor } from './ProfileEditor'
import { ConfigPanel } from './ConfigPanel'
import { IncompleteRegistrationsPanel } from './IncompleteRegistrationsPanel'
import { MonthlyDetailsPanel } from './MonthlyDetailsPanel'

interface AdminPageProps {
  onBack: () => void
}

export function AdminPage({ onBack }: AdminPageProps) {
  const { user } = useAuthStore()
  const { stats, patients, appointments, anamneses } = useMockDataStore()
  const { getUnreadCount } = useNotificationStore()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [selectedAnamnese, setSelectedAnamnese] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [selectedFinanceMonth, setSelectedFinanceMonth] = useState<string | null>(null)

  const unreadCount = getUnreadCount()

  const statsCards = [
    {
      title: 'Pacientes Ativos',
      value: stats.activePatients,
      total: `${stats.totalPatients} total`,
      icon: Users,
      trend: '+12%',
      trendUp: true,
      bgColor: 'bg-[#E9D5FF]',
      iconColor: 'text-[#5B21B6]',
    },
    {
      title: 'Consultas do Mês',
      value: stats.monthlyAppointments,
      total: `${stats.totalAppointments} total`,
      icon: Calendar,
      trend: '+8%',
      trendUp: true,
      bgColor: 'bg-[#DBEAFE]',
      iconColor: 'text-[#4F46E5]',
    },
    {
      title: 'Receita Mensal',
      value: `R$ ${stats.monthlyRevenue.toLocaleString('pt-BR')}`,
      total: 'Meta: R$ 5.000',
      icon: DollarSign,
      trend: '+15%',
      trendUp: true,
      bgColor: 'bg-[#DCFCE7]',
      iconColor: 'text-[#16A34A]',
    },
    {
      title: 'Anamneses Pendentes',
      value: stats.pendingAnamneses,
      total: 'Aguardando revisão',
      icon: FileText,
      trend: '-2',
      trendUp: false,
      bgColor: 'bg-[#FEF3C7]',
      iconColor: 'text-[#D97706]',
    },
  ]

  const recentActivity = [
    ...appointments.map(a => ({ ...a, type: 'appointment' as const })),
    ...anamneses.map(a => ({ ...a, type: 'anamnese' as const })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-[#78716C] hover:text-[#1C1917]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Site
              </Button>
              <div className="h-6 w-px bg-gray-200" />
              <h1 className="text-lg font-semibold text-[#1C1917]">
                Painel Administrativo
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="h-5 w-5 text-[#78716C]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5B21B6] text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
              
              {/* Config */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowConfig(true)}
              >
                <Settings className="h-5 w-5 text-[#78716C]" />
              </Button>
              
              {/* Profile */}
              <button
                className="flex items-center gap-2 pl-3 border-l hover:opacity-80 transition-opacity"
                onClick={() => setShowProfile(true)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatarUrl} />
                  <AvatarFallback className="bg-[#5B21B6] text-white text-sm">
                    {user?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-[#1C1917]">{user?.name}</p>
                  <p className="text-xs text-[#78716C]">Administrador</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            <TabsTrigger 
              value="dashboard" 
              className="rounded-lg data-[state=active]:bg-[#5B21B6] data-[state=active]:text-white"
            >
              <Activity className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="patients"
              className="rounded-lg data-[state=active]:bg-[#5B21B6] data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Pacientes
            </TabsTrigger>
            <TabsTrigger 
              value="calendar"
              className="rounded-lg data-[state=active]:bg-[#5B21B6] data-[state=active]:text-white"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Agenda
            </TabsTrigger>
            <TabsTrigger 
              value="anamneses"
              className="rounded-lg data-[state=active]:bg-[#5B21B6] data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Anamneses
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="rounded-lg data-[state=active]:bg-[#5B21B6] data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="finance"
              className="rounded-lg data-[state=active]:bg-[#5B21B6] data-[state=active]:text-white"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Financeiro
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
              {statsCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="h-full"
                >
                  <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                          <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-medium ${
                          stat.trendUp ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.trendUp ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {stat.trend}
                        </div>
                      </div>
                      <p className="text-xl font-bold text-[#1C1917]">{stat.value}</p>
                      <p className="text-sm text-[#78716C]">{stat.title}</p>
                      <p className="text-xs text-[#A8A29E] mt-1 truncate">{stat.total}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Incomplete Registrations Alert */}
            <IncompleteRegistrationsPanel />

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2"
              >
                <Card className="border-0 shadow-sm h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Receita & Consultas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FinanceCharts
                      onMonthClick={(month) => {
                        setSelectedFinanceMonth(month)
                        setActiveTab('finance')
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-0 shadow-sm h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Atividade Recente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((activity) => (
                        <div
                          key={`${activity.type}-${activity.id}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => {
                            if (activity.type === 'appointment') {
                              setActiveTab('calendar')
                            } else {
                              setSelectedAnamnese(activity.id)
                            }
                          }}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === 'appointment' ? 'bg-[#DBEAFE]' : 'bg-[#E9D5FF]'
                          }`}>
                            {activity.type === 'appointment' ? (
                              <Calendar className="h-4 w-4 text-[#4F46E5]" />
                            ) : (
                              <FileText className="h-4 w-4 text-[#5B21B6]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#1C1917] truncate">
                              {activity.type === 'appointment' ? 'Nova consulta' : 'Anamnese recebida'}
                            </p>
                            <p className="text-xs text-[#78716C]">
                              {new Date(activity.createdAt).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-[#A8A29E]" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Today's Appointments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Consultas de Hoje</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab('calendar')}>
                      Ver Agenda
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {appointments.slice(0, 3).map((appointment) => {
                      const patient = patients.find(p => p.id === appointment.patientId)
                      return (
                        <div
                          key={appointment.id}
                          className="flex items-center gap-4 p-4 bg-[#FAFAF9] rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => setSelectedPatient(appointment.patientId)}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-[#5B21B6] text-white">
                              {patient?.occupation?.charAt(0) || 'P'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-[#1C1917] truncate">
                              Paciente #{appointment.patientId}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-[#78716C]">
                              <Clock className="h-3 w-3" />
                              <span>
                                {new Date(appointment.scheduledDate).toLocaleTimeString('pt-BR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {appointment.type === 'online' ? 'Online' : 'Presencial'}
                              </Badge>
                            </div>
                          </div>
                          <Badge
                            className={`${
                              appointment.status === 'confirmed' 
                                ? 'bg-green-100 text-green-700' 
                                : appointment.status === 'completed'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {appointment.status === 'confirmed' ? 'Confirmado' : 
                             appointment.status === 'completed' ? 'Concluído' : 'Agendado'}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle>Gerenciar Pacientes</CardTitle>
                  <div className="flex gap-3">
                    <div className="relative flex-1 sm:flex-none">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8A29E]" />
                      <Input
                        placeholder="Buscar pacientes..."
                        className="pl-9 w-full sm:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button className="bg-[#5B21B6] hover:bg-[#4C1D95]">
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Paciente
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patients
                    .filter(p => 
                      searchTerm === '' || 
                      p.occupation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      p.id.includes(searchTerm)
                    )
                    .map((patient) => (
                    <motion.div
                      key={patient.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 bg-[#FAFAF9] rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-[#5B21B6] text-white">
                            {patient.occupation?.charAt(0) || 'P'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-[#1C1917]">Paciente #{patient.id}</p>
                          <div className="flex items-center gap-3 text-sm text-[#78716C]">
                            <span>{patient.occupation || 'Não informado'}</span>
                            <span>•</span>
                            <span>{patient.addressCity}, {patient.addressState}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={`${
                            patient.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {patient.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedPatient(patient.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalhes
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <CalendarManager />
          </TabsContent>

          {/* Anamneses Tab */}
          <TabsContent value="anamneses">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Anamneses Recebidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {anamneses.map((anamnese) => (
                    <motion.div
                      key={anamnese.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 bg-[#FAFAF9] rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          anamnese.status === 'approved' 
                            ? 'bg-green-100' 
                            : anamnese.status === 'pending_review'
                            ? 'bg-orange-100'
                            : 'bg-blue-100'
                        }`}>
                          <FileText className={`h-5 w-5 ${
                            anamnese.status === 'approved' 
                              ? 'text-green-600' 
                              : anamnese.status === 'pending_review'
                              ? 'text-orange-600'
                              : 'text-blue-600'
                          }`} />
                        </div>
                        <div>
                          <p className="font-semibold text-[#1C1917]">
                            Anamnese #{anamnese.id.slice(0, 4)}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-[#78716C]">
                            <span>Paciente #{anamnese.patientId}</span>
                            <span>•</span>
                            <span>
                              {new Date(anamnese.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={`${
                            anamnese.status === 'approved' 
                              ? 'bg-green-100 text-green-700' 
                              : anamnese.status === 'pending_review'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {anamnese.status === 'approved' 
                            ? 'Aprovada' 
                            : anamnese.status === 'pending_review'
                            ? 'Pendente'
                            : 'Revisada'}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedAnamnese(anamnese.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Completa
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AnalyticsPanel />
          </TabsContent>

          {/* Finance Tab */}
          <TabsContent value="finance">
            <div className="space-y-6">
              <MonthlyDetailsPanel 
                selectedMonthProp={selectedFinanceMonth} 
                onMonthChange={(month) => setSelectedFinanceMonth(month)}
              />

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Histórico de Receita</CardTitle>
                </CardHeader>
                <CardContent>
                  <FinanceCharts 
                    selectedMonth={selectedFinanceMonth || undefined}
                    onMonthClick={(month) => setSelectedFinanceMonth(month)}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Paciente</DialogTitle>
          </DialogHeader>
          {selectedPatient && <PatientDetailView patientId={selectedPatient} />}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedAnamnese} onOpenChange={() => setSelectedAnamnese(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Anamnese Completa</DialogTitle>
          </DialogHeader>
          {selectedAnamnese && <AnamneseDetailView anamneseId={selectedAnamnese} />}
        </DialogContent>
      </Dialog>

      <NotificationPanel open={showNotifications} onClose={() => setShowNotifications(false)} />
      <ProfileEditor open={showProfile} onClose={() => setShowProfile(false)} />
      <ConfigPanel open={showConfig} onClose={() => setShowConfig(false)} />
    </div>
  )
}
