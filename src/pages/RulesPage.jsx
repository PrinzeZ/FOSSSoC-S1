import React from 'react';
import { useLeaderboardData } from '../hooks/useLeaderboardData';
import {
  Award,
  Zap,
  Star,
  ShieldCheck,
  AlertOctagon,
  Calendar,
  CheckCircle2,
  HelpCircle,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';

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
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="chip" style={{ marginBottom: '1rem', padding: '0.45rem 1.1rem' }}>
            <Award size={15} />
            <span>Scoring Rubric & Guidelines</span>
          </div>
          <h1 style={{ marginBottom: '1rem' }}>Rules & Points System</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', fontSize: '1.05rem' }}>
            Transparent scoring guidelines designed to reward genuine contributions, mentorship collaboration,
            code quality, and consistency throughout the 9-week season.
          </p>
        </div>

        {/* Level Points Breakdown */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            Issue Difficulty Levels
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* Easy: 10 pts */}
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                background: 'var(--theme-card-bg)',
                borderRadius: 'var(--radius-lg)',
                borderTop: '4px solid #10b981'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="chip chip-success">Easy Level</span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: '#10b981'
                  }}
                >
                  10 <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>pts</span>
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Introductory Fixes</h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>
                Small documentation guides, markdown corrections, CSS responsiveness patches, simple bug fixes, or minor utility scripts. Perfect for initial warmups.
              </p>
            </div>

            {/* Medium: 25 pts */}
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                background: 'var(--theme-card-bg)',
                borderRadius: 'var(--radius-lg)',
                borderTop: '4px solid #00bbf9'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="chip" style={{ color: '#00bbf9', borderColor: '#00bbf9' }}>Medium Level</span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: '#00bbf9'
                  }}
                >
                  25 <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>pts</span>
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Core Components</h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>
                New functional components, REST / WebSocket endpoints, state management refactors, test coverage suites, or database schema additions.
              </p>
            </div>

            {/* Hard: 50 pts */}
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                background: 'var(--theme-card-bg)',
                borderRadius: 'var(--radius-lg)',
                borderTop: '4px solid var(--theme-primary)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="chip" style={{ color: 'var(--theme-primary)', borderColor: 'var(--theme-primary)' }}>Hard Level</span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: 'var(--theme-primary)'
                  }}
                >
                  50 <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>pts</span>
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>Deep Architecture</h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>
                Major feature subsystems, protocol bridges, complex algorithmic optimizations, full-stack micro-services, or complex IoT / AI pipeline integrations.
              </p>
            </div>
          </div>
        </div>

        {/* Bonuses & Special Scoring */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            Sprint Bonuses
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}
          >
            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                background: 'var(--theme-card-bg)',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                <Zap size={22} color="var(--theme-primary)" />
                <h3 style={{ fontSize: '1.3rem' }}>First-Week Bonus (+5 pts)</h3>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                Awarded to the <strong>earliest-opened scored pull request</strong> per repository submitted during
                the first seven calendar days of the month:
              </p>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                <li>November Sprint: November 1 to November 7</li>
                <li>December Sprint: December 1 to December 7</li>
              </ul>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '2rem',
                background: 'var(--theme-card-bg)',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                <Star size={22} color="#FFD166" />
                <h3 style={{ fontSize: '1.3rem' }}>Mentor Quality Bonus (+5 pts)</h3>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                Awarded by the maintainer / mentor for pull requests with outstanding attention to detail:
                thorough test cases, clean git commit history, descriptive PR writeups, and exceptional code elegance.
              </p>
            </div>
          </div>
        </div>

        {/* Crucial Contribution Rules */}
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem 2rem',
            marginBottom: '4rem',
            background: 'var(--theme-card-bg)',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <CheckCircle2 size={24} color="var(--theme-primary)" />
            <span>Essential Contribution Policies</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
              <div style={{ marginTop: '0.2rem', color: 'var(--theme-primary)' }}>•</div>
              <div>
                <strong style={{ color: 'var(--color-white)' }}>Max 5 Scored PRs Per Repo:</strong>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginLeft: '0.4rem' }}>
                  To promote breadth of learning across multiple technologies, only the first 5 scored pull requests per repository count toward points. Further merged PRs are praised but labeled <code>capped, 0 pts</code>.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
              <div style={{ marginTop: '0.2rem', color: 'var(--theme-primary)' }}>•</div>
              <div>
                <strong style={{ color: 'var(--color-white)' }}>Merged PR Credit Rule:</strong>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginLeft: '0.4rem' }}>
                  Points are credited strictly after maintainer review and merge. A PR counts toward the month it was opened (e.g. opened Nov 29, merged Dec 2 counts toward November).
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
              <div style={{ marginTop: '0.2rem', color: 'var(--theme-primary)' }}>•</div>
              <div>
                <strong style={{ color: 'var(--color-white)' }}>Zero Tolerance for Spam / AI Plagiarism:</strong>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginLeft: '0.4rem' }}>
                  Unreviewed raw AI dumps, trivial whitespace changes, or copy-pasted solutions will be closed with 0 points and may result in exclusion from the leaderboard.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Prize Eligibility Thresholds */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            Prize Eligibility Thresholds
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}
          >
            <div
              className="glass-panel"
              style={{
                padding: '1.8rem',
                background: 'var(--theme-card-bg)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.6rem', color: 'var(--theme-primary)' }}>
                October Threshold
              </h4>
              <ul style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.7, paddingLeft: '1.2rem' }}>
                <li>Minimum Total: <strong>{thresholds.october.total} pts</strong></li>
                <li>Mentor Rubric: <strong>&ge; {thresholds.october.rubric} pts</strong></li>
                <li>Live HTTPS GitHub Pages link</li>
              </ul>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '1.8rem',
                background: 'var(--theme-card-bg)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.6rem', color: '#00F5D4' }}>
                Monthly Sprints (Nov / Dec)
              </h4>
              <ul style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.7, paddingLeft: '1.2rem' }}>
                <li>Minimum Points: <strong>{thresholds.month.points} pts</strong> in the month</li>
                <li>Merged PRs: <strong>&ge; {thresholds.month.prs} PRs</strong></li>
                <li>At least <strong>{thresholds.month.mediumPlus} Medium or Hard</strong> PR</li>
              </ul>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '1.8rem',
                background: 'var(--theme-card-bg)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.6rem', color: '#FFD166' }}>
                Overall Season Grand Prize
              </h4>
              <ul style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.7, paddingLeft: '1.2rem' }}>
                <li>Minimum Points: <strong>{thresholds.overall.points} pts</strong> overall</li>
                <li>Active in at least <strong>{thresholds.overall.months} distinct months</strong></li>
                <li>Contributions across at least <strong>{thresholds.overall.repos} distinct repos</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Callout Box: 'Not prize-eligible' is not 'disqualified' */}
        <div
          className="glass-panel"
          style={{
            padding: '2rem 2.2rem',
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.35)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1.2rem'
          }}
        >
          <div
            style={{
              padding: '0.6rem',
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.2)',
              color: '#3b82f6',
              flexShrink: 0
            }}
          >
            <Info size={26} />
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-white)', marginBottom: '0.5rem' }}>
              Important Note: "Not prize-eligible" is NOT "disqualified"
            </h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
              Prize eligibility solely defines the criteria for winning top physical prizes and cash awards at the grand finale.
              Every single contributor who participates, gets PRs merged, or builds a portfolio remains an active and valued
              member of FOSSSoC, earns verified community certificates, and accumulates genuine GitHub contributions for their future careers!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
