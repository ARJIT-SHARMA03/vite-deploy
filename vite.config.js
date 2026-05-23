import { useState } from "react";

const PAGES = [
  {
    id: "request",
    route: "/request-service",
    label: "Request Service",
    icon: "âœ¦",
    tag: "PUBLIC",
    tagColor: "#10b981",
    desc: "Customer-facing enquiry form",
    color: "#6366f1",
    sections: [
      {
        name: "Form Fields",
        items: ["Full Name", "Phone Number (10-digit)", "City", "Service Type (dropdown)", "Description"],
      },
      {
        name: "Validation",
        items: ["All fields required", "Phone must be 10 digits", "Duplicate: same phone + same service â†’ blocked"],
      },
      {
        name: "On Submit",
        items: ["Lead saved to DB", "3 providers auto-assigned", "Success card shows assignments"],
      },
    ],
    preview: <RequestPreview />,
  },
  {
    id: "dashboard",
    route: "/dashboard",
    label: "Dashboard",
    icon: "â—ˆ",
    tag: "LIVE",
    tagColor: "#6366f1",
    desc: "Provider overview with real-time updates",
    color: "#8b5cf6",
    sections: [
      {
        name: "Stats Bar",
        items: ["Total leads count", "Active providers count", "Full quota count"],
      },
      {
        name: "Provider Cards (Ã—8)",
        items: ["Quota progress bar (greenâ†’yellowâ†’red)", "Leads received count", "Click to expand lead list"],
      },
      {
        name: "Real-Time",
        items: ["SSE stream â€” no page refresh", "Flash banner on new lead", "5s polling fallback"],
      },
    ],
    preview: <DashboardPreview />,
  },
  {
    id: "leads",
    route: "/leads",
    label: "All Leads",
    icon: "â–¦",
    tag: "RECORDS",
    tagColor: "#f59e0b",
    desc: "Full lead table with provider assignments",
    color: "#f59e0b",
    sections: [
      {
        name: "Table Columns",
        items: ["Customer name + timestamp", "Phone number", "City", "Service badge", "Assigned providers"],
      },
      {
        name: "Features",
        items: ["Sorted newest-first", "Row hover highlight", "Colour-coded service badges"],
      },
    ],
    preview: <LeadsPreview />,
  },
  {
    id: "test",
    route: "/test-tools",
    label: "Test Tools",
    icon: "â¬¡",
    tag: "ADMIN",
    tagColor: "#ef4444",
    desc: "Webhook simulation & stress testing",
    color: "#ef4444",
    sections: [
      {
        name: "Tool 1 â€” Reset Quota",
        items: ["Sends webhook with unique eventId", "Resets all 8 providers to quota 10", "Resets allocation index"],
      },
      {
        name: "Tool 2 â€” Idempotency",
        items: ["Calls same webhook 3Ã— identical eventId", "Only first call applies", "Log shows âš¡ Skipped for repeats"],
      },
      {
        name: "Tool 3 â€” Concurrency",
        items: ["Fires 10 leads simultaneously", "Tests DB transaction integrity", "Event log shows all results"],
      },
    ],
    preview: <TestPreview />,
  },
];

const API_ROUTES = [
  { method: "POST", path: "/api/leads", desc: "Create lead + run allocation", badge: "core" },
  { method: "GET", path: "/api/leads", desc: "List all leads with assignments", badge: "read" },
  { method: "GET", path: "/api/providers", desc: "Provider stats + lead history", badge: "read" },
  { method: "GET", path: "/api/services", desc: "List all 3 services", badge: "read" },
  { method: "POST", path: "/api/webhook", desc: "Idempotent quota reset", badge: "webhook" },
  { method: "POST", path: "/api/test", desc: "Bulk concurrent lead generation", badge: "test" },
  { method: "GET", path: "/api/events", desc: "SSE stream for real-time updates", badge: "stream" },
];

const ALLOCATION = [
  { service: "Service 1", mandatory: ["P1"], pool: ["P2", "P3", "P4"], color: "#dbeafe", text: "#1e40af" },
  { service: "Service 2", mandatory: ["P5"], pool: ["P6", "P7", "P8"], color: "#fce7f3", text: "#9d174d" },
  { service: "Service 3", mandatory: ["P1", "P4"], pool: ["P2", "P3", "P5", "P6", "P7", "P8"], color: "#ede9fe", text: "#5b21b6" },
];

const BADGE_COLORS = {
  core: { bg: "#fef3c7", text: "#92400e" },
  read: { bg: "#dcfce7", text: "#166534" },
  webhook: { bg: "#ede9fe", text: "#5b21b6" },
  test: { bg: "#fee2e2", text: "#991b1b" },
  stream: { bg: "#dbeafe", text: "#1e40af" },
};

