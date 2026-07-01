import Header from ".././components/Header";
import Sidebar from ".././components/Sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-slate-100 text-slate-900">
        <Header />

        <div className="flex min-h-[calc(100vh-72px)]">
          <Sidebar />

          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}