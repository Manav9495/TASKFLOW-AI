import React, { useMemo, useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Avatar } from '../components/common/Avatar';

export const InboxPage: React.FC = () => {
  const {
    inboxMessages,
    markMessageRead,
    markAllInboxRead,
    sendInboxReply,
    approveAndMergePR,
    documents,
    setPreviewDoc,
    addTask,
    notify,
  } = useWorkspace();

  const [topTab, setTopTab] = useState<'all' | 'mentions' | 'action' | 'security' | 'archived'>('all');
  const [chipFilter, setChipFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string>(inboxMessages[0]?.id ?? 'msg-1');
  const [replyText, setReplyText] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const unreadCount = inboxMessages.filter((m) => m.unread).length + 10;

  const visibleMessages = useMemo(() => {
    return inboxMessages.filter((m) => {
      if (topTab === 'mentions' && m.category !== 'Mentions') return false;
      if (topTab === 'action' && !m.actionRequired) return false;
      if (topTab === 'security' && m.category !== 'Vault Status') return false;
      if (topTab === 'archived' && !m.archived) return false;
      if (chipFilter !== 'All' && m.category !== chipFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          m.title.toLowerCase().includes(q) ||
          m.sender.toLowerCase().includes(q) ||
          m.project.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [inboxMessages, topTab, chipFilter, search]);

  const activeMsg =
    inboxMessages.find((m) => m.id === selectedId) ?? visibleMessages[0] ?? inboxMessages[0];

  const handleSelectMessage = (id: string) => {
    setSelectedId(id);
    markMessageRead(id);
  };

  const handleSend = () => {
    if (!activeMsg || !replyText.trim()) return;
    sendInboxReply(activeMsg.id, replyText);
    setReplyText('');
  };

  const handleCopyCode = () => {
    if (!activeMsg?.codeBlock) return;
    navigator.clipboard?.writeText(activeMsg.codeBlock.code).catch(() => {});
    setCopiedCode(true);
    notify('Copied Rust attestation snippet to clipboard.');
    window.setTimeout(() => setCopiedCode(false), 1500);
  };

  return (
    <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-5">
      {/* Header Ribbon */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-code-inline text-code-inline uppercase tracking-wider text-primary font-semibold">
              UNIFIED INBOX &amp; TRIAGE QUEUE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Inbox &amp; Activity Feed
            </h1>
            <span className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-bold">
              • {unreadCount} Unread
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-surface-container-lowest p-1.5 rounded-full shadow-sm">
          {[
            { id: 'all', label: 'All Messages', count: 42 },
            { id: 'mentions', label: 'Direct Mentions', count: 5 },
            { id: 'action', label: 'Action Required', count: 7, dot: true },
            { id: 'security', label: 'Security' },
            { id: 'archived', label: 'Archived' },
          ].map((tab) => {
            const active = topTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTopTab(tab.id as typeof topTab)}
                className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md flex items-center gap-1.5 transition-all ${
                  active
                    ? 'bg-primary-container text-on-primary-container font-semibold glow-emerald'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {tab.dot && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                      active ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}

          <button
            type="button"
            onClick={markAllInboxRead}
            className="px-3.5 py-1.5 rounded-full bg-error text-on-error font-label-md text-label-md font-semibold flex items-center gap-1 hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[15px]">done_all</span>
            <span>Mark All Read</span>
          </button>
        </div>
      </div>

      {/* 3-Pane Triage Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Dispatch Queue (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-surface-container-lowest rounded-2xl p-3 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-xl">
              <span className="material-symbols-outlined text-[18px] text-outline">search</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter dispatches, hash, authors..."
                className="flex-1 bg-transparent outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline"
              />
              <span className="material-symbols-outlined text-[16px] text-outline">tune</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {['All', 'Priority', 'Mentions', 'PRs & Commits', 'Vault Status'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setChipFilter(c)}
                  className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-colors ${
                    chipFilter === c
                      ? 'bg-primary-container/50 text-on-primary-container font-semibold'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {c === 'Mentions' ? '@Mentions' : c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {visibleMessages.map((m) => {
              const selected = activeMsg?.id === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleSelectMessage(m.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all shadow-sm ${
                    selected
                      ? 'bg-surface-container-lowest ring-2 ring-primary-container shadow-md'
                      : 'bg-surface-container-lowest/90 hover:bg-surface-container-lowest'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Avatar
                        src={m.senderAvatar}
                        alt={m.sender}
                        initials={m.senderInitials}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-label-md text-label-md font-bold text-on-surface truncate">
                          {m.sender}
                        </p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                          {m.senderRole}
                        </p>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1 shrink-0">
                      {m.timestamp}
                      {m.unread && <span className="w-2 h-2 rounded-full bg-primary" />}
                    </span>
                  </div>

                  <p className="font-label-md text-label-md font-bold text-on-surface mt-2.5 leading-snug">
                    {m.title}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                    {m.preview}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    {m.badgeText && (
                      <span
                        className={`px-2 py-0.5 rounded-md font-label-sm text-label-sm font-semibold ${
                          m.badgeTone === 'urgent'
                            ? 'bg-error-container text-on-error-container'
                            : m.badgeTone === 'success'
                              ? 'bg-secondary-container/50 text-on-secondary-container'
                              : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {m.badgeText}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                      {m.project}
                    </span>
                    {m.artifacts && m.artifacts.length > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-surface-container-low text-outline font-label-sm text-label-sm">
                        {m.artifacts.length} files
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Message Thread Reader (5 cols) */}
        {activeMsg && (
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl shadow-sm p-6 space-y-5 relative">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar
                  src={activeMsg.senderAvatar}
                  alt={activeMsg.sender}
                  initials={activeMsg.senderInitials}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-surface-container"
                />
                <div>
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    {activeMsg.sender}
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {activeMsg.senderRole}
                  </p>
                  <p className="font-code-inline text-[11px] text-outline mt-0.5">
                    {activeMsg.senderEmail} • Today, 10:42 AM
                  </p>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
                {activeMsg.timestamp}
                <span className="w-2 h-2 rounded-full bg-primary" />
              </span>
            </div>

            {/* Metadata chips + vertical quick rail */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {activeMsg.actionRequired && (
                    <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                      • Urgent Action Required
                    </span>
                  )}
                  {activeMsg.targetRelease && (
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm font-medium">
                      Target Release: {activeMsg.targetRelease}
                    </span>
                  )}
                  {activeMsg.prNumber && (
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-code-inline text-[11px] font-bold">
                      {activeMsg.prNumber}
                    </span>
                  )}
                </div>

                <h3 className="font-headline-md text-headline-md font-bold text-on-surface leading-snug">
                  {activeMsg.title}
                </h3>
              </div>

              <div className="flex flex-col gap-1 p-1 rounded-full bg-primary-container/90 text-on-primary-container shadow-sm shrink-0">
                <button
                  type="button"
                  title="Reply"
                  onClick={() => document.getElementById('inbox-reply-box')?.focus()}
                  className="p-1.5 rounded-full hover:bg-black/10"
                >
                  <span className="material-symbols-outlined text-[16px]">reply</span>
                </button>
                <button
                  type="button"
                  title="Approve & Merge"
                  onClick={() => approveAndMergePR(activeMsg.id)}
                  className="p-1.5 rounded-full hover:bg-black/10"
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                </button>
                <button
                  type="button"
                  title="Convert to Task"
                  onClick={() =>
                    addTask({
                      title: activeMsg.title,
                      assignee: 'Manav A.',
                      assigneeInitials: 'MA',
                      project: activeMsg.project,
                      dueDate: 'Today, 17:00',
                      priority: 'Urgent',
                      status: 'Due Today',
                      tags: ['#inbox-triage'],
                    })
                  }
                  className="p-1.5 rounded-full hover:bg-black/10"
                >
                  <span className="material-symbols-outlined text-[16px]">add_task</span>
                </button>
              </div>
            </div>

            {/* Body Paragraphs + Code Block */}
            <div className="space-y-3 font-body-sm text-body-sm text-on-surface leading-relaxed">
              {activeMsg.bodyParagraphs.slice(0, 2).map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              {activeMsg.codeBlock && (
                <div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-4 font-code-inline text-code-inline overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="flex gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-error" />
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim" />
                        <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
                      </span>
                      <span className="text-inverse-on-surface/80">{activeMsg.codeBlock.filename}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">
                        {activeMsg.codeBlock.language}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="text-primary-fixed hover:underline flex items-center gap-1 text-[11px]"
                      >
                        <span className="material-symbols-outlined text-[13px]">content_copy</span>
                        <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                  <pre className="text-primary-fixed leading-relaxed whitespace-pre">
                    {activeMsg.codeBlock.code}
                  </pre>
                </div>
              )}

              {activeMsg.bodyParagraphs.slice(2).map((p, idx) => (
                <p key={`tail-${idx}`}>{p}</p>
              ))}
            </div>

            {/* Signed Artifacts */}
            {activeMsg.artifacts && activeMsg.artifacts.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-[11px] font-label-sm">
                  <span className="font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified_user</span>
                    CRYPTOGRAPHICALLY SIGNED ARTIFACTS ({activeMsg.artifacts.length})
                  </span>
                  <span className="text-outline">All signatures valid</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeMsg.artifacts.map((art) => (
                    <button
                      key={art.name}
                      type="button"
                      onClick={() => {
                        const doc =
                          documents.find((d) => d.name === art.name) ?? documents[0];
                        if (doc) setPreviewDoc(doc);
                      }}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors text-left"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shrink-0">
                          <span className="material-symbols-outlined text-[17px]">
                            {art.type === 'json' ? 'data_object' : 'description'}
                          </span>
                        </span>
                        <div className="min-w-0">
                          <p className="font-label-sm text-label-sm font-bold text-on-surface truncate">
                            {art.name}
                          </p>
                          <p className="font-code-inline text-[10px] text-primary">
                            {art.size} • {art.hashStatus}
                          </p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[16px] text-outline">
                        download
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sent Replies */}
            {activeMsg.replies.length > 0 && (
              <div className="space-y-2 pt-2">
                {activeMsg.replies.map((r, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-primary-container/15 border border-primary-container/40"
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold text-primary">
                      <span>{r.author}</span>
                      <span>{r.time}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface mt-1">{r.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* AI Smart Replies + Encrypted Reply Composer */}
            <div className="space-y-3 pt-2 border-t border-surface-container-low">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm font-bold text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  AI Smart Replies
                </span>
                <span className="font-code-inline text-[10px] text-outline">
                  Llama 3 70B Local Engine
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {activeMsg.smartReplies.map((sr) => (
                  <button
                    key={sr}
                    type="button"
                    onClick={() => setReplyText(sr)}
                    className="px-3 py-1 rounded-full bg-secondary-container/40 hover:bg-primary-container text-on-secondary-container font-label-sm text-label-sm font-medium transition-colors"
                  >
                    {sr}
                  </button>
                ))}
              </div>

              <div className="bg-surface-container-low rounded-xl p-3 space-y-2">
                <textarea
                  id="inbox-reply-box"
                  rows={2}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleSend();
                  }}
                  placeholder={`Write encrypted reply to ${activeMsg.sender} (Ctrl+Enter to send)...`}
                  className="w-full bg-transparent outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-outline">
                    <span className="material-symbols-outlined text-[17px]">attach_file</span>
                    <span className="material-symbols-outlined text-[17px]">code</span>
                    <span className="material-symbols-outlined text-[17px]">link</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        addTask({
                          title: `Follow up: ${activeMsg.title}`,
                          assignee: 'Manav A.',
                          assigneeInitials: 'MA',
                          project: activeMsg.project,
                          dueDate: 'Today, 17:00',
                          priority: 'High',
                          status: 'Due Today',
                          tags: ['#inbox'],
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold"
                    >
                      + Add Action Item
                    </button>
                    <button
                      type="button"
                      onClick={handleSend}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary hover:bg-secondary text-on-primary font-label-sm text-label-sm font-semibold"
                    >
                      <span>Send</span>
                      <span className="material-symbols-outlined text-[15px]">send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right AI Triage Sidebar (3 cols) */}
        {activeMsg && (
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[19px]">
                    auto_awesome
                  </span>
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    AI Triage Summary
                  </h2>
                </div>
                <span className="w-2 h-2 rounded-full bg-primary-container" />
              </div>

              <div className="space-y-3">
                {activeMsg.triageSummary.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-surface-container text-primary font-code-inline text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => approveAndMergePR(activeMsg.id)}
                className="w-full py-2.5 rounded-xl bg-surface-container-low hover:bg-primary-container text-on-surface hover:text-on-primary-container font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[17px] text-primary">
                  check_circle
                </span>
                <span>One-Click Approve &amp; Merge</span>
              </button>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Sender Context
              </h3>
              <div className="flex items-center gap-3">
                <Avatar
                  src={activeMsg.senderAvatar}
                  alt={activeMsg.sender}
                  initials={activeMsg.senderInitials}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="font-label-md text-label-md font-bold text-on-surface">
                    {activeMsg.sender}
                  </p>
                  <p className="font-label-sm text-label-sm text-outline">
                    {activeMsg.senderRole} • GMT-5
                  </p>
                </div>
              </div>
              <div className="space-y-2 pt-1">
                <div className="p-2.5 rounded-xl bg-surface-container-low font-label-sm text-label-sm text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">groups</span>
                  <span>2 shared meetings scheduled today</span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-low font-label-sm text-label-sm text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-outline">
                    schedule
                  </span>
                  <span>Avg reply time: ~14 minutes</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Linked Projects
                </h3>
                <span className="font-label-sm text-label-sm text-outline">2 Active</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-label-sm font-label-sm">
                  <span className="font-semibold text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Sullivan Mobile
                  </span>
                  <span className="text-outline">6 tasks open</span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-label-sm font-label-sm">
                  <span className="font-semibold text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-surface-container-highest" />
                    Primor Core
                  </span>
                  <span className="text-outline">2 tasks open</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-secondary-container/45 text-on-secondary-container flex items-center gap-3">
              <span className="material-symbols-outlined text-[22px] text-primary">
                verified_user
              </span>
              <div>
                <p className="font-label-md text-label-md font-bold">
                  Local Vault Integrity Verified
                </p>
                <p className="font-code-inline text-[11px]">AES-GCM-256 • Hardware Bound</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
