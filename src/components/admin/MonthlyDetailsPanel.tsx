'use client'

import { useMemo } from 'react'
import { useMockDataStore } from '@/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Calendar,
  DollarSign,
  Users,
  Download,
  Eye,
} from 'lucide-react'

interface MonthlyDetailsPanelProps {
  selectedMonthProp?: string | null
  onMonthChange?: (month: string) => void
}

export function MonthlyDetailsPanel({ selectedMonthProp, onMonthChange }: MonthlyDetailsPanelProps) {
  const { monthlyDetails } = useMockDataStore()

  // Use the prop if provided, otherwise default to first month
  const selectedMonth = selectedMonthProp || monthlyDetails[0]?.month || ''

  const selectedData = useMemo(
    () => monthlyDetails.find(m => m.month === selectedMonth) || monthlyDetails[0],
    [monthlyDetails, selectedMonth]
  )

  const handleExport = () => {
    if (!selectedData) return

    const report = `
RELATÓRIO MENSAL - ${selectedData.month} ${selectedData.year}
=====================================

RESUMO
------
Pacientes Atendidos: ${selectedData.patients.length}
Sessões Realizadas: ${selectedData.totalSessions}
Receita Total: R$ ${selectedData.totalRevenue.toLocaleString('pt-BR')}

DETALHAMENTO POR PACIENTE
-------------------------
${selectedData.patients.map(p => `- ${p.name}: ${p.sessions} sessões, R$ ${p.revenue.toLocaleString('pt-BR')}`).join('\n')}

Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
    `

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `relatorio-${selectedData.month}-${selectedData.year}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleMonthChange = (month: string) => {
    if (onMonthChange) {
      onMonthChange(month)
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#5B21B6]" />
            Detalhes Mensais
          </CardTitle>
          <div className="flex gap-2">
            <Select value={selectedMonth} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent>
                {monthlyDetails.map((m) => (
                  <SelectItem key={m.month} value={m.month}>
                    {m.month} {m.year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-1" />
              Exportar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {selectedData && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#E9D5FF] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-[#5B21B6]" />
                  <span className="text-sm text-[#5B21B6]">Pacientes Atendidos</span>
                </div>
                <p className="text-2xl font-bold text-[#1C1917]">
                  {selectedData.patients.length}
                </p>
              </div>
              <div className="bg-[#DCFCE7] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Sessões Realizadas</span>
                </div>
                <p className="text-2xl font-bold text-[#1C1917]">
                  {selectedData.totalSessions}
                </p>
              </div>
              <div className="bg-[#DBEAFE] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">Receita Total</span>
                </div>
                <p className="text-2xl font-bold text-[#1C1917]">
                  R$ {selectedData.totalRevenue.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>

            {/* Patients Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead className="text-center">Sessões</TableHead>
                    <TableHead className="text-right">Receita</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedData.patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#E9D5FF] rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-[#5B21B6]">
                              {patient.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium">{patient.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{patient.sessions}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        R$ {patient.revenue.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
