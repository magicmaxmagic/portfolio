"use client";

import * as Sentry from "@sentry/nextjs";
import { withSentrySpan } from "@/lib/sentry-utils";

export default function ContactForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Record<string, string>;

    await withSentrySpan(
      "form.submit",
      "Contact Form Submit",
      async (span) => {
        span?.setAttribute("form_fields", Object.keys(data).join(","));

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            throw new Error(`Form submission failed: ${response.status}`);
          }

          span?.setStatus("ok" as any);
          alert("Message sent successfully!");
          e.currentTarget.reset();
        } catch (error) {
          span?.setStatus("error" as any);
          Sentry.captureException(error, {
            tags: { form: "contact" },
          });
          alert("Failed to send message. Please try again.");
        }
      },
      { user_email: data.email || "" }
    );
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-[color:var(--text-primary)]">
        Get in Touch
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-[color:var(--text-secondary)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-[color:var(--border-color)] rounded-lg bg-[color:var(--bg-secondary)] text-[color:var(--text-primary)]"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1 text-[color:var(--text-secondary)]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-2 border border-[color:var(--border-color)] rounded-lg bg-[color:var(--bg-secondary)] text-[color:var(--text-primary)]"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[color:var(--accent-blue)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
