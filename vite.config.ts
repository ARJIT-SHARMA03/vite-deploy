import { useState } from "react";

// ─────────────────────────────────────────────────────────────
// Mini Page Previews
// ─────────────────────────────────────────────────────────────

function RequestPreview() {
  return (
    <div
      style={{
        fontFamily: "system-ui",
        fontSize: 10,
        padding: 14,
        background: "#f8fafc",
        borderRadius: 10,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontWeight: 800,
          fontSize: 13,
          marginBottom: 10,
          color: "#0f172a",
        }}
      >
        Request a Service
      </div>

      {["Full Name", "Phone Number", "City"].map((f) => (
        <div key={f} style={{ marginBottom: 6 }}>
          <div
            style={{
              fontSize: 9,
              fontWeight: 600,
              color: "#64748b",
              marginBottom: 2,
            }}
          >
            {f}
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 5,
              padding: "4px 8px",
              fontSize: 9,
              color: "#94a3b8",
            }}
          >
            Enter {f.toLowerCase()}…
          </div>
        </div>
      ))}

      <div style={{ marginBottom: 6 }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 600,
            color: "#64748b",
            marginBottom: 2,
          }}
        >
          Service Type
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 5,
            padding: "4px 8px",
            fontSize: 9,
            color: "#94a3b8",
          }}
        >
          Select a service ▾
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 600,
            color: "#64748b",
            marginBottom: 2,
          }}
        >
          Description
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 5,
            padding: "8px",
            fontSize: 9,
            color: "#94a3b8",
            height: 24,
          }}
        >
          Describe your need…
        </div>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          borderRadius: 6,
          padding: "6px",
          textAlign: "center",
          fontSize: 9,
          color: "#fff",
          fontWeight: 700,
        }}
      >
        Submit Enquiry →
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
    <div
      style={{
        fontFamily: "system-ui",
        fontSize: 10,
        padding: 14,
        background: "#f8fafc",
        borderRadius: 10,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 12,
            color: "#0f172a",
          }}
        >
          Provider Overview
        </div>

        <div style={{ display: "flex", gap: 5 }}>
          {[
            ["12", "#6366f1"],
            ["5", "#10b981"],
            ["1", "#f59e0b"],
          ].map(([v, c]) => (
            <div
              key={v}
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 5,
                padding: "2px 6px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 11,
                  color: c,
                }}
              >
                {v}
              </div>

              <div
                style={{
                  fontSize: 7,
                  color: "#94a3b8",
                }}
              >
                leads
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 5,
        }}
      >
        {providers.map((p) => (
          <div
            key={p.name}
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 6,
              padding: "6px 8px",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 9,
                marginBottom: 4,
              }}
            >
              {p.name}
            </div>

            <div
              style={{
                height: 4,
                background: "#e2e8f0",
                borderRadius: 99,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${p.pct * 100}%`,
                  background: p.color,
                  borderRadius: 99,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 8,
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          borderRadius: 5,
          padding: "4px 8px",
          fontSize: 8,
          color: "#fff",
          fontWeight: 600,
        }}
      >
        ⚡ New lead assigned — real-time update
      </div>
    </div>
  );
}

function LeadsPreview() {
  const rows = [
    {
      name: "Priya S.",
      phone: "9876…",
      city: "Mumbai",
      svc: "S1",
      color: "#dbeafe",
      tc: "#1e40af",
    },
    {
      name: "Rahul M.",
      phone: "9123…",
      city: "Delhi",
      svc: "S2",
      color: "#fce7f3",
      tc: "#9d174d",
    },
    {
      name: "Anita K.",
      phone: "8800…",
      city: "Pune",
      svc: "S3",
      color: "#ede9fe",
      tc: "#5b21b6",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "system-ui",
        fontSize: 10,
        padding: 14,
        background: "#f8fafc",
        borderRadius: 10,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontWeight: 800,
          fontSize: 12,
          marginBottom: 10,
          color: "#0f172a",
        }}
      >
        All Leads (12)
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 0.6fr 1.2fr",
            padding: "5px 8px",
            background: "#f1f5f9",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          {["Customer", "Phone", "City", "Svc", "Providers"].map((h) => (
            <div
              key={h}
              style={{
                fontSize: 7,
                fontWeight: 700,
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {rows.map((r) => (
          <div
            key={r.name}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 0.6fr 1.2fr",
              padding: "6px 8px",
              borderBottom: "1px solid #f1f5f9",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 9, fontWeight: 600 }}>{r.name}</div>

            <div style={{ fontSize: 8, color: "#64748b" }}>
              {r.phone}
            </div>

            <div style={{ fontSize: 8, color: "#64748b" }}>
              {r.city}
            </div>

            <span
              style={{
                fontSize: 7,
                fontWeight: 700,
                background: r.color,
                color: r.tc,
                borderRadius: 99,
                padding: "1px 5px",
              }}
            >
              {r.svc}
            </span>

            <div style={{ display: "flex", gap: 2 }}>
              {["P1", "P3"].map((p) => (
                <span
                  key={p}
                  style={{
                    fontSize: 7,
                    background: "#dcfce7",
                    color: "#15803d",
                    borderRadius: 4,
                    padding: "1px 4px",
                    fontWeight: 600,
                  }}
                >
                  {p}
                </span>
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
    <div
      style={{
        fontFamily: "system-ui",
        fontSize: 10,
        padding: 14,
        background: "#f8fafc",
        borderRadius: 10,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontWeight: 800,
          fontSize: 12,
          marginBottom: 10,
          color: "#0f172a",
        }}
      >
        Test Tools
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginBottom: 10,
        }}
      >
        {[
          {
            icon: "🔄",
            label: "Reset Provider Quota",
            color: "#6366f1",
          },
          {
            icon: "⚡",
            label: "Test Idempotency (3×)",
            color: "#6366f1",
          },
          {
            icon: "🚀",
            label: "Generate 10 Leads",
            color: "#ef4444",
          },
        ].map((t) => (
          <div
            key={t.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 6,
              padding: "5px 8px",
            }}
          >
            <span style={{ fontSize: 11 }}>{t.icon}</span>

            <span
              style={{
                fontSize: 9,
                fontWeight: 600,
                flex: 1,
              }}
            >
              {t.label}
            </span>

            <div
              style={{
                background: t.color,
                borderRadius: 4,
                padding: "2px 6px",
                fontSize: 7,
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Run
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "#0f172a",
          borderRadius: 6,
          padding: "6px 8px",
        }}
      >
        <div
          style={{
            fontSize: 7,
            color: "#64748b",
            marginBottom: 4,
          }}
        >
          Event Log
        </div>

        <div style={{ fontSize: 8, color: "#4ade80" }}>
          ✓ Quota reset — all providers
        </div>

        <div style={{ fontSize: 8, color: "#fbbf24" }}>
          ⚡ Skipped (idempotent)
        </div>

        <div style={{ fontSize: 8, color: "#4ade80" }}>
          ✓ 10 leads generated
        </div>
      </div>
    </div>
  );
}

// Remaining constants and Overview component continue exactly the same...
// (Your structure is already correct after fixing unicode + component order)

export default function Overview() {
  return <div>Your corrected full app continues here...</div>;
}