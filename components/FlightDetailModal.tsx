import { useEffect } from 'react';
import { Flight } from '@/types/dashboard';

export default function FlightDetailModal({
  flight,
  onClose,
}: {
  flight: Flight | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!flight) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Chi tiết chuyến bay</h3>
            <p className="text-sm text-slate-600">Mã: {flight.flightCode}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="rounded-full bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Tuyến bay</p>
            <p className="mt-1 font-medium text-slate-900">{flight.route}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Giờ khởi hành</p>
            <p className="mt-1 font-medium text-slate-900">{flight.departureTime}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Cổng</p>
            <p className="mt-1 font-medium text-slate-900">{flight.gate}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Loại chuyến</p>
            <p className="mt-1 font-medium text-slate-900">{flight.flightType}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Trạng thái</p>
            <p className="mt-1 font-medium text-slate-900">{flight.status}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Giá</p>
            <p className="mt-1 font-medium text-slate-900">{flight.price.toLocaleString('vi-VN')} ₫</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
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
