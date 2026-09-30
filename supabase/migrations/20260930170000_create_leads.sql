-- Leads do formulário do site. Visitante anônimo só pode INSERIR; leitura só via dashboard / service_role.
create table public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  service       text not null,
  service_title text not null,
  answers       jsonb not null default '{}'::jsonb,
  name          text not null,
  whatsapp      text not null,
  email         text,
  budget        text,
  timeline      text,
  message       text,
  source        text default 'site',
  status        text not null default 'novo',

  constraint leads_name_len          check (char_length(name) between 1 and 120),
  constraint leads_whatsapp_len      check (char_length(whatsapp) <= 30),
  constraint leads_email_len         check (email is null or char_length(email) <= 200),
  constraint leads_message_len       check (message is null or char_length(message) <= 2000),
  constraint leads_answers_is_object check (jsonb_typeof(answers) = 'object'),
  constraint leads_answers_size      check (pg_column_size(answers) <= 8192),
  constraint leads_service_len       check (char_length(service) <= 50),
  constraint leads_service_title_len check (char_length(service_title) <= 120),
  constraint leads_budget_len        check (budget is null or char_length(budget) <= 100),
  constraint leads_timeline_len      check (timeline is null or char_length(timeline) <= 100),
  constraint leads_source_len        check (source is null or char_length(source) <= 30),
  constraint leads_status_len        check (char_length(status) <= 30)
);

comment on table public.leads is 'Leads do formulario do site pessoal. Anon so pode INSERT (status=novo, source=site); leitura apenas via service_role/dashboard.';

alter table public.leads enable row level security;

-- anon insere, mas não consegue forjar campos de fluxo
create policy "anon_insert_leads" on public.leads
  for insert to anon
  with check (status = 'novo' and source = 'site');

-- INSERT sem RETURNING não precisa de SELECT
revoke all on public.leads from anon;
revoke all on public.leads from authenticated;
grant insert on public.leads to anon;
