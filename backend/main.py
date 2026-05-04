from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
import json
import httpx
from groq import Groq
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SUPABASE_URL = os.getenv("SUPABASE_URL").rstrip("/")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SUPABASE_HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}
TABLE_URL = f"{SUPABASE_URL}/outreaches"


# --- Supabase helpers ---

def sb_get(params=None):
    r = httpx.get(TABLE_URL, headers=SUPABASE_HEADERS, params=params or {})
    r.raise_for_status()
    return r.json()

def sb_insert(data):
    r = httpx.post(TABLE_URL, headers=SUPABASE_HEADERS, json=data)
    r.raise_for_status()
    return r.json()

def sb_update(row_id, data):
    r = httpx.patch(
        TABLE_URL,
        headers=SUPABASE_HEADERS,
        params={"id": f"eq.{row_id}"},
        json=data,
    )
    r.raise_for_status()
    return r.json()

def sb_delete(row_id):
    r = httpx.delete(
        TABLE_URL,
        headers=SUPABASE_HEADERS,
        params={"id": f"eq.{row_id}"},
    )
    r.raise_for_status()
    return r.json()


# --- Models ---

class OutreachRequest(BaseModel):
    target_name: str
    target_role: str
    target_company: str
    context: str
    your_background: str

class StatusUpdate(BaseModel):
    status: str
    notes: Optional[str] = None

class SelectedVariant(BaseModel):
    selected_variant: str


# --- Routes ---

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/generate")
def generate_outreach(req: OutreachRequest):
    prompt = f"""You are an expert cold outreach strategist. Generate 3 personalized outreach message variants for the following scenario.

TARGET:
- Name: {req.target_name}
- Role: {req.target_role}
- Company: {req.target_company}
- Context/Reason for reaching out: {req.context}

SENDER BACKGROUND:
{req.your_background}

Generate exactly 3 variants:
1. FORMAL — Professional, structured, respectful. Best for senior executives or corporate roles.
2. CASUAL — Friendly, conversational, warm. Best for startup founders or peers.
3. BOLD — Direct, confident, pattern-breaking. Stands out in a crowded inbox.

For each variant, provide:
- subject: A compelling email subject line
- body: The full message (keep under 150 words each)
- rationale: One sentence explaining why this approach works for this specific target

Respond ONLY in valid JSON with this exact structure:
{{
  "variants": [
    {{
      "tone": "formal",
      "subject": "...",
      "body": "...",
      "rationale": "..."
    }},
    {{
      "tone": "casual",
      "subject": "...",
      "body": "...",
      "rationale": "..."
    }},
    {{
      "tone": "bold",
      "subject": "...",
      "body": "...",
      "rationale": "..."
    }}
  ]
}}"""

    try:
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8,
            max_tokens=2000,
        )
        raw = response.choices[0].message.content.strip()
        if raw.startswith("```"):
            raw = raw.split("\n", 1)[1]
            raw = raw.rsplit("```", 1)[0]
        variants_data = json.loads(raw)

        record = {
            "target_name": req.target_name,
            "target_role": req.target_role,
            "target_company": req.target_company,
            "context": req.context,
            "variant_formal": json.dumps(variants_data["variants"][0]),
            "variant_casual": json.dumps(variants_data["variants"][1]),
            "variant_bold": json.dumps(variants_data["variants"][2]),
            "status": "draft",
        }
        saved = sb_insert(record)
        saved_row = saved[0] if saved else {}

        return {
            "id": saved_row.get("id"),
            "variants": variants_data["variants"],
            "status": "draft",
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned invalid JSON. Try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/outreaches")
def get_outreaches(status: Optional[str] = None, search: Optional[str] = None):
    params = {"select": "*", "order": "created_at.desc"}

    if status and status != "all":
        params["status"] = f"eq.{status}"

    if search:
        params["or"] = (
            f"(target_name.ilike.%{search}%,"
            f"target_company.ilike.%{search}%,"
            f"target_role.ilike.%{search}%)"
        )

    data = sb_get(params)
    return {"outreaches": data}


@app.patch("/outreaches/{outreach_id}/status")
def update_status(outreach_id: str, body: StatusUpdate):
    update_data = {"status": body.status}
    if body.notes is not None:
        update_data["notes"] = body.notes
    if body.status == "sent":
        update_data["sent_at"] = datetime.utcnow().isoformat()
    if body.status == "replied":
        update_data["replied_at"] = datetime.utcnow().isoformat()

    result = sb_update(outreach_id, update_data)
    if not result:
        raise HTTPException(status_code=404, detail="Outreach not found")
    return {"outreach": result[0]}


@app.patch("/outreaches/{outreach_id}/select")
def select_variant(outreach_id: str, body: SelectedVariant):
    result = sb_update(outreach_id, {"selected_variant": body.selected_variant})
    if not result:
        raise HTTPException(status_code=404, detail="Outreach not found")
    return {"outreach": result[0]}


@app.delete("/outreaches/{outreach_id}")
def delete_outreach(outreach_id: str):
    sb_delete(outreach_id)
    return {"deleted": True}


@app.post("/analyze")
def analyze_outreach():
    outreaches = sb_get({"select": "*"})

    if not outreaches or len(outreaches) < 2:
        return {
            "analysis": "You need at least 2 tracked outreaches with varied statuses to generate meaningful insights. Keep sending and tracking!"
        }

    summary_lines = []
    for o in outreaches:
        summary_lines.append(
            f"- {o['target_name']} ({o['target_role']} at {o['target_company']}): "
            f"status={o['status']}, selected_variant={o.get('selected_variant', 'none')}, "
            f"context={o.get('context', 'N/A')}"
        )
    summary = "\n".join(summary_lines)

    prompt = f"""You are an outreach analytics expert. Analyze this person's cold outreach history and provide actionable insights.

OUTREACH HISTORY:
{summary}

Provide analysis covering:
1. **Response Rate Overview** — How many sent, replied, ghosted, converted? What's the conversion funnel?
2. **What's Working** — Which tones/approaches got replies? Any patterns in successful outreaches?
3. **What's Not Working** — Common traits of ghosted outreaches?
4. **Role/Company Patterns** — Which types of targets respond most?
5. **Top 3 Recommendations** — Specific, actionable changes to improve response rates.

Keep it concise and brutally honest. No fluff."""

    try:
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=1500,
        )
        analysis = response.choices[0].message.content.strip()
        return {"analysis": analysis}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))