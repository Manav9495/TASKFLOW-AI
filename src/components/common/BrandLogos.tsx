import React from 'react';
import logoMarkImg from '../../assets/logo-mark.png';
import meetingLogoImg from '../../assets/meeting-logo.png';

/**
 * Brand icon mark derived from `src/logo/Modern Green Meeting Logo.png`,
 * used in the global navbar, auth pages, and compact headers.
 */
export const TaskflowLogoMark: React.FC<{ sizeClass?: string }> = ({ sizeClass = 'w-9 h-9' }) => (
  <div className={`${sizeClass} flex items-center justify-center shrink-0 select-none`}>
    <img
      src={logoMarkImg}
      alt="Taskflow AI logo"
      className="w-full h-full object-contain drop-shadow-sm"
    />
  </div>
);

/**
 * Meeting brand lockup using the trimmed full logo image (`meeting-logo.png`)
 * or the standalone square emblem (`logo-mark.png`) in compact mode.
 */
export const MeetingLogoWordmark: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <div className="inline-flex items-center justify-center select-none shrink-0">
    {compact ? (
      <img
        src={logoMarkImg}
        alt="Meeting"
        className="w-9 h-9 object-contain"
      />
    ) : (
      <img
        src={meetingLogoImg}
        alt="Meeting"
        className="h-9 w-auto max-w-[160px] object-contain"
      />
    )}
  </div>
);
