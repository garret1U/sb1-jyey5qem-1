import { withAuth } from './middleware/auth';
import { handleProtectedRequest } from './handlers/protected';
import { handleUserCreated } from './handlers/roles';
import { verifyWebhook } from './middleware/webhook';

export async function handleRequest(request: Request) {
  const url = new URL(request.url);
  
  // Webhook routes
  if (url.pathname === '/api/webhooks/user-created') {
    const verifiedRequest = await verifyWebhook(request);
    return handleUserCreated(verifiedRequest);
  }

  // Protected routes
  if (url.pathname === '/api/protected') {
    const authenticatedRequest = await withAuth(request);
    return handleProtectedRequest(authenticatedRequest);
  }

  return new Response('Not Found', { status: 404 });
}