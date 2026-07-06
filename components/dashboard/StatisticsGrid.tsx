import { statistics } from '@/data/dashboard';
import StatisticCard from './StatisticCard';

export default function StatisticsGrid() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statistics.map((stat) => (
        <StatisticCard key={stat.title} statistic={stat} />
      ))}
    </section>
  );
}
