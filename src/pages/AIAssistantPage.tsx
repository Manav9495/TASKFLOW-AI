import React, { useRef, useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { AVATARS } from '../data/mockWorkspace';
import { Avatar } from '../components/common/Avatar';

export const AIAssistantPage: React.FC = () => {
  const {
    aiMessages,
    sendAiPrompt,
    clearAiContext,
    deployAiAction,
    documents,
    addDocument,
    removeDocument,
    notify,
  } = useWorkspace();

  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('Taskflow-Local-70B');
  const [automations, setAutomations] = useState([
    {
      id: 'auto-1',
      title: 'Auto-triage GitHub PRs',
      desc: 'Classifies commits, runs test matrix locally before merge approval.',
      active: true,
      badge: 'Active',
    },
    {
      id: 'auto-2',
      title: 'Calendar Collision Detector',
      desc: 'Alerts 15 mins before overlapping meetings with Arc Company.',
      active: true,
      badge: 'Active',
    },
    {
      id: 'auto-3',
      title: 'Daily Digest Compilation',
      desc: 'Aggregates completed offline tasks into sprint log.',
      active: false,
      badge: '05:30 PM',
    },
  ]);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!prompt.trim()) return;
    sendAiPrompt(prompt);
    setPrompt('');
  };

  const handleEmbedDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    addDocument({
      name: file.name,
      type: 'md',
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      project: 'Manav.AI RAG',
      author: 'Manav A.',
      updatedAt: 'Just now',
      syncStatus: 'Vectorized',
      progress: 100,
      sha256: 'local-rag-vec',
      contentPreview: `Embedded context document "${file.name}" for local inference.`,
    });
    e.target.value = '';
  };

  return (
    <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Cockpit Header */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              On-Device Intelligence &amp; Reasoning Engine
            </span>
            <span className="text-tertiary font-code-inline text-code-inline">v2.4-quantized</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Manav.AI Companion
            </h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary-container" />
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                100% On-Device • Encrypted Sandbox • Llama 3 70B Quantized
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <div className="flex items-center bg-surface-container-low px-3 py-1.5 rounded-xl gap-2 shadow-sm">
            <span className="material-symbols-outlined text-primary text-[18px]">memory</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-tertiary leading-none">
                Inference Model
              </span>
              <select
                aria-label="Inference Model"
                value={model}
                onChange={(e) => {
                  setModel(e.target.value);
                  notify(`Switched local WASM/Metal weights to ${e.target.value}.`);
                }}
                className="bg-transparent font-label-md text-label-md font-semibold text-on-surface outline-none cursor-pointer pr-2"
              >
                <option>Taskflow-Local-70B</option>
                <option>Mistral-Local-Codex</option>
                <option>DeepSeek-Coder-33B</option>
              </select>
            </div>
          </div>

          <div className="flex items-center bg-surface-container-low px-3 py-1.5 rounded-xl gap-2 shadow-sm">
            <span className="material-symbols-outlined text-primary text-[18px]">
              developer_board
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-tertiary leading-none">
                Local Memory
              </span>
              <span className="font-code-inline text-code-inline text-on-surface font-semibold">
                4.8 GB VRAM
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={clearAiContext}
            className="flex items-center gap-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-2 rounded-xl transition-all font-label-md text-label-md font-medium shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px] text-tertiary">replay</span>
            <span>Clear Context</span>
          </button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-tertiary">
            <span className="font-label-md text-label-md font-medium">Queries Processed</span>
            <span className="material-symbols-outlined text-primary text-[20px] p-1.5 rounded-lg bg-surface-container">
              psychology
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-data-metric text-data-metric text-on-surface font-bold">
              {339 + aiMessages.length}
            </span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">
              Local calls
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              0 bytes cloud egress
            </span>
            <div className="w-16 bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-full" />
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-tertiary">
            <span className="font-label-md text-label-md font-medium">Tasks Automated</span>
            <span className="material-symbols-outlined text-primary text-[20px] p-1.5 rounded-lg bg-surface-container">
              bolt
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-data-metric text-data-metric text-on-surface font-bold">28</span>
            <span className="font-label-sm text-label-sm text-on-primary-container font-semibold px-1.5 py-0.5 bg-primary-container/20 rounded">
              Autonomous
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Sprint delta: +14%
            </span>
            <span className="font-code-inline text-code-inline text-tertiary">3 queued</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-tertiary">
            <span className="font-label-md text-label-md font-medium">Privacy Integrity</span>
            <span className="material-symbols-outlined text-primary text-[20px] p-1.5 rounded-lg bg-surface-container">
              verified_user
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-data-metric text-data-metric text-on-surface font-bold">100%</span>
            <span className="font-label-sm text-label-sm text-primary font-medium">Air-gapped</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Network packets blocked
            </span>
            <span className="w-2 h-2 rounded-full bg-primary" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-tertiary">
            <span className="font-label-md text-label-md font-medium">Response Latency</span>
            <span className="material-symbols-outlined text-primary text-[20px] p-1.5 rounded-lg bg-surface-container">
              speed
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-data-metric text-data-metric text-on-surface font-bold">18ms</span>
            <span className="font-label-sm text-label-sm text-tertiary">TTFT</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Metal / Neural Engine
            </span>
            <span className="font-code-inline text-code-inline text-primary">64.2 tok/s</span>
          </div>
        </div>
      </div>

      {/* Bento Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Chat Stream (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl shadow-sm p-6 flex flex-col min-h-[640px] justify-between">
          <div className="space-y-6 overflow-y-auto max-h-[540px] pr-2 custom-scrollbar">
            {aiMessages.map((msg, idx) =>
              msg.role === 'assistant' ? (
                <div key={msg.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-inverse-surface flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <span className="material-symbols-outlined text-primary-container text-[18px]">
                      auto_awesome
                    </span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 text-on-surface shadow-sm space-y-3 max-w-2xl">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md font-semibold text-primary">
                            {msg.sender}
                          </span>
                          {msg.model && (
                            <span className="px-2 py-0.5 rounded-full bg-surface text-tertiary font-code-inline text-[11px]">
                              {msg.model}
                            </span>
                          )}
                        </div>
                        <span className="font-code-inline text-code-inline text-tertiary">
                          {msg.metrics ?? msg.timestamp}
                        </span>
                      </div>

                      <p className="font-body-md text-body-md leading-relaxed text-on-surface">
                        {msg.text}
                      </p>

                      {msg.codeBlock && (
                        <div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-4 font-code-inline text-code-inline overflow-x-auto shadow-inner space-y-1">
                          <div className="flex items-center justify-between pb-2 text-tertiary-fixed-dim">
                            <span className="text-label-sm font-label-sm">
                              {msg.codeBlock.title}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard
                                  ?.writeText(msg.codeBlock!.lines.join('\n'))
                                  .catch(() => {});
                                notify('Copied Rust SQLite sync routine.');
                              }}
                              className="flex items-center gap-1 text-primary-fixed hover:underline text-label-sm font-label-sm"
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                content_copy
                              </span>
                              Copy
                            </button>
                          </div>
                          {msg.codeBlock.lines.map((ln, lIdx) => (
                            <div key={lIdx} className="text-primary-fixed whitespace-pre">
                              {ln}
                            </div>
                          ))}
                        </div>
                      )}

                      {msg.extractedActions && (
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center justify-between">
                            <span className="font-label-md text-label-md font-semibold text-on-surface">
                              Extracted Action Items
                            </span>
                            <span className="font-label-sm text-label-sm text-primary font-medium">
                              {msg.extractedActions.length} actions ready for local dispatch
                            </span>
                          </div>
                          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
                            {msg.extractedActions.map((act) => (
                              <div
                                key={act.id}
                                className="grid grid-cols-12 gap-2 px-3 py-2.5 items-center font-body-sm text-body-sm border-b last:border-b-0 border-surface-container-low"
                              >
                                <div className="col-span-6 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  <span>{act.detail}</span>
                                </div>
                                <div className="col-span-3">
                                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                                    {act.priority}
                                  </span>
                                </div>
                                <div className="col-span-3 text-right">
                                  {act.status === 'Deploy' ? (
                                    <button
                                      type="button"
                                      onClick={() => deployAiAction(msg.id, act.id)}
                                      className="px-2.5 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm"
                                    >
                                      Deploy
                                    </button>
                                  ) : (
                                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                                      {act.status}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {idx === 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {[
                          { label: 'Reasoning Mode', icon: 'psychology_alt' },
                          { label: 'Search Workspace Docs', icon: 'find_in_page' },
                          { label: 'Analyze Sprint Velocity', icon: 'trending_up' },
                          { label: 'Generate Weekly Standup Report', icon: 'summarize' },
                        ].map((chip) => (
                          <button
                            key={chip.label}
                            type="button"
                            onClick={() => setPrompt(chip.label)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-primary-container text-on-surface font-label-md text-label-md transition-colors shadow-sm"
                          >
                            <span className="material-symbols-outlined text-primary text-[15px]">
                              {chip.icon}
                            </span>
                            <span>{chip.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex items-start justify-end gap-3">
                  <div className="max-w-xl bg-inverse-surface text-inverse-on-surface p-4 rounded-2xl rounded-tr-sm shadow-sm space-y-1">
                    <div className="flex items-center justify-between text-tertiary-fixed-dim text-label-sm font-label-sm mb-1 gap-4">
                      <span className="font-semibold text-primary-fixed">{msg.sender}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="font-body-md text-body-md">{msg.text}</p>
                  </div>
                  <Avatar
                    src={AVATARS.manavAlt}
                    alt="Manav A."
                    initials="MA"
                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5 shadow-sm"
                  />
                </div>
              ),
            )}
          </div>

          <div className="mt-4 pt-3">
            <div className="flex items-center gap-2 bg-surface-container-low rounded-full px-3 py-2 shadow-sm focus-within:shadow-md focus-within:bg-surface-container transition-all">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                title="Attach context file"
                className="p-2 text-tertiary hover:text-on-surface rounded-full hover:bg-surface-container-lowest transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">attach_file</span>
              </button>
              <button
                type="button"
                onClick={() => notify('Local Whisper voice dictation ready.', 'info')}
                title="Voice dictation"
                className="p-2 text-tertiary hover:text-on-surface rounded-full hover:bg-surface-container-lowest transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder="Ask Manav.AI anything about your projects, code, or tasks..."
                className="flex-1 bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-outline px-2"
              />
              <button
                type="button"
                onClick={handleSend}
                title="Send prompt"
                className="w-10 h-10 rounded-full bg-primary hover:bg-on-secondary-container text-on-primary flex items-center justify-center shadow-md transition-transform active:scale-95 shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
              </button>
            </div>
            <div className="flex items-center justify-between px-4 mt-2 text-tertiary font-label-sm text-label-sm">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[14px]">lock</span>
                Strictly sandboxed execution • Zero third-party telemetry
              </span>
              <span className="font-code-inline text-code-inline">
                Tab for context suggestions
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  smart_toy
                </span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Workflow Automations
                </h2>
              </div>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-container/20 text-on-primary-container font-semibold">
                {automations.filter((a) => a.active).length} Active
              </span>
            </div>

            <div className="space-y-2.5">
              {automations.map((auto) => (
                <button
                  key={auto.id}
                  type="button"
                  onClick={() =>
                    setAutomations((prev) =>
                      prev.map((x) =>
                        x.id === auto.id
                          ? { ...x, active: !x.active, badge: !x.active ? 'Active' : 'Paused' }
                          : x,
                      ),
                    )
                  }
                  className="w-full text-left p-3 rounded-xl bg-surface-container-low flex items-start justify-between gap-3 hover:bg-surface-container transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          auto.active ? 'bg-primary animate-pulse' : 'bg-tertiary'
                        }`}
                      />
                      <span className="font-label-md text-label-md font-semibold text-on-surface">
                        {auto.title}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{auto.desc}</p>
                  </div>
                  <span
                    className={`font-label-sm text-label-sm shrink-0 ${
                      auto.active ? 'text-primary font-semibold' : 'font-code-inline text-tertiary'
                    }`}
                  >
                    {auto.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  folder_open
                </span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Context Documents
                </h2>
              </div>
              <span className="font-code-inline text-code-inline text-tertiary">
                {documents.slice(0, 3).length} indexed
              </span>
            </div>

            <div className="space-y-2">
              {documents.slice(0, 3).map((doc) => (
                <div
                  key={doc.id}
                  className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between gap-3 hover:bg-surface-container transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      description
                    </span>
                    <div className="truncate">
                      <span className="font-label-md text-label-md font-semibold text-on-surface block truncate">
                        {doc.name}
                      </span>
                      <span className="font-code-inline text-code-inline text-tertiary">
                        {doc.size} • {doc.syncStatus}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDocument(doc.id)}
                    aria-label={`Remove ${doc.name}`}
                    className="material-symbols-outlined text-tertiary text-[18px] hover:text-on-surface"
                  >
                    close
                  </button>
                </div>
              ))}
            </div>

            <input ref={fileRef} type="file" className="hidden" onChange={handleEmbedDoc} />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-outline-variant/50 hover:border-primary p-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-tertiary hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">upload_file</span>
              <span className="font-label-md text-label-md font-medium">
                Embed local documentation
              </span>
            </button>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Privacy Sandbox Monitor
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-container" />
                <span className="font-label-sm text-label-sm text-primary font-semibold">
                  Enforced
                </span>
              </div>
            </div>

            <div className="bg-inverse-surface rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between text-tertiary-fixed text-label-sm font-label-sm">
                <span>RAM Allocation</span>
                <span className="font-code-inline text-code-inline text-primary-fixed">
                  4.8 GB / 16.0 GB
                </span>
              </div>
              <div className="w-full bg-surface-container/20 h-2 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full w-[30%]" />
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between text-tertiary-fixed text-label-sm font-label-sm mb-1">
                  <span>Egress Throughput</span>
                  <span className="font-code-inline text-code-inline text-primary-fixed">
                    0.00 KB/s
                  </span>
                </div>
                <svg className="w-full h-10 text-primary-container" fill="none" viewBox="0 0 300 40">
                  <path
                    d="M0 35 L40 35 L80 35 L120 35 L160 35 L200 35 L240 35 L300 35"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                  <circle cx="280" cy="35" fill="currentColor" r="3" />
                </svg>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-surface-container/10">
                <span className="font-code-inline text-code-inline text-tertiary-fixed-dim">
                  TLS Intercepts:
                </span>
                <span className="font-code-inline text-code-inline text-secondary-fixed">
                  0 dropped
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
