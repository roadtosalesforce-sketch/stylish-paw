-- Furry Fairy Pets customer accounts and order history.
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  default_inpost_point text,
  stripe_customer_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  stripe_session_id text not null unique,
  stripe_payment_intent_id text,
  customer_email text,
  status text not null default 'unpaid',
  currency text not null default 'pln',
  amount_total integer not null default 0 check (amount_total >= 0),
  shipping_method text,
  inpost_point text,
  inpost_point_address text,
  items jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.orders enable row level security;

drop policy if exists "Customers can view their own profile" on public.profiles;
create policy "Customers can view their own profile"
  on public.profiles for select
  using ((select auth.uid()) = user_id);

drop policy if exists "Customers can update their own profile" on public.profiles;
create policy "Customers can update their own profile"
  on public.profiles for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Customers can view their own orders" on public.orders;
create policy "Customers can view their own orders"
  on public.orders for select
  using ((select auth.uid()) = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (user_id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create index if not exists orders_user_id_created_at_idx
  on public.orders (user_id, created_at desc);
