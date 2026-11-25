import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  INITIAL_AI_MESSAGES,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_DOCUMENTS,
  INITIAL_IAM_NODES,
  INITIAL_INBOX,
  INITIAL_MEETINGS,
  INITIAL_MEETING_ACTIONS,
  INITIAL_PROJECTS,
  INITIAL_SETTINGS,
  INITIAL_TASKS,
} from '../data/mockWorkspace';
import {
  AIChatMessage,
  ActionItem,
  CalendarEvent,
  DocumentItem,
  IAMNode,
  InboxMessage,
  MeetingSession,
  MeetingSubView,
  PageId,
  ProfileRole,
  ProjectItem,
  SettingsState,
  TaskItem,
} from '../types/workspace';

export interface ToastNotice {
  id: string;
  message: string;
  tone?: 'success' | 'info' | 'warning';
}

interface WorkspaceContextValue {
  activePage: PageId;
  navigate: (page: PageId) => void;
  meetingSubView: MeetingSubView;
  setMeetingSubView: (view: MeetingSubView) => void;
  openMeetingChamber: (meetingTitle?: string) => void;
  activeMeetingTitle: string;
  profileRole: ProfileRole;
  setProfileRole: (role: ProfileRole) => void;

  // Domain state
  projects: ProjectItem[];
  addProject: (proj: Omit<ProjectItem, 'id'>) => void;
  tasks: TaskItem[];
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  toggleTaskComplete: (taskId: string) => void;
  toggleTaskTimer: (taskId: string) => void;
  batchCompleteDueToday: () => void;

  inboxMessages: InboxMessage[];
  markMessageRead: (id: string) => void;
  markAllInboxRead: () => void;
  sendInboxReply: (id: string, text: string) => void;
  approveAndMergePR: (id: string) => void;

  meetings: MeetingSession[];
  meetingActions: ActionItem[];
  toggleMeetingAction: (id: string) => void;
  addMeetingAction: (text: string, assignee?: string) => void;
  pushMeetingActionsToTasks: () => void;

  calendarEvents: CalendarEvent[];
  addCalendarEvent: (ev: Omit<CalendarEvent, 'id'>) => void;
  lockFocusWindows: () => void;
  focusWindowsLocked: boolean;

  documents: DocumentItem[];
  addDocument: (doc: Omit<DocumentItem, 'id'>) => void;
  removeDocument: (id: string) => void;

  aiMessages: AIChatMessage[];
  sendAiPrompt: (prompt: string) => void;
  clearAiContext: () => void;
  deployAiAction: (messageId: string, actionId: string) => void;

  settings: SettingsState;
  updateSettings: (patch: Partial<SettingsState>) => void;
  iamNodes: IAMNode[];
  toggleNodeRole: (id: string) => void;
  revokeNode: (id: string) => void;

