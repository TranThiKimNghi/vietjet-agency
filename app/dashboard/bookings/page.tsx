'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { bookingList } from '@/data/bookings';
import BookingDetailModal from '@/components/dashboard/BookingDetailModal';
import BookingStatistics from '@/components/dashboard/BookingStatistics';
import BookingFormModal from '@/components/dashboard/BookingFormModal';
import ConfirmDialog from '@/components/ConfirmDialog';
import { Booking } from '@/types/booking';
import BookingToolbar from '@/components/dashboard/BookingToolbar';
import BookingTableSection from '@/components/dashboard/BookingTableSection';

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
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 10;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => window.clearTimeout(timer);
  }, []);

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

  const hasActiveFilters = Boolean(searchTerm.trim() || statusFilter || sortKey);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
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
        <BookingToolbar
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
          onStatusChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          onSortKeyChange={(value) => {
            setSortKey(value);
            setCurrentPage(1);
          }}
          onSortDirectionChange={(value) => setSortDirection(value)}
        />

        <BookingTableSection
          isLoading={isLoading}
          paginatedBookings={paginatedBookings}
          filteredBookingsCount={filteredBookings.length}
          effectivePage={effectivePage}
          totalPages={totalPages}
          hasActiveFilters={hasActiveFilters}
          onOpenBooking={(bookingData) => {
            setSelectedBooking(bookingData);
            setIsDetailOpen(true);
          }}
          onEditBooking={(bookingData) => {
            setEditingBooking(bookingData);
            setIsFormOpen(true);
          }}
          onDeleteBooking={(bookingData) => {
            setBookingToDelete(bookingData);
            setIsConfirmOpen(true);
          }}
          onPageChange={(page) => setCurrentPage(() => Math.max(1, Math.min(totalPages, page)))}
        />
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
