"use client";

import * as Sentry from "@sentry/nextjs";
import { ReactNode } from "react";

interface SentryWrapperProps {
  children: ReactNode;
  operation: string;
  name: string;
}

/**
 * Wraps a component with Sentry tracing
 * Use for measuring performance of specific actions
 */
export function SentryWrapper({
  children,
  operation,
  name,
}: SentryWrapperProps) {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return children;
  }

  return Sentry.withProfiler(
    () => (
      <div data-sentry-span={name} data-sentry-op={operation}>
        {children}
      </div>
    ),
    { name, includeUpdates: true }
  );
}

/**
 * Hook for creating spans around async operations
 * Usage: await withSentrySpan('op.type', 'Operation Name', async () => { ... })
 */
export async function withSentrySpan<T>(
  op: string,
  name: string,
  fn: (span: Sentry.Span) => Promise<T>,
  attributes?: Record<string, any>
): Promise<T> {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return fn(null as any);
  }

  return Sentry.startSpan({ op, name }, async (span) => {
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        span?.setAttribute(key, value);
      });
    }
    return fn(span!);
  });
}

/**
 * Capture an exception in Sentry
 * Use in error boundaries or catch blocks
 */
export function captureSentryException(error: Error, context?: Record<string, any>) {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    console.error("Error:", error);
    return;
  }

  Sentry.captureException(error, {
    tags: {
      component: context?.component,
    },
    extra: context,
  });
}
