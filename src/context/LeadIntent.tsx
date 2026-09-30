import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { scrollToHash } from '../lib/scroll'

// Ponte entre o "Quero esse" dos cards e o LeadForm, sem tocar no DOM.
// `nonce` muda a cada clique, então escolher o mesmo serviço de novo também reage.
export interface ServiceIntent {
  id: string
  nonce: number
}

interface LeadIntentValue {
  intent: ServiceIntent | null
  pickService: (id: string) => void
}

const LeadIntentContext = createContext<LeadIntentValue | null>(null)

export function LeadIntentProvider({ children }: { children: ReactNode }) {
  const [intent, setIntent] = useState<ServiceIntent | null>(null)
  const pickService = useCallback((id: string) => {
    setIntent({ id, nonce: Date.now() })
    scrollToHash('contato')
  }, [])
  return <LeadIntentContext.Provider value={{ intent, pickService }}>{children}</LeadIntentContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLeadIntent() {
  const ctx = useContext(LeadIntentContext)
  if (!ctx) throw new Error('useLeadIntent precisa estar dentro de <LeadIntentProvider>')
  return ctx
}
