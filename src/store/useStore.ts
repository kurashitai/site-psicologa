import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Patient, Anamnese, Appointment } from '@/types'

// ============================================
// AUTH STORE
// ============================================

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => set({
        user,
        isAuthenticated: !!user,
        isLoading: false
      }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: () => set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      }),
      updateProfile: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
)

// ============================================
// ANAMNESE STORE
// ============================================

interface AnamneseStore {
  currentStep: number
  formData: Partial<Anamnese>
  isSubmitting: boolean

  // Actions
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateFormData: (data: Partial<Anamnese>) => void
  setSubmitting: (submitting: boolean) => void
  reset: () => void
}

export const useAnamneseStore = create<AnamneseStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: {},
      isSubmitting: false,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 6) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      setSubmitting: (submitting) => set({ isSubmitting: submitting }),
      reset: () => set({ currentStep: 1, formData: {}, isSubmitting: false }),
    }),
    {
      name: 'anamnese-storage',
    }
  )
)

// ============================================
// UI STORE
// ============================================

interface UIStore {
  // Modais
  isLoginModalOpen: boolean
  isRegisterModalOpen: boolean
  isAnamneseModalOpen: boolean
  isAppointmentModalOpen: boolean
  isProfileModalOpen: boolean
  isConfigModalOpen: boolean
  isNotificationPanelOpen: boolean

  // Loading states
  isPageLoading: boolean

  // Actions
  setLoginModalOpen: (open: boolean) => void
  setRegisterModalOpen: (open: boolean) => void
  setAnamneseModalOpen: (open: boolean) => void
  setAppointmentModalOpen: (open: boolean) => void
  setProfileModalOpen: (open: boolean) => void
  setConfigModalOpen: (open: boolean) => void
  setNotificationPanelOpen: (open: boolean) => void
  setPageLoading: (loading: boolean) => void
  closeAllModals: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isAnamneseModalOpen: false,
  isAppointmentModalOpen: false,
  isProfileModalOpen: false,
  isConfigModalOpen: false,
  isNotificationPanelOpen: false,
  isPageLoading: false,

  setLoginModalOpen: (open) => set({ isLoginModalOpen: open }),
  setRegisterModalOpen: (open) => set({ isRegisterModalOpen: open }),
  setAnamneseModalOpen: (open) => set({ isAnamneseModalOpen: open }),
  setAppointmentModalOpen: (open) => set({ isAppointmentModalOpen: open }),
  setProfileModalOpen: (open) => set({ isProfileModalOpen: open }),
  setConfigModalOpen: (open) => set({ isConfigModalOpen: open }),
  setNotificationPanelOpen: (open) => set({ isNotificationPanelOpen: open }),
  setPageLoading: (loading) => set({ isPageLoading: loading }),
  closeAllModals: () => set({
    isLoginModalOpen: false,
    isRegisterModalOpen: false,
    isAnamneseModalOpen: false,
    isAppointmentModalOpen: false,
    isProfileModalOpen: false,
    isConfigModalOpen: false,
    isNotificationPanelOpen: false,
  }),
}))

// ============================================
// NOTIFICATION STORE
// ============================================

export interface Notification {
  id: string
  type: 'new_patient' | 'new_anamnese' | 'course_sale' | 'appointment_cancelled' | 'appointment_confirmed'
  title: string
  message: string
  timestamp: Date
  read: boolean
  data?: Record<string, unknown>
}

interface NotificationStore {
  notifications: Notification[]

  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAll: () => void
  getUnreadCount: () => number
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [
    {
      id: '1',
      type: 'new_patient',
      title: 'Novo Paciente',
      message: 'Maria Silva iniciou o cadastro no sistema',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
    },
    {
      id: '2',
      type: 'new_anamnese',
      title: 'Anamnese Recebida',
      message: 'João Santos enviou sua anamnese para revisão',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false,
    },
    {
      id: '3',
      type: 'course_sale',
      title: 'Curso Vendido',
      message: 'Curso de Autoconhecimento foi adquirido',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
    },
  ],

  addNotification: (notification) => set((state) => ({
    notifications: [
      {
        ...notification,
        id: `notif-${Date.now()}`,
        timestamp: new Date(),
        read: false,
      },
      ...state.notifications,
    ],
  })),

  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ),
  })),

  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true })),
  })),

  deleteNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id),
  })),

  clearAll: () => set({ notifications: [] }),

  getUnreadCount: () => get().notifications.filter((n) => !n.read).length,
}))

