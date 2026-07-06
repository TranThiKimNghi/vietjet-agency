import { recentActivities } from '@/data/dashboard';
import ActivityRow from './ActivityRow';

export default function RecentActivities() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Hoạt động gần đây</h2>
          <p className="mt-2 text-sm text-slate-600">
            Danh sách hoạt động booking mới nhất.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 md:shadow-sm">
        <div className="hidden md:block">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Mã đặt vé</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Khách hàng</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Tuyến bay</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Thời gian đặt</th>
                <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {recentActivities.map((activity) => (
                <ActivityRow key={activity.bookingCode} activity={activity} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 p-4 md:hidden">
          {recentActivities.map((activity) => (
            <div
              key={activity.bookingCode}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-900">{activity.bookingCode}</p>
                <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                  {activity.status}
                </span>
              </div>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-medium text-slate-900">Khách hàng:</span> {activity.customer}
                </p>
                <p>
                  <span className="font-medium text-slate-900">Tuyến bay:</span> {activity.route}
                </p>
                <p>
                  <span className="font-medium text-slate-900">Thời gian:</span> {activity.bookedAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
