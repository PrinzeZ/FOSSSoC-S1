import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { KICKOFF_ISO } from '../../config';
import { Clock } from 'lucide-react';

export default function Countdown({ targetDate = KICKOFF_ISO }) {
  if (!targetDate) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.6rem 1.2rem',
          border: '1px solid var(--theme-border)',
          background: 'var(--theme-card-bg)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem',
          fontFamily: 'var(--font-mono)'
        }}
      >
        <Clock size={16} color="var(--theme-primary)" />
        <span>Kickoff countdown: <strong style={{ color: 'var(--theme-primary)' }}>To be announced</strong></span>
      </div>
    );
  }

  const { days, hours, minutes, seconds, isLive } = useCountdown(targetDate);

  if (isLive) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.6rem 1.2rem',
          border: '1px solid var(--theme-primary)',
          background: 'var(--theme-card-bg)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem',
          fontFamily: 'var(--font-mono)'
        }}
      >
        <span style={{ color: 'var(--theme-primary)', fontWeight: 700 }}>● The season is live</span>
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
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.5rem 1rem',
        border: '1px solid var(--theme-border)',
        background: 'var(--theme-card-bg)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.9rem'
      }}
    >
      <Clock size={15} color="var(--theme-primary)" />
      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
        Kickoff in:
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        {units.map((unit) => (
          <span key={unit.label} style={{ color: 'var(--color-white)', fontWeight: 700 }}>
            {String(unit.val).padStart(2, '0')}<span style={{ color: 'var(--theme-primary)', fontSize: '0.75rem' }}>{unit.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
