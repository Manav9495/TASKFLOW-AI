export type PageId =
  | 'dashboard'
  | 'projects'
  | 'my-tasks'
  | 'inbox'
  | 'meetings'
  | 'calendar'
  | 'documents'
  | 'ai-assistant'
  | 'settings'
  | 'profile'
  | 'login'
  | 'signup';

export type MeetingSubView = 'notes' | 'vault' | 'chamber';
export type ProfileRole = 'ceo' | 'admin' | 'employee';

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  status: 'In Progress' | 'Active Sprint' | 'Review Pending' | 'Planning' | 'Backlog' | 'Completed';
  priority: 'High Priority' | 'Medium' | 'Normal';
  tags: string[];
  progress: number;
  tasksDueSoon: number;
  dueDate: string;
  startWeek: number;
  durationWeeks: number;
  team: { name: string; initials: string; avatar?: string }[];
  highlighted?: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  assignee: string;
  assigneeInitials: string;
  assigneeAvatar?: string;
  project: string;
  dueDate: string;
  priority: 'Urgent' | 'High' | 'Normal';
  status: 'Due Today' | 'In Progress' | 'Review Queue' | 'Completed';
  tags: string[];
  attachment?: string;
  attachmentIcon?: string;
  focusMinutes?: number;
  timerActive?: boolean;
  aiNote?: string;
}

export interface InboxMessage {
  id: string;
  sender: string;
  senderRole: string;
  senderEmail: string;
  senderAvatar?: string;
  senderInitials: string;
  timestamp: string;
  title: string;
  preview: string;
  project: string;
  category: 'Priority' | 'Mentions' | 'PRs & Commits' | 'Vault Status';
  unread: boolean;
  actionRequired: boolean;
  archived: boolean;
  badgeText?: string;
  badgeTone?: 'urgent' | 'info' | 'success';
  prNumber?: string;
  targetRelease?: string;
  bodyParagraphs: string[];
  codeBlock?: {
    filename: string;
    language: string;
    code: string;
  };
  artifacts?: {
    name: string;
    size: string;
    hashStatus: string;
    type: 'pdf' | 'json' | 'md';
  }[];
  smartReplies: string[];
  triageSummary: string[];
  replies: { author: string; text: string; time: string }[];
}

export interface MeetingSession {
  id: string;
  title: string;
  roomCode: string;
  timeRange: string;
  duration: string;
  status: 'live-soon' | 'done' | 'upcoming' | 'automated';
  summary: string;
  attendeesCount: number;
  tags: string[];
  hostNode?: string;
  platform?: string;
  type: 'Arc Company' | 'Internal';
  actionItemsCount?: number;
  transcriptWords?: number;
  aiSynthesis?: string;
}

export interface ActionItem {
  id: string;
  text: string;
  assignee: string;
  meta: string;
  confidence?: number;
  done: boolean;
  priority?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  subtitle: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  dayNum: number;
  startHour: number; // e.g. 9.5 for 09:30
  durationHours: number;
  source: 'sprints' | 'focus' | 'client' | 'ai-buffer';
  variant: 'standard' | 'focus' | 'dark-meeting' | 'design';
  badge?: string;
  tag?: string;
  done?: boolean;
  attendeesCount?: number;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'pdf' | 'txt' | 'md' | 'zip' | 'json' | 'rs';
  size: string;
  project: string;
  author: string;
  updatedAt: string;
  syncStatus: 'Synced local' | 'Vectorized' | 'RAG Staged' | 'In progress' | 'Encrypted';
  progress: number;
  sha256: string;
  contentPreview: string;
}

export interface AIChatMessage {
  id: string;
  role: 'assistant' | 'user';
  sender: string;
  timestamp: string;
  model?: string;
  metrics?: string;
  text: string;
  codeBlock?: {
    title: string;
    lines: string[];
  };
  extractedActions?: {
    id: string;
    detail: string;
    priority: 'High Priority' | 'Normal';
    status: 'Deploy' | 'Queued' | 'Deployed';
  }[];
}

export interface SettingsState {
  workspaceTitle: string;
  enclaveRegion: string;
  chamberTimezone: string;
  isoMilitaryTime: boolean;
  zeroTelemetryEgress: boolean;
  keyRotationInterval: string;
  lastKeyRotation: string;
  webAuthnChamberEntry: boolean;
  tpmSessionAttestation: boolean;
  inferenceRuntime: 'local-gguf' | 'hybrid-enclave' | 'air-gapped-server';
  whisperQuantization: 'INT4' | 'INT8' | 'FP16';
  autoGenerateTickets: boolean;
  autoPruneChambers: boolean;
  requireAdminSignOffForPR: boolean;
  enforcedFido2: boolean;
  ephemeralInactivityLock: boolean;
  zeroKnowledgeCloudFilter: boolean;
  crdtSignatureVerification: boolean;
}

export interface IAMNode {
  id: string;
  name: string;
  email: string;
  initials: string;
  roleAuth: string;
  hardwareCredential: string;
  sessionStatus: string;
  statusType: 'direct' | 'relay';
}
