import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { ModalDialog } from '../common/ModalDialog';

type InspectorTab = 'rendered' | 'raw' | 'diff' | 'graph';

export const DocPreviewModal: React.FC = () => {
  const { previewDoc, setPreviewDoc, notify } = useWorkspace();
  const [activeTab, setActiveTab] = useState<InspectorTab>('rendered');
  const [copilotOpen, setCopilotOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [draftNote, setDraftNote] = useState('');
  const [copilotReply, setCopilotReply] = useState<string | null>(null);

  const handleDownload = () => {
    if (!previewDoc) return;
    const blob = new Blob([previewDoc.contentPreview], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = previewDoc.name;
    a.click();
    URL.revokeObjectURL(url);
    notify(`Exported "${previewDoc.name}" from local vault.`);
  };

  const handleCopySnippet = () => {
    const snippet = `pub struct PeerSyncVector {
    pub client_id: ClientId,
    pub lamport_clock: u64,
    pub merkle_root: [u8; 32],
}`;
    navigator.clipboard?.writeText(snippet).catch(() => {});
    notify('Copied Rust enclave snippet to clipboard.');
  };

  return (
    <ModalDialog
      open={Boolean(previewDoc)}
      onClose={() => {
        setEditing(false);
        setCopilotReply(null);
        setPreviewDoc(null);
      }}
      titleId="doc-preview-title"
      maxWidthClass="max-w-[1240px]"
    >
      {previewDoc && (
        <div className="w-full h-[88vh] max-h-[860px] bg-surface-container-lowest rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-outline-variant/50">
          {/* Inspector Header */}
          <header className="shrink-0 px-6 py-3.5 bg-surface-container-lowest border-b border-surface-container flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[24px]">
                  {previewDoc.type === 'pdf'
                    ? 'picture_as_pdf'
                    : previewDoc.type === 'rs'
                      ? 'code'
                      : 'code_blocks'}
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1
                    id="doc-preview-title"
                    className="font-headline-sm text-headline-sm text-on-surface font-bold truncate"
                  >
                    {previewDoc.name}
                  </h1>
                  <span className="font-code-inline text-[11px] bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-medium">
                    v2.4 Draft
                  </span>
                  <span className="font-label-sm text-label-sm text-primary bg-primary-container/20 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">verified</span>
                    SHA-256: {previewDoc.sha256}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-secondary-container bg-secondary-container/40 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">lock</span>
                    AES-256 Encrypted
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary-container" /> Local Vault
                  </span>
                  <span className="text-outline">•</span>
                  <span>
                    Last edited {previewDoc.updatedAt} by{' '}
                    <strong className="font-medium text-on-surface">{previewDoc.author}</strong>
                  </span>
                  <span className="text-outline">•</span>
                  <span className="font-code-inline text-code-inline">{previewDoc.size}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* View Switcher */}
              <div className="hidden md:flex items-center bg-surface-container-low p-1 rounded-lg">
                {(
                  [
                    { id: 'rendered', label: 'Rendered', icon: 'preview' },
                    { id: 'raw', label: 'Raw Markdown', icon: 'data_object' },
                    { id: 'diff', label: 'Diff & History', icon: 'history' },
                    { id: 'graph', label: 'Graph', icon: 'hub' },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    className={`px-3 py-1 rounded font-label-sm text-label-sm flex items-center gap-1.5 transition-colors ${
                      activeTab === t.id
                        ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        activeTab === t.id ? 'text-primary' : ''
                      }`}
                    >
                      {t.icon}
                    </span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCopilotOpen((o) => !o)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold shadow-sm transition-all ${
                    copilotOpen
                      ? 'bg-primary text-on-primary hover:bg-secondary'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                    auto_awesome
                  </span>
                  <span>AI Copilot</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center gap-1 bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-medium transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Export</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!editing) {
                      setDraftNote(previewDoc.contentPreview);
                      setActiveTab('raw');
                    } else {
                      notify(`Saved edits to "${previewDoc.name}" in local SQLite vault.`);
                    }
                    setEditing((e) => !e);
                  }}
                  className="flex items-center gap-1 bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-medium transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {editing ? 'save' : 'edit_document'}
                  </span>
                  <span>{editing ? 'Save' : 'Edit'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  aria-label="Close document inspector"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors ml-1"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>
          </header>

          {/* Split Content + Aside */}
          <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
            {/* Left Reading Pane */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-on-surface">
              <nav className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
                <span>{previewDoc.project}</span>
                <span className="text-outline">/</span>
                <span>specs</span>
                <span className="text-outline">/</span>
                <span className="text-on-surface font-semibold">{previewDoc.name}</span>
              </nav>

              {activeTab === 'raw' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-code-inline text-code-inline text-primary font-semibold">
                      Raw Encrypted Source Buffer ({previewDoc.type.toUpperCase()})
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">
                      {editing ? 'Editing Local Draft' : 'Read-Only Preview'}
                    </span>
                  </div>
                  {editing ? (
                    <textarea
                      rows={14}
                      value={draftNote}
                      onChange={(e) => setDraftNote(e.target.value)}
                      className="w-full rounded-xl bg-inverse-surface text-surface p-4 font-code-inline text-[12px] leading-relaxed outline-none focus:ring-2 focus:ring-primary-container"
                    />
                  ) : (
                    <pre className="rounded-xl bg-inverse-surface text-surface p-5 font-code-inline text-[12px] leading-relaxed whitespace-pre-wrap overflow-x-auto">
                      {draftNote || previewDoc.contentPreview}
                    </pre>
                  )}
                </div>
              ) : activeTab === 'diff' ? (
                <div className="space-y-4">
                  <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                    Cryptographic Commit &amp; Delta Diff
                  </h2>
                  <div className="rounded-xl bg-inverse-surface text-surface p-4 font-code-inline text-[12px] space-y-1.5">
                    <div className="text-outline-variant pb-2 border-b border-white/10">
                      commit 9f4a7c2e (HEAD -&gt; main, local-enclave)
                    </div>
                    <div className="text-error-container">
                      - Session key stored in shared workspace memory pool
                    </div>
                    <div className="text-primary-container">
                      + Session keys pinned strictly to Secure Enclave RAM with zero disk swap
                    </div>
                    <div className="text-primary-container">
                      + Added Lamport logical clock verification on PeerSyncVector merge
                    </div>
                  </div>
                </div>
              ) : activeTab === 'graph' ? (
                <div className="space-y-4">
                  <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                    Document Reference &amp; RAG Dependency Graph
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['sync_engine.rs', 'Product_Brief.txt', 'Sprint_32_Backlog.md'].map((rel) => (
                      <div
                        key={rel}
                        className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-1"
                      >
                        <span className="font-label-sm text-label-sm text-primary font-bold">
                          Cosine Sim 0.94
                        </span>
                        <p className="font-headline-sm text-headline-sm font-semibold">{rel}</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">
                          Shared CRDT &amp; SQLite enclave vector cluster
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-3 pb-4 border-b border-surface-container">
                    <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight text-on-surface">
                      {previewDoc.name === 'Architecture_Overview.md'
                        ? 'Architecture Overview: Local-First State Sync & Conflict-Free Replication'
                        : previewDoc.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <div className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-full text-on-surface font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[15px] text-outline">group</span>
                        <span>Author: {previewDoc.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-secondary-container/40 text-on-secondary-container px-2.5 py-1 rounded-full font-label-sm text-label-sm font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        <span>Status: {previewDoc.syncStatus}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-primary-container/20 text-on-secondary-container px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold">
                        <span className="material-symbols-outlined text-[14px] text-primary">
                          psychology
                        </span>
                        <span>RAG Vectorized (512d chunks)</span>
                      </div>
                    </div>
                  </div>

                  {/* Callout */}
                  <div className="p-4 rounded-xl bg-surface-container-low/60 border-l-4 border-primary text-body-md text-on-surface space-y-1">
                    <div className="font-headline-sm text-headline-sm font-semibold text-primary flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">info</span>
                      Summary &amp; Local Vault Snapshot
                    </div>
                    <p className="text-on-surface-variant leading-relaxed text-body-sm font-body-sm whitespace-pre-wrap">
                      {previewDoc.contentPreview}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2">
                      <span className="text-primary">1.</span> Conflict-Free Replicated Data Types
                      (CRDTs) Topology
                    </h3>
                    <p className="text-body-md text-on-surface-variant leading-relaxed">
                      To allow simultaneous multi-agent offline collaboration, states are modeled as
                      state-based convergent CRDTs. Every edit mutates a distributed StateVector tree
                      timestamped with Lamport logical clocks.
                    </p>
                    <div className="rounded-xl bg-inverse-surface text-surface p-4 font-mono text-[12px] space-y-2 shadow-inner overflow-x-auto">
                      <div className="flex items-center justify-between text-outline-variant font-label-sm text-label-sm pb-2 border-b border-surface-container/20">
                        <span className="flex items-center gap-1.5 text-secondary-fixed">
                          <span className="material-symbols-outlined text-[14px]">terminal</span>
                          sync_engine.rs — Enclave Handshake
                        </span>
                        <button
                          type="button"
                          onClick={handleCopySnippet}
                          className="flex items-center gap-1 hover:text-on-primary text-outline-variant transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">content_copy</span>
                          <span>Copy Snippet</span>
                        </button>
                      </div>
                      <pre className="font-code-inline leading-relaxed">
                        <code>
                          <span className="text-outline">01</span>  <span className="text-primary-container">pub struct</span> <span className="text-secondary-fixed">PeerSyncVector</span> {'{\n'}
                          <span className="text-outline">02</span>      <span className="text-primary-container">pub</span> client_id: <span className="text-secondary-fixed">ClientId</span>,{'\n'}
                          <span className="text-outline">03</span>      <span className="text-primary-container">pub</span> lamport_clock: <span className="text-secondary-fixed">u64</span>,{'\n'}
                          <span className="text-outline">04</span>      <span className="text-primary-container">pub</span> merkle_root: [<span className="text-secondary-fixed">u8</span>; 32],{'\n'}
                          <span className="text-outline">05</span>  {'}'}{'\n'}
                          <span className="text-outline">06</span>{'\n'}
                          <span className="text-outline">07</span>  <span className="text-primary-container">impl</span> <span className="text-secondary-fixed">PeerSyncVector</span> {'{\n'}
                          <span className="text-outline">08</span>      <span className="text-primary-container">pub fn</span> <span className="text-secondary-fixed-dim">verify_enclave_integrity</span>(&amp;<span className="text-primary-container">self</span>, signature: &amp;[<span className="text-secondary-fixed">u8</span>]) -&gt; <span className="text-secondary-fixed">Result</span>&lt;<span className="text-secondary-fixed">bool</span>, <span className="text-secondary-fixed">SyncError</span>&gt; {'{\n'}
                          <span className="text-outline">09</span>          <span className="text-outline-variant">// Hardware security module signature validation</span>{'\n'}
                          <span className="text-outline">10</span>          <span className="text-secondary-fixed">CryptoEnclave</span>::<span className="text-secondary-fixed-dim">verify_sha256</span>(&amp;<span className="text-primary-container">self</span>.merkle_root, signature){'\n'}
                          <span className="text-outline">11</span>      {'}'}{'\n'}
                          <span className="text-outline">12</span>  {'}'}
                        </code>
                      </pre>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2">
                      <span className="text-primary">2.</span> Zero-Cloud Telemetry &amp; E2EE Key
                      Exchange
                    </h3>
                    <p className="text-body-md text-on-surface-variant leading-relaxed">
                      Network boundaries strictly forbid automated exfiltration of plaintext markdown
                      buffers. AI Copilot indexing operates via local on-device quantized models
                      (GGUF Llama 3 70B &amp; GTE embeddings).
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 bg-surface-container-low rounded-xl border border-surface-container">
                        <div className="flex items-center gap-2 font-label-md text-label-md font-semibold text-on-surface">
                          <span className="material-symbols-outlined text-primary text-[18px]">dns</span>
                          Local Engine Runtime
                        </div>
                        <p className="text-body-sm text-on-surface-variant mt-1">
                          SQLite 3.42 Write-Ahead Logging on NVMe flash cache reduces query response
                          latency below 1.2ms.
                        </p>
                      </div>
                      <div className="p-3.5 bg-surface-container-low rounded-xl border border-surface-container">
                        <div className="flex items-center gap-2 font-label-md text-label-md font-semibold text-on-surface">
                          <span className="material-symbols-outlined text-secondary text-[18px]">
                            shield
                          </span>
                          Ephemeral Enclave Keys
                        </div>
                        <p className="text-body-sm text-on-surface-variant mt-1">
                          Session keys are pinned strictly to client Secure Enclave RAM and never
                          persisted unencrypted to external media.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Right Sidebar Aside */}
            {copilotOpen && (
              <aside className="w-full md:w-80 lg:w-96 bg-surface-container-low/40 border-t md:border-t-0 md:border-l border-surface-container p-5 md:p-6 overflow-y-auto space-y-5 shrink-0">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-primary">
                        psychology
                      </span>
                      <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                        Manav.AI Copilot
                      </span>
                    </div>
                    <span className="font-code-inline text-[10px] bg-primary-container/20 text-on-secondary-container px-2 py-0.5 rounded-full font-semibold">
                      Llama 3 • On-Device
                    </span>
                  </div>
                  <div className="space-y-2 text-body-sm text-on-surface-variant">
                    <div className="font-label-sm text-label-sm font-semibold text-on-surface">
                      Key Takeaways:
                    </div>
                    <ul className="space-y-1.5 pl-4 list-disc text-[12px] leading-relaxed">
                      <li>
                        SQLite WAL mode reduces local disk write latency by <strong>42%</strong>.
                      </li>
                      <li>CRDT state vector resolves multi-peer conflicts deterministically.</li>
                      <li>Cryptographic enclave keys never leave client RAM.</li>
                    </ul>
                  </div>

                  {copilotReply && (
                    <div className="p-2.5 rounded-lg bg-surface-container-low text-[12px] text-on-surface leading-relaxed">
                      {copilotReply}
                    </div>
                  )}

                  <div className="pt-2 border-t border-surface-container space-y-1.5">
                    <div className="font-label-sm text-label-sm text-outline font-medium">
                      Quick Copilot Prompts:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        {
                          label: 'Draft Test Case',
                          reply:
                            '#[test] fn verifies verify_enclave_integrity rejects mutated merkle roots in <0.4ms.',
                        },
                        {
                          label: 'Explain Handshake',
                          reply:
                            'Each peer exchanges Ed25519 signed Lamport vector headers over WebRTC DTLS before streaming WAL blocks.',
                        },
                        {
                          label: 'Check Zero-Trust',
                          reply:
                            'Audit OK: 0 network sockets leave localhost; ChaCha20-Poly1305 seals every blob pre-write.',
                        },
                      ].map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => setCopilotReply(p.reply)}
                          className="bg-surface-container hover:bg-surface-container-high text-on-surface px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors text-left"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Telemetry */}
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-headline-sm font-semibold text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-outline">
                        analytics
                      </span>
                      Document Telemetry
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      check_circle
                    </span>
                  </div>
                  <div className="space-y-2 font-label-sm text-label-sm">
                    <div className="flex justify-between py-1 border-b border-surface-container-low">
                      <span className="text-on-surface-variant">File Size</span>
                      <span className="font-code-inline text-code-inline font-medium text-on-surface">
                        {previewDoc.size} (14,200 tokens)
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-surface-container-low">
                      <span className="text-on-surface-variant">RAG Status</span>
                      <span className="text-primary font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" /> 100% Vectorized
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-surface-container-low">
                      <span className="text-on-surface-variant">Workspace</span>
                      <span className="font-medium text-on-surface">{previewDoc.project}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-on-surface-variant">Linked Tasks</span>
                      <span className="text-on-surface font-medium">#241 Enclave Cache</span>
                    </div>
                  </div>
                </div>

                {/* Commit History */}
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-headline-sm font-semibold text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-outline">
                        schedule
                      </span>
                      Commit History
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('diff')}
                      className="font-label-sm text-label-sm text-primary cursor-pointer hover:underline"
                    >
                      View Git log
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { dot: 'bg-primary', title: 'v2.4 — Updated CRDT topology', sub: 'Esther W. • 12m ago' },
                      { dot: 'bg-outline-variant', title: 'v2.3 — Added WAL mode benchmarks', sub: 'Brandie C. • 3h ago' },
                      { dot: 'bg-outline-variant', title: 'v2.1 — Initial architecture draft', sub: 'Masud A. • Yesterday' },
                    ].map((c) => (
                      <div key={c.title} className="flex items-start gap-2.5 text-label-sm">
                        <span className={`w-2 h-2 rounded-full ${c.dot} mt-1.5 shrink-0`} />
                        <div>
                          <div className="font-medium text-on-surface">{c.title}</div>
                          <div className="text-outline text-[11px]">{c.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      )}
    </ModalDialog>
  );
};
