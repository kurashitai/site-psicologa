'use client'

import { useState, useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts'
import { useMockDataStore } from '@/store/useStore'

interface FinanceChartsProps {
  onMonthClick?: (month: string) => void
  selectedMonth?: string
}

export function FinanceCharts({ onMonthClick, selectedMonth }: FinanceChartsProps) {
  const { monthlyDetails } = useMockDataStore()
  const [internalActiveMonth, setInternalActiveMonth] = useState<string | null>(null)

  // Use selectedMonth prop if provided, otherwise use internal state
  const activeMonth = selectedMonth || internalActiveMonth

  // Convert monthlyDetails to chart data format
  const chartData = useMemo(() => {
    const monthMap: Record<string, string> = {
      'Janeiro': 'Jan',
      'Fevereiro': 'Fev',
      'Março': 'Mar',
      'Abril': 'Abr',
      'Maio': 'Mai',
      'Junho': 'Jun',
      'Julho': 'Jul',
      'Agosto': 'Ago',
      'Setembro': 'Set',
      'Outubro': 'Out',
      'Novembro': 'Nov',
      'Dezembro': 'Dez',
    }

    return monthlyDetails.map(m => ({
      month: monthMap[m.month] || m.month.slice(0, 3),
      monthFull: m.month,
      revenue: m.totalRevenue,
      consultations: m.totalSessions,
    }))
  }, [monthlyDetails])

  const handleMonthClick = (monthFull: string) => {
    setInternalActiveMonth(monthFull)
    if (onMonthClick) {
      onMonthClick(monthFull)
    }
  }

  return (
    <div className="space-y-6">
      {/* Revenue Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$${value / 1000}k`}
            />
            <Tooltip
              formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Receita']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Consultations Chart */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Consultas por Mês (clique para ver detalhes)</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value: number) => [value, 'Consultas']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar
                dataKey="consultations"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={activeMonth === entry.monthFull ? '#5B21B6' : '#3b82f6'}
                    className="cursor-pointer hover:fill-[#5B21B6] transition-colors"
                    onClick={() => handleMonthClick(entry.monthFull)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
