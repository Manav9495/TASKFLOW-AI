import React from 'react';

interface SwitchControlProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  badge?: string;
  icon?: string;
  auditTag?: string;
}

/**
 * Native HTML <input type="checkbox" switch> paired with <label>,
 * backed by conditional input-switch-polyfill in browsers lacking native switch support.
 */
export const SwitchControl: React.FC<SwitchControlProps> = ({
  id,
  checked,
  onChange,
  label,
  description,
  badge,
  icon,
  auditTag,
}) => {
  const switchAttrs = { switch: '' } as Record<string, string>;

  return (
    <label
      htmlFor={id}
      className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-surface-container-low/75 hover:bg-surface-container-low transition-colors cursor-pointer"
    >
      <div className="flex items-start gap-3 min-w-0">
        {icon ? (
          <span className="material-symbols-outlined text-[19px] text-primary mt-0.5 shrink-0">
            {icon}
          </span>
        ) : null}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-label-md text-label-md font-semibold text-on-surface">
              {label}
            </span>
            {badge ? (
              <span className="font-code-inline text-[10px] px-2 py-0.5 rounded-full bg-secondary-container/60 text-on-secondary-container font-semibold uppercase tracking-wide">
                {badge}
              </span>
            ) : null}
          </div>
          {description ? (
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">
              {description}
            </p>
          ) : null}
          {auditTag ? (
            <p className="font-code-inline text-[11px] text-primary font-medium mt-1">
              {auditTag}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="cursor-pointer"
          {...switchAttrs}
        />
      </div>
    </label>
  );
};
