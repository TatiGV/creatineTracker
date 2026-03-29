const TIMES: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 === 0 ? '00' : '30';
  return `${String(h).padStart(2, '0')}:${m}`;
});

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

interface TimePickerViewProps {
  date: string;
  onSelect: (time: string) => void;
  onClose: () => void;
}

export function TimePickerView({ date, onSelect, onClose }: TimePickerViewProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-2xl p-5 w-64 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-white font-semibold text-sm">{formatDate(date)}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl leading-none ml-2"
          >
            ×
          </button>
        </div>
        <p className="text-gray-500 text-xs mb-3">Select a time</p>

        <div className="h-60 overflow-y-auto space-y-0.5 pr-1">
          {TIMES.map(t => (
            <button
              key={t}
              onClick={() => onSelect(t)}
              className="w-full text-left px-4 py-2 rounded-lg text-gray-200 hover:bg-green-500 hover:text-white text-sm transition-colors"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