// ============================================
// INCOMPLETE REGISTRATIONS STORE
// ============================================

export interface IncompleteRegistration {
  id: string
  email: string
  phone?: string
  name?: string
  step: number
  totalSteps: number
  startedAt: Date
  lastActivityAt: Date
  formData: Record<string, unknown>
}

interface IncompleteRegistrationStore {
  registrations: IncompleteRegistration[]

  // Actions
  addRegistration: (registration: Omit<IncompleteRegistration, 'id' | 'startedAt' | 'lastActivityAt'>) => void
  updateRegistration: (id: string, data: Partial<IncompleteRegistration>) => void
  removeRegistration: (id: string) => void
  getByEmail: (email: string) => IncompleteRegistration | undefined
}

export const useIncompleteRegistrationStore = create<IncompleteRegistrationStore>((set, get) => ({
  registrations: [
    {
      id: 'inc-1',
      email: 'ana.pereira@email.com',
      phone: '(11) 98888-7777',
      name: 'Ana Pereira',
      step: 3,
      totalSteps: 6,
      startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      lastActivityAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      formData: { name: 'Ana Pereira', email: 'ana.pereira@email.com' },
    },
    {
      id: 'inc-2',
      email: 'carlos.santos@email.com',
      name: 'Carlos Santos',
      step: 1,
      totalSteps: 6,
      startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      lastActivityAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
      formData: { name: 'Carlos Santos', email: 'carlos.santos@email.com' },
    },
  ],

  addRegistration: (registration) => set((state) => ({
    registrations: [
      {
        ...registration,
        id: `inc-${Date.now()}`,
        startedAt: new Date(),
        lastActivityAt: new Date(),
      },
      ...state.registrations,
    ],
  })),

  updateRegistration: (id, data) => set((state) => ({
    registrations: state.registrations.map((r) =>
      r.id === id ? { ...r, ...data, lastActivityAt: new Date() } : r
    ),
  })),

  removeRegistration: (id) => set((state) => ({
    registrations: state.registrations.filter((r) => r.id !== id),
  })),

  getByEmail: (email) => get().registrations.find((r) => r.email === email),
}))

// ============================================
// ANALYTICS STORE
// ============================================

export interface PatientAnalytics {
  genderDistribution: { label: string; value: number; percentage: number }[]
  ageDistribution: { label: string; value: number; percentage: number }[]
  topReasons: { reason: string; count: number; percentage: number }[]
  monthlyPatients: { month: string; newPatients: number; returningPatients: number }[]
  appointmentTypes: { type: string; count: number; percentage: number }[]
  averageSessionsPerPatient: number
  retentionRate: number
}

interface AnalyticsStore {
  analytics: PatientAnalytics

  // Actions
  updateAnalytics: (data: Partial<PatientAnalytics>) => void
}

export const useAnalyticsStore = create<AnalyticsStore>(() => ({
  analytics: {
    genderDistribution: [
      { label: 'Feminino', value: 35, percentage: 70 },
      { label: 'Masculino', value: 14, percentage: 28 },
      { label: 'Outro', value: 1, percentage: 2 },
    ],
    ageDistribution: [
      { label: '18-25', value: 8, percentage: 16 },
      { label: '26-35', value: 18, percentage: 36 },
      { label: '36-45', value: 15, percentage: 30 },
      { label: '46-55', value: 7, percentage: 14 },
      { label: '56+', value: 2, percentage: 4 },
    ],
    topReasons: [
      { reason: 'Ansiedade', count: 22, percentage: 44 },
      { reason: 'Depressão', count: 15, percentage: 30 },
      { reason: 'Problemas relacionais', count: 8, percentage: 16 },
      { reason: 'Autoconhecimento', count: 3, percentage: 6 },
      { reason: 'Luto', count: 2, percentage: 4 },
    ],
    monthlyPatients: [
      { month: 'Jan', newPatients: 4, returningPatients: 8 },
      { month: 'Fev', newPatients: 5, returningPatients: 10 },
      { month: 'Mar', newPatients: 3, returningPatients: 11 },
      { month: 'Abr', newPatients: 6, returningPatients: 12 },
      { month: 'Mai', newPatients: 4, returningPatients: 13 },
      { month: 'Jun', newPatients: 5, returningPatients: 14 },
    ],
    appointmentTypes: [
      { type: 'Online', count: 35, percentage: 70 },
      { type: 'Presencial', count: 15, percentage: 30 },
    ],
    averageSessionsPerPatient: 8.5,
    retentionRate: 78,
  },

  updateAnalytics: () => {
    // Would recalculate from actual data
  },
}))

