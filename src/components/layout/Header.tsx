import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { AVATARS } from '../../data/mockWorkspace';
import { PageId } from '../../types/workspace';
import { Avatar } from '../common/Avatar';
import { TaskflowLogoMark } from '../common/BrandLogos';

const NAV_ITEMS: { id: PageId; label: string; icon?: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'projects', label: 'Projects' },
  { id: 'my-tasks', label: 'My Tasks' },
  { id: 'inbox', label: 'Inbox' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'documents', label: 'Documents' },
  { id: 'ai-assistant', label: 'AI Assistant', icon: 'auto_awesome' },
];

export const Header: React.FC = () => {
  const {
    activePage,
    navigate,
    setCommandPaletteOpen,
    setPrivacyModalOpen,
    inboxMessages,
    profileRole,
    setProfileRole,
    notify,
  } = useWorkspace();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const unreadCount = inboxMessages.filter((m) => m.unread).length;
  const popoverAttrs = { popover: 'auto' } as Record<string, string>;

  const activeUserLabel =
    profileRole === 'admin'
      ? { name: 'Bessie A.', sub: 'Admin (Ops) Enclave', avatar: AVATARS.bessie, initials: 'BA' }
      : profileRole === 'employee'
        ? { name: 'Brandie S.', sub: 'Lead Systems Enclave', avatar: AVATARS.brandie, initials: 'BS' }
        : { name: 'Manav A.', sub: 'Encrypted Session', avatar: AVATARS.manav, initials: 'MA' };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-md"
      style={{
        backgroundColor: 'rgba(248, 249, 255, 0.78)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.65)',
        boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.03)',
      }}
    >
      <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => navigate('dashboard')}
          className="flex items-center gap-3 shrink-0 text-left group"
        >
          <TaskflowLogoMark />
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              Taskflow<span className="text-primary ml-0.5">AI</span>
            </span>
            <span className="hidden 2xl:inline-block whitespace-nowrap font-label-sm text-label-sm bg-surface-container px-2.5 py-0.5 rounded-full text-on-surface-variant font-medium">
              v2.4 Local-first
            </span>
          </div>
        </button>

        {/* Primary Navigation */}
        <nav aria-label="Primary" className="flex items-center">
          {/* Mobile/Tablet Popover Trigger */}
          <button
            type="button"
            popoverTarget="mobile-primary-nav"
            popoverTargetAction="toggle"
            className="xl:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px] text-primary" aria-hidden="true">
              menu
            </span>
            <span className="capitalize">
              {NAV_ITEMS.find((i) => i.id === activePage)?.label ?? 'Menu'}
            </span>
          </button>

          {/* Narrow Popover Menu */}
          <ul
            id="mobile-primary-nav"
            className="xl:hidden w-64 rounded-2xl bg-surface-container-lowest p-2 shadow-xl border border-surface-container-high space-y-1"
            {...popoverAttrs}
          >
            {NAV_ITEMS.map((item) => {
              const isCurrent = activePage === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-current={isCurrent ? 'page' : undefined}
                    onClick={() => {
                      navigate(item.id);
                      const el = document.getElementById('mobile-primary-nav') as HTMLElement & {
                        hidePopover?: () => void;
                      };
                      el?.hidePopover?.();
                    }}
                    className={`w-full text-left px-3.5 py-2 rounded-xl font-label-md text-label-md flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-primary-container text-on-primary-container font-semibold glow-emerald'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      <span>{item.label}</span>
                    </span>
                    {item.icon && (
                      <span className="material-symbols-outlined text-[15px] text-primary">
                        {item.icon}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Wide Desktop Pill Nav */}
          <ul
            className="hidden xl:flex items-center gap-0.5 2xl:gap-1 p-1 rounded-full shadow-sm whitespace-nowrap"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.75)',
              boxShadow:
                'rgba(0, 0, 0, 0.03) 0px 2px 10px, rgba(255, 255, 255, 0.8) 0px 1px 1px inset',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isCurrent = activePage === item.id;
              return (
                <li key={item.id} className="shrink-0">
                  <button
                    type="button"
                    aria-current={isCurrent ? 'page' : undefined}
                    onClick={() => navigate(item.id)}
                    className={`whitespace-nowrap shrink-0 px-2.5 xl:px-3 2xl:px-3.5 py-1.5 rounded-full transition-all font-label-md text-label-md flex items-center gap-1.5 ${
                      isCurrent
                        ? 'bg-primary-container text-on-primary-container font-semibold glow-emerald'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest'
                    }`}
                  >
                    {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                    <span>{item.label}</span>
                    {item.id === 'inbox' && unreadCount > 0 && !isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-label={`${unreadCount} unread`} />
                    )}
                    {item.icon && (
                      <span className="material-symbols-outlined text-[14px] text-primary shrink-0">
                        {item.icon}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Utility Cluster */}
        <div className="flex items-center gap-2 2xl:gap-2.5 shrink-0 relative">
          {/* Global Command Search */}
          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden md:flex items-center bg-surface-container-low hover:bg-surface-container px-3 py-1.5 rounded-full w-44 2xl:w-56 gap-2 transition-all group text-left whitespace-nowrap shrink-0"
          >
            <span className="material-symbols-outlined text-outline text-[18px] group-hover:text-primary transition-colors">
              search
            </span>
            <span className="flex-1 font-body-sm text-body-sm text-outline truncate">
              Search workspace...
            </span>
            <kbd className="font-mono text-[11px] bg-surface-container-lowest text-on-surface-variant px-1.5 py-0.5 rounded-full shadow-sm select-none">
              ⌘K
            </kbd>
          </button>

          {/* Local Vault Pill */}
          <button
            type="button"
            onClick={() => setPrivacyModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 bg-surface-container-low hover:bg-surface-container px-2.5 min-[1340px]:px-3 py-1.5 rounded-full text-on-surface transition-colors whitespace-nowrap shrink-0"
            title="Inspect Local Encryption Core"
          >
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse shrink-0" />
            <span className="material-symbols-outlined text-[16px] text-primary shrink-0">lock</span>
            <span className="hidden min-[1340px]:inline sm:inline xl:hidden font-label-sm text-label-sm font-medium">
              Local Vault
            </span>
          </button>

          {/* Notifications & Settings */}
          <div className="flex items-center gap-1 bg-surface-container-low/60 p-0.5 rounded-full">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((p) => !p);
                  setProfileMenuOpen(false);
                }}
                className="relative p-1.5 rounded-full hover:bg-surface-container-lowest text-on-surface-variant hover:text-on-surface transition-colors"
                title="Notifications"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined text-[18px]">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary ring-2 ring-surface-container-lowest" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-surface-container-lowest shadow-xl border border-surface-container p-3 z-50 space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="font-label-md text-label-md font-bold text-on-surface">
                      Enclave Notifications
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setNotifOpen(false);
                        navigate('inbox');
                      }}
                      className="font-label-sm text-label-sm text-primary font-semibold hover:underline"
                    >
                      Open Inbox
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {inboxMessages.slice(0, 3).map((msg) => (
                      <button
                        key={msg.id}
                        type="button"
                        onClick={() => {
                          setNotifOpen(false);
                          navigate('inbox');
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-surface-container-low/70 hover:bg-surface-container transition-colors"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-on-surface">{msg.sender}</span>
                          <span className="text-outline">{msg.timestamp}</span>
                        </div>
                        <p className="font-label-sm text-label-sm text-on-surface-variant truncate mt-0.5">
                          {msg.title}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setNotifOpen(false);
                setProfileMenuOpen(false);
                navigate('settings');
              }}
              className={`p-1.5 rounded-full transition-colors ${
                activePage === 'settings'
                  ? 'bg-primary-container text-on-primary-container'
                  : 'hover:bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
              }`}
              title="System & Workspace Settings"
              aria-label="System & Workspace Settings"
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
            </button>
          </div>

          {/* Profile Switcher Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileMenuOpen((p) => !p);
                setNotifOpen(false);
              }}
              className="flex items-center gap-2 p-1 pr-2.5 bg-surface-container-low/80 hover:bg-surface-container rounded-full cursor-pointer transition-all group"
            >
              <Avatar
                src={activeUserLabel.avatar}
                alt={activeUserLabel.name}
                initials={activeUserLabel.initials}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container-lowest group-hover:ring-primary-container transition-all"
              />
              <div className="hidden 2xl:flex flex-col text-left">
                <span className="font-label-md text-label-md font-semibold text-on-surface leading-none group-hover:text-primary transition-colors">
                  {activeUserLabel.name}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-none mt-1">
                  {activeUserLabel.sub}
                </span>
              </div>
              <span className="material-symbols-outlined text-outline text-[16px] group-hover:text-on-surface transition-colors">
                expand_more
              </span>
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-surface-container-lowest shadow-xl border border-surface-container p-2 z-50 space-y-1">
                <div className="px-3 py-2 border-b border-surface-container-low">
                  <p className="font-label-md text-label-md font-bold text-on-surface">
                    {activeUserLabel.name}
                  </p>
                  <p className="font-code-inline text-[11px] text-primary">
                    Ed25519: 0x9f4a...7c2e
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setProfileRole('ceo');
                    setProfileMenuOpen(false);
                    navigate('profile');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-container-low flex items-center gap-2.5 font-label-md text-label-md text-on-surface"
                >
                  <span className="material-symbols-outlined text-[17px] text-primary">
                    shield_person
                  </span>
                  <span>CEO (Executive) Profile</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfileRole('admin');
                    setProfileMenuOpen(false);
                    navigate('profile');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-container-low flex items-center gap-2.5 font-label-md text-label-md text-on-surface"
                >
                  <span className="material-symbols-outlined text-[17px] text-primary">
                    admin_panel_settings
                  </span>
                  <span>Admin (Ops) — Bessie A.</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfileRole('employee');
                    setProfileMenuOpen(false);
                    navigate('profile');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-container-low flex items-center gap-2.5 font-label-md text-label-md text-on-surface"
                >
                  <span className="material-symbols-outlined text-[17px] text-outline">badge</span>
                  <span>Employee Profile View</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    navigate('settings');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-container-low flex items-center gap-2.5 font-label-md text-label-md text-on-surface"
                >
                  <span className="material-symbols-outlined text-[17px] text-outline">tune</span>
                  <span>Vault & System Settings</span>
                </button>

                <div className="pt-1 mt-1 border-t border-surface-container-low space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate('signup');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-container-low flex items-center gap-2.5 font-label-md text-label-md text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[17px] text-primary">
                      domain_add
                    </span>
                    <span>Create New Workspace</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      notify('Vault locked cleanly. Zero plaintext retained.', 'info');
                      navigate('login');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-error-container/60 flex items-center gap-2.5 font-label-md text-label-md text-error font-semibold"
                  >
                    <span className="material-symbols-outlined text-[17px]">lock</span>
                    <span>Lock Vault / Sign In UI</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
