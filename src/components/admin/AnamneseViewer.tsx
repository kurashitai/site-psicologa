'use client'

import { useMockDataStore } from '@/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Calendar, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react'

export function AnamneseViewer() {
  const { anamneses, patients } = useMockDataStore()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Aprovada</Badge>
      case 'pending_review':
        return <Badge className="bg-orange-500">Pendente</Badge>
      case 'reviewed':
        return <Badge className="bg-blue-500">Revisada</Badge>
      case 'draft':
        return <Badge variant="outline">Rascunho</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Anamneses</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {anamneses.map((anamnese) => {
              const patient = patients.find((p) => p.id === anamnese.patientId)

              return (
                <AccordionItem
                  key={anamnese.id}
                  value={anamnese.id}
                  className="border rounded-lg px-4"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <div className="text-left">
                          <p className="font-medium">
                            Paciente #{anamnese.patientId}
                            {patient && ` - ${patient.occupation}`}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(anamnese.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(anamnese.createdAt).toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(anamnese.status)}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      {/* Queixa Principal */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Queixa Principal</h4>
                        <p className="text-gray-700">{anamnese.chiefComplaint || 'Não informado'}</p>
                        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                          <div>
                            <span className="text-gray-500">Duração:</span>
                            <span className="ml-2 font-medium">{anamnese.symptomDuration || '-'}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Intensidade:</span>
                            <span className="ml-2 font-medium">{anamnese.symptomIntensity}/10</span>
                          </div>
                        </div>
                      </div>

                      {/* Expectativas */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Expectativas</h4>
                        <p className="text-gray-700">{anamnese.expectations || 'Não informado'}</p>
                      </div>

                      {/* Histórico de Saúde */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Histórico de Saúde</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Doenças:</span>
                            <p className="text-gray-700">{anamnese.currentDiseases || 'Não informado'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Medicamentos:</span>
                            <p className="text-gray-700">{anamnese.currentMedications || 'Não informado'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Avaliação */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Avaliação Atual</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Sono:</span>
                            <span className="ml-2 font-medium capitalize">
                              {anamnese.sleepQuality?.replace('_', ' ') || '-'}
                            </span>
                            <span className="text-gray-400 ml-1">({anamnese.sleepHours}h)</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Apetite:</span>
                            <span className="ml-2 font-medium capitalize">
                              {anamnese.appetite || '-'}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Energia:</span>
                            <span className="ml-2 font-medium">{anamnese.energyLevel}/10</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Completo
                        </Button>
                        {anamnese.status === 'pending_review' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Aprovar
                          </Button>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>

          {anamneses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhuma anamnese encontrada
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
