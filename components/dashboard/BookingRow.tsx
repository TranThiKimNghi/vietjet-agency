import { Booking } from '@/types/booking';
import BookingStatusBadge from '@/components/dashboard/BookingStatusBadge';

export default function BookingRow({
  booking,
  onOpen,
  onEdit,
  onDelete,
}: {
  booking: Booking;
  onOpen?: (booking: Booking) => void;
  onEdit?: (booking: Booking) => void;
  onDelete?: (booking: Booking) => void;
}) {
  return (
    <tr className="hover:bg-slate-50">
      <td className="cursor-pointer px-6 py-4 font-medium text-slate-900" onClick={() => onOpen?.(booking)}>{booking.id}</td>
      <td className="cursor-pointer px-6 py-4 text-slate-700" onClick={() => onOpen?.(booking)}>{booking.passenger}</td>
      <td className="cursor-pointer px-6 py-4 text-slate-700" onClick={() => onOpen?.(booking)}>{booking.from}</td>
      <td className="cursor-pointer px-6 py-4 text-slate-700" onClick={() => onOpen?.(booking)}>{booking.to}</td>
      <td className="cursor-pointer px-6 py-4 text-slate-700" onClick={() => onOpen?.(booking)}>{booking.date}</td>
      <td className="cursor-pointer px-6 py-4 text-slate-700" onClick={() => onOpen?.(booking)}>{booking.seat}</td>
      <td className="cursor-pointer px-6 py-4 text-slate-700" onClick={() => onOpen?.(booking)}>
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(booking.price)}
      </td>
      <td className="cursor-pointer px-6 py-4" onClick={() => onOpen?.(booking)}>
        <BookingStatusBadge status={booking.status} />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit?.(booking)}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100"
          >
            Sửa
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(booking)}
            className="rounded-full border border-rose-200 px-3 py-1 text-sm text-rose-600 hover:bg-rose-50"
          >
            Xóa
          </button>
        </div>
      </td>
    </tr>
  );
}
