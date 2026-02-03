'use client';

import { useCallback, useEffect, useState } from 'react';

interface ReactionButtonsProps {
  projectSlug: string;
  size?: 'small' | 'medium';
}

type ReactionType = 'thumbsup' | 'heart' | 'fire';

interface Reactions {
  thumbsup: number;
  heart: number;
  fire: number;
}

const reactionEmojis: Record<ReactionType, string> = {
  thumbsup: '👍',
  heart: '❤️',
  fire: '🔥',
};

const reactionLabels: Record<ReactionType, string> = {
  thumbsup: 'Like',
  heart: 'Love',
  fire: 'Fire',
};

export function ReactionButtons({ projectSlug, size = 'medium' }: ReactionButtonsProps) {
  const [reactions, setReactions] = useState<Reactions>({
    thumbsup: 0,
    heart: 0,
    fire: 0,
  });
  const [loading, setLoading] = useState(false);
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [isClient, setIsClient] = useState(false);

  const fetchReactions = useCallback(async () => {
    try {
      const response = await fetch(`/api/reactions?projectSlug=${projectSlug}`);
      if (response.ok) {
        const data = await response.json();
        setReactions(data);
      }
    } catch (error) {
      console.error('Failed to fetch reactions:', error);
    }
  }, [projectSlug]);

  useEffect(() => {
    setIsClient(true);
    // Load reactions from API
    fetchReactions();

    // Load user's previous reaction from localStorage
    const savedReaction = localStorage.getItem(`reaction-${projectSlug}`);
    if (savedReaction) {
      setUserReaction(savedReaction as ReactionType);
    }
  }, [projectSlug, fetchReactions]);

  const handleReaction = async (reactionType: ReactionType) => {
    setLoading(true);
    try {
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectSlug,
          reactionType,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setReactions(data.reactions);
        setUserReaction(reactionType);

        // Save user's reaction to localStorage
        localStorage.setItem(`reaction-${projectSlug}`, reactionType);

        // Trigger success animation
        const button = document.querySelector(
          `[data-reaction="${reactionType}-${projectSlug}"]`
        );
        if (button) {
          button.classList.add('scale-125');
          setTimeout(() => button.classList.remove('scale-125'), 200);
        }
      }
    } catch (error) {
      console.error('Failed to add reaction:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  const sizeClasses = size === 'small' ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm';
  const emojiSize = size === 'small' ? 'text-base' : 'text-lg';

  return (
    <div className="flex gap-2 flex-wrap">
      {(Object.keys(reactionEmojis) as ReactionType[]).map((reactionType) => (
        <button
          key={reactionType}
          onClick={() => handleReaction(reactionType)}
          disabled={loading}
          data-reaction={`${reactionType}-${projectSlug}`}
          className={`
            ${sizeClasses}
            rounded-full border border-[color:var(--border-color)]
            bg-[color:var(--bg-secondary)] hover:bg-[color:var(--bg-tertiary)]
            transition-all duration-200
            flex items-center gap-1
            font-medium
            ${userReaction === reactionType 
              ? 'border-[color:var(--accent-blue)] bg-blue-500/10' 
              : ''
            }
            disabled:opacity-50
            hover:scale-110
          `}
          title={reactionLabels[reactionType]}
        >
          <span className={emojiSize}>{reactionEmojis[reactionType]}</span>
          <span className="text-[color:var(--text-secondary)]">
            {reactions[reactionType]}
          </span>
        </button>
      ))}
    </div>
  );
}
