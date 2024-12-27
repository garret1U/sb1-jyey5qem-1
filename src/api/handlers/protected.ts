import { AuthenticatedRequest } from '../middleware/auth';
import { unauthorized, json } from '../utils/response';

export async function handleProtectedRequest(req: AuthenticatedRequest) {
  if (!req.auth?.userId) {
    return unauthorized();
  }

  return json({
    message: `Hello, user ${req.auth.userId}`,
    timestamp: new Date().toISOString()
  });
}