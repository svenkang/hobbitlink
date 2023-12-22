import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import logo from '@/public/logo.svg';
import { SignInForm } from './signin-form';

export const metadata: Metadata = {
  title: 'Sign in - Hobbitlink',
  description: 'Sign into an account with Hobbitlink',
};

export default function Signup() {
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-items-center md:grid lg:max-w-none lg:px-0">
        <div>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center items-center">
              <Image
                src={logo}
                alt="Hobbitlink Logo"
                className="mr-2 h-12 w-12 pb-2"
              />
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome Back!
              </h1>
              <div className="text-sm text-muted-foreground">
                Enter your email below to sign into your account
              </div>
            </div>
            <SignInForm />
            <div className="px-8 text-center text-sm text-muted-foreground">
              Do not have an account with us yet?&nbsp;
              <Link
                href="/signup"
                className="underline underline-offset-4 hover:text-primary"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
