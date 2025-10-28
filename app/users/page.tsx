import { UsersHeader } from '@/components/users/UsersHeader';
import { UsersGrid } from '@/components/users/UsersGrid';
import { UsersSearch } from '@/components/users/UsersSearch';
import { UsersFilters } from '@/components/users/UsersFilters';

export const metadata = {
  title: 'Users - DevForum',
  description: 'Browse and discover community members',
};

export default function UsersPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <UsersHeader />
      <UsersSearch />

      <div className="grid  gap-8">
        {/* <UsersFilters /> */}
        <UsersGrid />
      </div>
    </div>
  );
}
