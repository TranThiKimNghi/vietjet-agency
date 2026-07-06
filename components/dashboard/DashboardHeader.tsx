'use client';

import { useRouter } from 'next/navigation';
import { clearAuth } from '@/lib/authClient';

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    router.replace('/login');
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
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
  );
}
