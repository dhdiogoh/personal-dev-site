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
  stack: string[]
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
