-- UDAAN X initial schema. Run in Supabase SQL Editor.
-- Review policies and test with separate user accounts before production.

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
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create table if not exists public.usage_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  feature text not null,
  model text,
  input_tokens integer default 0,
  output_tokens integer default 0,
  estimated_cost numeric(12,6) default 0,
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

alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.tasks enable row level security;
alter table public.memories enable row level security;
alter table public.uploaded_files enable row level security;
alter table public.usage_records enable row level security;
alter table public.subscriptions enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles read own" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profiles update own" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
-- Prevent authenticated users from changing privileged columns such as role.
revoke update on table public.profiles from public, anon, authenticated;
grant update (display_name, preferred_language, updated_at) on table public.profiles to authenticated;
create policy "conversations own all" on public.conversations for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "messages own all" on public.messages for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "tasks own all" on public.tasks for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "memories own all" on public.memories for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "files own all" on public.uploaded_files for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "usage read own" on public.usage_records for select to authenticated using (auth.uid() = user_id);
create policy "usage insert own" on public.usage_records for insert to authenticated with check (auth.uid() = user_id);
create policy "subscription read own" on public.subscriptions for select to authenticated using (auth.uid() = user_id);
-- Audit logs intentionally have no client policies. Write from trusted server-side code only.

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name',''));
  insert into public.subscriptions (user_id, plan, status) values (new.id, 'free', 'active');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Storage bucket: create a PRIVATE bucket named "user-files" in Supabase Storage.
-- Add storage policies restricting each object to the authenticated user's folder:
-- bucket_id = 'user-files' AND (storage.foldername(name))[1] = auth.uid()::text
