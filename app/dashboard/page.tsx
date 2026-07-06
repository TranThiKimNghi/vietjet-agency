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
    </div>
  );
}