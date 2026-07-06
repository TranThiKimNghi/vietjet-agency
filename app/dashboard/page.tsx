'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/authClient';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatisticsGrid from '@/components/dashboard/StatisticsGrid';
import RecentActivities from '@/components/dashboard/RecentActivities';
import UpcomingFlights from '@/components/dashboard/UpcomingFlights';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <StatisticsGrid />
      <RecentActivities />
      <UpcomingFlights />
    </div>
  );
}
