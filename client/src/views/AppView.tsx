import { useCreatineViewModel } from '../viewmodels/useCreatineViewModel';
import { CalendarView } from './CalendarView';
import { TimePickerView } from './TimePickerView';

export function AppView() {
  const {
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
  } = useCreatineViewModel();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-16 px-4">
      <h1 className="text-4xl font-bold text-green-500 mb-10">Creatine Tracker</h1>

      <button
        onClick={toggleCalendar}
        className="bg-green-500 hover:bg-green-400 active:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl text-lg shadow-lg transition-colors"
      >
        {calendarOpen ? 'Close' : 'Log Dose'}
      </button>

      {calendarOpen && (
        <div className="mt-4">
          <CalendarView
            viewMonth={viewMonth}
            todayStr={todayStr}
            loggedDates={loggedDates}
            onDayClick={handleDayClick}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
          />
        </div>
      )}

      {pickerDate && (
        <TimePickerView
          date={pickerDate}
          onSelect={handleTimePick}
          onClose={closeTimePicker}
        />
      )}

      {entries.length > 0 && (
        <div className="mt-8 w-full max-w-xs">
          <h2 className="text-gray-400 text-sm font-medium mb-3">Recent logs</h2>
          <div className="space-y-2">
            {[...entries].reverse().slice(0, 5).map(e => (
              <div
                key={e.id}
                className="bg-gray-800 rounded-lg px-4 py-2 flex justify-between items-center"
              >
                <span className="text-gray-300 text-sm">{e.date}</span>
                <span className="text-green-400 text-sm font-mono">{e.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
