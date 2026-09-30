/* ==========================================================================
   site.ts — todo o conteúdo editável do site.
   Portado 1:1 de legacy/data.js (objeto SITE).
   ========================================================================== */

import type { CommonQuestions, Profile, Project, Service } from '../types/site'

export type {
  Answers,
  CommonQuestions,
  Lead,
  Profile,
  Project,
  Question,
  QuestionType,
  Service,
} from '../types/site'

export const profile: Profile = {
  name: 'Diogo Henrique',
  role: 'Desenvolvedor Full Stack & Engenheiro de IA',
  city: 'Belém do Pará, BR',
  email: 'diiogoh04@gmail.com',
  whatsapp: '5591981134890',
  whatsappLabel: '+55 91 98113-4890',
  linkedin: 'https://linkedin.com/in/diogohenriquebx',
  github: 'https://github.com/dhdiogoh',
}

/* Serviços. `questions` alimenta o passo 2 do formulário.
   Tipos de pergunta: text | textarea | single | multi | select */
export const services: Service[] = [
  {
    id: 'plataformas',
    title: 'Plataformas personalizadas',
    pitch: 'Sistemas feitos sob medida pro jeito que sua operação já funciona, sem adaptar o negócio a uma ferramenta pronta.',
    useCases: [
      'Painel de indicadores (BI) ligado aos seus dados',
      'Portal pro cliente acompanhar pedidos e projetos',
      'Sistema interno que substitui planilha e ClickUp',
      'Ferramenta de workflow com permissões por equipe',
    ],
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Supabase'],
    flow: ['PLANILHA', 'SISTEMA'],
    questions: [
      { id: 'problema', label: 'Que processo ou problema a plataforma vai resolver?', type: 'textarea', required: true },
      { id: 'segmento', label: 'Qual é o ramo da sua empresa?', type: 'text', placeholder: 'Ex.: clínica, logística, educação…' },
      { id: 'usuarios', label: 'Quem vai usar?', type: 'single', options: ['Equipe interna', 'Meus clientes', 'Os dois'], required: true },
      { id: 'qtd_usuarios', label: 'Quantas pessoas vão usar, mais ou menos?', type: 'select', options: ['Até 5', '6 a 20', '21 a 100', 'Mais de 100', 'Não sei'] },
      { id: 'hoje', label: 'Como isso é feito hoje?', type: 'text', placeholder: 'Ex.: planilha, WhatsApp, outro sistema…' },
      { id: 'modulos', label: 'O que a plataforma precisa ter?', type: 'multi', options: ['Cadastros (clientes, produtos…)', 'Painel com indicadores', 'Relatórios e exportação', 'Financeiro e cobrança', 'Agenda e agendamentos', 'Tarefas e Kanban', 'Notificações (e-mail / WhatsApp)', 'Controle de estoque', 'Outro'] },
      { id: 'perfis', label: 'Vai ter níveis de acesso diferentes?', type: 'single', options: ['Não, todo mundo vê tudo', 'Sim, 2 ou 3 perfis', 'Sim, permissões detalhadas', 'Não sei'] },
      { id: 'dados', label: 'Já existem dados pra importar?', type: 'single', options: ['Sim, em planilha', 'Sim, em outro sistema', 'Não, começa do zero'] },
      { id: 'onde', label: 'Onde vai ser usada?', type: 'multi', options: ['Computador', 'Celular (pelo navegador)', 'App nas lojas (iOS / Android)'] },
      { id: 'integracoes', label: 'Precisa conversar com algum sistema que você já usa?', type: 'text', placeholder: 'Ex.: ERP, CRM, gateway de pagamento…' },
    ],
  },
  {
    id: 'agentes',
    title: 'Agentes de IA',
    pitch: 'Agentes que atendem, qualificam e resolvem, treinados com os documentos e o tom da sua empresa.',
    useCases: [
      'Atendimento no WhatsApp que qualifica lead e passa pro vendedor',
      'Agente que responde com base nos seus documentos (RAG)',
      'Suporte interno para a equipe consultar processos',
      'Vários agentes especializados trabalhando juntos',
    ],
    stack: ['Python', 'LangChain', 'RAG', 'MCP'],
    flow: ['MENSAGEM', 'VENDA'],
    questions: [
      { id: 'canal', label: 'Onde o agente vai atender?', type: 'multi', options: ['WhatsApp', 'Instagram', 'Site', 'Uso interno'], required: true },
      { id: 'funcao', label: 'O que ele precisa fazer?', type: 'multi', options: ['Atender dúvidas', 'Qualificar leads', 'Agendar', 'Suporte', 'Outro'], required: true },
      { id: 'segmento', label: 'Qual é o ramo da sua empresa?', type: 'text', placeholder: 'Ex.: imobiliária, clínica, loja…' },
      { id: 'volume', label: 'Quantas conversas por mês, mais ou menos?', type: 'select', options: ['Menos de 300', '300 a 1.000', '1.000 a 5.000', 'Mais de 5.000', 'Não sei'] },
      { id: 'qtd_agentes', label: 'Quantos agentes você imagina?', type: 'single', options: ['Um só', '2 a 3, cada um com uma função', 'Mais de 3', 'Não sei'] },
      { id: 'base', label: 'De onde o agente vai tirar as respostas?', type: 'multi', options: ['PDFs e documentos', 'Site', 'Planilhas ou catálogo de produtos', 'Sistema ou banco de dados', 'Ainda não tenho nada organizado'] },
      { id: 'acoes', label: 'Além de responder, ele precisa fazer algo?', type: 'multi', options: ['Consultar ou cadastrar no CRM', 'Agendar reunião', 'Enviar link de pagamento ou cobrança', 'Gerar orçamento ou pedido', 'Passar a conversa pra um humano', 'Só responder mesmo'] },
      { id: 'humano', label: 'Tem equipe pra assumir quando o agente passar a conversa?', type: 'single', options: ['Sim', 'Não, o agente tem que resolver sozinho', 'Preciso montar essa equipe'] },
      { id: 'whatsapp_tipo', label: 'Que WhatsApp vai usar, se for o caso?', type: 'single', options: ['API oficial', 'WhatsApp Business (app)', 'WhatsApp comum', 'Ainda não tenho número', 'Não vou usar WhatsApp'] },
      { id: 'crm', label: 'Usa algum CRM ou sistema de atendimento?', type: 'text', placeholder: 'Ex.: Kommo, RD, HubSpot, nenhum…' },
    ],
  },
  {
    id: 'automacoes',
    title: 'Automações de processos',
    pitch: 'Aquela tarefa repetitiva que come horas da equipe, rodando sozinha e sem erro de digitação.',
    useCases: [
      'Lead do formulário cai direto no CRM e no WhatsApp',
      'Relatórios gerados e enviados automaticamente',
      'Integração entre sistemas que não se conversam',
      'Emissão e cobrança sem trabalho manual',
    ],
    stack: ['n8n', 'Make', 'APIs REST', 'Webhooks'],
    flow: ['MANUAL', 'AUTOMÁTICO'],
    questions: [
      { id: 'tarefa', label: 'Qual tarefa você quer automatizar?', type: 'textarea', required: true },
      { id: 'segmento', label: 'Qual é o ramo da sua empresa?', type: 'text', placeholder: 'Ex.: agência, e-commerce, contabilidade…' },
      { id: 'ferramentas', label: 'Quais ferramentas estão envolvidas?', type: 'text', placeholder: 'Ex.: Google Sheets, Gmail, Trello, ERP…' },
      { id: 'gatilho', label: 'O que dispara a automação?', type: 'single', options: ['Um evento (novo lead, pedido, e-mail…)', 'Um horário (todo dia, toda semana…)', 'Alguém apertar um botão', 'Não sei'] },
      { id: 'passos', label: 'Quantos passos tem o processo?', type: 'select', options: ['1 a 3', '4 a 8', 'Mais de 8', 'Não sei'] },
      { id: 'horas', label: 'Quanto tempo isso consome por semana?', type: 'select', options: ['Até 2 horas', '2 a 5 horas', '5 a 10 horas', 'Mais de 10 horas'] },
      { id: 'execucoes', label: 'Quantas vezes por mês isso roda?', type: 'select', options: ['Menos de 100', '100 a 1.000', '1.000 a 10.000', 'Mais de 10.000', 'Não sei'] },
      { id: 'api', label: 'Os sistemas envolvidos têm API ou integração pronta?', type: 'single', options: ['Sim', 'Alguns', 'Não', 'Não sei'] },
      { id: 'extras', label: 'Precisa de algo a mais?', type: 'multi', options: ['Aprovação humana no meio do caminho', 'Alerta de erro no WhatsApp ou e-mail', 'Relatório do que rodou', 'Histórico guardado (log)', 'Uso de IA (ler texto, classificar, resumir)'] },
      { id: 'tentou', label: 'Já tentou automatizar isso antes?', type: 'single', options: ['Não', 'Sim, com Zapier / Make / n8n', 'Sim, com planilha ou script', 'Sim, com outro desenvolvedor'] },
    ],
  },
  {
    id: 'saas',
    title: 'SaaS',
    pitch: 'Do MVP ao produto rodando com login, assinatura e painel, pronto pra receber os primeiros clientes.',
    useCases: [
      'MVP pra validar a ideia com clientes reais',
      'Plataforma multi-empresa com planos e permissões',
      'Marketplace com pagamento integrado',
      'Cobrança recorrente com Stripe ou Pix',
    ],
    stack: ['React', 'Next.js', 'Supabase', 'Stripe'],
    flow: ['IDEIA', 'PRODUTO'],
    questions: [
      { id: 'estagio', label: 'Em que estágio está?', type: 'single', options: ['Só a ideia', 'Validando', 'Já tenho clientes', 'Já tenho produto'], required: true },
      { id: 'publico', label: 'Pra quem é o produto?', type: 'text', required: true },
      { id: 'problema', label: 'Que problema o produto resolve?', type: 'textarea' },
      { id: 'mvp', label: 'Qual é a funcionalidade principal do MVP?', type: 'textarea' },
      { id: 'funcionalidades', label: 'O que o MVP precisa ter?', type: 'multi', options: ['Cadastro e login', 'Painel do usuário', 'Planos e assinatura', 'Várias empresas isoladas (multi-tenant)', 'Painel administrativo', 'Notificações (e-mail / WhatsApp)', 'Integração com outros sistemas', 'Inteligência artificial', 'Relatórios'] },
      { id: 'cobranca', label: 'Como pretende cobrar?', type: 'single', options: ['Assinatura', 'Por uso / comissão', 'Ainda não sei'] },
      { id: 'onde', label: 'Onde vai rodar?', type: 'single', options: ['Site (navegador)', 'App de celular', 'Site e app', 'Não sei'] },
      { id: 'usuarios', label: 'Quantos usuários nos primeiros 6 meses?', type: 'select', options: ['Até 100', '100 a 1.000', '1.000 a 10.000', 'Mais de 10.000', 'Não sei'] },
      { id: 'design', label: 'Já tem design ou protótipo?', type: 'single', options: ['Sim, pronto (Figma)', 'Tenho rascunhos', 'Não, preciso criar', 'Pode seguir um padrão simples'] },
      { id: 'equipe', label: 'Quem mais está no projeto?', type: 'single', options: ['Só eu', 'Tenho sócio técnico', 'Tenho um time de dev', 'Tenho designer'] },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    pitch: 'Loja montada e configurada na Nuvemshop, com pagamento, frete e domínio prontos pra vender.',
    useCases: [
      'Loja completa com a identidade da sua marca',
      'Pix, cartão e boleto configurados',
      'Cálculo de frete e opções de entrega',
      'Treinamento pra você cuidar dos produtos sozinho',
    ],
    stack: ['Nuvemshop', 'Nuvem Pago', 'Domínio', 'Frete'],
    flow: ['INSTAGRAM', 'LOJA'],
    questions: [
      { id: 'produto', label: 'O que você vende?', type: 'text', required: true },
      { id: 'tipo', label: 'Seus produtos são:', type: 'single', options: ['Físicos', 'Digitais', 'Serviços', 'Uma mistura'] },
      { id: 'quantidade', label: 'Quantos produtos, mais ou menos?', type: 'select', options: ['Até 20', '20 a 100', '100 a 500', 'Mais de 500'] },
      { id: 'variacoes', label: 'Os produtos têm variações (tamanho, cor…)?', type: 'single', options: ['Sim, muitas', 'Poucas', 'Não'] },
      { id: 'vende', label: 'Já vende online hoje?', type: 'single', options: ['Pelo Instagram / WhatsApp', 'Em marketplace', 'Ainda não'] },
      { id: 'loja', label: 'Já tem loja montada?', type: 'single', options: ['Não, começo do zero', 'Tenho na Nuvemshop', 'Tenho em outra plataforma', 'Quero migrar de plataforma'] },
      { id: 'material', label: 'Já tem logo e fotos dos produtos?', type: 'single', options: ['Sim', 'Parcialmente', 'Não'] },
      { id: 'entrega', label: 'Como entrega?', type: 'multi', options: ['Correios', 'Transportadora', 'Motoboy / entrega local', 'Retirada na loja', 'Produto digital (sem frete)', 'Ainda não sei'] },
      { id: 'dominio', label: 'Já tem domínio (.com.br)?', type: 'single', options: ['Sim', 'Não', 'Não sei o que é'] },
      { id: 'integracoes', label: 'Precisa integrar com algo?', type: 'multi', options: ['ERP / estoque', 'Nota fiscal', 'WhatsApp', 'Marketplaces', 'Instagram Shop', 'Nada disso'] },
    ],
  },
  {
    id: 'landing',
    title: 'Landing page',
    pitch: 'Uma página rápida e com personalidade, feita pra uma coisa só: fazer o visitante agir.',
    useCases: [
      'Página de vendas de um produto ou serviço',
      'Captura de leads integrada ao seu CRM',
      'Site de apresentação da empresa',
      'Página de evento com inscrição',
    ],
    stack: ['HTML', 'GSAP', 'React', 'Vite'],
    flow: ['VISITA', 'CONTATO'],
    questions: [
      { id: 'objetivo', label: 'Qual o objetivo da página?', type: 'single', options: ['Vender', 'Captar leads', 'Apresentar a empresa', 'Evento'], required: true },
      { id: 'oferta', label: 'O que você vende ou oferece?', type: 'textarea', required: true },
      { id: 'publico', label: 'Quem é o seu público?', type: 'text', placeholder: 'Ex.: donos de restaurante, mães, jovens…' },
      { id: 'paginas', label: 'Quantas páginas?', type: 'select', options: ['Só uma', '2 a 3', '4 a 6', 'Mais de 6'] },
      { id: 'secoes', label: 'O que a página precisa ter?', type: 'multi', options: ['Vídeo', 'Depoimentos', 'Perguntas frequentes', 'Preços ou planos', 'Formulário', 'Botão de WhatsApp', 'Galeria ou portfólio', 'Mapa e endereço'] },
      { id: 'estilo', label: 'Quanto de animação e movimento você quer?', type: 'single', options: ['Simples e rápida', 'Animações sutis', 'Bem marcante, cheia de efeitos', 'Não sei'] },
      { id: 'conteudo', label: 'Já tem textos e imagens?', type: 'single', options: ['Sim', 'Parcialmente', 'Não'] },
      { id: 'textos', label: 'Quem escreve os textos?', type: 'single', options: ['Eu já tenho prontos', 'Quero que você escreva', 'Tenho um rascunho pra ajustar'] },
      { id: 'leads', label: 'Pra onde vão os contatos que chegarem?', type: 'multi', options: ['WhatsApp', 'E-mail', 'CRM', 'Planilha', 'Não sei'] },
      { id: 'dominio', label: 'Já tem domínio?', type: 'single', options: ['Sim', 'Não', 'Não sei o que é'] },
    ],
  },
]

/* Perguntas comuns a todos os serviços (passo 3) */
export const commonQuestions: CommonQuestions = {
  budget: ['Até R$ 1 mil', 'R$ 1 mil a 3 mil', 'R$ 3 mil a 10 mil', 'Acima de R$ 10 mil', 'Ainda não sei'],
  timeline: ['Pra ontem (até 2 semanas)', 'Em 1 mês', 'Em 2 a 3 meses', 'Sem pressa'],
}

export const projects: Project[] = [
  {
    name: 'QueroExtra',
    client: 'Natasha Uchoa Paiva, fundadora do Sushi Boulevard',
    summary: 'Marketplace que conecta freelancers de foodservice a empresas que precisam de mão de obra pra eventos, com pagamento via Pix e saque no mesmo dia.',
    tags: ['SaaS', 'React', 'Supabase', 'Pix'],
  },
  {
    name: 'Clunk',
    client: 'Agência Sales Check',
    summary: 'Plataforma multi-tenant de gestão de projetos e clientes, com Kanban e permissões por módulo. Substituiu o ClickUp da agência.',
    tags: ['SaaS', 'Next.js', 'PostgreSQL', 'Stripe'],
  },
  {
    name: 'Ecossistema de agentes de IA',
    client: 'Imobiliária de grande porte',
    summary: 'Cinco agentes que atendem por empreendimento, consultam plantas e preços via RAG e passam o lead qualificado direto pro corretor no CRM.',
    tags: ['Agentes', 'LangChain', 'RAG', 'Redis'],
  },
  {
    name: 'BI Zion Church',
    client: 'Zion Church Global',
    summary: 'Painel de indicadores integrado ao app da igreja, dando a líderes e pastores números confiáveis pra decidir.',
    tags: ['Plataforma', 'Next.js', 'Edge Functions'],
  },
  {
    name: 'NodePY',
    client: 'Venda ERP',
    summary: 'Automação de workflows 100% na nuvem, usada pelos parceiros da Venda ERP pra automatizar processos nos próprios ERPs.',
    tags: ['Automação', 'Python', 'Flask', 'MongoDB'],
  },
]

export const stack: string[] = ['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Supabase', 'Redis', 'Docker', 'LangChain', 'RAG', 'MCP', 'n8n', 'Make', 'Playwright']

/** Busca um serviço pelo id (ex.: 'agentes'). */
export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id)
}
