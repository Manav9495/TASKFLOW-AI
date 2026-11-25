import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { SwitchControl } from '../components/common/SwitchControl';

const CATEGORIES = [
  { id: 'general', label: 'General & Workspace', icon: 'tune', dot: true },
  { id: 'vault', label: 'Vault & Cryptography', icon: 'verified_user', badge: 'SOC2' },
  { id: 'ai', label: 'Manav.AI & Models', icon: 'neurology', dot: true },
  { id: 'chambers', label: 'Chambers & AV Mesh', icon: 'videocam', badge: 'E2EE' },
  { id: 'team', label: 'Team & Permissions', icon: 'group', badge: 'RBAC' },
  { id: 'integrations', label: 'Integrations & Hooks', icon: 'webhook', badge: '4 act' },
  { id: 'storage', label: 'Storage & Edge Nodes', icon: 'dns', badge: 'WASM' },
  { id: 'billing', label: 'Billing & Licenses', icon: 'credit_card', badge: '250 Nodes' },
] as const;

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, notify, navigate } = useWorkspace();
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]['id']>('general');
  const [filterQuery, setFilterQuery] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);

  const handleExportAuditLog = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      node: 'NODE-US-EAST-01',
      workspaceTitle: settings.workspaceTitle,
      zeroTelemetryEgress: settings.zeroTelemetryEgress,
      tpmAttestation: 'Valid (Zero-Leak)',
      firmware: 'v4.19-SEC-Q',
      settings,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'taskflow-audit-log.json';
    a.click();
    URL.revokeObjectURL(url);
    notify('Exported cryptographically attested audit log (JSON).');
  };

  const visibleCategories = CATEGORIES.filter(
    (c) => !filterQuery.trim() || c.label.toLowerCase().includes(filterQuery.toLowerCase()),
  );

  return (
    <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-code-inline">
            <span className="text-primary font-bold uppercase tracking-wider">
              • VAULT CONFIGURATION &amp; ENTERPRISE POLICIES
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
              Encrypted At Rest &amp; In Transit (AES-256-GCM)
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-semibold">
              NODE-US-EAST-01
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            System &amp; Workspace Settings
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Manage cryptographic vault parameters, autonomous AI agent configurations, on-device
            compute limits, and organization security policies.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportAuditLog}
            className="px-4 py-2 rounded-xl bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-label-md text-label-md font-bold flex items-center gap-1.5 glow-emerald"
          >
            <span className="material-symbols-outlined text-[17px]">download</span>
            <span>Export Audit Log (JSON)</span>
          </button>
          <button
            type="button"
            onClick={() => notify('Saved local vault configuration & verified TPM hashes.')}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-secondary text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1.5 shadow-md"
          >
            <span className="material-symbols-outlined text-[17px]">verified_user</span>
            <span>Save Configuration Changes</span>
          </button>
        </div>
      </div>

      {/* Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center bg-surface-container-lowest px-3 py-2 rounded-xl shadow-sm gap-2">
            <span className="material-symbols-outlined text-[17px] text-outline">tune</span>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter preferences..."
              className="flex-1 bg-transparent outline-none font-body-sm text-body-sm"
            />
            <kbd className="font-code-inline text-[10px] text-outline bg-surface-container-low px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-2 shadow-sm space-y-1">
            {visibleCategories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (cat.id === 'team') {
                      notify('Tip: View Admin Ops IAM table on Profile -> Admin (Ops).', 'info');
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-label-md text-label-md transition-colors ${
                    active
                      ? 'bg-surface-container text-on-surface font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[17px] text-primary">
                      {cat.icon}
                    </span>
                    <span>{cat.label}</span>
                  </span>
                  {'badge' in cat && cat.badge ? (
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-low font-code-inline text-[10px] font-semibold text-primary">
                      {cat.badge}
                    </span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>

          {/* TPM 2.0 Enclave Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md font-bold text-on-surface flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-container" />
                TPM 2.0 Enclave: Active
              </span>
              <span className="material-symbols-outlined text-[16px] text-primary">security</span>
            </div>
            <div className="space-y-1.5 font-code-inline text-[11px]">
              <div className="flex justify-between">
                <span className="text-outline">Firmware:</span>
                <span className="font-bold text-on-surface">v4.19-SEC-Q</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Attestation:</span>
                <span className="font-bold text-primary">Valid (Zero-Leak)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Entropy Source:</span>
                <span className="text-on-surface">Hardware Ring RNG</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-low flex items-center justify-between font-code-inline text-[10px]">
              <span className="text-outline">OPFS Cache: 88% Pure</span>
              <span className="text-primary font-bold">SYNC OK</span>
            </div>
          </div>
        </div>

        {/* Right Main Settings Panels (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* General Workspace Profile */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">apartment</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    General Workspace Profile
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Core tenant identification and localized cryptographic anchor points
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container-low font-code-inline text-[11px] font-bold text-primary">
                TENANT_ARC_8942
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="ws-title-input"
                  className="font-label-md text-label-md font-semibold text-on-surface"
                >
                  Workspace Title
                </label>
                <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container-low">
                  <input
                    id="ws-title-input"
                    type="text"
                    readOnly={!editingTitle}
                    value={settings.workspaceTitle}
                    onChange={(e) => updateSettings({ workspaceTitle: e.target.value })}
                    className="flex-1 bg-transparent font-body-sm text-body-sm font-semibold text-on-surface outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setEditingTitle((v) => !v)}
                    aria-label="Edit workspace title"
                    className="text-primary hover:text-secondary"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      {editingTitle ? 'check' : 'edit'}
                    </span>
                  </button>
                </div>
                <p className="font-label-sm text-[11px] text-outline">
                  Visible across cross-node consensus federation invitations.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-label-md text-label-md font-semibold text-on-surface block">
                  Primary Replicated Enclave
                </span>
                <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container-low">
                  <span className="font-body-sm text-body-sm font-semibold text-on-surface truncate">
                    {settings.enclaveRegion}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-code-inline text-[10px] font-bold text-primary shrink-0">
                    3x Replica
                  </span>
                </div>
                <p className="font-label-sm text-[11px] text-outline">
                  Data operates purely local-first with P2P encrypted edge fallback.
                </p>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="chamber-tz"
                  className="font-label-md text-label-md font-semibold text-on-surface"
                >
                  Primary Chamber Localization
                </label>
                <select
                  id="chamber-tz"
                  value={settings.chamberTimezone}
                  onChange={(e) => updateSettings({ chamberTimezone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low font-body-sm text-body-sm font-semibold text-on-surface outline-none cursor-pointer"
                >
                  <option>America/New_York (UTC-05:00 Eastern)</option>
                  <option>America/Los_Angeles (UTC-08:00 Pacific)</option>
                  <option>Europe/Berlin (UTC+01:00 Central)</option>
                </select>
              </div>

              <div className="pt-4">
                <SwitchControl
                  id="iso-military-switch"
                  checked={settings.isoMilitaryTime}
                  onChange={(v) => updateSettings({ isoMilitaryTime: v })}
                  label="ISO-8601 Military Display"
                  description="Enforce 24h chamber timestamps (e.g., 14:30:00 EST)"
                />
              </div>
            </div>
          </section>

          {/* Vault Security & Cryptographic Controls */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">shield</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Vault Security &amp; Cryptographic Controls
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Zero-knowledge boundaries, key attestation, and local token validation
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-secondary-container/60 text-on-secondary-container font-label-sm text-label-sm font-bold">
                SOC2 TYPE II VERIFIED
              </span>
            </div>

            <SwitchControl
              id="zero-egress-switch"
              checked={settings.zeroTelemetryEgress}
              onChange={(v) => updateSettings({ zeroTelemetryEgress: v })}
              label="Zero Telemetry Egress"
              badge="LOCKED POLICY"
              icon="lock"
              description="Strict mathematical isolation: 100% on-device operation. Diagnostic metrics, meeting audio transcripts, and task metadata never leave the local node perimeter."
            />

            <div className="p-4 rounded-xl bg-surface-container-low/75 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[19px] text-primary mt-0.5">
                  key
                </span>
                <div>
                  <p className="font-label-md text-label-md font-semibold text-on-surface">
                    Master Key Rotation Interval
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Automatic cryptographic re-keying for local SQLite chunks via XChaCha20-Poly1305.
                  </p>
                  <p className="font-code-inline text-[11px] text-outline mt-0.5">
                    Last rotated: {settings.lastKeyRotation}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <select
                  aria-label="Master Key Rotation Interval"
                  value={settings.keyRotationInterval}
                  onChange={(e) => updateSettings({ keyRotationInterval: e.target.value })}
                  className="bg-surface-container-lowest px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold outline-none"
                >
                  <option>Every 30 Days</option>
                  <option>Every 90 Days</option>
                  <option>Every 180 Days</option>
                </select>
                <button
                  type="button"
                  onClick={() => {
                    updateSettings({ lastKeyRotation: 'Just now by Manav A.' });
                    notify('Rotated local SQLite XChaCha20-Poly1305 master keys.');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-primary-container text-on-surface font-label-sm text-label-sm font-bold shadow-sm"
                >
                  Rotate Now
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <SwitchControl
                id="webauthn-entry"
                checked={settings.webAuthnChamberEntry}
                onChange={(v) => updateSettings({ webAuthnChamberEntry: v })}
                label="WebAuthn / FIDO2 Chamber Entry"
                description="Require physical YubiKey or TouchID before joining unmuted rooms."
                icon="fingerprint"
              />
              <SwitchControl
                id="tpm-attest"
                checked={settings.tpmSessionAttestation}
                onChange={(v) => updateSettings({ tpmSessionAttestation: v })}
                label="TPM Session Attestation"
                description="Verify local memory isolation registers before decrypting workspace state."
                icon="memory"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-secondary-container/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  verified_user
                </span>
                <div>
                  <p className="font-label-md text-label-md font-bold text-on-surface">
                    12-Word Cold Seed Escrowed
                  </p>
                  <p className="font-code-inline text-[11px] text-on-secondary-container">
                    HASH: 9f8a...c421 • Shamir Secret Sharing Enabled (3-of-5 Quorum)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => notify('Verified 3-of-5 Shamir cold seed escrow integrity.')}
                className="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-bold shadow-sm"
              >
                Verify Seed Escrow
              </button>
            </div>
          </section>

          {/* Autonomous AI Agent (Manav.AI) */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-secondary-container/50 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">neurology</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Autonomous AI Agent (Manav.AI) •
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    On-device neural execution limits, transcription models, and execution policy
                    safeguards
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container-low font-code-inline text-[11px] font-bold text-primary">
                LATENCY: 0.04ms
              </span>
            </div>

            <div className="space-y-2">
              <span className="font-label-md text-label-md font-semibold text-on-surface block">
                Primary Inference Runtime
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  {
                    id: 'local-gguf',
                    title: 'Local Quantized GGUF',
                    sub: 'On-Device GPU (Metal/CUDA)',
                    desc: 'Zero network latency. 100% offline air-gap fidelity.',
                    icon: 'memory',
                  },
                  {
                    id: 'hybrid-enclave',
                    title: 'Hybrid Enclave Cluster',
                    sub: 'Confidential Computing VM',
                    desc: 'AWS Nitro / Azure SNP enclave for heavy parallel synthesis.',
                    icon: 'cloud',
                  },
                  {
                    id: 'air-gapped-server',
                    title: 'Air-Gapped Private Server',
                    sub: 'Self-Hosted vLLM Instance',
                    desc: 'Direct LAN RPC streaming for strict on-premise regulation.',
                    icon: 'dns',
                  },
                ].map((rt) => {
                  const active = settings.inferenceRuntime === rt.id;
                  return (
                    <button
                      key={rt.id}
                      type="button"
                      onClick={() =>
                        updateSettings({
                          inferenceRuntime: rt.id as typeof settings.inferenceRuntime,
                        })
                      }
                      className={`text-left p-4 rounded-xl transition-all border-2 ${
                        active
                          ? 'bg-secondary-container/25 border-primary shadow-sm'
                          : 'bg-surface-container-low/70 border-transparent hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="material-symbols-outlined text-[20px] text-primary">
                          {rt.icon}
                        </span>
                        {active && (
                          <span className="material-symbols-outlined text-[18px] text-primary material-symbols-filled">
                            check_circle
                          </span>
                        )}
                      </div>
                      <p className="font-label-md text-label-md font-bold text-on-surface">
                        {rt.title}
                      </p>
                      <p className="font-label-sm text-[11px] text-primary font-semibold">
                        {rt.sub}
                      </p>
                      <p className="font-label-sm text-[11px] text-on-surface-variant mt-1.5">
                        {rt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Whisper Quantization Bar */}
            <div className="p-4 rounded-xl bg-surface-container-low space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-label-md text-label-md font-bold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-primary">
                    graphic_eq
                  </span>
                  Speech-to-Text Model: Whisper-v3 Medium (Local WASM {settings.whisperQuantization}
                  )
                </span>
                <span className="font-code-inline text-[11px] text-primary font-semibold">
                  Memory Allocated:{' '}
                  {settings.whisperQuantization === 'INT4'
                    ? '1.1 GB'
                    : settings.whisperQuantization === 'INT8'
                      ? '2.4 GB'
                      : '8.0 GB'}{' '}
                  / 8.0 GB RAM
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{
                    width:
                      settings.whisperQuantization === 'INT4'
                        ? '22%'
                        : settings.whisperQuantization === 'INT8'
                          ? '48%'
                          : '92%',
                  }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'INT4', label: 'INT4 (Fastest, 1.1 GB)' },
                    { id: 'INT8', label: 'INT8 Medium (Default, 2.4 GB)' },
                    { id: 'FP16', label: 'FP16 Large-v3 (8.0 GB)' },
                  ] as const
                ).map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => updateSettings({ whisperQuantization: q.id })}
                    className={`py-1.5 px-2 rounded-lg font-code-inline text-[11px] font-semibold text-center transition-colors ${
                      settings.whisperQuantization === q.id
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="font-label-md text-label-md font-semibold text-on-surface block">
                Autonomous Action Safeguards &amp; Approvals
              </span>
              <SwitchControl
                id="auto-tickets-sw"
                checked={settings.autoGenerateTickets}
                onChange={(v) => updateSettings({ autoGenerateTickets: v })}
                label="Auto-generate Jira/Linear tickets from meeting action items"
                description="Synthesizes speaker commitments into structured backlog tickets in real time."
                icon="check_circle"
              />
              <SwitchControl
                id="auto-prune-sw"
                checked={settings.autoPruneChambers}
                onChange={(v) => updateSettings({ autoPruneChambers: v })}
                label="Auto-prune idle WebRTC chamber sessions after 15 mins"
                description="Tears down p2p media tracks and seals cryptographic chamber logs when empty."
                icon="videocam_off"
              />
              <SwitchControl
                id="admin-signoff-pr"
                checked={settings.requireAdminSignOffForPR}
                onChange={(v) => updateSettings({ requireAdminSignOffForPR: v })}
                label="Require Admin Sign-off for Autonomous Git Pull Request creation"
                description="Prompts hardware passkey confirmation before merging local commits."
                icon="verified"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => navigate('profile')}
                className="font-label-sm text-label-sm text-primary font-semibold hover:underline"
              >
                Manage Hardware Keys &amp; RBAC Nodes in Profile →
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
