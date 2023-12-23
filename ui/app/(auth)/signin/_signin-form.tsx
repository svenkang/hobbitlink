'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/use-toast';
import { Icons } from '@/components/icons';

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function SignInForm({ className, ...props }: SignInFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { push } = useRouter();
  const { toast } = useToast();

  async function onSubmit(event: React.FormEvent<SignInFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const payload = {
      username: event.currentTarget.elements.email.value,
      password: event.currentTarget.elements.password.value,
    };

    const res = await fetch(`http://localhost:3030/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    });
    if (res.status == 200) {
      toast({
        title: 'Successfully Signed In',
        description:
          'You have successfully signed in. Redirecting to home page.',
      });
      const sessionId = res.headers.get('Set-Cookie');
      console.log(sessionId);
      push('/dashboard');
    } else {
      console.log(res);
      toast({
        title: 'Failed to Sign In',
        description:
          'Failed to sign in. Please make sure you have the correct credentials and try again.',
      });
    }
    setIsLoading(false);
  }
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              autoFocus
              disabled={isLoading}
            />
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
