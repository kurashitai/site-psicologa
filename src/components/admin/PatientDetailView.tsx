'use client'

import { useState } from 'react'
import { useMockDataStore } from '@/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  User,
  MapPin,
  Phone,
  Heart,
  Briefcase,
  GraduationCap,
  Calendar,
  Edit,
  FileText,
  Clock,
  Save,
  X,
  Eye,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AnamneseDetailView } from './AnamneseDetailView'

interface PatientDetailViewProps {
  patientId: string
}

export function PatientDetailView({ patientId }: PatientDetailViewProps) {
  const { patients, appointments, anamneses, updatePatient } = useMockDataStore()
  const [isEditing, setIsEditing] = useState(false)
  const [selectedAnamnese, setSelectedAnamnese] = useState<string | null>(null)

  const patient = patients.find(p => p.id === patientId)
  const patientAppointments = appointments.filter(a => a.patientId === patientId)
  const patientAnamneses = anamneses.filter(a => a.patientId === patientId)

  const [editData, setEditData] = useState({
    occupation: patient?.occupation || '',
    gender: patient?.gender || '',
    maritalStatus: patient?.maritalStatus || '',
    educationLevel: patient?.educationLevel || '',
    addressCity: patient?.addressCity || '',
    addressState: patient?.addressState || '',
  })

  if (!patient) {
    return <p className="text-gray-500">Paciente não encontrado</p>
  }

  const age = patient.dateOfBirth
    ? Math.floor(
        (Date.now() - new Date(patient.dateOfBirth).getTime()) /
          (365.25 * 24 * 60 * 60 * 1000)
      )
    : null

  const genderMap = {
    masculino: 'Masculino',
    feminino: 'Feminino',
    outro: 'Outro',
    prefiro_nao_informar: 'Prefiro não informar',
  }

  const maritalStatusMap = {
    solteiro: 'Solteiro(a)',
    casado: 'Casado(a)',
    divorciado: 'Divorciado(a)',
    viuvo: 'Viúvo(a)',
    uniao_estavel: 'União Estável',
  }

  const educationMap = {
    fundamental: 'Ensino Fundamental',
    medio: 'Ensino Médio',
    superior_incompleto: 'Superior Incompleto',
    superior_completo: 'Superior Completo',
    pos_graduacao: 'Pós-Graduação',
    mestrado: 'Mestrado',
    doutorado: 'Doutorado',
  }

  const handleSave = () => {
    updatePatient(patientId, editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      occupation: patient.occupation || '',
      gender: patient.gender || '',
      maritalStatus: patient.maritalStatus || '',
      educationLevel: patient.educationLevel || '',
      addressCity: patient.addressCity || '',
      addressState: patient.addressState || '',
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="bg-[#5B21B6] text-white text-2xl">
            {patient.occupation?.charAt(0) || 'P'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-gray-900">Paciente #{patient.id}</h2>
            <Badge
              className={`${
                patient.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : patient.status === 'inactive'
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-orange-100 text-orange-700'
              }`}
            >
              {patient.status === 'active' ? 'Ativo' : patient.status === 'inactive' ? 'Inativo' : 'Lista de Espera'}
            </Badge>
          </div>
          <p className="text-gray-500">{patient.occupation || 'Profissão não informada'}</p>
          <p className="text-sm text-gray-400 mt-1">
            Paciente desde {new Date(patient.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button className="bg-[#5B21B6] hover:bg-[#4C1D95]" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{patientAppointments.length}</p>
          <p className="text-sm text-gray-600">Consultas</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{patientAnamneses.length}</p>
          <p className="text-sm text-gray-600">Anamneses</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {patientAppointments.filter(a => a.status === 'completed').length}
          </p>
          <p className="text-sm text-gray-600">Realizadas</p>
        </div>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4 text-purple-600" />
            Dados Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Profissão</label>
                <Input
                  value={editData.occupation}
                  onChange={(e) => setEditData({ ...editData, occupation: e.target.value })}
                  placeholder="Profissão"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Gênero</label>
                <Select
                  value={editData.gender}
                  onValueChange={(value) => setEditData({ ...editData, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                    <SelectItem value="prefiro_nao_informar">Prefiro não informar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Estado Civil</label>
                <Select
                  value={editData.maritalStatus}
                  onValueChange={(value) => setEditData({ ...editData, maritalStatus: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                    <SelectItem value="casado">Casado(a)</SelectItem>
                    <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                    <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                    <SelectItem value="uniao_estavel">União Estável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Escolaridade</label>
                <Select
                  value={editData.educationLevel}
                  onValueChange={(value) => setEditData({ ...editData, educationLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fundamental">Ensino Fundamental</SelectItem>
                    <SelectItem value="medio">Ensino Médio</SelectItem>
                    <SelectItem value="superior_incompleto">Superior Incompleto</SelectItem>
                    <SelectItem value="superior_completo">Superior Completo</SelectItem>
                    <SelectItem value="pos_graduacao">Pós-Graduação</SelectItem>
                    <SelectItem value="mestrado">Mestrado</SelectItem>
                    <SelectItem value="doutorado">Doutorado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Cidade</label>
                <Input
                  value={editData.addressCity}
                  onChange={(e) => setEditData({ ...editData, addressCity: e.target.value })}
                  placeholder="Cidade"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Estado</label>
                <Input
                  value={editData.addressState}
                  onChange={(e) => setEditData({ ...editData, addressState: e.target.value })}
                  placeholder="Estado"
                />
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {patient.dateOfBirth && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Data de Nascimento</p>
                    <p className="font-medium">
                      {new Date(patient.dateOfBirth).toLocaleDateString('pt-BR')}
                      {age && <span className="text-gray-500 ml-2">({age} anos)</span>}
                    </p>
                  </div>
                </div>
              )}
              {patient.gender && (
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Gênero</p>
                    <p className="font-medium">{genderMap[patient.gender]}</p>
                  </div>
                </div>
              )}
              {patient.maritalStatus && (
                <div className="flex items-center gap-3">
                  <Heart className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Estado Civil</p>
                    <p className="font-medium">{maritalStatusMap[patient.maritalStatus]}</p>
                  </div>
                </div>
              )}
              {patient.occupation && (
                <div className="flex items-center gap-3">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Profissão</p>
                    <p className="font-medium">{patient.occupation}</p>
                  </div>
                </div>
              )}
              {patient.educationLevel && (
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Escolaridade</p>
                    <p className="font-medium">{educationMap[patient.educationLevel]}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="h-4 w-4 text-purple-600" />
            Endereço
          </CardTitle>
        </CardHeader>
        <CardContent>
          {patient.addressStreet ? (
            <p className="text-gray-700">
              {patient.addressStreet}, {patient.addressNumber}
              {patient.addressComplement && ` - ${patient.addressComplement}`}
              <br />
              {patient.addressNeighborhood && `${patient.addressNeighborhood}, `}
              {patient.addressCity}
              {patient.addressState && ` - ${patient.addressState}`}
              {patient.addressZipcode && ` • CEP: ${patient.addressZipcode}`}
            </p>
          ) : (
            <p className="text-gray-500">Endereço não informado</p>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Phone className="h-4 w-4 text-purple-600" />
            Contato de Emergência
          </CardTitle>
        </CardHeader>
        <CardContent>
          {patient.emergencyContactName ? (
            <div className="space-y-2">
              <p className="font-medium">{patient.emergencyContactName}</p>
              <p className="text-gray-600">{patient.emergencyContactPhone}</p>
              {patient.emergencyContactRelationship && (
                <p className="text-sm text-gray-500">{patient.emergencyContactRelationship}</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Contato de emergência não informado</p>
          )}
        </CardContent>
      </Card>

      {/* Appointments History */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-purple-600" />
            Últimas Consultas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {patientAppointments.length > 0 ? (
            <div className="space-y-3">
              {patientAppointments.slice(0, 5).map(appointment => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      appointment.status === 'completed' ? 'bg-green-500' :
                      appointment.status === 'confirmed' ? 'bg-blue-500' :
                      appointment.status === 'cancelled' ? 'bg-red-500' : 'bg-gray-400'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">
                        {new Date(appointment.scheduledDate).toLocaleDateString('pt-BR', {
                          weekday: 'short',
                          day: '2-digit',
                          month: 'short',
                        })}
                        {' às '}
                        {new Date(appointment.scheduledDate).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <p className="text-xs text-gray-500">
                        {appointment.type === 'online' ? 'Online' : 'Presencial'} • R$ {appointment.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={
                    appointment.status === 'completed' ? 'border-green-200 text-green-700' :
                    appointment.status === 'confirmed' ? 'border-blue-200 text-blue-700' :
                    appointment.status === 'cancelled' ? 'border-red-200 text-red-700' : ''
                  }>
                    {appointment.status === 'completed' ? 'Concluída' :
                     appointment.status === 'confirmed' ? 'Confirmada' :
                     appointment.status === 'cancelled' ? 'Cancelada' : 'Agendada'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhuma consulta registrada</p>
          )}
        </CardContent>
      </Card>

      {/* Anamneses */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-purple-600" />
            Anamneses
          </CardTitle>
        </CardHeader>
        <CardContent>
          {patientAnamneses.length > 0 ? (
            <div className="space-y-3">
              {patientAnamneses.map(anamnese => (
                <div key={anamnese.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {new Date(anamnese.createdAt).toLocaleDateString('pt-BR', {
                        weekday: 'short',
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {anamnese.chiefComplaint?.slice(0, 50)}...
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={
                      anamnese.status === 'approved' ? 'border-green-200 text-green-700' :
                      anamnese.status === 'pending_review' ? 'border-orange-200 text-orange-700' :
                      'border-blue-200 text-blue-700'
                    }>
                      {anamnese.status === 'approved' ? 'Aprovada' :
                       anamnese.status === 'pending_review' ? 'Pendente' : 'Revisada'}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedAnamnese(anamnese.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhuma anamnese registrada</p>
          )}
        </CardContent>
      </Card>

      {/* Anamnese Details Modal */}
      <Dialog open={!!selectedAnamnese} onOpenChange={() => setSelectedAnamnese(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Anamnese Completa</DialogTitle>
          </DialogHeader>
          {selectedAnamnese && <AnamneseDetailView anamneseId={selectedAnamnese} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
