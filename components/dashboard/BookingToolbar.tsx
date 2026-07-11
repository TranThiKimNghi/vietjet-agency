const statusOptions = ['', 'Đã xác nhận', 'Chờ', 'Huỷ'];
const sortOptions = [
  { value: '', label: 'Không sắp xếp' },
  { value: 'id', label: 'Mã vé' },
  { value: 'date', label: 'Ngày bay' },
  { value: 'price', label: 'Giá' },
];

export default function BookingToolbar({
  searchTerm,
  statusFilter,
  sortKey,
  sortDirection,
  onSearchChange,
  onStatusChange,
  onSortKeyChange,
  onSortDirectionChange,
}: {
  searchTerm: string;
  statusFilter: string;
  sortKey: string;
  sortDirection: 'asc' | 'desc';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortKeyChange: (value: string) => void;
  onSortDirectionChange: (value: 'asc' | 'desc') => void;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
      <div>
        <label className="block text-sm font-medium text-slate-700" htmlFor="booking-search">
          Tìm kiếm
        </label>
        <input
          id="booking-search"
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Mã vé hoặc tên hành khách"
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
          onChange={(event) => onStatusChange(event.target.value)}
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
        <label className="block text-sm font-medium text-slate-700" htmlFor="sort-key">
          Sắp xếp theo
        </label>
        <select
          id="sort-key"
          value={sortKey}
          onChange={(event) => onSortKeyChange(event.target.value)}
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700" htmlFor="sort-direction">
          Hướng sắp xếp
        </label>
        <select
          id="sort-direction"
          value={sortDirection}
          onChange={(event) => onSortDirectionChange(event.target.value as 'asc' | 'desc')}
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
        >
          <option value="asc">Tăng dần</option>
          <option value="desc">Giảm dần</option>
        </select>
      </div>
    </div>
  );
}
