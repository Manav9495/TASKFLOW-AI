import React, { useMemo, useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { PageId } from '../../types/workspace';
import { ModalDialog } from '../common/ModalDialog';

export const CommandPaletteModal: React.FC = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    navigate,
    openQuickCreate,
    openMeetingChamber,
    projects,
    tasks,
    documents,
    setPreviewDoc,
  } = useWorkspace();

  const [query, setQuery] = useState('');

  const close = () => {
    setCommandPaletteOpen(false);
    setQuery('');
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    const pages: { id: PageId; label: string; icon: string; meta: string }[] = [
      { id: 'dashboard', label: 'Dashboard Overview', icon: 'dashboard', meta: 'Workspace' },
      { id: 'projects', label: 'Active Projects & Workspaces', icon: 'folder_copy', meta: 'Page' },
      { id: 'my-tasks', label: 'My Tasks & Action Items', icon: 'checklist', meta: 'Page' },
      { id: 'inbox', label: 'Inbox & Triage Queue', icon: 'inbox', meta: 'Page' },
      { id: 'meetings', label: 'Meetings & Collaborative Notes', icon: 'videocam', meta: 'Page' },
      { id: 'calendar', label: 'Workspace Calendar & Focus Planner', icon: 'calendar_month', meta: 'Page' },
      { id: 'documents', label: 'Documents Vault', icon: 'description', meta: 'Page' },
      { id: 'ai-assistant', label: 'Manav.AI Companion', icon: 'auto_awesome', meta: 'On-Device AI' },
      { id: 'settings', label: 'System & Workspace Settings', icon: 'settings', meta: 'Vault Config' },
      { id: 'profile', label: 'Executive / Admin / Employee Profile', icon: 'badge', meta: 'IAM' },
    ];

    const filteredPages = pages.filter(
      (p) => !q || p.label.toLowerCase().includes(q) || p.meta.toLowerCase().includes(q),
    );
    const filteredProjects = projects.filter(
      (p) => !q || p.name.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)),
    );
    const filteredTasks = tasks.filter(
      (t) =>
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.project.toLowerCase().includes(q) ||
        t.assignee.toLowerCase().includes(q),
    );
    const filteredDocs = documents.filter(
      (d) => !q || d.name.toLowerCase().includes(q) || d.project.toLowerCase().includes(q),
    );

    return { filteredPages, filteredProjects, filteredTasks, filteredDocs };
  }, [query, projects, tasks, documents]);

  return (
    <ModalDialog
      open={commandPaletteOpen}
      onClose={close}
      titleId="command-palette-title"
      maxWidthClass="max-w-2xl"
    >
      <div className="bg-surface-container-lowest w-full rounded-2xl shadow-2xl overflow-hidden border border-surface-container">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-surface-container-low">
          <span className="material-symbols-outlined text-primary text-[20px]">search</span>
          <h1 id="command-palette-title" className="sr-only">
            Workspace Command Palette
          </h1>
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to workspace view, task, project, document, or action..."
            className="flex-1 bg-transparent outline-none font-body-md text-body-md text-on-surface placeholder:text-outline"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close search"
            className="font-mono text-[11px] bg-surface-container-low hover:bg-surface-container text-on-surface-variant px-2 py-1 rounded-lg"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[60dvh] overflow-y-auto p-3 space-y-4 custom-scrollbar">
          {/* Quick Actions */}
          <div>
            <p className="px-2 pb-1.5 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
              Quick Actions
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  close();
                  openQuickCreate('task');
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low hover:bg-primary-container/30 text-on-surface font-label-md text-label-md transition-colors"
              >
                <span className="material-symbols-outlined text-[17px] text-primary">add_task</span>
                <span>New Task</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  close();
                  openMeetingChamber();
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low hover:bg-primary-container/30 text-on-surface font-label-md text-label-md transition-colors"
              >
                <span className="material-symbols-outlined text-[17px] text-primary">videocam</span>
                <span>Join Arc Meeting</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  close();
                  navigate('ai-assistant');
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low hover:bg-primary-container/30 text-on-surface font-label-md text-label-md transition-colors"
              >
                <span className="material-symbols-outlined text-[17px] text-primary">
                  auto_awesome
                </span>
                <span>Ask Manav.AI</span>
              </button>
            </div>
          </div>

          {/* Pages */}
          {results.filteredPages.length > 0 && (
            <div>
              <p className="px-2 pb-1.5 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Navigation
              </p>
              <div className="space-y-1">
                {results.filteredPages.slice(0, 6).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      navigate(p.id);
                      close();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-container-low transition-colors text-left"
                  >
                    <span className="flex items-center gap-2.5 font-label-md text-label-md text-on-surface font-medium">
                      <span className="material-symbols-outlined text-[18px] text-primary">
                        {p.icon}
                      </span>
                      <span>{p.label}</span>
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">{p.meta}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {results.filteredProjects.length > 0 && (
            <div>
              <p className="px-2 pb-1.5 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Projects
              </p>
              <div className="space-y-1">
                {results.filteredProjects.slice(0, 4).map((proj) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      navigate('projects');
                      close();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-container-low transition-colors text-left"
                  >
                    <span className="font-label-md text-label-md text-on-surface font-medium">
                      {proj.name}
                    </span>
                    <span className="font-code-inline text-[11px] text-primary font-semibold">
                      {proj.progress}% • {proj.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tasks */}
          {results.filteredTasks.length > 0 && (
            <div>
              <p className="px-2 pb-1.5 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Tasks
              </p>
              <div className="space-y-1">
                {results.filteredTasks.slice(0, 4).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      navigate('my-tasks');
                      close();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-container-low transition-colors text-left"
                  >
                    <span className="font-label-md text-label-md text-on-surface truncate pr-3">
                      {t.title}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0">
                      {t.project} • {t.dueDate}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {results.filteredDocs.length > 0 && (
            <div>
              <p className="px-2 pb-1.5 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Encrypted Vault Documents
              </p>
              <div className="space-y-1">
                {results.filteredDocs.slice(0, 4).map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => {
                      close();
                      setPreviewDoc(doc);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-container-low transition-colors text-left"
                  >
                    <span className="font-code-inline text-code-inline text-on-surface font-medium">
                      {doc.name}
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">
                      {doc.size} • {doc.syncStatus}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 bg-surface-container-low/70 flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-primary">lock</span>
            <span>Local-index search • 0 network requests</span>
          </span>
          <span className="font-mono">⌘K to toggle</span>
        </div>
      </div>
    </ModalDialog>
  );
};
