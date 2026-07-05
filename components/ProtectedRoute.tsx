'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/authClient';

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();

  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) {
      router.replace('/login');
    }
  }, [authenticated, router]);

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}