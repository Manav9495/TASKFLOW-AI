import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { ModalDialog } from '../common/ModalDialog';

export const ScreenShareModal: React.FC = () => {
  const {
    screenShareOpen,
    setScreenShareOpen,
    activeScreenName,
    setActiveScreenName,
    notify,
  } = useWorkspace();

  const [sourceTab, setSourceTab] = useState<'screens' | 'windows' | 'tabs'>('screens');
  const [selectedSource, setSelectedSource] = useState(activeScreenName);
  const [shareAudio, setShareAudio] = useState(true);
  const [optimizeMotion, setOptimizeMotion] = useState(true);
  const [preset, setPreset] = useState('4K (2160p) • 60 FPS HDR');

  const screens = [
    {
      id: 'Entire Screen 1 — Studio Display',
      res: '5120 × 2880',
      sub: 'DisplayPort • 27-inch 5K Retina',
      badge: 'Primary • 60 FPS HDR',
      overlay: 'Taskflow AI Desktop & VS Code Workspace',
      primary: true,
    },
    {
      id: 'Entire Screen 2 — Built-in Retina',
      res: '3456 × 2234',
      sub: 'Internal • 16-inch Liquid Retina XDR',
      badge: 'Secondary • 60 FPS',
      overlay: 'Terminal & Diagnostics Stage',
      primary: false,
    },
  ];

  const windows = [
    {
      id: 'VS Code — taskflow-sync-engine',
      res: '2560 × 1440',
      sub: 'Editor Window • Rust & TypeScript',
      badge: '60 FPS',
      overlay: 'enclave_attestation.rs',
      primary: true,
    },
    {
      id: 'Terminal — Local Mesh Diagnostics',
      res: '1440 × 900',
      sub: 'zsh • WebRTC Peer Monitor',
      badge: '60 FPS',
      overlay: 'node://arc-perr-01',
      primary: false,
    },
  ];

  const browserTabs = [
    {
      id: 'Taskflow AI — Active Chamber Docs',
      res: '1280 × 800',
      sub: 'Arc Browser Tab',
      badge: 'Audio Enabled',
      overlay: 'CRDT Protocol Spec',
      primary: true,
    },
    {
      id: 'Figma — Design System v2.4',
      res: '1280 × 800',
      sub: 'Arc Browser Tab',
      badge: '60 FPS',
      overlay: 'Pill UI Tokens',
      primary: false,
    },
  ];

  const activeItems =
    sourceTab === 'screens' ? screens : sourceTab === 'windows' ? windows : browserTabs;

  const handleConfirm = () => {
    setActiveScreenName(selectedSource);
    setScreenShareOpen(false);
    notify(`Streaming "${selectedSource}" at ${preset} over E2EE WebRTC mesh.`);
  };

  return (
    <ModalDialog
      open={screenShareOpen}
      onClose={() => setScreenShareOpen(false)}
      titleId="screen-share-title"
      maxWidthClass="max-w-3xl"
    >
      <div className="bg-surface-container-lowest w-full rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-6 pb-4 flex items-start justify-between gap-4 border-b border-surface-container-low">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">present_to_all</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 id="screen-share-title" className="font-headline-md text-headline-md font-bold text-on-surface">
                  Share Your Screen or Window
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-container/80 text-on-primary-container font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[13px]">lock</span>
                  E2EE Stream • Zero Retention
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Select an entire screen, application window, or browser tab to stream directly over
                the local WebRTC mesh.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setScreenShareOpen(false)}
            aria-label="Close screen share picker"
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Source Category Tabs */}
          <div role="tablist" aria-label="Share source types" className="flex flex-wrap items-center gap-2">
            {[
              { id: 'screens', label: 'Screens (2)', icon: 'desktop_windows' },
              { id: 'windows', label: 'Window (5)', icon: 'web_asset' },
              { id: 'tabs', label: 'Browser Tabs (8)', icon: 'tab' },
            ].map((t) => {
              const selected = sourceTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setSourceTab(t.id as 'screens' | 'windows' | 'tabs');
                    const first =
                      t.id === 'screens'
                        ? screens[0].id
                        : t.id === 'windows'
                          ? windows[0].id
                          : browserTabs[0].id;
                    setSelectedSource(first);
                  }}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                    selected
                      ? 'bg-primary-container text-on-primary-container font-semibold glow-emerald'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Source Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeItems.map((item) => {
              const isSelected = selectedSource === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedSource(item.id)}
                  className={`text-left rounded-2xl p-3 transition-all border-2 ${
                    isSelected
                      ? 'border-primary-container bg-primary-container/5 shadow-md'
                      : 'border-surface-container bg-surface-container-lowest hover:border-surface-container-highest'
                  }`}
                >
                  <div className="relative h-36 rounded-xl bg-inverse-surface overflow-hidden p-3 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] bg-black/40 text-inverse-on-surface px-2 py-0.5 rounded-md">
                        {item.res}
                      </span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isSelected
                            ? 'bg-primary-container text-on-primary-container'
                            : 'border border-white/40'
                        }`}
                      >
                        {isSelected && (
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        )}
                      </span>
                    </div>

                    {/* Visual miniature diagram preview */}
                    <div className="my-auto flex items-center justify-center opacity-80">
                      {item.primary ? (
                        <svg className="w-40 h-16 text-primary-container" viewBox="0 0 180 70" fill="none">
                          <rect x="6" y="10" width="42" height="24" rx="4" stroke="currentColor" strokeOpacity="0.6" />
                          <rect x="68" y="10" width="42" height="24" rx="4" stroke="currentColor" strokeOpacity="0.9" />
                          <rect x="130" y="10" width="42" height="24" rx="4" stroke="currentColor" strokeOpacity="0.6" />
                          <path d="M48 22H68M110 22H130M27 34V52H151V34" stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.5" />
                        </svg>
                      ) : (
                        <div className="border border-dashed border-white/25 rounded-lg px-4 py-2 text-center">
                          <span className="font-mono text-[11px] text-inverse-on-surface/70">
                            Secondary Display Active
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-inverse-on-surface font-medium truncate">
                      {item.primary && <span className="w-2 h-2 rounded-full bg-primary-container" />}
                      <span className="truncate">{item.overlay}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-label-md text-label-md font-bold text-on-surface truncate">
                        {item.id}
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                        {item.sub}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${
                        isSelected
                          ? 'bg-primary-container/80 text-on-primary-container'
                          : 'bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick launch apps strip */}
          <div className="px-4 py-2.5 rounded-xl bg-surface-container-low/70 flex flex-wrap items-center justify-between gap-2 text-label-sm font-label-sm">
            <div className="flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-primary">apps</span>
              <span className="text-on-surface-variant">Need specific apps instead?</span>
              <span className="font-semibold">
                Quick launch: VS Code, Terminal, Arc Browser, Figma
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSourceTab('windows')}
              className="text-primary font-semibold hover:underline"
            >
              Browse all apps →
            </button>
          </div>

          {/* Audio & AV1 Encode Box */}
          <div className="p-4 rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 cursor-pointer font-label-md text-label-md text-on-surface font-medium">
                <input
                  type="checkbox"
                  checked={shareAudio}
                  onChange={(e) => setShareAudio(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary"
                />
                <span>Share system audio</span>
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-code-inline text-[11px] text-on-surface-variant">
                  Loopback
                </span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer font-label-md text-label-md text-on-surface font-medium">
                <input
                  type="checkbox"
                  checked={optimizeMotion}
                  onChange={(e) => setOptimizeMotion(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary"
                />
                <span>Optimize for motion video (60 FPS smooth playback)</span>
              </label>
            </div>

            <div className="sm:border-l sm:border-surface-container-highest sm:pl-4 flex items-center gap-2 max-w-xs">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                verified_user
              </span>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Hardware AV1 encode with zero-knowledge stream slicing over mesh peers.
              </p>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Preset:</span>
              <select
                aria-label="Stream quality preset"
                value={preset}
                onChange={(e) => setPreset(e.target.value)}
                className="bg-surface-container-low px-3 py-1.5 rounded-full font-code-inline text-code-inline text-on-surface font-semibold outline-none cursor-pointer"
              >
                <option>4K (2160p) • 60 FPS HDR</option>
                <option>1440p • 60 FPS Low Latency</option>
                <option>1080p • Bandwidth Saver</option>
              </select>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setScreenShareOpen(false)}
                className="px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low font-label-md text-label-md font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-label-md text-label-md font-bold glow-emerald transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">present_to_all</span>
                <span>Share {selectedSource.split('—')[0].trim()}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalDialog>
  );
};
