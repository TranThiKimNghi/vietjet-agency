import { upcomingFlights } from '@/data/dashboard';
import FlightRow from './FlightRow';
import { Flight } from '@/types/dashboard';
import StatusBadge from '@/components/StatusBadge';

export default function UpcomingFlights({
  onOpenFlight,
}: {
  onOpenFlight?: (f: Flight) => void;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Chuyến bay sắp khởi hành</h2>
          <p className="mt-2 text-sm text-slate-600">Danh sách chuyến bay sắp cất cánh tiếp theo.</p>
        </div>

        <div className="hidden md:block">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Mã</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Tuyến bay</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Giờ khởi hành</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Gate</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Giá</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Trạng thái</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {upcomingFlights.map((flight) => (
                <FlightRow key={flight.flightCode} flight={flight} onOpen={onOpenFlight} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 p-4 md:hidden">
          {upcomingFlights.map((flight) => (
            <div
              key={flight.flightCode}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-4 cursor-pointer"
              onClick={() => onOpenFlight?.(flight)}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-900">{flight.flightCode}</p>
                <StatusBadge status={flight.status} />
              </div>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-medium text-slate-900">Tuyến bay:</span> {flight.route}
                </p>
                <p>
                  <span className="font-medium text-slate-900">Khởi hành:</span> {flight.departureTime}
                </p>
                <p>
                  <span className="font-medium text-slate-900">Gate:</span> {flight.gate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
