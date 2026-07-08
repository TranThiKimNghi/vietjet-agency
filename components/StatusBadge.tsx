import { FlightStatus } from '@/types/dashboard';

const statusStyles: Record<FlightStatus, string> = {
  'Đã mở cửa': 'bg-green-100 text-green-800',
  'Trễ': 'bg-amber-100 text-amber-800',
  'Đã đóng cửa': 'bg-slate-100 text-slate-700',
  'Giờ cất cánh': 'bg-red-100 text-red-800',
  'Sắp khởi hành': 'bg-violet-100 text-violet-800',
};

export default function StatusBadge({
  status,
  className = '',
}: {
  status: FlightStatus;
  className?: string;
}) {
  const styles = statusStyles[status] ?? 'bg-slate-100 text-slate-700';
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles} ${className}`}>
      {status}
    </span>
  );
}
