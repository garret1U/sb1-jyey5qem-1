import { SignedIn, SignedOut, useOrganization, useUser } from '@clerk/clerk-react';
import { Target } from 'lucide-react';
import { SignInButton } from './auth/SignInButton';
import { UserButton } from './auth/UserButton';
import { useRole } from '../hooks/useRole';

export function Header() {
  const { isAdmin } = useRole();
  const { user } = useUser();
  const { organization, isLoaded } = useOrganization();
  
  const orgName = isLoaded ? organization?.name || 'Gun Club Scorer' : 'Loading...';
  const isOrgMember = user?.organizationMemberships?.length > 0;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-indigo-600" />
            <div className="ml-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {isOrgMember ? orgName : 'Gun Club Scorer'}
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}