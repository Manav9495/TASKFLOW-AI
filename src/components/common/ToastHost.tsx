import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const ToastHost: React.FC = () => {
  const { toasts, dismissToast } = useWorkspace();
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[60] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-inverse-surface text-inverse-on-surface shadow-xl border border-white/10"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                t.tone === 'warning'
                  ? 'bg-error-container'
                  : t.tone === 'info'
                    ? 'bg-secondary-fixed'
                    : 'bg-primary-container'
              }`}
            />
            <span className="font-label-md text-label-md text-inverse-on-surface truncate">
              {t.message}
            </span>
          </div>
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss notification"
            className="text-inverse-on-surface/70 hover:text-inverse-on-surface p-0.5 rounded"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
