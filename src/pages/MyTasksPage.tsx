import React, { useMemo, useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { Avatar } from '../components/common/Avatar';
import { TaskItem } from '../types/workspace';

export const MyTasksPage: React.FC = () => {
  const {
    tasks,
    toggleTaskComplete,
    toggleTaskTimer,
    batchCompleteDueToday,
    openQuickCreate,
    setPreviewDoc,
    documents,
  } = useWorkspace();

  const [search, setSearch] = useState('');
  const [groupBy, setGroupBy] = useState<'Status' | 'Priority' | 'Project'>('Status');
  const [viewLayout, setViewLayout] = useState<'list' | 'board'>('list');

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.project.toLowerCase().includes(q) ||
        t.assignee.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }, [tasks, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, TaskItem[]>();
    for (const task of filteredTasks) {
      const key =
        groupBy === 'Status'
          ? task.status
          : groupBy === 'Priority'
            ? task.priority
            : task.project;
      const list = map.get(key) ?? [];
      list.push(task);
      map.set(key, list);
    }
    return Array.from(map.entries());
  }, [filteredTasks, groupBy]);

  const dueTodayCount = tasks.filter((t) => t.status === 'Due Today').length;
  const inProgressCount = tasks.filter((t) => t.status === 'In Progress').length;
  const reviewCount = tasks.filter((t) => t.status === 'Review Queue').length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;

  return (
    <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-6">
      {/* Header & Tactical Operations Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-code-inline text-code-inline tracking-wider uppercase text-primary font-medium bg-surface-container px-2 py-0.5 rounded-full">
              Personal Workspace &amp; Assigned Queue
            </span>
            <span className="w-1 h-1 rounded-full bg-outline" />
            <span className="font-label-sm text-label-sm text-tertiary">Session synced: 2m ago</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              My Tasks &amp; Action Items
            </h1>
            <span className="font-label-md text-label-md px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-semibold">
              {tasks.length - completedCount + 41} Pending Items
            </span>
            <span className="font-label-md text-label-md px-3 py-1 rounded-full bg-surface-container text-primary flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[15px] material-symbols-filled">
                auto_awesome
              </span>
              Prioritized by AI
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex items-center bg-surface-container-lowest px-3 py-1.5 rounded-xl shadow-sm">
            <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter tasks or #tags..."
              className="font-body-sm text-body-sm bg-transparent outline-none text-on-surface placeholder:text-outline w-44 lg:w-56"
            />
            <kbd className="font-code-inline text-code-inline text-tertiary bg-surface-container px-1.5 py-0.5 rounded ml-1">
              ⌘F
            </kbd>
          </div>

          <button
            type="button"
            onClick={() =>
              setGroupBy((g) =>
                g === 'Status' ? 'Priority' : g === 'Priority' ? 'Project' : 'Status',
              )
            }
            className="flex items-center gap-1.5 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface px-3 py-2 rounded-xl text-label-md font-label-md shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[17px] text-tertiary">tune</span>
            <span>Group: {groupBy}</span>
            <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
          </button>

          <button
            type="button"
            onClick={() => setViewLayout((v) => (v === 'list' ? 'board' : 'list'))}
            className="flex items-center gap-1.5 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface px-3 py-2 rounded-xl text-label-md font-label-md shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[17px] text-primary">
              {viewLayout === 'list' ? 'view_kanban' : 'view_list'}
            </span>
            <span>{viewLayout === 'list' ? 'Board' : 'List'}</span>
          </button>

          <button
            type="button"
            onClick={batchCompleteDueToday}
            className="flex items-center gap-1.5 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface px-3 py-2 rounded-xl text-label-md font-label-md shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[17px]">done_all</span>
            <span>Batch Complete</span>
          </button>

          <button
            type="button"
            onClick={() => openQuickCreate('task')}
            className="flex items-center gap-1.5 bg-primary text-on-primary hover:bg-secondary px-4 py-2 rounded-xl text-label-md font-label-md shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Quick Task Telemetry Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-label-md text-label-md text-tertiary font-medium">
                Due Today
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-data-metric text-data-metric text-on-surface">
                  {dueTodayCount + 4}
                </span>
                <span className="font-label-sm text-label-sm text-tertiary">tasks flagged</span>
              </div>
            </div>
            <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              Urgent
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
            <span>3 Critical deadlines</span>
            <span className="font-code-inline text-code-inline text-primary">Before 17:00</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-error h-full rounded-full w-[70%]" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-label-md text-label-md text-tertiary font-medium">
                In Progress
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-data-metric text-data-metric text-on-surface">
                  {inProgressCount + 14}
                </span>
                <span className="font-label-sm text-label-sm text-tertiary">active flow</span>
              </div>
            </div>
            <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container text-primary font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              Live Focus
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
            <span>5 with focus timers</span>
            <span className="font-code-inline text-code-inline text-on-surface">32 hrs alloc</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-primary-container h-full rounded-full w-[52%]" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-label-md text-label-md text-tertiary font-medium">
                Review Queue
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-data-metric text-data-metric text-on-surface">
                  {reviewCount + 7}
                </span>
                <span className="font-label-sm text-label-sm text-tertiary">awaiting audit</span>
              </div>
            </div>
            <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">history_edu</span>
              Verification
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
            <span>4 Client documents</span>
            <span className="font-code-inline text-code-inline text-tertiary">~2h turnaround</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-tertiary-container h-full rounded-full w-[35%]" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-label-md text-label-md text-tertiary font-medium">
                Completed This Week
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-data-metric text-data-metric text-primary">
                  {completedCount + 23}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  tasks closed
                </span>
              </div>
            </div>
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-primary font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[13px]">trending_up</span>+18%
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
            <span>Zero overdue carry</span>
            <span className="font-code-inline text-code-inline text-primary">Local WAL</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-primary h-full rounded-full w-[86%]" />
          </div>
        </div>
      </div>

      {/* Tasks List or Kanban Board */}
      {viewLayout === 'list' ? (
        <div className="space-y-5">
          {grouped.map(([groupTitle, items]) => (
            <section
              key={groupTitle}
              className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 space-y-3"
            >
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    {groupTitle}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-low font-code-inline text-[11px] font-semibold text-on-surface-variant">
                    {items.length}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-surface-container-low">
                {items.map((task) => (
                  <div
                    key={task.id}
                    className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-surface-container-low/40 rounded-xl px-2 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={task.status === 'Completed'}
                        onChange={() => toggleTaskComplete(task.id)}
                        aria-label={`Mark ${task.title} complete`}
                        className="mt-1 w-4 h-4 rounded accent-primary cursor-pointer"
                      />
                      <div className="min-w-0 space-y-1">
                        <p
                          className={`font-body-md text-body-md font-semibold ${
                            task.status === 'Completed'
                              ? 'line-through text-outline'
                              : 'text-on-surface'
                          }`}
                        >
                          {task.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-label-sm font-label-sm">
                          <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface font-medium">
                            {task.project}
                          </span>
                          {task.tags.map((tg) => (
                            <span key={tg} className="font-code-inline text-outline">
                              {tg}
                            </span>
                          ))}
                          {task.aiNote && (
                            <span className="text-primary font-medium hidden lg:inline">
                              • {task.aiNote}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0 pl-7 md:pl-0">
                      {task.attachment && (
                        <button
                          type="button"
                          onClick={() => {
                            const found =
                              documents.find((d) => d.name === task.attachment) ?? documents[0];
                            if (found) setPreviewDoc(found);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-primary-container text-on-surface font-label-sm text-label-sm"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            description
                          </span>
                          <span>{task.attachment}</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleTaskTimer(task.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-code-inline text-[11px] font-semibold transition-colors ${
                          task.timerActive
                            ? 'bg-primary-container text-on-primary-container'
                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {task.timerActive ? 'pause' : 'play_arrow'}
                        </span>
                        <span>{task.focusMinutes ?? 30}m</span>
                      </button>

                      <span
                        className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${
                          task.priority === 'Urgent'
                            ? 'bg-error-container text-on-error-container'
                            : task.priority === 'High'
                              ? 'bg-secondary-container/50 text-on-secondary-container'
                              : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {task.priority}
                      </span>

                      <span className="font-code-inline text-code-inline text-on-surface-variant">
                        {task.dueDate}
                      </span>

                      <Avatar
                        src={task.assigneeAvatar}
                        alt={task.assignee}
                        initials={task.assigneeInitials}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {(['Due Today', 'In Progress', 'Review Queue', 'Completed'] as const).map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col);
            return (
              <div
                key={col}
                className="bg-surface-container-low/70 rounded-2xl p-4 space-y-3 min-h-[320px]"
              >
                <div className="flex items-center justify-between px-1">
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    {col}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest font-code-inline text-[11px] font-bold">
                    {colTasks.length}
                  </span>
                </div>
                <div className="space-y-2.5">
                  {colTasks.map((t) => (
                    <div
                      key={t.id}
                      className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface font-label-sm text-label-sm font-medium">
                          {t.project}
                        </span>
                        <input
                          type="checkbox"
                          checked={t.status === 'Completed'}
                          onChange={() => toggleTaskComplete(t.id)}
                          aria-label={`Toggle ${t.title}`}
                          className="w-4 h-4 accent-primary cursor-pointer"
                        />
                      </div>
                      <p className="font-body-sm text-body-sm font-semibold text-on-surface">
                        {t.title}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5">
                          <Avatar
                            src={t.assigneeAvatar}
                            alt={t.assignee}
                            initials={t.assigneeInitials}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            {t.assignee}
                          </span>
                        </div>
                        <span className="font-code-inline text-[11px] text-outline">
                          {t.dueDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
