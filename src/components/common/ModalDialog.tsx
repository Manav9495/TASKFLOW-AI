import React, { useEffect, useRef } from 'react';
import { attachDialogClosedByFallback } from '../../utils/polyfills';

interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  titleId: string;
  children: React.ReactNode;
  maxWidthClass?: string;
  lightDismiss?: boolean;
}

/**
 * Native <dialog> modal wrapper following modern-web-guidance:
 * - Opened with showModal() for native top-layer, inert backdrop, focus containment, and Esc handling.
 * - Uses closedby="any" + pointer boundary fallback when lightDismiss is true.
 * - Never adds redundant role="dialog" or aria-modal="true".
 */
export const ModalDialog: React.FC<ModalDialogProps> = ({
  open,
  onClose,
  titleId,
  children,
  maxWidthClass = 'max-w-lg',
  lightDismiss = true,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      onClose();
    };

    dialog.addEventListener('close', handleClose);
    const cleanupFallback = lightDismiss ? attachDialogClosedByFallback(dialog) : () => {};

    return () => {
      dialog.removeEventListener('close', handleClose);
      cleanupFallback();
    };
  }, [lightDismiss, onClose]);

  const dialogExtraAttrs = lightDismiss ? ({ closedby: 'any' } as Record<string, string>) : {};

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className={`w-full ${maxWidthClass} rounded-2xl shadow-2xl bg-transparent p-0`}
      {...dialogExtraAttrs}
    >
      {open ? children : null}
    </dialog>
  );
};
