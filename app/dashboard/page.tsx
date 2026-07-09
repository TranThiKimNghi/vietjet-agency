"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/authClient';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatisticsGrid from '@/components/dashboard/StatisticsGrid';
import RecentActivities from '@/components/dashboard/RecentActivities';
import UpcomingFlights from '@/components/dashboard/UpcomingFlights';
import FlightDetailModal from '@/components/FlightDetailModal';
import { Flight } from '@/types/dashboard';

export default function Dashboard() {
  const router = useRouter();

  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Điều hướng nhanh</p>
            <h2 className="text-xl font-semibold text-slate-900">Quản lý chuyến bay</h2>
            <p className="mt-2 text-sm text-slate-600">
              Truy cập trang quản lý chuyến bay để xem danh sách và trạng thái chi tiết.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard/flights"
              className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Mở quản lý chuyến bay
            </Link>
            <Link
              href="/dashboard/bookings"
              className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Mở quản lý đặt vé
            </Link>
          </div>
        </div>
      </section>
      <StatisticsGrid />
      <RecentActivities />
      <UpcomingFlights onOpenFlight={(f) => {
        setSelectedFlight(f);
        setIsModalOpen(true);
      }} />

      {isModalOpen && selectedFlight && (
        <FlightDetailModal
          flight={selectedFlight}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedFlight(null);
          }}
        />
      )}
    </div>
  );
}