  // Modals
  privacyModalOpen: boolean;
  setPrivacyModalOpen: (v: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (v: boolean) => void;
  quickCreateOpen: boolean;
  quickCreateTab: 'task' | 'project' | 'meeting';
  openQuickCreate: (tab?: 'task' | 'project' | 'meeting') => void;
  setQuickCreateOpen: (v: boolean) => void;
  previewDoc: DocumentItem | null;
  setPreviewDoc: (doc: DocumentItem | null) => void;
  screenShareOpen: boolean;
  setScreenShareOpen: (v: boolean) => void;
  activeScreenName: string;
  setActiveScreenName: (name: string) => void;

  // Toasts
  toasts: ToastNotice[];
  notify: (message: string, tone?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

const STORAGE_KEY = 'taskflow_ai_local_vault_v24';

function loadStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}:${key}`);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`${STORAGE_KEY}:${key}`, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors in ephemeral contexts
  }
}

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [meetingSubView, setMeetingSubView] = useState<MeetingSubView>('notes');
  const [activeMeetingTitle, setActiveMeetingTitle] = useState(
    'Sprint Planning & Architecture Sync with Arc Company',
  );
  const [profileRole, setProfileRole] = useState<ProfileRole>('ceo');

  const [projects, setProjects] = useState<ProjectItem[]>(() =>
    loadStored('projects', INITIAL_PROJECTS),
  );
  const [tasks, setTasks] = useState<TaskItem[]>(() => loadStored('tasks', INITIAL_TASKS));
  const [inboxMessages, setInboxMessages] = useState<InboxMessage[]>(() =>
    loadStored('inbox', INITIAL_INBOX),
  );
  const [meetings, setMeetings] = useState<MeetingSession[]>(() =>
    loadStored('meetings', INITIAL_MEETINGS),
  );
  const [meetingActions, setMeetingActions] = useState<ActionItem[]>(() =>
    loadStored('meetingActions', INITIAL_MEETING_ACTIONS),
  );
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() =>
    loadStored('calendarEvents', INITIAL_CALENDAR_EVENTS),
  );
  const [focusWindowsLocked, setFocusWindowsLocked] = useState(false);
  const [documents, setDocuments] = useState<DocumentItem[]>(() =>
    loadStored('documents', INITIAL_DOCUMENTS),
  );
  const [aiMessages, setAiMessages] = useState<AIChatMessage[]>(INITIAL_AI_MESSAGES);
  const [settings, setSettings] = useState<SettingsState>(() =>
    loadStored('settings', INITIAL_SETTINGS),
  );
  const [iamNodes, setIamNodes] = useState<IAMNode[]>(INITIAL_IAM_NODES);

  // Modals
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [quickCreateTab, setQuickCreateTab] = useState<'task' | 'project' | 'meeting'>('task');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [screenShareOpen, setScreenShareOpen] = useState(false);
  const [activeScreenName, setActiveScreenName] = useState('Entire Screen 1 — Studio Display');
  const [toasts, setToasts] = useState<ToastNotice[]>([]);

  // Persist core local-first data
  useEffect(() => saveStored('projects', projects), [projects]);
  useEffect(() => saveStored('tasks', tasks), [tasks]);
  useEffect(() => saveStored('inbox', inboxMessages), [inboxMessages]);
  useEffect(() => saveStored('meetings', meetings), [meetings]);
  useEffect(() => saveStored('meetingActions', meetingActions), [meetingActions]);
  useEffect(() => saveStored('calendarEvents', calendarEvents), [calendarEvents]);
  useEffect(() => saveStored('documents', documents), [documents]);
  useEffect(() => saveStored('settings', settings), [settings]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, tone: 'success' | 'info' | 'warning' = 'success') => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev.slice(-2), { id, message, tone }]);
      window.setTimeout(() => {
        dismissToast(id);
      }, 3400);
    },
    [dismissToast],
  );

  // Global Cmd+K / Ctrl+K shortcut for Command Palette
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navigate = useCallback((page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openMeetingChamber = useCallback((title?: string) => {
    if (title) setActiveMeetingTitle(title);
    setActivePage('meetings');
    setMeetingSubView('chamber');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openQuickCreate = useCallback((tab: 'task' | 'project' | 'meeting' = 'task') => {
    setQuickCreateTab(tab);
    setQuickCreateOpen(true);
  }, []);

  const addProject = useCallback(
    (proj: Omit<ProjectItem, 'id'>) => {
      const newItem: ProjectItem = { ...proj, id: `proj-${Date.now()}` };
      setProjects((prev) => [newItem, ...prev]);
      notify(`Created local project "${proj.name}" in encrypted vault.`);
    },
    [notify],
  );

  const addTask = useCallback(
    (task: Omit<TaskItem, 'id'>) => {
      const newTask: TaskItem = { ...task, id: `task-${Date.now()}` };
      setTasks((prev) => [newTask, ...prev]);
      notify(`Added task "${task.title}" to local sync queue.`);
    },
    [notify],
  );

  const toggleTaskComplete = useCallback(
    (taskId: string) => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== taskId) return t;
          const nextStatus = t.status === 'Completed' ? 'In Progress' : 'Completed';
          return { ...t, status: nextStatus, timerActive: false };
        }),
      );
      notify('Task status committed to local SQLite WAL.', 'info');
    },
    [notify],
  );

  const toggleTaskTimer = useCallback((taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, timerActive: !t.timerActive } : t)),
    );
  }, []);

  const batchCompleteDueToday = useCallback(() => {
    setTasks((prev) =>
      prev.map((t) => (t.status === 'Due Today' ? { ...t, status: 'Completed' } : t)),
    );
    notify('Completed all Due Today tasks locally.');
  }, [notify]);

  const markMessageRead = useCallback((id: string) => {
    setInboxMessages((prev) => prev.map((m) => (m.id === id ? { ...m, unread: false } : m)));
  }, []);

  const markAllInboxRead = useCallback(() => {
    setInboxMessages((prev) => prev.map((m) => ({ ...m, unread: false })));
    notify('All inbox dispatches marked as read.');
  }, [notify]);

  const sendInboxReply = useCallback(
    (id: string, text: string) => {
      if (!text.trim()) return;
      setInboxMessages((prev) =>
        prev.map((m) =>
          m.id === id
            ? {
                ...m,
                unread: false,
                replies: [
                  ...m.replies,
                  { author: 'Manav A.', text: text.trim(), time: 'Just now (E2EE)' },
                ],
              }
            : m,
        ),
      );
      notify('Encrypted reply dispatched over local peer mesh.');
    },
    [notify],
  );

  const approveAndMergePR = useCallback(
    (id: string) => {
      setInboxMessages((prev) =>
        prev.map((m) =>
          m.id === id
            ? {
                ...m,
                unread: false,
                actionRequired: false,
                badgeText: 'Approved & Merged',
                badgeTone: 'success',
                replies: [
                  ...m.replies,
                  {
                    author: 'Manav A.',
                    text: 'Signed approval hash attached. Fast-forward merged to main.',
                    time: 'Just now',
                  },
                ],
              }
            : m,
        ),
      );
      notify('One-click approval hash verified & PR merged.');
    },
    [notify],
  );

  const toggleMeetingAction = useCallback((id: string) => {
    setMeetingActions((prev) => prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a)));
  }, []);

  const addMeetingAction = useCallback(
    (text: string, assignee = 'Manav A.') => {
      if (!text.trim()) return;
      setMeetingActions((prev) => [
        ...prev,
        {
          id: `ma-${Date.now()}`,
          text: text.trim(),
          assignee,
          meta: 'Extracted locally',
          confidence: 96,
          done: false,
        },
      ]);
      notify('Action item captured in meeting pad.');
    },
    [notify],
  );

  const pushMeetingActionsToTasks = useCallback(() => {
    const pending = meetingActions.filter((a) => !a.done);
    if (pending.length === 0) {
      notify('All extracted action items are already completed.', 'info');
      return;
    }
    const created: TaskItem[] = pending.map((a, idx) => ({
      id: `task-ma-${Date.now()}-${idx}`,
      title: a.text,
      assignee: a.assignee,
      assigneeInitials: a.assignee
        .split(' ')
        .map((s) => s[0])
        .join('')
        .slice(0, 2),
      project: 'Arc Company',
      dueDate: 'Thu, 17:00',
      priority: 'High',
      status: 'Due Today',
      tags: ['#meeting-sync', '#ai-extracted'],
    }));
    setTasks((prev) => [...created, ...prev]);
    notify(`Pushed ${created.length} action items to My Tasks queue.`);
  }, [meetingActions, notify]);

  const addCalendarEvent = useCallback(
    (ev: Omit<CalendarEvent, 'id'>) => {
      setCalendarEvents((prev) => [...prev, { ...ev, id: `cal-${Date.now()}` }]);
      notify(`Scheduled "${ev.title}" in local vault calendar.`);
    },
    [notify],
  );

  const lockFocusWindows = useCallback(() => {
    if (focusWindowsLocked) {
      notify('Focus windows are already shielded.', 'info');
      return;
    }
    setFocusWindowsLocked(true);
    setCalendarEvents((prev) => [
      ...prev,
      {
        id: `cal-focus-am-${Date.now()}`,
        title: 'Shielded Deep Work Window',
        subtitle: 'Manav.AI Auto-Locked',
        day: 'Wed',
        dayNum: 23,
        startHour: 10,
        durationHours: 2,
        source: 'ai-buffer',
        variant: 'focus',
        badge: 'Locked Focus',
      },
    ]);
    notify('Locked 2 uninterrupted focus windows (10–12 PM & 3–5 PM).');
  }, [focusWindowsLocked, notify]);

  const addDocument = useCallback(
    (doc: Omit<DocumentItem, 'id'>) => {
      setDocuments((prev) => [{ ...doc, id: `doc-${Date.now()}` }, ...prev]);
      notify(`Encrypted & indexed "${doc.name}" locally.`);
    },
    [notify],
  );

  const removeDocument = useCallback(
    (id: string) => {
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      notify('Removed document from active RAG index.', 'info');
    },
    [notify],
  );

  const sendAiPrompt = useCallback(
    (prompt: string) => {
      const clean = prompt.trim();
      if (!clean) return;
      const now = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const userMsg: AIChatMessage = {
        id: `ai-u-${Date.now()}`,
        role: 'user',
        sender: 'Manav A.',
        timestamp: now,
        text: clean,
      };

      const pendingCount = tasks.filter((t) => t.status !== 'Completed').length;
      const completedCount = tasks.filter((t) => t.status === 'Completed').length;
      const lower = clean.toLowerCase();

      let replyText = `Analyzed your local vault (${projects.length} active projects, ${pendingCount} pending tasks, ${completedCount} completed) completely on-device with zero outbound telemetry. `;
      if (lower.includes('standup') || lower.includes('report') || lower.includes('task')) {
        replyText += `Top priority right now is "${tasks[0]?.title ?? 'Design system sync'}" followed by the Arc Company Sprint Planning chamber at 02:00 PM.`;
      } else if (lower.includes('primor') || lower.includes('efficiency') || lower.includes('velocity')) {
        replyText +=
          'Primor Project is at 72% completion (88.4% sprint velocity, +12% vs last cycle). Moving SQLite VFS calls to dedicated worker threads removes the last write-lock bottleneck.';
      } else if (lower.includes('team') || lower.includes('member')) {
        replyText +=
          '8 synced team members across Primor, Sullivan Mobile, and Trustworth Financial. Brandie S. has PR #1,842 ready for final enclave hash review.';
      } else {
        replyText +=
          'All indexed context documents (Product_Brief.txt, Q2_Roadmap.pdf, Architecture_Overview.md) verify clean ChaCha20-Poly1305 WAL persistence.';
      }

      const botMsg: AIChatMessage = {
        id: `ai-b-${Date.now() + 1}`,
        role: 'assistant',
        sender: 'Manav.AI',
        timestamp: now,
        model: 'Taskflow-Local-70B',
        metrics: '18ms • 194 tokens',
        text: replyText,
      };

      setAiMessages((prev) => [...prev, userMsg, botMsg]);
    },
    [projects.length, tasks],
  );

  const clearAiContext = useCallback(() => {
    setAiMessages([INITIAL_AI_MESSAGES[0]]);
    notify('Local inference context buffer cleared.', 'info');
  }, [notify]);

  const deployAiAction = useCallback(
    (messageId: string, actionId: string) => {
      setAiMessages((prev) =>
        prev.map((m) =>
          m.id === messageId && m.extractedActions
            ? {
                ...m,
                extractedActions: m.extractedActions.map((a) =>
                  a.id === actionId ? { ...a, status: 'Deployed' } : a,
                ),
              }
            : m,
        ),
      );
      notify('Action hook dispatched to local task runner.');
    },
    [notify],
  );

  const updateSettings = useCallback(
    (patch: Partial<SettingsState>) => {
      setSettings((prev) => ({ ...prev, ...patch }));
    },
    [],
  );

  const toggleNodeRole = useCallback(
    (id: string) => {
      setIamNodes((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...n,
                roleAuth: n.roleAuth.includes('Dept Lead') ? 'Staff Engineer' : 'Dept Lead (Eng)',
              }
            : n,
        ),
      );
      notify('Updated peer node RBAC clearance locally.');
    },
    [notify],
  );

  const revokeNode = useCallback(
    (id: string) => {
      setIamNodes((prev) => prev.filter((n) => n.id !== id));
      notify('Revoked hardware node key & closed WebRTC peer channel.', 'warning');
    },
    [notify],
  );

  return (
    <WorkspaceContext.Provider
      value={{
        activePage,
        navigate,
        meetingSubView,
        setMeetingSubView,
        openMeetingChamber,
        activeMeetingTitle,
        profileRole,
        setProfileRole,
        projects,
        addProject,
        tasks,
        addTask,
        toggleTaskComplete,
        toggleTaskTimer,
        batchCompleteDueToday,
        inboxMessages,
        markMessageRead,
        markAllInboxRead,
        sendInboxReply,
        approveAndMergePR,
        meetings,
        meetingActions,
        toggleMeetingAction,
        addMeetingAction,
        pushMeetingActionsToTasks,
        calendarEvents,
        addCalendarEvent,
        lockFocusWindows,
        focusWindowsLocked,
        documents,
        addDocument,
        removeDocument,
        aiMessages,
        sendAiPrompt,
        clearAiContext,
        deployAiAction,
        settings,
        updateSettings,
        iamNodes,
        toggleNodeRole,
        revokeNode,
        privacyModalOpen,
        setPrivacyModalOpen,
        commandPaletteOpen,
        setCommandPaletteOpen,
        quickCreateOpen,
        quickCreateTab,
        openQuickCreate,
        setQuickCreateOpen,
        previewDoc,
        setPreviewDoc,
        screenShareOpen,
        setScreenShareOpen,
        activeScreenName,
        setActiveScreenName,
        toasts,
        notify,
        dismissToast,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used inside WorkspaceProvider');
  return ctx;
}
