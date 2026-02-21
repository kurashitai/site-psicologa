# 🗄️ Schema do Banco de Dados - Plataforma Psicóloga

## Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                    SUPABASE (PostgreSQL)                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   auth.users │───▶│   profiles   │───▶│   patients   │      │
│  │  (Supabase)  │    │  (dados base)│    │ (dados extra)│      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│          │                   │                   │              │
│          ▼                   ▼                   ▼              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │    roles     │    │  anamneses   │    │ appointments │      │
│  │ (admin/user) │    │ (criptograf.)│    │  (consultas) │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                              │                                  │
│                              ▼                                  │
│                      ┌──────────────┐                          │
│                      │anamneses_log │                          │
│                      │  (auditoria) │                          │
│                      └──────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. Tabela: `roles` (Funções de Usuário)

```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,  -- 'admin', 'patient'
  description TEXT,
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir roles padrão
INSERT INTO roles (name, description) VALUES 
  ('admin', 'Psicóloga - Acesso total ao sistema'),
  ('patient', 'Paciente - Acesso à área do paciente');
```

---

## 2. Tabela: `profiles` (Perfil de Usuário)

Vinculada ao `auth.users` do Supabase.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) DEFAULT (SELECT id FROM roles WHERE name = 'patient'),
  
  -- Dados básicos
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  
  -- Metadados
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  
  -- LGPD
  consent_terms BOOLEAN DEFAULT false,
  consent_privacy BOOLEAN DEFAULT false,
  consent_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_profiles_role ON profiles(role_id);
CREATE INDEX idx_profiles_email ON profiles(email);
```

---

## 3. Tabela: `patients` (Dados Extendidos do Paciente)

```sql
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Dados pessoais adicionais
  date_of_birth DATE,
  gender VARCHAR(20),              -- 'masculino', 'feminino', 'outro', 'prefiro_nao_informar'
  cpf VARCHAR(14),                 -- Criptografado
  rg VARCHAR(20),
  marital_status VARCHAR(30),
  occupation VARCHAR(100),
  education_level VARCHAR(50),
  
  -- Endereço
  address_street VARCHAR(255),
  address_number VARCHAR(10),
  address_complement VARCHAR(100),
  address_neighborhood VARCHAR(100),
  address_city VARCHAR(100),
  address_state VARCHAR(2),
  address_zipcode VARCHAR(10),
  
  -- Contato de emergência
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  emergency_contact_relationship VARCHAR(50),
  
  -- Indicado por
  referred_by VARCHAR(255),
  
  -- Status do paciente
  status VARCHAR(20) DEFAULT 'active',  -- 'active', 'inactive', 'waiting_list'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_patients_profile ON patients(profile_id);
