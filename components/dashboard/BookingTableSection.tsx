import BookingRow from '@/components/dashboard/BookingRow';
import BookingStatusBadge from '@/components/dashboard/BookingStatusBadge';
import { Booking } from '@/types/booking';

export default function BookingTableSection({
  isLoading,
  paginatedBookings,
  filteredBookingsCount,
  effectivePage,
  totalPages,
  hasActiveFilters,
  onOpenBooking,
  onEditBooking,
  onDeleteBooking,
  onPageChange,
}: {
  isLoading: boolean;
  paginatedBookings: Booking[];
  filteredBookingsCount: number;
  effectivePage: number;
  totalPages: number;
  hasActiveFilters: boolean;
  onOpenBooking: (booking: Booking) => void;
  onEditBooking: (booking: Booking) => void;
  onDeleteBooking: (booking: Booking) => void;
  onPageChange: (page: number) => void;
}) {
  return (
    <>
      <div className="mt-6 overflow-x-auto">
        {isLoading ? (
          <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="grid grid-cols-8 gap-3">
                {[...Array(8)].map((__, skeletonIndex) => (
                  <div
                    key={`${index}-${skeletonIndex}`}
                    className="h-10 animate-pulse rounded-2xl bg-slate-200"
                  />
                ))}
              </div>
            ))}
          </div>
        ) : paginatedBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <div className="rounded-full bg-white p-4 shadow-sm">
              <span className="text-2xl">✈️</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Không có booking phù hợp</h3>
            <p className="mt-2 max-w-md text-sm text-slate-600">
              {hasActiveFilters
                ? 'Thử đổi từ khóa tìm kiếm hoặc bộ lọc để xem thêm kết quả.'
                : 'Hiện chưa có booking nào trong danh sách này.'}
            </p>
          </div>
        ) : (
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
              {paginatedBookings.map((booking) => (
                <BookingRow
                  key={booking.id}
                  booking={booking}
                  onOpen={onOpenBooking}
                  onEdit={onEditBooking}
                  onDelete={onDeleteBooking}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Hiển thị {paginatedBookings.length} / {filteredBookingsCount} booking
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onPageChange(effectivePage - 1)}
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
            onClick={() => onPageChange(effectivePage + 1)}
            disabled={effectivePage === totalPages}
            className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? [...Array(3)].map((_, index) => (
              <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200" />
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-full animate-pulse rounded-full bg-slate-200" />
                  <div className="h-3 w-3/4 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-3 w-5/6 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-200" />
                </div>
              </div>
            ))
          : paginatedBookings.map((booking) => (
              <button
                key={booking.id}
                type="button"
                onClick={() => onOpenBooking(booking)}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-900">{booking.id}</p>
                  <BookingStatusBadge status={booking.status} />
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
    </>
  );
}
