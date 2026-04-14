import { Suspense } from 'react';
import ProfilePageClient from './ProfilePageClient';
import { Skeleton } from '@/components/ui/skeleton';

function ProfileSkeleton() {
  return (
    <div>
      <Skeleton className="h-10 w-1/3 mb-2" />
      <Skeleton className="h-6 w-1/2 mb-8" />
      <div className="grid w-full grid-cols-3 gap-1.5 h-10 mb-6">
        <Skeleton className="h-full rounded-md" />
        <Skeleton className="h-full rounded-md" />
        <Skeleton className="h-full rounded-md" />
      </div>
      <Skeleton className="h-96 w-full rounded-lg" />
    </div>
  );
}

export default function ProfilePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const tab = typeof searchParams.tab === 'string' ? searchParams.tab : 'profile';
  
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfilePageClient defaultTab={tab} />
    </Suspense>
  );
}
