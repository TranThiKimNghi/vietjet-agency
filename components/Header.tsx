export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-slate-900 text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400">Hệ thống quản lý</p>
          <h1 className="mt-1 text-2xl font-semibold">Vietjet Booking</h1>
        </div>

        <div className="flex flex-col items-start gap-2 text-sm text-slate-300 md:items-end">
          <span>Quản lý đặt vé máy bay nội địa và quốc tế</span>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">
            Phiên bản quản lý
          </span>
        </div>
      </div>
    </header>
  );
}