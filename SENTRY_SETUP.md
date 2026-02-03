# Sentry Integration Guide

## Setup

### 1. Create Sentry Account
- Go to https://sentry.io
- Sign up / Login
- Create a new project (select **Next.js**)
- Copy your DSN

### 2. Add DSN to Environment
Create `.env.local`:
```
NEXT_PUBLIC_SENTRY_DSN=https://<key>@<org>.ingest.sentry.io/<project-id>
```

On Vercel:
- Go to Project Settings → Environment Variables
- Add `NEXT_PUBLIC_SENTRY_DSN` with your DSN value

### 3. Redeploy
```bash
git push
# Vercel will automatically redeploy with Sentry enabled
```

---

## Usage

### Exception Catching
```typescript
import { captureSentryException } from "@/lib/sentry-utils";

try {
  doSomething();
} catch (error) {
  captureSentryException(error as Error, {
    component: "MyComponent",
    action: "button_click",
  });
}
```

### Performance Tracing
```typescript
import { withSentrySpan } from "@/lib/sentry-utils";

const result = await withSentrySpan(
  "http.client",
  "Fetch User Data",
  async (span) => {
    const response = await fetch("/api/user");
    return response.json();
  },
  { userId: "user_123" }
);
```

### Manual Spans in React Components
```typescript
"use client";
import * as Sentry from "@sentry/nextjs";

function MyComponent() {
  const handleClick = () => {
    Sentry.startSpan(
      { op: "ui.click", name: "Button Click" },
      (span) => {
        span?.setAttribute("button_id", "submit-btn");
        doSomething();
      }
    );
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

### Error Boundaries
ErrorBoundary automatically captures React component errors in Sentry via `captureSentryException`.

---

## Monitoring Features

### 1. Error Tracking
- Automatic error capture with stack traces
- Console errors logged (warn, error levels)
- Component stack context for React errors

### 2. Performance Monitoring
- Tracing for API calls, form submissions, etc.
- Span timings and attributes
- Core Web Vitals tracking

### 3. Configuration
- **Sample Rate**: 10% in production, 100% in development
- **Logs**: Enabled for warn/error console logs
- **Environment**: Automatically set to `NODE_ENV`

---

## Sentry Dashboard

Once configured, monitor:
- **Issues** - Error list with trends
- **Releases** - Track errors per deployment
- **Performance** - Slow transactions and spans
- **Alerts** - Get notified of new errors

---

## Files

- `sentry.client.config.ts` - Client-side Sentry setup
- `sentry.server.config.ts` - Server-side Sentry setup
- `sentry.edge.config.ts` - Edge runtime setup
- `instrumentation.ts` - Next.js instrumentation
- `lib/sentry-utils.ts` - Helper utilities
- `components/ErrorBoundary.tsx` - Error boundary with Sentry
- `.env.example` - Environment template
