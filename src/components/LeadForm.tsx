import { useEffect, useReducer, useRef, type FormEvent } from 'react'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap'
import { commonQuestions, getService, services } from '../data/site'
import type { Answers, Lead, Question, Service } from '../types/site'
import { useLeadIntent } from '../context/LeadIntent'
import { LeadSubmitError, submitLead } from '../lib/leads'
import { whatsappLink } from '../lib/whatsapp'
import styles from './LeadForm.module.css'

// Port do <LeadForm /> de legacy/app.js. Todo o estado vive no reducer (nada é lido do DOM);
// o DOM só é tocado pra focar o primeiro campo inválido, como o showError do legado.

type Step = 1 | 2 | 3
type Status = 'idle' | 'sending' | 'success' | 'error'
type ContactField = 'name' | 'whatsapp' | 'email' | 'message'

interface State {
  step: Step
  service: string | null
  answers: Answers
  contact: Record<ContactField, string>
  budget: string
  timeline: string
  /** Honeypot anti-bot (campo "website" invisível). */
  honeypot: string
  status: Status
  error: string | null
  /** ids dos campos com .is-invalid (perguntas do passo 2 ou name/whatsapp do passo 3). */
  invalid: Record<string, true>
  /** Link do WhatsApp com o resumo: no done (not_configured) ou ao lado do erro (failed). */
  fallbackLink?: string
}

type Action =
  | { type: 'selectService'; id: string }
  | { type: 'goTo'; step: Step }
  | { type: 'setAnswer'; id: string; value: string }
  | { type: 'toggleOpt'; id: string; value: string; multi: boolean }
  | { type: 'setContact'; field: ContactField; value: string }
  | { type: 'setCommon'; key: 'budget' | 'timeline'; value: string }
  | { type: 'setHoneypot'; value: string }
  | { type: 'invalidate'; ids: string[]; error: string }
  | { type: 'submitStart' }
  | { type: 'submitSuccess'; fallbackLink?: string }
  | { type: 'submitFailed'; error: string; fallbackLink: string }

const MSG_STEP2 = 'Faltou responder algumas perguntas marcadas com *.'
const MSG_STEP3 = 'Preciso do seu nome e de um WhatsApp válido pra te responder.'
const MSG_FAILED = 'Não consegui enviar agora. Tenta de novo ou me chama no WhatsApp.'
const DONE_TEXT = 'Valeu por contar do seu projeto. Vou ler com calma e te chamo no WhatsApp em breve.'
const DONE_TEXT_WHATSAPP = 'Seu resumo está pronto. Toca no botão pra me mandar pelo WhatsApp e eu te respondo por lá.'

const initialState: State = {
  step: 1,
  service: null,
  answers: {},
  contact: { name: '', whatsapp: '', email: '', message: '' },
  budget: '',
  timeline: '',
  honeypot: '',
  status: 'idle',
  error: null,
  invalid: {},
}

function without(invalid: Record<string, true>, id: string) {
  if (!invalid[id]) return invalid
  const next = { ...invalid }
  delete next[id]
  return next
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'selectService': {
      // legacy selectService: troca de serviço zera as respostas; re-render das perguntas limpa os .is-invalid delas.
      const invalid: Record<string, true> = {}
      if (state.invalid.name) invalid.name = true
      if (state.invalid.whatsapp) invalid.whatsapp = true
      return { ...state, service: action.id, answers: state.service === action.id ? state.answers : {}, invalid }
    }
    case 'goTo':
      // legacy goTo: esconde a caixa de erro a cada troca de passo.
      return { ...state, step: action.step, error: null, status: state.status === 'error' ? 'idle' : state.status, fallbackLink: undefined }
    case 'setAnswer':
      return { ...state, answers: { ...state.answers, [action.id]: action.value }, invalid: without(state.invalid, action.id) }
    case 'toggleOpt': {
      let value: string | string[]
      if (action.multi) {
        const prev = ([] as string[]).concat(state.answers[action.id] ?? [])
        value = prev.includes(action.value) ? prev.filter((v) => v !== action.value) : [...prev, action.value]
      } else {
        value = action.value
      }
      return { ...state, answers: { ...state.answers, [action.id]: value }, invalid: without(state.invalid, action.id) }
    }
    case 'setContact':
      return { ...state, contact: { ...state.contact, [action.field]: action.value }, invalid: without(state.invalid, action.field) }
    case 'setCommon':
      return { ...state, [action.key]: action.value }
    case 'setHoneypot':
      return { ...state, honeypot: action.value }
    case 'invalidate': {
      const invalid = { ...state.invalid }
      action.ids.forEach((id) => (invalid[id] = true))
      return { ...state, invalid, error: action.error }
    }
    case 'submitStart':
      return { ...state, status: 'sending', error: null, fallbackLink: undefined }
    case 'submitSuccess':
      return { ...state, status: 'success', error: null, fallbackLink: action.fallbackLink }
    case 'submitFailed':
      return { ...state, status: 'error', error: action.error, fallbackLink: action.fallbackLink }
  }
}