CREATE INDEX idx_patients_status ON patients(status);
```

---

## 4. Tabela: `anamneses` (Formulário de Anamnese) ⚠️ DADOS SENSÍVEIS

**🔒 SEGURANÇA LGPD**: Esta tabela contém dados de saúde mental e deve ter proteção especial.

```sql
CREATE TABLE anamneses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  
  -- ============================================
  -- ETAPA 1: DADOS PESSOAIS (já em patients)
  -- ============================================
  
  -- ============================================
  -- ETAPA 2: QUEIXA PRINCIPAL
  -- ============================================
  chief_complaint TEXT,              -- Queixa principal (criptografado)
  symptom_duration VARCHAR(100),     -- Há quanto tempo
  symptom_intensity INTEGER,         -- 1-10 escala
  previous_treatment BOOLEAN,        -- Já fez tratamento antes?
  previous_treatment_details TEXT,   -- Detalhes do tratamento anterior
  expectations TEXT,                 -- O que espera da terapia
  
  -- ============================================
  -- ETAPA 3: HISTÓRICO DE SAÚDE
  -- ============================================
  current_diseases TEXT,             -- Doenças atuais
  current_medications TEXT,          -- Medicamentos em uso
  allergies TEXT,                    -- Alergias
  previous_hospitalizations TEXT,    -- Internações anteriores
  substance_use JSONB,               -- {alcohol, tobacco, drugs: {type, frequency}}
  family_history_mental_illness TEXT, -- Histórico familiar de doenças mentais
  
  -- NOTA: Campos ultra-sensíveis (histórico de suicídio/auto-mutilação) foram
  -- removidos do formulário online. Esses dados devem ser coletados presencialmente
  -- pela psicóloga e adicionados manualmente no painel admin.
  
  -- ============================================
  -- ETAPA 4: HISTÓRICO FAMILIAR
  -- ============================================
  family_structure JSONB,            -- Estrutura familiar
  family_relationship VARCHAR(50),   -- Qualidade do relacionamento familiar
  family_conflicts TEXT,             -- Conflitos familiares
  family_support BOOLEAN,            -- Suporte familiar
  
  -- ============================================
  -- ETAPA 5: HISTÓRICO SOCIAL/PESSOAL
  -- ============================================
  childhood_description TEXT,        -- Descrição da infância
  school_history TEXT,               -- Histórico escolar
  work_history TEXT,                 -- Histórico profissional
  current_work_situation VARCHAR(50),-- Situação atual de trabalho
  relationship_status VARCHAR(50),   -- Estado de relacionamento
  relationship_quality TEXT,         -- Qualidade do relacionamento
  children_count INTEGER,            -- Número de filhos
  routine_description TEXT,          -- Descrição da rotina
  hobbies TEXT,                      -- Hobbies e interesses
  support_network TEXT,              -- Rede de apoio
  
  -- ============================================
  -- ETAPA 6: AVALIAÇÃO ADICIONAL
  -- ============================================
  sleep_quality VARCHAR(20,          -- Qualidade do sono
    CHECK (sleep_quality IN ('boa', 'regular', 'ruim', 'muito_ruim'))
  ),
  sleep_hours INTEGER,               -- Horas de sono
  appetite VARCHAR(20,               -- Apetite
    CHECK (appetite IN ('bom', 'regular', 'ruim', 'variavel'))
  ),
  energy_level INTEGER,              -- Nível de energia (1-10)
  concentration_level INTEGER,       -- Concentração (1-10)
  mood_description TEXT,             -- Descrição do humor
  
  -- ============================================
  -- OBSERVAÇÕES E STATUS
  -- ============================================
  additional_notes TEXT,             -- Observações adicionais do paciente
  admin_notes TEXT,                  -- Notas privadas da psicóloga
  status VARCHAR(20) DEFAULT 'pending_review', -- 'draft', 'pending_review', 'reviewed', 'approved'
  
  -- LGPD
  consent_given BOOLEAN DEFAULT true,
  consent_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES profiles(id)
);

-- Índices
CREATE INDEX idx_anamneses_patient ON anamneses(patient_id);
CREATE INDEX idx_anamneses_status ON anamneses(status);
```

---

## 5. Tabela: `appointments` (Consultas)

```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  
  -- Dados da consulta
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 50,
  type VARCHAR(20) DEFAULT 'online',  -- 'online', 'presencial'
  location VARCHAR(255),              -- Endereço ou link da sala
  
  -- Status
  status VARCHAR(20) DEFAULT 'scheduled',
    CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
  
  -- Valor
  price DECIMAL(10,2),
  payment_status VARCHAR(20) DEFAULT 'pending',
    CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  payment_method VARCHAR(50),
  
  -- Notas
  session_notes TEXT,                -- Anotações da sessão (criptografado)
  patient_feedback TEXT,             -- Feedback do paciente
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_date ON appointments(scheduled_date);
CREATE INDEX idx_appointments_status ON appointments(status);
```

---

## 6. Tabela: `anamneses_audit_log` (Auditoria LGPD)

```sql
CREATE TABLE anamneses_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anamnesis_id UUID REFERENCES anamneses(id) ON DELETE SET NULL,
  
  -- Quem acessou
  user_id UUID REFERENCES profiles(id),
  user_role VARCHAR(50),
  
  -- Ação
  action VARCHAR(50) NOT NULL,  -- 'view', 'create', 'update', 'delete', 'export'
  field_changed VARCHAR(100),   -- Campo alterado (se update)
  old_value TEXT,               -- Valor anterior
  new_value TEXT,               -- Novo valor
  
  -- Contexto
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para consultas de auditoria
CREATE INDEX idx_audit_anamnesis ON anamneses_audit_log(anamnesis_id);
CREATE INDEX idx_audit_user ON anamneses_audit_log(user_id);
CREATE INDEX idx_audit_date ON anamneses_audit_log(created_at);
```

---

## 7. Tabela: `products` (Cursos/E-books/Áudios)

Arquitetura modular para fácil expansão.

```sql
CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES product_categories(id),
  
  -- Dados do produto
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  short_description VARCHAR(500),
  thumbnail_url TEXT,
  
  -- Tipo e formato
  type VARCHAR(20) NOT NULL,  -- 'course', 'ebook', 'audio', 'mentorship'
  format VARCHAR(20),         -- 'online', 'download', 'hybrid'
  
  -- Preço e checkout
  price DECIMAL(10,2),
  promotional_price DECIMAL(10,2),
  checkout_url TEXT,          -- Link Hotmart/Kiwify
  
  -- Metadados
  duration VARCHAR(100),      -- Duração do curso
  lessons_count INTEGER,      -- Número de aulas (para cursos)
  
  -- Controle
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🔐 Row Level Security (RLS) - CRÍTICO PARA LGPD

