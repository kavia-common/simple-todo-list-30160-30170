function safeParse(json, fallback) {
  try { return JSON.parse(json); } catch { return fallback; }
}

/**
 * PUBLIC_INTERFACE
 * get - read from localStorage with fallback
 */
export function get(key, fallback = null) {
  if (typeof window === 'undefined') return fallback;
  const raw = window.localStorage.getItem(key);
  if (raw == null) return fallback;
  return safeParse(raw, fallback);
}

/**
 * PUBLIC_INTERFACE
 * set - write to localStorage
 */
export function set(key, value) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * PUBLIC_INTERFACE
 * remove - remove from localStorage
 */
export function remove(key) {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(key);
}
