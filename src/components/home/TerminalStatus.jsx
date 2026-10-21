import React, { useState, useEffect } from 'react';
import { KICKOFF_ISO, VENUE, KICKOFF_TIME, DATES } from '../../config';

export default function TerminalStatus() {
  const [typedLines, setTypedLines] = useState([]);
  const [typingIndex, setTypingIndex] = useState(0);

  const kickoffDate = KICKOFF_ISO ? new Date(KICKOFF_ISO) : new Date('2026-10-24T10:00:00+05:30');
  const diffMs = kickoffDate.getTime() - new Date().getTime();
  const daysToKickoff = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const isLive = diffMs <= 0;

  const terminalOutput = [
    '$ season status --verbose',
    `> days_to_kickoff : ${isLive ? '0 (live)' : `${daysToKickoff} days`}`,
    `> current_phase   : ${isLive ? 'Season Live (Portfolio Week)' : 'Registration & Pre-season'}`,
    `> next_milestone  : Kickoff Workshop (${DATES.kickoffWorkshop})`,
    `> venue           : ${VENUE || 'To be announced'}`,
    `> time            : ${KICKOFF_TIME || 'To be announced'}`,
    `> branch          : origin/main -> portfolio-week (24 Oct)`,
    `> eligibility     : TKMCE students + external contributors worldwide`,
    `> status          : ready`
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTypedLines(terminalOutput);
      return;
    }

    if (typingIndex < terminalOutput.length) {
      const timeout = setTimeout(() => {
        setTypedLines((prev) => [...prev, terminalOutput[typingIndex]]);
        setTypingIndex((prev) => prev + 1);
      }, 75);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex]);

  return (
    <div
      style={{
        border: '1px solid var(--theme-border)',
        borderRadius: 'var(--radius-sm)',
        background: '#040406',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.82rem',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          padding: '0.45rem 0.8rem',
          background: 'rgba(255, 255, 255, 0.04)',
          borderBottom: '1px solid var(--theme-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'var(--color-text-subtle)',
          fontSize: '0.72rem'
        }}
      >
        <span>bash — fosssoc-cli — 80x24</span>
        <div style={{ display: 'flex', gap: '0.4rem', color: 'var(--color-text-subtle)' }}>
          <span>_</span>
          <span>□</span>
          <span>×</span>
        </div>
      </div>

      <div
        style={{
          padding: '1.2rem',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          color: 'var(--color-text-main)',
          lineHeight: 1.6
        }}
      >
        {typedLines.map((line, idx) => {
          const isCommand = line.startsWith('$');
          const isKey = line.startsWith('>');
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'baseline' }}>
              <span
                style={{
                  color: isCommand ? 'var(--theme-primary)' : isKey ? 'var(--color-white)' : 'var(--color-text-muted)',
                  fontWeight: isCommand ? 700 : 400
                }}
              >
                {line}
              </span>
            </div>
          );
        })}
        {typingIndex < terminalOutput.length && (
          <span style={{ color: 'var(--theme-primary)', animation: 'blink 1s step-start infinite' }}>
            █
          </span>
        )}
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
