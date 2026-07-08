import { upcomingFlights } from '@/data/dashboard';
import FlightRow from './FlightRow';
import { Flight } from '@/types/dashboard';

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
          <p className="mt-2 text-sm text-slate-600">
            Danh sách chuyến bay sắp cất cánh tiếp theo.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 md:shadow-sm">
        <div className="hidden md:block">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Mã chuyến bay</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Tuyến bay</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Giờ khởi hành</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Gate</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Trạng thái</th>
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
                <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-slate-700 bg-violet-100">
                  {flight.status}
                </span>
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
