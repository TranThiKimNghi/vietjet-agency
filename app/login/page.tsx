'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations/login.schema';
import type { LoginFormValues } from '@/lib/validations/login.schema';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log('Login form submitted:', data);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

            {/* LEFT */}
            <div className="space-y-6 p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-rose-500 text-xl font-bold text-white shadow-xl shadow-rose-200/40">
                  VJ
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-rose-600">
                    VietJet Booking
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    Đăng nhập
                  </h1>
                </div>
              </div>

              <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Hệ thống quản lý đại lý đặt vé VietJet. Vui lòng nhập thông tin để bắt đầu truy cập trang quản trị.
              </p>
            </div>

            {/* RIGHT */}
            <div className="rounded-[1.75rem] bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
              <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* IDENTIFIER */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email hoặc Tên đăng nhập
                  </label>

                  <input
                    type="text"
                    autoComplete="username"
                    placeholder="Nhập email hoặc tên đăng nhập"
                    {...register('identifier')}
                    className="mt-2 w-full rounded-3xl border px-4 py-3 text-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100
                    ${errors.identifier ? 'border-rose-500' : 'border-slate-300'}"
                  />

                  {errors.identifier && (
                    <p className="mt-2 text-sm text-rose-600">
                      {errors.identifier.message}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Mật khẩu
                  </label>

                  <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="Nhập mật khẩu"
                    {...register('password')}
                    className="mt-2 w-full rounded-3xl border px-4 py-3 text-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100
                    ${errors.password ? 'border-rose-500' : 'border-slate-300'}"
                  />

                  {errors.password && (
                    <p className="mt-2 text-sm text-rose-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* REMEMBER + FORGOT */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      {...register('remember')}
                      className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                    />
                    Ghi nhớ đăng nhập
                  </label>

                  <a href="#" className="text-sm font-medium text-rose-600 hover:text-rose-700">
                    Quên mật khẩu?
                  </a>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-3xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60"
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}