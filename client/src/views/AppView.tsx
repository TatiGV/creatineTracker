import { useCreatineViewModel } from '../viewmodels/useCreatineViewModel';
import { CalendarView } from './CalendarView';
import { TimePickerView } from './TimePickerView';

export function AppView() {
  const {
    entries,
    viewMonth,
    prevMonth,
    nextMonth,
    todayStr,
    pickerDate,
    handleDayClick,
    handleTimePick,
    closeTimePicker,
    loggedDates,
    confirmDeleteId,
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
  } = useCreatineViewModel();

  const confirmEntry = entries.find(e => e.id === confirmDeleteId);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-16 px-4">
      <h1 className="text-4xl font-bold text-green-500 mb-10">Creatine Tracker</h1>

      <CalendarView
        viewMonth={viewMonth}
        todayStr={todayStr}
        loggedDates={loggedDates}
        onDayClick={handleDayClick}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />

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
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-sm font-mono">{e.time}</span>
                  <button
                    onClick={() => handleDeleteClick(e.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                    aria-label="Delete entry"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-6 mx-4 w-full max-w-xs shadow-xl">
            <h3 className="text-white font-semibold text-lg mb-2">Delete entry?</h3>
            {confirmEntry && (
              <p className="text-gray-400 text-sm mb-6">
                {confirmEntry.date} at {confirmEntry.time}
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-medium py-2 rounded-xl transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
