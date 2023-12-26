'use client';

import { useAuth } from '../(auth)/_useAuth';
import { Loading } from '@/components/loading';
import { TopNav } from '../(nav)/_top-nav';
import { Separator } from '@/components/separator';

function Links() {
  const user = useAuth();
  return user ? (
    <>
      <div className="hidden flex-col md:flex">
        <TopNav />
        <div className="hidden space-y-6 p-10 pb-16 md:block">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Links</h2>
            <p className="text-muted-foreground">Manage your links</p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <div className="flex-1 lg:max-w-2xl">Profile</div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export { Links };
