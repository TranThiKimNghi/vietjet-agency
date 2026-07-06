import { Statistic } from '@/types/dashboard';

export default function StatisticCard({ statistic }: { statistic: Statistic }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{statistic.title}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{statistic.value}</p>
      <p className="mt-2 text-sm text-slate-600">{statistic.description}</p>
    </div>
  );
}
