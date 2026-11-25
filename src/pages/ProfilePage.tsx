import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';

/* ─────────────────────────── CEO (Executive) View ─────────────────────────── */
const CEOView: React.FC = () => (
  <div className="flex flex-col w-full gap-6">
    {/* Identity Card */}
    <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm relative overflow-hidden">
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-surface-container/60 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Identity Group */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md bg-surface-container">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZbJ35gLoNYb77HRXcm9zn_0hS-m3q8s-R6O5W_itiDAiCV2yb1WDcga4g6ppqRPP99wxqERzQ39fP9NedN1qa8FVyjQUptebptl1hiy95qeg_JzfVwyPVYBIIzFViJ6ZU_CpnlsZWYUVUiAs3jGUqVmImSPM5wgy_mtls9rcismYL5n5wt3M2tDW7IwCLOBntguxFnPjkqVwSH-8dsdIVT3zIU7TfnZeURIv7CM0"
                alt="Manav A."
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-surface-container-lowest p-1 rounded-full shadow-sm">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-primary" title="Cryptographically Verified Sovereign Node">
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Manav A.</h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">
                Co-Founder
              </span>
            </div>
            <p className="font-body-lg text-body-lg text-primary font-semibold mb-2">Chief Executive Officer &amp; Head of Product</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-on-surface-variant font-label-md text-label-md">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px] text-outline">mail</span>manav@taskflow.ai</span>
              <span className="text-outline-variant">•</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px] text-outline">location_on</span>San Francisco / Remote</span>
              <span className="text-outline-variant">•</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px] text-outline">verified</span>Founding Team • Jan 2024</span>
              <span className="text-outline-variant hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1 text-on-surface font-mono text-[11px] bg-surface-container-low px-2 py-0.5 rounded-md">
                <span className="material-symbols-outlined text-[13px] text-primary">memory</span>
                Apple M3 Max Secure Enclave • Bound
              </span>
            </div>
          </div>
        </div>

        {/* Action Strip */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-all shadow-sm" type="button">
            <span className="material-symbols-outlined text-[16px] text-primary">key</span>
            Hardware Key Auth
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-all shadow-sm" type="button">
            <span className="material-symbols-outlined text-[16px] text-outline">ios_share</span>
            Export Board Telemetry
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-secondary text-on-primary font-label-md text-label-md font-semibold transition-all shadow-sm" type="button">
            <span className="material-symbols-outlined text-[16px]">tune</span>
            Executive Actions
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
        </div>
      </div>

      {/* Vital Telemetry KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 bg-surface-container-low/50 rounded-xl p-4">
        {[
          { dot: 'bg-primary', label: 'Org Headcount', value: '142', sub: 'Active P2P nodes online', subColor: 'text-primary' },
          { dot: 'bg-primary-container', label: 'Runway & Burn', value: '28 Mo', sub: '$340k/mo net burn velocity', subColor: 'text-on-surface-variant' },
          { dot: 'bg-secondary', label: 'Consensus Speed', value: '4.2h', sub: '-38% vs Q3 baseline', subColor: 'text-primary' },
          { dot: 'bg-primary-container', label: 'Local AI Utilization', value: '94.8%', sub: 'Zero external cloud egress', subColor: 'text-primary' },
        ].map((kpi) => (
          <div key={kpi.label} className="flex flex-col p-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${kpi.dot}`} />{kpi.label}
            </span>
            <span className="font-data-metric text-data-metric text-on-surface mt-1">{kpi.value}</span>
            <span className={`font-label-sm text-label-sm ${kpi.subColor} font-medium mt-0.5`}>{kpi.sub}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Core Grid */}
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      {/* Left 8-col */}
      <div className="xl:col-span-8 flex flex-col gap-6">
        {/* Governance & Veto Authority */}
        <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-surface-container text-primary material-symbols-outlined text-[20px]">gavel</span>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Executive Governance &amp; Veto Authority</h2>
                <p className="font-label-md text-label-md text-on-surface-variant">Tier-0 multi-signature hardware orchestrator and emergency protocol controllers</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-mono text-[11px] font-semibold">Quorum: Active (2/3)</span>
          </div>

          {/* Multi-sig Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {[
              { title: 'Board Key Consensus', icon: 'fingerprint', metric: '2 / 3 Keys', desc: 'Manav A. & Lead Director verified. Third hardware key offline in safe custody.', footer1: 'Threshold reached', footer2: 'lock' },
              { title: 'Merkle Root Status', icon: 'account_tree', metric: 'Q1 Audit Signed', desc: 'Immutable hash 0x73d...8e11 committed to local distributed storage layer.', footer1: 'Block #1,940,214', footer2: null },
              { title: 'Signatory Status', icon: 'draw', metric: 'Sole Executive', desc: 'Authorized for Series B warrants, enterprise SLAs, and protocol fork vetoes.', footer1: 'Next Audit: in 14 days', footer2: null },
            ].map((card) => (
              <div key={card.title} className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">{card.title}</span>
                    <span className="material-symbols-outlined text-[16px] text-primary">{card.icon}</span>
                  </div>
                  <div className="font-data-metric text-data-metric text-on-surface">{card.metric}</div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">{card.desc}</p>
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between text-[11px] font-mono text-primary font-semibold">
                  <span>{card.footer1}</span>
                  {card.footer2 && <span className="material-symbols-outlined text-[14px]">{card.footer2}</span>}
                  {!card.footer2 && <span className="text-primary font-semibold">Verified</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Killswitch */}
          <div className="p-4 rounded-xl bg-surface-container flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-error shrink-0">
                <span className="material-symbols-outlined text-[22px]">emergency_home</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Emergency Workspace Killswitch &amp; Freeze</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Instantly rotate all peer session tokens, force local sandbox airgap, and notify board counsel.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-all" type="button">Audit Digest</button>
              <button className="px-3.5 py-1.5 rounded-lg bg-surface-container-highest hover:bg-error-container text-on-surface hover:text-on-error-container font-label-md text-label-md font-semibold transition-all" type="button">Arm Protocol Freeze</button>
            </div>
          </div>
        </div>

        {/* Cross-Department Velocity */}
        <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Cross-Department Velocity &amp; Capital Telemetry</h2>
              <p className="font-label-md text-label-md text-on-surface-variant">Real-time throughput calculated from zero-knowledge local task completions</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm font-semibold">Efficiency Index: 1.48x</span>
          </div>

          <div className="space-y-4 mb-6">
            {[
              { color: 'bg-primary', dotClass: 'bg-primary', label: 'Engineering & Distributed Core', meta: '84 commits/hr', pct: 96 },
              { color: 'bg-primary-container', dotClass: 'bg-primary-container', label: 'Product Architecture & UX', meta: '14 features in stage', pct: 92 },
              { color: 'bg-secondary', dotClass: 'bg-secondary', label: 'Enterprise Pipeline & Go-to-Market', meta: '$1.8M qualified pipeline', pct: 88 },
            ].map((bar) => (
              <div key={bar.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-body-sm font-body-sm">
                  <span className="font-semibold text-on-surface flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-sm ${bar.dotClass}`} />{bar.label}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-on-surface-variant font-mono text-[12px]">{bar.meta}</span>
                    <span className="font-bold text-on-surface">{bar.pct}%</span>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className={`h-full ${bar.color} rounded-full transition-all duration-500`} style={{ width: `${bar.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sparkline Card */}
            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Burn vs Capital Output</span>
                <span className="font-label-sm text-label-sm text-primary font-bold">+18.4% Efficiency</span>
              </div>
              <div className="py-2">
                <svg className="w-full h-16 overflow-visible" fill="none" viewBox="0 0 300 64">
                  <defs>
                    <linearGradient id="emeraldGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#35e879" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#35e879" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,52 Q40,48 80,42 T160,34 T220,18 T300,8 L300,64 L0,64 Z" fill="url(#emeraldGrad)" />
                  <path d="M0,52 Q40,48 80,42 T160,34 T220,18 T300,8" stroke="#006d32" strokeLinecap="round" strokeWidth="2.5" />
                  <circle cx="160" cy="34" fill="#35e879" r="3.5" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="300" cy="8" fill="#006d32" r="4.5" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant pt-2">
                <span>Nov ($380k)</span><span>Dec ($360k)</span><span className="text-on-surface font-semibold">Jan ($340k)</span>
              </div>
            </div>

            {/* Org Health Card */}
            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Live Org Sentiment &amp; Security</span>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Optimal
                </span>
              </div>
              <div className="flex items-baseline gap-3 my-1">
                <span className="font-data-metric text-data-metric text-on-surface">92<span className="font-body-sm text-body-sm text-on-surface-variant font-normal">/100</span></span>
                <span className="font-label-md text-label-md text-on-surface-variant">Anonymous pulse satisfaction</span>
              </div>
              <div className="mt-2 pt-2 bg-surface-container-lowest/80 rounded-lg p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-medium">Egress Leak Violations</span>
                </div>
                <span className="font-mono text-[12px] font-bold text-primary">0 Across 142 Nodes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Authorization Matrix */}
        <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Role Privileges &amp; Authorization Matrix</h2>
              <p className="font-label-md text-label-md text-on-surface-variant">Granular security capabilities bound to your cryptographic hardware identifier</p>
            </div>
            <span className="font-mono text-[11px] text-primary font-semibold bg-surface-container px-2.5 py-1 rounded-md">ROLE: EXEC_CEO_T0</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: 'verified', title: 'Cross-Workspace Audit Access', desc: 'Unrestricted permission to read tamper-evident logs from all encrypted enterprise tenant pools.' },
              { icon: 'block', title: 'Veto Authority over Deployments', desc: 'Instant hardware override on production releases failing security criteria or customer compliance.' },
              { icon: 'key_vertical', title: 'Direct Enclave Master Key Access', desc: 'Privileged execution rights to re-key organizational vaults during planned security rotations.' },
              { icon: 'account_balance', title: 'Board & Investor Enclave Access', desc: 'Direct channel to sovereign cap-table datarooms, voting contracts, and automated legal filings.' },
            ].map((p) => (
              <div key={p.title} className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">{p.icon}</span>
                <div>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">{p.title}</span>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right 4-col */}
      <div className="xl:col-span-4 flex flex-col gap-6">
        {/* Executive Desk Copilot */}
        <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse" />
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Executive Desk</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">Manav.AI active</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Continuous local LLM synthesis of company git logs, board deliverables, and critical blocker trajectories.</p>

          <div className="p-4 rounded-xl bg-surface-container-low mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center gap-1 font-label-sm text-label-sm font-bold text-error">
                <span className="material-symbols-outlined text-[14px]">warning</span>Dependency Blocker Detected
              </span>
              <span className="font-mono text-[10px] text-on-surface-variant">28m ago</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface leading-snug">3 cross-team dependencies detected between <span className="font-semibold text-primary">Arc Sync</span> and <span className="font-semibold text-primary">Primor Core</span>. Engineering sprint delta lagging by 2.4 days.</p>
            <div className="mt-3 pt-2 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">AI Recommendation: Sync leads</span>
              <button className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold transition-colors" type="button">Ping VP Eng</button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center gap-1 font-label-sm text-label-sm font-bold text-primary">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>Telemetry Artifact Ready
              </span>
              <span className="font-mono text-[10px] text-on-surface-variant">1h ago</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface leading-snug">Board deck draft auto-compiled from local commit logs, financial reconciliations, and customer cohort signals.</p>
            <div className="mt-3 pt-2 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Version 2.4-DRAFT</span>
              <button className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold transition-colors" type="button">Review Artifact</button>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            {[
              { icon: 'description', label: 'Generate Board Brief' },
              { icon: 'pie_chart', label: 'Review Cap Table Enclave' },
            ].map((btn) => (
              <button key={btn.label} className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-all shadow-sm" type="button">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-primary">{btn.icon}</span>{btn.label}</span>
                <span className="material-symbols-outlined text-[16px] text-outline">arrow_forward</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cryptographic Session */}
        <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm">
          <div className="flex items-center justify-between pb-2 mb-4">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Cryptographic Session</h3>
            <span className="material-symbols-outlined text-[18px] text-primary">lock_clock</span>
          </div>
          <div className="space-y-3">
            {[
              ['Primary Device', 'MBP 16" (M3 Max 128G)'],
              ['Local Vault Storage', '1.8 TB / Encrypted APFS'],
              ['Hardware Key Pair', 'YubiKey 5C NFC • Active'],
              ['Last Re-attestation', 'Today, 08:14 PST'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-body-sm font-body-sm">
                <span className="text-on-surface-variant">{k}</span>
                <span className={`font-semibold font-mono text-[12px] ${k === 'Hardware Key Pair' ? 'text-primary' : 'text-on-surface'}`}>{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 p-3 rounded-lg bg-surface-container-low text-center">
            <span className="font-mono text-[11px] text-on-surface-variant block mb-1">SOVEREIGN ATTESTATION SIGNATURE</span>
            <span className="font-mono text-[10px] text-primary break-all select-all font-semibold">3a88c2b7d41f098ea43734b071e62bb6b8296a1572c608cbfe25c3</span>
          </div>
        </div>

        {/* Executive Core Peers */}
        <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm">
          <div className="flex items-center justify-between pb-2 mb-4">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Executive Core Peers</h3>
            <span className="font-label-sm text-label-sm text-on-surface-variant">4 Direct Leads</span>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Elena Rostova', role: 'VP Engineering • Lead Key 2', online: true, src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzFv6-cKhJsntDs4h3G2pVW36h1alz9EL6xRL_GKk6gXuHosvjRU1kj8VnLYvX-XQ13DZBUhgP-W13EaogtwXTdxUJ_ydDdYD32ITWAxWREjLqrAqpvsCB5sJnZ9P061JaknB5Joc9OkfmTkoCJAZ5qbnyORZsfqur0wJT08QVFgYQ3qhI0JtFRGz5RJJtbB0E8i0NYB-HEiOIqi6vH9fbis_5491pjgkRca49aGM' },
              { name: 'David K.', role: 'Chief Commercial Officer', online: true, src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF3yCMjG8L8j_wseH4RGzNeeM7Wi5szwWV4rZvKEo--0mEqX-sxgvt2FxK9hAgB_hAZfmzDIFqPesvnEBHbQeCTlXLpYgs_14Fe4S3HGkVlug-V0DxqIks9vMQVb6G1gNGm5zK0krpDtQh6BvurfxTWLNsyqyAAW0_tFom1v7q31iCYlHkjwgC78qLz7SBG5UHoT6TalT-893--FUZYHGfJB2RWod2W2yude-CFN0' },
              { name: 'Sarah Lin', role: 'General Counsel & Compliance', online: false, src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC697bG3r-qgQEC5E4QEA_Tjr21cUu0SsHIQYt35kSXMhD2qixEezBRj73AkoKY9chVBOrYNy7OK8JacFpV8mBi_hDcvtg7pFaskv19X1vnywSGSlKl9CI-xEJLr3iYGnYiW8XREWohYseExCkvF2JVHxnkiUjjc-IPLyNXC_hA4E-j2i0YmkDyr5V7nJg2hhiJf-9G5Bdjj44BdvvUBiuOFD5MLKfys3OUdk0ekzk' },
            ].map((peer) => (
              <div key={peer.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden shrink-0">
                    <img className="w-full h-full object-cover" src={peer.src} alt={peer.name} />
                  </div>
                  <div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface block">{peer.name}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{peer.role}</span>
                  </div>
                </div>
                <span className={`w-2 h-2 rounded-full ${peer.online ? 'bg-primary' : 'bg-surface-dim'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────── Admin (Ops) View ──────────────────────────────── */
const AdminView: React.FC = () => {
  const [nodeFilter, setNodeFilter] = useState('');
  const [terminalLogs] = useState([
    { cls: 'text-outline-variant', msg: '[14:32:01.04] Init WebRTC relay broadcast...' },
    { cls: 'text-primary-container', msg: '[14:32:01.12] Node #882 handshake verified (ECDSA P-256)' },
    { cls: '', msg: '[14:32:02.40] WAL delta sync: 12 peer blocks propagated' },
    { cls: 'text-primary-container', msg: '[14:32:03.01] CRDT vector clock reconciled across 14 peers' },
    { cls: '', msg: '[14:32:05.18] Key rotation heartbeat: OK' },
    { cls: 'text-outline-variant', msg: '[14:32:08.50] Ephemeral buffer scrubbed (0 leaks)' },
  ]);

  const iamRows = [
    { initials: 'EL', name: 'Evelyn Lin', email: 'e.lin@taskflow.ai', role: 'Dept Lead (Eng)', cred: 'TouchID FIDO2', peer: 'Peer #419 (Direct)', online: true },
    { initials: 'DC', name: 'Devon Chen', email: 'd.chen@taskflow.ai', role: 'Staff Engineer', cred: 'YubiKey Bio', peer: 'Peer #104 (Direct)', online: true },
    { initials: 'KR', name: 'Kavita Rao', email: 'k.rao@taskflow.ai', role: 'SecOps Analyst', cred: 'WebAuthn SoftKey', peer: 'Encrypted SQLite Relay', online: false },
  ].filter((r) => !nodeFilter.trim() || r.name.toLowerCase().includes(nodeFilter.toLowerCase()) || r.email.toLowerCase().includes(nodeFilter.toLowerCase()));

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Hero Admin Profile */}
      <div className="relative overflow-hidden bg-surface-container-lowest rounded-2xl shadow-sm p-6 flex flex-col lg:flex-row gap-6 items-start justify-between">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center relative z-10">
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md bg-surface-container-high relative">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwLwfG0rWl8Dq9xwD3cEdrPZCYz9EXfx2OXrr_MT_NGG5N_L5WVH-RYmmn7LO4S3A9Re50aDAAYwY-2JPNbbA41gnqT2n7Ya1-ZK2B1wEK8Oj-lkkZSzH8EmU6-sCzyhxyMWPMhQAOmhkDZO27G_3gRb9KTv7t06H1tKAx_q96Gk7FsHsuMqEcBOtSaZv6gYBhwG9xwCAUuBY5YcWl5GTUTu_xnqJTVbpwrW8Y-zY" alt="Bessie A." />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold">Bessie A.</span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-inverse-surface text-inverse-on-surface shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-primary-container">vpn_key</span>
                <span className="font-label-sm text-label-sm font-semibold tracking-wide">Superuser (Root / Ops)</span>
              </div>
              <span className="bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />Air-Gapped Vault
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant font-medium">Principal Infrastructure &amp; Security Administrator</p>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 font-body-sm text-body-sm text-on-surface-variant mt-1">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-outline">mail</span>bessie.a@taskflow.ai</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-outline">corporate_fare</span>Security &amp; Infrastructure Enclave</span>
              <span className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded font-mono text-[12px] text-on-surface">
                <span className="material-symbols-outlined text-[14px] text-primary">fingerprint</span>SHA-256: 8f4e•••c391
              </span>
              <span className="flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded font-label-sm text-label-sm text-primary font-medium">
                <span className="material-symbols-outlined text-[14px]">usb</span>YubiKey 5C NFC • Active
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-col items-stretch justify-end gap-2 shrink-0 w-full lg:w-auto relative z-10">
          <button className="bg-primary hover:bg-on-primary-container text-on-primary font-label-md text-label-md px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm transition-all" type="button">
            <span className="material-symbols-outlined text-[18px]">key</span>Issue Emergency Token
          </button>
          <button className="bg-surface-container hover:bg-error-container hover:text-on-error-container text-on-surface font-label-md text-label-md px-5 py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition-all" type="button">
            <span className="material-symbols-outlined text-[18px]">gavel</span>Revoke Node Access
          </button>
          <button className="bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md px-5 py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition-all" type="button">
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>Audit Logs
          </button>
        </div>
      </div>

      {/* Admin KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Active Mesh Nodes', icon: 'hub', metric: '142', metaSub: '0 compromised', metaSubColor: 'text-primary', pct: 100, foot: '100% mutual TLS attestation' },
          { label: 'Policy Compliance', icon: 'security', metric: '99.8%', metaSub: '+0.2% mo/mo', metaSubColor: 'text-primary', pct: 99.8, foot: 'SOC2 Type II & HIPAA air-gap valid' },
          { label: 'Security Incidents', icon: 'shield_with_heart', metric: '0 High', metaSub: '/ 2 Minor Warnings', metaSubColor: 'text-on-surface-variant', pct: 95, foot: 'Both warnings mitigated via sandbox', barColor: 'bg-primary-container' },
          { label: 'CRDT Sync Latency', icon: 'speed', metric: '14ms', metaSub: 'Global P2P', metaSubColor: 'text-primary', pct: 92, foot: 'SQLite WAL delta replication active' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
              <span>{kpi.label}</span>
              <span className="material-symbols-outlined text-primary text-[20px]">{kpi.icon}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-data-metric text-data-metric text-on-surface">{kpi.metric}</span>
              <span className={`font-label-sm text-label-sm font-semibold ${kpi.metaSubColor}`}>{kpi.metaSub}</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div className={`h-full ${kpi.barColor ?? 'bg-primary'} rounded-full`} style={{ width: `${kpi.pct}%` }} />
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">{kpi.foot}</span>
          </div>
        ))}
      </div>

      {/* Main Admin Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left 8-col */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* IAM Table */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">IAM, Node Management &amp; Access Control</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Granular peer privileges, session revoking, and dual-key token delegation.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-surface-container-low px-3 py-1.5 rounded-full text-body-sm">
                  <span className="material-symbols-outlined text-outline text-[16px] mr-1.5">filter_list</span>
                  <input className="bg-transparent border-none outline-none text-body-sm text-on-surface placeholder:text-outline w-36" placeholder="Filter node ID..." type="text" value={nodeFilter} onChange={(e) => setNodeFilter(e.target.value)} />
                </div>
                <button className="bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-1.5 rounded-full font-label-sm text-label-sm font-medium transition-colors" type="button">Export Matrix</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                    <th className="py-2.5 px-3 rounded-l-xl">User / Principal</th>
                    <th className="py-2.5 px-3">Role Authorization</th>
                    <th className="py-2.5 px-3">Hardware Credential</th>
                    <th className="py-2.5 px-3">P2P Session Status</th>
                    <th className="py-2.5 px-3 text-right rounded-r-xl">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-transparent font-body-sm text-body-sm">
                  {iamRows.map((row) => (
                    <tr key={row.email} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-semibold ${row.online ? 'text-primary' : 'text-on-surface-variant'}`}>{row.initials}</div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-on-surface">{row.name}</span>
                            <span className="font-mono text-[11px] text-on-surface-variant">{row.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-surface-container px-2.5 py-1 rounded-full font-label-sm text-label-sm text-on-surface font-medium">{row.role}</span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-on-surface-variant">{row.cred}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${row.online ? 'bg-primary' : 'bg-secondary-fixed'}`} />
                          <span className={row.online ? 'text-on-surface' : 'text-on-surface-variant'}>{row.peer}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1 rounded hover:bg-surface-container text-outline hover:text-on-surface transition-colors" title="Manage Permissions" type="button">
                            <span className="material-symbols-outlined text-[18px]">tune</span>
                          </button>
                          <button className="p-1 rounded hover:bg-error-container text-outline hover:text-error transition-colors" title="Terminate Session" type="button">
                            <span className="material-symbols-outlined text-[18px]">power_settings_new</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Showing {iamRows.length} of 142 provisioned node keys</span>
              <div className="flex items-center gap-2">
                <button className="bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm px-4 py-1.5 rounded-full font-medium transition-colors" type="button">Assign Employee</button>
                <button className="bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm px-4 py-1.5 rounded-full font-medium transition-colors" type="button">Promote to Dept Lead</button>
                <button className="bg-error-container text-on-error-container font-label-sm text-label-sm px-4 py-1.5 rounded-full font-medium hover:brightness-95 transition-all" type="button">Revoke Dormant Keys</button>
              </div>
            </div>
          </div>

          {/* Mesh Health */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">share</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Enclave &amp; WebRTC Mesh Health</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Real-time peer gossip synchronization &amp; zero-cloud egress validation.</p>
              </div>
              <span className="bg-surface-container px-3 py-1 rounded-full font-mono text-[11px] text-primary font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />0.00 KB Cloud Egress
              </span>
            </div>

            <div className="w-full bg-surface-container-low rounded-xl p-5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="flex flex-col gap-2 z-10">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Local Mesh Topology</span>
                <span className="font-headline-md text-headline-md text-on-surface font-bold">Peer-to-Peer Vector Matrix</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">Every mutation syncs across LAN WebRTC channels with zero unencrypted intermediary transit.</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-on-surface font-mono text-[11px]">
                    <span className="material-symbols-outlined text-primary text-[16px]">sync</span>WAL Sync: Valid
                  </div>
                  <div className="flex items-center gap-1 text-on-surface font-mono text-[11px]">
                    <span className="material-symbols-outlined text-primary text-[16px]">lock</span>ChaCha20-Poly1305
                  </div>
                </div>
              </div>
              <div className="relative shrink-0 w-64 h-36 flex items-center justify-center">
                <svg className="w-full h-full text-primary" fill="none" viewBox="0 0 240 120">
                  <path d="M40 60 L120 25 M40 60 L120 95 M120 25 L200 60 M120 95 L200 60 M120 25 L120 95 M40 60 L200 60" stroke="#bbcbb9" strokeDasharray="3 3" strokeWidth="1.5" />
                  <path d="M40 60 L120 25 L200 60" stroke="currentColor" strokeWidth="2" />
                  <circle cx="40" cy="60" fill="#eff4ff" r="12" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="40" cy="60" fill="currentColor" r="4" />
                  <circle cx="120" cy="25" fill="#eff4ff" r="14" stroke="currentColor" strokeWidth="3" />
                  <circle cx="120" cy="25" fill="#35e879" r="5" />
                  <circle cx="120" cy="95" fill="#eff4ff" r="10" stroke="#6c7b6c" strokeWidth="2" />
                  <circle cx="120" cy="95" fill="#6c7b6c" r="3.5" />
                  <circle cx="200" cy="60" fill="#eff4ff" r="12" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="200" cy="60" fill="currentColor" r="4" />
                  <circle cx="120" cy="25" r="20" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
                </svg>
                <div className="absolute bottom-1 right-2 font-mono text-[11px] text-outline-variant">14ms latency</div>
              </div>
            </div>
          </div>

          {/* Admin Tier Authority */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">policy</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Admin Tier Authority Boundaries</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: 'check_circle', color: 'text-primary', bg: 'bg-surface-container-low', title: 'Full Sandbox Management', desc: 'Ability to deploy, halt, or isolate peer containers and mesh sockets on demand.' },
                { icon: 'check_circle', color: 'text-primary', bg: 'bg-surface-container-low', title: 'User Lifecycle Provisioning', desc: 'Full authority to mint cryptographic root keypairs and revoke compromised seats.' },
                { icon: 'check_circle', color: 'text-primary', bg: 'bg-surface-container-low', title: 'ZK Audit Log Inspection', desc: 'Inspect immutable audit streams verified via zero-knowledge proof validity hashes.' },
                { icon: 'lock_clock', color: 'text-error', bg: 'bg-error-container/20', title: 'Dual-Key Quorum Constraint', desc: 'Cannot view end-user encrypted documents without 2-of-3 Executive keyholder quorum.' },
              ].map((p) => (
                <div key={p.title} className={`p-4 ${p.bg} rounded-xl flex items-start gap-3`}>
                  <span className={`material-symbols-outlined ${p.color} text-[20px] mt-0.5`}>{p.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-body-md text-body-md font-semibold text-on-surface">{p.title}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4-col */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Enforcement Rules */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">toggle_on</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Enforcement Rules</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Active cryptographic constraints applied to all connected clients.</p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { title: 'Mandatory FIDO2 WebAuthn', sub: 'Strict hardware passkey requirement', audit: 'ENF-782 • Verified' },
                { title: '15-min Inactivity Ephemeral Lock', sub: 'Purges memory buffer on screen idle', audit: 'POL-004 • Active' },
                { title: 'Zero-Knowledge Cloud Egress Filter', sub: 'Blocks any unhashed payloads', audit: 'AIR-991 • Enforced' },
                { title: 'CRDT Signature Verification', sub: 'Signs every delta state merge', audit: 'SIG-108 • Strict' },
              ].map((rule) => (
                <div key={rule.title} className="flex items-start justify-between gap-3 p-3 rounded-xl bg-surface-container-low/70">
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm font-semibold text-on-surface">{rule.title}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{rule.sub}</span>
                    <span className="font-mono text-[11px] text-primary mt-1">{rule.audit}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer mt-1 shrink-0">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-10 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-container-lowest after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Ops Terminal */}
          <div className="bg-inverse-surface text-inverse-on-surface rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-[20px]">terminal</span>
                <span className="font-headline-sm text-headline-sm font-bold text-inverse-on-surface">Ops Terminal</span>
              </div>
              <span className="font-label-sm text-label-sm bg-surface-container/20 text-primary-fixed-dim px-2 py-0.5 rounded font-mono">LIVE FEED</span>
            </div>
            <div className="bg-black/30 rounded-xl p-4 font-mono text-[11px] flex flex-col gap-1.5 h-44 overflow-y-auto select-all text-tertiary-fixed">
              {terminalLogs.map((log, i) => (
                <div key={i} className={log.cls}>{log.msg}</div>
              ))}
              <div className="flex items-center gap-1 text-primary-fixed-dim">
                <span>&gt; awaiting admin daemon signal</span>
                <span className="w-2 h-4 bg-primary-container animate-pulse inline-block" />
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline-variant font-medium">Quick Operator Primitives</span>
              {[
                { icon: 'sync_lock', label: 'Rotate Mesh Keys', meta: '30s cycle', primary: true },
                { icon: 'cleaning_services', label: 'Prune Ephemeral Buffers', meta: 'Scrub', primary: false },
                { icon: 'verified', label: 'Force Re-attestation', meta: 'All Nodes', primary: false },
              ].map((op) => (
                <button key={op.label} className={`w-full ${op.primary ? 'bg-primary/20 hover:bg-primary/30 text-primary-container' : 'bg-surface-container/10 hover:bg-surface-container/20 text-inverse-on-surface'} border-none py-2 px-4 rounded-xl font-label-md text-label-md font-semibold flex items-center justify-between transition-colors`} type="button">
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">{op.icon}</span>{op.label}</span>
                  <span className="font-mono text-[11px] opacity-75">{op.meta}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── Employee View ─────────────────────────────────── */
const EmployeeView: React.FC = () => (
  <div className="flex flex-col w-full gap-6">
    {/* Hero Identity Banner */}
    <div className="relative bg-surface-container-lowest rounded-2xl p-6 lg:p-8 shadow-sm overflow-hidden">
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/3 -bottom-24 w-80 h-80 bg-surface-container-high/40 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative shrink-0">
            <img className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOJRI0JUAGQ5lgQDYAzvZCPpC-WlE2oa_OCEHXHZLfOn-MG4DGwGcqHThe9qXMxwbSXUTd6ovHN9hifS9dc0MUhCgfEJk4TNQjUs3v3DTfs-qSDEihubp1hQabLzgleOWjQOiPbOVcQCf4ZYmTtSApNWepP0NHfxzuaMDGQSyh_92AzA0og_Jh3BdnJZ-8q3KOJ6hotZ9fxVHidBoozHlcVG8CKF4Iugb6in9wf5Q" alt="Alex M." />
            <div className="absolute -bottom-1 -right-1 bg-surface-container-lowest p-1 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[20px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Alex M.</h1>
              <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-medium">Senior Frontend Engineer</span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-primary bg-secondary-container/30 px-2 py-0.5 rounded-full font-semibold">
                <span className="material-symbols-outlined text-[14px]">lock</span>Local Enclave Active
              </span>
            </div>
            <div className="flex items-center gap-y-1 gap-x-4 flex-wrap mt-2 font-body-sm text-body-sm text-on-surface-variant">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-outline">domain</span>Core UI &amp; App Architecture</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-outline">alternate_email</span>alex.m@taskflow.ai</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-outline">supervisor_account</span>Reports to: <strong className="text-on-surface font-medium ml-0.5">Brandie S. (Arc Lead)</strong></span>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">hard_drive</span>
                <span className="font-label-sm text-label-sm text-on-surface font-medium">Local Enclave: 14.2 GB Allocated</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">(4.8 GB Used)</span>
              </div>
              <div className="w-full sm:w-44 h-2 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary-container rounded-full" style={{ width: '33.8%' }} />
              </div>
              <span className="font-mono text-[11px] text-on-surface-variant">33.8%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all shadow-sm" type="button">
            <span className="material-symbols-outlined text-[18px]">edit</span>Edit Profile Info
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all shadow-sm" type="button">
            <span className="material-symbols-outlined text-[18px] text-primary">key</span>Connect Hardware Key
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-md text-label-md font-semibold transition-all shadow-sm" type="button">
            <span className="material-symbols-outlined text-[18px]">upgrade</span>Request Elevation
          </button>
        </div>
      </div>

      {/* Performance Strip */}
      <div className="mt-6 pt-5 grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface-container-low/50 p-4 rounded-xl">
        {[
          { icon: 'timer', label: 'Current Sprint Focus', value: '38.5', unit: 'hrs', extra: null },
          { icon: 'merge', label: 'PRs Merged (Cycle)', value: '14', unit: '', extra: '↑ +3' },
          { icon: 'speed', label: 'Review Turnaround', value: '1.8', unit: 'hrs', extra: null },
          { icon: 'bolt', label: 'Pomodoro Completion', value: '92%', unit: '', extra: null },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant block">{s.label}</span>
              <span className="font-data-metric text-data-metric text-on-surface">
                {s.value}
                {s.unit && <span className="font-body-sm text-body-sm font-normal text-on-surface-variant ml-1">{s.unit}</span>}
                {s.extra && <span className="font-body-sm text-body-sm text-primary font-medium ml-1">{s.extra}</span>}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Main Bento Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left 8-col */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Assigned Projects */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">source_environment</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Assigned Projects &amp; Workstreams</h2>
            </div>
            <span className="font-label-sm text-label-sm bg-surface-container px-2.5 py-1 rounded-full text-on-surface font-medium">3 Active Targets</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {[
              { tag: 'PRI-88', title: 'Primor Project', desc: 'Core WebRTC UI real-time streaming pipeline & canvas synchronization.', branch: 'feat/webrtc-av', time: '4 mins ago', active: true },
              { tag: 'ARC-DS', title: 'Design System v2.4', desc: 'Component parity audit, pill navigation styling, and high-velocity token mapping.', branch: 'tokens/pill-fix', time: '2 hrs ago', active: true },
              { tag: 'CHM-12', title: 'Meeting Chamber UI', desc: 'Optimization of local telemetry monitors and zero-latency audio meter renderer.', branch: 'perf/canvas-2d', time: 'Yesterday', active: false },
            ].map((proj) => (
              <div key={proj.tag} className="bg-surface-container-low/60 hover:bg-surface-container-low p-4 rounded-xl transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-primary bg-secondary-container/40 px-2 py-0.5 rounded-full font-semibold">{proj.tag}</span>
                    <span className={`w-2 h-2 rounded-full ${proj.active ? 'bg-primary-container' : 'bg-outline-variant'}`} />
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{proj.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{proj.desc}</p>
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>Branch: <code className="font-mono text-[11px] text-on-surface">{proj.branch}</code></span>
                  <span className={proj.active ? 'text-primary font-medium' : 'text-on-surface-variant'}>{proj.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Git Stream */}
          <div className="mt-5 pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-outline">commit</span>Active Git Stream &amp; Local Enclave Sync
              </span>
              <span className="font-mono text-[11px] text-primary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />Head synchronized
              </span>
            </div>
            <div className="space-y-2">
              {[
                { hash: 'e82a91f', msg: 'fix(audio-bridge): debounce WebRTC echo-cancellation switchboard', tag: '#PRI-882', time: '18m ago' },
                { hash: '91c402b', msg: 'refactor(tokens): harmonize high-velocity spring green borders on pills', tag: '#ARC-8942', time: '3h ago' },
                { hash: 'f4a2890', msg: 'feat(chamber): connect WebRTC session telemetry to floating pill', tag: '#CHM-12', time: 'Yesterday' },
              ].map((commit) => (
                <div key={commit.hash} className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded shrink-0">{commit.hash}</span>
                    <p className="font-body-sm text-body-sm text-on-surface truncate">{commit.msg}</p>
                    <span className="hidden sm:inline-block font-mono text-[11px] text-primary bg-secondary-container/30 px-2 py-0.5 rounded-full shrink-0">{commit.tag}</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline shrink-0 ml-3">{commit.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Queue */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">assignment_turned_in</span>Next Assigned Focus Tasks
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Top priority deliverables mapped to your current local sprint session.</p>
            </div>
            <button className="font-label-sm text-label-sm px-3 py-1.5 rounded-full bg-secondary-container/40 text-on-secondary-container hover:bg-secondary-container font-semibold transition-all flex items-center gap-1" type="button">
              <span className="material-symbols-outlined text-[16px]">play_circle</span>Start Focus Session
            </button>
          </div>
          <div className="space-y-3 mt-2">
            {[
              { badge: 'Critical P0', badgeColor: 'text-error bg-error-container/40', borderColor: 'border-primary', title: 'Refactor WebRTC multi-peer handshake handler', desc: 'Resolve reconnect loop when local enclave switches between Wi-Fi and 10GbE fiber rail.', est: '2.5h' },
              { badge: 'Sprint P1', badgeColor: 'text-primary bg-secondary-container/40', borderColor: 'border-primary', title: 'Validate Tailwind token extraction in Figma plugin', desc: 'Sync tokens across 42 new frosted glass components with Brandie S. signoff.', est: '1.0h' },
              { badge: 'Sprint P2', badgeColor: 'text-on-surface-variant bg-surface-container', borderColor: 'border-outline', title: 'Draft technical spec for local-first encrypted sqlite sync', desc: 'Document CRDT merge patterns for asynchronous teammate contributions.', est: '4.0h' },
            ].map((task) => (
              <div key={task.title} className="p-4 rounded-xl bg-surface-container-low/50 hover:bg-surface-container-low transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded border-2 ${task.borderColor} flex items-center justify-center text-primary bg-surface-container-lowest cursor-pointer`} />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-mono text-[11px] ${task.badgeColor} px-2 py-0.5 rounded-full font-medium`}>{task.badge}</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface">{task.title}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{task.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <span className="font-mono text-[11px] text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">Est: {task.est}</span>
                  <button className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary font-label-sm text-label-sm transition-all shadow-sm" type="button">Launch Branch</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right 4-col */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* Privacy & Sandbox */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">memory</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Privacy &amp; Sandbox</h2>
            </div>
            <span className="font-mono text-[11px] text-primary bg-secondary-container/40 px-2 py-0.5 rounded-full">Encrypted</span>
          </div>
          <div className="space-y-4">
            <div className="bg-surface-container-low/60 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-md text-label-md text-on-surface font-semibold">On-Device AI Engine</span>
                <span className="font-label-sm text-label-sm text-primary font-medium">Zero-Cloud Leak</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">Llama-3 8B Quantized (Local inference only via Apple Silicon / Vulkan ML).</p>
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-2">
                <span>VRAM Allocation Cap</span>
                <span className="font-mono text-[12px] text-on-surface font-semibold">8.0 GB / 32 GB</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '25%' }} />
              </div>
            </div>

            <div className="bg-surface-container-low/60 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-md text-label-md text-on-surface font-semibold">Focus &amp; DND Switchboard</span>
                <span className="material-symbols-outlined text-[18px] text-primary">do_not_disturb_on</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">25m Focus / 5m Recovery interval. Auto-mutes WebRTC incoming pings.</p>
              <div className="space-y-2 pt-1 font-label-sm text-label-sm">
                {['Auto-DND Slack & WebRTC ringers', 'Auto-generate PR standup summary', 'Local encrypted scratchpad sync'].map((item) => (
                  <label key={item} className="flex items-center justify-between cursor-pointer">
                    <span className="text-on-surface">{item}</span>
                    <input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary" type="checkbox" />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Workstation Shortcuts */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">hub</span>Workstation Shortcuts
            </h2>
            <span className="font-label-sm text-label-sm text-outline">v2.4 Ready</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { icon: 'terminal', label: 'VS Code Enclave', sub: 'Active Socket' },
              { icon: 'settings_ethernet', label: 'WebRTC Bridge', sub: 'Port 9021' },
              { icon: 'style', label: 'Token Exporter', sub: 'Figma REST' },
              { icon: 'edit_note', label: 'Scratchpad Sync', sub: 'E2E Encrypted' },
            ].map((sc) => (
              <a key={sc.label} className="p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container hover:shadow-sm transition-all flex flex-col gap-1.5 group cursor-pointer" href="#">
                <div className="w-7 h-7 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">{sc.icon}</span>
                </div>
                <span className="font-label-md text-label-md font-semibold text-on-surface">{sc.label}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{sc.sub}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Permissions Boundary */}
        <div className="bg-surface-container-low/70 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Permissions Boundary</h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Enforced by cryptographic enclave tokens issued by Core Admin cluster.</p>
          <ul className="space-y-2.5 font-body-sm text-body-sm">
            {[
              { icon: 'check_circle', color: 'text-primary', text: 'Read/Write Access to Assigned Repos & Documents' },
              { icon: 'check_circle', color: 'text-primary', text: 'Standard WebRTC Meeting Host & Screen Privileges' },
              { icon: 'shield', color: 'text-outline', text: 'Sandboxed Local-Only Telemetry (No Org-Wide Veto)', muted: true },
              { icon: 'lock_clock', color: 'text-outline', text: 'Elevation Requires Admin Dual-Key Approval', muted: true },
            ].map((p) => (
              <li key={p.text} className={`flex items-start gap-2 ${p.muted ? 'text-on-surface-variant' : 'text-on-surface'}`}>
                <span className={`material-symbols-outlined ${p.color} text-[18px] shrink-0 mt-0.5`}>{p.icon}</span>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3">
            <a className="font-label-sm text-label-sm text-primary hover:underline inline-flex items-center gap-1 font-semibold" href="#">
              View cryptographic session audit trail
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────── Main ProfilePage ───────────────────────────────── */
type ProfileRole = 'ceo' | 'admin' | 'employee';

export const ProfilePage: React.FC = () => {
  const { profileRole, setProfileRole } = useWorkspace();
  const role = (profileRole as ProfileRole) ?? 'ceo';

  const rolePills: { id: ProfileRole; label: string }[] = [
    { id: 'ceo', label: 'CEO (Executive)' },
    { id: 'admin', label: 'Admin (Ops)' },
    { id: 'employee', label: 'Employee' },
  ];

  return (
    <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* Top Context Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-ping" />
            <span className="font-label-sm text-label-sm font-semibold tracking-wider text-on-surface uppercase">
              {role === 'ceo' ? 'Executive' : role === 'admin' ? 'Administrator' : 'Contributor'}
            </span>
            <span className="text-outline-variant font-mono text-[10px]">•</span>
            <span className="font-label-sm text-label-sm font-bold text-primary tracking-wide">
              {role === 'ceo' ? 'Tier 0 Global Clearance' : role === 'admin' ? 'Tier 1 IAM & Infrastructure' : 'Workspace Level 2'}
            </span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-mono text-[11px] font-medium">
            <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            Ed25519: 0x9f4a...7c2e
          </div>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center p-1 rounded-full bg-surface-container-high shadow-sm">
          {rolePills.map((r) => {
            const active = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setProfileRole(r.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-label-md text-label-md transition-all ${
                  active
                    ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />}
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Render active view */}
      {role === 'ceo' && <CEOView />}
      {role === 'admin' && <AdminView />}
      {role === 'employee' && <EmployeeView />}
    </div>
  );
};
