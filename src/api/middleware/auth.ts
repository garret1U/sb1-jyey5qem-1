import { createClerkClient } from '@clerk/clerk-sdk-node';
import { env } from '../../config/env';

const clerk = createClerkClient({
  secretKey: env.CLERK_SECRET_KEY
});

export interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string;
    sessionId: string;
  };
}

export async function withAuth(request: Request): Promise<AuthenticatedRequest> {
  const sessionId = request.headers.get('X-Clerk-Session-Id');
  const authenticatedRequest = request as AuthenticatedRequest;

  if (!sessionId) {
    return authenticatedRequest;
  }

  try {
    const session = await clerk.sessions.verifySession(sessionId);
    authenticatedRequest.auth = {
      userId: session.userId,
      sessionId: session.id
    };
  } catch (error) {
    console.error('Error validating session:', error);
  }

  return authenticatedRequest;
}