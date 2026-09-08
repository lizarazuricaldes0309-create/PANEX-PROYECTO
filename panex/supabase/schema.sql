-- ============================================================
-- PANEX — Esquema de base de datos para Supabase
-- Copia y pega este archivo completo en:
-- Supabase -> SQL Editor -> New query -> Run
-- ============================================================

-- Extensión necesaria para generar UUIDs
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- 1) PERFILES DE CLIENTES
-- Se llena automáticamente cuando alguien se registra (auth.users)
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  phone_country text,       -- ej: "BO", "AR", "PE"
  login_method text,        -- "google" | "email" | "phone"
  is_admin boolean default false,
  loyalty_points integer default 0,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "Los usuarios ven su propio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Los usuarios actualizan su propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Los usuarios crean su propio perfil"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Crea automáticamente un perfil cuando alguien se registra
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    new.raw_user_meta_data->>'phone'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------
-- 2) CATEGORÍAS DE PAN (secciones de la tienda)
-- ------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  sort_order integer default 0
);

alter table public.categories enable row level security;
create policy "Cualquiera puede ver categorías" on public.categories for select using (true);

-- ------------------------------------------------------------
-- 3) PRODUCTOS (panes) — administrables desde el panel admin
-- ------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,          -- de qué está hecho, ingredientes
  category_id uuid references public.categories(id),
  price numeric(10,2) not null,
  image_url text,
  stock integer default 100,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

alter table public.products enable row level security;

create policy "Cualquiera puede ver productos activos"
  on public.products for select
  using (is_active = true);

create policy "Los administradores gestionan productos"
  on public.products for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- ------------------------------------------------------------
-- 4) MÉTODOS DE PAGO (efectivo, QR, transferencia)
-- El admin sube su QR y se guarda aquí
-- ------------------------------------------------------------
create table if not exists public.payment_methods (
  id uuid primary key default uuid_generate_v4(),
  name text not null,          -- "QR Simple", "Efectivo", "Transferencia"
  type text not null,          -- "qr" | "cash" | "transfer"
  qr_image_url text,
  account_details text,
  is_active boolean default true
);

alter table public.payment_methods enable row level security;
create policy "Cualquiera puede ver métodos de pago activos"
  on public.payment_methods for select using (is_active = true);
create policy "Los administradores gestionan métodos de pago"
  on public.payment_methods for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- ------------------------------------------------------------
-- 5) PEDIDOS
-- ------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id),
  customer_name text not null,
  customer_phone text,
  items jsonb not null,          -- [{product_id, name, quantity, unit_price}]
  total numeric(10,2) not null,
  payment_method text,
  status text default 'pendiente',  -- pendiente | confirmado | entregado | cancelado
  whatsapp_sent boolean default false,
  created_at timestamp with time zone default now()
);

alter table public.orders enable row level security;

create policy "Los usuarios ven sus propios pedidos"
  on public.orders for select
  using (auth.uid() = user_id or exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

create policy "Cualquiera puede crear un pedido"
  on public.orders for insert
  with check (true);

create policy "Los administradores actualizan pedidos"
  on public.orders for update
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- ------------------------------------------------------------
-- 6) RESEÑAS DE CLIENTES
-- ------------------------------------------------------------
create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id),
  customer_name text not null,
  order_id uuid references public.orders(id),
  rating integer check (rating between 1 and 5) not null,
  comment text,
  created_at timestamp with time zone default now()
);

alter table public.reviews enable row level security;
create policy "Cualquiera puede ver reseñas" on public.reviews for select using (true);
create policy "Los usuarios autenticados crean reseñas"
  on public.reviews for insert
  with check (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 7) DATOS INICIALES — categorías de pan boliviano
-- ------------------------------------------------------------
insert into public.categories (name, slug, description, sort_order) values
  ('Panes tradicionales',   'tradicionales',  'Los clásicos de toda la vida, de panadería de barrio', 1),
  ('Panes dulces',          'dulces',         'Para el desayuno o la merienda con algo dulce',        2),
  ('Panes rellenos',        'rellenos',       'Salteñas, empanadas y panes con relleno salado',       3),
  ('Panes integrales y andinos', 'andinos',   'Con quinua, maíz, trigo integral y otros granos andinos', 4),
  ('Panes de fiesta y horno especial', 'especiales', 'Para ocasiones especiales y pedidos grandes',    5)
on conflict (slug) do nothing;

-- Nota: los productos (panes) se cargan desde src/data/breads.js la primera vez,
-- o puedes insertarlos tú mismo aquí con "insert into public.products (...) values (...)".
