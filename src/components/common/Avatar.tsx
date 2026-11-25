import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  initials: string;
  className?: string;
  fallbackClassName?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initials,
  className = 'w-8 h-8 rounded-full object-cover',
  fallbackClassName = 'bg-surface-container-highest text-on-surface font-bold text-[11px]',
}) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        aria-label={alt}
        className={`${className} ${fallbackClassName} flex items-center justify-center shrink-0 select-none`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
};
