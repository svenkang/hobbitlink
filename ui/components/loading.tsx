import React from 'react';
import { Icons } from './icons';

const Loading = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Icons.spinner className="mr-2 h-8 w-8 animate-spin" />
    </main>
  );
};

export { Loading };
