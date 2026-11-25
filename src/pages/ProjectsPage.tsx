import React, { useMemo, useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Avatar } from '../components/common/Avatar';

export const ProjectsPage: React.FC = () => {
  const { projects, openQuickCreate, navigate, notify } = useWorkspace();

  const [viewMode, setViewMode] = useState<'cards' | 'list' | 'gantt'>('cards');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [syncingGit, setSyncingGit] = useState(false);

  const visibleProjects = useMemo(() => {
    const filtered =
      statusFilter === 'All'
        ? projects
        : projects.filter((p) => p.status === statusFilter || p.priority === statusFilter);
    return sortAsc ? filtered : [...filtered].reverse();
  }, [projects, statusFilter, sortAsc]);

  const handleGitSync = () => {
    setSyncingGit(true);
    window.setTimeout(() => {
      setSyncingGit(false);
      notify('Synced local repository with remote mirror (0 conflicts).');
    }, 600);
  };

  return (
    <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {/* Top Command & Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-code-inline text-code-inline uppercase tracking-wider text-outline font-semibold">
              PROJECT MANAGEMENT &amp; TIMELINES
            </span>
            <span className="w-1 h-1 rounded-full bg-outline" />
            <span className="font-code-inline text-code-inline text-primary flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
              VAULT: SECURE
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Active Projects &amp; Workspaces
            </h1>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm bg-surface-container text-on-surface px-2.5 py-1 rounded-full font-medium">
                {projects.length + 2} Active Workspaces
              </span>
              <span className="font-label-sm text-label-sm bg-secondary-container/40 text-on-secondary-container px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-primary material-symbols-filled">
                  verified_user
                </span>
                Local Vault Synced
              </span>
            </div>
          </div>
        </div>

        {/* Controls & CTA */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div
            role="tablist"
            aria-label="Project layout views"
            className="flex items-center bg-surface-container-low p-1 rounded-full shadow-sm"
          >
            {(
              [
                { id: 'cards', label: 'Cards', icon: 'grid_view' },
                { id: 'list', label: 'List', icon: 'view_list' },
                { id: 'gantt', label: 'Gantt', icon: 'timeline' },
              ] as const
            ).map((btn) => {
              const selected = viewMode === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setViewMode(btn.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                    selected
                      ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      selected ? 'text-primary' : ''
                    }`}
                  >
                    {btn.icon}
                  </span>
                  <span>{btn.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setFilterOpen((p) => !p)}
              className="flex items-center gap-1.5 bg-surface-container-lowest hover:bg-surface-container-low px-3 py-2 rounded-full font-label-md text-label-md text-on-surface transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px] text-outline">tune</span>
              <span>{statusFilter === 'All' ? 'Filter' : statusFilter}</span>
              <span className="material-symbols-outlined text-[14px] text-outline">expand_more</span>
            </button>

            {filterOpen && (
              <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-surface-container-lowest shadow-lg border border-surface-container p-1.5 z-20 space-y-0.5">
                {['All', 'In Progress', 'Active Sprint', 'Review Pending', 'Planning', 'Backlog', 'High Priority'].map(
                  (f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => {
                        setStatusFilter(f);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg font-label-sm text-label-sm ${
                        statusFilter === f
                          ? 'bg-primary-container/30 text-primary font-semibold'
                          : 'hover:bg-surface-container-low text-on-surface'
                      }`}
                    >
                      {f}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => openQuickCreate('project')}
            className="relative group flex items-center gap-2 bg-primary hover:bg-secondary text-on-primary px-4 py-2 rounded-full font-label-md text-label-md font-semibold transition-all shadow-[0_4px_16px_rgba(53,232,121,0.35)] hover:shadow-[0_6px_22px_rgba(53,232,121,0.5)]"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Telemetry & Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">
              Total Projects
            </span>
            <span className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[16px]">folder_copy</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-data-metric text-data-metric text-on-surface">
              {projects.length + 8}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">tracked</span>
          </div>
          <div className="mt-3">
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden flex">
              <div className="bg-primary h-full rounded-full" style={{ width: '57%' }} />
              <div className="bg-secondary-fixed-dim h-full" style={{ width: '28%' }} />
              <div className="bg-surface-container-highest h-full" style={{ width: '15%' }} />
            </div>
            <div className="flex justify-between items-center mt-2 font-label-sm text-label-sm text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />8 in flight
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim" />4 closed
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-outline" />2 review
              </span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">
              Sprint Velocity
            </span>
            <span className="font-label-sm text-label-sm bg-secondary-container/40 text-on-secondary-container px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[13px]">trending_up</span>+12%
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-data-metric text-data-metric text-on-surface">88.4%</span>
            <span className="font-label-sm text-label-sm text-outline">pts / cycle</span>
          </div>
          <div className="mt-3 flex items-end justify-between gap-1.5 h-7">
            <div className="w-full bg-surface-container-low rounded-t-sm h-[40%]" />
            <div className="w-full bg-surface-container-low rounded-t-sm h-[55%]" />
            <div className="w-full bg-surface-container-low rounded-t-sm h-[48%]" />
            <div className="w-full bg-surface-container-low rounded-t-sm h-[68%]" />
            <div className="w-full bg-secondary-fixed-dim rounded-t-sm h-[75%]" />
            <div className="w-full bg-primary rounded-t-sm h-[88%] shadow-[0_0_8px_rgba(53,232,121,0.6)]" />
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">
              Encrypted Storage
            </span>
            <span className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[16px] material-symbols-filled">
                security
              </span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-data-metric text-data-metric text-on-surface">
              14.2{' '}
              <span className="font-body-md text-body-md text-on-surface-variant font-normal">
                / 50 GB
              </span>
            </span>
            <span className="font-label-sm text-label-sm text-primary font-medium">28.4%</span>
          </div>
          <div className="mt-3">
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '28.4%' }} />
            </div>
            <div className="flex justify-between items-center mt-2 font-label-sm text-label-sm text-on-surface-variant">
              <span>AES-256 Partition</span>
              <span className="font-code-inline text-code-inline text-outline font-semibold">
                35.8 GB FREE
              </span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">
              Milestones
            </span>
            <span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded-full text-on-surface font-semibold">
              3 Due Week
            </span>
          </div>
          <div className="mt-2.5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-body-sm font-body-sm">
              <span className="text-on-surface font-medium truncate">Sullivan Mobile RC1</span>
              <span className="font-code-inline text-code-inline text-error shrink-0 font-semibold">
                2d
              </span>
            </div>
            <div className="flex items-center justify-between text-body-sm font-body-sm">
              <span className="text-on-surface font-medium truncate">Primor Core Audit</span>
              <span className="font-code-inline text-code-inline text-primary shrink-0 font-semibold">
                4d
              </span>
            </div>
            <div className="flex items-center justify-between text-body-sm font-body-sm">
              <span className="text-on-surface-variant truncate">Q2 Product Roadmap</span>
              <span className="font-code-inline text-code-inline text-outline shrink-0">6d</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Priority Streams
              </span>
              <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-semibold">
                Active Cycle 14
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSortAsc((s) => !s)}
              className="font-label-sm text-label-sm text-outline hover:text-on-surface flex items-center gap-1 transition-colors"
            >
              <span>Sort: Due Date</span>
              <span className="material-symbols-outlined text-[14px]">
                {sortAsc ? 'arrow_downward' : 'arrow_upward'}
              </span>
            </button>
          </div>

          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => navigate('my-tasks')}
                  className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span
                        className={`font-label-sm text-label-sm font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          proj.status === 'In Progress'
                            ? 'bg-secondary-container/40 text-on-secondary-container'
                            : proj.status === 'Active Sprint'
                              ? 'bg-surface-container-high text-on-surface'
                              : proj.status === 'Review Pending'
                                ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                                : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            proj.status === 'In Progress'
                              ? 'bg-primary animate-pulse'
                              : proj.status === 'Active Sprint'
                                ? 'bg-secondary'
                                : 'bg-outline'
                          }`}
                        />
                        {proj.status}
                      </span>
                      <span className="text-outline group-hover:text-on-surface p-1 rounded-full">
                        <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                      </span>
                    </div>

                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">
                      {proj.name}
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`font-label-sm text-label-sm px-2 py-0.5 rounded-full ${
                            tag === 'High Priority'
                              ? 'bg-error-container text-on-error-container font-medium'
                              : 'bg-surface-container text-on-surface'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 bg-gradient-to-t from-surface-container-low/40 to-transparent rounded-lg px-2 -mx-2">
                    <div className="flex items-center justify-between font-label-sm text-label-sm mb-1.5">
                      <span className="text-on-surface-variant font-medium">Progress</span>
                      <span className="font-code-inline text-code-inline text-on-surface font-bold">
                        {proj.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all"
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-2">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {proj.team.slice(0, 3).map((m, idx) => (
                          <Avatar
                            key={`${proj.id}-m-${idx}`}
                            src={m.avatar}
                            alt={m.name}
                            initials={m.initials}
                            className="w-7 h-7 rounded-full object-cover shadow-sm ring-1 ring-white"
                          />
                        ))}
                        {proj.team.length > 3 && (
                          <div className="w-7 h-7 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold flex items-center justify-center shadow-sm">
                            +{proj.team.length - 3}
                          </div>
                        )}
                      </div>
                      <div
                        className={`flex items-center gap-1 font-label-sm text-label-sm ${
                          proj.status === 'Review Pending'
                            ? 'text-error font-medium'
                            : 'text-on-surface-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {proj.status === 'Review Pending' ? 'alarm' : 'event'}
                        </span>
                        <span>{proj.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-x-auto p-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="font-label-sm text-label-sm text-outline border-b border-surface-container-low">
                    <th className="pb-3 font-semibold">Workspace Stream</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Progress</th>
                    <th className="pb-3 font-semibold">Due</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {visibleProjects.map((proj) => (
                    <tr
                      key={proj.id}
                      onClick={() => navigate('my-tasks')}
                      className="hover:bg-surface-container-low/60 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 pr-4">
                        <p className="font-label-md text-label-md font-bold text-on-surface">
                          {proj.name}
                        </p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">
                          {proj.description}
                        </p>
                      </td>
                      <td className="py-3.5 pr-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">
                          {proj.status}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4 w-44">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-surface-container h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-primary h-full rounded-full"
                              style={{ width: `${proj.progress}%` }}
                            />
                          </div>
                          <span className="font-code-inline text-code-inline font-bold">
                            {proj.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 font-code-inline text-code-inline text-on-surface-variant whitespace-nowrap">
                        {proj.dueDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {viewMode === 'gantt' && (
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 space-y-4">
              <div className="grid grid-cols-12 gap-2 pb-2 border-b border-surface-container-low font-code-inline text-[11px] text-outline uppercase">
                <div className="col-span-4">Project Stream</div>
                <div className="col-span-8 grid grid-cols-8 text-center">
                  {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {visibleProjects.map((proj) => (
                  <div key={proj.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-4 pr-2 min-w-0">
                      <p className="font-label-md text-label-md font-bold text-on-surface truncate">
                        {proj.name}
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        Due {proj.dueDate}
                      </p>
                    </div>
                    <div className="col-span-8 grid grid-cols-8 gap-1 items-center bg-surface-container-low/60 rounded-lg p-1.5">
                      <div
                        className="h-6 rounded-md bg-primary-container text-on-primary-container px-2 flex items-center justify-between font-code-inline text-[11px] font-bold shadow-sm"
                        style={{
                          gridColumn: `${proj.startWeek} / span ${Math.min(
                            proj.durationWeeks,
                            9 - proj.startWeek,
                          )}`,
                        }}
                      >
                        <span className="truncate">{proj.status}</span>
                        <span>{proj.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contextual Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container ring-4 ring-secondary-container/20" />
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Git Environment
                </span>
              </div>
              <span className="font-code-inline text-code-inline bg-surface-container px-2 py-0.5 rounded-full text-on-surface font-medium">
                Local repo
              </span>
            </div>

            <div className="bg-surface-container-low rounded-lg p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between font-label-sm text-label-sm">
                <span className="text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">commit</span>
                  Branch
                </span>
                <span className="font-code-inline text-code-inline text-on-surface font-bold">
                  main
                </span>
              </div>
              <div className="flex items-center justify-between font-label-sm text-label-sm">
                <span className="text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">
                    check_circle
                  </span>
                  Status
                </span>
                <span className="text-on-secondary-container font-semibold">
                  Clean working tree
                </span>
              </div>
              <div className="flex items-center justify-between font-label-sm text-label-sm">
                <span className="text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-outline">
                    difference
                  </span>
                  Pending Commits
                </span>
                <span className="font-code-inline text-code-inline text-outline font-semibold">
                  0 uncommitted
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between pt-2">
              <span className="font-label-sm text-label-sm text-outline">Last pull: 4m ago</span>
              <button
                type="button"
                onClick={handleGitSync}
                className="font-label-sm text-label-sm text-primary hover:text-secondary font-semibold flex items-center gap-1 transition-colors"
              >
                <span
                  className={`material-symbols-outlined text-[14px] ${
                    syncingGit ? 'animate-spin' : ''
                  }`}
                >
                  sync
                </span>
                <span>{syncingGit ? 'Syncing...' : 'Sync Remote'}</span>
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Workspace Feed
              </h2>
              <button
                type="button"
                onClick={() => navigate('inbox')}
                className="font-label-sm text-label-sm text-primary hover:underline font-medium"
              >
                View Log
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {[
                {
                  icon: 'picture_as_pdf',
                  bg: 'bg-secondary-container/40 text-on-secondary-container',
                  title: 'Product_Brief_v2.pdf synced',
                  sub: 'Brandie C. • Primor Project',
                  time: '12m ago',
                },
                {
                  icon: 'task_alt',
                  bg: 'bg-primary-container/30 text-primary',
                  title: 'Architecture_spec.md approved',
                  sub: 'Esther S. • Trustworth',
                  time: '46m ago',
                },
                {
                  icon: 'deployed_code',
                  bg: 'bg-surface-container text-on-surface',
                  title: 'Test build v0.4.1 compiled',
                  sub: 'Automated CI runner • Sullivan',
                  time: '2h ago',
                },
                {
                  icon: 'folder_zip',
                  bg: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
                  title: 'Brand_Kit_Q2_Assets.zip packaged',
                  sub: 'Design System Sync • Marketing',
                  time: '5h ago',
                },
              ].map((feed) => (
                <div
                  key={feed.title}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-surface-container-low transition-colors"
                >
                  <span
                    className={`w-8 h-8 rounded-full ${feed.bg} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{feed.icon}</span>
                  </span>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">
                      {feed.title}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {feed.sub}
                    </span>
                    <span className="font-code-inline text-code-inline text-outline mt-0.5">
                      {feed.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-label-sm font-label-sm bg-surface-container-low rounded-lg p-2.5">
              <div className="flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  auto_awesome
                </span>
                <span>Manav.AI indexing active</span>
              </div>
              <span className="font-code-inline text-code-inline text-outline font-semibold">
                100% IDLE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
