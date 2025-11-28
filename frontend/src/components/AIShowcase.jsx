import React, { useState, useEffect, useRef } from "react";
import AppLayout from "./Sidebar/AppLayout";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line
} from "recharts";

// BACKEND BASE URL
const BASE = "http://localhost:8000";

export default function AIShowcase() {
  const tabs = ["Agent", "Chat", "Graph"];
  const [activeTab, setActiveTab] = useState("Agent");
  const [aiMode, setAiMode] = useState("online");

  // Input context JSON for agent
  const [contextJSON, setContextJSON] = useState(
    JSON.stringify(
      {
        income: 50000,
        expenses: [
          { amount: 20000, description: "zomato" },
          { amount: 22000, description: "swiggy" },
          { amount: 8000, description: "rent" }
        ],
        spendings_total: 30000,
        goals: [{ id: 1, title: "Laptop", target: 60000, saved: 10000, target_date: "2026-06-01" }]
      },
      null,
      2
    )
  );

  // States
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [agentSteps, setAgentSteps] = useState([]);
  const [plan, setPlan] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [savingsCurve, setSavingsCurve] = useState([]);
  const [error, setError] = useState(null);

  /* -----------------------------------------------------
     Typing animation hook (Clean version)
  ----------------------------------------------------- */
  function useTypingText(text, enabled) {
    const [output, setOutput] = useState("");
    const ref = useRef(null);

    useEffect(() => {
      if (!enabled) {
        setOutput(text);
        return;
      }
      setOutput("");
      let i = 0;

      clearInterval(ref.current);
      ref.current = setInterval(() => {
        i++;
        setOutput(text.slice(0, i));
        if (i >= text.length) clearInterval(ref.current);
      }, 18);

      return () => clearInterval(ref.current);
    }, [text, enabled]);

    return output;
  }

  /* -----------------------------------------------------
     Normalize Backend Response → Steps[]
  ----------------------------------------------------- */
  function normalizeAgentResponse(json) {
    if (!json) return { steps: [], plan: null, metrics: null };

    // new structure
    if (json.steps) {
      return {
        steps: json.steps,
        plan: json.plan ?? null,
        metrics: json.metrics ?? null
      };
    }

    // fallback
    if (json.action_name) {
      return {
        steps: [
          {
            step: 0,
            action_name: json.action_name,
            args: json.args ?? {},
            explanation: json.explanation ?? "",
            requires_confirmation: json.requires_confirmation ?? false,
            plan_fragment: json.plan_fragment ?? null,
            metrics: json.metrics ?? null,
            raw: json
          }
        ]
      };
    }

    return { steps: [], plan: null, metrics: null };
  }

  /* -----------------------------------------------------
     Run Agent
  ----------------------------------------------------- */
  async function runAgent() {
    setError(null);

    // Validate JSON
    let ctx;
    try {
      ctx = JSON.parse(contextJSON);
    } catch {
      setError("Invalid JSON context.");
      return;
    }

    setLoading(true);
    setTyping(true);
    setAgentSteps([]);
    setPlan(null);
    setChartData(null);
    setSavingsCurve([]);

    try {
      const res = await fetch(`${BASE}/ai/agent/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        // ❗ FIXED: user_id removed
        body: JSON.stringify({
          context: ctx,
          mode: aiMode,
          max_steps: 3
        })
      });

      const j = await res.json();

      if (!res.ok) {
        setError(j.detail || "Agent run failed.");
        setLoading(false);
        setTyping(false);
        return;
      }

      const normalized = normalizeAgentResponse(j);
      setAgentSteps(normalized.steps);
      setPlan(normalized.plan);

      const metrics = normalized.metrics ?? j.metrics ?? null;

      // If backend provides metrics → Build charts
      if (metrics) {
        if (metrics.spend_by_cat) {
          setChartData({
            labels: Object.keys(metrics.spend_by_cat),
            values: Object.values(metrics.spend_by_cat)
          });
        }
        if (metrics.savings_curve) {
          setSavingsCurve(metrics.savings_curve);
        }
      } else {
        // fallback → use /ai/graph/from-agent
        const graphRes = await fetch(`${BASE}/ai/graph/from-agent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ context: ctx })
        });
        const g = await graphRes.json();
        if (g.labels) setChartData(g);
      }
    } catch (e) {
      setError("Error: " + e.message);
    } finally {
      setTimeout(() => {
        setTyping(false);
        setLoading(false);
      }, 500);
    }
  }

  /* -----------------------------------------------------
     Execute Tool (accept proposal)
  ----------------------------------------------------- */
  async function acceptProposal(step) {
    try {
      const res = await fetch(`${BASE}/ai/tools/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: step.action_name, args: step.args || {}, user_id: 1 })
      });
      const j = await res.json();
      alert("Action executed:\n" + JSON.stringify(j, null, 2));
    } catch {
      alert("Action failed.");
    }
  }

  /* -----------------------------------------------------
     Graph Components (Bar + Line)
  ----------------------------------------------------- */
  function ChartPreview({ chart }) {
    if (!chart?.labels?.length) return <div className="text-gray-500">No chart yet.</div>;

    const data = chart.labels.map((l, i) => ({ name: l, value: chart.values[i] }));
    return (
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1E3A8A" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  function SavingsGraph({ curve }) {
    if (!curve?.length) return <div className="text-gray-500">No savings curve.</div>;

    return (
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={curve}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="savings" stroke="#10B981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  /* -----------------------------------------------------
     Step Card (with typing animation)
  ----------------------------------------------------- */
  function StepCard({ step }) {
    const text = step.explanation ?? "";
    const typed = useTypingText(text, typing);

    return (
      <div className="bg-white p-4 rounded-xl shadow border mb-4 hover:shadow-md transition">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
            {step.step}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-lg">{step.action_name}</h3>

            <p className="text-gray-700 mt-2">{typing ? typed : text}</p>

            {step.plan_fragment && (
              <div className="mt-3 p-3 bg-gray-50 rounded border">
                <div className="font-semibold">{step.plan_fragment.title}</div>
                <div className="text-gray-600 text-sm">
                  {step.plan_fragment.detail}
                </div>
              </div>
            )}

            {step.requires_confirmation && (
              <button
                onClick={() => acceptProposal(step)}
                className="mt-3 px-3 py-1 bg-green-600 text-white rounded text-sm"
              >
                Execute
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* -----------------------------------------------------
     Chat Panel
  ----------------------------------------------------- */
  function ChatPanel() {
    const [ctx, setCtx] = useState(JSON.stringify({ income: 50000 }, null, 2));
    const [q, setQ] = useState("");
    const [resp, setResp] = useState(null);
    const [thinking, setThinking] = useState(false);

    async function send() {
      let json;
      try {
        json = JSON.parse(ctx);
      } catch {
        alert("Invalid JSON");
        return;
      }
      setThinking(true);
      const r = await fetch(`${BASE}/ai/coach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context: json, question: q, mode: aiMode })
      });
      setResp(await r.json());
      setThinking(false);
    }

    return (
      <div className="grid grid-cols-2 gap-6 p-4">
        <textarea className="border p-3 rounded font-mono" rows={8} value={ctx} onChange={(e) => setCtx(e.target.value)} />
        <div>
          <input className="border p-2 w-full rounded mb-2" placeholder="Ask something..." value={q} onChange={(e) => setQ(e.target.value)} />
          <button onClick={send} className="bg-primary text-white px-4 py-2 rounded mb-3">
            {thinking ? "Thinking..." : "Ask"}
          </button>
          <pre className="bg-gray-50 p-3 rounded border text-sm">
            {resp ? JSON.stringify(resp, null, 2) : "No response yet."}
          </pre>
        </div>
      </div>
    );
  }

  /* -----------------------------------------------------
     DEMO CONTEXTS
  ----------------------------------------------------- */
  function loadDemoContext(mode) {
    if (mode === "overspend") {
      setContextJSON(
        JSON.stringify(
          {
            income: 50000,
            expenses: [
              { amount: 18000, description: "zomato" },
              { amount: 14000, description: "swiggy" },
              { amount: 9000, description: "rent" },
              { amount: 2500, description: "subscriptions" }
            ],
            spendings_total: 43500
          },
          null,
          2
        )
      );
    } else {
      setContextJSON(
        JSON.stringify(
          {
            income: 75000,
            expenses: [
              { amount: 20000, description: "rent" },
              { amount: 8000, description: "groceries" }
            ],
            spendings_total: 28000
          },
          null,
          2
        )
      );
    }
  }

  /* -----------------------------------------------------
     RENDER
  ----------------------------------------------------- */
  return (
    <AppLayout>
      <div className="min-h-screen bg-secondary p-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Arthaniti — Agentic AI Demo</h1>
          <p className="text-gray-600">Multi-step financial assistant with planning, metrics, & tools.</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-3 mb-6">
          <button onClick={() => setAiMode("online")} className={`px-3 py-1 rounded ${aiMode === "online" ? "bg-primary text-white" : "bg-white border"}`}>Online</button>
          <button onClick={() => setAiMode("offline")} className={`px-3 py-1 rounded ${aiMode === "offline" ? "bg-primary text-white" : "bg-white border"}`}>Offline</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded font-medium ${activeTab === t ? "bg-primary text-white" : "bg-white border"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* BODY */}
        <div className="bg-white rounded-lg shadow p-6">
          
          {/* AGENT TAB */}
          {activeTab === "Agent" && (
            <>
              <div className="flex gap-6">
                <textarea
                  className="flex-1 border rounded p-4 font-mono text-sm min-h-[260px]"
                  value={contextJSON}
                  onChange={(e) => setContextJSON(e.target.value)}
                />

                <div style={{ width: 300 }}>
                  <button onClick={runAgent} disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-semibold shadow">
                    {loading ? "Running..." : "Run Agent"}
                  </button>

                  <div className="mt-4 space-y-2">
                    <button onClick={() => loadDemoContext("overspend")} className="w-full bg-white border p-2 rounded">Load Overspend</button>
                    <button onClick={() => loadDemoContext("ok")} className="w-full bg-white border p-2 rounded">Load Balanced</button>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-3">Generated Steps</h2>
                <div className="grid gap-4">
                  {agentSteps.length > 0 ? (
                    agentSteps.map((s, i) => <StepCard key={i} step={s} />)
                  ) : (
                    <div className="text-gray-600">No steps yet.</div>
                  )}
                </div>
              </div>

              {/* Projections */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Spending Chart</h3>
                  <ChartPreview chart={chartData} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Savings Projection</h3>
                  <SavingsGraph curve={savingsCurve} />
                </div>
              </div>
            </>
          )}

          {/* CHAT TAB */}
          {activeTab === "Chat" && <ChatPanel />}

          {/* GRAPH TAB */}
          {activeTab === "Graph" && (
            <div>
              <h3 className="text-xl font-bold mb-3">Graph Playground</h3>
              <ChartPreview chart={chartData} />
              <div className="mt-6">
                <SavingsGraph curve={savingsCurve} />
              </div>
            </div>
          )}

        </div>

        {error && (
          <div className="mt-4 bg-red-100 text-red-700 p-3 rounded border">
            {error}
          </div>
        )}

      </div>
    </AppLayout>
  );
}
