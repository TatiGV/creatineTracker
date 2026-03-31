export interface CreatineEntry {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
}

const STORAGE_KEY = 'creatine_entries';

export function loadEntries(): CreatineEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function saveEntry(date: string, time: string): CreatineEntry {
  const entries = loadEntries();
  const entry: CreatineEntry = { id: String(Date.now()), date, time };
  entries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return entry;
}

export function deleteEntry(id: string): void {
  const entries = loadEntries().filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}
