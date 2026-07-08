import { Flight } from '@/types/dashboard';
import StatusBadge from '@/components/StatusBadge';

export default function FlightRow({
  flight,
  onOpen,
  onEdit,
  onDelete,
  showActions,
}: {
  flight: Flight;
  onOpen?: (f: Flight) => void;
  onEdit?: (f: Flight) => void;
  onDelete?: (f: Flight) => void;
  showActions?: boolean;
}) {
  return (
    <tr className="border-t border-slate-200 hover:bg-slate-50">
      <td className="px-6 py-4 font-medium text-slate-900">{flight.flightCode}</td>
      <td className="px-6 py-4 text-slate-700">{flight.route}</td>
      <td className="px-6 py-4 text-slate-700">{flight.departureTime}</td>
      <td className="px-6 py-4 text-slate-700">{flight.gate}</td>
      <td className="px-6 py-4 text-slate-700">{flight.price.toLocaleString('vi-VN')} ₫</td>
      <td className="px-6 py-4">
        <StatusBadge status={flight.status} />
      </td>
      {showActions ? (
        <td className="px-6 py-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpen?.(flight);
              }}
              className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-900 hover:bg-slate-50"
            >
              Xem chi tiết
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(flight);
              }}
              className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-900 hover:bg-slate-50"
            >
              Chỉnh sửa
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(flight);
              }}
              className="inline-flex items-center gap-2 rounded-3xl border border-red-200 bg-white px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Xóa
            </button>
          </div>
        </td>
      ) : null}
    </tr>
  );
}
