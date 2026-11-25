import React, { useMemo, useRef, useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';

export const DocumentsPage: React.FC = () => {
  const { documents, addDocument, setPreviewDoc, navigate } = useWorkspace();
  const [filterType, setFilterType] = useState<'all' | 'pdf' | 'md' | 'txt' | 'json' | 'zip'>('all');
  const [query, setQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    return documents.filter((d) => {
      if (filterType !== 'all' && d.type !== filterType) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.project.toLowerCase().includes(q) ||
          d.author.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [documents, filterType, query]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase();
    const mappedType =
      ext === 'pdf' || ext === 'md' || ext === 'txt' || ext === 'json' || ext === 'zip'
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
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-code-inline text-code-inline uppercase tracking-wider text-primary font-semibold">
              ENCRYPTED DOCUMENT VAULT &amp; RAG INDEX
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Local Documents &amp; Knowledge Base
            </h1>
            <span className="px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">
              {documents.length} AES-256 Artifacts
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-surface-container-lowest px-3.5 py-2 rounded-xl shadow-sm gap-2">
            <span className="material-symbols-outlined text-[18px] text-outline">search</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search encrypted docs..."
              className="bg-transparent outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline w-48"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-secondary text-on-primary font-label-md text-label-md font-semibold shadow-md transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            <span>Encrypt &amp; Add File</span>
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 bg-surface-container-lowest p-1 rounded-full shadow-sm">
          {(['all', 'pdf', 'md', 'txt', 'json', 'zip'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilterType(t)}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md uppercase transition-all ${
                filterType === t
                  ? 'bg-primary-container text-on-primary-container font-bold glow-emerald'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              {t === 'all' ? 'All Files' : `.${t}`}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate('ai-assistant')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low text-primary font-label-md text-label-md font-semibold shadow-sm"
        >
          <span className="material-symbols-outlined text-[17px]">auto_awesome</span>
          <span>Query Docs with Manav.AI →</span>
        </button>
      </div>

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            onClick={() => setPreviewDoc(doc)}
            className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">
                    {doc.type === 'pdf'
                      ? 'picture_as_pdf'
                      : doc.type === 'zip'
                        ? 'folder_zip'
                        : doc.type === 'json'
                          ? 'data_object'
                          : 'description'}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">
                  {doc.syncStatus}
                </span>
              </div>

              <div>
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                  {doc.name}
                </h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  {doc.project} • {doc.author}
                </p>
              </div>

              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                {doc.contentPreview}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-surface-container-low space-y-2">
              <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${doc.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between font-code-inline text-[11px] text-outline">
                <span>{doc.size}</span>
                <span>{doc.updatedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
