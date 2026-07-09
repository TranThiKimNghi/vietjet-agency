import { Booking } from '@/types/booking';

export default function BookingRow({
  booking,
  onOpen,
}: {
  booking: Booking;
  onOpen?: (booking: Booking) => void;
}) {
  return (
    <tr
      className="cursor-pointer hover:bg-slate-50"
      onClick={() => onOpen?.(booking)}
    >
      <td className="px-6 py-4 font-medium text-slate-900">{booking.id}</td>
      <td className="px-6 py-4 text-slate-700">{booking.passenger}</td>
      <td className="px-6 py-4 text-slate-700">{booking.from}</td>
      <td className="px-6 py-4 text-slate-700">{booking.to}</td>
      <td className="px-6 py-4 text-slate-700">{booking.date}</td>
      <td className="px-6 py-4 text-slate-700">{booking.seat}</td>
      <td className="px-6 py-4 text-slate-700">
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(booking.price)}
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          booking.status === 'Đã xác nhận'
            ? 'bg-emerald-100 text-emerald-700'
            : booking.status === 'Chờ'
            ? 'bg-amber-100 text-amber-700'
            : 'bg-rose-100 text-rose-700'
        }`}>
          {booking.status}
        </span>
      </td>
    </tr>
  );
}
