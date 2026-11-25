import React, { useMemo, useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';

const DAYS: { day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'; num: number }[] = [
  { day: 'Mon', num: 21 },
  { day: 'Tue', num: 22 },
  { day: 'Wed', num: 23 },
  { day: 'Thu', num: 24 },
  { day: 'Fri', num: 25 },
];

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export const CalendarPage: React.FC = () => {
  const {
    calendarEvents,
    openQuickCreate,
    lockFocusWindows,
    focusWindowsLocked,
    openMeetingChamber,
    notify,
  } = useWorkspace();

  const [viewTab, setViewTab] = useState<'Day' | 'Week' | 'Month' | 'Sprint Timeline'>('Week');
  const [selectedMiniDay, setSelectedMiniDay] = useState(24);
  const [foldWeekend, setFoldWeekend] = useState(true);
  const [focusOnly, setFocusOnly] = useState(false);
  const [guardDismissed, setGuardDismissed] = useState(false);
  const [sources, setSources] = useState({
    sprints: true,
    focus: true,
    client: true,
    'ai-buffer': true,
  });

  const visibleEvents = useMemo(() => {
    return calendarEvents.filter((ev) => {
      if (!sources[ev.source]) return false;
      if (focusOnly && ev.variant !== 'focus') return false;
      return true;
    });
  }, [calendarEvents, sources, focusOnly]);

  const toggleSource = (key: keyof typeof sources) => {
    setSources((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const formatHour = (h: number) => {
    const suffix = h >= 12 ? 'PM' : 'AM';
    const h12 = h > 12 ? h - 12 : h;
    return `${String(h12).padStart(2, '0')}:00 ${suffix}`;
  };

  return (
    <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-5">
      {/* Top Header & View Controls */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
        <div>
          <span className="font-code-inline text-code-inline uppercase tracking-wider text-primary font-semibold">
            SCHEDULE &amp; FOCUS MANAGEMENT •
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-0.5">
            Workspace Calendar &amp; Focus Planner
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-surface-container-lowest p-1 rounded-full shadow-sm">
            {(['Day', 'Week', 'Month', 'Sprint Timeline'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setViewTab(t)}
                className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                  viewTab === t
                    ? 'bg-primary-container text-on-primary-container font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-sm font-label-md text-label-md font-semibold">
            <span className="material-symbols-outlined text-[16px] text-primary">chevron_left</span>
            <span>October 2024</span>
            <span className="material-symbols-outlined text-[16px] text-primary">chevron_right</span>
            <button
              type="button"
              onClick={() => setSelectedMiniDay(24)}
              className="ml-1 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[11px] font-bold"
            >
              Today
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-surface-container-lowest px-3 py-2 rounded-full shadow-sm font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[15px] text-outline">public</span>
            <span>UTC-4 (EDT)</span>
          </div>

          <button
            type="button"
            onClick={() => openQuickCreate('meeting')}
            className="px-4 py-2 rounded-full bg-primary hover:bg-secondary text-on-primary font-label-md text-label-md font-bold shadow-md"
          >
            + Schedule Event
          </button>
        </div>
      </div>

      {/* Bento Row: Focus Allocation + Manav.AI Schedule Guard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Focus Allocation Today
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-container/60 text-on-primary-container font-label-sm text-label-sm font-bold">
                8h Budget
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              Real-time Bandwidth
            </span>
          </div>

          <div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden flex gap-0.5">
            <div className="bg-primary h-full rounded-full w-[56%]" />
            <div className="bg-inverse-surface h-full rounded-full w-[28%]" />
            <div className="bg-primary-container h-full rounded-full w-[16%]" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-surface-container-low">
              <p className="font-label-sm text-label-sm text-primary font-semibold">• Deep Work</p>
              <p className="font-headline-md text-headline-md font-bold text-on-surface mt-1">
                4h 30m
              </p>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low">
              <p className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                • Meetings
              </p>
              <p className="font-headline-md text-headline-md font-bold text-on-surface mt-1">
                2h 15m
              </p>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low">
              <p className="font-label-sm text-label-sm text-primary font-semibold">• Open Buffer</p>
              <p className="font-headline-md text-headline-md font-bold text-on-surface mt-1">
                1h 15m
              </p>
            </div>
          </div>
        </div>

        {!guardDismissed && (
          <div className="lg:col-span-6 bg-surface-container-low/90 rounded-2xl p-5 shadow-sm border border-surface-container space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[19px]">
                  smart_toy
                </span>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Manav.AI Schedule Guard
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold">
                  Autonomous Optimizer
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-lowest font-code-inline text-[11px] text-primary font-semibold">
                100% On-Device
              </span>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface">
              Identified <span className="font-bold">2 optimal uninterrupted focus windows</span>{' '}
              today:{' '}
              <span className="text-primary font-semibold underline">10:00 AM – 12:00 PM</span> and{' '}
              <span className="text-primary font-semibold underline">03:00 PM – 05:00 PM</span>. No
              team collisions detected.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={lockFocusWindows}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-secondary text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span>{focusWindowsLocked ? 'Focus Windows Locked' : 'Lock Focus Windows'}</span>
              </button>
              <button
                type="button"
                onClick={() => setGuardDismissed(true)}
                className="px-4 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Calendar Split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Sidebar (3 cols) */}
        <div className="xl:col-span-3 space-y-5">
          {/* Mini Month Calendar */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  October 2024
                </span>
                <span className="px-1.5 py-0.5 rounded bg-secondary-container/60 text-on-secondary-container font-code-inline text-[10px] font-bold">
                  Mini
                </span>
              </div>
              <div className="flex items-center gap-1 text-outline">
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </div>
            </div>

            <div className="grid grid-cols-7 text-center text-[11px] font-label-sm text-outline">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <span key={`${d}-${i}`} className="py-1 font-semibold">
                  {d}
                </span>
              ))}
              {[
                30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
                23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3,
              ].map((num, idx) => {
                const muted = (idx === 0 && num === 30) || idx > 31;
                const active = !muted && num === selectedMiniDay;
                return (
                  <button
                    key={`${num}-${idx}`}
                    type="button"
                    onClick={() => !muted && setSelectedMiniDay(num)}
                    className={`py-1 rounded-lg font-code-inline text-[11px] transition-colors ${
                      active
                        ? 'bg-primary text-on-primary font-bold'
                        : muted
                          ? 'text-outline/40'
                          : 'text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vault Sources */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Vault Sources •
              </span>
              <button
                type="button"
                onClick={() => openQuickCreate('meeting')}
                className="font-label-sm text-label-sm text-primary font-semibold hover:underline"
              >
                + Add
              </button>
            </div>

            <div className="space-y-2">
              {[
                { key: 'sprints', label: 'Team Sprints (Arc Co)', dot: 'bg-primary' },
                { key: 'focus', label: 'Local Focus Blocks', dot: 'bg-primary' },
                { key: 'client', label: 'Client Calls & Reviews', dot: 'bg-inverse-surface' },
                { key: 'ai-buffer', label: 'AI Auto-Scheduled Buffer', dot: 'bg-primary-container' },
              ].map((src) => {
                const checked = sources[src.key as keyof typeof sources];
                return (
                  <label
                    key={src.key}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low/70 hover:bg-surface-container-low cursor-pointer"
                  >
                    <span className="flex items-center gap-2 font-label-md text-label-md text-on-surface font-medium">
                      <span className={`w-2.5 h-2.5 rounded-full ${src.dot}`} />
                      <span>{src.label}</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleSource(src.key as keyof typeof sources)}
                      className="w-4 h-4 accent-primary cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>

            <div className="pt-2 border-t border-surface-container-low flex items-center justify-between text-[11px]">
              <span className="text-outline">E2EE Vault Offline Cache: 1.4 MB</span>
              <button
                type="button"
                onClick={() => notify('Vault calendar cache synced (98% conflict-free).')}
                className="text-primary font-bold hover:underline"
              >
                Sync Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Timeline Grid (9 cols) */}
        <div className="xl:col-span-9 bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-4">
          {/* Grid Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">
                calendar_view_week
              </span>
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Interactive Timeline Grid
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">
                Dynamic Right-Fold Rails
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFoldWeekend((f) => !f)}
                className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-semibold transition-colors ${
                  foldWeekend
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-surface-container-low text-on-surface'
                }`}
              >
                Fold Inactive
              </button>
              <button
                type="button"
                onClick={() => setFocusOnly((f) => !f)}
                className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-semibold transition-colors ${
                  focusOnly
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low text-on-surface'
                }`}
              >
                Focus Mode
              </button>
              <button
                type="button"
                onClick={() => {
                  setFocusOnly(false);
                  setFoldWeekend(true);
                  setSources({ sprints: true, focus: true, client: true, 'ai-buffer': true });
                }}
                className="px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold"
              >
                Reset Columns
              </button>
            </div>
          </div>

          {/* Interactive Timeline Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[780px] flex gap-2">
              {/* Time Column + 5 Day Columns */}
              <div className="flex-1">
                {/* Day Header Row */}
                <div className="grid grid-cols-6 gap-2 pb-3 border-b border-surface-container-low">
                  <div className="text-[11px] font-code-inline text-outline pt-2">EDT</div>
                  {DAYS.map((d) => {
                    const isThu = d.num === selectedMiniDay;
                    return (
                      <div
                        key={d.day}
                        className={`p-2.5 rounded-xl flex items-center justify-between ${
                          isThu ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low/50'
                        }`}
                      >
                        <div>
                          <p
                            className={`text-[10px] font-bold uppercase ${
                              isThu ? 'text-primary-fixed' : 'text-outline'
                            }`}
                          >
                            {isThu ? `${d.day} • ACTIVE FOCUS` : d.day}
                          </p>
                          <p className="font-headline-md text-headline-md font-bold">{d.num}</p>
                        </div>
                        {isThu && (
                          <span className="px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-semibold">
                            5 Events
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Hour Rows + Positioned Cards */}
                <div className="grid grid-cols-6 gap-2 pt-3 relative">
                  {/* Hour Labels */}
                  <div className="space-y-10">
                    {HOURS.map((h) => (
                      <div key={h} className="h-8 font-code-inline text-[11px] text-outline">
                        {formatHour(h)}
                      </div>
                    ))}
                  </div>

                  {/* 5 Day Columns */}
                  {DAYS.map((d) => {
                    const dayEvents = visibleEvents.filter((e) => e.day === d.day);
                    const isActiveDay = d.num === selectedMiniDay;
                    return (
                      <div
                        key={d.day}
                        className={`relative min-h-[780px] rounded-xl p-1.5 ${
                          isActiveDay
                            ? 'bg-secondary-container/15 ring-1 ring-primary-container/50'
                            : 'bg-surface-container-low/30'
                        }`}
                      >
                        {dayEvents.map((ev) => {
                          const topPx = (ev.startHour - 8) * 72;
                          const heightPx = Math.max(ev.durationHours * 66, 60);
                          return (
                            <div
                              key={ev.id}
                              style={{ top: `${topPx}px`, minHeight: `${heightPx}px` }}
                              className={`absolute left-1.5 right-1.5 rounded-xl p-2.5 shadow-sm flex flex-col justify-between transition-all ${
                                ev.variant === 'dark-meeting'
                                  ? 'bg-inverse-surface text-inverse-on-surface shadow-md'
                                  : ev.variant === 'focus'
                                    ? 'bg-secondary-container/45 text-on-surface border border-primary-container'
                                    : ev.variant === 'design'
                                      ? 'bg-surface-container text-on-surface'
                                      : 'bg-surface-container-lowest text-on-surface border border-surface-container'
                              }`}
                            >
                              <div className="space-y-0.5">
                                <div className="flex items-center justify-between gap-1 text-[10px] font-code-inline">
                                  <span>{formatHour(Math.floor(ev.startHour))}</span>
                                  {ev.done && (
                                    <span className="px-1.5 py-0.5 rounded bg-primary text-white font-bold">
                                      ✓ Done
                                    </span>
                                  )}
                                  {ev.badge && (
                                    <span className="px-1.5 py-0.5 rounded bg-primary-container/30 text-primary font-bold">
                                      {ev.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="font-label-md text-label-md font-bold leading-tight">
                                  {ev.title}
                                </p>
                                <p
                                  className={`font-label-sm text-[11px] truncate ${
                                    ev.variant === 'dark-meeting'
                                      ? 'text-inverse-on-surface/75'
                                      : 'text-on-surface-variant'
                                  }`}
                                >
                                  {ev.subtitle}
                                </p>
                              </div>

                              {ev.variant === 'dark-meeting' && (
                                <div className="flex items-center justify-between pt-2">
                                  <span className="font-code-inline text-[10px] text-primary-fixed">
                                    E2EE Active
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => openMeetingChamber(ev.title)}
                                    className="px-2.5 py-1 rounded-lg bg-primary-container text-on-primary-container text-[11px] font-bold"
                                  >
                                    Start
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right-Fold Rail for Sat/Sun */}
              {foldWeekend && (
                <button
                  type="button"
                  onClick={() => setFoldWeekend(false)}
                  title="Expand Sat / Sun"
                  className="w-10 rounded-xl bg-surface-container-low hover:bg-surface-container flex flex-col items-center justify-between py-4 text-outline shrink-0 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    keyboard_double_arrow_left
                  </span>
                  <span
                    className="font-code-inline text-[10px] tracking-widest uppercase font-semibold"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    SAT 26 • SUN 27 • FOLDED
                  </span>
                  <span className="font-code-inline text-[10px]">RAIL</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Strip */}
      <div className="bg-surface-container-lowest rounded-2xl px-5 py-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <p className="font-label-sm text-label-sm text-on-surface-variant flex flex-wrap items-center gap-2">
          <span className="font-semibold text-on-surface">WebRTC P2P Bridge: Ready</span>
          <span>•</span>
          <span className="text-primary font-semibold">Calendar Health: 98% conflict-free</span>
          <span>•</span>
          <span>Next sync in 6m (Local Daemon active)</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFocusOnly((f) => !f)}
            className="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container font-label-sm text-label-sm font-semibold text-on-surface"
          >
            Filter Tags
          </button>
          <button
            type="button"
            onClick={() => notify('Exported October 2024 schedule as encrypted .ics bundle.')}
            className="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container font-label-sm text-label-sm font-semibold text-on-surface"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};
