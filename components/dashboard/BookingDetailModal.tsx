import { useEffect } from 'react';
import { Booking } from '@/types/booking';

export default function BookingDetailModal({
  booking,
  onClose,
}: {
  booking: Booking | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Chi tiết Booking</h3>
            <p className="mt-1 text-sm text-slate-600">Mã vé: {booking.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="rounded-full bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Hành khách</p>
            <p className="mt-1 font-medium text-slate-900">{booking.passenger}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Từ</p>
            <p className="mt-1 font-medium text-slate-900">{booking.from}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Đến</p>
            <p className="mt-1 font-medium text-slate-900">{booking.to}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Ngày bay</p>
            <p className="mt-1 font-medium text-slate-900">{booking.date}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Hạng</p>
            <p className="mt-1 font-medium text-slate-900">{booking.seat}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Giá</p>
            <p className="mt-1 font-medium text-slate-900">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(booking.price)}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-slate-500">Trạng thái</p>
            <p className="mt-1 font-medium text-slate-900">{booking.status}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