// â”€â”€ Mini page previews â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function RequestPreview() {
  return (
    <div style={{ fontFamily: "system-ui", fontSize: 10, padding: 14, background: "#f8fafc", borderRadius: 10, height: "100%", boxSizing: "border-box" }}>
      <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 10, color: "#0f172a" }}>Request a Service</div>
      {["Full Name", "Phone Number", "City"].map(f => (
        <div key={f} style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 9, fontWeight: 600, color: "#64748b", marginBottom: 2 }}>{f}</div>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 5, padding: "4px 8px", fontSize: 9, color: "#94a3b8" }}>Enter {f.toLowerCase()}â€¦</div>
        </div>
      ))}
      <div style={{ marginBottom: 6 }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: "#64748b", marginBottom: 2 }}>Service Type</div>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 5, padding: "4px 8px", fontSize: 9, color: "#94a3b8" }}>Select a service â–¾</div>
      </div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: "#64748b", marginBottom: 2 }}>Description</div>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 5, padding: "8px", fontSize: 9, color: "#94a3b8", height: 24 }}>Describe your needâ€¦</div>
      </div>
      <div style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 6, padding: "6px", textAlign: "center", fontSize: 9, color: "#fff", fontWeight: 700 }}>
        Submit Enquiry â†’
      </div>
    </div>
  );
}

