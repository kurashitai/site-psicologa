'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAuthStore, useMockDataStore } from '@/store/useStore'
import { Calendar } from '@/components/ui/calendar'
import { format, isSameDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Video, MapPin, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PatientBookingModalProps {
    isOpen: boolean
    onClose: () => void
}

const ALL_SLOTS = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
]

export function PatientBookingModal({ isOpen, onClose }: PatientBookingModalProps) {
    const { user } = useAuthStore()
    const { appointments, addAppointment } = useMockDataStore()
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [sessionType, setSessionType] = useState<'online' | 'presencial'>('online')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    // Calculate available slots by checking existing appointments for the selected date
    const getAvailableSlots = (date: Date) => {
        const bookedAppointments = appointments.filter(apt => isSameDay(new Date(apt.scheduledDate), date))

        // Map existing appointments to "HH:mm" strings
        const bookedTimes = bookedAppointments.map(apt =>
            format(new Date(apt.scheduledDate), 'HH:mm')
        )

        // Return only slots that aren't booked
        return ALL_SLOTS.filter(slot => !bookedTimes.includes(slot))
    }

    const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : []

    const handleBook = async () => {
        if (!selectedDate || !selectedTime || !user) return
        setIsSubmitting(true)

        // Simulate API delay
        await new Promise(r => setTimeout(r, 1500))

        // Parse time
        const [hours, minutes] = selectedTime.split(':').map(Number)
        const scheduledDate = new Date(selectedDate)
        scheduledDate.setHours(hours, minutes, 0, 0)

        addAppointment({
            id: `apt-${Date.now()}`,
            patientId: '1', // Mock patient ID
            scheduledDate,
            durationMinutes: 50,
            type: sessionType,
            status: 'scheduled',
            price: sessionType === 'online' ? 200 : 250,
            paymentStatus: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        })

        toast({
            title: "Consulta agendada!",
            description: `Sua sessão para ${format(scheduledDate, "dd/MM 'às' HH:mm")} foi marcada com sucesso.`,
        })

        setIsSubmitting(false)
        setSelectedTime(null)
        onClose()
    }

    // Disable past dates and weekends
    const isDateDisabled = (date: Date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        // Disable past dates
        if (date < today) return true

        // Disable weekends (optional)
        const day = date.getDay()
        return day === 0 || day === 6
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#111827]">Nova Consulta</DialogTitle>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-6 pt-4">

                    {/* Left: Calendar & Type */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">1. Tipo de Sessão</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSessionType('online')}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${sessionType === 'online' ? 'border-[#5B21B6] bg-purple-50 text-[#5B21B6]' : 'border-gray-100 bg-white text-gray-500 hover:border-purple-200'}`}
                                >
                                    <Video className="h-6 w-6 mb-2" />
                                    <span className="font-bold">Online</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSessionType('presencial')}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${sessionType === 'presencial' ? 'border-[#5B21B6] bg-purple-50 text-[#5B21B6]' : 'border-gray-100 bg-white text-gray-500 hover:border-purple-200'}`}
                                >
                                    <MapPin className="h-6 w-6 mb-2" />
                                    <span className="font-bold">Presencial</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">2. Selecione a Data</p>
                            <div className="border border-gray-100 rounded-2xl p-2 bg-white flex justify-center shadow-sm">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={isDateDisabled}
                                    locale={ptBR}
                                    className="bg-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Available Times & Confirmation */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">3. Horários Disponíveis</p>

                            {!selectedDate ? (
                                <div className="h-48 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 bg-gray-50">
                                    <p>Selecione uma data primeiro</p>
                                </div>
                            ) : availableSlots.length === 0 ? (
                                <div className="h-48 border-2 border-dashed border-red-200 rounded-2xl flex flex-col items-center justify-center text-red-500 bg-red-50 p-6 text-center">
                                    <span className="font-bold mb-1">Agenda Cheia</span>
                                    <p className="text-sm text-red-400">Não há horários disponíveis para este dia. Tente outra data.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    {availableSlots.map(time => (
                                        <button
                                            key={time}
                                            type="button"
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-3 rounded-xl border text-base font-bold transition-all ${selectedTime === time ? 'bg-[#5B21B6] border-[#5B21B6] text-white shadow-md' : 'bg-white border-gray-200 text-[#111827] hover:border-[#5B21B6] hover:text-[#5B21B6]'}`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-500 font-medium">Valor da Sessão</span>
                                <span className="text-xl font-extrabold text-[#111827]">
                                    R$ {sessionType === 'online' ? '200' : '250'},00
                                </span>
                            </div>
                            <Button
                                className="w-full text-lg h-14 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl shadow-lg transition-all"
                                disabled={!selectedTime || isSubmitting}
                                onClick={handleBook}
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Confirmando...</>
                                ) : (
                                    'Confirmar Agendamento'
                                )}
                            </Button>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}
