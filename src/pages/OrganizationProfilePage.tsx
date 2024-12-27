import { OrganizationProfile } from '@clerk/clerk-react';
import Layout from '../components/Layout';
import { OrganizationHeader } from '../components/organization/OrganizationHeader';
import { RoleGuard } from '../components/auth/RoleGuard';

export default function OrganizationProfilePage() {
  return (
    <RoleGuard requiredPermission="manage_clubs">
      <Layout>
        <div className="max-w-4xl mx-auto">
          <OrganizationHeader />
          <div className="mt-8 bg-white shadow rounded-lg">
            <OrganizationProfile
              appearance={{
                elements: {
                  rootBox: 'w-full p-6',
                  card: 'w-full shadow-none p-0',
                  navbar: 'hidden',
                  pageScrollBox: 'p-0',
                  organizationSwitcherTrigger: 'hidden',
                  organizationPreview: {
                    marginBottom: '2rem'
                  },
                  formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
                  formFieldInput: 'rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }
              }}
            />
          </div>
        </div>
      </Layout>
    </RoleGuard>
  );
}