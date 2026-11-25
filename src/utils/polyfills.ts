/**
 * Conditionally loads progressive-enhancement polyfills only when native browser
 * support is missing, adhering to modern-web-guidance recommendations.
 */
export function initProgressivePolyfills(): void {
  if (typeof window === 'undefined') return;

  // 1. Popover API polyfill (only when HTMLElement.prototype.popover is missing)
  if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
    void import('@oddbird/popover-polyfill').catch(() => {
      // Optional graceful degradation
    });
  }

  // 2. Native <input type="checkbox" switch> polyfill (Chrome/Edge/Firefox fallback)
  if (!('switch' in HTMLInputElement.prototype)) {
    void import('input-switch-polyfill').catch(() => {
      // Fallback CSS handles checkbox visuals if unavailable
    });
  }
}

/**
 * Attaches light-dismiss fallback for <dialog closedby="any"> in browsers
 * (e.g. Safari) that do not yet implement the `closedBy` property.
 */
export function attachDialogClosedByFallback(dialog: HTMLDialogElement): () => void {
  if ('closedBy' in HTMLDialogElement.prototype) {
    return () => {};
  }

  const isOutside = (e: PointerEvent) => {
    const r = dialog.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };

  let pressedOutside = false;
  const onPointerDown = (e: PointerEvent) => {
    pressedOutside = isOutside(e);
  };
  const onPointerUp = (e: PointerEvent) => {
    if (pressedOutside && isOutside(e)) {
      dialog.close();
    }
    pressedOutside = false;
  };

  dialog.addEventListener('pointerdown', onPointerDown);
  dialog.addEventListener('pointerup', onPointerUp);

  return () => {
    dialog.removeEventListener('pointerdown', onPointerDown);
    dialog.removeEventListener('pointerup', onPointerUp);
  };
}
