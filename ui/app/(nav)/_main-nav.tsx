import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/links"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Links
      </Link>
      <Link
        href="/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
      <div className="text-sm font-medium cursor-default text-muted-foreground flex-row">
        <span>Campaigns</span>
        <Icons.lock className="pl-1 mb-1 h-4 w-4 inline" />
      </div>
      <div className="text-sm font-medium cursor-default text-muted-foreground flex-row">
        <span>Analytics</span>
        <Icons.lock className="pl-1 mb-1 h-4 w-4 inline" />
      </div>
    </nav>
  );
}
