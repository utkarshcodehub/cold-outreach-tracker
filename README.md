# Cold Outreach Tracker + Personalizer

> Track every cold outreach, AI-personalize each message using recipient context, and never send a generic LinkedIn DM again.


---

## Overview

Cold outreach has a near-zero response rate when it's generic. The difference between a message that gets a reply and one that gets ignored is specificity — referencing something real about the person, their work, or their company.

Cold Outreach Tracker + Personalizer combines a persistent CRM for tracking outreach status with an AI personalization engine. Paste the recipient's LinkedIn bio, recent work, or any context, and the AI generates a tailored message. Track where each conversation stands across your entire pipeline.

---

## Features

- **Persistent pipeline** — all contacts and their status stored in Supabase, survives refreshes
- **AI message personalizer** — generates tailored cold DMs/emails from recipient context
- **Multi-template support** — networking, referral request, job inquiry, collaboration
- **Status tracking** — pipeline stages: Not Sent → Sent → Replied → Meeting Booked → Closed
- **Follow-up generator** — AI writes a follow-up for contacts who haven't replied
- **Pipeline analytics** — response rate, stage distribution, outreach velocity

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | FastAPI (Python) |
| AI | Groq API — Llama 3.3 70B |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Architecture

```
User adds contact + context
        ↓
Frontend → POST /contacts (FastAPI) → Supabase
        ↓
User requests AI message
        ↓
POST /personalize → Groq LLM → tailored message
        ↓
User tracks status → PATCH /contacts/{id}/status → Supabase
```

---

## Database Schema

```sql
create table contacts (
  id uuid primary key default gen_random_uuid(),
  name text,
  role text,
  company text,
  context text,           -- LinkedIn bio, recent work, etc.
  outreach_type text,     -- networking | referral | job | collab
  status text default 'not_sent',
  generated_message text,
  notes text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);
```

---

## Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Environment Variables

**Backend `.env`:**
```
GROQ_API_KEY=your_groq_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

**Frontend `.env`:**
```
VITE_API_URL=http://localhost:8000
```

---

## API Reference

### `POST /contacts`
Add a new contact to the pipeline.

### `GET /contacts`
Fetch all contacts with current status.

### `POST /personalize`
Generate an AI-personalized message.

**Request:**
```json
{
  "name": "Priya Sharma",
  "role": "Engineering Manager",
  "company": "Razorpay",
  "context": "Led the payments infra team, recently spoke at PyCon India about distributed systems",
  "outreach_type": "networking"
}
```

**Response:**
```json
{
  "message": "Hi Priya, your PyCon talk on distributed payments infrastructure was genuinely insightful — the section on idempotency handling in high-throughput systems is something I've been thinking about in my own work. I'm a final-year CS student deeply interested in payments infra, and would love to hear how you approached..."
}
```

### `PATCH /contacts/{id}/status`
Update pipeline status for a contact.

### `POST /contacts/{id}/followup`
Generate a follow-up message for a non-responsive contact.

---

## Project Structure

```
cold-outreach-tracker/
├── backend/
│   ├── main.py
│   ├── routers/
│   │   ├── contacts.py
│   │   └── personalize.py
│   ├── services/
│   │   ├── ai.py
│   │   └── db.py
│   └── requirements.txt
└── frontend/
    └── src/
        ├── App.jsx
        └── components/
            ├── ContactForm.jsx
            ├── Pipeline.jsx
            ├── MessagePanel.jsx
            └── Analytics.jsx
```

---


