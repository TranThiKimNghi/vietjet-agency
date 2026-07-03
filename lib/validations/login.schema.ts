import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Vui lòng nhập Email hoặc Tên đăng nhập'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  remember: z.boolean().optional(),
});

export type LoginSchema = typeof loginSchema;
export type LoginFormValues = z.infer<typeof loginSchema>;
