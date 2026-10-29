-- Require first-access password change for the Consult site administrator.
-- Never store the initial password in source control; provision it through Supabase Auth.

alter table public.profiles
  add column if not exists must_change_password boolean not null default false;
alter table public.profiles
  add column if not exists password_changed_at timestamptz;

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
   where id = auth.uid()
     and must_change_password = true;

  get diagnostics changed_rows = row_count;
  return changed_rows = 1;
end;
$$;

revoke all on function public.complete_first_access() from public;
grant execute on function public.complete_first_access() to authenticated;

do $$
declare
  target_user_id uuid;
begin
  select id into target_user_id
    from auth.users
   where lower(email) = lower('guilherme@figueiramarketing.com.br');

  if target_user_id is null then
    raise exception 'Consult administrator Auth user does not exist';
  end if;

  update public.profiles
     set platform_role = 'admin',
         is_active = true,
         must_change_password = true,
         password_changed_at = null
   where id = target_user_id;

  if not found then
    raise exception 'Consult administrator profile does not exist';
  end if;
end;
$$;

-- The application forces a password change before rendering the editorial UI.
-- This restrictive policy also blocks authenticated direct access to editorial
-- records until the profile flag is cleared by the first-access flow.
drop policy if exists site_posts_require_first_access_password_change on public.site_posts;
create policy site_posts_require_first_access_password_change
  on public.site_posts as restrictive for all to authenticated
  using (
    exists (
      select 1 from public.profiles p
       where p.id = auth.uid()
         and p.is_active = true
         and p.must_change_password = false
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
       where p.id = auth.uid()
         and p.is_active = true
         and p.must_change_password = false
    )
  );
