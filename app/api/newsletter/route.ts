import { NextResponse } from 'next/server';

interface NewsletterSignup {
  email: string;
  subscribedAt: string;
  confirmed: boolean;
}

// Simple in-memory storage (in production, use a database or email service like Brevo/Mailchimp)
const subscribers: NewsletterSignup[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    if (subscribers.some(sub => sub.email === email)) {
      return NextResponse.json(
        { message: 'This email is already subscribed' },
        { status: 400 }
      );
    }

    // Add subscriber (in production, send confirmation email via Brevo/Mailchimp)
    subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
      confirmed: false, // Would be set to true after email confirmation
    });

    // TODO: Send confirmation email via Brevo or Mailchimp
    // For now, just log it
    console.log(`New newsletter subscriber: ${email}`);

    // Track in Sentry if available
    try {
      const Sentry = await import('@sentry/nextjs').then(m => m.default);
      Sentry.captureMessage(`Newsletter signup: ${email}`, 'info');
    } catch {
      // Sentry not available, continue
    }

    return NextResponse.json(
      { message: 'Successfully subscribed! Please confirm your email.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { message: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    subscribers: subscribers.length,
    confirmed: subscribers.filter(s => s.confirmed).length,
  });
}
