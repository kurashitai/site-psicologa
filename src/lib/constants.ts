// Brazilian states
export const BRAZILIAN_STATES = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
] as const;

// Gender options
export const GENDER_OPTIONS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'outro', label: 'Outro' },
  { value: 'prefiro_nao_dizer', label: 'Prefiro não dizer' },
] as const;

// Marital status options
export const MARITAL_STATUS_OPTIONS = [
  { value: 'solteiro', label: 'Solteiro(a)' },
  { value: 'casado', label: 'Casado(a)' },
  { value: 'divorciado', label: 'Divorciado(a)' },
  { value: 'viuvo', label: 'Viúvo(a)' },
  { value: 'uniao_estavel', label: 'União Estável' },
] as const;

// Intensity scale (1-10)
export const INTENSITY_SCALE = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}${i === 0 ? ' (Muito leve)' : i === 9 ? ' (Muito intensa)' : ''}`,
})) as const;

// Sleep quality options
export const SLEEP_QUALITY_OPTIONS = [
  { value: 'muito_boa', label: 'Muito boa' },
  { value: 'boa', label: 'Boa' },
  { value: 'regular', label: 'Regular' },
  { value: 'ruim', label: 'Ruim' },
  { value: 'muito_ruim', label: 'Muito ruim' },
] as const;

// Energy level options
export const ENERGY_LEVEL_OPTIONS = [
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Média' },
  { value: 'baixa', label: 'Baixa' },
  { value: 'muito_baixa', label: 'Muito baixa' },
] as const;

// Concentration level options
export const CONCENTRATION_LEVEL_OPTIONS = [
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Média' },
  { value: 'baixa', label: 'Baixa' },
  { value: 'muito_baixa', label: 'Muito baixa' },
] as const;

// Yes/No options
export const YES_NO_OPTIONS = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
] as const;

// Duration options for complaint
export const COMPLAINT_DURATION_OPTIONS = [
  { value: 'menos_1_mes', label: 'Menos de 1 mês' },
  { value: '1_3_meses', label: '1 a 3 meses' },
  { value: '3_6_meses', label: '3 a 6 meses' },
  { value: '6_12_meses', label: '6 a 12 meses' },
  { value: 'mais_1_ano', label: 'Mais de 1 ano' },
] as const;

// Chronic conditions list
export const CHRONIC_CONDITIONS = [
  'Diabetes',
  'Hipertensão',
  'Doenças cardíacas',
  'Asma',
  'Enxaqueca',
  'Fibromialgia',
  'Hipertireoidismo',
  'Hipotireoidismo',
  'Artrite',
  'Outros',
] as const;

// Appointment types
export const APPOINTMENT_TYPES = [
  { value: 'online', label: 'Online (Videoconferência)' },
  { value: 'presencial', label: 'Presencial' },
] as const;

// Appointment status
export const APPOINTMENT_STATUS = [
  { value: 'agendada', label: 'Agendada', color: 'bg-blue-100 text-blue-800' },
  { value: 'confirmada', label: 'Confirmada', color: 'bg-green-100 text-green-800' },
  { value: 'realizada', label: 'Realizada', color: 'bg-gray-100 text-gray-800' },
  { value: 'cancelada', label: 'Cancelada', color: 'bg-red-100 text-red-800' },
  { value: 'nao_compareceu', label: 'Não compareceu', color: 'bg-orange-100 text-orange-800' },
] as const;

// Anamnese status
export const ANAMNESE_STATUS = [
  { value: 'em_andamento', label: 'Em andamento', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'concluida', label: 'Concluída', color: 'bg-green-100 text-green-800' },
  { value: 'revisada', label: 'Revisada', color: 'bg-blue-100 text-blue-800' },
] as const;

// Mock admin user for development
export const MOCK_ADMIN_USER = {
  id: 'admin-1',
  email: 'admin@psicologa.com',
  name: 'Dra. Carolina Mendes',
  role: 'admin' as const,
  password: 'admin123', // In production, this would be hashed
};

// Anamnese form steps
export const ANAMNESE_STEPS = [
  { step: 1, title: 'Dados Pessoais', description: 'Informações básicas' },
  { step: 2, title: 'Queixa Principal', description: 'Motivo da consulta' },
  { step: 3, title: 'Histórico de Saúde', description: 'Condições médicas' },
  { step: 4, title: 'Histórico Familiar', description: 'Relacionamentos familiares' },
  { step: 5, title: 'Histórico Social', description: 'Vida pessoal e social' },
  { step: 6, title: 'Avaliação Adicional', description: 'Aspectos emocionais' },
] as const;
