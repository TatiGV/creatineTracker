import { useState, useCallback } from 'react';
import { type CreatineEntry, loadEntries, saveEntry } from '../models/CreatineEntry';

function localDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function localTimeStr(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

export function useCreatineViewModel() {
  const today = new Date();
  const todayStr = localDateStr(today);

  const [entries, setEntries] = useState<CreatineEntry[]>(() => loadEntries());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [pickerDate, setPickerDate] = useState<string | null>(null);

  const toggleCalendar = useCallback(() => {
    setCalendarOpen(v => !v);
  }, []);

  const handleDayClick = useCallback(
    (dateStr: string) => {
      if (dateStr > todayStr) return;

      if (dateStr === todayStr) {
        saveEntry(dateStr, localTimeStr(new Date()));
        setEntries(loadEntries());
        setCalendarOpen(false);
      } else {
        setPickerDate(dateStr);
      }
    },
    [todayStr]
  );

  const handleTimePick = useCallback(
    (time: string) => {
      if (!pickerDate) return;
      saveEntry(pickerDate, time);
      setEntries(loadEntries());
      setPickerDate(null);
      setCalendarOpen(false);
    },
    [pickerDate]
  );

  const closeTimePicker = useCallback(() => setPickerDate(null), []);

  const prevMonth = useCallback(() => {
    setViewMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }, []);

  const nextMonth = useCallback(() => {
    setViewMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }, []);

  const loggedDates = new Set(entries.map(e => e.date));

  return {
    entries,
    calendarOpen,
    toggleCalendar,
    viewMonth,
    prevMonth,
    nextMonth,
    todayStr,
    pickerDate,
    handleDayClick,
    handleTimePick,
    closeTimePicker,
    loggedDates,
  };
}
