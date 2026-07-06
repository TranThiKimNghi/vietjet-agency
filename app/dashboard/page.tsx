'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clearAuth, isAuthenticated } from '@/lib/authClient';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  const handleLogout = () => {
    clearAuth();
    router.replace('/login');
  };

  const recentActivities = [
    {
      bookingCode: 'VJ-8321',
      customer: 'Nguyễn Văn A',
      route: 'SGN → HAN',
      bookedAt: '10:24 · 06/07/2026',
      status: 'Xác nhận',
    },
    {
      bookingCode: 'VJ-9274',
      customer: 'Lê Thị B',
      route: 'DAD → SGN',
      bookedAt: '09:10 · 06/07/2026',
      status: 'Đang chờ',
    },
    {
      bookingCode: 'VJ-7150',
      customer: 'Trần Văn C',
      route: 'SGN → CXR',
      bookedAt: '08:52 · 06/07/2026',
      status: 'Hoàn thành',
    },
    {
      bookingCode: 'VJ-6451',
      customer: 'Phạm Thị D',
      route: 'HAN → SGN',
      bookedAt: '08:15 · 06/07/2026',
      status: 'Xác nhận',
    },
    {
      bookingCode: 'VJ-5832',
      customer: 'Ngô Văn E',
      route: 'SGN → DAD',
      bookedAt: '07:45 · 06/07/2026',
      status: 'Đang chờ',
    },
  ];

  const statusStyles: Record<string, string> = {
    'Xác nhận': 'bg-emerald-100 text-emerald-700',
    'Đang chờ': 'bg-amber-100 text-amber-700',
    'Hoàn thành': 'bg-sky-100 text-sky-700',
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Dashboard
            </h1>
            <p className="mt-3 text-slate-600">
              Tổng quan về hoạt động đặt vé, khách hàng và chuyến bay.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
          >
            Đăng xuất
          </button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
            Đặt vé
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">24</p>
          <p className="mt-2 text-sm text-slate-600">
            Đơn đặt vé mới hôm nay
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
            Khách hàng
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">128</p>
          <p className="mt-2 text-sm text-slate-600">
            Khách hàng đã đăng ký
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
            Chuyến bay
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">12</p>
          <p className="mt-2 text-sm text-slate-600">
            Chuyến bay đang hoạt động
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
            Doanh thu
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">1.250.000.000</p>
          <p className="mt-2 text-sm text-slate-600">
            Doanh thu dự kiến hôm nay
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
            Hành khách
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">973</p>
          <p className="mt-2 text-sm text-slate-600">
            Hành khách đã bay trong ngày
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
            Chuyến bay quốc tế
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">8</p>
          <p className="mt-2 text-sm text-slate-600">
            Chuyến quốc tế đang vận hành
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
            Tỷ lệ đặt chỗ
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">88%</p>
          <p className="mt-2 text-sm text-slate-600">
            Tỷ lệ lấp đầy trung bình
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Hoạt động gần đây
            </h2>
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
                  <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">
                    Mã đặt vé
                  </th>
                  <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">
                    Khách hàng
                  </th>
                  <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">
                    Tuyến bay
                  </th>
                  <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">
                    Thời gian đặt
                  </th>
                  <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {recentActivities.map((activity) => (
                  <tr key={activity.bookingCode} className="border-t border-slate-200">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {activity.bookingCode}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {activity.customer}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {activity.route}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {activity.bookedAt}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[activity.status]}`}
                      >
                        {activity.status}
                      </span>
                    </td>
                  </tr>
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
                  <p className="text-sm font-medium text-slate-900">
                    {activity.bookingCode}
                  </p>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[activity.status]}`}
                  >
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
    </div>
  );
}