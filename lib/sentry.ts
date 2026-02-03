// Sentry configuration (optional monitoring)
// Initialize in your Sentry dashboard and add NEXT_PUBLIC_SENTRY_DSN to env variables

export const sentryConfig = {
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,
};

export function initSentry() {
  if (!sentryConfig.enabled) {
    console.info('Sentry monitoring disabled (no DSN configured)');
    return;
  }

  // Dynamic import to avoid issues during build
  import('@sentry/nextjs').then((Sentry) => {
    Sentry.init({
      dsn: sentryConfig.dsn,
      environment: sentryConfig.environment,
      tracesSampleRate: sentryConfig.tracesSampleRate,
    });
  });
}
