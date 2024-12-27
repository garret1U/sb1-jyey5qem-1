import { clerkClient } from '@clerk/clerk-sdk-node';
import { json } from '../utils/response';
import { getDomainFromEmail } from '../../utils/email';
import { ADMIN_GROUP_ID } from '../../config/clerk';

export async function handleUserCreated(req: Request) {
  const data = await req.json();
  const { data: { id: userId, email_addresses } } = data;
  
  const primaryEmail = email_addresses[0]?.email_address;
  const isAdmin = primaryEmail && getDomainFromEmail(primaryEmail) === 'oneuprising.com';
  
  try {
    if (isAdmin) {
      // Add user to Admin group
      await clerkClient.organizations.createOrganizationMembership({
        organizationId: ADMIN_GROUP_ID,
        userId,
        role: 'admin'
      });
    }
    
    return json({ success: true });
  } catch (error) {
    console.error('Error managing user roles:', error);
    return json({ success: false, error: 'Failed to manage user roles' }, { status: 500 });
  }
}