function DashboardPreview() {
  const providers = [
    { name: "P1", pct: 0.6, color: "#f59e0b" },
    { name: "P2", pct: 0.3, color: "#10b981" },
    { name: "P3", pct: 0.9, color: "#ef4444" },
    { name: "P4", pct: 0.2, color: "#10b981" },
    { name: "P5", pct: 0.7, color: "#f59e0b" },
    { name: "P6", pct: 0.1, color: "#10b981" },
  ];
  return (
    <div style={{ fontFamily: "system-ui", fontSize: 10, padding: 14, background: "#f8fafc", borderRadius: 10, height: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontWeight: 800, fontSize: 12, color: "#0f172a" }}>Provider Overview</div>
        <div style={{ display: "flex", gap: 5 }}>
          {[["12", "#6366f1"], ["5", "#10b981"], ["1", "#f59e0b"]].map(([v, c]) => (
            <div key={v} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 5, padding: "2px 6px", textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 11, color: c }}>{v}</div>
              <div style={{ fontSize: 7, color: "#94a3b8" }}>leads</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
        {providers.map(p => (
          <div key={p.name} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: "6px 8px" }}>
            <div style={{ fontWeight: 700, fontSize: 9, marginBottom: 4 }}>{p.name}</div>
            <div style={{ height: 4, background: "#e2e8f0", borderRadius: 99 }}>
              <div style={{ height: "100%", width: `${p.pct * 100}%`, background: p.color, borderRadius: 99 }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 5, padding: "4px 8px", fontSize: 8, color: "#fff", fontWeight: 600 }}>
        âš¡ New lead assigned â€” real-time update
      </div>
    </div>
  );
}

function LeadsPreview() {
  const rows = [
    { name: "Priya S.", phone: "9876â€¦", city: "Mumbai", svc: "S1", color: "#dbeafe", tc: "#1e40af" },
    { name: "Rahul M.", phone: "9123â€¦", city: "Delhi", svc: "S2", color: "#fce7f3", tc: "#9d174d" },
    { name: "Anita K.", phone: "8800â€¦", city: "Pune", svc: "S3", color: "#ede9fe", tc: "#5b21b6" },
  ];
  return (
    <div style={{ fontFamily: "system-ui", fontSize: 10, padding: 14, background: "#f8fafc", borderRadius: 10, height: "100%", boxSizing: "border-box" }}>
      <div style={{ fontWeight: 800, fontSize: 12, marginBottom: 10, color: "#0f172a" }}>All Leads (12)</div>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 0.6fr 1.2fr", padding: "5px 8px", background: "#f1f5f9", borderBottom: "1px solid #e2e8f0" }}>
          {["Customer", "Phone", "City", "Svc", "Providers"].map(h => (
            <div key={h} style={{ fontSize: 7, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 0.6fr 1.2fr", padding: "6px 8px", borderBottom: i < 2 ? "1px solid #f1f5f9" : "none", alignItems: "center" }}>
            <div style={{ fontSize: 9, fontWeight: 600 }}>{r.name}</div>
            <div style={{ fontSize: 8, color: "#64748b" }}>{r.phone}</div>
            <div style={{ fontSize: 8, color: "#64748b" }}>{r.city}</div>
            <span style={{ fontSize: 7, fontWeight: 700, background: r.color, color: r.tc, borderRadius: 99, padding: "1px 5px" }}>{r.svc}</span>
            <div style={{ display: "flex", gap: 2 }}>
              {["P1", "P3"].map(p => (
                <span key={p} style={{ fontSize: 7, background: "#dcfce7", color: "#15803d", borderRadius: 4, padding: "1px 4px", fontWeight: 600 }}>{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestPreview() {
  return (
    <div style={{ fontFamily: "system-ui", fontSize: 10, padding: 14, background: "#f8fafc", borderRadius: 10, height: "100%", boxSizing: "border-box" }}>
      <div style={{ fontWeight: 800, fontSize: 12, marginBottom: 10, color: "#0f172a" }}>Test Tools</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
        {[
          { icon: "ðŸ”„", label: "Reset Provider Quota", color: "#6366f1" },
          { icon: "âš¡", label: "Test Idempotency (3Ã—)", color: "#6366f1" },
          { icon: "ðŸš€", label: "Generate 10 Leads", color: "#ef4444" },
        ].map(t => (
          <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: "5px 8px" }}>
            <span style={{ fontSize: 11 }}>{t.icon}</span>
            <span style={{ fontSize: 9, fontWeight: 600, flex: 1 }}>{t.label}</span>
            <div style={{ background: t.color, borderRadius: 4, padding: "2px 6px", fontSize: 7, color: "#fff", fontWeight: 700 }}>Run</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#0f172a", borderRadius: 6, padding: "6px 8px" }}>
        <div style={{ fontSize: 7, color: "#64748b", marginBottom: 4 }}>Event Log</div>
        <div style={{ fontSize: 8, color: "#4ade80" }}>âœ“ Quota reset â€” all providers</div>
        <div style={{ fontSize: 8, color: "#fbbf24" }}>âš¡ Skipped (idempotent)</div>
        <div style={{ fontSize: 8, color: "#4ade80" }}>âœ“ 10 leads generated</div>
      </div>
    </div>
  );
}

// â”€â”€ Main app â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function Overview() {
  const [active, setActive] = useState("request");
  const activePage = PAGES.find(p => p.id === active);

  return (
    <div style={{ minHeight: "100vh", background: "#080c14", fontFamily: "'Syne', 'DM Sans', system-ui, sans-serif", color: "#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 99px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:none } }
        @keyframes glow { 0%,100% { opacity:0.4 } 50% { opacity:0.8 } }
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: "1px solid #1e293b", padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff" }}>P</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.02em" }}>Prowider</div>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 500 }}>System Overview</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[{ label: "4 Pages", color: "#6366f1" }, { label: "7 API Routes", color: "#10b981" }, { label: "8 Providers", color: "#f59e0b" }].map(t => (
            <div key={t.label} style={{ border: `1px solid ${t.color}33`, background: `${t.color}11`, borderRadius: 99, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: t.color }}>
              {t.label}
            </div>
          ))}
        </div>
      </header>

      <div style={{ padding: "40px 48px", maxWidth: 1200, margin: "0 auto" }}>

        {/* Page selector */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#475569", marginBottom: 16 }}>Pages</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {PAGES.map(p => (
              <button key={p.id} onClick={() => setActive(p.id)}
                style={{
                  background: active === p.id ? "#0f172a" : "transparent",
                  border: `1.5px solid ${active === p.id ? p.color : "#1e293b"}`,
                  borderRadius: 14, padding: "18px 20px", cursor: "pointer", textAlign: "left",
                  transition: "all 0.2s", position: "relative", overflow: "hidden",
                  boxShadow: active === p.id ? `0 0 24px ${p.color}22` : "none",
                }}>
                {active === p.id && (
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${p.color},transparent)` }} />
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ fontSize: 22, color: p.color }}>{p.icon}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, background: `${p.tagColor}22`, color: p.tagColor, borderRadius: 99, padding: "2px 7px", letterSpacing: "0.08em" }}>{p.tag}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 13, color: active === p.id ? "#f8fafc" : "#94a3b8", marginBottom: 3 }}>{p.label}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#475569" }}>{p.route}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Page detail */}
        {activePage && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, marginBottom: 40, animation: "fadeUp 0.3s ease" }}>
            {/* Sections */}
            <div style={{ background: "#0a0f1a", border: "1px solid #1e293b", borderRadius: 16, padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 24, color: activePage.color }}>{activePage.icon}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18, color: "#f8fafc" }}>{activePage.label}</div>
                  <div style={{ fontSize: 12, color: "#475569" }}>{activePage.desc}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
                {activePage.sections.map(s => (
                  <div key={s.name} style={{ background: "#080c14", border: "1px solid #1e293b", borderRadius: 10, padding: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: activePage.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{s.name}</div>
                    {s.items.map(item => (
                      <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: activePage.color, marginTop: 5, flexShrink: 0 }} />
                        <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.4 }}>{item}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Mini preview */}
            <div style={{ background: "#0a0f1a", border: "1px solid #1e293b", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "10px 14px", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", gap: 6 }}>
                {["#ff5f57", "#ffbd2e", "#27c840"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "#475569", marginLeft: 4 }}>prowider.io{activePage.route}</div>
              </div>
              <div style={{ padding: 16, height: 260 }}>
                {activePage.preview}
              </div>
            </div>
          </div>
        )}

        {/* Two-column: API routes + Allocation */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>

          {/* API Routes */}
          <div style={{ background: "#0a0f1a", border: "1px solid #1e293b", borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#475569", marginBottom: 16 }}>API Routes</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {API_ROUTES.map(r => (
                <div key={r.path} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 12px", background: "#080c14", borderRadius: 8, border: "1px solid #1e293b" }}>
                  <span style={{
                    fontSize: 9, fontWeight: 800, letterSpacing: "0.06em",
                    color: r.method === "POST" ? "#f59e0b" : "#10b981",
                    background: r.method === "POST" ? "#451a0322" : "#05280f22",
                    border: `1px solid ${r.method === "POST" ? "#f59e0b44" : "#10b98144"}`,
                    padding: "2px 6px", borderRadius: 4, flexShrink: 0,
                  }}>{r.method}</span>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#c4b5fd", flex: 1 }}>{r.path}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, background: BADGE_COLORS[r.badge].bg + "33", color: BADGE_COLORS[r.badge].text, borderRadius: 4, padding: "1px 6px", flexShrink: 0 }}>{r.badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Allocation rules */}
          <div style={{ background: "#0a0f1a", border: "1px solid #1e293b", borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#475569", marginBottom: 16 }}>Allocation Rules</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              {ALLOCATION.map(a => (
                <div key={a.service} style={{ padding: "12px 14px", background: "#080c14", border: "1px solid #1e293b", borderRadius: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: "#f8fafc", marginBottom: 8 }}>{a.service}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>Mandatory:</div>
                    {a.mandatory.map(p => (
                      <span key={p} style={{ fontSize: 10, fontWeight: 700, background: a.color + "33", color: a.text, border: `1px solid ${a.color}55`, borderRadius: 5, padding: "2px 7px" }}>{p}</span>
                    ))}
                    <div style={{ fontSize: 9, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", marginLeft: 4 }}>Pool:</div>
                    {a.pool.map(p => (
                      <span key={p} style={{ fontSize: 10, color: "#64748b", background: "#1e293b", borderRadius: 4, padding: "2px 6px" }}>{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "#080c14", border: "1px solid #1e293b", borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#6366f1", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Fair Distribution</div>
              {["Exactly 3 providers per lead", "Round-robin index persists in DB", "Quota cap: 10 leads/provider/month", "Mandatory providers always first", "Same provider never gets same lead twice"].map(r => (
                <div key={r} style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 5 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#6366f1", flexShrink: 0 }} />
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{r}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Architecture flow */}
        <div style={{ background: "#0a0f1a", border: "1px solid #1e293b", borderRadius: 16, padding: 28 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#475569", marginBottom: 24 }}>Data Flow</div>
          <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { label: "Customer", sub: "Fills form", icon: "ðŸ‘¤", color: "#6366f1" },
              null,
              { label: "POST /api/leads", sub: "Validates input", icon: "âš¡", color: "#8b5cf6", mono: true },
              null,
              { label: "DB Transaction", sub: "Atomic insert", icon: "ðŸ—ƒ", color: "#f59e0b" },
              null,
              { label: "Allocator", sub: "Round-robin logic", icon: "âš™", color: "#10b981" },
              null,
              { label: "SSE Emit", sub: "Push to dashboard", icon: "ðŸ“¡", color: "#06b6d4" },
              null,
              { label: "Dashboard", sub: "Live update", icon: "ðŸ“Š", color: "#6366f1" },
            ].map((step, i) => step === null ? (
              <div key={i} style={{ display: "flex", alignItems: "center", color: "#1e293b", fontSize: 18, margin: "0 4px" }}>â†’</div>
            ) : (
              <div key={i} style={{ textAlign: "center", padding: "14px 16px", background: "#080c14", border: `1px solid ${step.color}44`, borderRadius: 12, minWidth: 90 }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{step.icon}</div>
                <div style={{ fontSize: step.mono ? 9 : 11, fontWeight: 700, color: step.color, fontFamily: step.mono ? "'DM Mono',monospace" : "inherit", marginBottom: 2 }}>{step.label}</div>
                <div style={{ fontSize: 9, color: "#475569" }}>{step.sub}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}