import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { SignUpForm } from '@/app/signup/signup-form';
import logo from '@/public/logo.svg';

export const metadata: Metadata = {
  title: 'Create an account - Hobbitlink',
  description: 'Create an account with Hobbitlink',
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
                Create an account
              </h1>
              <div className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </div>
            </div>
            <SignUpForm />
            <div className="px-8 text-center text-sm text-muted-foreground">
              Already have an account with us?&nbsp;
              <Link
                href="/signin"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign in
              </Link>
            </div>
            <div className="px-8 text-center text-sm text-muted-foreground">
              By clicking sign up, you agree to our{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
