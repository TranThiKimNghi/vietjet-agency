"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { flightList } from '@/data/dashboard';
import FlightRow from '@/components/dashboard/FlightRow';
import FlightDetailModal from '@/components/FlightDetailModal';
import AddFlightModal from '@/components/AddFlightModal';
import FlightStatistics from '@/components/dashboard/FlightStatistics';
import ConfirmDialog from '@/components/ConfirmDialog';
import { Flight } from '@/types/dashboard';

const statusOptions = [
  '',
  'Đã mở cửa',
  'Trễ',
  'Đã đóng cửa',
  'Giờ cất cánh',
  'Sắp khởi hành',
];

const typeOptions = ['', 'Nội địa', 'Quốc tế'];
const sortOptions = [
  { value: '', label: 'Không sắp xếp' },
  { value: 'flightCode', label: 'Mã chuyến bay' },
  { value: 'departureTime', label: 'Thời gian khởi hành' },
  { value: 'price', label: 'Giá vé' },
];

export default function DashboardFlights() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [flights, setFlights] = useState<Flight[]>(() => [...flightList]);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
  const [deletingFlight, setDeletingFlight] = useState<Flight | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const normalizedSearchTerm = useMemo(
    () => searchTerm.trim().toLowerCase(),
    [searchTerm]
  );

  const filteredFlights = useMemo(() => {
    const filtered = flights.filter((flight) => {
      if (statusFilter && flight.status !== statusFilter) {
        return false;
      }

      if (typeFilter && flight.flightType !== typeFilter) {
        return false;
      }

      if (!normalizedSearchTerm) {
        return true;
      }

      const flightCode = flight.flightCode.toLowerCase();
      const route = flight.route.toLowerCase();
      return (
        flightCode.includes(normalizedSearchTerm) ||
        route.includes(normalizedSearchTerm)
      );
    });

    if (!sortKey) {
      return filtered;
    }

    const sorted = [...filtered].sort((a, b) => {
      let compare = 0;

      if (sortKey === 'flightCode') {
        compare = a.flightCode.localeCompare(b.flightCode, 'vi', { numeric: true });
      }

      if (sortKey === 'departureTime') {
        compare = a.departureTime.localeCompare(b.departureTime, 'vi', { numeric: true });
      }

      if (sortKey === 'price') {
        compare = a.price - b.price;
      }

      return sortDirection === 'asc' ? compare : -compare;
    });

    return sorted;
  }, [normalizedSearchTerm, statusFilter, typeFilter, sortKey, sortDirection, flights]);

  const totalPages = Math.max(1, Math.ceil(filteredFlights.length / pageSize));

  const effectivePage = Math.min(currentPage, totalPages);

  const paginatedFlights = useMemo(() => {
    const start = (effectivePage - 1) * pageSize;
    return filteredFlights.slice(start, start + pageSize);
  }, [filteredFlights, effectivePage]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Quản lý chuyến bay</h1>
            <p className="mt-3 text-slate-600">
              Xem danh sách chuyến bay hiện tại, trạng thái và thông tin cổng khởi hành.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsAddOpen(true)}
              className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              Thêm chuyến bay
            </button>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Trở về Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Danh sách chuyến bay</h2>
            <p className="mt-2 text-sm text-slate-600">
              Danh sách chuyến bay đang vận hành và thông tin cất cánh mới nhất.
            </p>
          </div>

          <FlightStatistics flights={flights} />

          <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr_1fr_1fr_0.9fr]">
            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="flight-search">
                Tìm kiếm chuyến bay
              </label>
              <input
                id="flight-search"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Mã chuyến, từ, đến..."
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="status-filter">
                Trạng thái
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option || 'Tất cả'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="type-filter">
                Loại chuyến bay
              </label>
              <select
                id="type-filter"
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              >
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option || 'Tất cả'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="sort-key">
                Sắp xếp theo
              </label>
              <select
                id="sort-key"
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-3">
              <select
                id="sort-direction"
                value={sortDirection}
                onChange={(event) => setSortDirection(event.target.value as 'asc' | 'desc')}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              >
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                  setTypeFilter('');
                  setSortKey('');
                  setSortDirection('asc');
                }}
                className="inline-flex w-full items-center justify-center rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Reset bộ lọc
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 md:shadow-sm">
          {filteredFlights.length > 0 ? (
            <>
              <div className="hidden md:block">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                          <tr>
                            <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Mã chuyến</th>
                            <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Tuyến bay</th>
                            <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Khởi hành</th>
                            <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Gate</th>
                            <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Giá vé</th>
                            <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Trạng thái</th>
                            <th className="px-6 py-4 font-medium uppercase tracking-[0.2em]">Thao tác</th>
                          </tr>
                  </thead>
                  <tbody className="bg-white">
                          {paginatedFlights.map((flight) => (
                            <FlightRow
                              key={flight.flightCode}
                              flight={flight}
                              showActions
                              onOpen={(f) => {
                                setSelectedFlight(f);
                                setIsModalOpen(true);
                              }}
                              onEdit={(f) => {
                                setEditingFlight(f);
                                setIsAddOpen(true);
                              }}
                              onDelete={(f) => {
                                setDeletingFlight(f);
                                setIsConfirmOpen(true);
                              }}
                            />
                          ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 p-4 md:hidden">
                {paginatedFlights.map((flight) => (
                  <div
                    key={flight.flightCode}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4 cursor-pointer"
                    onClick={() => {
                      setSelectedFlight(flight);
                      setIsModalOpen(true);
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-slate-900">{flight.flightCode}</p>
                      <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {flight.status}
                      </span>
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
                ))}
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-sm text-slate-600">
              Không tìm thấy chuyến bay phù hợp với từ khóa.
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm disabled:opacity-50"
          >
            Previous
          </button>

          <div className="text-sm text-slate-700">Trang {currentPage} / {totalPages}</div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
      {isAddOpen && (
        <AddFlightModal
          initialFlight={editingFlight ?? null}
          onClose={() => {
            setIsAddOpen(false);
            setEditingFlight(null);
          }}
          onAdd={(f) => {
            if (editingFlight) {
              // update existing
              setFlights((s) => s.map((it) => (it.flightCode === editingFlight.flightCode ? f : it)));
            } else {
              // add new
              setFlights((s) => [f, ...s]);
              setCurrentPage(1);
            }
            setEditingFlight(null);
          }}
        />
      )}
      {isConfirmOpen && deletingFlight && (
        <ConfirmDialog
          title="Xác nhận xóa"
          message={`Bạn có chắc muốn xóa chuyến ${deletingFlight.flightCode}?`}
          onCancel={() => {
            setIsConfirmOpen(false);
            setDeletingFlight(null);
          }}
          onConfirm={() => {
            setFlights((prev) => {
              const updated = prev.filter((it) => it.flightCode !== deletingFlight.flightCode);
              const newTotalPages = Math.max(1, Math.ceil(updated.length / pageSize));
              setCurrentPage((p) => Math.min(p, newTotalPages));
              return updated;
            });
            setIsConfirmOpen(false);
            setDeletingFlight(null);
          }}
        />
      )}
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
