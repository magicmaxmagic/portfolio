"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <Container>
      <div className="py-16 max-w-2xl">
        <h1 className="text-5xl font-bold mb-8">Contact</h1>

        <section className="mb-12">
          <p className="text-xl mb-6">
            I'm open to conversations about applied ML roles, hard technical
            problems at scale, and companies solving real problems.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <a
                href="mailto:maxence@example.com"
                className="text-[color:var(--accent-blue)] hover:underline"
              >
                maxence@example.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-1">GitHub</h3>
              <a
                href="https://github.com/maxencelegendre"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--accent-blue)] hover:underline"
              >
                github.com/maxencelegendre
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-1">LinkedIn</h3>
              <a
                href="https://linkedin.com/in/maxencelegendre"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--accent-blue)] hover:underline"
              >
                linkedin.com/in/maxencelegendre
              </a>
            </div>
          </div>
        </section>

        <section className="pt-12 mt-12" style={{ borderTop: "1px solid var(--border-color)" }}>
          <h2 className="text-2xl font-bold mb-6">Send me a message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg border resize-none"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            {status === "error" && (
              <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(220, 38, 38, 0.1)", color: "#dc2626" }}>
                Error: {error}
              </div>
            )}

            {status === "success" && (
              <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#22c55e" }}>
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </section>

        <section className="pt-12 mt-12" style={{ borderTop: "1px solid var(--border-color)" }}>
          <h2 className="text-2xl font-bold mb-4">What to Include in Your Message</h2>
          <ul className="space-y-2">
            <li>
              <strong>The problem:</strong> What's the business context? Why does
              it matter?
            </li>
            <li>
              <strong>Your team:</strong> Who would I work with? What's the
              structure?
            </li>
            <li>
              <strong>Success metrics:</strong> How will we measure if the
              project succeeded?
            </li>
            <li>
              <strong>Timeline:</strong> Are we talking 3 months or 2 years?
            </li>
          </ul>
          <p className="mt-6">
            I prefer thoughtful introductions over generic recruiter messages.
            This helps me assess fit quickly.
          </p>
        </section>

        <section className="pt-12 mt-12" style={{ borderTop: "1px solid var(--border-color)" }}>
          <h2 className="text-2xl font-bold mb-4">Quick Facts</h2>
          <ul className="space-y-2">
            <li>
              <strong>Location:</strong> Paris (open to remote, willing to
              relocate for the right opportunity)
            </li>
            <li>
              <strong>Languages:</strong> French (native), English (fluent)
            </li>
            <li>
              <strong>Notice:</strong> 2 weeks (negotiable)
            </li>
            <li>
              <strong>Interested in:</strong> Applied ML, causal inference,
              production systems, early-stage companies
            </li>
          </ul>
        </section>
      </div>
    </Container>
  );
}
