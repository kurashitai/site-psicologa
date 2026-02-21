'use client'

import { useIncompleteRegistrationStore, type IncompleteRegistration } from '@/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  User,
  Mail,
  Phone,
  Clock,
  Send,
  Trash2,
  AlertCircle,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function IncompleteRegistrationsPanel() {
  const { registrations, removeRegistration } = useIncompleteRegistrationStore()

  const handleSendReminder = (registration: IncompleteRegistration) => {
    // In a real app, this would send an email/WhatsApp
    alert(`Lembrete enviado para ${registration.email}!`)
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Cadastros Incompletos
          </CardTitle>
          <Badge variant="outline" className="text-orange-600 border-orange-200">
            {registrations.length} pendentes
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {registrations.length === 0 ? (
          <div className="text-center py-8 text-[#78716C]">
            <User className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Nenhum cadastro incompleto</p>
          </div>
        ) : (
          <div className="space-y-4">
            {registrations.map((registration) => (
              <div
                key={registration.id}
                className="p-4 bg-orange-50 rounded-xl border border-orange-100"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-[#1C1917]">{registration.name}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-[#78716C] mb-3">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span>{registration.email}</span>
                      </div>
                      {registration.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{registration.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Progress */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-[#78716C] mb-1">
                        <span>Progresso do cadastro</span>
                        <span>Etapa {registration.step} de {registration.totalSteps}</span>
                      </div>
                      <Progress 
                        value={(registration.step / registration.totalSteps) * 100} 
                        className="h-2"
                      />
                    </div>

                    {/* Time info */}
                    <div className="flex items-center gap-4 text-xs text-[#A8A29E]">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          Iniciado {formatDistanceToNow(new Date(registration.startedAt), { 
                            addSuffix: true,
                            locale: ptBR 
                          })}
                        </span>
                      </div>
                      <span>•</span>
                      <span>
                        Última atividade {formatDistanceToNow(new Date(registration.lastActivityAt), { 
                          addSuffix: true,
                          locale: ptBR 
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      className="bg-[#5B21B6] hover:bg-[#4C1D95]"
                      onClick={() => handleSendReminder(registration)}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Enviar Lembrete
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => removeRegistration(registration.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Descartar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
