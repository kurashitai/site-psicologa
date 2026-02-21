// Produtos mockados - Arquitetura modular para fácil adição
// Futuramente, estes dados virão de um CMS ou banco de dados

export interface Product {
  id: string
  name: string
  slug: string
  shortDescription: string
  description: string
  type: 'course' | 'ebook' | 'audio' | 'mentorship'
  format: 'online' | 'download' | 'hybrid'
  price: number
  promotionalPrice?: number
  thumbnailUrl: string
  checkoutUrl: string // Link Hotmart/Kiwify
  duration?: string
  lessonsCount?: number
  isFeatured: boolean
  isActive: boolean
  features: string[]
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
}

export const productCategories: ProductCategory[] = [
  {
    id: 'courses',
    name: 'Cursos',
    slug: 'cursos',
    description: 'Cursos completos para desenvolvimento pessoal',
    icon: 'GraduationCap',
  },
  {
    id: 'ebooks',
    name: 'E-books',
    slug: 'ebooks',
    description: 'Livros digitais para autoconhecimento',
    icon: 'BookOpen',
  },
  {
    id: 'audios',
    name: 'Áudios de Hipnose',
    slug: 'audios',
    description: 'Sessões de hipnose e meditação guiada',
    icon: 'Headphones',
  },
  {
    id: 'mentorship',
    name: 'Mentorias',
    slug: 'mentorship',
    description: 'Acompanhamento personalizado',
    icon: 'Users',
  },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Curso de Autoconhecimento',
    slug: 'curso-autoconhecimento',
    shortDescription: 'Descubra quem você realmente é e transforme sua vida',
    description: `Um curso completo de 8 semanas para você desenvolver autoconhecimento profundo e transformar padrões que não te servem mais.

Inclui:
- 16 aulas gravadas
- Exercícios práticos
- Material de apoio
- Certificado de conclusão
- Acesso vitalício`,
    type: 'course',
    format: 'online',
    price: 497,
    promotionalPrice: 297,
    thumbnailUrl: '/courses/curso-autoconhecimento.png',
    checkoutUrl: '#curso-autoconhecimento', // Mock - substituir pelo link da Hotmart/Kiwify
    duration: '8 semanas',
    lessonsCount: 16,
    isFeatured: true,
    isActive: true,
    features: [
      '16 aulas gravadas em HD',
      'Exercícios práticos para cada módulo',
      'Material de apoio em PDF',
      'Certificado de conclusão',
      'Acesso vitalício',
      'Suporte por 30 dias',
    ],
  },
  {
    id: '2',
    name: 'E-book: Transformando Ansiedade',
    slug: 'ebook-ansiedade',
    shortDescription: 'Guia prático para lidar com a ansiedade no dia a dia',
    description: `Um guia completo com técnicas comprovadas para gerenciar a ansiedade e recuperar sua qualidade de vida.

O que você vai aprender:
- Entender as raízes da ansiedade
- Técnicas de respiração e relaxamento
- Como reprogramar pensamentos ansiosos
- Estratégias para situações específicas`,
    type: 'ebook',
    format: 'download',
    price: 47,
    thumbnailUrl: '/courses/ebook-ansiedade.png',
    checkoutUrl: '#ebook-ansiedade',
    isFeatured: true,
    isActive: true,
    features: [
      '80 páginas de conteúdo',
      'Técnicas baseadas em evidências',
      'Exercícios práticos',
      'Bônus: Checklist diário anti-ansiedade',
    ],
  },
  {
    id: '3',
    name: 'Áudio: Meditação Guiada para Sono',
    slug: 'audio-meditacao-sono',
    shortDescription: 'Relaxamento profundo para noites tranquilas',
    description: `Sessão de meditação guiada especialmente desenvolvida para ajudar você a relaxar e ter uma noite de sono reparadora.

Duração: 30 minutos
Indicado para: Insônia leve, dificuldade para relaxar antes de dormir`,
    type: 'audio',
    format: 'download',
    price: 29,
    thumbnailUrl: '/courses/audio-meditacao.png',
    checkoutUrl: '#audio-meditacao',
    duration: '30 minutos',
    isFeatured: false,
    isActive: true,
    features: [
      '30 minutos de áudio em alta qualidade',
      'Música relaxante de fundo',
      'Técnicas de visualização',
      'Formato MP3 compatível com todos dispositivos',
    ],
  },
  {
    id: '4',
    name: 'Programa de Mentoria Personalizada',
    slug: 'mentoria-personalizada',
    shortDescription: 'Acompanhamento individual para transformação profunda',
    description: `Programa de mentoria personalizada com encontros individuais para você alcançar seus objetivos de vida.

Inclui:
- 4 encontros mensais (online)
- Diagnóstico inicial completo
- Plano de ação personalizado
- Suporte via WhatsApp`,
    type: 'mentorship',
    format: 'online',
    price: 997,
    thumbnailUrl: '/courses/mentoria-personalizada.png',
    checkoutUrl: '#mentoria',
    duration: 'Mensal',
    isFeatured: true,
    isActive: true,
    features: [
      '4 sessões individuais por mês',
      'Diagnóstico inicial personalizado',
      'Plano de ação estruturado',
      'Suporte via WhatsApp',
      'Materiais exclusivos',
    ],
  },
  {
    id: '5',
    name: 'Áudio: Hipnose para Autoestima',
    slug: 'audio-hipnose-autoestima',
    shortDescription: 'Reprogramação mental para fortalecer sua autoestima',
    description: `Sessão de hipnose terapêutica para trabalhar questões de autoestima e autoconfiança no nível subconsciente.

Duração: 25 minutos
Recomendação: Usar fones de ouvido em ambiente tranquilo`,
    type: 'audio',
    format: 'download',
    price: 39,
    thumbnailUrl: '/courses/audio-hipnose.png',
    checkoutUrl: '#audio-hipnose',
    duration: '25 minutos',
    isFeatured: false,
    isActive: true,
    features: [
      '25 minutos de hipnose terapêutica',
      'Técnicas de PNL integradas',
      'Sugestões positivas personalizadas',
      'Efeito cumulativo com uso regular',
    ],
  },
  {
    id: '6',
    name: 'Curso: Relacionamentos Saudáveis',
    slug: 'curso-relacionamentos',
    shortDescription: 'Construa relacionamentos mais felizes e autênticos',
    description: `Um curso prático para transformar a forma como você se relaciona consigo mesmo e com os outros.

Módulos:
1. Autoconhecimento e autoestima
2. Comunicação assertiva
3. Limites saudáveis
4. Resolução de conflitos
5. Intimidade e vulnerabilidade`,
    type: 'course',
    format: 'online',
    price: 397,
    promotionalPrice: 247,
    thumbnailUrl: '/courses/curso-relacionamentos.png',
    checkoutUrl: '#curso-relacionamentos',
    duration: '6 semanas',
    lessonsCount: 12,
    isFeatured: false,
    isActive: true,
    features: [
      '12 aulas gravadas',
      'Exercícios práticos em dupla',
      'Bônus: Guia de Comunicação Não-Violenta',
      'Comunidade exclusiva de alunos',
      'Certificado de conclusão',
    ],
  },
]

// Função auxiliar para buscar produtos por tipo
export function getProductsByType(type: Product['type']): Product[] {
  return products.filter((p) => p.type === type && p.isActive)
}

// Função auxiliar para buscar produtos em destaque
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured && p.isActive)
}

// Função auxiliar para buscar produto por slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug && p.isActive)
}
