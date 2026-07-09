import { Flight } from '@/types/dashboard';
import StatusBadge from '@/components/StatusBadge';

type FlightCardProps = {
  flight: Flight;
  onClick?: (flight: Flight) => void;
  className?: string;
};

export default function FlightCard({ flight, onClick, className = '' }: FlightCardProps) {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-slate-50 p-4 ${className}`}
      onClick={() => onClick?.(flight)}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-900">{flight.flightCode}</p>
        <StatusBadge status={flight.status} />
      </div>
      <div className="mt-3 space-y-2 text-sm text-slate-700">
        <p>
          <span className="font-medium text-slate-900">Tuyến bay:</span> {flight.route}
        </p>
        <p>
          <span className="font-medium text-slate-900">Khởi hành:</span> {flight.departureTime}
        </p>
        <p>
          <span className="font-medium text-slate-900">Gate:</span> {flight.gate}
        </p>
        <p>
          <span className="font-medium text-slate-900">Giá vé:</span> {flight.price.toLocaleString('vi-VN')} ₫
        </p>
      </div>
    </div>
  );
}
