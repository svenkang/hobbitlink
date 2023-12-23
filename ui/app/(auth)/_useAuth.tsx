import { useToast } from '@/components/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const useAuth = () => {
  const { push } = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3030/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          toast({
            title: 'Failed to Authenticate',
            description:
              'Failed to authenticate the user. Please sign in. Redirecting to sign in page.',
          });
          push('/signin');
          setUser(null);
        }
      } catch (error) {
        push('/signin');
        setUser(null);
      }
    };
    if (!user) {
      fetchUser();
    }
  }, [user, push, toast]);

  return user;
};

export { useAuth };
