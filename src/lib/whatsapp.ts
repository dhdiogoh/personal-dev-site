// Resumo do lead em uma mensagem de WhatsApp (port 1:1 de whatsappLink em legacy/api.js).
// Usado como fallback quando o envio não está configurado ou falha, pra o lead nunca se perder.
import type { Lead } from '../types/site'
import { getService, profile } from '../data/site'

export function whatsappLink(lead: Lead): string {
  const svc = getService(lead.service)
  const labelOf = (id: string) => svc?.questions.find((q) => q.id === id)?.label.replace(/\?$/, '') ?? id
  const lines = [
    `Oi Diogo! Vim pelo seu site.`,
    ``,
    `*Serviço:* ${lead.service_title}`,
    ...Object.entries(lead.answers)
      .filter(([, v]) => (Array.isArray(v) ? v.length : v))
      .map(([k, v]) => `*${labelOf(k)}:* ${Array.isArray(v) ? v.join(', ') : v}`),
    lead.budget ? `*Investimento:* ${lead.budget}` : '',
    lead.timeline ? `*Prazo:* ${lead.timeline}` : '',
    lead.message ? `*Obs.:* ${lead.message}` : '',
    ``,
    `${lead.name}${lead.email ? ' · ' + lead.email : ''}`,
  ].filter((l, i, a) => l !== '' || a[i - 1] !== '')
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
}
