-- Consult blog motor: tenant-scoped schema and least-privilege access.
-- Versioned fixture only. Do not apply from this checkout or against production.

create table if not exists public.site_posts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  slug text not null,
  status text not null default 'draft',
  title text not null,
  excerpt text,
  content_markdown text,
  category text,
  cover_url text,
  author text,
  source_url text,
  related_links jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  is_public boolean not null default false,
  published_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.site_posts add column if not exists client_id uuid;
alter table public.site_posts add column if not exists project_id uuid;
alter table public.site_posts add column if not exists slug text;
alter table public.site_posts add column if not exists status text;
alter table public.site_posts add column if not exists title text;
alter table public.site_posts add column if not exists excerpt text;
alter table public.site_posts add column if not exists content_markdown text;
alter table public.site_posts add column if not exists category text;
alter table public.site_posts add column if not exists cover_url text;
alter table public.site_posts add column if not exists author text;
alter table public.site_posts add column if not exists source_url text;
alter table public.site_posts add column if not exists related_links jsonb;
alter table public.site_posts add column if not exists seo_title text;
alter table public.site_posts add column if not exists seo_description text;
alter table public.site_posts add column if not exists is_public boolean;
alter table public.site_posts add column if not exists published_at timestamptz;
alter table public.site_posts add column if not exists metadata jsonb;
alter table public.site_posts add column if not exists created_at timestamptz;
alter table public.site_posts add column if not exists updated_at timestamptz;

alter table public.site_posts alter column status set default 'draft';
alter table public.site_posts alter column is_public set default false;
alter table public.site_posts alter column related_links set default '[]'::jsonb;
alter table public.site_posts alter column metadata set default '{}'::jsonb;
alter table public.site_posts alter column created_at set default now();
alter table public.site_posts alter column updated_at set default now();

create unique index if not exists site_posts_client_project_slug_idx
  on public.site_posts (client_id, project_id, slug);
create index if not exists site_posts_client_project_updated_idx
  on public.site_posts (client_id, project_id, updated_at desc);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.site_posts'::regclass
      and conname = 'site_posts_client_project_slug_key'
  ) then
    alter table public.site_posts
      add constraint site_posts_client_project_slug_key
      unique using index site_posts_client_project_slug_idx;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.site_posts'::regclass
      and conname = 'site_posts_status_check'
  ) then
    alter table public.site_posts
      add constraint site_posts_status_check
      check (status in ('draft', 'review', 'published')) not valid;
  end if;
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.site_posts'::regclass
      and conname = 'site_posts_public_state_check'
  ) then
    alter table public.site_posts
      add constraint site_posts_public_state_check
      check ((status = 'published' and is_public = true) or (status <> 'published' and is_public = false)) not valid;
  end if;
end $$;

-- The flag is cleared only by the narrow authenticated RPC after Auth accepts a new password.
alter table public.profiles add column if not exists must_change_password boolean not null default false;
alter table public.profiles add column if not exists password_changed_at timestamptz;

create or replace function public.complete_first_access()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  changed_rows integer;
begin
  if auth.uid() is null then
    return false;
  end if;
  update public.profiles
     set must_change_password = false,
         password_changed_at = now()
   where id = auth.uid();
  get diagnostics changed_rows = row_count;
  return changed_rows = 1;
end;
$$;

revoke all on function public.complete_first_access() from public;
grant execute on function public.complete_first_access() to authenticated;

create or replace function public.site_posts_is_internal()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and is_active = true
      and platform_role in ('admin', 'staff')
  );
$$;

create or replace function public.site_posts_can_read(p_client_id uuid, p_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.site_posts_is_internal()
      or exists (
        select 1
        from public.client_users cu
        join public.projects pr on pr.client_id = cu.client_id
        where cu.user_id = auth.uid()
          and cu.client_id = p_client_id
          and cu.is_active = true
          and pr.id = p_project_id
      );
$$;

create or replace function public.site_posts_can_write(p_client_id uuid, p_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.site_posts_is_internal()
      or exists (
        select 1
        from public.client_users cu
        join public.clients c on c.id = cu.client_id
        join public.projects pr on pr.client_id = cu.client_id
        where cu.user_id = auth.uid()
          and cu.client_id = p_client_id
          and cu.role in ('owner', 'manager')
          and cu.is_active = true
          and c.slug = 'consult'
          and pr.id = p_project_id
      );
$$;

revoke all on function public.site_posts_is_internal() from public;
revoke all on function public.site_posts_can_read(uuid, uuid) from public;
revoke all on function public.site_posts_can_write(uuid, uuid) from public;
grant execute on function public.site_posts_is_internal() to authenticated;
grant execute on function public.site_posts_can_read(uuid, uuid) to authenticated;
grant execute on function public.site_posts_can_write(uuid, uuid) to authenticated;

alter table public.site_posts enable row level security;
grant select on public.site_posts to anon;
revoke all on public.site_posts from authenticated;
grant select, insert, update, delete on public.site_posts to authenticated;

drop policy if exists site_posts_public_read on public.site_posts;
create policy site_posts_public_read
  on public.site_posts for select to anon, authenticated
  using (status = 'published' and is_public = true);

drop policy if exists site_posts_select_scoped on public.site_posts;
create policy site_posts_select_scoped
  on public.site_posts for select to authenticated
  using (public.site_posts_can_read(client_id, project_id));

drop policy if exists site_posts_insert_scoped on public.site_posts;
create policy site_posts_insert_scoped
  on public.site_posts for insert to authenticated
  with check (public.site_posts_can_write(client_id, project_id));

drop policy if exists site_posts_update_scoped on public.site_posts;
create policy site_posts_update_scoped
  on public.site_posts for update to authenticated
  using (public.site_posts_can_write(client_id, project_id))
  with check (public.site_posts_can_write(client_id, project_id));

drop policy if exists site_posts_delete_scoped on public.site_posts;
create policy site_posts_delete_scoped
  on public.site_posts for delete to authenticated
  using (public.site_posts_can_write(client_id, project_id));

comment on table public.site_posts is 'Tenant-scoped Consult editorial posts. Drafts and review records are private; ingestion can only upsert drafts.';
