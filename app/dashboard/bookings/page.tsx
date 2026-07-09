import { bookingList } from '@/data/bookings';
import BookingRow from '@/components/dashboard/BookingRow';
import Link from 'next/link';

export default function DashboardBookings() {
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
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
          >
            Trở về Dashboard
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="overflow-x-auto">
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
              </tr>
            </thead>
            <tbody className="bg-white">
              {bookingList.map((booking) => (
                <BookingRow key={booking.id} booking={booking} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookingList.map((booking) => (
            <div key={booking.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-900">{booking.id}</p>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  booking.status === 'Đã xác nhận'
                    ? 'bg-emerald-100 text-emerald-700'
                    : booking.status === 'Chờ'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-rose-100 text-rose-700'
                }`}>
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
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