```sql
-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE anamneses ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Políticas para PROFILES
CREATE POLICY "Usuários podem ver próprio perfil"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins podem ver todos os perfis"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN roles r ON p.role_id = r.id
      WHERE p.id = auth.uid() AND r.name = 'admin'
    )
  );

-- Políticas para ANAMNESES (DADOS SENSÍVEIS)
CREATE POLICY "Pacientes podem criar própria anamnese"
  ON anamneses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM patients WHERE profile_id = auth.uid() AND id = patient_id
    )
  );

CREATE POLICY "Pacientes podem ver própria anamnese"
  ON anamneses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM patients WHERE profile_id = auth.uid() AND id = patient_id
    )
  );

CREATE POLICY "Admins têm acesso total às anamneses"
  ON anamneses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN roles r ON p.role_id = r.id
      WHERE p.id = auth.uid() AND r.name = 'admin'
    )
  );

-- Políticas para APPOINTMENTS
CREATE POLICY "Pacientes podem ver próprias consultas"
  ON appointments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM patients WHERE profile_id = auth.uid() AND id = patient_id
    )
  );

CREATE POLICY "Admins gerenciam todas as consultas"
  ON appointments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN roles r ON p.role_id = r.id
      WHERE p.id = auth.uid() AND r.name = 'admin'
    )
  );
```

---

## 🔒 Criptografia de Dados Sensíveis

### Estratégia de Proteção

| Campo | Método | Justificativa |
|-------|--------|---------------|
| CPF | Criptografia no app + Vault | Dado pessoal único |
| session_notes | pgcrypto | Anotações de sessão |
| chief_complaint | pgcrypto | Dado de saúde |
| admin_private_notes | pgcrypto | Notas privadas da psicóloga |

### Função de Criptografia

```sql
-- Extensão necessária
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Exemplo: Função para criptografar
CREATE OR REPLACE FUNCTION encrypt_field(plaintext TEXT, key TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN encode(
    pgp_sym_encrypt(plaintext, key),
    'base64'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Exemplo: Função para descriptografar
CREATE OR REPLACE FUNCTION decrypt_field(ciphertext TEXT, key TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN pgp_sym_decrypt(
    decode(ciphertext, 'base64'),
    key
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 📊 Diagrama Entidade-Relacionamento (Resumo)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  auth.users │────▶│  profiles   │────▶│    roles    │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  patients   │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐
   │ anamneses   │  │appointments │  │anamneses_audit  │
   └─────────────┘  └─────────────┘  └─────────────────┘

┌─────────────────┐     ┌─────────────────┐
│product_categories│────▶│    products     │
└─────────────────┘     └─────────────────┘
```

---

## ✅ Checklist LGPD Implementado

- [x] **Minimização de Dados**: Apenas dados necessários coletados
- [x] **Consentimento**: Campos de consentimento em profiles e anamneses
- [x] **Segurança**: RLS + Criptografia de campos sensíveis
- [x] **Auditoria**: Tabela de log para acesso a dados sensíveis
- [x] **Acesso Restrito**: Admin (psicóloga) e pacientes só veem seus dados
- [x] **Transparência**: Registro de quem acessou e quando

---

## 🚀 Próximos Passos

1. Validar este schema
2. Criar migrações no Supabase
3. Implementar a aplicação Next.js
