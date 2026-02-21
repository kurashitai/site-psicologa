'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuthStore, useMockDataStore, useUIStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    LogOut,
    Calendar as CalendarIcon,
    Clock,
    Video,
    MapPin,
    FileText,
    Plus
} from 'lucide-react'
import Image from 'next/image'
import { PatientBookingModal } from '@/components/paciente/PatientBookingModal'

export default function PatientDashboard() {
    const { user, isAuthenticated, logout } = useAuthStore()
    const { appointments, patients, anamneses } = useMockDataStore()
    const { setAnamneseModalOpen } = useUIStore()
    const router = useRouter()

    const [isMounted, setIsMounted] = useState(false)
    const [isBookingOpen, setIsBookingOpen] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        if (!isAuthenticated || user?.role !== 'patient') {
            router.push('/paciente/login')
        }
    }, [isAuthenticated, user, router])

    if (!isMounted || !isAuthenticated || user?.role !== 'patient') return null

    // Fetch patient specific data
    // Using email or a mock logic to find the specific patient profile
    const patientProfile = patients.find(p => p.id === '1') // Mock fallback to patient 1
    const patientAppointments = appointments.filter(a => a.patientId === (patientProfile?.id || '1')).sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())

    const upcomingAppointments = patientAppointments.filter(a => new Date(a.scheduledDate) > new Date())
    const pastAppointments = patientAppointments.filter(a => new Date(a.scheduledDate) <= new Date() && a.status === 'completed')

    const nextAppointment = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null
    const patientAnamnese = anamneses.find(a => a.patientId === (patientProfile?.id || '1'))

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    return (
        <div className="min-h-screen bg-[#FAFAF9]">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/icon.png"
                            alt="Logo"
                            width={32}
                            height={32}
                            className="rounded-lg"
                        />
                        <span className="font-bold text-[#5B21B6] hidden sm:block">Painel do Paciente</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">Olá, {user.name.split(' ')[0]}</span>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500 hover:text-red-600 hover:bg-red-50">
                            <LogOut className="h-4 w-4 mr-2" />
                            Sair
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Welcome & Next Appointment */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="md:col-span-2 bg-gradient-to-br from-[#5B21B6] to-[#7C3AED] text-white border-0 shadow-lg overflow-hidden relative">
                            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                            <CardContent className="p-8 relative z-10">
                                <h2 className="text-2xl font-extrabold mb-1">Bem-vindo(a), {user.name}!</h2>
                                <p className="text-purple-100 opacity-90 mb-8">Acompanhe seu progresso e gerencie suas consultas.</p>

                                {nextAppointment ? (
                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                                        <p className="text-sm font-semibold text-purple-200 uppercase tracking-widest mb-3">Próxima Consulta</p>
                                        <div className="flex flex-wrap gap-4 items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-white text-[#5B21B6] rounded-xl flex flex-col items-center justify-center font-bold shadow-sm">
                                                    <span className="text-xs uppercase">{new Date(nextAppointment.scheduledDate).toLocaleDateString('pt-BR', { month: 'short' })}</span>
                                                    <span className="text-xl leading-none">{new Date(nextAppointment.scheduledDate).getDate()}</span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 text-lg font-bold mb-1">
                                                        <Clock className="h-4 w-4" />
                                                        {new Date(nextAppointment.scheduledDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-purple-100">
                                                        {nextAppointment.type === 'online' ? (
                                                            <><Video className="h-4 w-4" /> Sessão Online</>
                                                        ) : (
                                                            <><MapPin className="h-4 w-4" /> Sessão Presencial</>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {nextAppointment.type === 'online' && nextAppointment.status === 'confirmed' && (
                                                <Button className="bg-white text-[#5B21B6] hover:bg-gray-50 font-bold shadow-sm">
                                                    Acessar Sala Virtual
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 flex flex-col items-center text-center">
                                        <p className="font-medium mb-3">Você não tem consultas agendadas.</p>
                                        <Button
                                            className="bg-white text-[#5B21B6] hover:bg-gray-50 font-bold shadow-sm"
                                            onClick={() => setIsBookingOpen(true)}
                                        >
                                            Agendar Agora
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Anamnese Status Card */}
                        <Card className="border-gray-100 shadow-md">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center gap-2 text-[#111827]">
                                    <FileText className="h-5 w-5 text-purple-600" />
                                    Prontuário
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col h-[calc(100%-3rem)] justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-4">
                                        A anamnese inicial é fundamental para o sucesso do nosso acompanhamento psicológico.
                                    </p>

                                    {patientAnamnese ? (
                                        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-green-800 text-sm">Status</span>
                                                <Badge className="bg-green-500 hover:bg-green-600">Preenchida</Badge>
                                            </div>
                                            <p className="text-xs text-green-700 font-medium">Enviada em {new Date(patientAnamnese.createdAt).toLocaleDateString('pt-BR')}</p>
                                        </div>
                                    ) : (
                                        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-orange-800 text-sm">Status</span>
                                                <Badge variant="outline" className="border-orange-500 text-orange-600">Pendente</Badge>
                                            </div>
                                            <p className="text-xs text-orange-700 font-medium">Suas informações iniciais aguardam preenchimento.</p>
                                        </div>
                                    )}
                                </div>

                                {!patientAnamnese && (
                                    <Button
                                        className="w-full bg-[#5B21B6] hover:bg-[#4C1D95]"
                                        onClick={() => setAnamneseModalOpen(true)}
                                    >
                                        Preencher Anamnese
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* History */}
                    <Card className="border-gray-100 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-xl text-[#111827]">Consultas Anteriores</CardTitle>
                            <Button
                                variant="outline"
                                className="border-purple-200 text-purple-700 hover:bg-purple-50"
                                onClick={() => setIsBookingOpen(true)}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Nova Consulta
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {pastAppointments.length > 0 ? (
                                <div className="space-y-4">
                                    {pastAppointments.map((apt) => (
                                        <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-lg flex flex-col items-center justify-center border border-gray-200 shadow-sm">
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase">{new Date(apt.scheduledDate).toLocaleDateString('pt-BR', { month: 'short' })}</span>
                                                    <span className="text-base font-extrabold text-[#111827] leading-none">{new Date(apt.scheduledDate).getDate()}</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#111827]">Sessão de Psicoterapia</p>
                                                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(apt.scheduledDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                                                        <span className="flex items-center gap-1">
                                                            {apt.type === 'online' ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                                                            <span className="capitalize">{apt.type}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                Concluída
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p>Nenhuma consulta anterior registrada.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                </div>
            </main>
            <PatientBookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </div>
    )
}
