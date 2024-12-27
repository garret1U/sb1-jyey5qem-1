import { env } from '../../config/env';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/backend';

const isDevelopment = import.meta.env.DEV;

export async function verifyWebhook(request: Request): Promise<Request> {
  // Skip verification in development
  if (isDevelopment) {
    return request;
  }

  const payloadString = await request.text();
  
  const svixHeaders = {
    'svix-id': request.headers.get('svix-id') ?? '',
    'svix-timestamp': request.headers.get('svix-timestamp') ?? '',
    'svix-signature': request.headers.get('svix-signature') ?? ''
  };
  
  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);
  
  try {
    const evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;
    const newRequest = new Request(request.url, {
      method: request.method,
      headers: request.headers,
      body: JSON.stringify(evt)
    });
    return newRequest;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    throw new Error('Webhook verification failed');
  }
}