'use client'

import { useMockDataStore } from '@/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  MessageSquareWarning,
  Clock,
  Heart,
  Users,
  Briefcase,
  Activity,
  Moon,
  Utensils,
  Zap,
  Target,
  FileText,
  CheckCircle,
  Edit,
  Save,
  X,
} from 'lucide-react'
import { useState, useMemo } from 'react'

interface AnamneseDetailViewProps {
  anamneseId: string
}

export function AnamneseDetailView({ anamneseId }: AnamneseDetailViewProps) {
  const { anamneses, patients, updateAnamnese } = useMockDataStore()
  const [isEditing, setIsEditing] = useState(false)
  
  const anamnese = anamneses.find(a => a.id === anamneseId)
  const patient = anamnese ? patients.find(p => p.id === anamnese.patientId) : null

  // Initialize notes from existing anamnese data
  const initialNotes = anamnese?.adminNotes || ''
  const [adminNotes, setAdminNotes] = useState(initialNotes)

  if (!anamnese) {
    return <p className="text-gray-500">Anamnese não encontrada</p>
  }

  const statusConfig = {
    approved: { label: 'Aprovada', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    pending_review: { label: 'Pendente', color: 'bg-orange-100 text-orange-700', icon: Clock },
    reviewed: { label: 'Revisada', color: 'bg-blue-100 text-blue-700', icon: FileText },
    draft: { label: 'Rascunho', color: 'bg-gray-100 text-gray-700', icon: Edit },
  }

  const currentStatus = statusConfig[anamnese.status] || statusConfig.draft
  const StatusIcon = currentStatus.icon

  const handleSaveNotes = () => {
    updateAnamnese(anamneseId, { adminNotes })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setAdminNotes(initialNotes)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-gray-900">
              Anamnese #{anamnese.id.slice(0, 4)}
            </h2>
            <Badge className={currentStatus.color}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {currentStatus.label}
            </Badge>
          </div>
          <p className="text-gray-500">
            Paciente #{anamnese.patientId} • {patient?.occupation || 'Paciente'}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Preenchida em {new Date(anamnese.createdAt).toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <div className="flex gap-2">
          {anamnese.status === 'pending_review' && (
            <Button className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Aprovar
            </Button>
          )}
        </div>
      </div>

      {/* Queixa Principal */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquareWarning className="h-4 w-4 text-purple-600" />
            Queixa Principal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Motivo da Consulta</p>
            <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{anamnese.chiefComplaint || 'Não informado'}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Duração dos Sintomas</p>
              <p className="font-medium">{anamnese.symptomDuration || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Intensidade</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
                    style={{ width: `${((anamnese.symptomIntensity || 5) / 10) * 100}%` }}
                  />
                </div>
                <span className="font-bold">{anamnese.symptomIntensity}/10</span>
              </div>
            </div>
          </div>
          {anamnese.previousTreatment && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-600 uppercase tracking-wide mb-1">Tratamento Anterior</p>
              <p className="text-gray-700">{anamnese.previousTreatmentDetails || 'Já realizou tratamento anterior'}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Expectativas</p>
            <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{anamnese.expectations || 'Não informado'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Saúde */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Heart className="h-4 w-4 text-blue-600" />
            Histórico de Saúde
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Doenças Atuais</p>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg min-h-[60px]">
                {anamnese.currentDiseases || 'Não informado'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Medicamentos em Uso</p>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg min-h-[60px]">
                {anamnese.currentMedications || 'Não informado'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Alergias</p>
              <p className="text-gray-700">{anamnese.allergies || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Internações Anteriores</p>
              <p className="text-gray-700">{anamnese.previousHospitalizations || 'Não informado'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Histórico Familiar de Doenças Mentais</p>
              <p className="text-gray-700">{anamnese.familyHistoryMentalIllness || 'Não informado'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Histórico Familiar */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4 text-green-600" />
            Histórico Familiar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Relacionamento Familiar</p>
              <p className="text-gray-700 capitalize">{anamnese.familyRelationship || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Suporte Familiar</p>
              <Badge variant={anamnese.familySupport ? 'default' : 'secondary'}>
                {anamnese.familySupport ? 'Possui suporte' : 'Sem suporte'}
              </Badge>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Conflitos Familiares</p>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                {anamnese.familyConflicts || 'Não informado'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Histórico Social */}
      <Card className="border-l-4 border-l-amber-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-amber-600" />
            Histórico Social
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Infância</p>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg min-h-[60px]">
                {anamnese.childhoodDescription || 'Não informado'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Histórico Escolar</p>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg min-h-[60px]">
                {anamnese.schoolHistory || 'Não informado'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Situação Profissional</p>
              <p className="text-gray-700">{anamnese.currentWorkSituation || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Estado de Relacionamento</p>
              <p className="text-gray-700">{anamnese.relationshipStatus || 'Não informado'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Rotina Diária</p>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                {anamnese.routineDescription || 'Não informado'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Hobbies e Interesses</p>
              <p className="text-gray-700">{anamnese.hobbies || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Rede de Apoio</p>
              <p className="text-gray-700">{anamnese.supportNetwork || 'Não informado'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Avaliação Atual */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4 text-red-600" />
            Avaliação Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <Moon className="h-5 w-5 text-purple-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Sono</p>
              <p className="font-bold capitalize">{anamnese.sleepQuality?.replace('_', ' ') || '-'}</p>
              <p className="text-xs text-gray-400">{anamnese.sleepHours}h/noite</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <Utensils className="h-5 w-5 text-orange-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Apetite</p>
              <p className="font-bold capitalize">{anamnese.appetite || '-'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <Zap className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Energia</p>
              <p className="font-bold">{anamnese.energyLevel}/10</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <Target className="h-5 w-5 text-blue-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Concentração</p>
              <p className="font-bold">{anamnese.concentrationLevel}/10</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Descrição do Humor</p>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
              {anamnese.moodDescription || 'Não informado'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notas da Psicóloga */}
      <Card className="border-l-4 border-l-gray-400">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-600" />
              Notas Privadas
            </span>
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                placeholder="Adicione suas observações privadas sobre esta anamnese..."
                className="min-h-[120px]"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
              />
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleCancelEdit}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handleSaveNotes}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Notas
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg min-h-[80px]">
              {anamnese.adminNotes || 'Nenhuma nota adicionada ainda.'}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            Estas notas são visíveis apenas para você e não são compartilhadas com o paciente.
          </p>
        </CardContent>
      </Card>

      {/* Consentimento */}
      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <div>
          <p className="font-medium text-green-800">Consentimento LGPD Confirmado</p>
          <p className="text-sm text-green-600">
            O paciente autorizou o tratamento dos dados em{' '}
            {new Date(anamnese.consentDate).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  )
}
