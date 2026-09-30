# personal-dev-site

Site pessoal de **Diogo Henrique**, desenvolvedor full stack e engenheiro de IA em Belém do Pará.
Não é um portfólio com CV: é uma página que vende serviços (plataformas, agentes de IA, automações, SaaS,
e-commerce e landing pages) e termina em um **pré-briefing de 3 passos** que grava o lead no Supabase.

![React](https://img.shields.io/badge/React-18-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-RLS-3ecf8e?logo=supabase&logoColor=white)

## Sumário

- [Funcionalidades](#funcionalidades)
- [Stack](#stack)
- [Começando](#começando)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts](#scripts)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como editar o conteúdo](#como-editar-o-conteúdo)
- [Supabase](#supabase)
- [Animações e acessibilidade](#animações-e-acessibilidade)
- [Deploy](#deploy)
- [Convenções de versionamento](#convenções-de-versionamento)
- [Próximos passos](#próximos-passos)

## Funcionalidades

- Página única com hero, serviços, projetos, sobre e contato.
- **Formulário de pré-briefing em 3 passos**: serviço → perguntas do serviço (até 10) → contato, orçamento e prazo.
  O botão "Quero esse" de cada card já abre o formulário no serviço escolhido.
- Envio direto para o Supabase. Se o envio falhar, o visitante ainda consegue mandar o resumo pelo WhatsApp.
- Honeypot contra bots, validação no cliente e limites de tamanho no banco.
- Animações com GSAP + scroll suave (Lenis) só no desktop, respeitando `prefers-reduced-motion`.

## Stack

| Camada | Tecnologias |
|---|---|
| UI | React 18, TypeScript (strict), CSS Modules |
| Build | Vite |
| Animação | GSAP, `@gsap/react` (`useGSAP`), ScrollTrigger, Lenis |
| Backend | Supabase (Postgres + RLS), `@supabase/supabase-js` |
| Qualidade | oxlint, `tsc -b` |

## Começando

Pré-requisitos: Node.js 20.19+ (ou 22.12+) e npm.

```bash
git clone https://github.com/dhdiogoh/personal-dev-site.git
cd personal-dev-site
npm install
cp .env.example .env.local   # preencha as duas variáveis (veja abaixo)
npm run dev
```

O site abre em `http://localhost:5173`. Sem as variáveis de ambiente o site renderiza normalmente e o
formulário cai no fluxo do WhatsApp, sem gravar no banco.

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave **publishable/anon** do projeto |

> Use só a chave pública no front. **Nunca** coloque a `service_role` no front nem em arquivo commitado.
> `.env.local` está no `.gitignore`.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Checagem de tipos (`tsc -b`) + build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Lint com oxlint |

## Estrutura do projeto

```
.
├── public/assets/            retrato e logo
├── supabase/migrations/      SQL da tabela leads (fonte da verdade do banco)
└── src/
    ├── components/           uma seção por componente + CSS Module
    │   ├── Nav · Hero · Services · Projects · About · Contact · Footer
    │   └── LeadForm          formulário em 3 passos (useReducer)
    ├── context/LeadIntent    liga o "Quero esse" dos cards ao formulário, sem tocar no DOM
    ├── data/site.ts          TODO o conteúdo: perfil, serviços, perguntas, projetos, stack
    ├── hooks/                useSmoothScroll (Lenis + ScrollTrigger)
    ├── lib/
    │   ├── supabase.ts       client (null se faltarem as envs)
    │   ├── leads.ts          submitLead() → insert em `leads`
    │   ├── whatsapp.ts       resumo do pedido em link do WhatsApp (fallback)
    │   ├── gsap.ts           registro único dos plugins + helpers de animação
    │   └── scroll.ts         rolagem até âncoras respeitando a nav
    ├── styles/tokens.css     tokens (:root) e classes globais
    └── types/                tipos do domínio e tipos gerados do banco
```

## Como editar o conteúdo

Tudo que é texto mora em [`src/data/site.ts`](src/data/site.ts):

- **Serviços**: título, pitch, casos de uso e as **perguntas do passo 2** (`questions`).
- **Tipos de pergunta**: `text`, `textarea`, `single`, `multi` e `select`. A pergunta só é obrigatória com `required: true`.
- **Projetos** e a **stack** da ficha técnica (seção "Sobre"): as tecnologias aparecem só ali.
- **Perfil**: e-mail, WhatsApp e links sociais.

Mantenha o formulário enxuto (até 10 perguntas por serviço): é um pré-briefing, o restante fica para a conversa.

## Supabase

A tabela `public.leads` é criada por [`supabase/migrations`](supabase/migrations). Regras de segurança:

- **RLS ligado**; o visitante (`anon`) tem **apenas INSERT**, e só com `status = 'novo'` e `source = 'site'`.
- Nenhuma policy de SELECT, UPDATE ou DELETE para `anon`: os leads só são lidos pelo dashboard ou `service_role`.
- `CHECK`s de tamanho em todos os campos de texto e no `answers` (jsonb, até 8 KB).
- O front faz `insert` **sem** `.select()`, já que o anon não pode ler.

Para criar o banco em outro projeto, rode as migrations em ordem (SQL Editor ou `supabase db push`).
Para gerar os tipos novamente: `supabase gen types typescript --project-id <ref> > src/types/database.ts`.

## Animações e acessibilidade

- Nada fica invisível por CSS: os estados iniciais das animações são definidos em runtime pelo GSAP.
- Com `prefers-reduced-motion: reduce` não há animação nem Lenis.
- Lenis só no desktop; o retrato que acompanha o mouse também.
- Link "Pular para o conteúdo", foco visível e `aria-*` nos controles do menu e do formulário.

## Deploy

Hospedagem na **Vercel** (detecta Vite automaticamente).

1. Importe o repositório em [vercel.com/new](https://vercel.com/new).
2. Em *Settings → Environment Variables*, cadastre `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
3. Build: `npm run build` · Saída: `dist`.

Variáveis `VITE_*` são embutidas no build: depois de alterá-las, faça um novo deploy.

## Convenções de versionamento

- Branch principal: `main`. Trabalho novo em branches `feat/…`, `fix/…`, `chore/…`, `docs/…`, integradas por pull request.
- Commits no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/):
  `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `build:`, `chore:`.
- Um commit por mudança lógica, com mensagem no imperativo.
- Mudanças de banco entram **sempre** como nova migration em `supabase/migrations`, nunca editando uma já aplicada.
- Segredos nunca entram no repositório (`.env*.local` é ignorado).

## Próximos passos

- Olhos do retrato seguindo o mouse (hoje o retrato inteiro acompanha; precisa de versão sem pupilas + pupilas em camada separada).
- Vídeo em loop do retrato (opcional).
- Aviso no WhatsApp quando entrar lead novo (webhook do Supabase ou n8n).
- Projeto Supabase separado para produção.
