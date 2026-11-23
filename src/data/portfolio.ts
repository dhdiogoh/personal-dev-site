/* ==========================================================================
   portfolio.ts — conteúdo da página /portfolio.
   Fonte única: public/Diogo_Henrique_Silva_CV.pdf. Ao atualizar o currículo, atualize aqui.
   ========================================================================== */

import type { CaseStudy, Experience, StackGroup } from '../types/site'

export const cvUrl = '/Diogo_Henrique_Silva_CV.pdf'

export const person = {
  name: 'Diogo Henrique Silva',
  role: 'Engenheiro de IA e Desenvolvedor Full Stack',
  location: 'Belém, Pará, Brasil',
  pitch:
    'Construo agentes de IA com LLMs e RAG e aplicações full stack em produção, da conversa com o negócio ao deploy.',
}

export const about =
  'Tenho cerca de 2 anos construindo produtos e soluções em produção, da conversa com o negócio ao deploy. ' +
  'Desenvolvo agentes de IA com LLMs (OpenAI e Anthropic), LangChain, RAG, uso de ferramentas e guardrails, integrados a CRM e WhatsApp, ' +
  'e aplicações full stack com Node.js, TypeScript, NestJS, React e Next.js sobre PostgreSQL e Redis. ' +
  'Trabalho de forma IA-first com Claude Code e revisão crítica de todo código gerado, mantendo a qualidade com testes automatizados, code review e CI/CD.'

export const experience: Experience[] = [
  {
    company: 'Bermax',
    role: 'Desenvolvedor Full Stack',
    period: 'Jul 2024 – Jul 2026',
    bullets: [
      'Construí produtos digitais e soluções com IA em produção para clientes de diferentes segmentos, da concepção ao deploy: agentes com LLMs e RAG, plataformas SaaS, marketplaces e integrações via API.',
      'Levantei requisitos direto com os clientes e participei das decisões técnicas e de priorização.',
      'Mantive a qualidade com testes automatizados, code review e CI/CD.',
      'Conduzi dailies e refinamentos em Scrum.',
    ],
    tags: ['Python', 'Node.js', 'TypeScript', 'React', 'Next.js'],
  },
  {
    company: 'Venda ERP',
    role: 'Estagiário de Engenharia de Software',
    period: 'Jul 2025 – Set 2025 · 3 meses',
    bullets: [
      'Desenvolvi o NodePY, plataforma em nuvem de automação de workflows usada pelos parceiros da Venda ERP para automatizar processos nos próprios ERPs.',
      'Evolução da arquitetura de monolito para Angular e Flask com microsserviços em Docker.',
    ],
    tags: ['Python', 'Flask', 'MongoDB', 'Angular', 'Docker'],
  },
]

export const caseStudies: CaseStudy[] = [
  {
    name: 'Agentes de IA do Grupo Sinop',
    context: '5 agentes com RAG em produção · Bermax',
    problem: 'O atendimento comercial era manual e os leads chegavam ao time de vendas sem nenhuma triagem.',
    built:
      '5 agentes especializados com uso de ferramentas, RAG sobre documentos vetorizados, guardrails contra prompt injection, mascaramento de PII e LLM como juiz. Um container por agente, Redis como fila de mensagens e integração ao CRM via API.',
    stack: ['Python', 'LangChain', 'APIs de LLM', 'RAG', 'Redis', 'CRM Kommo API', 'Docker'],
    result: 'Triagem e transferência automática de leads qualificados para o time comercial, aumentando as vendas.',
  },
  {
    name: 'QueroExtra',
    context: 'Marketplace com Pix, split e custódia',
    problem:
      'Freelancers de foodservice não tinham garantia de receber, e as empresas não tinham um jeito confiável de contratar mão de obra para eventos.',
    built:
      'Responsável técnico da arquitetura ao deploy, com desenvolvimento IA-first visível no repositório (.claude e CLAUDE.md com contexto e padrões). Fluxo financeiro com Pix, split e custódia e idempotência nos webhooks.',
    stack: ['React', 'Node.js', 'TypeScript', 'Supabase (PostgreSQL)', 'OAuth2/JWT', 'Pix', 'Playwright', 'Claude Code'],
    result: 'Pagamento garantido para freelancers e empresas, com saque no mesmo dia do evento.',
    link: { label: 'Ver repositório no GitHub', href: 'https://github.com/BermaxCulture/queroextra-app' },
  },
  {
    name: 'Clunk',
    context: 'Plataforma SaaS multi-tenant · Bermax',
    problem:
      'A agência gerenciava projetos e clientes no ClickUp, sem controle de permissão por módulo nem isolamento entre clientes.',
    built:
      'Front a partir de design system próprio e back com permissões por módulo e isolamento de dados em três camadas (tenant_id em todas as tabelas, RLS no PostgreSQL e Edge Functions validando permissões), com testes garantindo que nenhum usuário acesse dados de outro sem permissão. Cobrança via Stripe e testes no CI/CD.',
    stack: ['Next.js', 'React', 'TypeScript', 'React Query', 'shadcn/ui', 'PostgreSQL', 'Supabase', 'Stripe', 'Jest', 'Playwright'],
    result: 'Substituiu o ClickUp na gestão interna e de clientes da agência.',
  },
  {
    name: 'NodePY',
    context: 'Automação de workflows em nuvem · Venda ERP',
    problem: 'Os parceiros da Venda ERP precisavam automatizar processos dentro dos próprios ERPs.',
    built:
      'Plataforma em nuvem de automação de workflows, com evolução da arquitetura de monolito para Angular e Flask com microsserviços em Docker.',
    stack: ['Python', 'Flask', 'MongoDB', 'Angular', 'Docker'],
    result: 'Usado pelos parceiros da Venda ERP para automatizar processos nos próprios ERPs.',
  },
]

export const stackGroups: StackGroup[] = [
  {
    title: 'IA e LLMs',
    items: ['APIs da OpenAI', 'APIs da Anthropic', 'LangChain', 'Agentes com uso de ferramentas', 'RAG', 'Embeddings', 'Pinecone', 'Supabase pgvector', 'Engenharia de prompt', 'Guardrails', 'Mascaramento de PII', 'LLM como juiz', 'MCP'],
  },
  {
    title: 'Back-end',
    items: ['Node.js', 'TypeScript', 'NestJS', 'Python', 'Flask', 'APIs REST', 'Swagger/OpenAPI', 'Postman', 'Webhooks com idempotência', 'OAuth2/JWT', 'Microsserviços', 'Filas com Redis'],
  },
  {
    title: 'Front-end',
    items: ['React', 'Next.js', 'React Query', 'Context API', 'Tailwind CSS', 'shadcn/ui', 'Design system e biblioteca de componentes'],
  },
  {
    title: 'Dados',
    items: ['PostgreSQL', 'SQL', 'MongoDB', 'Redis', 'Supabase'],
  },
  {
    title: 'Infra',
    items: ['Docker', 'GCP', 'Git', 'CI/CD com GitHub Actions'],
    aside: { note: 'Em projeto acadêmico', items: ['AWS (EC2, S3, Lambda)'] },
  },
  {
    title: 'Qualidade e métodos',
    items: ['Claude Code', 'Jest', 'Playwright', 'Code review', 'Clean Code', 'SOLID', 'n8n', 'Scrum', 'Jira'],
  },
]

export const education = {
  course: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
  school: 'UNAMA',
  period: 'Ago 2024 – Dez 2026 (previsão de conclusão)',
}

export const languages: [string, string][] = [
  ['Português', 'Nativo'],
  ['Inglês', 'B1 (leitura avançada, conversação em desenvolvimento)'],
]