// ============================================
// MOCK DATA STORE (para desenvolvimento)
// ============================================

interface MockDataStore {
  patients: Patient[]
  anamneses: Anamnese[]
  appointments: Appointment[]
  stats: {
    totalPatients: number
    activePatients: number
    totalAppointments: number
    monthlyAppointments: number
    monthlyRevenue: number
    pendingAnamneses: number
  }
  monthlyDetails: {
    month: string
    year: number
    patients: { id: string; name: string; sessions: number; revenue: number }[]
    totalRevenue: number
    totalSessions: number
  }[]

  // Actions
  setPatients: (patients: Patient[]) => void
  addPatient: (patient: Patient) => void
  updatePatient: (id: string, data: Partial<Patient>) => void

  setAnamneses: (anamneses: Anamnese[]) => void
  addAnamnese: (anamnese: Anamnese) => void
  updateAnamnese: (id: string, data: Partial<Anamnese>) => void

  setAppointments: (appointments: Appointment[]) => void
  addAppointment: (appointment: Appointment) => void
  updateAppointment: (id: string, data: Partial<Appointment>) => void
}

// Dados mockados iniciais
const mockPatients: Patient[] = [
  {
    id: '1',
    profileId: '1',
    dateOfBirth: new Date('1990-05-15'),
    gender: 'feminino',
    maritalStatus: 'solteiro',
    occupation: 'Advogada',
    educationLevel: 'pos_graduacao',
    addressCity: 'São Paulo',
    addressState: 'SP',
    emergencyContactName: 'Maria Santos',
    emergencyContactPhone: '(11) 98765-4321',
    emergencyContactRelationship: 'Mãe',
    status: 'active',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10'),
  },
  {
    id: '2',
    profileId: '2',
    dateOfBirth: new Date('1985-08-22'),
    gender: 'masculino',
    maritalStatus: 'casado',
    occupation: 'Engenheiro',
    educationLevel: 'mestrado',
    addressCity: 'São Paulo',
    addressState: 'SP',
    emergencyContactName: 'Ana Silva',
    emergencyContactPhone: '(11) 91234-5678',
    emergencyContactRelationship: 'Esposa',
    status: 'active',
    createdAt: new Date('2026-02-15'),
    updatedAt: new Date('2026-02-15'),
  },
  {
    id: '3',
    profileId: '3',
    dateOfBirth: new Date('1995-03-10'),
    gender: 'feminino',
    maritalStatus: 'solteiro',
    occupation: 'Designer',
    educationLevel: 'superior_completo',
    addressCity: 'São Paulo',
    addressState: 'SP',
    status: 'active',
    createdAt: new Date('2026-03-01'),
    updatedAt: new Date('2026-03-01'),
  },
]

const mockAnamneses: Anamnese[] = [
  {
    id: '1',
    patientId: '1',
    chiefComplaint: 'Ansiedade excessiva no trabalho e dificuldade em relaxar',
    symptomDuration: '6 meses',
    symptomIntensity: 8,
    previousTreatment: true,
    previousTreatmentDetails: 'Já fiz terapia há 2 anos',
    expectations: 'Aprender a lidar melhor com o estresse e ansiedade',
    currentDiseases: 'Nenhuma',
    currentMedications: 'Nenhum',
    sleepQuality: 'ruim',
    sleepHours: 5,
    appetite: 'regular',
    energyLevel: 4,
    concentrationLevel: 5,
    status: 'approved',
    consentGiven: true,
    consentDate: new Date('2026-01-10'),
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10'),
  },
  {
    id: '2',
    patientId: '2',
    chiefComplaint: 'Dificuldades no relacionamento conjugal e comunicação',
    symptomDuration: '1 ano',
    symptomIntensity: 7,
    previousTreatment: false,
    expectations: 'Melhorar a comunicação com minha esposa',
    sleepQuality: 'regular',
    sleepHours: 6,
    appetite: 'bom',
    energyLevel: 6,
    concentrationLevel: 7,
    status: 'pending_review',
    consentGiven: true,
    consentDate: new Date('2026-02-15'),
    createdAt: new Date('2026-02-15'),
    updatedAt: new Date('2026-02-15'),
  },
]

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    scheduledDate: new Date('2026-12-20T10:00:00'),
    durationMinutes: 50,
    type: 'online',
    status: 'confirmed',
    price: 200,
    paymentStatus: 'paid',
    paymentMethod: 'PIX',
    createdAt: new Date('2026-12-15'),
    updatedAt: new Date('2026-12-15'),
  },
  {
    id: '2',
    patientId: '2',
    scheduledDate: new Date('2026-12-20T14:00:00'),
    durationMinutes: 50,
    type: 'presencial',
    status: 'scheduled',
    price: 250,
    paymentStatus: 'pending',
    createdAt: new Date('2026-12-16'),
    updatedAt: new Date('2026-12-16'),
  },
  {
    id: '3',
    patientId: '1',
    scheduledDate: new Date('2026-12-27T10:00:00'),
    durationMinutes: 50,
    type: 'online',
    status: 'scheduled',
    price: 200,
    paymentStatus: 'pending',
    createdAt: new Date('2026-12-17'),
    updatedAt: new Date('2026-12-17'),
  },
]

