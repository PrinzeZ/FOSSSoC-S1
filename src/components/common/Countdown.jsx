import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { KICKOFF_ISO } from '../../config';
import { Clock } from 'lucide-react';

export default function Countdown({ targetDate = KICKOFF_ISO }) {
  const commonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    minHeight: '2.5rem',
    padding: '0 1.25rem',
    border: '1px solid var(--theme-border)',
    background: 'var(--theme-card-bg)',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--color-text-muted)',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box'
  };

  if (!targetDate) {
    return (
      <div style={commonStyle}>
        <Clock size={14} color="var(--theme-primary)" style={{ flexShrink: 0, display: 'block' }} />
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', lineHeight: 1 }}>
          <span>Kickoff countdown:</span>
          <span style={{ color: 'var(--theme-primary)', fontWeight: 600 }}>To be announced</span>
        </span>
      </div>
    );
  }

  const { days, hours, minutes, seconds, isLive } = useCountdown(targetDate);

  if (isLive) {
    return (
      <div style={{ ...commonStyle, borderColor: 'var(--theme-primary)' }}>
        <span style={{ color: 'var(--theme-primary)', fontWeight: 700, lineHeight: 1 }}>● The season is live</span>
      </div>
    );
  }

  const units = [
    { label: 'd', val: days },
    { label: 'h', val: hours },
    { label: 'm', val: minutes },
    { label: 's', val: seconds }
  ];

  return (
    <div style={commonStyle}>
      <Clock size={14} color="var(--theme-primary)" style={{ flexShrink: 0, display: 'block' }} />
      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1 }}>
        Kickoff in:
      </span>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', lineHeight: 1 }}>
        {units.map((unit) => (
          <span key={unit.label} style={{ color: 'var(--color-white)', fontWeight: 700 }}>
            {String(unit.val).padStart(2, '0')}
            <span style={{ color: 'var(--theme-primary)', fontSize: '0.75rem', marginLeft: '1px' }}>
              {unit.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
