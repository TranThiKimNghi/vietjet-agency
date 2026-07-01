export default function Customers() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Khách hàng</h1>
        <p className="mt-3 text-slate-600">Danh sách khách hàng và thông tin liên hệ phục vụ theo dõi đặt vé.</p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Tên khách hàng</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Số điện thoại</th>
                <th className="px-4 py-3">Loại khách</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-900">Nguyễn Văn A</td>
                <td className="px-4 py-4">nguyenvana@example.com</td>
                <td className="px-4 py-4">0988 123 456</td>
                <td className="px-4 py-4">Thường</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-900">Trần Thị B</td>
                <td className="px-4 py-4">tranthib@example.com</td>
                <td className="px-4 py-4">0912 987 654</td>
                <td className="px-4 py-4">VIP</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}