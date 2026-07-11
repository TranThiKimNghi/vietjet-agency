"use client";

import { FormEvent, useEffect, useState } from 'react';
import { Booking, BookingStatus } from '@/types/booking';

const statusOptions: BookingStatus[] = ['Đã xác nhận', 'Chờ', 'Huỷ'];
const seatOptions = ['Economy', 'Business', 'First Class'];

export default function BookingFormModal({
  initialBooking,
  onClose,
  onSubmit,
}: {
  initialBooking: Booking | null;
  onClose: () => void;
  onSubmit: (booking: Booking) => void;
}) {
  const [passenger, setPassenger] = useState(initialBooking?.passenger ?? '');
  const [from, setFrom] = useState(initialBooking?.from ?? '');
  const [to, setTo] = useState(initialBooking?.to ?? '');
  const [date, setDate] = useState(initialBooking?.date ?? '');
  const [seat, setSeat] = useState(initialBooking?.seat ?? 'Economy');
  const [status, setStatus] = useState<BookingStatus>(initialBooking?.status ?? 'Chờ');
  const [price, setPrice] = useState<number | ''>(initialBooking?.price ?? '');
  const [error, setError] = useState('');

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const trimmedPassenger = passenger.trim();
    const trimmedFrom = from.trim();
    const trimmedTo = to.trim();
    const trimmedSeat = seat.trim();

    if (!trimmedPassenger || !trimmedFrom || !trimmedTo || !date || !trimmedSeat) {
      setError('Vui lòng điền đầy đủ các trường bắt buộc.');
      return;
    }

    if (price === '' || Number(price) <= 0) {
      setError('Giá vé phải là số lớn hơn 0.');
      return;
    }

    const booking: Booking = {
      id: initialBooking?.id ?? '',
      passenger: trimmedPassenger,
      from: trimmedFrom,
      to: trimmedTo,
      date,
      seat: trimmedSeat,
      status,
      price: Number(price),
    };

    onSubmit(booking);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              {initialBooking ? 'Chỉnh sửa booking' : 'Thêm booking mới'}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {initialBooking ? 'Cập nhật thông tin booking hiện tại.' : 'Tạo booking mới bằng dữ liệu mock.'}
            </p>
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
          <label className="block">
            <span className="text-sm text-slate-600">Hành khách *</span>
            <input
              value={passenger}
              onChange={(event) => setPassenger(event.target.value)}
              className="mt-1 w-full rounded-3xl border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Điểm khởi hành *</span>
            <input
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              className="mt-1 w-full rounded-3xl border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Điểm đến *</span>
            <input
              value={to}
              onChange={(event) => setTo(event.target.value)}
              className="mt-1 w-full rounded-3xl border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Ngày bay *</span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="mt-1 w-full rounded-3xl border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Hạng vé *</span>
            <select
              value={seat}
              onChange={(event) => setSeat(event.target.value)}
              className="mt-1 w-full rounded-3xl border border-slate-200 px-3 py-2 text-sm"
            >
              {seatOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Trạng thái</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as BookingStatus)}
              className="mt-1 w-full rounded-3xl border border-slate-200 px-3 py-2 text-sm"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm text-slate-600">Giá vé (VNĐ) *</span>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(event) => setPrice(event.target.value === '' ? '' : Number(event.target.value))}
              className="mt-1 w-full rounded-3xl border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
        </div>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            {initialBooking ? 'Lưu thay đổi' : 'Thêm booking'}
          </button>
        </div>
      </form>
    </div>
  );
}
