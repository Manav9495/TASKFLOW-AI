import React, { useEffect, useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { ModalDialog } from '../common/ModalDialog';

export const QuickCreateModal: React.FC = () => {
  const {
    quickCreateOpen,
    setQuickCreateOpen,
    quickCreateTab,
    addTask,
    addProject,
    addCalendarEvent,
    notify,
    navigate,
  } = useWorkspace();

  const [tab, setTab] = useState<'task' | 'project' | 'meeting'>(quickCreateTab);
  const [title, setTitle] = useState('');
  const [projectName, setProjectName] = useState('Primor Project');
  const [assignee, setAssignee] = useState('Manav A.');
  const [dueDate, setDueDate] = useState('Today, 17:00');
  const [priority, setPriority] = useState<'Urgent' | 'High' | 'Normal'>('High');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTab(quickCreateTab);
  }, [quickCreateTab, quickCreateOpen]);

  const resetAndClose = () => {
    setTitle('');
    setDescription('');
    setQuickCreateOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    if (tab === 'task') {
      addTask({
        title: cleanTitle,
        assignee,
        assigneeInitials: assignee
          .split(' ')
          .map((s) => s[0])
          .join('')
          .slice(0, 2),
        project: projectName,
        dueDate,
        priority,
        status: priority === 'Urgent' ? 'Due Today' : 'In Progress',
        tags: ['#local-vault'],
      });
    } else if (tab === 'project') {
      addProject({
        name: cleanTitle,
        description:
          description.trim() || 'Local-first encrypted workspace stream synced over WebRTC mesh.',
        status: 'Active Sprint',
        priority: priority === 'Urgent' ? 'High Priority' : 'Normal',
        tags: ['Local-first', 'Encrypted'],
        progress: 12,
        tasksDueSoon: 3,
        dueDate,
        startWeek: 2,
        durationWeeks: 4,
        team: [{ name: assignee, initials: assignee.slice(0, 2).toUpperCase() }],
      });
      navigate('projects');
    } else {
      addCalendarEvent({
        title: cleanTitle,
        subtitle: description.trim() || 'Encrypted WebRTC Chamber',
        day: 'Thu',
        dayNum: 24,
        startHour: 15,
        durationHours: 1,
        source: 'client',
        variant: 'dark-meeting',
        badge: `#room-${Math.floor(100 + Math.random() * 900)}`,
        tag: 'E2EE Active',
      });
      notify(`Scheduled chamber "${cleanTitle}" on Thu 24.`);
    }

    resetAndClose();
  };

  return (
    <ModalDialog
      open={quickCreateOpen}
      onClose={resetAndClose}
      titleId="quick-create-title"
      maxWidthClass="max-w-lg"
    >
      <div className="bg-surface-container-lowest w-full rounded-2xl shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-container/30 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </div>
            <div>
              <h1 id="quick-create-title" className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Create in Local Vault
              </h1>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                AES-256 SQLite WAL persistence
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close create dialog"
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Type Switcher */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface-container-low rounded-xl">
          {(['task', 'project', 'meeting'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`py-2 rounded-lg font-label-md text-label-md capitalize transition-all ${
                tab === t
                  ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="qc-title"
              className="block font-label-md text-label-md font-semibold text-on-surface mb-1.5"
            >
              {tab === 'task' ? 'Task Title' : tab === 'project' ? 'Project Name' : 'Meeting Subject'}
            </label>
            <input
              id="qc-title"
              type="text"
              required
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                tab === 'task'
                  ? 'e.g. Audit enclave memory registers...'
                  : tab === 'project'
                    ? 'e.g. Zero-Knowledge Sync Engine'
                    : 'e.g. Architecture Review with Arc Co.'
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="qc-project"
                className="block font-label-md text-label-md font-semibold text-on-surface mb-1.5"
              >
                {tab === 'project' ? 'Lead Owner' : 'Workspace / Project'}
              </label>
              <select
                id="qc-project"
                value={tab === 'project' ? assignee : projectName}
                onChange={(e) =>
                  tab === 'project' ? setAssignee(e.target.value) : setProjectName(e.target.value)
                }
                className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container"
              >
                {tab === 'project' ? (
                  <>
                    <option>Manav A.</option>
                    <option>Brandie S.</option>
                    <option>Esther V.</option>
                    <option>Bessie T.</option>
                  </>
                ) : (
                  <>
                    <option>Primor Project</option>
                    <option>Sullivan Mobile</option>
                    <option>Trustworth Financial</option>
                    <option>Alexa AI Voice Core</option>
                    <option>Arc Company</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor="qc-due"
                className="block font-label-md text-label-md font-semibold text-on-surface mb-1.5"
              >
                {tab === 'meeting' ? 'Time Window' : 'Due Date'}
              </label>
              <input
                id="qc-due"
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
          </div>

          {tab === 'task' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="qc-assignee"
                  className="block font-label-md text-label-md font-semibold text-on-surface mb-1.5"
                >
                  Assignee
                </label>
                <select
                  id="qc-assignee"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container"
                >
                  <option>Manav A.</option>
                  <option>Brandie S.</option>
                  <option>Esther V.</option>
                  <option>Bessie T.</option>
                  <option>Alex M.</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="qc-priority"
                  className="block font-label-md text-label-md font-semibold text-on-surface mb-1.5"
                >
                  Priority
                </label>
                <select
                  id="qc-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'Urgent' | 'High' | 'Normal')}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container"
                >
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>
            </div>
          )}

          {tab !== 'task' && (
            <div>
              <label
                htmlFor="qc-desc"
                className="block font-label-md text-label-md font-semibold text-on-surface mb-1.5"
              >
                Summary / Notes
              </label>
              <textarea
                id="qc-desc"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional encrypted summary..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={resetAndClose}
              className="px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary hover:bg-secondary text-on-primary font-label-md text-label-md font-semibold shadow-md"
            >
              Save to Local Vault
            </button>
          </div>
        </form>
      </div>
    </ModalDialog>
  );
};
