export default function Tickets() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Vé</h1>
        <p className="mt-3 text-slate-600">Quản lý các vé đã bán và trạng thái vé trong hệ thống.</p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Mã vé</th>
                <th className="px-4 py-3">Hành khách</th>
                <th className="px-4 py-3">Chuyến bay</th>
                <th className="px-4 py-3">Ngày bay</th>
                <th className="px-4 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-900">TCK-001</td>
                <td className="px-4 py-4">Nguyễn Văn A</td>
                <td className="px-4 py-4">VJ123</td>
                <td className="px-4 py-4">2026-07-15</td>
                <td className="px-4 py-4">Đã xuất</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-900">TCK-002</td>
                <td className="px-4 py-4">Trần Thị B</td>
                <td className="px-4 py-4">VJ456</td>
                <td className="px-4 py-4">2026-07-20</td>
                <td className="px-4 py-4">Đã xuất</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}