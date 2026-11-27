-- UDAAN X v1.0 additive migration. Safe to run after the original schema.sql.
-- Run in Supabase SQL Editor while signed in as project owner.

create index if not exists conversations_user_updated_idx
  on public.conversations (user_id, updated_at desc);
create index if not exists messages_conversation_created_idx
  on public.messages (conversation_id, created_at asc);
create index if not exists memories_user_created_idx
  on public.memories (user_id, created_at desc);
create index if not exists usage_records_user_created_idx
  on public.usage_records (user_id, created_at desc);

alter table public.memories
  add column if not exists consented_at timestamptz not null default now();

alter table public.usage_records enable row level security;
drop policy if exists "usage insert own" on public.usage_records;
create policy "usage insert own" on public.usage_records
  for insert to authenticated with check (auth.uid() = user_id);

-- The existing owner-only SELECT/INSERT/DELETE policies on memories remain in force.
-- No public or anonymous access is granted by this migration.
