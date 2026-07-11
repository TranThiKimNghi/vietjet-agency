'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { bookingList } from '@/data/bookings';
import BookingRow from '@/components/dashboard/BookingRow';
import BookingDetailModal from '@/components/dashboard/BookingDetailModal';
import BookingStatistics from '@/components/dashboard/BookingStatistics';
import BookingFormModal from '@/components/dashboard/BookingFormModal';
import ConfirmDialog from '@/components/ConfirmDialog';
import { Booking } from '@/types/booking';

const statusOptions = ['', 'Đã xác nhận', 'Chờ', 'Huỷ'];
const sortOptions = [
  { value: '', label: 'Không sắp xếp' },
  { value: 'id', label: 'Mã vé' },
  { value: 'date', label: 'Ngày bay' },
  { value: 'price', label: 'Giá' },
];

export default function DashboardBookings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState<Booking[]>(() => [...bookingList]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const pageSize = 10;

  const normalizedSearchTerm = useMemo(
    () => searchTerm.trim().toLowerCase(),
    [searchTerm]
  );

  const filteredBookings = useMemo(() => {
    const filtered = bookings.filter((booking) => {
      if (statusFilter && booking.status !== statusFilter) {
        return false;
      }

      if (!normalizedSearchTerm) {
        return true;
      }

      return (
        booking.id.toLowerCase().includes(normalizedSearchTerm) ||
        booking.passenger.toLowerCase().includes(normalizedSearchTerm)
      );
    });

    if (!sortKey) {
      return filtered;
    }

    const sorted = [...filtered].sort((a, b) => {
      let compare = 0;

      if (sortKey === 'id') {
        compare = a.id.localeCompare(b.id, 'vi', { numeric: true });
      }

      if (sortKey === 'date') {
        compare = a.date.localeCompare(b.date, 'vi', { numeric: true });
      }

      if (sortKey === 'price') {
        compare = a.price - b.price;
      }

      return sortDirection === 'asc' ? compare : -compare;
    });

    return sorted;
  }, [bookings, normalizedSearchTerm, statusFilter, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pageSize));
  const effectivePage = Math.min(currentPage, totalPages);

  const paginatedBookings = useMemo(() => {
    const start = (effectivePage - 1) * pageSize;
    return filteredBookings.slice(start, start + pageSize);
  }, [filteredBookings, effectivePage]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Đặt vé</p>
            <h1 className="text-3xl font-semibold text-slate-900">Quản lý đặt vé</h1>
            <p className="mt-3 text-slate-600">
              Xem danh sách booking hiện tại và trạng thái đơn đặt vé.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setEditingBooking(null);
                setIsFormOpen(true);
              }}
              className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Thêm booking
            </button>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Trở về Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <BookingStatistics bookings={bookings} />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="booking-search">
              Tìm kiếm
            </label>
            <input
              id="booking-search"
              type="text"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Mã vé hoặc tên hành khách"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="status-filter">
              Trạng thái
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option || 'Tất cả'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="sort-key">
              Sắp xếp theo
            </label>
            <select
              id="sort-key"
              value={sortKey}
              onChange={(event) => {
                setSortKey(event.target.value);
                setCurrentPage(1);
              }}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="sort-direction">
              Hướng sắp xếp
            </label>
            <select
              id="sort-direction"
              value={sortDirection}
              onChange={(event) => setSortDirection(event.target.value as 'asc' | 'desc')}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            >
              <option value="asc">Tăng dần</option>
              <option value="desc">Giảm dần</option>
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Mã vé</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Hành khách</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Từ</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Đến</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Ngày bay</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Hạng</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Giá</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Trạng thái</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td className="px-6 py-8 text-center text-slate-500" colSpan={8}>
                    Không tìm thấy booking phù hợp.
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((booking) => (
                  <BookingRow
                    key={booking.id}
                    booking={booking}
                    onOpen={(bookingData) => {
                      setSelectedBooking(bookingData);
                      setIsDetailOpen(true);
                    }}
                    onEdit={(bookingData) => {
                      setEditingBooking(bookingData);
                      setIsFormOpen(true);
                    }}
                    onDelete={(bookingData) => {
                      setBookingToDelete(bookingData);
                      setIsConfirmOpen(true);
                    }}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Hiển thị {paginatedBookings.length} / {filteredBookings.length} booking
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={effectivePage === 1}
              className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-slate-700">
              Trang {effectivePage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={effectivePage === totalPages}
              className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedBookings.map((booking) => (
            <button
              key={booking.id}
              type="button"
              onClick={() => {
                setSelectedBooking(booking);
                setIsDetailOpen(true);
              }}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left hover:bg-slate-100"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-900">{booking.id}</p>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    booking.status === 'Đã xác nhận'
                      ? 'bg-emerald-100 text-emerald-700'
                      : booking.status === 'Chờ'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {booking.status}
                </span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-medium text-slate-900">Hành khách:</span> {booking.passenger}
                </p>
                <p>
                  <span className="font-medium text-slate-900">Từ:</span> {booking.from}
                </p>
                <p>
                  <span className="font-medium text-slate-900">Đến:</span> {booking.to}
                </p>
                <p>
                  <span className="font-medium text-slate-900">Ngày bay:</span> {booking.date}
                </p>
                <p>
                  <span className="font-medium text-slate-900">Hạng:</span> {booking.seat}
                </p>
                <p>
                  <span className="font-medium text-slate-900">Giá:</span>{' '}
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(booking.price)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {isFormOpen && (
        <BookingFormModal
          initialBooking={editingBooking}
          onClose={() => {
            setIsFormOpen(false);
            setEditingBooking(null);
          }}
          onSubmit={(booking) => {
            if (editingBooking) {
              setBookings((current) =>
                current.map((item) => (item.id === editingBooking.id ? { ...item, ...booking } : item))
              );
            } else {
              const generatedId = `BKG-${String(bookings.length + 1).padStart(3, '0')}`;
              setBookings((current) => [{ ...booking, id: generatedId }, ...current]);
              setCurrentPage(1);
            }
            setEditingBooking(null);
          }}
        />
      )}

      {isConfirmOpen && bookingToDelete && (
        <ConfirmDialog
          title="Xác nhận xóa"
          message={`Bạn có chắc muốn xóa booking ${bookingToDelete.id}?`}
          onCancel={() => {
            setIsConfirmOpen(false);
            setBookingToDelete(null);
          }}
          onConfirm={() => {
            setBookings((current) => {
              const updated = current.filter((item) => item.id !== bookingToDelete.id);
              const newTotalPages = Math.max(1, Math.ceil(updated.length / pageSize));
              setCurrentPage((page) => Math.min(page, newTotalPages));
              return updated;
            });
            setIsConfirmOpen(false);
            setBookingToDelete(null);
          }}
        />
      )}

      {isDetailOpen && selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
}
