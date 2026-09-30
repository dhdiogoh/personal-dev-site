// Envio de leads para a tabela `leads` (port de legacy/api.js).
// O anon só tem INSERT (RLS: status='novo' e source='site'), por isso nada de .select().
import type { Lead } from '../types/site'
import { supabase } from './supabase'

export type LeadSubmitErrorCode = 'not_configured' | 'failed'

export class LeadSubmitError extends Error {
  readonly code: LeadSubmitErrorCode

  constructor(code: LeadSubmitErrorCode, message: string) {
    super(message)
    this.name = 'LeadSubmitError'
    this.code = code
  }
}

const FAILED_MESSAGE =
  'Não consegui enviar agora. Tenta de novo ou me chama no WhatsApp.'

export async function submitLead(lead: Lead): Promise<void> {
  if (!supabase) {
    throw new LeadSubmitError(
      'not_configured',
      'O envio do formulário não está configurado. Me chama no WhatsApp.',
    )
  }

  try {
    const { error } = await supabase.from('leads').insert(lead)
    if (error) {
      if (import.meta.env.DEV) console.error('[submitLead] erro do Supabase:', error)
      throw new LeadSubmitError('failed', FAILED_MESSAGE)
    }
  } catch (err) {
    if (err instanceof LeadSubmitError) throw err
    if (import.meta.env.DEV) console.error('[submitLead] falha de rede:', err)
    throw new LeadSubmitError('failed', FAILED_MESSAGE)
  }
}
