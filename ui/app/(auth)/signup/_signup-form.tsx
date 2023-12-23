'use client';
import * as React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Icons } from '@/components/icons';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/form';
import { useToast } from '@/components/use-toast';
import { useRouter } from 'next/navigation';

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const USERNAME_MIN_CHAR = 2;
const USERNAME_MAX_CHAR = 256;
const PASSWORD_MIN_LOWER_CASE = 1;
const PASSWORD_MIN_UPPER_CASE = 1;
const PASSWORD_MIN_NUMERALS = 1;
const PASSWORD_MIN_SPECIAL_CHAR = 1;
const PASSWORD_MIN_CHAR = 8;
const PASSWORD_MAX_CHAR = 256;

const PASSWORD_REGEXP = new RegExp(
  `^(?=(.*[a-z]){${PASSWORD_MIN_LOWER_CASE},})(?=(.*[A-Z]){${PASSWORD_MIN_UPPER_CASE},})(?=(.*[0-9]){${PASSWORD_MIN_NUMERALS},})(?=(.*[\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\-\\_\\+\\.\\,\\?\\/\\[\\]\\\`\\~\\<\\>\\:\\;\\"\\'\\\\]){${PASSWORD_MIN_SPECIAL_CHAR},}).{${PASSWORD_MIN_CHAR},}$`,
);

const formSchema = z.object({
  username: z
    .string()
    .min(
      USERNAME_MIN_CHAR,
      `Email must be at least ${USERNAME_MIN_CHAR} characters long`,
    )
    .max(
      USERNAME_MAX_CHAR,
      `Email must be no longer than ${USERNAME_MAX_CHAR} characters`,
    ),
  password: z
    .string()
    .min(
      PASSWORD_MIN_CHAR,
      `Password must be at least ${PASSWORD_MIN_CHAR} characters long`,
    )
    .max(
      PASSWORD_MAX_CHAR,
      `Password must be no longer than ${PASSWORD_MAX_CHAR} characters`,
    )
    .regex(
      PASSWORD_REGEXP,
      `Password must contain at least ${PASSWORD_MIN_NUMERALS} numeral character, ${PASSWORD_MIN_SPECIAL_CHAR} special character, ${PASSWORD_MIN_LOWER_CASE} lower case character, ${PASSWORD_MIN_UPPER_CASE} upper case character`,
    ),
});

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const { push } = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);

    const res = await fetch(`http://localhost:3030/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (res.status == 200 || res.status == 201) {
      toast({
        title: 'User Successfully Created',
        description: `User has been successfully created with ${values.username}. Please try signing into the account.`,
      });
      push('/signin');
    } else if (res.status == 400) {
      toast({
        title: 'Invalid request',
        description: `Given email and or password is not valid. Please try again with a valid email and a stronger password`,
      });
    } else if (res.status == 409) {
      toast({
        title: 'Email Conflict',
        description: `User with the given email ${values.username} already exists. Please try logging in or try again with another email.`,
      });
    } else {
      toast({
        title: 'Something Went Wrong',
        description: `It looks like something went wrong. Please try again later or contact support.`,
      });
    }
    setIsLoading(false);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        autoFocus
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign up with Email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
