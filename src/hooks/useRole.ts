import { useAuth } from '@clerk/clerk-react';
import { UserRole } from '../types/roles';
import { hasPermission } from '../utils/permissions';
import { ADMIN_GROUP_ID } from '../config/clerk';

export function useRole() {
  const { user } = useAuth();
  const isAdmin = user?.organizationMemberships?.some(
    membership => membership.organization.id === ADMIN_GROUP_ID
  ) ?? false;
  const role: UserRole = isAdmin ? 'admin' : 'member';

  return {
    role,
    isAdmin,
    hasPermission: (permission: string) => hasPermission(role, permission)
  };
}