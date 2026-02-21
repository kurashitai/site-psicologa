// Tipos TypeScript para a plataforma

// ============================================
// USUÁRIOS E AUTENTICAÇÃO
// ============================================

export type UserRole = 'admin' | 'patient'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  avatarUrl?: string
  isActive: boolean
  consentTerms: boolean
  consentPrivacy: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// ============================================
// PACIENTES
// ============================================

export type Gender = 'masculino' | 'feminino' | 'outro' | 'prefiro_nao_informar'
export type MaritalStatus = 'solteiro' | 'casado' | 'divorciado' | 'viuvo' | 'uniao_estavel'
export type EducationLevel = 'fundamental' | 'medio' | 'superior_incompleto' | 'superior_completo' | 'pos_graduacao' | 'mestrado' | 'doutorado'
export type PatientStatus = 'active' | 'inactive' | 'waiting_list'

export interface Patient {
  id: string
  profileId: string
  dateOfBirth?: Date
  gender?: Gender
  cpf?: string // Criptografado
  rg?: string
  maritalStatus?: MaritalStatus
  occupation?: string
  educationLevel?: EducationLevel
  
  // Endereço
  addressStreet?: string
  addressNumber?: string
  addressComplement?: string
  addressNeighborhood?: string
  addressCity?: string
  addressState?: string
  addressZipcode?: string
  
  // Contato de emergência
  emergencyContactName?: string
  emergencyContactPhone?: string
  emergencyContactRelationship?: string
  
  // Indicação
  referredBy?: string
  
  // Status
  status: PatientStatus
  
  createdAt: Date
  updatedAt: Date
}

// ============================================
// ANAMNESE
// ============================================

export type SleepQuality = 'boa' | 'regular' | 'ruim' | 'muito_ruim'
export type Appetite = 'bom' | 'regular' | 'ruim' | 'variavel'
export type AnamneseStatus = 'draft' | 'pending_review' | 'reviewed' | 'approved'

export interface SubstanceUse {
  alcohol?: {
    uses: boolean
    frequency?: string
  }
  tobacco?: {
    uses: boolean
    frequency?: string
  }
  drugs?: {
    uses: boolean
    types?: string[]
    frequency?: string
  }
}

export interface FamilyMember {
  relationship: string
  name: string
  age: number
  notes?: string
}

export interface Anamnese {
  id: string
  patientId: string
  
  // Etapa 2: Queixa Principal
  chiefComplaint?: string
  symptomDuration?: string
  symptomIntensity?: number // 1-10
  previousTreatment?: boolean
  previousTreatmentDetails?: string
  expectations?: string
  
  // Etapa 3: Histórico de Saúde
  currentDiseases?: string
  currentMedications?: string
  allergies?: string
  previousHospitalizations?: string
  substanceUse?: SubstanceUse
  familyHistoryMentalIllness?: string
  
  // Etapa 4: Histórico Familiar
  familyStructure?: FamilyMember[]
  familyRelationship?: string
  familyConflicts?: string
  familySupport?: boolean
  
  // Etapa 5: Histórico Social/Pessoal
  childhoodDescription?: string
  schoolHistory?: string
  workHistory?: string
  currentWorkSituation?: string
  relationshipStatus?: string
  relationshipQuality?: string
  childrenCount?: number
  routineDescription?: string
  hobbies?: string
  supportNetwork?: string
  
  // Etapa 6: Avaliação Adicional
  sleepQuality?: SleepQuality
  sleepHours?: number
  appetite?: Appetite
  energyLevel?: number // 1-10
  concentrationLevel?: number // 1-10
  moodDescription?: string
  
  // Observações
  additionalNotes?: string
  adminNotes?: string // Notas privadas da psicóloga
  status: AnamneseStatus
  
  // LGPD
  consentGiven: boolean
  consentDate: Date
  
  createdAt: Date
  updatedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
}

// ============================================
// CONSULTAS
// ============================================

export type AppointmentType = 'online' | 'presencial'
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
export type PaymentStatus = 'pending' | 'paid' | 'refunded'

export interface Appointment {
  id: string
  patientId: string
  patient?: Patient
  
  // Dados da consulta
  scheduledDate: Date
  durationMinutes: number
  type: AppointmentType
  location?: string // Link da sala ou endereço
  
  // Status
  status: AppointmentStatus
  
  // Financeiro
  price: number
  paymentStatus: PaymentStatus
  paymentMethod?: string
  
  // Notas
  sessionNotes?: string // Criptografado
  patientFeedback?: string
  
  createdAt: Date
  updatedAt: Date
}

// ============================================
// FORMULÁRIOS
// ============================================

// Dados do formulário de anamnese (multi-step)
export interface AnamneseFormData {
  // Step 1: Dados Pessoais
  dateOfBirth: string
  gender: Gender
  cpf: string
  rg: string
  maritalStatus: MaritalStatus
  occupation: string
  educationLevel: EducationLevel
  
  // Endereço
  addressStreet: string
  addressNumber: string
  addressComplement: string
  addressNeighborhood: string
  addressCity: string
  addressState: string
  addressZipcode: string
  
  // Contato emergência
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelationship: string
  
  // Step 2: Queixa Principal
  chiefComplaint: string
  symptomDuration: string
  symptomIntensity: number
  previousTreatment: boolean
  previousTreatmentDetails: string
  expectations: string
  
  // Step 3: Histórico de Saúde
  currentDiseases: string
  currentMedications: string
  allergies: string
  previousHospitalizations: string
  alcoholUse: boolean
  alcoholFrequency: string
  tobaccoUse: boolean
  tobaccoFrequency: string
  drugsUse: boolean
  drugsTypes: string[]
  drugsFrequency: string
  familyHistoryMentalIllness: string
  
  // Step 4: Histórico Familiar
  familyRelationship: string
  familyConflicts: string
  familySupport: boolean
  
  // Step 5: Histórico Social
  childhoodDescription: string
  schoolHistory: string
  workHistory: string
  currentWorkSituation: string
  relationshipStatus: string
  relationshipQuality: string
  childrenCount: number
  routineDescription: string
  hobbies: string
  supportNetwork: string
  
  // Step 6: Avaliação
  sleepQuality: SleepQuality
  sleepHours: number
  appetite: Appetite
  energyLevel: number
  concentrationLevel: number
  moodDescription: string
  
  // Observações e Consentimento
  additionalNotes: string
  consentGiven: boolean
}

// ============================================
// DASHBOARD
// ============================================

export interface DashboardStats {
  totalPatients: number
  activePatients: number
  totalAppointments: number
  monthlyAppointments: number
  monthlyRevenue: number
  pendingAnamneses: number
}

export interface RevenueData {
  month: string
  revenue: number
  appointments: number
}

// ============================================
// API RESPONSES
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
