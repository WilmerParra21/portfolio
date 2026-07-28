import { ref } from 'vue';

const siteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;
const turnstileToken = ref('');
const turnstileWidgetId = ref<string | null>(null);

function onTurnstileSuccess(token: string) {
  turnstileToken.value = token;
}

function onTurnstileError() {
  turnstileToken.value = '';
}

function onTurnstileExpired() {
  turnstileToken.value = '';
}

function resetTurnstile() {
  turnstileToken.value = '';
  if (turnstileWidgetId.value && typeof window !== 'undefined' && window.turnstile) {
    window.turnstile.reset(turnstileWidgetId.value);
  }
}

export function useTurnstile() {
  return {
    siteKey,
    turnstileToken,
    turnstileWidgetId,
    onTurnstileSuccess,
    onTurnstileError,
    onTurnstileExpired,
    resetTurnstile,
  };
}

declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark';
        }
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}
