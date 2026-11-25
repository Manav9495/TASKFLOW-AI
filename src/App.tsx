import React from 'react';
import { WorkspaceProvider, useWorkspace } from './context/WorkspaceContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToastHost } from './components/common/ToastHost';
import { PrivacyModal } from './components/modals/PrivacyModal';
import { CommandPaletteModal } from './components/modals/CommandPaletteModal';
import { QuickCreateModal } from './components/modals/QuickCreateModal';
import { DocPreviewModal } from './components/modals/DocPreviewModal';
import { ScreenShareModal } from './components/modals/ScreenShareModal';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { MyTasksPage } from './pages/MyTasksPage';
import { InboxPage } from './pages/InboxPage';
import { MeetingsPage } from './pages/MeetingsPage';
import { CalendarPage } from './pages/CalendarPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SignInPage, SignUpPage } from './pages/AuthPages';

const WorkspaceShell: React.FC = () => {
  const { activePage } = useWorkspace();

  if (activePage === 'login') {
    return (
      <>
        <SignInPage />
        <ToastHost />
      </>
    );
  }

  if (activePage === 'signup') {
    return (
      <>
        <SignUpPage />
        <ToastHost />
      </>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'my-tasks':
        return <MyTasksPage />;
      case 'inbox':
        return <InboxPage />;
      case 'meetings':
        return <MeetingsPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'ai-assistant':
        return <AIAssistantPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header />
      <main className="w-full pt-16 flex-1 bg-surface">{renderPage()}</main>
      <Footer />

      {/* Top-Layer Native <dialog> Modals */}
      <PrivacyModal />
      <CommandPaletteModal />
      <QuickCreateModal />
      <DocPreviewModal />
      <ScreenShareModal />

      {/* Non-blocking status toasts */}
      <ToastHost />
    </div>
  );
};

export function App() {
  return (
    <WorkspaceProvider>
      <WorkspaceShell />
    </WorkspaceProvider>
  );
}

export default App;
