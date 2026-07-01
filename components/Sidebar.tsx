"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Chuyến bay", href: "/flights" },
  { label: "Đặt vé", href: "/booking" },
  { label: "Khách hàng", href: "/customers" },
  { label: "Vé", href: "/tickets" },
];

export default function Sidebar() {
  const pathname = usePathname() || "/";

  return (
    <aside className="min-h-[calc(100vh-72px)] w-full max-w-[240px] border-r border-slate-200 bg-slate-50 px-4 py-6">
      <div className="mb-8 px-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Menu</p>
        <h2 className="mt-3 text-lg font-semibold text-slate-900">Điều hướng</h2>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-700 hover:bg-white hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
