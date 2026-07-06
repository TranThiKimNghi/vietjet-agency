import { Activity } from '@/types/dashboard';

export default function ActivityRow({ activity }: { activity: Activity }) {
  return (
    <tr className="border-t border-slate-200">
      <td className="px-6 py-4 font-medium text-slate-900">{activity.bookingCode}</td>
      <td className="px-6 py-4 text-slate-700">{activity.customer}</td>
      <td className="px-6 py-4 text-slate-700">{activity.route}</td>
      <td className="px-6 py-4 text-slate-700">{activity.bookedAt}</td>
      <td className="px-6 py-4">
        <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
          {activity.status}
        </span>
      </td>
    </tr>
  );
}
