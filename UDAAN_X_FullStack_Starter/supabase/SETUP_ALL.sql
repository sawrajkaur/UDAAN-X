-- UDAAN X v1.0.2 — complete initial Supabase setup
-- Run this ONCE in the NEW UDAAN-X Supabase project:
-- Dashboard > SQL Editor > New query > paste entire file > Run.
-- This schema matches the application code in this package.

begin;

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'user' check (role in ('user','admin')),
  preferred_language text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'New conversation',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 240),
  is_done boolean not null default false,
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  content text not null,
  consented_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.uploaded_files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  storage_path text not null,
  original_name text not null,
  mime_type text,
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.usage_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  feature text not null,
  model text,
  input_tokens integer not null default 0 check (input_tokens >= 0),
  output_tokens integer not null default 0 check (output_tokens >= 0),
  estimated_cost numeric(12,6) not null default 0 check (estimated_cost >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  plan text not null default 'free',
  status text not null default 'inactive',
  provider text,
  provider_customer_id text,
  provider_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  target_type text,
  target_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists conversations_user_updated_idx
  on public.conversations(user_id, updated_at desc);
create index if not exists messages_conversation_created_idx
  on public.messages(conversation_id, created_at asc);
create index if not exists memories_user_created_idx
  on public.memories(user_id, created_at desc);
create index if not exists usage_records_user_created_idx
  on public.usage_records(user_id, created_at desc);
create index if not exists tasks_user_created_idx
  on public.tasks(user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.tasks enable row level security;
alter table public.memories enable row level security;
alter table public.uploaded_files enable row level security;
alter table public.usage_records enable row level security;
alter table public.subscriptions enable row level security;
alter table public.audit_logs enable row level security;

-- Remove/recreate named policies so this setup script can be safely rerun.
drop policy if exists "profiles read own" on public.profiles;
create policy "profiles read own" on public.profiles
  for select to authenticated using (auth.uid() = id);

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- Column grants prevent users from changing the role column.
revoke update on table public.profiles from public, anon, authenticated;
grant select on public.profiles to authenticated;
grant update (display_name, preferred_language, updated_at)
  on public.profiles to authenticated;

drop policy if exists "conversations own all" on public.conversations;
create policy "conversations own all" on public.conversations
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "messages own all" on public.messages;
create policy "messages own all" on public.messages
  for all to authenticated using (
    auth.uid() = user_id and exists (
      select 1 from public.conversations c
      where c.id = conversation_id and c.user_id = auth.uid()
    )
  ) with check (
    auth.uid() = user_id and exists (
      select 1 from public.conversations c
      where c.id = conversation_id and c.user_id = auth.uid()
    )
  );

drop policy if exists "tasks own all" on public.tasks;
create policy "tasks own all" on public.tasks
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "memories own all" on public.memories;
create policy "memories own all" on public.memories
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "files own all" on public.uploaded_files;
create policy "files own all" on public.uploaded_files
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "usage read own" on public.usage_records;
create policy "usage read own" on public.usage_records
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "usage insert own" on public.usage_records;
create policy "usage insert own" on public.usage_records
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "subscription read own" on public.subscriptions;
create policy "subscription read own" on public.subscriptions
  for select to authenticated using (auth.uid() = user_id);

-- No client policies for audit_logs: trusted server-side writes only.
revoke all on public.audit_logs from anon, authenticated;

-- Ensure profile/subscription records are created for every new auth user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name',
             new.raw_user_meta_data->>'name',
             '')
  )
  on conflict (id) do nothing;

  insert into public.subscriptions (user_id, plan, status)
  values (new.id, 'free', 'active')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

grant usage on schema public to authenticated;
grant select, insert, update, delete on
  public.conversations, public.messages, public.tasks, public.memories, public.uploaded_files
  to authenticated;
grant select on public.usage_records, public.subscriptions to authenticated;

commit;

-- Storage note:
-- Current application processes image/document uploads in request memory and does
-- not require a Storage bucket. Create a private bucket only when persistent uploads
-- are implemented, with per-user folder policies.
