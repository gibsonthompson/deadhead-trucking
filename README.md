# Deadhead Trucking LLC — Website & Quote Dashboard

Interstate freight carrier website with a working quote form, SMS notifications, and a protected admin dashboard.

**USDOT 3689437 | MC-1286521 | Aurora, IL**

---

## Tech Stack

- **Next.js 14** (App Router)
- **Supabase** (shared project: `oschjeuhejqibymdaqxw`)
- **Telnyx** (SMS notifications on new quotes)
- **bcryptjs** (dashboard password auth)

---

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/gibsonthompson/deadhead-trucking.git
cd deadhead-trucking
npm install
```

### 2. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
cp .env.local.example .env.local
```

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL` — `https://oschjeuhejqibymdaqxw.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase dashboard
- `SUPABASE_SERVICE_ROLE_KEY` — from Supabase dashboard
- `SESSION_SECRET` — any random 32+ char string

**Optional (for SMS):**
- `TELNYX_API_KEY` — your Telnyx API key
- `TELNYX_FROM_NUMBER` — Telnyx sending number (e.g. `+15055573160`)
- `NOTIFICATION_PHONE` — who receives SMS alerts (default: `+13312644842`)

**Optional (dashboard password):**
- `DASHBOARD_PASSWORD_HASH` — bcrypt hash of your password
- If not set, default password is `deadhead2026`
- Generate a hash: `node -e "require('bcryptjs').hash('YourPassword', 10).then(h => console.log(h))"`

### 3. Run SQL Migration

Go to Supabase SQL Editor and run `supabase-migration.sql` to create the `deadhead_quotes` table.

### 4. Run Dev Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Public website (homepage) |
| `/login` | Dashboard login |
| `/dashboard` | Quote submissions dashboard (protected) |

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/quote` | POST | Submit a quote (saves to DB, sends SMS) |
| `/api/auth/login` | POST | Authenticate with password |
| `/api/auth/logout` | POST | Clear session |
| `/api/auth/check` | GET | Verify session is valid |

---

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables in Vercel project settings
4. Deploy

---

## Domain

The client owns `deadheadtruckingllc.com` (currently parked on Squarespace). Point it to Vercel when ready.
