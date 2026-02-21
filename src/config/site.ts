// Configurações do site da psicóloga
export const siteConfig = {
  name: 'Dra. Carolina Mendes',
  title: 'Dra. Carolina Mendes | Psicóloga Clínica',
  description: 'Psicóloga Clínica especializada em Terapia Cognitivo-Comportamental. Atendimento online e presencial. Agende sua consulta.',
  url: 'https://dracarolina.com.br',
  
  // Informações profissionais
  professional: {
    name: 'Dra. Carolina Mendes',
    crp: 'CRP 00/00000',
    specialty: 'Psicóloga Clínica',
    approaches: ['Terapia Cognitivo-Comportamental', 'Terapia Humanista', 'Mindfulness'],
    experience: 'Mais de 10 anos de experiência',
    bio: `Psicóloga formada pela Universidade de São Paulo (USP) com especialização em Terapia Cognitivo-Comportamental pelo Instituto de Psicologia Cognitiva. 

Com mais de 10 anos de experiência clínica, dedico-me a ajudar pessoas a superarem seus desafios emocionais e desenvolverem todo o seu potencial.

Minha abordagem é baseada na escuta acolhedora, no respeito à individualidade de cada paciente e na aplicação de técnicas comprovadas cientificamente. Acredito que cada pessoa possui os recursos necessários para sua transformação, e meu papel é auxiliar nesse processo de autoconhecimento e crescimento.`,
    photoUrl: '/psychologist-portrait.png',
    logoUrl: '/logo-psicologa.png',
  },

  // Contatos
  contact: {
    phone: '(11) 99999-9999',
    whatsapp: '5511999999999',
    email: 'contato@dracarolina.com.br',
    address: 'São Paulo, SP',
  },

  // Redes sociais
  social: {
    instagram: 'https://instagram.com/dracarolina.psi',
    linkedin: 'https://linkedin.com/in/dracarolina',
    youtube: 'https://youtube.com/@dracarolina',
  },

  // Configurações do WhatsApp
  whatsapp: {
    defaultMessage: 'Olá, Dra. Carolina! Gostaria de agendar uma consulta.',
  },

  // Horários de atendimento
  schedule: {
    online: 'Segunda a Sexta: 8h às 18h',
    presencial: 'Segunda, Quarta e Sexta: 9h às 16h',
  },

  // Valores (mock)
  pricing: {
    sessionOnline: 200,
    sessionPresencial: 250,
  },
}

// Cores do tema - tons pastéis e sólidos
export const themeColors = {
  primary: {
    DEFAULT: '#8B5CF6', // purple-500
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },
  accent: {
    DEFAULT: '#6366F1', // indigo-500
    light: '#818CF8',
    dark: '#4F46E5',
  },
  pastel: {
    purple: '#E9D5FF',
    blue: '#DBEAFE',
    green: '#DCFCE7',
    pink: '#FCE7F3',
    yellow: '#FEF3C7',
    cream: '#FFFBEB',
    mint: '#D1FAE5',
    lavender: '#F3E8FF',
  },
  neutral: {
    background: '#FAFAF9', // stone-50 - fundo pastel suave
    card: '#FFFFFF',
    text: '#1C1917',
    muted: '#78716C',
  },
}

export type SiteConfig = typeof siteConfig
