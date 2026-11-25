import React, { useEffect, useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { AVATARS, PAST_MEETING_RECAPS } from '../data/mockWorkspace';
import { Avatar } from '../components/common/Avatar';
import { MeetingLogoWordmark } from '../components/common/BrandLogos';

export const MeetingsPage: React.FC = () => {
  const {
    meetingSubView,
    setMeetingSubView,
    openMeetingChamber,
    activeMeetingTitle,
    meetings,
    meetingActions,
    toggleMeetingAction,
    addMeetingAction,
    pushMeetingActionsToTasks,
    openQuickCreate,
    documents,
    setPreviewDoc,
    setScreenShareOpen,
    setPrivacyModalOpen,
    activeScreenName,
    notify,
  } = useWorkspace();

  const [recapFilter, setRecapFilter] = useState<'All Types' | 'Arc Company' | 'Internal'>(
    'All Types',
  );
  const [vaultSearch, setVaultSearch] = useState('');
  const [notesContent, setNotesContent] = useState(
    `The objective of today's sprint planning is to align on the cryptographic isolation of the multi-tenant document pipeline. Alex clarified that local vault persistence takes precedence over cloud sync to adhere to SOC-2 Tier 4 compliance.`,
  );
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stageLayout, setStageLayout] = useState<'focus' | 'grid' | 'sidebar'>('focus');
  const [callSeconds, setCallSeconds] = useState(42 * 60 + 18);
  const [chamberNotes, setChamberNotes] = useState(
    `### Consensus Notes:\n- SQLite WASM OPFS backing approved for desktop electron build.\n- WebRTC mesh limit pegged at 12 active video peers before server SFU fallback.\n> Esther: Benchmarking write ops with 50,000 synthetic rows tonight.`,
  );
  const [chamberChatInput, setChamberChatInput] = useState('');
  const [chamberMessages, setChamberMessages] = useState<string[]>([]);
  const [rfcDismissed, setRfcDismissed] = useState(false);
  const [customActionInput, setCustomActionInput] = useState('');
  const [addingCustomAction, setAddingCustomAction] = useState(false);

  useEffect(() => {
    if (meetingSubView !== 'chamber') return;
    const id = window.setInterval(() => setCallSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [meetingSubView]);

  const formattedCallTimer = [
    String(Math.floor(callSeconds / 3600)).padStart(2, '0'),
    String(Math.floor((callSeconds % 3600) / 60)).padStart(2, '0'),
    String(callSeconds % 60).padStart(2, '0'),
  ].join(':');

  const openDocByName = (name: string) => {
    const found = documents.find((d) => d.name === name) ?? documents[0];
    if (found) setPreviewDoc(found);
  };

  const filteredRecaps = PAST_MEETING_RECAPS.filter((r) => {
    if (recapFilter !== 'All Types' && r.type !== recapFilter) return false;
    if (vaultSearch.trim()) {
      const q = vaultSearch.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        (r.aiSynthesis ?? '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  // ===================== CHAMBER VIEW (Image 6) =====================
  if (meetingSubView === 'chamber') {
    return (
      <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 py-4 space-y-4">
        {/* Chamber Top Bar */}
        <div className="bg-surface-container-lowest rounded-2xl px-4 py-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMeetingSubView('notes')}
              title="Back to Meeting Notes"
              className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 hover:bg-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
                  {activeMeetingTitle}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-surface-container font-code-inline text-[11px] font-semibold text-on-surface-variant">
                  #ARC-8942
                </span>
              </div>
              <p className="font-code-inline text-[11px] text-on-surface-variant flex flex-wrap items-center gap-2 mt-0.5">
                <span className="text-primary font-bold">{formattedCallTimer}</span>
                <span>•</span>
                <span>E2EE WebRTC Mesh (Zero-Knowledge)</span>
                <span>•</span>
                <span>Frankfurt Region Edge (12ms)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center -space-x-1.5 mr-1">
              {['ES', 'BS', 'BA', 'AM'].map((ini, i) => (
                <div
                  key={ini}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-white ${
                    i === 0
                      ? 'bg-surface-container-highest text-on-surface'
                      : i === 2
                        ? 'bg-inverse-surface text-white'
                        : 'bg-secondary-container text-on-secondary-container'
                  }`}
                >
                  {ini}
                </div>
              ))}
              <div className="w-7 h-7 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                +2
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen((s) => !s)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-sm text-label-sm font-semibold transition-colors ${
                sidebarOpen
                  ? 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  : 'bg-surface-container-low text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[15px] text-primary">
                auto_awesome
              </span>
              <span>AI Co-Pilot</span>
              <span className="w-2 h-2 rounded-full bg-primary-container" />
            </button>

            <button
              type="button"
              onClick={() => setScreenShareOpen(true)}
              title="Chamber Settings & Share Source"
              className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
            <button
              type="button"
              onClick={() => setStageLayout((l) => (l === 'grid' ? 'focus' : 'grid'))}
              title="Toggle stage grid layout"
              className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:bg-primary-fixed-dim transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            </button>
          </div>
        </div>

        {/* Main Chamber Stage + Co-Pilot Sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
          {/* Video + Screen Share Stage */}
          <div className={`${sidebarOpen ? 'xl:col-span-8' : 'xl:col-span-12'} space-y-4 transition-all duration-300`}>
            {/* Shared Screen Stage */}
            <div className="relative rounded-2xl bg-[#0e1b26] overflow-hidden shadow-lg p-4 min-h-[420px] flex flex-col justify-between border border-inverse-surface">
              {/* Top stage HUD */}
              <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur text-white font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[14px] text-primary-container">
                      present_to_all
                    </span>
                    Esther V. (Arc Architect) is presenting • {activeScreenName}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/40 text-inverse-on-surface/80 font-code-inline text-[10px]">
                    4K • 60 FPS • HDR
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setScreenShareOpen(true)}
                    className="px-2.5 py-1 rounded-full bg-black/45 hover:bg-black/65 text-white font-label-sm text-label-sm flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">fit_screen</span>
                    <span>Fit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSidebarOpen((s) => !s)}
                    title={sidebarOpen ? 'Expand full stage' : 'Restore sidebar'}
                    className="p-1.5 rounded-full bg-black/45 hover:bg-black/65 text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">fullscreen</span>
                  </button>
                </div>
              </div>

              {/* Architecture CRDT Protocol Diagram */}
              <div className="my-4 relative z-10 flex flex-col items-center justify-center gap-2.5">
                <div className="w-full max-w-2xl rounded-xl bg-[#0a141d]/85 border border-primary-container/25 p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-primary-container">
                    <span>Architecture: Local-First Sync Protocol</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-container/15 text-inverse-on-surface">
                      <span className="w-2 h-2 rounded-full bg-primary-container animate-ping" />
                      crdt_sync_engine.rs: Line 184 — Batch reconciliation state
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { label: 'Meeting Participant A', sub: '(Laptop)', icon: 'laptop_mac' },
                      { label: 'Meeting Participant B', sub: '(Mobile)', icon: 'smartphone' },
                      { label: 'Meeting Room Hub', sub: '(IoT Device)', icon: 'hub' },
                    ].map((node) => (
                      <div
                        key={node.label}
                        className="rounded-lg border border-primary-container/30 bg-[#122533] p-3 text-inverse-on-surface"
                      >
                        <span className="material-symbols-outlined text-primary-container text-[20px]">
                          {node.icon}
                        </span>
                        <p className="font-code-inline text-[11px] font-bold mt-1">{node.label}</p>
                        <p className="font-code-inline text-[10px] text-primary-fixed">
                          {node.sub} • SQLite/WASM
                        </p>
                      </div>
                    ))}
                  </div>

                  <svg className="w-full h-14 text-primary-container" viewBox="0 0 600 60" fill="none">
                    <path
                      d="M100 10 C180 45, 420 45, 500 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <path d="M100 10 L300 45 L500 10" stroke="#62df7d" strokeWidth="1.5" />
                    <circle cx="300" cy="45" r="5" fill="#35e879" />
                    <text x="255" y="34" fill="#7ffc97" fontSize="10" fontFamily="JetBrains Mono">
                      Gossip Protocol
                    </text>
                  </svg>

                  <div className="flex items-center justify-between text-[11px] font-mono text-secondary-fixed">
                    <span>Sync Latency: &lt;50ms</span>
                    <span>Nodes Online: 3</span>
                    <span>CRDT Ops/sec: ~1.2k</span>
                  </div>
                </div>
              </div>

              {/* Live Speaker Caption Overlay */}
              <div className="relative z-10 flex flex-col gap-2.5 w-full">
                <div className="max-w-2xl mx-auto w-full rounded-xl bg-black/65 backdrop-blur-md p-3.5 border border-white/10 text-white flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    EV
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-0.5">
                      <span className="font-label-sm text-label-sm font-bold text-primary-fixed">
                        Esther V.
                      </span>
                      <span className="font-code-inline text-[10px] text-primary-container">
                        Live (Confidence 99.4%)
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-white/90">
                      &ldquo;...CRDT convergence check has been verified across all peer nodes. The
                      deterministic index guarantees zero merge conflicts under extreme split-brain
                      scenarios.&rdquo;
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-primary-container shrink-0 self-center">
                    graphic_eq
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white font-label-sm text-label-sm">
                    <span className="w-2 h-2 rounded-full bg-primary-container" />
                    <span>Esther Voronova</span>
                    <div className="flex items-end gap-0.5 h-3 ml-0.5">
                      <div className="w-0.5 h-3 bg-primary-container animate-pulse" />
                      <div className="w-0.5 h-1.5 bg-primary-container animate-pulse" />
                      <div className="w-0.5 h-2.5 bg-primary-container animate-pulse" />
                      <div className="w-0.5 h-1 bg-primary-container" />
                    </div>
                  </div>

                  {/* Stage layout switcher pills */}
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-full text-white">
                    {(
                      [
                        { id: 'focus', icon: 'featured_video', title: 'Focus view' },
                        { id: 'grid', icon: 'grid_view', title: 'Equal Grid view' },
                        { id: 'sidebar', icon: 'view_sidebar', title: 'Sidebar Stage' },
                      ] as const
                    ).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setStageLayout(m.id);
                          setSidebarOpen(m.id !== 'grid');
                        }}
                        title={m.title}
                        className={`p-1 rounded-full transition-colors ${
                          stageLayout === m.id
                            ? 'bg-white/25 text-white'
                            : 'text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">{m.icon}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5 Live Participant Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                {
                  name: 'Manav A.',
                  badge: 'You (Host)',
                  avatar: AVATARS.manav,
                  initials: 'MA',
                  muted: muted,
                  active: false,
                },
                {
                  name: 'Brandie S.',
                  badge: 'Arc Lead',
                  avatar: AVATARS.brandie,
                  initials: 'BS',
                  muted: true,
                  active: false,
                },
                {
                  name: 'Esther V.',
                  badge: 'Active Speaker',
                  avatar: AVATARS.esther,
                  initials: 'EV',
                  muted: false,
                  active: true,
                },
                {
                  name: 'Bessie T.',
                  badge: 'Security',
                  avatar: AVATARS.bessie,
                  initials: 'BT',
                  muted: true,
                  active: false,
                },
                {
                  name: 'Alex M.',
                  badge: 'Frontend',
                  avatar: AVATARS.alex,
                  initials: 'AM',
                  muted: true,
                  active: false,
                },
              ].map((p) => (
                <div
                  key={p.name}
                  className={`relative rounded-xl overflow-hidden bg-inverse-surface h-28 shadow-sm ${
                    p.active ? 'ring-2 ring-primary-container glow-emerald' : ''
                  }`}
                >
                  <Avatar
                    src={p.avatar}
                    alt={p.name}
                    initials={p.initials}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 p-2 flex flex-col justify-between">
                    <span
                      className={`self-start px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        p.active
                          ? 'bg-primary text-white'
                          : 'bg-black/50 text-white/90'
                      }`}
                    >
                      {p.badge}
                    </span>
                    <div className="flex items-center justify-between text-white text-[11px] font-semibold">
                      <span className="truncate">{p.name}</span>
                      <span
                        className={`material-symbols-outlined text-[14px] ${
                          p.muted ? 'text-error-container' : 'text-primary-container'
                        }`}
                      >
                        {p.muted ? 'mic_off' : 'graphic_eq'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Manav.AI Chamber Sync (4 cols) */}
          {sidebarOpen && (
          <div className="xl:col-span-4 bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">neurology</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Manav.AI Chamber Sync
                  </h2>
                  <p className="font-label-sm text-label-sm text-primary font-medium">
                    • Listening • Zero retention cloud
                  </p>
                </div>
              </div>
            </div>

            {!rfcDismissed && (
              <div className="p-3.5 rounded-xl bg-surface-container-low space-y-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    Suggested Resolution
                  </span>
                  <span className="text-outline">Just now</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface">
                  Esther proposed moving the SQLite VFS driver to worker threads. Should I generate
                  an architectural RFC draft in your Docs folder?
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRfcDismissed(true);
                      notify('Generated SQLite_VFS_Worker_RFC.md in local Documents vault.');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-secondary"
                  >
                    ✓ Generate RFC
                  </button>
                  <button
                    type="button"
                    onClick={() => setRfcDismissed(true)}
                    className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm font-semibold"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-code-inline text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                  DETECTED ACTION ITEMS ({meetingActions.length})
                </span>
                <button
                  type="button"
                  onClick={() => setAddingCustomAction((a) => !a)}
                  className="font-label-sm text-label-sm text-primary font-semibold hover:underline"
                >
                  + Add Custom
                </button>
              </div>

              {addingCustomAction && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customActionInput}
                    onChange={(e) => setCustomActionInput(e.target.value)}
                    placeholder="Capture action item..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-surface-container-low text-body-sm font-body-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      addMeetingAction(customActionInput);
                      setCustomActionInput('');
                      setAddingCustomAction(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-label-sm font-label-sm font-semibold"
                  >
                    Save
                  </button>
                </div>
              )}

              <div className="space-y-2">
                {meetingActions.map((act) => (
                  <label
                    key={act.id}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low/80 hover:bg-surface-container-low cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={act.done}
                      onChange={() => toggleMeetingAction(act.id)}
                      className="mt-1 w-4 h-4 accent-primary cursor-pointer"
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-body-sm text-body-sm font-medium ${
                          act.done ? 'line-through text-outline' : 'text-on-surface'
                        }`}
                      >
                        {act.text}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface font-medium">
                          {act.assignee}
                        </span>
                        <span className="text-primary font-medium">{act.meta}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Live Shared Scratchpad */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-code-inline font-bold uppercase text-on-surface-variant">
                  LIVE SHARED SCRATCHPAD
                </span>
                <span className="text-primary font-semibold">• Autosaved</span>
              </div>
              <textarea
                rows={5}
                value={chamberNotes}
                onChange={(e) => setChamberNotes(e.target.value)}
                className="w-full rounded-xl bg-surface-container-low p-3 font-code-inline text-[11px] text-on-surface outline-none focus:ring-2 focus:ring-primary-container leading-relaxed"
              />
            </div>

            {chamberMessages.length > 0 && (
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {chamberMessages.map((msg, idx) => (
                  <p
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-primary-container/20 font-label-sm text-label-sm text-on-surface"
                  >
                    {msg}
                  </p>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 bg-surface-container-low rounded-full px-3.5 py-2">
              <input
                type="text"
                value={chamberChatInput}
                onChange={(e) => setChamberChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && chamberChatInput.trim()) {
                    setChamberMessages((m) => [...m, `Manav A.: ${chamberChatInput.trim()}`]);
                    setChamberChatInput('');
                  }
                }}
                placeholder="Type message to room or @manav for AI assist..."
                className="flex-1 bg-transparent outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline"
              />
              <button
                type="button"
                onClick={() => {
                  if (!chamberChatInput.trim()) return;
                  setChamberMessages((m) => [...m, `Manav A.: ${chamberChatInput.trim()}`]);
                  setChamberChatInput('');
                }}
                aria-label="Send chamber message"
                className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </div>
          </div>
          )}
        </div>

        {/* Bottom Floating Call Control Dock */}
        <div className="sticky bottom-4 z-30 flex justify-center pt-1">
          <div className="inline-flex flex-wrap items-center gap-2 bg-surface-container-lowest/90 backdrop-blur-xl px-3 py-2 rounded-full shadow-xl border border-white/80">
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className={`px-3.5 py-2 rounded-full font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors ${
                muted
                  ? 'bg-error-container text-on-error-container'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className={`material-symbols-outlined text-[17px] ${muted ? 'text-error' : 'text-primary'}`}>
                {muted ? 'mic_off' : 'mic'}
              </span>
              <span>{muted ? 'Unmute' : 'Mute'}</span>
            </button>

            <button
              type="button"
              onClick={() => setCameraOn((c) => !c)}
              className={`px-3.5 py-2 rounded-full font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors ${
                !cameraOn
                  ? 'bg-error-container text-on-error-container'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className={`material-symbols-outlined text-[17px] ${!cameraOn ? 'text-error' : 'text-primary'}`}>
                {cameraOn ? 'videocam' : 'videocam_off'}
              </span>
              <span>Camera</span>
            </button>

            <button
              type="button"
              onClick={() => setScreenShareOpen(true)}
              className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1.5 hover:bg-secondary transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[17px]">screen_share</span>
              <span>Presenting</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setHandRaised((h) => !h);
                notify(!handRaised ? 'Hand raised in encrypted room.' : 'Hand lowered.', 'info');
              }}
              className={`px-3.5 py-2 rounded-full font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors ${
                handRaised
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">front_hand</span>
              <span>Raise</span>
            </button>

            <button
              type="button"
              onClick={() => notify('Sent 👍 encrypted reaction to peer mesh.')}
              className="px-3.5 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-semibold flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[17px]">add_reaction</span>
              <span>React</span>
            </button>

            <button
              type="button"
              onClick={() => setPrivacyModalOpen(true)}
              title="Security & Encryption Specs"
              className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[17px]">shield</span>
            </button>

            <div className="h-6 w-[1px] bg-surface-container-high mx-0.5" />

            <button
              type="button"
              onClick={() => {
                setMeetingSubView('notes');
                notify('Left WebRTC chamber cleanly. Transcript saved to Vault.', 'info');
              }}
              className="px-4 py-2 rounded-full bg-error text-on-error font-label-md text-label-md font-bold flex items-center gap-1.5 hover:opacity-90 shadow-sm"
            >
              <span className="material-symbols-outlined text-[17px]">call_end</span>
              <span>Leave</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===================== VAULT VIEW (Image 9) & NOTES VIEW (Image 8) =====================
  return (
    <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-6">
      {/* Sub-view Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-surface-container-lowest shadow-sm">
          {[
            { id: 'notes', label: 'Notes & Agenda', icon: 'edit_note' },
            { id: 'vault', label: 'Meetings & AI Session Vault', icon: 'video_library' },
            { id: 'chamber', label: 'Live Call Chamber', icon: 'videocam' },
          ].map((tab) => {
            const active = meetingSubView === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMeetingSubView(tab.id as 'notes' | 'vault' | 'chamber')}
                className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-1.5 transition-all ${
                  active
                    ? 'bg-primary-container text-on-primary-container font-semibold glow-emerald'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <MeetingLogoWordmark compact />
      </div>

      {meetingSubView === 'vault' ? (
        /* ============ IMAGE 9: MEETINGS & AI SESSION VAULT ============ */
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                MEETING VAULT &amp; SESSIONS •
              </span>
              <h1 className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">
                Meetings &amp; AI Session Vault
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-2xl">
                Schedule, launch zero-knowledge encrypted chambers, and inspect autonomous real-time
                transcriptions, deterministic action items, and Manav.AI synthesis.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center bg-surface-container-lowest px-3.5 py-2 rounded-xl shadow-sm gap-2">
                <span className="material-symbols-outlined text-[18px] text-outline">search</span>
                <input
                  type="text"
                  value={vaultSearch}
                  onChange={(e) => setVaultSearch(e.target.value)}
                  placeholder="Search meetings, transcripts, action items..."
                  className="bg-transparent outline-none font-body-sm text-body-sm w-56"
                />
              </div>
              <button
                type="button"
                onClick={() => openMeetingChamber('Instant Encrypted Chamber')}
                className="px-4 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-md text-label-md font-semibold shadow-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[17px] text-primary">videocam</span>
                <span>Start Instant Chamber</span>
              </button>
              <button
                type="button"
                onClick={() => openQuickCreate('meeting')}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-secondary text-on-primary font-label-md text-label-md font-semibold shadow-md flex items-center gap-1.5"
              >
                <span>+ Schedule Meeting</span>
              </button>
            </div>
          </div>

          {/* 4 KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Meetings This Month', val: '38', badge: '+12% vs last mo', pct: 76, icon: 'calendar_today' },
              { label: 'Upcoming Today', val: '3', badge: '1 Live Soon', pct: 45, icon: 'schedule' },
              { label: 'Generated Action Items', val: '24', badge: 'Open / 52 Resolved', pct: 68, icon: 'check_circle' },
              { label: 'AI Transcription Time Saved', val: '14.6 hrs', badge: '100% On-Device', pct: 88, icon: 'smart_toy' },
            ].map((k) => (
              <div key={k.label} className="bg-surface-container-lowest p-4 rounded-xl shadow-sm space-y-2">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-md text-label-md">{k.label}</span>
                  <span className="material-symbols-outlined text-[18px] text-primary">{k.icon}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-data-metric text-data-metric text-on-surface">{k.val}</span>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">
                    {k.badge}
                  </span>
                </div>
                <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${k.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Active Session Chamber + Past Meetings */}
            <div className="xl:col-span-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">sensors</span>
                    <span>Active Session Chamber</span>
                  </h2>
                  <span className="font-label-sm text-label-sm text-outline">
                    Direct Encrypted P2P • Zero Cloud Storage
                  </span>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                        • Starts in 15 mins
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-code-inline text-[11px] font-semibold">
                        #ARC-8942
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-label-sm font-semibold">
                        WebRTC E2EE Sealed
                      </span>
                    </div>

                    <div>
                      <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface leading-tight">
                        Sprint Planning &amp; Architecture Sync with Arc Company
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-primary">
                          schedule
                        </span>
                        Today, 02:00 PM – 04:00 PM EST (2 hours scheduled)
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-surface-container-low space-y-1.5">
                      <p className="font-label-sm text-label-sm font-bold text-primary flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px]">list_alt</span>
                        Encrypted Session Agenda
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        1. SQLite WASM OPFS backing review • 2. WebRTC mesh node saturation boundaries
                        • 3. Deterministic CRDT convergence verification on edge nodes.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Attending (7):
                      </span>
                      <div className="flex -space-x-1.5">
                        {['BS', 'EV', 'BA', 'AM'].map((ini) => (
                          <span
                            key={ini}
                            className="w-7 h-7 rounded-full bg-inverse-surface text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white"
                          >
                            {ini}
                          </span>
                        ))}
                        <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                          +2
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Chamber Launch Box featuring the custom Meeting Logo! */}
                  <div className="lg:col-span-5 bg-surface-container-low/60 rounded-2xl p-4 space-y-4 border border-surface-container">
                    <div className="space-y-1.5 text-[11px] font-code-inline">
                      <div className="flex justify-between">
                        <span className="text-outline">Chamber State</span>
                        <span className="text-primary font-bold">Online • Ready</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-outline">Host Node</span>
                        <span className="text-on-surface font-semibold">node://arc-perr-01</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-outline">Bitrate</span>
                        <span className="text-on-surface font-semibold">Lossless AV1</span>
                      </div>
                    </div>

                    <div className="flex justify-center py-2">
                      <MeetingLogoWordmark />
                    </div>

                    <button
                      type="button"
                      onClick={() => openMeetingChamber()}
                      className="w-full py-2.5 rounded-xl bg-primary hover:bg-secondary text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">videocam</span>
                      <span>Join Chamber</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => notify('Copied encrypted room link #ARC-8942.')}
                        className="py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold"
                      >
                        Copy Link
                      </button>
                      <button
                        type="button"
                        onClick={() => notify('AV test: Mic & 60fps camera verified locally.')}
                        className="py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold"
                      >
                        Test AV
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Past Meetings & Recaps */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                      Past Meetings &amp; Autonomous AI Recaps
                    </h2>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Full verbatim transcripts, on-device Whisper models, verified speaker
                      separations.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1 bg-surface-container-lowest p-1 rounded-full shadow-sm">
                    {(['All Types', 'Arc Company', 'Internal'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setRecapFilter(t)}
                        className={`px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold transition-colors ${
                          recapFilter === t
                            ? 'bg-primary text-on-primary'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredRecaps.map((r) => (
                    <div
                      key={r.id}
                      className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-label-sm">
                          <span className="text-primary font-bold">{r.timeRange}</span>
                          <span className="text-outline">• {r.summary}</span>
                          <span className="text-outline">• {r.duration}</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                          {r.title}
                        </h3>
                        <div className="p-2.5 rounded-xl bg-secondary-container/30 text-on-secondary-container font-body-sm text-body-sm">
                          <span className="font-bold">Manav.AI Synthesis:</span> {r.aiSynthesis}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {r.tags.map((tg) => (
                            <span
                              key={tg}
                              className="px-2.5 py-0.5 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant font-medium"
                            >
                              {tg}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setMeetingSubView('notes')}
                          className="px-3.5 py-2 rounded-xl bg-primary hover:bg-secondary text-on-primary font-label-sm text-label-sm font-semibold"
                        >
                          View Summary →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Other Scheduled Sessions & Quick Tools */}
            <div className="xl:col-span-4 space-y-5">
              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Other Scheduled Sessions
                  </h2>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">
                    View full calendar →
                  </span>
                </div>

                {[
                  {
                    badge: 'Design Standup',
                    title: 'Design System Standup & Token Review',
                    time: 'Tomorrow, 09:30 AM – 10:00 AM (30m)',
                    attendees: '4 attendees',
                    source: 'Google Meet Synced',
                  },
                  {
                    badge: 'Client Sign-off',
                    title: 'Sullivan UX Review & Client Sign-off',
                    time: 'Tomorrow, 11:00 AM – 12:00 PM (1h)',
                    attendees: '6 attendees',
                    source: 'Zoom E2EE Bridge',
                  },
                  {
                    badge: 'Internal Core',
                    title: 'Primor Token Biometrics Kickoff',
                    time: 'Friday, 10:00 AM – 10:45 AM (45m)',
                    attendees: '3 attendees',
                    source: 'Local Vault Chamber',
                  },
                ].map((sess) => (
                  <div
                    key={sess.title}
                    className="p-3.5 rounded-xl bg-surface-container-low/70 space-y-2"
                  >
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                      {sess.badge}
                    </span>
                    <p className="font-label-md text-label-md font-bold text-on-surface">
                      {sess.title}
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      {sess.time}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-outline">
                      <span>{sess.attendees}</span>
                      <span>{sess.source}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openMeetingChamber(sess.title)}
                      className="w-full py-1.5 rounded-lg bg-surface-container-lowest hover:bg-primary-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors"
                    >
                      View Session Details
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-3">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Quick Meeting Tools
                </h3>
                <div className="p-3 rounded-xl bg-surface-container-low space-y-1">
                  <div className="flex justify-between font-label-sm text-label-sm">
                    <span className="font-semibold text-on-surface">Local Storage Footprint</span>
                    <span className="font-code-inline text-primary font-bold">2.1 GB / 10 GB</span>
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    128 encrypted recordings preserved on-device with zero telemetry egress.
                  </p>
                  <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-primary h-full rounded-full w-[21%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ============ IMAGE 8: MEETINGS & COLLABORATIVE NOTES ============ */
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                  Collaboration &amp; Sync Sessions
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
                  Meetings &amp; Collaborative Notes
                </h1>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-label-md text-label-md font-semibold">
                    1 Session Starting Soon
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-surface-container-lowest rounded-xl shadow-sm text-on-surface font-label-md text-label-md">
                <span className="material-symbols-outlined text-[16px] text-tertiary">schedule</span>
                <span className="font-medium">UTC-4 (EDT)</span>
              </div>
              <button
                type="button"
                onClick={() => notify('Calendar synced with local encrypted mirror.')}
                className="flex items-center gap-2 px-3.5 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-xl font-label-md text-label-md transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[17px] text-primary">sync</span>
                <span className="font-medium">Sync Calendar</span>
                <span className="px-1.5 py-0.5 rounded-full bg-surface-container-lowest text-[10px] text-on-surface-variant font-mono">
                  Google/Outlook
                </span>
              </button>
              <button
                type="button"
                onClick={() => openQuickCreate('meeting')}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-on-primary-container text-on-primary rounded-xl font-headline-sm text-headline-sm shadow-md transition-all glow-emerald"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span className="font-semibold">+ Schedule Meeting</span>
              </button>
            </div>
          </div>

          {/* Spotlight Hero Card */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-6 lg:p-8 shadow-sm">
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold tracking-wide uppercase shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    Upcoming in 12 Minutes
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-code-inline text-code-inline font-mono">
                    <span className="material-symbols-outlined text-[13px] text-primary">
                      enhanced_encryption
                    </span>
                    vault-881: local peer
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-tertiary font-label-sm text-label-sm">
                    High Priority
                  </span>
                </div>

                <div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                    Sprint Planning &amp; Architecture Sync with Arc Company
                  </h2>
                  <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 mt-2 text-on-surface-variant font-body-sm text-body-sm">
                    <span className="text-on-surface font-medium">
                      02:00 PM – 04:00 PM (120 mins)
                    </span>
                    <span>•</span>
                    <span>Room: #arc-vault-881</span>
                    <span>•</span>
                    <span>Zero Cloud Retention (Local Mesh)</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="font-label-sm text-label-sm text-tertiary">
                    Pre-meeting Artifacts:
                  </span>
                  <button
                    type="button"
                    onClick={() => openDocByName('Q2_Roadmap.pdf')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px] text-error">
                      picture_as_pdf
                    </span>
                    <span className="font-mono">Q2_Roadmap.pdf</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openDocByName('Sprint_32_Backlog.md')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      markdown
                    </span>
                    <span className="font-mono">Sprint_32_Backlog.md</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-stretch xl:items-end justify-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => openMeetingChamber()}
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-headline-sm text-headline-sm text-on-primary bg-primary hover:bg-on-primary-container transition-all glow-emerald-strong"
                >
                  <span className="material-symbols-outlined text-[22px]">videocam</span>
                  <div className="text-left">
                    <div className="font-bold leading-tight">Start Meeting</div>
                    <div className="font-label-sm text-label-sm text-on-primary/80 font-normal">
                      Encrypted Call Chamber
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Agenda + Live Collaborative Notes Split */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            <div className="xl:col-span-5 flex flex-col gap-4">
              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Today&apos;s Agenda
                    </h3>
                    <p className="font-label-sm text-label-sm text-tertiary">
                      Thursday, October 24 • {meetings.length} Synced Events
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
                    3h 45m scheduled
                  </span>
                </div>

                <div className="space-y-3">
                  {meetings.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3.5 rounded-xl transition-all ${
                        m.status === 'live-soon'
                          ? 'bg-secondary-container/25 shadow-sm'
                          : 'bg-surface-container-low/70'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-body-md text-body-md font-bold text-on-surface truncate">
                          {m.title}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold shrink-0 ${
                            m.status === 'live-soon'
                              ? 'bg-primary-container text-on-primary-container'
                              : m.status === 'done'
                                ? 'text-secondary'
                                : 'text-tertiary'
                          }`}
                        >
                          {m.status === 'live-soon'
                            ? 'In 12m'
                            : m.status === 'done'
                              ? 'Done'
                              : m.status === 'automated'
                                ? 'Automated'
                                : 'Upcoming'}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        {m.summary}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-code-inline text-[11px] text-outline">
                          {m.timeRange}
                        </span>
                        {m.status === 'live-soon' && (
                          <button
                            type="button"
                            onClick={() => openMeetingChamber(m.title)}
                            className="px-3 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold"
                          >
                            Quick Join
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
                  </div>
                  <div>
                    <div className="font-label-md text-label-md font-semibold text-on-surface">
                      Local Whisper Transcription
                    </div>
                    <div className="font-label-sm text-label-sm text-tertiary">
                      On-device neural inference • 0ms latency
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container text-primary font-code-inline text-code-inline font-semibold">
                  Active Ready
                </span>
              </div>
            </div>

            <div className="xl:col-span-7 bg-surface-container-lowest rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                      Live Meeting Notes &amp; Smart Summaries
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      AI Synced
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-tertiary mt-0.5">
                    Real-time collaborative pad with automated action capture
                  </p>
                </div>

                <button
                  type="button"
                  onClick={pushMeetingActionsToTasks}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    arrow_forward
                  </span>
                  <span>Push to Task Queue</span>
                </button>
              </div>

              <div className="space-y-3">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface block">
                  Subject: Arc Company Q2 Deliverables &amp; Zero-Trust Bridge
                </span>
                <textarea
                  rows={3}
                  value={notesContent}
                  onChange={(e) => setNotesContent(e.target.value)}
                  className="w-full rounded-xl bg-surface-container-low/60 p-3 font-body-md text-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary-container leading-relaxed"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[16px] animate-pulse">
                      graphic_eq
                    </span>
                    <span>Audio Transcription Preview (Live Stream)</span>
                  </div>
                  <span className="font-code-inline text-code-inline text-tertiary">
                    02:04 PM • Stream active
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-lowest shadow-sm font-body-sm text-body-sm text-on-surface">
                  <span className="font-semibold text-primary">Speaker 1 (Esther):</span> “All local
                  SQLite models are isolated with zero cloud leakage. If Arc Company initiates a
                  cluster failover, the peer mesh will preserve state locally on the user desktop
                  before committing to remote shards.”
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">
                      auto_awesome
                    </span>
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      AI Action Items Extracted
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm bg-surface-container-lowest px-2.5 py-0.5 rounded-full text-primary font-semibold shadow-sm">
                    {meetingActions.length} detected
                  </span>
                </div>

                <div className="space-y-2">
                  {meetingActions.map((act) => (
                    <label
                      key={act.id}
                      className="flex items-start gap-3 p-2.5 rounded-lg bg-surface-container-lowest shadow-sm cursor-pointer hover:bg-surface-bright transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={act.done}
                        onChange={() => toggleMeetingAction(act.id)}
                        className="mt-1 w-4 h-4 accent-primary cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <span
                          className={`font-body-sm text-body-sm font-medium ${
                            act.done ? 'line-through text-outline' : 'text-on-surface'
                          }`}
                        >
                          {act.text}
                        </span>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-tertiary">
                          <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface">
                            Assignee: {act.assignee}
                          </span>
                          <span>{act.meta}</span>
                          {act.confidence && (
                            <span className="text-primary font-medium">
                              Confidence: {act.confidence}%
                            </span>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
