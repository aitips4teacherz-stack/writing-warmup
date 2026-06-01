-- ============================================================
-- Writing Warm-Up: Supabase schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Lessons table
create table if not exists public.lessons (
  id          bigint generated always as identity primary key,
  term        int not null check (term between 1 and 4),
  week        int not null check (week between 1 and 10),
  day         text not null check (day in ('Monday','Tuesday','Wednesday','Thursday','Friday')),
  topic       text not null,
  nz_link     text,
  i_do        jsonb,
  we_do       jsonb,
  you_do      jsonb,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now(),
  constraint lessons_term_week_day_key unique (term, week, day)
);

-- Enable RLS
alter table public.lessons enable row level security;

-- Public read policy (anyone can read lessons — no login needed)
create policy "Public read"
  on public.lessons
  for select
  using (true);

-- Authenticated write policy (only logged-in users can add/edit lessons)
create policy "Authenticated write"
  on public.lessons
  for all
  using (auth.role() = 'authenticated');

-- Helpful index
create index if not exists lessons_term_week_day_idx
  on public.lessons (term, week, day);

-- ============================================================
-- EXAMPLE: Insert a single lesson row
-- (The app falls back to local JS data when rows don't exist)
-- ============================================================
/*
insert into public.lessons (term, week, day, topic, nz_link, i_do, we_do, you_do)
values (
  1, 1, 'Monday',
  'Tier 2 vocabulary: descriptive adjectives',
  'Use precise words to describe',
  '{
    "title": "I Do — Watch Me Choose Better Words",
    "instruction": "I am going to show you how to swap a plain word for a much more interesting one.",
    "example": "The <u>big</u> dog ran across the field.",
    "demonstration": "Instead of big I could say: enormous, muscular, towering, hulking.",
    "tip": "Ask yourself: Does this word paint a picture? If not, upgrade it."
  }'::jsonb,
  '{
    "title": "We Do — Upgrade Together",
    "instruction": "Let us upgrade the plain adjectives in these sentences together.",
    "sentences": [
      "The <u>nice</u> sunset filled the sky with colour.",
      "She wore a <u>pretty</u> dress to the concert.",
      "It was a <u>bad</u> storm that hit the town."
    ],
    "prompt": "What word could replace the underlined one? Why is your choice better?"
  }'::jsonb,
  '{
    "title": "You Do — Your Turn",
    "instruction": "Rewrite each sentence by replacing the plain adjective with a stronger one.",
    "tasks": [
      "The <u>old</u> bridge creaked in the wind.",
      "We climbed a <u>high</u> mountain on our trip.",
      "The puppy had a <u>soft</u> coat.",
      "✦ Bonus: Write your own sentence using two vivid adjectives."
    ]
  }'::jsonb
);
*/
