'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore, useMockDataStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  Calendar,
  DollarSign,
  FileText,
  LogOut,
  Home,
  Settings,
  Bell,
  Search,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react'
import { FinanceCharts } from './FinanceCharts'
import { PatientList } from './PatientList'
import { AnamneseViewer } from './AnamneseViewer'
import { AppointmentCalendar } from './AppointmentCalendar'

export function AdminPanel() {
  const { user, logout } = useAuthStore()
  const { stats, patients, appointments } = useMockDataStore()
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleLogout = () => {
    logout()
  }

  const statsCards = [
    {
      title: 'Total de Pacientes',
      value: stats.totalPatients,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+2 este mês',
    },
    {
      title: 'Consultas do Mês',
      value: stats.monthlyAppointments,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: `${stats.totalAppointments} total`,
    },
    {
      title: 'Receita Mensal',
      value: `R$ ${stats.monthlyRevenue.toLocaleString('pt-BR')}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+15% vs mês anterior',
    },
    {
      title: 'Anamneses Pendentes',
      value: stats.pendingAnamneses,
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: 'Aguardando revisão',
    },
  ]

  const upcomingAppointments = appointments
    .filter((a) => a.status === 'scheduled' || a.status === 'confirmed')
    .slice(0, 5)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Settings className="h-4 w-4 mr-2" />
          Painel Admin
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-4xl overflow-y-auto">
        <SheetHeader className="pb-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-purple-600 text-white">
                  {user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{user?.name}</p>
                <p className="text-sm text-gray-500 font-normal">Painel Administrativo</p>
              </div>
            </SheetTitle>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Sair
            </Button>
          </div>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="dashboard" className="text-xs sm:text-sm">
              <Home className="h-4 w-4 mr-1" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="patients" className="text-xs sm:text-sm">
              <Users className="h-4 w-4 mr-1" />
              Pacientes
            </TabsTrigger>
            <TabsTrigger value="appointments" className="text-xs sm:text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              Consultas
            </TabsTrigger>
            <TabsTrigger value="anamneses" className="text-xs sm:text-sm">
              <FileText className="h-4 w-4 mr-1" />
              Anamneses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statsCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                          <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                      <p className="text-2xl font-bold mt-3">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Charts and upcoming appointments */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Receita Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <FinanceCharts />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Próximas Consultas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingAppointments.map((appointment) => {
                      const patient = patients.find((p) => p.id === appointment.patientId)
                      return (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {patient?.occupation?.charAt(0) || 'P'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {patient ? `Paciente #${patient.id}` : 'Paciente'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(appointment.scheduledDate).toLocaleDateString('pt-BR')} às{' '}
                                {new Date(appointment.scheduledDate).toLocaleTimeString('pt-BR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={appointment.type === 'online' ? 'default' : 'secondary'}
                            >
                              {appointment.type === 'online' ? 'Online' : 'Presencial'}
                            </Badge>
                            <Badge
                              variant={
                                appointment.status === 'confirmed'
                                  ? 'default'
                                  : 'outline'
                              }
                            >
                              {appointment.status === 'confirmed' ? 'Confirmado' : 'Agendado'}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients">
            <PatientList />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentCalendar />
          </TabsContent>

          <TabsContent value="anamneses">
            <AnamneseViewer />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
