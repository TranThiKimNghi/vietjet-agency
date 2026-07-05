export type AuthState = {
  isAuthenticated: boolean;
  username?: string;
};

const STORAGE_KEY = 'vj_auth';

export function setAuth(state: AuthState) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('[AuthClient] Failed to save auth state:', e);
  }
}

export function getAuth(): AuthState | null {
  try {
    if (typeof window === 'undefined') return null;

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return null;

    return JSON.parse(raw) as AuthState;
  } catch (e) {
    console.error('[AuthClient] Failed to read auth state:', e);
    return null;
  }
}

export function clearAuth() {
  try {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('[AuthClient] Failed to clear auth state:', e);
  }
}

export function isAuthenticated(): boolean {
  const auth = getAuth();
  return Boolean(auth?.isAuthenticated);
}