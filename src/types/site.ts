// Contratos compartilhados entre dados, componentes e envio do lead.

export type QuestionType = 'text' | 'textarea' | 'single' | 'multi' | 'select'

export interface Question {
  id: string
  label: string
  type: QuestionType
  required?: boolean
  placeholder?: string
  /** Obrigatório para single | multi | select */
  options?: string[]
}

export interface Service {
  id: string
  title: string
  pitch: string
  useCases: string[]
  flow: [string, string]
  questions: Question[]
}

export interface Project {
  name: string
  client: string
  summary: string
  tags: string[]
}

export interface Profile {
  name: string
  role: string
  city: string
  email: string
  whatsapp: string
  whatsappLabel: string
  linkedin: string
  github: string
}

export interface CommonQuestions {
  budget: string[]
  timeline: string[]
}

export type Answers = Record<string, string | string[]>

/** Payload enviado para a tabela `leads` (mesmo formato do legado). */
export interface Lead {
  service: string
  service_title: string
  answers: Answers
  name: string
  whatsapp: string
  email: string | null
  budget: string | null
  timeline: string | null
  message: string | null
  source: string
}

/* ---------- Portfólio (/portfolio) ---------- */

export interface Experience {
  company: string
  role: string
  period: string
  bullets: string[]
  tags: string[]
}

export interface CaseStudy {
  name: string
  /** Linha curta exibida no topo do card (tipo de produto · empresa). */
  context: string
  problem: string
  built: string
  stack: string[]
  result: string
  link?: { label: string; href: string }
}

export interface StackGroup {
  title: string
  items: string[]
  /** Itens com qualificador (ex.: usados só em projeto acadêmico), exibidos à parte. */
  aside?: { note: string; items: string[] }
}
