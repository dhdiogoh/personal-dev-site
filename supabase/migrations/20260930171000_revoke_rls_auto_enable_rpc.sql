-- Função de gatilho (ensure_rls) que liga RLS em tabelas novas. Não precisa ser chamável via /rest/v1/rpc.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
