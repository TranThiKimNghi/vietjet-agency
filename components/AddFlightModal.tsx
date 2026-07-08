import { useState } from 'react';
import { Flight } from '@/types/dashboard';

export default function AddFlightModal({
  onClose,
  onAdd,
  initialFlight,
}: {
  onClose: () => void;
  onAdd: (flight: Flight) => void;
  initialFlight?: Flight | null;
}) {
  const [flightCode, setFlightCode] = useState(initialFlight?.flightCode ?? '');
  const [route, setRoute] = useState(initialFlight?.route ?? '');
  const [departureTime, setDepartureTime] = useState(initialFlight?.departureTime ?? '');
  const [gate, setGate] = useState(initialFlight?.gate ?? '');
  const [status, setStatus] = useState<'Đã mở cửa' | 'Trễ' | 'Đã đóng cửa' | 'Giờ cất cánh' | 'Sắp khởi hành'>(initialFlight?.status ?? 'Sắp khởi hành');
  const [flightType, setFlightType] = useState<'Nội địa' | 'Quốc tế'>(initialFlight?.flightType ?? 'Nội địa');
  const [price, setPrice] = useState<number | ''>(initialFlight?.price ?? '');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!flightCode.trim() || !route.trim() || !departureTime.trim() || !gate.trim()) {
      setError('Vui lòng điền tất cả các trường bắt buộc.');
      return;
    }

    if (price === '' || Number(price) <= 0) {
      setError('Giá phải là số lớn hơn 0.');
      return;
    }

    const newFlight: Flight = {
      flightCode: flightCode.trim(),
      route: route.trim(),
      departureTime: departureTime.trim(),
      gate: gate.trim(),
      status,
      flightType,
      price: Number(price),
    };

    onAdd(newFlight);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Thêm chuyến bay mới</h3>
          <button type="button" onClick={onClose} className="rounded-full bg-slate-100 p-2">
            ✕
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <div className="text-sm text-slate-600">Mã chuyến *</div>
            <input value={flightCode} onChange={(e) => setFlightCode(e.target.value)} className="mt-1 w-full rounded-3xl border border-slate-200 px-3 py-2" />
          </label>

          <label className="block">
            <div className="text-sm text-slate-600">Tuyến *</div>
            <input value={route} onChange={(e) => setRoute(e.target.value)} className="mt-1 w-full rounded-3xl border border-slate-200 px-3 py-2" />
          </label>

          <label className="block">
            <div className="text-sm text-slate-600">Giờ khởi hành *</div>
            <input value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} placeholder="HH:MM" className="mt-1 w-full rounded-3xl border border-slate-200 px-3 py-2" />
          </label>

          <label className="block">
            <div className="text-sm text-slate-600">Gate *</div>
            <input value={gate} onChange={(e) => setGate(e.target.value)} className="mt-1 w-full rounded-3xl border border-slate-200 px-3 py-2" />
          </label>

          <label className="block">
            <div className="text-sm text-slate-600">Loại chuyến</div>
            <select value={flightType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFlightType(e.target.value as 'Nội địa' | 'Quốc tế')} className="mt-1 w-full rounded-3xl border border-slate-200 px-3 py-2">
              <option value="Nội địa">Nội địa</option>
              <option value="Quốc tế">Quốc tế</option>
            </select>
          </label>

          <label className="block">
            <div className="text-sm text-slate-600">Trạng thái</div>
            <select value={status} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as 'Đã mở cửa' | 'Trễ' | 'Đã đóng cửa' | 'Giờ cất cánh' | 'Sắp khởi hành')} className="mt-1 w-full rounded-3xl border border-slate-200 px-3 py-2">
              <option value="Đã mở cửa">Đã mở cửa</option>
              <option value="Trễ">Trễ</option>
              <option value="Đã đóng cửa">Đã đóng cửa</option>
              <option value="Giờ cất cánh">Giờ cất cánh</option>
              <option value="Sắp khởi hành">Sắp khởi hành</option>
            </select>
          </label>

          <label className="block sm:col-span-2">
            <div className="text-sm text-slate-600">Giá (VNĐ) *</div>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
              type="number"
              min={0}
              className="mt-1 w-full rounded-3xl border border-slate-200 px-3 py-2"
            />
          </label>
        </div>

        {error ? <div className="mt-3 text-sm text-red-600">{error}</div> : null}

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-3xl border border-slate-200 bg-white px-4 py-2">
            Hủy
          </button>
          <button type="submit" className="rounded-3xl bg-slate-900 px-4 py-2 text-white">
            Thêm chuyến bay
          </button>
        </div>
      </form>
    </div>
  );
}
