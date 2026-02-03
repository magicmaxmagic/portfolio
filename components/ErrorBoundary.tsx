"use client";

import { Component, PropsWithChildren, ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log errors (optional Sentry integration)
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      // Dynamic import to avoid build issues
      import("@sentry/nextjs").then((Sentry) => {
        Sentry.captureException(error, {
          contexts: {
            react: {
              componentStack: errorInfo.componentStack,
            },
          },
        });
      });
    } else {
      console.error("Error:", error);
      console.error("Error info:", errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
          <div className="text-center px-4">
            <h1 className="text-6xl font-bold mb-4 text-slate-900 dark:text-slate-50">Oops!</h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Something went wrong. We've been notified and are working on a fix.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
