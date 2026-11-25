import React, { useMemo, useRef, useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { AVATARS } from '../data/mockWorkspace';
import { DocumentItem } from '../types/workspace';
import { Avatar } from '../components/common/Avatar';

interface PinnedSpec {
  id: string;
  name: string;
  type: DocumentItem['type'];
  desc: string;
  metaLeft: string;
  metaRight: string;
  metaRightPrimary?: boolean;
  metaRightIcon?: string;
  author?: string;
  avatar?: string;
  tag: 'Architecture' | 'Roadmaps' | 'Security';
  statusBadge: string;
  statusTone: 'success' | 'info' | 'default';
  badgeChip?: string[];
  icon: string;
  cornerGradient: string;
  docData: DocumentItem;
}

const PINNED_SPECS: PinnedSpec[] = [
  {
    id: 'pin-1',
    name: 'Product_Brief.txt',
    type: 'txt',
    desc: 'Core architectural objectives for autonomous background sync and encrypted key storage.',
    metaLeft: '3,420 words',
    metaRight: '12m ago',
    author: 'Brandie C.',
    avatar: AVATARS.brandie,
    tag: 'Roadmaps',
    statusBadge: 'In Progress',
    statusTone: 'success',
    icon: 'article',
    cornerGradient: 'from-primary-container/20',
    docData: {
      id: 'doc-1',
      name: 'Product_Brief.txt',
      type: 'txt',
      size: '24.19 KB',
      project: 'Primor Project',
      author: 'Brandie C.',
      updatedAt: '12m ago',
      syncStatus: 'In progress',
      progress: 43,
      sha256: 'e3b0c442...98fc1c14',
      contentPreview:
        'Primor Enterprise Portal v2.4 focuses on sub-20ms CRDT local conflict convergence with zero cloud metadata leakage. Key milestones include RBAC enclave isolation, encrypted receipt exports, and automated meeting action extraction.',
    },
  },
  {
    id: 'pin-2',
    name: 'Architecture_Overview.md',
    type: 'md',
    desc: 'Full state tree representation, conflict-free replicated data types (CRDTs), and engine loop.',
    metaLeft: '412 KB',
    metaRight: 'AI Vectorized',
    metaRightPrimary: true,
    metaRightIcon: 'psychology',
    tag: 'Architecture',
    statusBadge: 'Verified',
    statusTone: 'info',
    badgeChip: ['Primor', 'Crypto'],
    icon: 'code_blocks',
    cornerGradient: 'from-primary/20',
    docData: {
      id: 'doc-3',
      name: 'Architecture_Overview.md',
      type: 'md',
      size: '412 KB',
      project: 'Primor Project',
      author: 'Esther W.',
      updatedAt: '12m ago',
      syncStatus: 'RAG Staged',
      progress: 100,
      sha256: '8f4e...c391',
      contentPreview:
        '# Architecture Overview: Local-First State Sync & Conflict-Free Replication\nEvery workspace document and state vector is materialized inside local SQLite 3.42 WAL mode storage before attempting zero-knowledge peer replication via authenticated secure transport (ChaCha20-Poly1305).',
    },
  },
  {
    id: 'pin-3',
    name: 'Sprint_32_Backlog.md',
    type: 'md',
    desc: 'Linear synced backlog tasks for client telemetry, auth tokens, and offline caching metrics.',
    metaLeft: '48 KB',
    metaRight: '1h ago',
    author: 'Esther W.',
    avatar: AVATARS.esther,
    tag: 'Roadmaps',
    statusBadge: 'Linear Synced',
    statusTone: 'default',
    icon: 'table_chart',
    cornerGradient: 'from-secondary-fixed/30',
    docData: {
      id: 'doc-5',
      name: 'Sprint_32_Backlog.md',
      type: 'md',
      size: '48 KB',
      project: 'Arc Company',
      author: 'Esther W.',
      updatedAt: '1h ago',
      syncStatus: 'Vectorized',
      progress: 100,
      sha256: '7c2e90b1...118a43fe',
      contentPreview:
        '## Sprint 32 Priorities\n- [ ] Move SQLite VFS driver to worker threads\n- [ ] Stress test 50,000 synthetic CRDT write ops\n- [x] Verify WebRTC 12-peer SFU fallback boundary',
    },
  },
  {
    id: 'pin-4',
    name: 'Client_NDA_ArcCompany.pdf',
    type: 'pdf',
    desc: 'Bilateral non-disclosure agreement for Q3 AI agent deployment and telemetry export.',
    metaLeft: '1.4 MB',
    metaRight: 'AES-256',
    metaRightPrimary: true,
    tag: 'Security',
    statusBadge: 'Signed',
    statusTone: 'success',
    badgeChip: ['Legal / Arc'],
    icon: 'lock',
    cornerGradient: 'from-inverse-surface/10',
    docData: {
      id: 'doc-nda',
      name: 'Client_NDA_ArcCompany.pdf',
      type: 'pdf',
      size: '1.4 MB',
      project: 'Arc Company',
      author: 'Bessie A.',
      updatedAt: 'Yesterday',
      syncStatus: 'Encrypted',
      progress: 100,
      sha256: '2c88d1e4...a014f7c2',
      contentPreview:
        'Bilateral Mutual Non-Disclosure & Zero-Knowledge Data Processing Addendum between Taskflow AI Enterprise and Arc Company. Signed cleanly via Ed25519 hardware attestation.',
    },
  },
];

interface DocTableRow {
  doc: DocumentItem;
  codeTag: string;
  subtitle: string;
  icon: string;
  iconColor: string;
  ragLabel: string;
  ragTone: 'green' | 'mint' | 'neutral';
  avatar?: string;
  initials: string;
}

const STATIC_SPEC_ROWS: DocTableRow[] = [
  {
    doc: {
      id: 'spec-sync-engine',
      name: 'sync_engine.rs',
      type: 'rs',
      size: '32.4 KB',
      project: 'Primor Project',
      author: 'Masud A.',
      updatedAt: '14m ago',
      syncStatus: 'Vectorized',
      progress: 100,
      sha256: '8f4e...c391',
      contentPreview:
        'Rust engine handling SQLite Write-Ahead Logging, Merkle root attestation, & CRDT delta vector reconciliation across local enclave peers.',
    },
    codeTag: 'RUST',
    subtitle: 'Rust engine handling SQLite Write-Ahead Logging & CRDT',
    icon: 'code',
    iconColor: 'text-primary',
    ragLabel: 'Vectorized (512d)',
    ragTone: 'green',
    avatar: AVATARS.manavAlt,
    initials: 'MA',
  },
  {
    doc: {
      id: 'spec-tokens',
      name: 'Design_System_Tokens.json',
      type: 'json',
      size: '18.1 KB',
      project: 'Sullivan Mobile',
      author: 'Brandie C.',
      updatedAt: '1h ago',
      syncStatus: 'Synced local',
      progress: 100,
      sha256: '4a11ce09...7712b9a2',
      contentPreview:
        'Full typography, color scales, semantic tokens, frosted glass surface layers, and elevation levels for Taskflow AI v2.4.',
    },
    codeTag: 'JSON',
    subtitle: 'Full typography, color scales, semantic tokens, and elevation levels',
    icon: 'data_object',
    iconColor: 'text-secondary',
    ragLabel: 'Indexed',
    ragTone: 'mint',
    avatar: AVATARS.brandie,
    initials: 'BC',
  },
  {
    doc: {
      id: 'doc-2',
      name: 'Q2_Roadmap.pdf',
      type: 'pdf',
      size: '1.2 MB',
      project: 'Arc Company',
      author: 'Bessie A.',
      updatedAt: '3h ago',
      syncStatus: 'Synced local',
      progress: 100,
      sha256: '8f4e2a19...31dc77a2',
      contentPreview:
        'Stakeholder deliverable milestones, hiring projections, and SLA targets for Q2 sovereign edge deployment.',
    },
    codeTag: 'PDF',
    subtitle: 'Stakeholder deliverable milestones, hiring projections, and SLA targets',
    icon: 'picture_as_pdf',
    iconColor: 'text-primary',
    ragLabel: 'OCR Parsed',
    ragTone: 'neutral',
    avatar: AVATARS.bessie,
    initials: 'BA',
  },
  {
    doc: {
      id: 'spec-threat-model',
      name: 'Security_Threat_Model_v2.md',
      type: 'md',
      size: '95.2 KB',
      project: 'Trustworth Fin',
      author: 'Esther W.',
      updatedAt: 'Yesterday',
      syncStatus: 'Vectorized',
      progress: 100,
      sha256: '9b4410f8...002a71d1',
      contentPreview:
        'Zero-trust threat landscape, enclave boundaries, hardware key attestation, and local AES-256-GCM encryption keys.',
    },
    codeTag: 'MD',
    subtitle: 'Zero-trust threat landscape, enclave boundaries, and local encryption keys',
    icon: 'security',
    iconColor: 'text-secondary',
    ragLabel: 'Vectorized (512d)',
    ragTone: 'green',
    avatar: AVATARS.esther,
    initials: 'EW',
  },
  {
    doc: {
      id: 'spec-biometric-rfc',
      name: 'Biometric_Auth_RFC.md',
      type: 'md',
      size: '64.0 KB',
      project: 'Primor Project',
      author: 'Masud A.',
      updatedAt: 'Oct 22',
      syncStatus: 'RAG Staged',
      progress: 100,
      sha256: '5f0912c8...4e1099ac',
      contentPreview:
        'Hardware security module (HSM) Touch ID integration on Apple Silicon & YubiKey 5C NFC FIDO2 passkey validation.',
    },
    codeTag: 'RFC',
    subtitle: 'Hardware security module (HSM) Touch ID integration on Apple Silicon',
    icon: 'fingerprint',
    iconColor: 'text-primary',
    ragLabel: 'Indexed',
    ragTone: 'mint',
    avatar: AVATARS.alex,
    initials: 'MA',
  },
];

export const DocumentsPage: React.FC = () => {
  const { documents, addDocument, setPreviewDoc, notify } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'graph'>('grid');
  const [tagFilter, setTagFilter] = useState<'All' | 'Architecture' | 'Roadmaps' | 'Security'>('All');
  const [workspaceFilter, setWorkspaceFilter] = useState<string>('All');
  const [sortAsc, setSortAsc] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const combinedRows = useMemo<DocTableRow[]>(() => {
    const staticNames = new Set(STATIC_SPEC_ROWS.map((r) => r.doc.name));
    const userAdded: DocTableRow[] = documents
      .filter((d) => !staticNames.has(d.name))
      .map((d) => ({
        doc: d,
        codeTag: d.type.toUpperCase(),
        subtitle: d.contentPreview,
        icon:
          d.type === 'pdf'
            ? 'picture_as_pdf'
            : d.type === 'json'
              ? 'data_object'
              : d.type === 'zip'
                ? 'folder_zip'
                : 'article',
        iconColor: 'text-primary',
        ragLabel: d.syncStatus,
        ragTone: d.syncStatus === 'Vectorized' || d.syncStatus === 'RAG Staged' ? 'green' : 'mint',
        avatar: AVATARS.manav,
        initials: d.author
          .split(' ')
          .map((p) => p[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
      }));

    let rows = [...STATIC_SPEC_ROWS, ...userAdded];
    if (workspaceFilter !== 'All') {
      rows = rows.filter((r) => r.doc.project === workspaceFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.doc.name.toLowerCase().includes(q) ||
          r.doc.project.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q) ||
          r.doc.author.toLowerCase().includes(q),
      );
    }
    if (sortAsc) {
      rows = [...rows].reverse();
    }
    return rows;
  }, [documents, workspaceFilter, searchQuery, sortAsc]);

  const filteredPinned = useMemo(() => {
    return PINNED_SPECS.filter((p) => {
      if (tagFilter !== 'All' && p.tag !== tagFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          (p.badgeChip ?? []).some((c) => c.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [tagFilter, searchQuery]);

  const workspaces = ['All', 'Primor Project', 'Sullivan Mobile', 'Arc Company', 'Trustworth Fin', 'Local Vault'];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase();
    const mappedType: DocumentItem['type'] =
      ext === 'pdf' || ext === 'md' || ext === 'txt' || ext === 'json' || ext === 'zip' || ext === 'rs'
        ? ext
        : 'txt';
    addDocument({
      name: file.name,
      type: mappedType,
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      project: 'Local Vault',
      author: 'Manav A.',
      updatedAt: 'Just now',
      syncStatus: 'Vectorized',
      progress: 100,
      sha256: `${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`,
      contentPreview: `Encrypted local document "${file.name}" ingested into Taskflow AI SQLite RAG store.`,
    });
    e.target.value = '';
  };

  return (
    <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-6">
      <input ref={fileInputRef} type="file" className="hidden" onChange={handleUpload} />

      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-xl shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              Knowledge Base &amp; Local Vault
            </span>
            <span className="text-outline text-xs">•</span>
            <span className="font-code-inline text-code-inline text-on-surface-variant">
              SQLite 3.42 + Git LFS Synced
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
              Documents &amp; Specs
            </h1>
            <span className="font-label-md text-label-md bg-secondary-container/50 text-on-secondary-container px-2.5 py-0.5 rounded-full font-semibold">
              {120 + documents.length} Local Files
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 font-label-sm text-label-sm bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px] text-primary">verified_user</span>
              Zero-Cloud Leak
            </span>
          </div>
        </div>

        {/* Action buttons & Search */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex items-center bg-surface-container-low px-3 py-1.5 rounded-lg w-64 text-on-surface focus-within:bg-surface-container-lowest focus-within:shadow-sm transition-all">
            <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
            <input
              className="bg-transparent border-none outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline w-full"
              placeholder="Filter specs, notes, code..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <kbd className="font-mono text-[10px] bg-surface-container text-on-surface-variant px-1.5 py-0.5 rounded shadow-sm select-none">
              ⌘F
            </kbd>
          </div>

          {/* View Switcher */}
          <div className="flex items-center bg-surface-container-low p-1 rounded-lg">
            {(
              [
                { id: 'grid', label: 'Grid', icon: 'grid_view' },
                { id: 'list', label: 'List', icon: 'view_list' },
                { id: 'graph', label: 'Graph', icon: 'hub' },
              ] as const
            ).map((v) => {
              const active = viewMode === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setViewMode(v.id)}
                  className={`px-2.5 py-1 rounded font-label-sm text-label-sm flex items-center gap-1 transition-colors ${
                    active
                      ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${active ? 'text-primary' : ''}`}
                  >
                    {v.icon}
                  </span>
                  <span className="hidden xl:inline">{v.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-primary hover:bg-secondary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md font-semibold shadow-md hover:shadow-lg transition-all group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:rotate-90 transition-transform">
              add
            </span>
            <span>New Document</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-md text-label-md font-medium">Total Staged Docs</span>
            <span className="material-symbols-outlined text-[20px] text-primary">description</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-data-metric text-data-metric text-on-surface font-bold">
              {120 + documents.length}
            </span>
            <span className="font-label-sm text-label-sm text-primary font-medium bg-primary-container/20 px-2 py-0.5 rounded-full">
              8 Pinned
            </span>
          </div>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-3 overflow-hidden flex">
            <div className="bg-primary h-full rounded-full" style={{ width: '78%' }} />
            <div className="bg-secondary-fixed h-full rounded-full" style={{ width: '22%' }} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-md text-label-md font-medium">Local Flash Storage</span>
            <span className="material-symbols-outlined text-[20px] text-secondary">database</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-data-metric text-data-metric text-on-surface font-bold">24.19</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">MB</span>
            </div>
            <span className="font-code-inline text-code-inline text-on-secondary-container bg-secondary-container/40 px-2 py-0.5 rounded font-medium">
              100% Synced
            </span>
          </div>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary-container h-full rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-md text-label-md font-medium">Manav.AI Vectors (RAG)</span>
            <span className="material-symbols-outlined text-[20px] text-primary">psychology</span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-data-metric text-data-metric text-on-surface font-bold">14,200</span>
            <span className="font-label-sm text-label-sm text-primary flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping" />
              Staged
            </span>
          </div>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '92%' }} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-md text-label-md font-medium">SHA-256 Signatures</span>
            <span className="material-symbols-outlined text-[20px] text-on-secondary-container">
              verified
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-data-metric text-data-metric text-on-surface font-bold">
              {120 + documents.length} / {120 + documents.length}
            </span>
            <span className="font-code-inline text-code-inline text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
              Intact
            </span>
          </div>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-secondary h-full rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
      </div>

      {/* Graph Visualizer Mode */}
      {viewMode === 'graph' && (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">hub</span>
                Local Vector Graph Visualizer (512d GTE Embeddings)
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Click any semantic cluster node to launch the encrypted Document Inspector.
              </p>
            </div>
            <span className="font-code-inline text-code-inline px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-semibold">
              14,200 Chunks • 0 External Calls
            </span>
          </div>
          <div className="relative rounded-2xl bg-inverse-surface p-6 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {PINNED_SPECS.slice(0, 3).map((spec) => (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => setPreviewDoc(spec.docData)}
                  className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-primary-container/30 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-code-inline text-[11px] text-primary-container font-bold">
                      {spec.tag}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
                  </div>
                  <p className="font-headline-sm text-headline-sm font-bold text-white truncate">
                    {spec.name}
                  </p>
                  <p className="font-label-sm text-label-sm text-white/70 line-clamp-2">{spec.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pinned Documents Section */}
      {viewMode !== 'list' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">push_pin</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Pinned &amp; Active Specs
              </h2>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full">
                Fast Access
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-on-surface-variant">
              <span className="font-label-sm text-label-sm">Tags:</span>
              {(['All', 'Architecture', 'Roadmaps', 'Security'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTagFilter(t)}
                  className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm transition-colors ${
                    tagFilter === t
                      ? 'bg-surface-container-high text-on-surface font-semibold'
                      : 'bg-surface-container-lowest hover:bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPinned.map((card) => (
              <div
                key={card.id}
                onClick={() => setPreviewDoc(card.docData)}
                className="bg-surface-container-lowest p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer relative overflow-hidden"
              >
                <div
                  className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${card.cornerGradient} to-transparent pointer-events-none rounded-bl-full`}
                />
                <div>
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[22px]">{card.icon}</span>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[18px] hover:text-on-surface">
                      more_horiz
                    </span>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
                      {card.name}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 bg-surface-container-low/40 -mx-4 -mb-4 px-4 py-3 space-y-2">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                    <span className="flex items-center gap-1 font-code-inline text-code-inline">
                      {card.id === 'pin-1' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                      )}
                      {card.metaLeft}
                    </span>
                    <span
                      className={
                        card.metaRightPrimary
                          ? 'text-primary font-medium flex items-center gap-0.5'
                          : ''
                      }
                    >
                      {card.metaRightIcon && (
                        <span className="material-symbols-outlined text-[14px]">
                          {card.metaRightIcon}
                        </span>
                      )}
                      {card.metaRight}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    {card.author ? (
                      <div className="flex items-center gap-1.5">
                        <Avatar
                          src={card.avatar}
                          alt={card.author}
                          initials={card.author.slice(0, 2)}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-label-sm text-label-sm text-on-surface truncate max-w-[90px]">
                          {card.author}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        {(card.badgeChip ?? []).map((chip) => (
                          <span
                            key={chip}
                            className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded text-on-surface-variant"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}

                    {card.statusBadge === 'Verified' ? (
                      <span className="material-symbols-outlined text-[16px] text-primary" title="Verified SHA-256">
                        verified
                      </span>
                    ) : (
                      <span
                        className={`font-label-sm text-label-sm px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5 ${
                          card.statusTone === 'success'
                            ? 'bg-secondary-container/40 text-on-secondary-container'
                            : 'bg-surface-container-highest text-on-surface'
                        }`}
                      >
                        {card.statusBadge === 'Signed' && (
                          <span className="material-symbols-outlined text-[12px]">done_all</span>
                        )}
                        {card.statusBadge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Granular File & Spec Table Container */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              All Documents &amp; Code Specs
            </h2>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full">
              Encrypted Volume /docs
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Filter Workspace"
              value={workspaceFilter}
              onChange={(e) => setWorkspaceFilter(e.target.value)}
              className="bg-surface-container-low hover:bg-surface-container px-3 py-1.5 rounded-lg font-label-sm text-label-sm text-on-surface outline-none cursor-pointer transition-colors"
            >
              {workspaces.map((ws) => (
                <option key={ws} value={ws}>
                  {ws === 'All' ? 'Filter Workspace: All' : ws}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setSortAsc((s) => !s)}
              className="bg-surface-container-low hover:bg-surface-container px-3 py-1.5 rounded-lg font-label-sm text-label-sm text-on-surface flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-outline">sort</span>
              <span>Date Modified {sortAsc ? '↑' : '↓'}</span>
            </button>
          </div>
        </div>

        {/* File Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/70 text-on-surface-variant font-label-md text-label-md">
                <th className="py-3 px-4 rounded-l-lg font-semibold">Document Name</th>
                <th className="py-3 px-4 font-semibold">Associated Workspace</th>
                <th className="py-3 px-4 font-semibold">AI Index &amp; RAG</th>
                <th className="py-3 px-4 font-semibold">Size</th>
                <th className="py-3 px-4 font-semibold">Last Modified</th>
                <th className="py-3 px-4 font-semibold">Owner</th>
                <th className="py-3 px-4 rounded-r-lg font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface">
              {combinedRows.map((row) => (
                <tr
                  key={row.doc.id + row.doc.name}
                  onClick={() => setPreviewDoc(row.doc)}
                  className="hover:bg-surface-container-low/40 transition-colors group cursor-pointer"
                >
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <span className={`material-symbols-outlined ${row.iconColor} text-[20px]`}>
                      {row.icon}
                    </span>
                    <div>
                      <div className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                        <span>{row.doc.name}</span>
                        <span className="font-code-inline text-[10px] bg-surface-container px-1.5 py-0.5 rounded text-on-surface-variant">
                          {row.codeTag}
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-outline truncate block max-w-xs">
                        {row.subtitle}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-label-md text-label-md bg-surface-container px-2.5 py-1 rounded text-on-surface font-medium whitespace-nowrap">
                      {row.doc.project}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold whitespace-nowrap ${
                        row.ragTone === 'green'
                          ? 'bg-primary-container/20 text-on-secondary-container'
                          : row.ragTone === 'mint'
                            ? 'bg-secondary-container/30 text-on-secondary-container'
                            : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          row.ragTone === 'green'
                            ? 'bg-primary'
                            : row.ragTone === 'mint'
                              ? 'bg-secondary'
                              : 'bg-outline'
                        }`}
                      />
                      {row.ragLabel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-code-inline text-code-inline text-on-surface-variant whitespace-nowrap">
                    {row.doc.size}
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant font-label-sm text-label-sm whitespace-nowrap">
                    {row.doc.updatedAt}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={row.avatar}
                        alt={row.doc.author}
                        initials={row.initials}
                        className="w-6 h-6 rounded-full object-cover shrink-0"
                      />
                      <span className="font-label-md text-label-md font-medium text-on-surface whitespace-nowrap">
                        {row.doc.author}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewDoc(row.doc);
                      }}
                      className="p-1 rounded hover:bg-surface-container text-outline hover:text-on-surface transition-colors"
                      title="Inspect Document"
                    >
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Status & Quick Export Footer */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-on-surface-variant font-label-sm text-label-sm">
          <div className="flex flex-wrap items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-primary-container" />
            <span>
              Local Vault Root:{' '}
              <span className="font-code-inline text-code-inline text-on-surface">
                /var/vault/taskflow-core/specs
              </span>
            </span>
            <span className="text-outline">•</span>
            <span className="text-primary font-medium">Master Key Valid</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => notify('Exported SQLite 3.42 encrypted WAL bundle (24.19 MB).')}
              className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">download</span>
              <span>Export SQLite Bundle</span>
            </button>
            <button
              type="button"
              onClick={() => notify('Synced 128 LFS pointers across local mesh peers.')}
              className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">terminal</span>
              <span>Git LFS Push</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
