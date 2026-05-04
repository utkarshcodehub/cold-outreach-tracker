import { useState, useEffect } from "react";

const API = "http://localhost:8000";

const STATUS_CONFIG = {
  draft:     { label: "Draft",     color: "bg-slate-100 text-slate-600 border-slate-200" },
  sent:      { label: "Sent",      color: "bg-blue-50 text-blue-700 border-blue-200" },
  replied:   { label: "Replied",   color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  ghosted:   { label: "Ghosted",   color: "bg-orange-50 text-orange-600 border-orange-200" },
  converted: { label: "Converted", color: "bg-violet-50 text-violet-700 border-violet-200" },
};

const TONE_ICONS = {
  formal: "🎩",
  casual: "☕",
  bold:   "⚡",
};

// ─── Hero ────────────────────────────────────────────────────────────
function Hero({ onGetStarted }) {
  const DEMO_EXAMPLE = {
    target_name: "Priya Sharma",
    target_role: "Engineering Manager",
    target_company: "Razorpay",
    context: "Looking for a summer internship in backend engineering. Saw her talk at a college tech fest about scaling payment systems.",
    your_background: "Final year CS student, built 12 full-stack projects in 12 days, strong in Python/FastAPI/React, contributed to open-source fintech tools.",
  };

  const STEPS = [
    { icon: "✍️", title: "Fill in the details", desc: "Enter who you're reaching out to, why, and a bit about yourself." },
    { icon: "🤖", title: "AI generates 3 variants", desc: "Get a formal, casual, and bold version — each tailored to your target." },
    { icon: "📋", title: "Track & update status", desc: "Mark outreaches as sent, replied, ghosted, or converted. Everything is saved." },
    { icon: "📊", title: "AI tells you what works", desc: "After a few outreaches, get data-driven insights on your best-performing approach." },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-50 opacity-60" />
        <div className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-50 opacity-40" />
        <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-blue-300 opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-indigo-300 opacity-40" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-violet-300 opacity-50" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Top section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium font-body mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-700 text-slate-900 tracking-tight leading-[1.1]">
            Outreach<span className="text-blue-600">OS</span>
          </h1>
          <p className="mt-4 text-lg text-slate-500 font-body font-light max-w-lg mx-auto leading-relaxed">
            Stop sending generic cold emails. Tell the AI who you're reaching out to and why — it generates 3 personalized variants. Track responses. Learn what actually gets replies.
          </p>

          <button
            onClick={onGetStarted}
            className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-display font-600 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-[0.98]"
          >
            Start Tracking →
          </button>
        </div>

        {/* How it works */}
        <div className="mb-16">
          <h2 className="text-center font-display text-xl font-600 text-slate-800 mb-8">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
            {STEPS.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 text-center shadow-sm">
                <div className="text-3xl mb-3">{s.icon}</div>
                <p className="font-display font-600 text-slate-700 text-sm mb-1">{s.title}</p>
                <p className="text-xs text-slate-400 font-body leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Demo example */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-12">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-lg">💡</span>
            <h3 className="font-display font-600 text-slate-800">Example — here's what you'd fill in</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div className="rounded-lg bg-slate-50 border border-slate-100 px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-mono mb-1">Target Name</p>
              <p className="text-sm text-slate-700 font-body">{DEMO_EXAMPLE.target_name}</p>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-100 px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-mono mb-1">Their Role</p>
              <p className="text-sm text-slate-700 font-body">{DEMO_EXAMPLE.target_role}</p>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-100 px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-mono mb-1">Company</p>
              <p className="text-sm text-slate-700 font-body">{DEMO_EXAMPLE.target_company}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-50 border border-slate-100 px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-mono mb-1">Why are you reaching out?</p>
              <p className="text-sm text-slate-700 font-body leading-relaxed">{DEMO_EXAMPLE.context}</p>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-100 px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-mono mb-1">Your background</p>
              <p className="text-sm text-slate-700 font-body leading-relaxed">{DEMO_EXAMPLE.your_background}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 font-body">
            <span>→</span>
            <span>AI uses these details to craft 3 personalized outreach messages — formal 🎩, casual ☕, and bold ⚡</span>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-3 justify-center">
          {["3 AI Variants", "Supabase Persistence", "Status Tracking", "AI Analytics"].map((f) => (
            <span key={f} className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-600 font-body shadow-sm">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Status Pill ─────────────────────────────────────────────────────
function StatusPill({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.draft;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

// ─── Generate Form ───────────────────────────────────────────────────
function GenerateForm({ onGenerated }) {
  const [form, setForm] = useState({
    target_name: "", target_role: "", target_company: "", context: "", your_background: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.target_name || !form.target_role || !form.target_company || !form.context || !form.your_background) {
      setError("Fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Generation failed");
      }
      const data = await res.json();
      onGenerated(data);
      setForm({ target_name: "", target_role: "", target_company: "", context: "", your_background: "" });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-body text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 slide-up">
      <h2 className="font-display text-lg font-600 text-slate-800 mb-1">New Outreach</h2>
      <p className="text-sm text-slate-400 font-body mb-6">Enter the target's details and your background. AI generates 3 variants.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input className={inputClass} placeholder="Target Name" value={form.target_name}
          onChange={(e) => setForm({ ...form, target_name: e.target.value })} />
        <input className={inputClass} placeholder="Their Role (e.g. CTO)" value={form.target_role}
          onChange={(e) => setForm({ ...form, target_role: e.target.value })} />
        <input className={inputClass} placeholder="Company" value={form.target_company}
          onChange={(e) => setForm({ ...form, target_company: e.target.value })} />
      </div>
      <textarea className={`${inputClass} mb-4 min-h-[80px] resize-none`} placeholder="Why are you reaching out? What do you want? (e.g. internship, advice, collaboration)"
        value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} />
      <textarea className={`${inputClass} mb-4 min-h-[80px] resize-none`} placeholder="Your background (skills, experience, relevant projects — helps AI personalize)"
        value={form.your_background} onChange={(e) => setForm({ ...form, your_background: e.target.value })} />

      {error && <p className="text-red-500 text-sm mb-3 font-body">{error}</p>}

      <button onClick={handleSubmit} disabled={loading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-display font-600 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-[0.98]">
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Generating variants...
          </span>
        ) : "Generate 3 Outreach Variants"}
      </button>
    </div>
  );
}

// ─── Variant Card ────────────────────────────────────────────────────
function VariantCard({ variant, onSelect, isSelected }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${variant.subject}\n\n${variant.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl border p-5 transition-all ${
      isSelected ? "border-blue-400 bg-blue-50/30 shadow-md shadow-blue-100" : "border-slate-200 bg-white hover:border-slate-300"
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{TONE_ICONS[variant.tone]}</span>
          <span className="font-display font-600 text-slate-700 capitalize">{variant.tone}</span>
        </div>
        <div className="flex items-center gap-2">
          {onSelect && (
            <button onClick={onSelect}
              className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}>
              {isSelected ? "✓ Selected" : "Select"}
            </button>
          )}
          <button onClick={handleCopy}
            className="text-xs px-3 py-1 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 font-medium transition-all">
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      </div>

      <p className="text-sm font-mono text-blue-600 mb-2 truncate">
        Subject: {variant.subject}
      </p>
      <p className="text-sm text-slate-600 font-body leading-relaxed whitespace-pre-wrap mb-3">
        {variant.body}
      </p>
      <p className="text-xs text-slate-400 font-body italic border-t border-slate-100 pt-2">
        💡 {variant.rationale}
      </p>
    </div>
  );
}

// ─── Generated Result ────────────────────────────────────────────────
function GeneratedResult({ result, onDismiss }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = async (tone) => {
    setSelected(tone);
    if (result.id) {
      try {
        await fetch(`${API}/outreaches/${result.id}/select`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selected_variant: tone }),
        });
      } catch {}
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-600 text-slate-800">Generated Variants</h3>
        <button onClick={onDismiss} className="text-sm text-slate-400 hover:text-slate-600 font-body">← Back</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 stagger">
        {result.variants.map((v) => (
          <VariantCard key={v.tone} variant={v} isSelected={selected === v.tone} onSelect={() => handleSelect(v.tone)} />
        ))}
      </div>
    </div>
  );
}

// ─── Outreach Row ────────────────────────────────────────────────────
function OutreachRow({ outreach, onStatusChange, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [updating, setUpdating] = useState(false);

  const parseVariant = (raw) => {
    try { return typeof raw === "string" ? JSON.parse(raw) : raw; } catch { return null; }
  };

  const variants = [
    parseVariant(outreach.variant_formal),
    parseVariant(outreach.variant_casual),
    parseVariant(outreach.variant_bold),
  ].filter(Boolean);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      await onStatusChange(outreach.id, newStatus);
    } finally {
      setUpdating(false);
    }
  };

  const statusFlow = ["draft", "sent", "replied", "ghosted", "converted"];

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all fade-in">
      <div className="p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-display font-700 text-sm shrink-0">
              {outreach.target_name?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div className="min-w-0">
              <p className="font-display font-600 text-slate-800 truncate">{outreach.target_name}</p>
              <p className="text-xs text-slate-400 font-body truncate">{outreach.target_role} at {outreach.target_company}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusPill status={outreach.status} />
            {outreach.selected_variant && (
              <span className="text-xs text-slate-400 font-mono hidden sm:block">
                {TONE_ICONS[outreach.selected_variant]} {outreach.selected_variant}
              </span>
            )}
            <svg className={`w-4 h-4 text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500 font-body mb-4">
            <span className="font-medium text-slate-600">Context:</span> {outreach.context}
          </p>

          {variants.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 stagger">
              {variants.map((v) => (
                <VariantCard key={v.tone} variant={v} isSelected={outreach.selected_variant === v.tone} />
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-body mr-2">Change status:</span>
            {statusFlow.map((s) => (
              <button key={s} disabled={updating || outreach.status === s}
                onClick={() => handleStatusChange(s)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  outreach.status === s
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}>
                {STATUS_CONFIG[s].label}
              </button>
            ))}
            <button onClick={() => onDelete(outreach.id)}
              className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 font-medium transition-all ml-auto">
              Delete
            </button>
          </div>

          {outreach.notes && (
            <p className="mt-3 text-xs text-slate-400 font-body italic">Notes: {outreach.notes}</p>
          )}
          <p className="mt-2 text-xs text-slate-300 font-mono">
            Created {new Date(outreach.created_at).toLocaleDateString()}
            {outreach.sent_at && ` · Sent ${new Date(outreach.sent_at).toLocaleDateString()}`}
            {outreach.replied_at && ` · Replied ${new Date(outreach.replied_at).toLocaleDateString()}`}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Analytics Panel ─────────────────────────────────────────────────
function AnalyticsPanel() {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    setAnalysis("");
    try {
      const res = await fetch(`${API}/analyze`, { method: "POST" });
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (e) {
      setAnalysis("Failed to analyze. " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 slide-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-600 text-slate-800">AI Analytics</h3>
          <p className="text-xs text-slate-400 font-body">Analyze your outreach patterns to find what works</p>
        </div>
        <button onClick={runAnalysis} disabled={loading}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-display font-500 text-sm rounded-xl transition-all">
          {loading ? "Analyzing..." : "Run Analysis"}
        </button>
      </div>

      {analysis && (
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 fade-in">
          <div className="prose prose-sm prose-slate max-w-none font-body text-sm leading-relaxed whitespace-pre-wrap">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Dashboard Stats ─────────────────────────────────────────────────
function DashboardStats({ outreaches }) {
  const counts = { draft: 0, sent: 0, replied: 0, ghosted: 0, converted: 0 };
  outreaches.forEach((o) => { if (counts[o.status] !== undefined) counts[o.status]++; });
  const total = outreaches.length;
  const responseRate = counts.sent > 0 ? Math.round(((counts.replied + counts.converted) / counts.sent) * 100) : 0;

  const stats = [
    { label: "Total", value: total, accent: "text-slate-700" },
    { label: "Sent", value: counts.sent, accent: "text-blue-600" },
    { label: "Replied", value: counts.replied, accent: "text-emerald-600" },
    { label: "Ghosted", value: counts.ghosted, accent: "text-orange-500" },
    { label: "Converted", value: counts.converted, accent: "text-violet-600" },
    { label: "Response Rate", value: `${responseRate}%`, accent: "text-blue-600" },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 stagger">
      {stats.map((s) => (
        <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-3 text-center">
          <p className={`font-display font-700 text-xl ${s.accent}`}>{s.value}</p>
          <p className="text-xs text-slate-400 font-body">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("hero"); // hero | app
  const [tab, setTab] = useState("generate"); // generate | dashboard | analytics
  const [outreaches, setOutreaches] = useState([]);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOutreaches = async () => {
    try {
      const params = new URLSearchParams();
      if (filterStatus !== "all") params.set("status", filterStatus);
      if (searchQuery) params.set("search", searchQuery);
      const res = await fetch(`${API}/outreaches?${params}`);
      const data = await res.json();
      setOutreaches(data.outreaches || []);
    } catch {}
  };

  useEffect(() => {
    if (page === "app") fetchOutreaches();
  }, [page, filterStatus, searchQuery]);

  const handleStatusChange = async (id, newStatus) => {
    await fetch(`${API}/outreaches/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchOutreaches();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/outreaches/${id}`, { method: "DELETE" });
    fetchOutreaches();
  };

  const handleGenerated = (result) => {
    setGeneratedResult(result);
    fetchOutreaches();
  };

  if (page === "hero") return <Hero onGetStarted={() => setPage("app")} />;

  const tabs = [
    { id: "generate", label: "✍️ Generate" },
    { id: "dashboard", label: "📋 Dashboard" },
    { id: "analytics", label: "📊 Analytics" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setPage("hero")}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-all"
              title="Back to home">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="font-display text-xl font-700 text-slate-900">
              Outreach<span className="text-blue-600">OS</span>
            </h1>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => { setTab(t.id); setGeneratedResult(null); }}
                className={`px-4 py-1.5 rounded-md text-sm font-display font-500 transition-all ${
                  tab === t.id ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {tab === "generate" && (
          <>
            {generatedResult ? (
              <GeneratedResult result={generatedResult} onDismiss={() => setGeneratedResult(null)} />
            ) : (
              <GenerateForm onGenerated={handleGenerated} />
            )}
          </>
        )}

        {tab === "dashboard" && (
          <>
            <DashboardStats outreaches={outreaches} />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
                {["all", ...Object.keys(STATUS_CONFIG)].map((s) => (
                  <button key={s} onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1 rounded-md text-xs font-display font-500 transition-all capitalize ${
                      filterStatus === s ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-50"
                    }`}>
                    {s === "all" ? "All" : STATUS_CONFIG[s].label}
                  </button>
                ))}
              </div>
              <input
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-body placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full sm:w-64"
                placeholder="Search by name, company, role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Outreach list */}
            <div className="space-y-3 stagger">
              {outreaches.length === 0 ? (
                <div className="text-center py-16 text-slate-400 font-body">
                  <p className="text-4xl mb-3">📭</p>
                  <p>No outreaches yet. Generate your first one!</p>
                </div>
              ) : (
                outreaches.map((o) => (
                  <OutreachRow key={o.id} outreach={o} onStatusChange={handleStatusChange} onDelete={handleDelete} />
                ))
              )}
            </div>
          </>
        )}

        {tab === "analytics" && <AnalyticsPanel />}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-slate-300 font-body">
        OutreachOS
      </footer>
    </div>
  );
}