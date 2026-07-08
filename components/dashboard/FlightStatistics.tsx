import { Flight } from '@/types/dashboard';

export default function FlightStatistics({ flights }: { flights: Flight[] }) {
  const total = flights.length;

  const countsByStatus = flights.reduce<Record<string, number>>((acc, f) => {
    acc[f.status] = (acc[f.status] || 0) + 1;
    return acc;
  }, {});

  const countsByType = flights.reduce<Record<string, number>>((acc, f) => {
    acc[f.flightType] = (acc[f.flightType] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-500">Tổng chuyến bay</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">{total}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-500">Theo trạng thái</p>
        <div className="mt-2 flex flex-col gap-2 text-sm text-slate-700">
          {Object.entries(countsByStatus).map(([status, count]) => (
            <div key={status} className="flex items-center justify-between">
              <span>{status}</span>
              <span className="font-medium">{count}</span>
            </div>
          ))}
          {Object.keys(countsByStatus).length === 0 && (
            <div className="text-sm text-slate-500">Chưa có chuyến bay</div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-500">Theo loại chuyến</p>
        <div className="mt-2 flex flex-col gap-2 text-sm text-slate-700">
          {Object.entries(countsByType).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between">
              <span>{type}</span>
              <span className="font-medium">{count}</span>
            </div>
          ))}
          {Object.keys(countsByType).length === 0 && (
            <div className="text-sm text-slate-500">Chưa có chuyến bay</div>
          )}
        </div>
      </div>
    </section>
  );
}
