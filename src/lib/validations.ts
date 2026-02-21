import { z } from 'zod'

// ============================================
// SCHEMAS DE VALIDAÇÃO
// ============================================

// Validação de CPF (formato)
const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/

// Validação de telefone
const phoneRegex = /^\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$/

// ============================================
// AUTENTICAÇÃO
// ============================================

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().regex(phoneRegex, 'Telefone inválido').optional().or(z.literal('')),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
  consentTerms: z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar os termos de uso',
  }),
  consentPrivacy: z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar a política de privacidade',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não conferem',
  path: ['confirmPassword'],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>

// ============================================
// ANAMNESE - SCHEMAS POR ETAPA
// ============================================

// Etapa 1: Dados Pessoais
export const anamneseStep1Schema = z.object({
  dateOfBirth: z.string().min(1, 'Data de nascimento é obrigatória'),
  gender: z.enum(['masculino', 'feminino', 'outro', 'prefiro_nao_informar'], {
    required_error: 'Selecione o gênero',
  }),
  cpf: z.string().regex(cpfRegex, 'CPF inválido').optional().or(z.literal('')),
  rg: z.string().optional(),
  maritalStatus: z.enum(['solteiro', 'casado', 'divorciado', 'viuvo', 'uniao_estavel']).optional(),
  occupation: z.string().optional(),
  educationLevel: z.enum(['fundamental', 'medio', 'superior_incompleto', 'superior_completo', 'pos_graduacao', 'mestrado', 'doutorado']).optional(),
  addressStreet: z.string().optional(),
  addressNumber: z.string().optional(),
  addressComplement: z.string().optional(),
  addressNeighborhood: z.string().optional(),
  addressCity: z.string().optional(),
  addressState: z.string().max(2, 'Estado deve ter 2 caracteres').optional(),
  addressZipcode: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
})

// Etapa 2: Queixa Principal
export const anamneseStep2Schema = z.object({
  chiefComplaint: z.string().min(20, 'Descreva sua queixa com mais detalhes (mínimo 20 caracteres)'),
  symptomDuration: z.string().min(1, 'Informe há quanto tempo apresenta os sintomas'),
  symptomIntensity: z.number().min(1).max(10),
  previousTreatment: z.boolean(),
  previousTreatmentDetails: z.string().optional(),
  expectations: z.string().min(10, 'Descreva o que espera da terapia (mínimo 10 caracteres)'),
})

// Etapa 3: Histórico de Saúde
export const anamneseStep3Schema = z.object({
  currentDiseases: z.string().optional(),
  currentMedications: z.string().optional(),
  allergies: z.string().optional(),
  previousHospitalizations: z.string().optional(),
  alcoholUse: z.boolean(),
  alcoholFrequency: z.string().optional(),
  tobaccoUse: z.boolean(),
  tobaccoFrequency: z.string().optional(),
  drugsUse: z.boolean(),
  drugsTypes: z.array(z.string()).optional(),
  drugsFrequency: z.string().optional(),
  familyHistoryMentalIllness: z.string().optional(),
})

// Etapa 4: Histórico Familiar
export const anamneseStep4Schema = z.object({
  familyRelationship: z.string().optional(),
  familyConflicts: z.string().optional(),
  familySupport: z.boolean().optional(),
})

// Etapa 5: Histórico Social
export const anamneseStep5Schema = z.object({
  childhoodDescription: z.string().optional(),
  schoolHistory: z.string().optional(),
  workHistory: z.string().optional(),
  currentWorkSituation: z.string().optional(),
  relationshipStatus: z.string().optional(),
  relationshipQuality: z.string().optional(),
  childrenCount: z.number().min(0).optional(),
  routineDescription: z.string().optional(),
  hobbies: z.string().optional(),
  supportNetwork: z.string().optional(),
})

// Etapa 6: Avaliação
export const anamneseStep6Schema = z.object({
  sleepQuality: z.enum(['boa', 'regular', 'ruim', 'muito_ruim']).optional(),
  sleepHours: z.number().min(0).max(24).optional(),
  appetite: z.enum(['bom', 'regular', 'ruim', 'variavel']).optional(),
  energyLevel: z.number().min(1).max(10).optional(),
  concentrationLevel: z.number().min(1).max(10).optional(),
  moodDescription: z.string().optional(),
  additionalNotes: z.string().optional(),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: 'Você deve dar consentimento para o tratamento dos dados',
  }),
})

// Schema completo da anamnese
export const anamneseFullSchema = anamneseStep1Schema
  .merge(anamneseStep2Schema)
  .merge(anamneseStep3Schema)
  .merge(anamneseStep4Schema)
  .merge(anamneseStep5Schema)
  .merge(anamneseStep6Schema)

export type AnamneseStep1Data = z.infer<typeof anamneseStep1Schema>
export type AnamneseStep2Data = z.infer<typeof anamneseStep2Schema>
export type AnamneseStep3Data = z.infer<typeof anamneseStep3Schema>
export type AnamneseStep4Data = z.infer<typeof anamneseStep4Schema>
export type AnamneseStep5Data = z.infer<typeof anamneseStep5Schema>
export type AnamneseStep6Data = z.infer<typeof anamneseStep6Schema>
export type AnamneseFullData = z.infer<typeof anamneseFullSchema>

// ============================================
// CONSULTAS
// ============================================

export const appointmentSchema = z.object({
  patientId: z.string().min(1, 'Selecione o paciente'),
  scheduledDate: z.string().min(1, 'Selecione a data'),
  scheduledTime: z.string().min(1, 'Selecione o horário'),
  type: z.enum(['online', 'presencial']),
  durationMinutes: z.number().min(30).max(120).default(50),
  price: z.number().min(0).default(200),
  notes: z.string().optional(),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>

// ============================================
// UTILITÁRIOS
// ============================================

// Função para formatar CPF
export function formatCPF(value: string): string {
  const numbers = value.replace(/\D/g, '')
  return numbers
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .slice(0, 14)
}

// Função para formatar telefone
export function formatPhone(value: string): string {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 10) {
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 14)
  }
  return numbers
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15)
}

// Função para formatar CEP
export function formatZipcode(value: string): string {
  const numbers = value.replace(/\D/g, '')
  return numbers
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 9)
}