const isEmpty = (v: string | string[] | undefined) => (Array.isArray(v) ? !v.length : !v?.trim())

/** Respostas só das perguntas do serviço atual, texto com trim (igual ao collectStep2). */
function collectAnswers(svc: Service, answers: Answers): Answers {
  const out: Answers = {}
  svc.questions.forEach((q) => {
    const v = answers[q.id]
    if (q.type === 'multi') out[q.id] = Array.isArray(v) ? v : []
    else out[q.id] = typeof v === 'string' ? v.trim() : ''
  })
  return out
}

function invalidStep2(svc: Service, answers: Answers) {
  return svc.questions.filter((q) => q.required && isEmpty(answers[q.id])).map((q) => q.id)
}

function invalidStep3(contact: State['contact']) {
  const bad: string[] = []
  if (contact.name.trim().length <= 1) bad.push('name')
  if (contact.whatsapp.replace(/\D/g, '').length < 10) bad.push('whatsapp')
  return bad
}

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

export default function LeadForm() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { intent } = useLeadIntent()
  const formRef = useRef<HTMLFormElement>(null)
  // Sempre aponta pro painel ativo (usado no fade da troca de passo).
  const activePanelRef = useRef<HTMLFieldSetElement>(null)
  // Último passo exibido: pula o fade na montagem (e no re-run do StrictMode); só anima troca real.
  const shownStepRef = useRef<Step | null>(null)

  const svc = state.service ? getService(state.service) : undefined
  const { step, status } = state
  const done = status === 'success'
  const doneLink = done ? state.fallbackLink : undefined

  // CTA "Quero esse" dos cards: selectService(id) + goTo(2). O scroll fica com o contexto.
  useEffect(() => {
    if (!intent || !getService(intent.id)) return
    dispatch({ type: 'selectService', id: intent.id })
    dispatch({ type: 'goTo', step: 2 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intent?.nonce])

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // legacy: reveal do formulário ao entrar na tela
      gsap.from(formRef.current, { y: 50, rotate: -1.5, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: formRef.current, start: 'top 85%' } })
    },
    { scope: formRef },
  )

  // legacy goTo(): fade do painel que entra. fromTo (em vez do from do legado) pra que uma troca rápida
  // de volta a um painel ainda animando não "congele" a opacidade parcial como estado final.
  useGSAP(
    () => {
      const first = shownStepRef.current === null
      const changed = shownStepRef.current !== step
      shownStepRef.current = step
      if (first || !changed || prefersReducedMotion() || !activePanelRef.current) return
      gsap.fromTo(activePanelRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', overwrite: true })
    },
    { dependencies: [step], scope: formRef },
  )

  function focusField(id: string) {
    const wrap = formRef.current?.querySelector<HTMLElement>(`[data-field="${CSS.escape(id)}"]`)
    wrap?.querySelector<HTMLElement>('input, textarea, select, button')?.focus()
  }

  function next() {
    if (step === 1 && state.service) return dispatch({ type: 'goTo', step: 2 })
    if (step === 2 && svc) {
      const bad = invalidStep2(svc, state.answers)
      if (bad.length) {
        dispatch({ type: 'invalidate', ids: bad, error: MSG_STEP2 })
        return focusField(bad[0])
      }
      dispatch({ type: 'goTo', step: 3 })
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Enter num campo dos passos 1/2 não deve disparar o envio.
    if (step !== 3 || status === 'sending' || !svc) return
    const bad = invalidStep3(state.contact)
    if (bad.length) {
      dispatch({ type: 'invalidate', ids: bad, error: MSG_STEP3 })
      return focusField(bad[0])
    }
    const c = state.contact
    const lead: Lead = {
      service: svc.id,
      service_title: svc.title,
      answers: collectAnswers(svc, state.answers),
      name: c.name.trim(),
      whatsapp: c.whatsapp.trim(),
      email: c.email.trim() || null,
      budget: state.budget || null,
      timeline: state.timeline || null,
      message: c.message.trim() || null,
      source: 'site',
    }
    // Honeypot preenchido = bot: finge sucesso sem enviar.
    if (state.honeypot) return dispatch({ type: 'submitSuccess' })

    dispatch({ type: 'submitStart' })
    try {
      await submitLead(lead)
      dispatch({ type: 'submitSuccess' })
    } catch (err) {
      const link = whatsappLink(lead)
      if (err instanceof LeadSubmitError && err.code === 'not_configured') {
        dispatch({ type: 'submitSuccess', fallbackLink: link })
      } else {
        dispatch({ type: 'submitFailed', error: MSG_FAILED, fallbackLink: link })
      }
    }
  }

  const panelProps = (n: Step) => ({
    className: cx(styles.lead__panel, !done && step === n && styles['is-active']),
    'data-step': n,
    hidden: done,
    ref: !done && step === n ? activePanelRef : undefined,
  })

  const optButtons = (name: string, options: string[], selected: string | string[] | undefined, onPick: (v: string) => void, multi = false) =>
    options.map((o) => {
      const pressed = Array.isArray(selected) ? selected.includes(o) : selected === o
      return (
        <button key={o} type="button" className={styles.opt} data-opt={name} data-multi={String(multi)} data-value={o} aria-pressed={pressed} onClick={() => onPick(o)}>
          {o}
        </button>
      )
    })

  function renderQuestion(q: Question) {
    const req = q.required ? ' *' : ''
    const fieldClass = cx(styles.field, styles['field--full'], state.invalid[q.id] && styles['is-invalid'])
    const prev = state.answers[q.id]
    const text = typeof prev === 'string' ? prev : ''
    const common = { 'data-q': q.id, 'data-field': q.id }
    if (q.type === 'textarea' || q.type === 'text' || q.type === 'select') {
      const onChange = (e: { target: { value: string } }) => dispatch({ type: 'setAnswer', id: q.id, value: e.target.value })
      return (
        <label key={q.id} className={fieldClass} {...common}>
          <span>{`${q.label}${req}`}</span>
          {q.type === 'textarea' && <textarea name={q.id} rows={3} placeholder={q.placeholder} value={text} onChange={onChange} />}
          {q.type === 'text' && <input name={q.id} placeholder={q.placeholder} value={text} onChange={onChange} />}
          {q.type === 'select' && (
            <select name={q.id} value={text} onChange={onChange}>
              <option value="">Selecione</option>
              {q.options?.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          )}
        </label>
      )
    }
    const multi = q.type === 'multi'
    return (
      <div key={q.id} className={fieldClass} {...common}>
        <span>
          {/* Um único nó de texto, como o innerHTML do legado: nós separados deslocam o <small> em subpixel. */}
          {`${q.label}${req}${multi ? ' ' : ''}`}
          {multi && <small>(pode marcar mais de um)</small>}
        </span>
        <div className={styles.opts}>
          {optButtons(q.id, q.options ?? [], prev, (v) => dispatch({ type: 'toggleOpt', id: q.id, value: v, multi }), multi)}
        </div>
      </div>
    )
  }

  const contactInput = (field: ContactField) => ({
    name: field,
    value: state.contact[field],
    onChange: (e: { target: { value: string } }) => dispatch({ type: 'setContact', field, value: e.target.value }),
  })

  return (
    <form ref={formRef} className={styles.lead} noValidate onSubmit={onSubmit}>
      <ol className={styles.lead__steps} aria-label="Etapas" hidden={done}>
        {['Serviço', 'Projeto', 'Contato'].map((label, i) => (
          <li key={label} className={cx(i + 1 === step && styles['is-active'], i + 1 < step && styles['is-done']) || undefined}>
            <span>{i + 1}</span> {label}
          </li>
        ))}
      </ol>

      <fieldset {...panelProps(1)}>
        <legend className={styles.lead__q}>Com o que você precisa de ajuda?</legend>
        <div className={styles.lead__services}>
          {services.map((s) => (
            <button key={s.id} type="button" className={styles.pick} data-service={s.id} aria-pressed={state.service === s.id} onClick={() => dispatch({ type: 'selectService', id: s.id })}>
              <span>{s.title}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset {...panelProps(2)}>
        <legend className={styles.lead__q}>
          {svc && (
            <small className={`${styles.lead__svc} cond`}>
              {svc.title}
            </small>
          )}
          Me conta do projeto
        </legend>
        <div className={styles.lead__fields}>{svc?.questions.map(renderQuestion)}</div>
      </fieldset>

      <fieldset {...panelProps(3)}>
        <legend className={styles.lead__q}>Como eu te encontro?</legend>
        <div className={styles.lead__fields}>
          <label className={cx(styles.field, state.invalid.name && styles['is-invalid'])} data-field="name">
            <span>Nome *</span>
            <input {...contactInput('name')} autoComplete="name" required />
          </label>
          <label className={cx(styles.field, state.invalid.whatsapp && styles['is-invalid'])} data-field="whatsapp">
            <span>WhatsApp *</span>
            <input {...contactInput('whatsapp')} type="tel" inputMode="tel" autoComplete="tel" placeholder="(91) 90000-0000" required />
          </label>
          <label className={cx(styles.field, styles['field--full'])}>
            <span>E-mail</span>
            <input {...contactInput('email')} type="email" autoComplete="email" />
          </label>
          <div className={cx(styles.field, styles['field--full'])}>
            <span>Faixa de investimento</span>
            <div className={styles.opts}>
              {optButtons('budget', commonQuestions.budget, state.budget, (v) => dispatch({ type: 'setCommon', key: 'budget', value: v }))}
            </div>
          </div>
          <div className={cx(styles.field, styles['field--full'])}>
            <span>Prazo</span>
            <div className={styles.opts}>
              {optButtons('timeline', commonQuestions.timeline, state.timeline, (v) => dispatch({ type: 'setCommon', key: 'timeline', value: v }))}
            </div>
          </div>
          <label className={cx(styles.field, styles['field--full'])}>
            <span>Algo mais que eu deva saber?</span>
            <textarea {...contactInput('message')} rows={3} />
          </label>
        </div>
      </fieldset>

      {/* Honeypot: fora da tela (não display:none), fora da ordem de tab e escondido de leitores de tela. */}
      <div className={styles.hp} aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" value={state.honeypot} onChange={(e) => dispatch({ type: 'setHoneypot', value: e.target.value })} />
        </label>
      </div>

      <div className={styles.lead__done} hidden={!done}>
        <p className={styles.lead__q}>Recebido!</p>
        <p>{doneLink ? DONE_TEXT_WHATSAPP : DONE_TEXT}</p>
        {doneLink && (
          <a className="btn btn--sun" href={doneLink} target="_blank" rel="noopener">
            Enviar pelo WhatsApp →
          </a>
        )}
      </div>

      <p className={styles.lead__error} role="alert" hidden={!state.error}>
        {state.error}
      </p>
      {status === 'error' && state.fallbackLink && (
        <div className={styles.lead__fallback}>
          <a className="btn btn--sun" href={state.fallbackLink} target="_blank" rel="noopener">
            Enviar pelo WhatsApp →
          </a>
        </div>
      )}

      <div className={styles.lead__nav} hidden={done}>
        <button type="button" className="btn btn--ghost-ink" data-action="back" hidden={step === 1} onClick={() => dispatch({ type: 'goTo', step: (step - 1) as Step })}>
          ← Voltar
        </button>
        <button type="button" className="btn btn--ink" data-action="next" hidden={step === 3} disabled={step === 1 && !state.service} onClick={next}>
          Continuar →
        </button>
        <button type="submit" className="btn btn--sun" data-action="submit" hidden={step !== 3} disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : 'Enviar projeto'}
        </button>
      </div>
    </form>
  )
}
