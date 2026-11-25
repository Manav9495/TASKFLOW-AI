import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { ModalDialog } from '../common/ModalDialog';

export const DocPreviewModal: React.FC = () => {
  const { previewDoc, setPreviewDoc, notify } = useWorkspace();

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

  return (
    <ModalDialog
      open={Boolean(previewDoc)}
      onClose={() => setPreviewDoc(null)}
      titleId="doc-preview-title"
      maxWidthClass="max-w-xl"
    >
      {previewDoc && (
        <div className="bg-surface-container-lowest w-full rounded-2xl shadow-2xl p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">description</span>
              </div>
              <div className="min-w-0">
                <h1 id="doc-preview-title" className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
                  {previewDoc.name}
                </h1>
                <p className="font-code-inline text-[11px] text-on-surface-variant">
                  {previewDoc.size} • {previewDoc.project} • SHA-256: {previewDoc.sha256}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPreviewDoc(null)}
              aria-label="Close document preview"
              className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="bg-surface-container-low rounded-xl p-4 font-code-inline text-code-inline text-on-surface whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto custom-scrollbar">
            {previewDoc.contentPreview}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-primary font-semibold">
              <span className="material-symbols-outlined text-[15px]">verified_user</span>
              <span>AES-256 Verified • {previewDoc.syncStatus}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-secondary text-on-primary font-label-md text-label-md font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download Local Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalDialog>
  );
};
