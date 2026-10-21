import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { KICKOFF_ISO } from '../../constants/config';
import { Flame, Clock } from 'lucide-react';

export default function Countdown({ targetDate = KICKOFF_ISO }) {
  const { days, hours, minutes, seconds, isLive } = useCountdown(targetDate);

  if (isLive) {
    return (
      <div
        className="glass-panel"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.8rem',
          padding: '0.8rem 1.8rem',
          borderRadius: 'var(--radius-full)',
          background: 'var(--theme-surface)',
          border: '1px solid var(--theme-primary)',
          boxShadow: '0 0 25px var(--theme-glow)'
        }}
      >
        <Flame size={22} color="var(--theme-primary)" className="pulse" />
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            color: 'var(--color-white)',
            textTransform: 'uppercase'
          }}
        >
          The season is live!
        </span>
      </div>
    );
  }

  const units = [
    { label: 'Days', val: days },
    { label: 'Hours', val: hours },
    { label: 'Mins', val: minutes },
    { label: 'Secs', val: seconds }
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.7rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--theme-primary)'
        }}
      >
        <Clock size={16} />
        <span>Kickoff Countdown</span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}
      >
        {units.map((unit, idx) => (
          <React.Fragment key={unit.label}>
            <div
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '68px',
                padding: '0.6rem 0.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--theme-card-bg)',
                border: '1px solid var(--theme-border)'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.65rem',
                  fontWeight: 800,
                  color: 'var(--color-white)',
                  lineHeight: 1
                }}
              >
                {String(unit.val).padStart(2, '0')}
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--color-text-muted)',
                  marginTop: '0.25rem'
                }}
              >
                {unit.label}
              </span>
            </div>
            {idx < units.length - 1 && (
              <span
                style={{
                  color: 'var(--theme-primary)',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  opacity: 0.6
                }}
              >
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
