-- Furry Fairy Points ledger. The ledger is append-only and order awards are idempotent.
create table if not exists public.loyalty_accounts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  points_balance integer not null default 0 check (points_balance >= 0),
  lifetime_points integer not null default 0 check (lifetime_points >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.loyalty_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  points integer not null check (points <> 0),
  source_type text not null,
  source_id text not null,
  description text,
  created_at timestamptz not null default now(),
  unique (source_type, source_id)
);

create index if not exists loyalty_transactions_user_created_idx
  on public.loyalty_transactions (user_id, created_at desc);

alter table public.loyalty_accounts enable row level security;
alter table public.loyalty_transactions enable row level security;

drop policy if exists "Customers can view their own points" on public.loyalty_accounts;
create policy "Customers can view their own points"
  on public.loyalty_accounts for select
  using ((select auth.uid()) = user_id);

drop policy if exists "Customers can view their own points history" on public.loyalty_transactions;
create policy "Customers can view their own points history"
  on public.loyalty_transactions for select
  using ((select auth.uid()) = user_id);

insert into public.loyalty_accounts (user_id)
select id from auth.users
on conflict (user_id) do nothing;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (user_id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (user_id) do nothing;

  insert into public.loyalty_accounts (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

-- Generic, idempotent award used for approved actions such as account creation.
-- It is callable only by the server-side service-role client.
create or replace function public.award_loyalty_action(
  p_user_id uuid,
  p_source_type text,
  p_source_id text,
  p_points integer,
  p_description text default null
)
returns boolean
language plpgsql
security definer set search_path = ''
as $$
declare
  inserted_id uuid;
begin
  if p_user_id is null or p_points <= 0 or nullif(trim(p_source_type), '') is null or nullif(trim(p_source_id), '') is null then
    return false;
  end if;

  insert into public.loyalty_transactions (
    user_id,
    points,
    source_type,
    source_id,
    description
  ) values (
    p_user_id,
    p_points,
    p_source_type,
    p_source_id,
    p_description
  )
  on conflict (source_type, source_id) do nothing
  returning id into inserted_id;

  if inserted_id is null then
    return false;
  end if;

  insert into public.loyalty_accounts (user_id, points_balance, lifetime_points, updated_at)
  values (p_user_id, p_points, p_points, now())
  on conflict (user_id) do update set
    points_balance = public.loyalty_accounts.points_balance + excluded.points_balance,
    lifetime_points = public.loyalty_accounts.lifetime_points + excluded.lifetime_points,
    updated_at = now();

  return true;
end;
$$;

revoke all on function public.award_loyalty_action(uuid, text, text, integer, text) from public;
revoke all on function public.award_loyalty_action(uuid, text, text, integer, text) from anon;
revoke all on function public.award_loyalty_action(uuid, text, text, integer, text) from authenticated;
grant execute on function public.award_loyalty_action(uuid, text, text, integer, text) to service_role;

-- Convenience wrapper called after Stripe confirms payment.
create or replace function public.award_order_points(
  p_user_id uuid,
  p_source_id text,
  p_points integer
)
returns boolean
language sql
security definer set search_path = ''
as $$
  select public.award_loyalty_action(
    p_user_id,
    'stripe_order',
    p_source_id,
    p_points,
    'Points earned from a paid order'
  );
$$;

revoke all on function public.award_order_points(uuid, text, integer) from public;
revoke all on function public.award_order_points(uuid, text, integer) from anon;
revoke all on function public.award_order_points(uuid, text, integer) from authenticated;
grant execute on function public.award_order_points(uuid, text, integer) to service_role;
