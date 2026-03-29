import { useAppViewModel } from '../viewmodels/useAppViewModel';

export function AppView() {
  const { title } = useAppViewModel();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827' }}>
      <h1 style={{ color: '#22c55e', textAlign: 'center', paddingTop: '2rem', fontSize: '2.25rem', fontWeight: 'bold' }} className="text-4xl font-bold text-green-500 text-center pt-8">{title}</h1>
    </div>
  );
}
