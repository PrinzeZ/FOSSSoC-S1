import React from 'react';
import { Link } from 'react-router-dom';
import { REG_FORM_URL, KICKOFF_ISO } from '../config';
import { useLeaderboardData } from '../hooks/useLeaderboardData';
import Countdown from '../components/common/Countdown';
import Counter from '../components/common/Counter';
import { ExternalLink, ChevronRight, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { stats } = useLeaderboardData();

  const steps = [
    {
      num: '01',
      title: 'Portfolio Week',
      dates: '24 to 31 Oct 2026',
      desc: 'Fork tkmfoss/portfolio-template, edit profile.json, make 3+ commits, enable GitHub Pages, and open one showcase PR by 31 Oct 11:59 PM IST.',
      link: '/portfolio',
      linkText: 'Portfolio rules'
    },
    {
      num: '02',
      title: 'Build Month',
      dates: '1 to 30 Nov 2026',
      desc: 'Open-source project contribution sprint. Earn points on merged PRs across issues tagged Easy (10), Medium (25), or Hard (50). +5 first-week bonus in 1-7 Nov.',
      link: '/projects',
      linkText: 'Repositories'
    },
    {
      num: '03',
      title: 'Christmas Eve Month',
      dates: '1 to 24 Dec 2026',
      desc: 'Second contribution sprint. +5 first-week bonus in 1-7 Dec. Quality bonus (+5) on maintainer label. Max 5 scored PRs per repository.',
      link: '/rules',
      linkText: 'Scoring system'
    },
    {
      num: '04',
      title: 'Results & Demo Day',
      dates: '27 Dec 2026 (proposed)',
      desc: 'Grand finale and closing ceremony. Top contributors who meet prize-eligibility thresholds receive awards. Prizes are to be announced.',
      link: '/leaderboard',
      linkText: 'Leaderboard'
    }
  ];

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero */}
      <section style={{ padding: '3.5rem 0 2.5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '780px', marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--theme-primary)', marginBottom: '0.6rem' }}>
              FOSS TKMCE // Season 1
            </div>

            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', lineHeight: 1.15, marginBottom: '1rem', color: 'var(--color-white)' }}>
              FOSS Season of Commit
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Organized by FOSS TKMCE, T.K.M. College of Engineering, Kollam. Open to students of TKMCE and external participants worldwide.
              Month 1 is Portfolio Week; Months 2 and 3 are open-source project contributions.
            </p>

            <div style={{ marginBottom: '1.8rem' }}>
              <Countdown targetDate={KICKOFF_ISO} />
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center' }}>
              {REG_FORM_URL ? (
                <a
                  href={REG_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}
                >
                  <span>Register</span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <button
                  disabled
                  className="btn btn-secondary"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', opacity: 0.6, cursor: 'not-allowed' }}
                >
                  Registration link coming soon
                </button>
              )}

              <Link to="/portfolio" className="btn btn-secondary" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                <span>Portfolio Week</span>
                <ChevronRight size={14} />
              </Link>

              <Link to="/leaderboard" className="btn btn-secondary" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                <span>Leaderboard</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Stats Strip: counters show dash when 0 or missing */}
      <section style={{ padding: '1rem 0 3rem 0' }}>
        <div className="container">
          <div
            style={{
              padding: '1.5rem',
              border: '1px solid var(--theme-border)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--theme-card-bg)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Participants
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-white)', marginTop: '0.2rem' }}>
                <Counter value={stats.participants} />
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Showcase Portfolios Merged
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-white)', marginTop: '0.2rem' }}>
                <Counter value={stats.showcasePrs} />
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Project PRs Merged
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-white)', marginTop: '0.2rem' }}>
                <Counter value={stats.projectPrs} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step How It Works */}
      <section style={{ padding: '2rem 0 4rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--theme-primary)', marginBottom: '0.3rem' }}>
              # workflow
            </div>
            <h2 style={{ fontSize: '1.8rem' }}>How It Works</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem'
            }}
          >
            {steps.map((step) => (
              <div
                key={step.num}
                style={{
                  padding: '1.5rem',
                  border: '1px solid var(--theme-border)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--theme-card-bg)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--theme-primary)', fontWeight: 700, fontSize: '1.2rem' }}>
                    {step.num}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {step.dates}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--color-white)' }}>
                  {step.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.2rem', flex: 1 }}>
                  {step.desc}
                </p>

                <Link
                  to={step.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--theme-primary)',
                    marginTop: 'auto'
                  }}
                >
                  <span>{step.linkText}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
