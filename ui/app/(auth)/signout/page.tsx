'use client';

import { Loading } from '@/components/loading';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const { push } = useRouter();
  const onSignOut = async () => {
    const res = await fetch(`http://localhost:3030/auth/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    push('/signin');
  };
  onSignOut();
  return <Loading />;
}
