export default function Flights() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Chuyến bay</h1>
        <p className="mt-3 text-slate-600">Quản lý chuyến bay đang mở bán và lịch trình bay hiện tại.</p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Mã chuyến</th>
                <th className="px-4 py-3">Từ</th>
                <th className="px-4 py-3">Đến</th>
                <th className="px-4 py-3">Ngày</th>
                <th className="px-4 py-3">Giờ</th>
                <th className="px-4 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-900">VJ123</td>
                <td className="px-4 py-4">Hà Nội</td>
                <td className="px-4 py-4">TP. Hồ Chí Minh</td>
                <td className="px-4 py-4">2026-07-15</td>
                <td className="px-4 py-4">08:30</td>
                <td className="px-4 py-4">Hoạt động</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-900">VJ456</td>
                <td className="px-4 py-4">Đà Nẵng</td>
                <td className="px-4 py-4">Hải Phòng</td>
                <td className="px-4 py-4">2026-07-20</td>
                <td className="px-4 py-4">11:45</td>
                <td className="px-4 py-4">Hoạt động</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}