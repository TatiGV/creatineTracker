const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DOW_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarViewProps {
  viewMonth: Date;
  todayStr: string;
  loggedDates: Set<string>;
  onDayClick: (dateStr: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarView({
  viewMonth,
  todayStr,
  loggedDates,
  onDayClick,
  onPrevMonth,
  onNextMonth,
}: CalendarViewProps) {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();

  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array<null>(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div className="bg-gray-800 rounded-2xl p-4 w-72 shadow-xl">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrevMonth}
          className="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-700 transition-colors text-xl leading-none"
        >
          ‹
        </button>
        <span className="text-white font-semibold">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          onClick={onNextMonth}
          className="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-700 transition-colors text-xl leading-none"
        >
          ›
        </button>
      </div>

      {/* Day-of-week labels */}
      <div className="grid grid-cols-7 mb-1">
        {DOW_LABELS.map(d => (
          <span key={d} className="text-center text-xs text-gray-500 py-1">
            {d}
          </span>
        ))}
      </div>

      {/* Day grid */}
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7">
          {week.map((day, di) => {
            if (!day) return <div key={di} className="h-9" />;

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = dateStr === todayStr;
            const isPast = dateStr < todayStr;
            const isFuture = dateStr > todayStr;
            const isLogged = loggedDates.has(dateStr);

            let cls =
              'relative flex items-center justify-center h-9 w-9 mx-auto rounded-full text-sm font-medium transition-colors ';
            if (isToday)
              cls += 'bg-green-500 text-white hover:bg-green-400 cursor-pointer';
            else if (isPast)
              cls += 'text-gray-300 hover:bg-gray-700 cursor-pointer';
            else
              cls += 'text-gray-600 cursor-default';

            return (
              <div key={di} className="flex justify-center py-0.5">
                <div
                  className={cls}
                  onClick={() => !isFuture && onDayClick(dateStr)}
                >
                  {day}
                  {isLogged && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
