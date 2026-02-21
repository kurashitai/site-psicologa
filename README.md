# Plataforma Digital - Dra. Carolina Mendes | Psicóloga Clínica

Uma plataforma completa para gestão de consultas psicológicas, desenvolvida com Next.js 15, TypeScript, Tailwind CSS e Prisma.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?style=flat-square&logo=prisma)

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Credenciais de Teste](#credenciais-de-teste)
- [Módulos do Sistema](#módulos-do-sistema)
- [API e Banco de Dados](#api-e-banco-de-dados)
- [Customização](#customização)

---

## 🎯 Visão Geral

Esta plataforma foi desenvolvida para atender às necessidades de uma psicóloga clínica, oferecendo:

- **Landing Page** profissional com animações suaves e parallax
- **Sistema de Autenticação** para pacientes e administrador
- **Formulário de Anamnese** completo em múltiplas etapas
- **Painel Administrativo** com gestão de pacientes, consultas e finanças
- **Integração com WhatsApp** para contato rápido
- **Design Responsivo** otimizado para mobile e desktop

---

## ✨ Funcionalidades

### Landing Page

- **Hero Section** com apresentação profissional e call-to-actions
- **Seção Sobre** com parallax da foto da profissional
- **Seção de Serviços** com descrição dos atendimentos
- **Seção de Cursos** com produtos digitais
- **Seção de Contato** com formulário e informações
- **Snap Scrolling** para navegação fluida entre seções
- **Animações Parallax** com Framer Motion
- **Botão flutuante do WhatsApp**

### Sistema de Autenticação

- Login com email e senha
- Cadastro de novos pacientes
- Diferenciação de roles (admin/patient)
- Persistência de sessão com Zustand
- Logout seguro

### Formulário de Anamnese (6 Etapas)

1. **Dados Pessoais** - Informações básicas e contato de emergência
2. **Queixa Principal** - Motivo da consulta e histórico de sintomas
3. **Histórico de Saúde** - Doenças, medicamentos e uso de substâncias
4. **Histórico Familiar** - Estrutura familiar e relacionamentos
5. **Histórico Social** - Infância, educação, trabalho e rotina
6. **Avaliação Adicional** - Sono, apetite, energia e humor

### Painel Administrativo

- **Dashboard** com estatísticas gerais
- **Gestão de Pacientes** - Lista, busca e detalhes
- **Visualização de Anamneses** - Aprovação e notas privadas
- **Calendário de Consultas** - Agendamento e status
- **Gráficos Financeiros** - Receita mensal e detalhamento
- **Notificações** - Alertas de novos cadastros e anamneses
- **Configurações** - Perfil e preferências

---

## 🛠 Tecnologias

### Frontend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| Next.js | 16.1 | Framework React com App Router |
| TypeScript | 5.0 | Tipagem estática |
| Tailwind CSS | 4.0 | Estilização utilitária |
| Framer Motion | 12.x | Animações e transições |
| Radix UI | - | Componentes acessíveis |
| Lucide React | - | Ícones SVG |
| Recharts | 2.x | Gráficos interativos |

### Backend & Estado

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| Prisma | 6.x | ORM para banco de dados |
| SQLite | - | Banco de dados (desenvolvimento) |
| Zustand | 5.x | Gerenciamento de estado |
| React Hook Form | 7.x | Formulários |
| Zod | 4.x | Validação de schemas |

### UI Components (shadcn/ui)

- Dialog, Sheet, Drawer para modais
- Form, Input, Select, Checkbox para formulários
- Table, Card para exibição de dados
- Calendar para agendamentos
- Chart para gráficos
- Toast para notificações

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css          # Estilos globais e scroll-snap
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal (landing + admin)
│
├── components/
│   ├── admin/               # Componentes do painel admin
│   │   ├── AdminPage.tsx    # Página principal do admin
│   │   ├── PatientList.tsx  # Lista de pacientes
│   │   ├── PatientDetailView.tsx
│   │   ├── AnamneseViewer.tsx
│   │   ├── AppointmentCalendar.tsx
│   │   ├── FinanceCharts.tsx
│   │   ├── NotificationPanel.tsx
│   │   └── ...
│   │
│   ├── landing/             # Componentes da landing page
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── CoursesSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── ParallaxDoctorImage.tsx
│   │
│   ├── auth/                # Componentes de autenticação
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   │
│   ├── anamnese/            # Formulário de anamnese
│   │   ├── AnamneseForm.tsx
│   │   ├── Step1PersonalData.tsx
│   │   ├── Step2Complaint.tsx
│   │   ├── Step3HealthHistory.tsx
│   │   ├── Step4FamilyHistory.tsx
│   │   ├── Step5SocialHistory.tsx
│   │   └── Step6Evaluation.tsx
│   │
│   └── ui/                  # Componentes UI (shadcn)
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       └── ...
│
├── config/
│   └── site.ts              # Configurações do site
│
├── hooks/
│   ├── use-toast.ts         # Hook de notificações
│   └── use-mobile.ts        # Detecção de mobile
│
├── lib/
│   ├── db.ts                # Conexão Prisma
│   ├── utils.ts             # Utilitários
│   └── validations.ts       # Schemas Zod
│
├── store/
│   └── useStore.ts          # Stores Zustand
│
└── types/
    └── index.ts             # Tipos TypeScript

prisma/
└── schema.prisma            # Schema do banco de dados

public/
├── psychologist-portrait.png
├── logo-transparent.png
└── courses/                 # Imagens dos cursos
```

---

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- npm ou bun
- Git

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/kurashitai/site-psicologa.git
cd site-psicologa
```

2. **Instale as dependências**

```bash
# Com npm
npm install

# Ou com bun
bun install
```

3. **Configure o banco de dados**

```bash
# Criar o arquivo .env
echo "DATABASE_URL=\"file:./db/custom.db\"" > .env

# Executar migrações
npm run db:push
# ou: bun run db:push
```

4. **Inicie o servidor de desenvolvimento**

```bash
# Com npm
npm run dev

# Ou com bun
bun run dev
```

5. **Acesse a aplicação**

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🔐 Credenciais de Teste

### Administrador

| Campo | Valor |
|-------|-------|
| Email | admin@dracarolina.com.br |
| Senha | admin123 |

### Paciente (após cadastro)

O sistema permite cadastro de novos pacientes através do botão "Cadastrar" no header.

---

## 📦 Módulos do Sistema

### 1. Landing Page

A landing page é composta por seções de tela cheia com snap scrolling:

```typescript
// Scroll snap implementado em globals.css
.scroll-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.scroll-container > section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

#### Parallax da Imagem

O componente `ParallaxDoctorImage` cria um efeito de movimento da foto da profissional:

- Posição inicial: lado direito (Hero Section)
- Posição final: lado esquerdo (About Section)
- Transição suave baseada no scroll
- Fade out ao passar da seção Sobre

```typescript
// Uso de dynamic import para evitar hydration error
const ParallaxDoctorImage = dynamic(
  () => import('@/components/landing/ParallaxDoctorImage').then(mod => mod.ParallaxDoctorImage),
  { ssr: false }
)
```

### 2. Sistema de Autenticação

Gerenciado pelo Zustand com persistência em localStorage:

```typescript
// store/useStore.ts
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
)
```

### 3. Formulário de Anamnese

Formulário multi-etapas com validação Zod:

```typescript
// Validação por etapa
const stepSchema = z.object({
  dateOfBirth: z.string().min(1, "Data de nascimento é obrigatória"),
  gender: z.enum(['masculino', 'feminino', 'outro', 'prefiro_nao_informar']),
  // ...
})
```

Fluxo do formulário:
1. Validação local por etapa
2. Armazenamento temporário no Zustand
3. Envio final para o banco de dados
4. Status: `draft` → `pending_review` → `approved`

### 4. Painel Administrativo

#### Dashboard

- Cards de estatísticas (pacientes, consultas, receita)
- Gráficos de receita mensal
- Notificações de novos cadastros

#### Gestão de Pacientes

- Listagem com busca e filtros
- Detalhes do paciente
- Histórico de anamneses
- Notas privadas (visível apenas para admin)

#### Financeiro

- Gráfico de receita por mês
- Detalhamento por paciente
- Clique no mês para ver detalhes

---

## 🗄️ API e Banco de Dados

### Schema Prisma

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  role      String   @default("patient") // admin ou patient
  phone     String?
  patient   Patient?
}

model Patient {
  id            String   @id @default(cuid())
  userId        String   @unique
  birthDate     DateTime
  gender        String
  profession    String?
  anamneses     Anamnese[]
  appointments  Appointment[]
}

model Anamnese {
  id           String   @id @default(cuid())
  patientId    String
  data         String   // JSON string
  status       String   @default("em_andamento")
}

model Appointment {
  id         String   @id @default(cuid())
  patientId  String
  date       DateTime
  type       String   @default("online")
  status     String   @default("agendada")
  value      Float    @default(0)
}
```

### Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/patients | Lista pacientes |
| POST | /api/patients | Cria paciente |
| GET | /api/anamneses | Lista anamneses |
| POST | /api/anamneses | Cria anamnese |
| GET | /api/appointments | Lista consultas |
| POST | /api/appointments | Agenda consulta |

---

## ⚙️ Customização

### Cores do Tema

Edite o arquivo `src/config/site.ts`:

```typescript
export const themeColors = {
  primary: {
    DEFAULT: '#8B5CF6', // Roxo principal
    800: '#5B21B6',     // Roxo escuro (usado em botões)
  },
  neutral: {
    background: '#FAFAF9', // Fundo pastel
    text: '#1C1917',
  },
}
```

### Informações da Profissional

```typescript
export const siteConfig = {
  name: 'Dra. Carolina Mendes',
  professional: {
    name: 'Dra. Carolina Mendes',
    crp: 'CRP 00/00000',
    specialty: 'Psicóloga Clínica',
    approaches: ['TCC', 'Humanista', 'Mindfulness'],
    photoUrl: '/psychologist-portrait.png',
  },
  contact: {
    phone: '(11) 99999-9999',
    whatsapp: '5511999999999',
    email: 'contato@dracarolina.com.br',
  },
}
```

### Produtos/Cursos

Edite `src/config/products.ts` para adicionar ou modificar cursos.

---

## 📱 Responsividade

O sistema é totalmente responsivo:

- **Mobile (< 768px)**: Menu hamburguer, layout em coluna única
- **Tablet (768px - 1024px)**: Layout adaptado, alguns elementos ocultos
- **Desktop (> 1024px)**: Layout completo com parallax

Breakpoints do Tailwind:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## 🔒 Segurança e LGPD

- Dados sensíveis (CPF, notas de sessão) são criptografados
- Consentimento explícito no formulário de anamnese
- Sessões com timeout configurável
- Notas privadas visíveis apenas para o administrador

---

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm run start

# Linting
npm run lint

# Banco de dados
npm run db:push      # Sincronizar schema
npm run db:generate  # Gerar cliente Prisma
npm run db:migrate   # Criar migração
npm run db:reset     # Resetar banco
```

> **Nota:** Você também pode usar `bun` no lugar de `npm` se preferir.

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido para **Dra. Carolina Mendes** - Psicóloga Clínica

---

## 🙏 Agradecimentos

- [shadcn/ui](https://ui.shadcn.com/) pelos componentes UI
- [Framer Motion](https://www.framer.com/motion/) pelas animações
- [Lucide](https://lucide.dev/) pelos ícones
- [Unsplash](https://unsplash.com/) pelas imagens de exemplo
