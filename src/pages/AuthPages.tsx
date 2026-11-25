import React, { useMemo, useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { TaskflowLogoMark } from '../components/common/BrandLogos';
import { AVATARS } from '../data/mockWorkspace';
import { Avatar } from '../components/common/Avatar';

interface AuthShellProps {
  mode: 'login' | 'signup';
  children: React.ReactNode;
}

const AuthShell: React.FC<AuthShellProps> = ({ mode, children }) => {
  const { navigate, notify } = useWorkspace();

  return (
    <div className="min-h-screen bg-surface flex flex-col text-on-surface">
      {/* Compact Brand Header */}
      <header className="w-full border-b border-surface-container bg-surface-container-lowest/75 backdrop-blur-md">
        <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('dashboard')}
            className="flex items-center gap-2.5 shrink-0"
          >
            <TaskflowLogoMark />
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Taskflow<span className="text-primary ml-0.5">AI</span>
            </span>
            <span className="hidden sm:inline-block font-label-sm text-label-sm bg-surface-container px-2.5 py-0.5 rounded-full text-on-surface-variant font-medium">
              v2.4 Local-first
            </span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center p-0.5 rounded-full bg-surface-container">
              <button
                type="button"
                onClick={() => navigate('login')}
                className={`px-3.5 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                  mode === 'login'
                    ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => navigate('signup')}
                className={`px-3.5 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                  mode === 'signup'
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Create Workspace
              </button>
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low shadow-sm font-label-sm text-label-sm font-semibold text-primary whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              <span className="material-symbols-outlined text-[15px]">lock</span>
              Vault 256-AES Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Split Bento Stage */}
      <main className="flex-1 w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 py-5 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">{children}</div>
      </main>

      {/* Compact Enclave Footer Strip */}
      <footer className="w-full border-t border-surface-container bg-surface-container-lowest/70 py-3">
        <div className="w-full max-w-[1580px] mx-auto px-4 md:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-on-surface-variant font-label-sm text-label-sm">
          <span>© 2025 Taskflow AI • Zero-Knowledge AES-256-GCM Local Vault</span>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => notify('All cryptography executes locally with 0 bytes outbound.')}
              className="hover:text-on-surface transition-colors"
            >
              Security &amp; Privacy
            </button>
            <button
              type="button"
              onClick={() => navigate('dashboard')}
              className="hover:text-on-surface transition-colors"
            >
              Back to Workspace
            </button>
            <span className="inline-flex items-center gap-1.5 text-primary font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
              0 bytes cloud egress
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const SignInPage: React.FC = () => {
  const { navigate, notify } = useWorkspace();
  const [email, setEmail] = useState('alex.vance@arc-enterprise.io');
  const [password, setPassword] = useState('••••••••••••••••••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [demoPlaying, setDemoPlaying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    notify('Vault decrypted cleanly via TPM enclave. Welcome back!');
    navigate('dashboard');
  };

  return (
    <AuthShell mode="login">
      {/* Left Interactive Demo Panel (7 cols) */}
      <div className="lg:col-span-7 bg-surface-container-low/80 rounded-3xl p-6 lg:p-7 border border-surface-container flex flex-col justify-between gap-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-primary-container/60 text-on-primary-container font-code-inline text-[11px] font-bold">
              • LIVE DEMO
            </span>
            <span className="font-label-md text-label-md font-semibold text-on-surface">
              Autonomous Meeting &amp; Sprint Sync
            </span>
          </div>
          <div className="flex items-center gap-2 font-code-inline text-[11px] text-primary">
            <span>Zero-Knowledge E2EE</span>
            <span>•</span>
            <span>Whisper Active</span>
          </div>
        </div>

        <div className="relative flex-1 min-h-[260px] rounded-2xl bg-[#10202e] overflow-hidden p-5 lg:p-6 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-[11px] font-mono text-white/80">
            <span>Node: Local_Chamber_04</span>
            <span className="px-2 py-0.5 rounded bg-primary/80 text-white">1080p • 60fps RAW</span>
          </div>

          <div className="my-auto flex flex-col items-center justify-center gap-3 py-6">
            <button
              type="button"
              onClick={() => setDemoPlaying((p) => !p)}
              aria-label={demoPlaying ? 'Pause walkthrough demo' : 'Play walkthrough demo'}
              className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
            >
              <span className="material-symbols-outlined text-[32px]">
                {demoPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <span className="font-code-inline text-xs text-primary-fixed">
              {demoPlaying ? 'Streaming CRDT Local-First Demo...' : 'Click to preview Vault Walkthrough'}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
              <div
                className="bg-primary-container h-full rounded-full transition-all duration-500"
                style={{ width: demoPlaying ? '68%' : '42%' }}
              />
            </div>
            <div className="flex justify-between font-code-inline text-[10px] text-white/70">
              <span>{demoPlaying ? '02:44' : '01:42'} / 04:15</span>
              <span className="text-primary-container">Latency: 12ms</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <div>
              <p className="font-headline-md text-headline-md font-bold text-on-surface">99.98%</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Local-First Engine Uptime
              </p>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">cloud_off</span>
            </div>
            <div>
              <p className="font-headline-md text-headline-md font-bold text-on-surface">Zero</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Cloud Egress &amp; PII Storage
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <Avatar
            src={AVATARS.alex}
            alt="Alex Vance"
            initials="AV"
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div>
            <p className="font-body-sm text-body-sm italic text-on-surface">
              &ldquo;Taskflow AI eliminated 14+ hours of manual meeting recaps each week across our
              250-node engineering org.&rdquo;
            </p>
            <p className="font-label-sm text-label-sm font-bold text-on-surface mt-1">
              Alex Vance • <span className="font-normal text-outline">VP of Infrastructure, Arc Co.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Sign-In Form Card (5 cols) */}
      <div className="lg:col-span-5 bg-surface-container-lowest rounded-3xl p-6 lg:p-8 shadow-md border border-surface-container/60 flex flex-col justify-between gap-4">
        <div className="space-y-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-low font-code-inline text-[11px] font-bold text-primary">
              • TASKFLOW AI ENTERPRISE v4.19
            </span>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-2">
              Welcome back to your Vault
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Authenticate into your local-first encrypted workspace.
            </p>
          </div>

          {/* SSO & Hardware Key Triggers */}
          <div className="space-y-2">
            {[
              { label: 'Continue with Google Workspace', badge: 'SAML 2.0', icon: 'account_circle' },
              { label: 'Continue with Okta / SAML SSO', badge: 'Managed', icon: 'domain' },
              { label: 'Hardware Key / WebAuthn', badge: 'YubiKey / Touch ID', icon: 'key' },
            ].map((sso) => (
              <button
                key={sso.label}
                type="button"
                onClick={() => {
                  notify(`Verified ${sso.label} enclave assertion.`);
                  navigate('dashboard');
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low/70 hover:bg-surface-container flex items-center justify-between font-label-md text-label-md font-semibold text-on-surface transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    {sso.icon}
                  </span>
                  <span>{sso.label}</span>
                </span>
                <span className="font-code-inline text-[11px] text-primary">{sso.badge}</span>
              </button>
            ))}
          </div>

          <div className="text-center font-label-sm text-label-sm text-outline">
            or continue with enterprise credentials
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label
                htmlFor="signin-email"
                className="block font-label-md text-label-md font-semibold text-on-surface mb-1"
              >
                Work Email
              </label>
              <input
                id="signin-email"
                name="email"
                type="email"
                autoComplete="username"
                spellCheck={false}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="signin-password"
                  className="font-label-md text-label-md font-semibold text-on-surface"
                >
                  Master Vault Passphrase
                </label>
                <button
                  type="button"
                  onClick={() => notify('Use your 12-word cold seed escrow to recover passphrase.', 'info')}
                  className="font-label-sm text-label-sm text-primary font-semibold hover:underline"
                >
                  Forgot passphrase?
                </button>
              </div>
              <div className="relative flex items-center">
                <input
                  id="signin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-11 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary-container"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <span>Remember this device for 30 days</span>
              </label>
              <span className="font-label-sm text-label-sm text-primary font-semibold">
                TPM Enclave
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-primary hover:bg-secondary text-on-primary font-headline-sm text-headline-sm font-bold shadow-md transition-colors"
            >
              Sign In to Workspace →
            </button>
          </form>
        </div>

        <div className="text-center space-y-1.5 pt-2 border-t border-surface-container-low">
          <p className="font-label-sm text-label-sm text-outline">
            Protected by AES-256-GCM local-first storage &amp; biometric enclave.
          </p>
          <p className="font-label-md text-label-md text-on-surface-variant">
            Don&apos;t have an enterprise account?{' '}
            <button
              type="button"
              onClick={() => navigate('signup')}
              className="text-primary font-bold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </AuthShell>
  );
};

export const SignUpPage: React.FC = () => {
  const { navigate, notify } = useWorkspace();
  const [fullName, setFullName] = useState('Masud Holt');
  const [email, setEmail] = useState('masud.holt@arc-company.co');
  const [org, setOrg] = useState('Arc Technologies Inc.');
  const [password, setPassword] = useState('SuperStrongVaultKey!2025');
  const [showPassword, setShowPassword] = useState(false);
  const [region, setRegion] = useState('US-East (Local-First On-Device SQLite & Edge Sync)');
  const [agreed, setAgreed] = useState(true);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [speed, setSpeed] = useState('1.0x');

  const strengthLevel = useMemo(() => {
    if (password.length >= 16) return 4;
    if (password.length >= 10) return 3;
    if (password.length >= 6) return 2;
    return 1;
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    notify(`Provisioned AES-256 workspace "${org}" for ${fullName}!`);
    navigate('dashboard');
  };

  return (
    <AuthShell mode="signup">
      {/* Left Onboarding Form (5 cols) */}
      <div className="lg:col-span-5 bg-surface-container-lowest rounded-3xl p-6 lg:p-7 shadow-md border border-surface-container/60 flex flex-col justify-between gap-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-code-inline text-[11px] font-bold text-primary">
              • TASKFLOW AI ENTERPRISE
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-low font-code-inline text-[11px] text-on-surface-variant">
              v2.4-LOCAL
            </span>
          </div>

          <div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
              Create your Workspace
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Deploy an on-device, autonomous intelligence workspace in seconds.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                notify('Provisioned workspace via Google SSO.');
                navigate('dashboard');
              }}
              className="py-2 rounded-xl bg-surface-container-low hover:bg-surface-container font-label-md text-label-md font-semibold transition-colors"
            >
              Google SSO
            </button>
            <button
              type="button"
              onClick={() => {
                notify('Provisioned workspace via Okta / SAML 2.0.');
                navigate('dashboard');
              }}
              className="py-2 rounded-xl bg-surface-container-low hover:bg-surface-container font-label-md text-label-md font-semibold transition-colors"
            >
              Okta / SAML 2.0
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="signup-name"
                  className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1"
                >
                  Full Name
                </label>
                <input
                  id="signup-name"
                  name="fullname"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>
              <div>
                <label
                  htmlFor="signup-email"
                  className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1"
                >
                  Work Email
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  spellCheck={false}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="signup-org"
                className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1"
              >
                Organization Name
              </label>
              <input
                id="signup-org"
                name="organization"
                type="text"
                autoComplete="organization"
                required
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface-container-low font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="signup-pass"
                  className="font-label-sm text-label-sm font-semibold text-on-surface"
                >
                  Create Master Vault Password
                </label>
                <span className="font-label-sm text-[11px] text-primary font-semibold">
                  {strengthLevel >= 4 ? 'Cryptographically Strong' : 'Good'}
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  id="signup-pass"
                  name="new-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 rounded-xl bg-surface-container-low font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary-container"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1.5 mt-2">
                {[1, 2, 3, 4].map((bar) => (
                  <span
                    key={bar}
                    className={`h-1 rounded-full ${
                      bar <= strengthLevel ? 'bg-primary-container' : 'bg-surface-container'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="signup-region"
                className="block font-label-sm text-label-sm font-semibold text-on-surface mb-1"
              >
                Workspace Storage Region / Local Enclave
              </label>
              <select
                id="signup-region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface-container-low font-body-sm text-body-sm outline-none"
              >
                <option>US-East (Local-First On-Device SQLite &amp; Edge Sync)</option>
                <option>EU-Central (Frankfurt Sovereign Edge)</option>
                <option>Air-Gapped Local Machine Only</option>
              </select>
            </div>

            <label className="flex items-start gap-2 text-label-sm font-label-sm text-on-surface-variant cursor-pointer pt-0.5">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-primary"
              />
              <span>
                I agree to the{' '}
                <span className="text-primary font-semibold">Enterprise Terms of Service</span> and{' '}
                <span className="text-primary font-semibold">
                  Cryptographic Attestation Protocol
                </span>
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-primary hover:bg-secondary text-on-primary font-headline-sm text-headline-sm font-bold shadow-md transition-colors"
            >
              Create Local-First Workspace 🚀
            </button>
          </form>
        </div>

        <p className="text-center font-label-md text-label-md text-on-surface-variant pt-2 border-t border-surface-container-low">
          Already have an enterprise account?{' '}
          <button
            type="button"
            onClick={() => navigate('login')}
            className="text-primary font-bold hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>

      {/* Right Interactive Product Demo Walkthrough (7 cols) */}
      <div className="lg:col-span-7 bg-surface-container-low/80 rounded-3xl p-6 lg:p-7 border border-surface-container flex flex-col justify-between gap-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-code-inline text-code-inline text-on-surface font-semibold">
            DEMO_CLUSTER://live-instance-04.local
          </span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-secondary-container/60 text-on-secondary-container font-code-inline text-[10px] font-bold">
              CRDT SYNC ACTIVE
            </span>
            <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-code-inline text-[10px] font-bold">
              4K 60fps HDR
            </span>
          </div>
        </div>

        <div className="flex-1 min-h-[280px] rounded-2xl bg-[#10202e] p-5 lg:p-6 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-[11px] font-mono text-white">
            <span className="px-2.5 py-1 rounded-full bg-black/40">
              • Manav.AI Autonomous Agent {demoPlaying ? 'Streaming' : 'Working'}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-black/40 text-primary-container">
              0.04ms LATENCY
            </span>
          </div>

          <div className="my-auto text-center space-y-2.5 py-6">
            <button
              type="button"
              onClick={() => setDemoPlaying((p) => !p)}
              aria-label={demoPlaying ? 'Pause product demo' : 'Play product demo'}
              className="inline-flex w-14 h-14 rounded-full bg-primary text-white items-center justify-center shadow-xl hover:scale-105 transition-transform"
            >
              <span className="material-symbols-outlined text-[28px]">
                {demoPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <p className="font-label-md text-label-md text-white font-semibold">
              Interactive Product Demo Walkthrough
            </p>
            <p className="font-code-inline text-[11px] text-primary-fixed">
              {demoPlaying ? 'Playing encrypted P2P chamber preview...' : 'Click play to preview local SQLite + CRDT sync'}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
              <div
                className="bg-primary-container h-full rounded-full transition-all duration-500"
                style={{ width: demoPlaying ? '58%' : '26%' }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-white/75">
              <span>{demoPlaying ? '02:06' : '00:48'} / 03:38</span>
              <button
                type="button"
                onClick={() => setSpeed((s) => (s === '1.0x' ? '1.5x' : '1.0x'))}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white"
              >
                {speed}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              icon: 'forum',
              title: 'Chambers',
              desc: 'Autonomous meeting recaps & live edge transcription.',
            },
            {
              icon: 'calendar_month',
              title: 'Multi-Calendar',
              desc: 'Deep focus shielding with scheduled zero-interruption locks.',
            },
            {
              icon: 'database',
              title: 'Zero Telemetry',
              desc: '100% on-device SQLite storage with cryptographic integrity.',
            },
          ].map((f) => (
            <div key={f.title} className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">
                {f.icon}
              </span>
              <p className="font-label-md text-label-md font-bold text-on-surface mt-1.5">
                {f.title}
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-surface-container-lowest rounded-2xl px-4 py-3 shadow-sm flex flex-wrap items-center justify-between gap-2 text-label-sm font-label-sm">
          <span className="font-semibold text-on-surface">Trusted by teams at 450+ scale-ups</span>
          <span className="font-code-inline text-outline font-bold tracking-widest">
            POLYGON • KINETIC • SYNAPSE
          </span>
        </div>
      </div>
    </AuthShell>
  );
};
