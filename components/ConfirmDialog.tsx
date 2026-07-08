export default function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
}: {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-900">{title ?? 'Xác nhận'}</h3>
        <p className="mt-3 text-sm text-slate-700">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-3xl border border-slate-200 bg-white px-4 py-2"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="rounded-3xl bg-red-600 px-4 py-2 text-white"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