const mockMonthlyDetails = [
  {
    month: 'Janeiro',
    year: 2026,
    patients: [
      { id: '1', name: 'Maria Silva', sessions: 4, revenue: 800 },
      { id: '2', name: 'João Santos', sessions: 3, revenue: 750 },
      { id: '3', name: 'Ana Costa', sessions: 2, revenue: 400 },
      { id: '4', name: 'Pedro Lima', sessions: 3, revenue: 600 },
    ],
    totalRevenue: 2800,
    totalSessions: 12,
  },
  {
    month: 'Fevereiro',
    year: 2026,
    patients: [
      { id: '1', name: 'Maria Silva', sessions: 5, revenue: 1000 },
      { id: '3', name: 'Ana Costa', sessions: 4, revenue: 800 },
      { id: '5', name: 'Carla Souza', sessions: 3, revenue: 600 },
      { id: '6', name: 'Lucas Oliveira', sessions: 2, revenue: 400 },
    ],
    totalRevenue: 3200,
    totalSessions: 14,
  },
  {
    month: 'Março',
    year: 2026,
    patients: [
      { id: '2', name: 'João Santos', sessions: 4, revenue: 1000 },
      { id: '4', name: 'Pedro Lima', sessions: 3, revenue: 600 },
      { id: '7', name: 'Fernanda Reis', sessions: 2, revenue: 400 },
    ],
    totalRevenue: 2600,
    totalSessions: 11,
  },
  {
    month: 'Abril',
    year: 2026,
    patients: [
      { id: '1', name: 'Maria Silva', sessions: 5, revenue: 1000 },
      { id: '3', name: 'Ana Costa', sessions: 4, revenue: 800 },
      { id: '5', name: 'Carla Souza', sessions: 4, revenue: 800 },
      { id: '8', name: 'Ricardo Mendes', sessions: 3, revenue: 600 },
      { id: '9', name: 'Juliana Alves', sessions: 2, revenue: 400 },
    ],
    totalRevenue: 3800,
    totalSessions: 18,
  },
  {
    month: 'Maio',
    year: 2026,
    patients: [
      { id: '2', name: 'João Santos', sessions: 4, revenue: 1000 },
      { id: '6', name: 'Lucas Oliveira', sessions: 3, revenue: 600 },
      { id: '7', name: 'Fernanda Reis', sessions: 3, revenue: 600 },
      { id: '10', name: 'Mariana Costa', sessions: 3, revenue: 600 },
    ],
    totalRevenue: 3100,
    totalSessions: 13,
  },
  {
    month: 'Junho',
    year: 2026,
    patients: [
      { id: '1', name: 'Maria Silva', sessions: 6, revenue: 1200 },
      { id: '3', name: 'Ana Costa', sessions: 5, revenue: 1000 },
      { id: '4', name: 'Pedro Lima', sessions: 4, revenue: 800 },
      { id: '8', name: 'Ricardo Mendes', sessions: 3, revenue: 600 },
      { id: '11', name: 'Bruno Ferreira', sessions: 2, revenue: 400 },
    ],
    totalRevenue: 4200,
    totalSessions: 20,
  },
  {
    month: 'Julho',
    year: 2026,
    patients: [
      { id: '5', name: 'Carla Souza', sessions: 4, revenue: 800 },
      { id: '9', name: 'Juliana Alves', sessions: 4, revenue: 800 },
      { id: '10', name: 'Mariana Costa', sessions: 3, revenue: 600 },
      { id: '12', name: 'Thiago Ribeiro', sessions: 4, revenue: 800 },
    ],
    totalRevenue: 3600,
    totalSessions: 15,
  },
  {
    month: 'Agosto',
    year: 2026,
    patients: [
      { id: '1', name: 'Maria Silva', sessions: 4, revenue: 800 },
      { id: '2', name: 'João Santos', sessions: 4, revenue: 1000 },
      { id: '6', name: 'Lucas Oliveira', sessions: 3, revenue: 600 },
      { id: '7', name: 'Fernanda Reis', sessions: 3, revenue: 600 },
      { id: '13', name: 'Patricia Lima', sessions: 2, revenue: 400 },
    ],
    totalRevenue: 3400,
    totalSessions: 16,
  },
  {
    month: 'Setembro',
    year: 2026,
    patients: [
      { id: '3', name: 'Ana Costa', sessions: 5, revenue: 1000 },
      { id: '4', name: 'Pedro Lima', sessions: 4, revenue: 800 },
      { id: '8', name: 'Ricardo Mendes', sessions: 4, revenue: 800 },
      { id: '11', name: 'Bruno Ferreira', sessions: 3, revenue: 600 },
      { id: '14', name: 'Daniela Martins', sessions: 4, revenue: 800 },
    ],
    totalRevenue: 4000,
    totalSessions: 20,
  },
  {
    month: 'Outubro',
    year: 2026,
    patients: [
      { id: '5', name: 'Carla Souza', sessions: 5, revenue: 1000 },
      { id: '9', name: 'Juliana Alves', sessions: 4, revenue: 800 },
      { id: '10', name: 'Mariana Costa', sessions: 4, revenue: 800 },
      { id: '12', name: 'Thiago Ribeiro', sessions: 3, revenue: 600 },
      { id: '15', name: 'Eduardo Santos', sessions: 2, revenue: 400 },
    ],
    totalRevenue: 3800,
    totalSessions: 18,
  },
  {
    month: 'Novembro',
    year: 2026,
    patients: [
      { id: '1', name: 'Maria Silva', sessions: 4, revenue: 800 },
      { id: '6', name: 'Lucas Oliveira', sessions: 4, revenue: 800 },
      { id: '7', name: 'Fernanda Reis', sessions: 3, revenue: 600 },
      { id: '13', name: 'Patricia Lima', sessions: 3, revenue: 600 },
      { id: '16', name: 'Camila Rocha', sessions: 3, revenue: 600 },
    ],
    totalRevenue: 3500,
    totalSessions: 17,
  },
  {
    month: 'Dezembro',
    year: 2026,
    patients: [
      { id: '2', name: 'João Santos', sessions: 3, revenue: 750 },
      { id: '3', name: 'Ana Costa', sessions: 3, revenue: 600 },
      { id: '4', name: 'Pedro Lima', sessions: 2, revenue: 400 },
      { id: '8', name: 'Ricardo Mendes', sessions: 2, revenue: 400 },
    ],
    totalRevenue: 2600,
    totalSessions: 10,
  },
]

