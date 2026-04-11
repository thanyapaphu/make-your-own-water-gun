-- Run in Supabase → SQL Editor. Creates tables for:
-- 1) Each step choice (body / tank / accessory) as the user taps
-- 2) One row when they reach the result screen (full combo + optional name)
-- Anonymous inserts only (see RLS); use Table Editor or service role to read data.
--
-- Safe to re-run: IF NOT EXISTS / IF NOT EXISTS columns / drop policy if exists.

-- ----- water_gun_completions -----
create table if not exists public.water_gun_completions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id text,
  player_name text,
  body_id text,
  body_title text,
  tank_id text,
  tank_title text,
  acc_id text,
  acc_title text,
  combo_key text not null
);

-- Existing projects: table may have been created without newer columns — add before comments.
alter table public.water_gun_completions add column if not exists session_id text;
alter table public.water_gun_completions add column if not exists body_title text;
alter table public.water_gun_completions add column if not exists tank_title text;
alter table public.water_gun_completions add column if not exists acc_title text;

comment on table public.water_gun_completions is 'One row per finished run: the name they typed plus each part (IDs + human-readable titles).';

comment on column public.water_gun_completions.player_name is 'Name from the name screen.';
comment on column public.water_gun_completions.body_id is 'Internal id, e.g. body1.';
comment on column public.water_gun_completions.body_title is 'Label shown in the app, e.g. Black Gun.';
comment on column public.water_gun_completions.tank_id is 'Internal id, e.g. tank1.';
comment on column public.water_gun_completions.tank_title is 'Label shown in the app.';
comment on column public.water_gun_completions.acc_id is 'Internal id, e.g. acc1.';
comment on column public.water_gun_completions.acc_title is 'Label shown in the app.';
comment on column public.water_gun_completions.combo_key is 'Single string key body-acc-tank for developers.';

create index if not exists water_gun_completions_created_at_idx
  on public.water_gun_completions (created_at desc);

create index if not exists water_gun_completions_session_id_idx
  on public.water_gun_completions (session_id);

alter table public.water_gun_completions enable row level security;

grant usage on schema public to anon;
grant insert on table public.water_gun_completions to anon;

drop policy if exists "water_gun_completions_anon_insert" on public.water_gun_completions;
create policy "water_gun_completions_anon_insert"
  on public.water_gun_completions
  for insert
  to anon
  with check (true);

-- ----- water_gun_step_picks -----
create table if not exists public.water_gun_step_picks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id text not null,
  step smallint not null check (step >= 1 and step <= 3),
  step_name text not null,
  choice_id text not null,
  choice_title text,
  player_name text
);

-- Older installs: table may lack these columns — add before comments.
alter table public.water_gun_step_picks add column if not exists step_name text;
alter table public.water_gun_step_picks add column if not exists choice_title text;
alter table public.water_gun_step_picks add column if not exists player_name text;

comment on table public.water_gun_step_picks is 'Each tap on a choice: who (player_name), which step (step_name), and what (choice_title + choice_id).';

comment on column public.water_gun_step_picks.step is '1 = body, 2 = tank, 3 = accessory.';
comment on column public.water_gun_step_picks.step_name is 'body, tank, or accessory — easier to read than step alone.';
comment on column public.water_gun_step_picks.choice_id is 'Internal id, e.g. body1.';
comment on column public.water_gun_step_picks.choice_title is 'Same label as in the app, e.g. Black Gun.';
comment on column public.water_gun_step_picks.player_name is 'Name they entered before step 1.';

create index if not exists water_gun_step_picks_created_at_idx
  on public.water_gun_step_picks (created_at desc);

create index if not exists water_gun_step_picks_session_id_idx
  on public.water_gun_step_picks (session_id);

alter table public.water_gun_step_picks enable row level security;

grant insert on table public.water_gun_step_picks to anon;

drop policy if exists "water_gun_step_picks_anon_insert" on public.water_gun_step_picks;
create policy "water_gun_step_picks_anon_insert"
  on public.water_gun_step_picks
  for insert
  to anon
  with check (true);
