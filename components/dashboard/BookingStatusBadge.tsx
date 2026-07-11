import { BookingStatus } from '@/types/booking';

const statusStyles: Record<BookingStatus, string> = {
  'Đã xác nhận': 'bg-emerald-100 text-emerald-800',
  Chờ: 'bg-amber-100 text-amber-800',
  Huỷ: 'bg-rose-100 text-rose-800',
};

export default function BookingStatusBadge({
  status,
  className = '',
}: {
  status: BookingStatus;
  className?: string;
}) {
  const styles = statusStyles[status] ?? 'bg-slate-100 text-slate-700';

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles} ${className}`}>
      {status}
    </span>
  );
}
