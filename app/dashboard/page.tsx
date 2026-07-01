export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-3 text-slate-600">Tổng quan về hoạt động đặt vé, khách hàng và chuyến bay.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Đặt vé</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">24</p>
          <p className="mt-2 text-sm text-slate-600">Đơn đặt vé mới hôm nay</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Khách hàng</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">128</p>
          <p className="mt-2 text-sm text-slate-600">Khách hàng đã đăng ký</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Chuyến bay</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">12</p>
          <p className="mt-2 text-sm text-slate-600">Chuyến bay đang hoạt động</p>
        </div>
      </section>
    </div>
  );
};