const mockStats = {
  totalPatients: 3,
  activePatients: 3,
  totalAppointments: 45,
  monthlyAppointments: 12,
  monthlyRevenue: 2600,
  pendingAnamneses: 1,
}

export const useMockDataStore = create<MockDataStore>((set) => ({
  patients: mockPatients,
  anamneses: mockAnamneses,
  appointments: mockAppointments,
  stats: mockStats,
  monthlyDetails: mockMonthlyDetails,

  setPatients: (patients) => set({ patients }),
  addPatient: (patient) => set((state) => ({
    patients: [...state.patients, patient]
  })),
  updatePatient: (id, data) => set((state) => ({
    patients: state.patients.map((p) =>
      p.id === id ? { ...p, ...data } : p
    ),
  })),

  setAnamneses: (anamneses) => set({ anamneses }),
  addAnamnese: (anamnese) => set((state) => ({
    anamneses: [...state.anamneses, anamnese]
  })),
  updateAnamnese: (id, data) => set((state) => ({
    anamneses: state.anamneses.map((a) =>
      a.id === id ? { ...a, ...data } : a
    ),
  })),

  setAppointments: (appointments) => set({ appointments }),
  addAppointment: (appointment) => set((state) => ({
    appointments: [...state.appointments, appointment]
  })),
  updateAppointment: (id, data) => set((state) => ({
    appointments: state.appointments.map((a) =>
      a.id === id ? { ...a, ...data } : a
    ),
  })),
}))
