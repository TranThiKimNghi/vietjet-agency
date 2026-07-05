export type AuthState = {
  isAuthenticated: boolean;
  username?: string;
};

const STORAGE_KEY = 'vj_auth';

export function setAuth(state: AuthState, remember = true) {
  try {
    if (typeof window === 'undefined') return;

    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('[AuthClient] Failed to save auth state:', e);
  }
}

export function getAuth(): AuthState | null {
  try {
    if (typeof window === 'undefined') return null;

    const rawLocal = localStorage.getItem(STORAGE_KEY);
    if (rawLocal) {
      return JSON.parse(rawLocal) as AuthState;
    }

    const rawSession = sessionStorage.getItem(STORAGE_KEY);
    if (rawSession) {
      return JSON.parse(rawSession) as AuthState;
    }

    return null;
  } catch (e) {
    console.error('[AuthClient] Failed to read auth state:', e);
    return null;
  }
}

export function clearAuth() {
  try {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('[AuthClient] Failed to clear auth state:', e);
  }
}

export function isAuthenticated(): boolean {
  const auth = getAuth();
  return Boolean(auth?.isAuthenticated);
}