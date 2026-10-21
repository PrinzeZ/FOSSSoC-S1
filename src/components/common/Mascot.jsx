import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function Mascot({ size = 110, className = '' }) {
  const { theme } = useTheme();

  return (
    <div
      className={`mascot-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 10px 20px var(--theme-glow))',
        cursor: 'pointer',
        transition: 'transform var(--transition-fast)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.08) rotate(-4deg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
      }}
      aria-label="Seasonal Mascot"
    >
      {theme === 'october' && (
        /* Spooky Octo-Pumpkin / Ghost */
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          {/* Ghostly body */}
          <path
            d="M50 15C32 15 20 28 20 48C20 68 18 84 27 82C36 80 40 86 50 82C60 86 64 80 73 82C82 84 80 68 80 48C80 28 68 15 50 15Z"
            fill="url(#octGhostGrad)"
          />
          {/* Witch Hat / Stem */}
          <path d="M50 8L60 22H40L50 8Z" fill="#FF7700" />
          <path d="M35 22C45 20 55 20 65 22C67 23 65 25 50 25C35 25 33 23 35 22Z" fill="#9D4EDD" />
          {/* Eyes */}
          <ellipse cx="40" cy="42" rx="4.5" ry="6.5" fill="#FF7700" />
          <ellipse cx="60" cy="42" rx="4.5" ry="6.5" fill="#FF7700" />
          <circle cx="41.5" cy="40.5" r="1.5" fill="#FFFFFF" />
          <circle cx="61.5" cy="40.5" r="1.5" fill="#FFFFFF" />
          {/* Jack-o-lantern smile */}
          <path
            d="M38 58C42 66 58 66 62 58C58 61 54 61 50 58C46 61 42 61 38 58Z"
            fill="#FF7700"
          />
          {/* Cheek blush */}
          <ellipse cx="32" cy="50" rx="3" ry="1.5" fill="rgba(255, 119, 0, 0.4)" />
          <ellipse cx="68" cy="50" rx="3" ry="1.5" fill="rgba(255, 119, 0, 0.4)" />
          <defs>
            <linearGradient id="octGhostGrad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
              <stop stop-color="#2D124D" />
              <stop offset="1" stop-color="#150928" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {theme === 'november' && (
        /* Cyber Matrix Bot */
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          {/* Antenna */}
          <line x1="50" y1="18" x2="50" y2="8" stroke="#00F5D4" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="7" r="4" fill="#00BBF9" />
          {/* Head chassis */}
          <rect x="22" y="18" width="56" height="52" rx="14" fill="url(#cyberBotGrad)" stroke="#00F5D4" strokeWidth="2.5" />
          {/* Visor display */}
          <rect x="28" y="30" width="44" height="20" rx="7" fill="#05121F" stroke="#00BBF9" strokeWidth="1.5" />
          {/* Glowing visor eye bar */}
          <rect x="34" y="37" width="32" height="6" rx="3" fill="#00F5D4" />
          <circle cx="42" cy="40" r="2" fill="#FFFFFF" />
          <circle cx="58" cy="40" r="2" fill="#FFFFFF" />
          {/* Circuit cheeks */}
          <path d="M26 42H22M74 42H78" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" />
          {/* Tech mouth audio wave */}
          <path d="M40 60H43M46 58V62M49 57V63M52 59V61M55 58V62M58 60H60" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" />
          {/* Body shoulders */}
          <path d="M30 70L24 86H76L70 70Z" fill="#0D223B" stroke="#00F5D4" strokeWidth="2" />
          <defs>
            <linearGradient id="cyberBotGrad" x1="22" y1="18" x2="78" y2="70" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0E2A47" />
              <stop offset="1" stop-color="#061324" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {theme === 'december' && (
        /* Winter Hacker Penguin / Yeti */
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          {/* Santa Hat */}
          <path d="M30 30C36 12 62 10 74 26C80 32 86 38 88 44" stroke="#EF233C" strokeWidth="12" strokeLinecap="round" />
          <circle cx="89" cy="46" r="6" fill="#FFFFFF" />
          <rect x="25" y="27" width="50" height="9" rx="4.5" fill="#FFFFFF" />
          {/* Penguin Body */}
          <ellipse cx="50" cy="58" rx="28" ry="30" fill="#0B1626" stroke="#2EC4B6" strokeWidth="2" />
          {/* White Belly */}
          <ellipse cx="50" cy="62" rx="18" ry="20" fill="#E2E8F0" />
          {/* Glasses / Visor */}
          <rect x="36" y="44" width="12" height="9" rx="3" fill="#2EC4B6" opacity="0.8" />
          <rect x="52" y="44" width="12" height="9" rx="3" fill="#2EC4B6" opacity="0.8" />
          <line x1="48" y1="48" x2="52" y2="48" stroke="#FFD166" strokeWidth="2" />
          {/* Beak */}
          <polygon points="50,54 44,58 56,58" fill="#FFD166" />
          {/* Scarf */}
          <path d="M26 68C38 74 62 74 74 68" stroke="#EF233C" strokeWidth="7" strokeLinecap="round" />
          <path d="M60 70V84" stroke="#EF233C" strokeWidth="6" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}
