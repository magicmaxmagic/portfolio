import { NextResponse } from 'next/server';

// In-memory storage (in production, use Vercel KV or a database)
const reactions: Record<string, Record<string, number>> = {
  'ubisoft-attribution': { thumbsup: 12, heart: 8, fire: 5 },
  'medical-ner': { thumbsup: 15, heart: 10, fire: 7 },
  'text-clustering': { thumbsup: 9, heart: 6, fire: 3 },
  'prevent-saas': { thumbsup: 18, heart: 12, fire: 9 },
};

const reactionTypes = ['thumbsup', 'heart', 'fire'] as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectSlug = searchParams.get('projectSlug');

  if (!projectSlug) {
    return NextResponse.json(
      { error: 'projectSlug is required' },
      { status: 400 }
    );
  }

  const projectReactions = reactions[projectSlug] || {
    thumbsup: 0,
    heart: 0,
    fire: 0,
  };

  return NextResponse.json(projectReactions);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectSlug, reactionType } = body;

    if (!projectSlug || !reactionType) {
      return NextResponse.json(
        { error: 'projectSlug and reactionType are required' },
        { status: 400 }
      );
    }

    if (!reactionTypes.includes(reactionType)) {
      return NextResponse.json(
        { error: `Invalid reaction type. Must be one of: ${reactionTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Initialize project if doesn't exist
    if (!reactions[projectSlug]) {
      reactions[projectSlug] = {
        thumbsup: 0,
        heart: 0,
        fire: 0,
      };
    }

    // Increment reaction
    reactions[projectSlug][reactionType]++;

    // Track in Sentry if available
    try {
      const Sentry = await import('@sentry/nextjs').then(m => m.default);
      Sentry.captureMessage(
        `Project reaction: ${projectSlug} - ${reactionType}`,
        'info'
      );
    } catch {
      // Sentry not available
    }

    return NextResponse.json({
      success: true,
      reactions: reactions[projectSlug],
      message: `Added ${reactionType} reaction to ${projectSlug}`,
    });
  } catch (error) {
    console.error('Reaction error:', error);
    return NextResponse.json(
      { error: 'Failed to process reaction' },
      { status: 500 }
    );
  }
}
