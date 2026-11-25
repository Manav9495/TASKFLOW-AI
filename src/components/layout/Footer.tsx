import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const Footer: React.FC = () => {
  const { setPrivacyModalOpen, navigate, notify } = useWorkspace();

  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] py-5 mt-8">
      <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-on-surface-variant font-label-sm text-label-sm">
        <span>© 2025 Taskflow AI. Local-first encrypted workspace.</span>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setPrivacyModalOpen(true)}
            className="hover:text-on-surface transition-colors"
          >
            Security &amp; Privacy
          </button>
          <button
            type="button"
            onClick={() => navigate('documents')}
            className="hover:text-on-surface transition-colors"
          >
            Documentation
          </button>
          <button
            type="button"
            onClick={() =>
              notify('All local enclave services healthy • 0 bytes outbound • CRDT 14ms.')
            }
            className="hover:text-on-surface transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
            <span>Status</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
