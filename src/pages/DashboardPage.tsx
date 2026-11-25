import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { AVATARS } from '../data/mockWorkspace';
import { Avatar } from '../components/common/Avatar';

const CHART_SERIES: Record<
  'Today' | 'This Week' | 'This Month',
  { month: string; totalPct: number; completedPct: number; active?: boolean }[]
> = {
  Today: [
    { month: 'Jan', totalPct: 48, completedPct: 55 },
    { month: 'Feb', totalPct: 60, completedPct: 50 },
    { month: 'Mar', totalPct: 88, completedPct: 72, active: true },
    { month: 'Apr', totalPct: 54, completedPct: 42 },
    { month: 'May', totalPct: 44, completedPct: 60 },
  ],
  'This Week': [
    { month: 'Jan', totalPct: 55, completedPct: 40 },
    { month: 'Feb', totalPct: 40, completedPct: 45 },
    { month: 'Mar', totalPct: 82, completedPct: 65, active: true },
    { month: 'Apr', totalPct: 62, completedPct: 35 },
    { month: 'May', totalPct: 32, completedPct: 50 },
  ],
  'This Month': [
    { month: 'Jan', totalPct: 68, completedPct: 52 },
    { month: 'Feb', totalPct: 54, completedPct: 58 },
    { month: 'Mar', totalPct: 92, completedPct: 74, active: true },
    { month: 'Apr', totalPct: 74, completedPct: 48 },
    { month: 'May', totalPct: 49, completedPct: 62 },
  ],
};

