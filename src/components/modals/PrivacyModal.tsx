import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { ModalDialog } from '../common/ModalDialog';

export const PrivacyModal: React.FC = () => {
  const { privacyModalOpen, setPrivacyModalOpen } = useWorkspace();

  return (
    <ModalDialog
      open={privacyModalOpen}
      onClose={() => setPrivacyModalOpen(false)}
      titleId="privacy-modal-title"
      maxWidthClass="max-w-md"
    >
      <div className="bg-surface-container-lowest w-full rounded-2xl shadow-xl p-6 relative">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">shield</span>
            <h1 id="privacy-modal-title" className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Local Encryption Core
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setPrivacyModalOpen(false)}
            aria-label="Close local encryption details"
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
          Taskflow AI uses local SQLite and WebAssembly inference for Manav.AI assistant routines.
          No project summaries or proprietary notes are transmitted to external servers.
        </p>

        <div className="bg-surface-container-low p-3.5 rounded-xl mt-4 space-y-2.5">
          <div className="flex items-center justify-between font-label-sm text-label-sm">
            <span className="text-on-surface-variant">IndexedDB Cache:</span>
            <span className="font-mono text-on-surface font-semibold">14.8 MB (AES-256)</span>
          </div>
          <div className="flex items-center justify-between font-label-sm text-label-sm">
            <span className="text-on-surface-variant">Local LLM Weights:</span>
            <span className="font-mono text-on-surface font-semibold">Q4_K_M (Local WASM)</span>
          </div>
          <div className="flex items-center justify-between font-label-sm text-label-sm">
            <span className="text-on-surface-variant">Network Outbound:</span>
            <span className="font-mono text-primary font-semibold">0 bytes (Isolated)</span>
          </div>
        </div>

        <button
          type="button"
          autoFocus
          onClick={() => setPrivacyModalOpen(false)}
          className="w-full mt-5 bg-primary text-on-primary font-label-md text-label-md py-2.5 rounded-xl font-bold hover:bg-secondary transition-colors"
        >
          Understood &amp; Return to Workspace
        </button>
      </div>
    </ModalDialog>
  );
};
