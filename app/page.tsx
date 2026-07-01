import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-10">
      <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-sky-100 px-4 py-1 text-sm font-semibold text-sky-800">
            Giải pháp quản lý vé hàng không cho doanh nghiệp nội địa
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Quản lý đặt vé, chuyến bay và khách hàng trong một nền tảng duy nhất.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Vietjet Booking giúp bạn điều hành dữ liệu đặt vé, kiểm tra danh sách hành khách và quản lý vé máy bay một cách nhanh chóng, trực quan và an toàn.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className="inline-flex items-center justify-center rounded-3xl bg-sky-600 px-6 py-4 text-white transition hover:bg-sky-700">
              Đăng nhập ngay
            </Link>
            <Link href="/booking" className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-4 text-slate-900 transition hover:bg-slate-50">
              Khám phá hệ thống
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-50 p-6 sm:p-8">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Tính năng nổi bật</p>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li>• Quản lý đặt vé và hành trình chi tiết.</li>
                <li>• Theo dõi tình trạng chuyến bay tức thì.</li>
                <li>• Danh sách khách hàng và lịch sử vé dễ sử dụng.</li>
                <li>• Báo cáo tổng quan giúp quyết định nhanh.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Tại sao chọn Vietjet Booking?</h2>
              <p className="mt-3 text-slate-600">
                Giao diện thân thiện, phù hợp với quản lý nội bộ và nhân viên bán vé. Tích hợp nhanh, vận hành mượt mà và dễ tiếp cận.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Hệ thống quản lý toàn diện</h2>
          <p className="mt-3 text-slate-600">
            Từ đặt vé đến quản lý hành khách, tất cả được tổ chức trong cùng một bảng điều khiển để giảm thiểu sai sót và nâng cao hiệu suất làm việc.
          </p>
        </div>
        <div className="grid gap-4">
          <Link href="/flights" className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 text-slate-900 transition hover:bg-slate-100">
            Quản lý chuyến bay
          </Link>
          <Link href="/customers" className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 text-slate-900 transition hover:bg-slate-100">
            Quản lý khách hàng
          </Link>
          <Link href="/tickets" className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 text-slate-900 transition hover:bg-slate-100">
            Quản lý vé
          </Link>
        </div>
      </section>
    </main>
  );
}