export const DashboardPage: React.FC = () => {
  const {
    navigate,
    openQuickCreate,
    openMeetingChamber,
    setPrivacyModalOpen,
    setPreviewDoc,
    sendAiPrompt,
    tasks,
    projects,
    documents,
    notify,
  } = useWorkspace();

  const [period, setPeriod] = useState<'Today' | 'This Week' | 'This Month'>('This Week');
  const [periodOpen, setPeriodOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiMode, setAiMode] = useState<'Reasoning' | 'Search Docs' | 'Analyze'>('Reasoning');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [connectingMeeting, setConnectingMeeting] = useState(false);

  const completedTasks = tasks.filter((t) => t.status === 'Completed').length + 185;
  const pendingTasks = tasks.filter((t) => t.status !== 'Completed').length + 41;
  const totalTasks = completedTasks + pendingTasks;
  const completionRate = ((completedTasks / totalTasks) * 100).toFixed(1);

  const handleRunMiniAi = () => {
    const clean = aiQuery.trim();
    if (!clean) return;
    sendAiPrompt(`[${aiMode}] ${clean}`);
    setAiResponse(
      `Local inference (${aiMode}): Indexed ${tasks.length} live queue items & ${projects.length} encrypted streams. 0 outbound bytes.`,
    );
    setAiQuery('');
  };

  const handleStartMeeting = () => {
    setConnectingMeeting(true);
    window.setTimeout(() => {
      setConnectingMeeting(false);
      openMeetingChamber('Sprint Planning & Architecture Sync with Arc Company');
    }, 500);
  };

  const openDocByName = (name: string) => {
    const found =
      documents.find((d) => d.name.toLowerCase() === name.toLowerCase()) ?? documents[0];
    if (found) setPreviewDoc(found);
  };

  return (
    <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-6">
      {/* WELCOME & ACTION BAR */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-medium">
              Your workspace, all in one place
            </p>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight flex items-center gap-2">
            Welcome back, Manav{' '}
            <span className="inline-block hover:rotate-12 transition-transform duration-200 cursor-default select-none">
              👋
            </span>
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Here&apos;s what&apos;s happening with your local projects and tasks today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-container-lowest px-3.5 py-2 rounded-xl shadow-sm text-on-surface">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-label-md text-label-md font-semibold">Wednesday, May 15</span>
            <span className="font-label-sm text-label-sm bg-surface-container-low px-2 py-0.5 rounded-md text-on-surface-variant">
              Local Mode
            </span>
          </div>
          <button
            type="button"
            onClick={() => openQuickCreate('task')}
            className="bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-headline-sm text-headline-sm px-4 py-2 rounded-xl glow-emerald flex items-center gap-2 transition-all duration-150 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Create New</span>
          </button>
        </div>
      </section>

      {/* KPI STATS (4-COL GRID) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigate('my-tasks')}
          className="bg-surface-container-lowest p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Total Tasks</span>
            <span className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-data-metric text-data-metric text-on-surface">{totalTasks}</span>
            <div className="flex items-end gap-1 h-6 select-none opacity-80 group-hover:opacity-100 transition-opacity">
              <span className="w-1 h-3 bg-surface-container-highest rounded-full" />
              <span className="w-1 h-5 bg-surface-container-highest rounded-full" />
              <span className="w-1 h-2 bg-surface-container-highest rounded-full" />
              <span className="w-1 h-6 bg-primary rounded-full" />
              <span className="w-1 h-4 bg-primary-container rounded-full" />
              <span className="w-1 h-5 bg-primary rounded-full" />
              <span className="w-1 h-3 bg-surface-container-highest rounded-full" />
            </div>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-primary">done_all</span>
            Across all projects
          </p>
        </div>

        <div
          onClick={() => navigate('my-tasks')}
          className="bg-surface-container-lowest p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Pending Tasks
            </span>
            <span className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-data-metric text-data-metric text-on-surface">
              {pendingTasks}
            </span>
            <div className="flex items-center gap-1.5 py-1">
              <span className="w-2 h-4 rounded-sm bg-primary-container animate-pulse" />
              <span className="w-2 h-4 rounded-sm bg-secondary-container" />
              <span className="w-2 h-4 rounded-sm bg-surface-container-highest" />
              <span className="w-2 h-4 rounded-sm bg-surface-container-highest" />
            </div>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-primary">
              pending_actions
            </span>
            Awaiting completion
          </p>
        </div>

        <div
          onClick={() => navigate('my-tasks')}
          className="bg-surface-container-lowest p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Completed Tasks
            </span>
            <span className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-data-metric text-data-metric text-on-surface">
              {completedTasks}
            </span>
            <span className="font-label-sm text-label-sm bg-surface-container-low text-primary px-2.5 py-0.5 rounded-full font-semibold">
              {completionRate}%
            </span>
          </div>
          <div className="w-full bg-surface-container-low h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        <div
          onClick={() => navigate('projects')}
          className="bg-surface-container-lowest p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Active Projects
            </span>
            <span className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-data-metric text-data-metric text-on-surface">
              {projects.length + 6}
            </span>
            <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> 3 on track
            </span>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-primary">folder_open</span>
            Currently running locally
          </p>
        </div>
      </section>

      {/* MAIN 3-COLUMN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Project Overview Chart */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Project Overview
                </h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Monthly velocity and throughput
                </p>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPeriodOpen((p) => !p)}
                  className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-lg text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors"
                >
                  <span>{period}</span>
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
                {periodOpen && (
                  <div className="absolute right-0 mt-1 w-32 bg-surface-container-lowest shadow-md rounded-xl p-1 z-20 border border-surface-container">
                    {(['Today', 'This Week', 'This Month'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setPeriod(opt);
                          setPeriodOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 font-label-sm text-label-sm rounded-lg hover:bg-surface-container-low ${
                          period === opt ? 'bg-surface-container-low text-primary font-semibold' : 'text-on-surface'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full pt-2">
              <div className="flex items-end justify-between gap-3 h-44 px-2">
                <div className="flex flex-col justify-between h-full font-label-sm text-label-sm text-outline pr-2 select-none">
                  <span>600</span>
                  <span>400</span>
                  <span>200</span>
                  <span>0</span>
                </div>
                {CHART_SERIES[period].map((bar) => (
                  <div
                    key={bar.month}
                    className="flex-1 flex flex-col items-center h-full justify-end group"
                  >
                    <div
                      className={`w-full max-w-[42px] bg-surface-container-low rounded-t-lg relative overflow-hidden flex flex-col justify-end transition-all duration-300 ${
                        bar.active ? 'shadow-sm' : 'group-hover:brightness-95'
                      }`}
                      style={{ height: `${bar.totalPct}%` }}
                    >
                      <div
                        className={`w-full rounded-t-sm relative transition-all duration-500 ${
                          bar.active
                            ? 'bg-primary-container chart-hatch'
                            : 'bg-surface-container-highest'
                        }`}
                        style={{ height: `${bar.completedPct}%` }}
                      />
                    </div>
                    <span
                      className={`font-label-sm text-label-sm mt-2 ${
                        bar.active ? 'text-primary font-bold' : 'text-on-surface-variant'
                      }`}
                    >
                      {bar.month}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-6 mt-4 pt-3 bg-surface-container-low/50 rounded-xl py-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
                  <span className="font-label-sm text-label-sm text-on-surface font-medium">
                    Completed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-surface-container-highest" />
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    In Progress
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Tasks Table */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Recent Tasks
                </h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Assigned sync queue
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('my-tasks')}
                aria-label="View all tasks"
                className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="font-label-sm text-label-sm text-outline pb-2">
                    <th className="pb-2 font-medium">Assignee &amp; Task</th>
                    <th className="pb-2 font-medium">Project</th>
                    <th className="pb-2 font-medium">Due</th>
                    <th className="pb-2 font-medium text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-transparent">
                  {tasks.slice(0, 3).map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-surface-container-low/70 transition-colors group"
                    >
                      <td className="py-2.5 pr-2">
                        <div className="flex items-center gap-2.5">
                          <Avatar
                            src={t.assigneeAvatar}
                            alt={t.assignee}
                            initials={t.assigneeInitials}
                            className="w-7 h-7 rounded-full object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-label-md text-label-md font-semibold text-on-surface truncate">
                              {t.assignee}
                            </p>
                            <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                              {t.title}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 pr-2">
                        <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-md">
                          {t.project}
                        </span>
                      </td>
                      <td className="py-2.5 pr-2 font-label-sm text-label-sm text-on-surface whitespace-nowrap">
                        {t.dueDate}
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => openDocByName(t.attachment ?? 'Receipt.pdf')}
                          className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-surface-container-low hover:bg-primary-container text-on-surface hover:text-on-primary-container px-2.5 py-1 rounded-lg transition-colors font-medium"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {t.attachmentIcon ?? 'description'}
                          </span>
                          <span>{t.attachment ?? 'Receipt.pdf'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN (3 Cols) */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          {/* Task Statistics */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Task Statistics
                </h2>
                <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-md">
                  Monthly
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-data-metric text-data-metric text-on-surface">506</span>
                <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +4.3%
                </span>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-4">
                Total recorded project activity
              </p>

              <div className="w-full flex gap-1 h-3 mb-4 rounded-full overflow-hidden bg-surface-container-low p-0.5">
                <div className="bg-primary h-full rounded-l-full w-[65%]" title="Completed 65%" />
                <div className="bg-primary-container h-full w-[25%]" title="In Progress 25%" />
                <div
                  className="bg-surface-container-highest h-full rounded-r-full w-[10%]"
                  title="Pending 10%"
                />
              </div>

              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Done</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary-container" />
                  <span>Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-surface-container-highest" />
                  <span>Queue</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => openDocByName('Product_Brief.txt')}
                className="w-full text-left p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[16px]">draft</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-label-sm text-label-sm font-semibold text-on-surface truncate">
                        Product_Brief.txt
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        24.19 KB • In progress
                      </p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-bold">43%</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full w-[43%]" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => openDocByName('Q2_Roadmap.pdf')}
                className="w-full text-left p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[16px]">task_alt</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-label-sm text-label-sm font-semibold text-on-surface truncate">
                        Q2_Roadmap.pdf
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        1.2 MB • Synced local
                      </p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-bold">100%</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full w-full" />
                </div>
              </button>
            </div>
          </div>

          {/* Active Projects List */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Active Projects
              </h2>
              <span className="font-label-sm text-label-sm bg-surface-container-low text-on-surface-variant px-2 py-0.5 rounded-full">
                {projects.length} Total
              </span>
            </div>

            <div className="space-y-2">
              {projects.slice(0, 4).map((proj, idx) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => navigate('projects')}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors ${
                    idx === 0
                      ? 'bg-primary-container/20 hover:bg-primary-container/30'
                      : 'bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-label-sm shrink-0 ${
                        idx === 0
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-lowest text-on-surface'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-label-md text-label-md font-bold text-on-surface">
                        {proj.name}
                      </p>
                      <p
                        className={`font-label-sm text-label-sm ${
                          idx === 0 ? 'text-primary font-medium' : 'text-on-surface-variant'
                        }`}
                      >
                        {proj.tasksDueSoon} Tasks due soon
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                    more_vert
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Meeting Notes & Urgent Call */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Meeting Notes
              </h2>
              <button
                type="button"
                onClick={() => openQuickCreate('meeting')}
                title="Schedule Meeting"
                className="w-8 h-8 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>

            <div className="bg-inverse-surface text-inverse-on-surface p-5 rounded-2xl relative shadow-md overflow-hidden">
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <span className="font-label-sm text-label-sm text-secondary-fixed bg-secondary-fixed/10 px-2 py-0.5 rounded-full font-medium inline-block mb-2">
                    Live in 15 mins
                  </span>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-inverse-on-surface">
                    Meeting with Arc Company
                  </h3>
                  <p className="font-label-sm text-label-sm text-inverse-on-surface/70 mt-0.5">
                    Time: 02.00 pm - 04.00 pm
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('meetings')}
                  aria-label="Open meetings overview"
                  className="p-1 rounded-lg hover:bg-white/10 text-inverse-on-surface/80"
                >
                  <span className="material-symbols-outlined text-[18px]">more_vert</span>
                </button>
              </div>

              <div className="flex items-center gap-2 mt-4 relative z-10">
                <div className="flex -space-x-2 overflow-hidden">
                  <Avatar
                    src={AVATARS.alex}
                    alt="Alex"
                    initials="AM"
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-inverse-surface object-cover"
                  />
                  <Avatar
                    src={AVATARS.creative}
                    alt="Brandie"
                    initials="BS"
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-inverse-surface object-cover"
                  />
                  <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-container text-on-primary-container text-[11px] font-bold ring-2 ring-inverse-surface">
                    +6
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-inverse-on-surface/80">
                  8 synced attendees
                </span>
              </div>

              <button
                type="button"
                onClick={handleStartMeeting}
                className="mt-5 w-full bg-primary-container hover:bg-primary-fixed-dim text-on-primary-container font-headline-sm text-headline-sm py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    connectingMeeting ? 'animate-spin' : ''
                  }`}
                >
                  {connectingMeeting ? 'refresh' : 'videocam'}
                </span>
                <span>{connectingMeeting ? 'Connecting local room...' : 'Start Meeting'}</span>
              </button>
            </div>
          </div>

          {/* Manav.AI Assistant & Privacy Hub */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      neurology
                    </span>
                  </div>
                  <div>
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Manav.AI
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">
                      On-device Companion
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-full text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                  <span className="font-label-sm text-label-sm font-semibold">Active</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low/60 flex items-center gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-on-primary-container text-[20px]">
                    smart_toy
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-label-md font-bold text-on-surface">
                    Good Morning, Manav.
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    How can I assist your workflow today?
                  </p>
                </div>
              </div>

              <div className="relative mb-3">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRunMiniAi();
                  }}
                  placeholder="Ask Manav.AI anything about your tasks..."
                  className="w-full bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm rounded-xl pl-3.5 pr-10 py-2.5 outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all"
                />
                <button
                  type="button"
                  onClick={handleRunMiniAi}
                  title="Execute Query"
                  className="absolute right-2 top-2 p-1 rounded-lg bg-primary text-on-primary hover:bg-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                </button>
              </div>

              {aiResponse && (
                <div className="mb-3 p-2.5 rounded-xl bg-primary-container/15 text-on-surface font-label-sm text-label-sm flex items-center justify-between gap-2">
                  <span>{aiResponse}</span>
                  <button
                    type="button"
                    onClick={() => navigate('ai-assistant')}
                    className="text-primary font-bold shrink-0 hover:underline"
                  >
                    Open →
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 no-scrollbar">
                {(
                  [
                    { id: 'Reasoning', icon: 'psychology' },
                    { id: 'Search Docs', icon: 'manage_search' },
                    { id: 'Analyze', icon: 'analytics' },
                  ] as const
                ).map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setAiMode(chip.id)}
                    className={`font-label-sm text-label-sm px-2.5 py-1 rounded-full whitespace-nowrap transition-colors flex items-center gap-1 ${
                      aiMode === chip.id
                        ? 'bg-primary-container text-on-primary-container font-semibold'
                        : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px] text-primary">
                      {chip.icon}
                    </span>
                    <span>{chip.id}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {[
                  {
                    icon: 'checklist',
                    title: 'Task Overview',
                    sub: `Summarize today's ${pendingTasks} pending tasks`,
                  },
                  {
                    icon: 'insights',
                    title: 'Project Efficiency',
                    sub: 'Evaluate Primor velocity bottlenecks',
                  },
                  {
                    icon: 'group',
                    title: 'Team Performance',
                    sub: 'Track assigned loads across 8 members',
                  },
                ].map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => {
                      sendAiPrompt(`${item.title}: ${item.sub}`);
                      notify(`Dispatched "${item.title}" to Manav.AI.`);
                      navigate('ai-assistant');
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex items-start gap-2.5 group"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary mt-0.5 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <div>
                      <p className="font-label-sm text-label-sm font-bold text-on-surface">
                        {item.title}
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        {item.sub}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 bg-surface-container-low/40 rounded-xl p-2.5">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="w-full text-left flex items-start gap-2 group"
              >
                <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">
                  verified_user
                </span>
                <p className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
                  <span className="font-semibold text-on-surface">Local-First Sandbox:</span> Task
                  telemetry never leaves local storage. Click for verification details.
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
