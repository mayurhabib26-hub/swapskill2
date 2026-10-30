import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'full' | 'icon' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  to?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  to = '/',
}) => {
  // Dimensions
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  // Text color based on variant
  const textColor =
    variant === 'white' ? 'text-white' : 'text-[#020C21]';

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Wavy-lines-in-circle SVG — the final SwapSkill logo */}
      <svg
        className={`${iconSizes[size]} flex-shrink-0`}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="logo-clip">
            <circle cx="20" cy="20" r="18.2" />
          </clipPath>
        </defs>
        <circle
          cx="20"
          cy="20"
          r="18.4"
          stroke={variant === 'white' ? '#C5E9DC' : '#0d1b30'}
          strokeWidth="1.1"
        />
        <g
          clipPath="url(#logo-clip)"
          stroke={variant === 'white' ? '#C5E9DC' : '#0d1b30'}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13.2 4.6c3-.9 6.2-1 9.2-.1" strokeWidth="1.7" />
          <path d="M5.6 9.2c3.8-1.9 8-2.4 11.7-1.2 2.5.8 4.3 2.1 6.6 2.3 2 .2 4.2-.4 6.4-1.5" strokeWidth="2.3" />
          <path d="M2.6 13.9c4.4-2.4 9.4-3 13.6-1.5 2.4.9 4.1 2.3 6.4 2.4 2.3.1 4.7-1 7.1-2.4 1.6-.9 3.4-1.4 5.3-1.4" strokeWidth="2.7" />
          <path d="M1.6 18.7c4.8-2.7 10.1-3.2 14.4-1.6 1.8.7 3.2 1.6 4.7 2.1-1.7 1.3-3.4 2.2-5.1 2.6 2.9.5 5.9-.1 8.8-1.5 1.5-.7 2.9-1.6 4.4-2.3 1.9-.9 3.9-1.3 5.9-1.1" strokeWidth="2.9" />
          <path d="M1.9 24.1c4.5-2.4 9.6-3 13.9-1.6 2.3.7 4 1.9 6.2 2 2.4.1 5-.9 7.5-2.3 1.6-.9 3.3-1.4 5-1.4" strokeWidth="2.8" />
          <path d="M3.7 28.8c4.1-2 8.7-2.5 12.6-1.3 2.2.7 3.8 1.8 5.9 1.8 2.3.1 4.8-.8 7.1-2.1 1.2-.7 2.5-1.1 3.8-1.2" strokeWidth="2.4" />
          <path d="M7.6 32.9c3.5-1.5 7.4-1.9 10.6-.9 1.9.6 3.3 1.4 5 1.5 1.6.1 3.3-.3 5-1.1" strokeWidth="1.9" />
          <path d="M13.6 35.8c2.8-.9 5.8-1 8.6-.2" strokeWidth="1.5" />
        </g>
      </svg>

      {variant !== 'icon' && (
        <span
          style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, letterSpacing: '-0.02em' }}
          className={`text-[22px] leading-none ${textColor}`}
        >
          SwapSkill
        </span>
      )}
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="inline-block transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#063F83]/20 rounded-lg"
      >
        {content}
      </Link>
    );
  }

  return content;
};
