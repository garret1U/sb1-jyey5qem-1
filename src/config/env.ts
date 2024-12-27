function getEnvVar(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key];
  if (!value) {
    // Only throw for required variables
    if (key === 'VITE_CLERK_PUBLISHABLE_KEY' || key === 'VITE_CLERK_SECRET_KEY') {
    throw new Error(`Missing environment variable: ${key}`);
    }
    return '';
  }
  return value;
}

export const env = {
  CLERK_PUBLISHABLE_KEY: getEnvVar('VITE_CLERK_PUBLISHABLE_KEY'),
  CLERK_SECRET_KEY: getEnvVar('VITE_CLERK_SECRET_KEY'),
  CLERK_WEBHOOK_SECRET: getEnvVar('VITE_CLERK_WEBHOOK_SECRET'),
} as const;