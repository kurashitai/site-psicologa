'use client'

import { useState } from 'react'
import { useMockDataStore } from '@/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'

export function PatientList() {
  const { patients } = useMockDataStore()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      search === '' ||
      patient.occupation?.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.includes(search)

    const matchesStatus =
      statusFilter === 'all' || patient.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Ativo</Badge>
      case 'inactive':
        return <Badge variant="secondary">Inativo</Badge>
      case 'waiting_list':
        return <Badge variant="outline">Lista de Espera</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Pacientes</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar pacientes..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
              <SelectItem value="waiting_list">Lista de Espera</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Gênero</TableHead>
                <TableHead>Profissão</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => {
                const age = patient.dateOfBirth
                  ? Math.floor(
                      (Date.now() - new Date(patient.dateOfBirth).getTime()) /
                        (365.25 * 24 * 60 * 60 * 1000)
                    )
                  : '-'

                return (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {patient.occupation?.charAt(0) || 'P'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Paciente #{patient.id}</p>
                          <p className="text-sm text-gray-500">{patient.addressCity}, {patient.addressState}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{age} anos</TableCell>
                    <TableCell className="capitalize">{patient.gender || '-'}</TableCell>
                    <TableCell>{patient.occupation || '-'}</TableCell>
                    <TableCell>{getStatusBadge(patient.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum paciente encontrado
          </div>
        )}
      </CardContent>
    </Card>
  )
}
