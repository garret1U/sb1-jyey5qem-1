import { ClerkProvider as BaseClerkProvider } from '@clerk/clerk-react';
import { env } from '../config/env';
import { clerkAppearance } from '../config/clerk';

interface ClerkProviderProps {
  children: React.ReactNode;
}

export function ClerkProvider({ children }: ClerkProviderProps) {
  if (!env.CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <BaseClerkProvider
      publishableKey={env.CLERK_PUBLISHABLE_KEY}
      appearance={clerkAppearance}
      afterSignOutUrl="/"
      afterSignInUrl="/"
      afterSignUpUrl="/"
    >
      {children}
    </BaseClerkProvider>
  );
}