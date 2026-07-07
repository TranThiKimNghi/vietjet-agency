import Link from 'next/link';
import { flightList } from '@/data/dashboard';
import FlightRow from '@/components/dashboard/FlightRow';

export default function DashboardFlights() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Quản lý chuyến bay</h1>
            <p className="mt-3 text-slate-600">
              Xem danh sách chuyến bay hiện tại, trạng thái và thông tin cổng khởi hành.
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

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Danh sách chuyến bay</h2>
            <p className="mt-2 text-sm text-slate-600">
              Danh sách chuyến bay đang vận hành và thông tin cất cánh mới nhất.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 md:shadow-sm">
          <div className="hidden md:block">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Mã chuyến</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Tuyến bay</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Khởi hành</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Gate</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {flightList.map((flight) => (
                  <FlightRow key={flight.flightCode} flight={flight} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 p-4 md:hidden">
            {flightList.map((flight) => (
              <div key={flight.flightCode} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-900">{flight.flightCode}</p>
                  <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-slate-700">
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
    </div>
  );
}
