'use client';

import { useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter an email address');
      return;
    }

    setLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing! Check your email to confirm.');
        setEmail('');
      } else {
        const error = await response.json();
        setStatus('error');
        setMessage(error.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again later.');
      console.error('Newsletter signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-[color:var(--border-color)]">
      <h3 className="text-lg font-bold text-[color:var(--text-primary)] mb-2">
        ML & AI Insights
      </h3>
      <p className="text-sm text-[color:var(--text-secondary)] mb-4">
        Get insights on production ML, causal inference, and data science in your inbox.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading || status === 'success'}
          className="px-4 py-2 rounded-lg bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] text-[color:var(--text-primary)] placeholder-[color:var(--text-tertiary)] focus:outline-none focus:border-[color:var(--accent-blue)] disabled:opacity-50"
        />
        
        <button
          type="submit"
          disabled={loading || status === 'success'}
          className="px-4 py-2 bg-[color:var(--accent-blue)] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-medium"
        >
          {loading ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
        </button>

        {status === 'success' && (
          <p className="text-sm text-green-400">{message}</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-400">{message}</p>
        )}
      </form>

      <p className="text-xs text-[color:var(--text-tertiary)] mt-3">
        No spam, unsubscribe anytime.
      </p>
    </div>
  );
}
