# Writing Warm-Up Programme

A daily writing warm-up app for NZ Curriculum Years 5–6 (Phase 2 Writing).  
Built with **React + Vite**, deployed on **Netlify**, data stored in **Supabase**.

---

## What it does

- Select **Term (1–4)**, **Week (1–10)**, **Day (Monday–Friday)** → press **Go**
- Loads the lesson for that day
- Steps through three stages with animated fade transitions:
  - 👁️ **I Do** (~5 min) — Teacher demonstration
  - 🤝 **We Do** (~7 min) — Class practice
  - ✏️ **You Do** (~8 min) — Independent practice
- **Friday** loads a self-assessment writing task instead
- Full-year lesson data built in (Term 1 complete; Terms 2–4 expandable via Supabase)

---

## Project structure

```
writing-warmup/
├── index.html
├── vite.config.js
├── netlify.toml
├── .env.example
├── package.json
├── supabase/
│   └── migrations/
│       └── 001_create_lessons.sql
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   └── global.css
    ├── lib/
    │   ├── supabase.js        ← Supabase client
    │   ├── lessonData.js      ← Full local lesson data (fallback)
    │   └── lessonService.js   ← Fetch/save lesson (Supabase → local fallback)
    └── components/
        ├── SelectorBar.jsx
        ├── LessonHeader.jsx
        ├── StageDisplay.jsx   ← Fade transitions live here
        ├── FridayAssessment.jsx
        └── WelcomeState.jsx
```

---

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Copy env template
cp .env.example .env.local

# 3. Fill in your Supabase credentials (see below)
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_ANON_KEY=...

# 4. Start dev server
npm run dev
```

> **No Supabase yet?** The app works fully with local data — just leave the env vars empty.  
> All Term 1 lessons are built in. Terms 2–4 have representative lessons as fallback.

---

## Supabase setup

1. Go to [supabase.com](https://supabase.com) → New project
2. Open **SQL Editor** → paste contents of `supabase/migrations/001_create_lessons.sql` → Run
3. Go to **Settings → API** → copy your **Project URL** and **anon public key**
4. Paste them into `.env.local`:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### Adding lessons via Supabase

When a lesson exists in the `lessons` table, it overrides the local JS data.  
This lets you edit, add, or refine lessons without touching code.

Use the SQL example in the migration file, or build an admin UI later using `saveLesson()` from `lessonService.js`.

---

## Netlify deployment

1. Push this folder to a GitHub repo
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
3. Build command: `npm run build`  
   Publish directory: `dist`
4. Go to **Site settings → Environment variables** → add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

The `netlify.toml` file handles SPA routing automatically.

---

## Expanding the curriculum

### Option A — Edit local data
Open `src/lib/lessonData.js` and add/edit lesson objects in the `CURRICULUM` object.  
Each lesson follows this shape:

```js
lesson(
  'Topic title',
  'NZ curriculum link',
  {  // I Do
    title: '...',
    instruction: '...',
    example: '...',       // HTML allowed (use <u>, <strong>)
    demonstration: '...',
    tip: '...',
  },
  {  // We Do
    title: '...',
    instruction: '...',
    sentences: ['...', '...'],
    prompt: '...',
  },
  {  // You Do
    title: '...',
    instruction: '...',
    tasks: ['...', '...', '✦ Bonus: ...'],
  }
)
```

### Option B — Add via Supabase
Insert rows into the `lessons` table. The app will prefer Supabase data over local data when a row exists.

---

## Curriculum overview

| Day | Focus |
|-----|-------|
| Monday | Vocabulary & Punctuation |
| Tuesday | Grammar |
| Wednesday | Sentence Building |
| Thursday | Editing & Craft |
| Friday | Weekly Assessment |

**Spiral design:** Each skill domain is revisited once per term (4 times across the year) with fresh sentences and contexts each time.

**Lesson structure:** Every lesson targets ~20 minutes total:
- I Do: ~5 minutes
- We Do: ~7 minutes  
- You Do: ~8 minutes

---

## Future additions

- [ ] Progress tracking (Supabase — record which lessons have been completed)
- [ ] Admin lesson editor UI (form to add/edit lessons without SQL)
- [ ] Student login for individual progress
- [ ] Print view for each lesson
- [ ] Export lesson plan as PDF
