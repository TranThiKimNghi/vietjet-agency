import { Booking } from '@/types/booking';

export default function BookingStatistics({ bookings }: { bookings: Booking[] }) {
  const total = bookings.length;

  const statusCounts = bookings.reduce<Record<string, number>>((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {});

  const seatCounts = bookings.reduce<Record<string, number>>((acc, booking) => {
    acc[booking.seat] = (acc[booking.seat] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Tổng Booking</p>
        <p className="mt-3 text-3xl font-semibold text-slate-900">{total}</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Theo trạng thái</p>
        <div className="mt-4 space-y-3">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="flex items-center justify-between text-sm text-slate-700">
              <span>{status}</span>
              <span className="font-semibold text-slate-900">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Theo loại vé</p>
        <div className="mt-4 space-y-3">
          {Object.entries(seatCounts).map(([seat, count]) => (
            <div key={seat} className="flex items-center justify-between text-sm text-slate-700">
              <span>{seat}</span>
              <span className="font-semibold text-slate-900">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
