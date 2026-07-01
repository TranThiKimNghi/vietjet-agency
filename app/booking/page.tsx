"use client";

import { useMemo, useState } from "react";

type Booking = {
  id: string;
  passenger: string;
  from: string;
  to: string;
  date: string;
  seat: string;
  status: string;
  price: number;
};

const initialBookings: Booking[] = [
  {
    id: "BKG-001",
    passenger: "Nguyễn Văn A",
    from: "Hà Nội",
    to: "TP. Hồ Chí Minh",
    date: "2026-07-15",
    seat: "Economy",
    status: "Đã xác nhận",
    price: 1299000,
  },
  {
    id: "BKG-002",
    passenger: "Trần Thị B",
    from: "Đà Nẵng",
    to: "Hải Phòng",
    date: "2026-07-20",
    seat: "Business",
    status: "Chờ",
    price: 1899000,
  },
];

const statusStyles: Record<string, string> = {
  "Đã xác nhận": "bg-emerald-100 text-emerald-700",
  Chờ: "bg-amber-100 text-amber-700",
  Huỷ: "bg-rose-100 text-rose-700",
};

const statusOptions = ["All", "Đã xác nhận", "Chờ", "Huỷ"];

export default function Booking() {
  const [bookings, setBookings] = useState(initialBookings);
  const [form, setForm] = useState({
    passenger: "",
    from: "",
    to: "",
    date: "",
    seat: "Economy",
    price: "0",
  });
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const isValid = Boolean(form.passenger && form.from && form.to && form.date);

  const filteredBookings = useMemo(
    () =>
      bookings.filter((booking) => {
        const query = search.toLowerCase();
        const matchesSearch =
          booking.id.toLowerCase().includes(query) ||
          booking.passenger.toLowerCase().includes(query) ||
          booking.from.toLowerCase().includes(query) ||
          booking.to.toLowerCase().includes(query);
        const matchesStatus = filterStatus === "All" || booking.status === filterStatus;
        return matchesSearch && matchesStatus;
      }),
    [bookings, filterStatus, search]
  );

  const stats = useMemo(
    () => ({
      total: bookings.length,
      confirmed: bookings.filter((booking) => booking.status === "Đã xác nhận").length,
      pending: bookings.filter((booking) => booking.status === "Chờ").length,
      canceled: bookings.filter((booking) => booking.status === "Huỷ").length,
    }),
    [bookings]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      setMessage("Vui lòng điền đầy đủ thông tin đặt vé.");
      return;
    }

    const newBooking: Booking = {
      id: `BKG-${String(bookings.length + 1).padStart(3, "0")}`,
      passenger: form.passenger,
      from: form.from,
      to: form.to,
      date: form.date,
      seat: form.seat,
      status: "Chờ",
      price: Number(form.price) || 0,
    };

    setBookings((current) => [newBooking, ...current]);
    setForm({ passenger: "", from: "", to: "", date: "", seat: "Economy", price: "0" });
    setMessage("Đã tạo đặt vé mới thành công.");
  };

  const handleCancel = (id: string) => {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status: "Huỷ" } : booking
      )
    );
    setMessage("Đã huỷ đặt vé.");
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">Quản lý đặt vé</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Danh sách đặt vé</h1>
            <p className="mt-2 text-sm text-slate-600">Xem, lọc và xử lý các đơn đặt vé nhanh chóng trong hệ thống.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Tổng đơn</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{stats.total}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Đã xác nhận</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-700">{stats.confirmed}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Chờ</p>
              <p className="mt-2 text-2xl font-semibold text-amber-700">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Tìm kiếm</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo mã, tên, điểm đi/dến"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Lọc trạng thái</span>
            <select
              value={filterStatus}
              onChange={(event) => setFilterStatus(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Mã vé</th>
                <th className="px-4 py-3">Hành khách</th>
                <th className="px-4 py-3">Từ</th>
                <th className="px-4 py-3">Đến</th>
                <th className="px-4 py-3">Ngày bay</th>
                <th className="px-4 py-3">Hạng</th>
                <th className="px-4 py-3">Giá</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-slate-500" colSpan={9}>
                    Không tìm thấy đặt vé phù hợp.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-medium text-slate-900">{booking.id}</td>
                    <td className="px-4 py-4">{booking.passenger}</td>
                    <td className="px-4 py-4">{booking.from}</td>
                    <td className="px-4 py-4">{booking.to}</td>
                    <td className="px-4 py-4">{booking.date}</td>
                    <td className="px-4 py-4">{booking.seat}</td>
                    <td className="px-4 py-4">{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(booking.price)}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[booking.status] ?? "bg-slate-100 text-slate-800"}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {booking.status !== "Huỷ" ? (
                        <button
                          type="button"
                          onClick={() => handleCancel(booking.id)}
                          className="rounded-2xl bg-rose-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-700"
                        >
                          Huỷ
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500">Đã huỷ</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Tạo đặt vé mới</h2>
          <p className="mt-1 text-sm text-slate-600">Điền thông tin để tạo một đơn đặt vé mới trong hệ thống.</p>
        </div>

        <form className="grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Tên hành khách</span>
            <input
              name="passenger"
              value={form.passenger}
              onChange={handleChange}
              placeholder="Nhập tên hành khách"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Từ</span>
            <input
              name="from"
              value={form.from}
              onChange={handleChange}
              placeholder="Nơi đi"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Đến</span>
            <input
              name="to"
              value={form.to}
              onChange={handleChange}
              placeholder="Nơi đến"
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Ngày bay</span>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Hạng ghế</span>
            <select
              name="seat"
              value={form.seat}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
            >
              <option>Economy</option>
              <option>Business</option>
              <option>First</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Giá vé (VNĐ)</span>
            <input
              type="number"
              min="0"
              step="10000"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
            />
          </label>

          <div className="md:col-span-2">
            {message && <p className="mb-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{message}</p>}
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={!isValid}
            >
              Tạo đặt vé
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
