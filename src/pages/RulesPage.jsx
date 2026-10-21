import React from 'react';
import { useLeaderboardData } from '../hooks/useLeaderboardData';

export default function RulesPage() {
  const { data } = useLeaderboardData();

  const thresholds = data?.thresholds || {
    october: { total: 35, rubric: 10 },
    month: { points: 50, prs: 2, mediumPlus: 1 },
    overall: { points: 120, months: 2, repos: 2 }
  };

  return (
    <div className="section-spacing" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--theme-primary)', marginBottom: '0.4rem' }}>
            # rules_and_scoring
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Rules & Points</h1>
          <p style={{ maxWidth: '640px', fontSize: '0.95rem' }}>
            Official contribution guidelines and scoring rubric for FOSSSoC-S1.
          </p>
        </div>

        {/* Level points */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
            Issue Levels & Base Points
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1.2rem', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-sm)', background: 'var(--theme-card-bg)', fontFamily: 'var(--font-mono)' }}>
              <div style={{ color: 'var(--theme-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Easy: 10 pts
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Mentor sets the level. Small bug fixes, documentation, minor UI adjustments.
              </div>
            </div>

            <div style={{ padding: '1.2rem', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-sm)', background: 'var(--theme-card-bg)', fontFamily: 'var(--font-mono)' }}>
              <div style={{ color: 'var(--theme-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Medium: 25 pts
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Mentor sets the level. Feature implementations, component logic, API updates.
              </div>
            </div>

            <div style={{ padding: '1.2rem', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-sm)', background: 'var(--theme-card-bg)', fontFamily: 'var(--font-mono)' }}>
              <div style={{ color: 'var(--theme-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                Hard: 50 pts
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Mentor sets the level. Architecture rewrites, complex subsystems, critical integrations.
              </div>
            </div>
          </div>
        </div>

        {/* Bonuses & Caps */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
            Bonuses & Capping Rules
          </h2>
          <div style={{ border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-sm)', background: 'var(--theme-card-bg)', padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', lineHeight: 1.8 }}>
            <div><strong style={{ color: 'var(--color-white)' }}>First-week bonus (+5 pts):</strong> Awarded on your earliest-opened scored PR in each repo, if opened in the first week of the month (1-7 Nov for Build Month; 1-7 Dec for Christmas Eve Month).</div>
            <div><strong style={{ color: 'var(--color-white)' }}>Quality bonus (+5 pts):</strong> Granted via maintainer's label for high code quality, tests, or documentation.</div>
            <div><strong style={{ color: 'var(--color-white)' }}>5 PRs per repo cap:</strong> Only the first 5 scored PRs per repository count towards points. Further PRs are capped at 0 pts.</div>
            <div><strong style={{ color: 'var(--color-white)' }}>Merge credit rule:</strong> Points are credited only after merge; a PR counts for the month it was opened.</div>
            <div><strong style={{ color: 'var(--color-white)' }}>Spam or invalid:</strong> 0 points. Automated or copy-pasted low-effort submissions are disqualified.</div>
          </div>
        </div>

        {/* Prize Eligibility */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
            Prize Eligibility Thresholds
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1.2rem', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-sm)', background: 'var(--theme-card-bg)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              <div style={{ color: 'var(--color-white)', fontWeight: 700, marginBottom: '0.5rem' }}>October (Portfolio Week)</div>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                <li>35 of 50 points total</li>
                <li>Merged showcase PR</li>
                <li>Live GitHub Pages site</li>
                <li>Mentor rubric at least 10 pts</li>
              </ul>
            </div>

            <div style={{ padding: '1.2rem', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-sm)', background: 'var(--theme-card-bg)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              <div style={{ color: 'var(--color-white)', fontWeight: 700, marginBottom: '0.5rem' }}>Monthly (Nov & Dec)</div>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                <li>50 points in that month</li>
                <li>At least 2 merged PRs</li>
                <li>At least one medium or hard PR</li>
              </ul>
            </div>

            <div style={{ padding: '1.2rem', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-sm)', background: 'var(--theme-card-bg)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              <div style={{ color: 'var(--color-white)', fontWeight: 700, marginBottom: '0.5rem' }}>Overall Season</div>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                <li>120 points total</li>
                <li>Active in 2 distinct months</li>
                <li>Contributions across 2 different repos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Not prize-eligible callout */}
        <div
          style={{
            padding: '1.4rem',
            border: '1px solid var(--theme-border)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--theme-card-bg)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: 1.6
          }}
        >
          <div style={{ color: 'var(--color-white)', fontWeight: 700, marginBottom: '0.3rem' }}>
            Note on Prize Eligibility
          </div>
          <div style={{ color: 'var(--color-text-muted)' }}>
            "Not prize-eligible" is not "disqualified". It simply denotes whether the minimum criteria to receive seasonal prizes have been met. If nobody qualifies in a category, no winner is awarded. All merged contributions remain valid open source commits.
          </div>
        </div>
      </div>
    </div>
  );
}
