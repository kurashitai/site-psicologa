'use client'

import { useAnalyticsStore, useMockDataStore } from '@/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  UserCheck,
  UserX,
  Heart,
  Brain,
  Briefcase,
  TrendingUp,
  Calendar,
  Video,
  MapPin,
} from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts'

const COLORS = ['#8B5CF6', '#6366F1', '#EC4899', '#14B8A6', '#F59E0B']

export function AnalyticsPanel() {
  const { analytics } = useAnalyticsStore()
  const { patients, appointments } = useMockDataStore()

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#E9D5FF] border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#5B21B6] rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1917]">{analytics.retentionRate}%</p>
                <p className="text-sm text-[#5B21B6]">Taxa de Retenção</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#DBEAFE] border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1917]">{analytics.averageSessionsPerPatient}</p>
                <p className="text-sm text-[#4F46E5]">Sessões Médias/Paciente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#DCFCE7] border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#16A34A] rounded-lg flex items-center justify-center">
                <Video className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1917]">{analytics.appointmentTypes[0].percentage}%</p>
                <p className="text-sm text-[#16A34A]">Consultas Online</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#FEF3C7] border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D97706] rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1C1917]">{analytics.appointmentTypes[1].percentage}%</p>
                <p className="text-sm text-[#D97706]">Presencial</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Gender Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-[#5B21B6]" />
              Distribuição por Gênero
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.genderDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {analytics.genderDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {analytics.genderDistribution.map((item, index) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm text-[#78716C]">{item.label}</span>
                    </div>
                    <span className="text-sm font-medium text-[#1C1917]">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Age Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-[#5B21B6]" />
              Faixa Etária
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.ageDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FAFAF9', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Reasons */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Brain className="h-4 w-4 text-[#5B21B6]" />
            Motivos Mais Comuns de Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.topReasons.map((reason, index) => (
              <div key={reason.reason} className="flex items-center gap-4">
                <span className="text-sm font-medium text-[#5B21B6] w-6">#{index + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[#1C1917]">{reason.reason}</span>
                    <span className="text-sm font-medium text-[#78716C]">{reason.count} pacientes</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#5B21B6] rounded-full"
                      style={{ width: `${reason.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#5B21B6]" />
            Evolução de Pacientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.monthlyPatients}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FAFAF9', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="newPatients" 
                  name="Novos"
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={{ fill: '#8B5CF6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="returningPatients" 
                  name="Retorno"
                  stroke="#6366F1" 
                  strokeWidth={2}
                  dot={{ fill: '#6366F1' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
