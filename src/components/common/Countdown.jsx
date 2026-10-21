import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { KICKOFF_ISO } from '../../config';

export default function Countdown({ targetDate = KICKOFF_ISO }) {
  const commonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.65rem',
    minHeight: '2.4rem',
    padding: '0.35rem 1rem',
    border: '1px solid var(--theme-border)',
    background: 'var(--theme-card-bg)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.82rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--color-text-muted)',
    maxWidth: '100%',
    flexWrap: 'wrap',
    boxSizing: 'border-box'
  };

  if (!targetDate) {
    return (
      <div style={commonStyle}>
        <span style={{ color: 'var(--theme-primary)', fontWeight: 600 }}>STATUS: SCHEDULE TBD</span>
      </div>
    );
  }

  const { days, hours, minutes, seconds, isLive } = useCountdown(targetDate);

  if (isLive) {
    return (
      <div style={{ ...commonStyle, borderColor: 'var(--color-success)' }}>
        <span style={{ color: 'var(--color-success)', fontWeight: 700, lineHeight: 1 }}>STATUS: SEASON LIVE</span>
      </div>
    );
  }

  const units = [
    { label: 'D', val: days },
    { label: 'H', val: hours },
    { label: 'M', val: minutes },
    { label: 'S', val: seconds }
  ];

  return (
    <div style={commonStyle}>
      <span style={{ color: 'var(--theme-primary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em' }}>
        T-MINUS
      </span>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', lineHeight: 1 }}>
        {units.map((unit, idx) => (
          <React.Fragment key={unit.label}>
            <span style={{ color: 'var(--color-white)', fontWeight: 700 }}>
              {String(unit.val).padStart(2, '0')}
              <span style={{ color: 'var(--color-text-subtle)', fontSize: '0.72rem', marginLeft: '2px' }}>
                {unit.label}
              </span>
            </span>
            {idx < units.length - 1 && (
              <span style={{ color: 'var(--color-text-subtle)', opacity: 0.5 }}>:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
