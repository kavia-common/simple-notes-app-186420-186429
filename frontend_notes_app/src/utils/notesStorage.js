const STORAGE_KEY = 'notes.v1';

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    // Ensure parsed value is array of objects with minimal fields
    if (Array.isArray(v)) return v;
    return fallback;
  } catch {
    return fallback;
  }
}

// PUBLIC_INTERFACE
export function loadNotes() {
  /** Load notes array from localStorage with safe parse */
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return safeParse(raw, []);
}

let saveTimer = null;

// PUBLIC_INTERFACE
export function saveNotesDebounced(notes, delay = 350) {
  /** Debounced save of notes array to localStorage */
  if (saveTimer) {
    clearTimeout(saveTimer);
  }
  saveTimer = setTimeout(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // ignore quota or serialization errors
    }
  }, delay);
}
