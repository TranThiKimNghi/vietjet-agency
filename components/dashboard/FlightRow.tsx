import { Flight } from '@/types/dashboard';

export default function FlightRow({ flight }: { flight: Flight }) {
  return (
    <tr className="border-t border-slate-200">
      <td className="px-6 py-4 font-medium text-slate-900">{flight.flightCode}</td>
      <td className="px-6 py-4 text-slate-700">{flight.route}</td>
      <td className="px-6 py-4 text-slate-700">{flight.departureTime}</td>
      <td className="px-6 py-4 text-slate-700">{flight.gate}</td>
      <td className="px-6 py-4 text-slate-700">{flight.price.toLocaleString('vi-VN')} ₫</td>
      <td className="px-6 py-4">
        <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-slate-700 bg-violet-100">
          {flight.status}
        </span>
      </td>
    </tr>
  );
}
