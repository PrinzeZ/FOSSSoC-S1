import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../config';
import { useLeaderboardData } from '../hooks/useLeaderboardData';
import Counter from '../components/common/Counter';
import GitBranchCalendar from '../components/common/GitBranchCalendar';
import Countdown from '../components/common/Countdown';
import { ExternalLink, Copy, Check, ArrowRight, ChevronDown } from 'lucide-react';

export default function HomePage() {
  const { stats } = useLeaderboardData();
  const [copied, setCopied] = useState(false);

  const cloneCommand = `git clone ${CONFIG.TEMPLATE_REPO_URL}.git`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      code: '01/PORTFOLIO_WEEK',
      title: 'Portfolio Week',
      dates: '24 to 31 Oct 2026',
      desc: 'Fork tkmfoss/portfolio-template, edit profile.json, make 3+ commits, enable GitHub Pages, and open one showcase PR by 31 Oct 11:59 PM IST.',
      link: '/portfolio',
      action: 'rules and template'
    },
    {
      code: '02/BUILD_MONTH',
      title: 'Build Month',
      dates: '1 to 30 Nov 2026',
      desc: 'Open-source project contributions. Issues are tagged Easy (10), Medium (25), or Hard (50). Earn +5 first-week bonus for early PRs opened in 1-7 Nov.',
      link: '/projects',
      action: 'browse repositories'
    },
    {
      code: '03/CHRISTMAS_EVE',
      title: 'Christmas Eve Month',
      dates: '1 to 24 Dec 2026',
      desc: 'Second contribution sprint. +5 first-week bonus in 1-7 Dec. Quality bonus (+5) on maintainer label. Max 5 scored PRs per repository. Last PRs open 20 Dec (proposed).',
      link: '/rules',
      action: 'points breakdown'
    },
    {
      code: '04/DEMO_DAY',
      title: 'Results and Demo Day',
      dates: '27 Dec 2026 (proposed)',
      desc: 'Final merge deadline 24 Dec (proposed). Closing ceremony and winners presentation at TKMCE. Threshold qualifiers receive seasonal awards.',
      link: '/leaderboard',
      action: 'live standings'
    }
  ];

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero Cover Viewport - Clean, Focused, Uncrowded (Full Viewport Fold) */}
      <section
        className="hero-cover-section"
        style={{
          minHeight: 'calc(100svh - 4.5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2.5rem 0 1.5rem 0',
          borderBottom: '1px solid var(--theme-border)',
          position: 'relative',
          boxSizing: 'border-box'
        }}
      >
        <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div
            style={{
              maxWidth: '820px',
              margin: 'auto',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            {/* Eyebrow Tag */}
            <div
              className="hero-eyebrow"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                flexWrap: 'wrap',
                padding: '0.35rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--theme-border)',
                background: 'rgba(255, 255, 255, 0.03)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.72rem, 2.5vw, 0.78rem)',
                color: 'var(--color-text-muted)',
                marginBottom: '1.5rem',
                letterSpacing: '0.04em',
                maxWidth: '100%',
                boxSizing: 'border-box'
              }}
            >
              <span>{CONFIG.ORGANIZER} // {CONFIG.NAME} // 24 OCT – 27 DEC 2026</span>
            </div>

            {/* Main Headline */}
            <h1
              className="hero-heading"
              style={{
                fontSize: 'clamp(2.4rem, 7vw, 4.2rem)',
                lineHeight: 1.12,
                marginBottom: '1.75rem',
                color: 'var(--color-white)',
                letterSpacing: '-0.035em',
                textAlign: 'center',
                fontWeight: 800,
                wordBreak: 'break-word'
              }}
            >
              {CONFIG.FULL_NAME}
            </h1>

            {/* Hero Primary Actions (Register CTA) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {CONFIG.REG_FORM_URL ? (
                <a
                  href={CONFIG.REG_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ padding: '0.65rem 1.6rem', fontSize: '0.9rem' }}
                >
                  <span>[ Register Now ]</span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <button
                  disabled
                  className="btn btn-disabled"
                  style={{ padding: '0.65rem 1.6rem', fontSize: '0.9rem' }}
                  title="Registration link will be announced soon"
                >
                  <span>[ Registration: Coming Soon ]</span>
                </button>
              )}

              {/* Quick links shown alongside on wider screens */}
              <div className="hero-desktop-links" style={{ display: 'inline-flex', gap: '0.75rem' }}>
                <Link to="/portfolio" className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem' }}>
                  <span>[ Portfolio Week ]</span>
                </Link>
                <Link to="/leaderboard" className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem' }}>
                  <span>[ Leaderboard ]</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Down Hint at bottom of hero viewport */}
          <a
            href="#about"
            className="hero-scroll-hint"
            style={{
              marginTop: 'auto',
              paddingTop: '2.5rem',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--color-text-subtle)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none'
            }}
          >
            <span>scroll down to explore</span>
            <ChevronDown size={15} className="bounce-subtle" color="var(--theme-primary)" />
          </a>
        </div>
      </section>

      {/* About Section - Spacious, Structured, and Informative */}
      <section
        id="about"
        style={{
          padding: '4.5rem 0 4rem 0',
          borderBottom: '1px solid var(--theme-border)',
          background: 'rgba(255, 255, 255, 0.015)'
        }}
      >
        <div className="container">
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--theme-primary)',
                marginBottom: '0.4rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              # 01 // about_the_initiative
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', marginBottom: '0.85rem' }}>
              About {CONFIG.NAME}
            </h2>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                lineHeight: 1.7,
                color: 'var(--color-text-main)',
                maxWidth: '820px',
                margin: '0 auto',
                fontWeight: 400
              }}
            >
              A 9-week open source initiative organized by <strong style={{ color: 'var(--color-white)' }}>{CONFIG.ORGANIZER}</strong> at <strong style={{ color: 'var(--color-white)' }}>{CONFIG.COLLEGE}</strong>. Built to guide developers through personal portfolio creation, Git collaboration, and contributing to production open-source repositories.
            </p>
          </div>

          {/* 3 Pillar Feature Cards - Wide, Long, Generously Spaced */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3.5rem'
            }}
          >
            {/* Pillar 1 */}
            <div
              className="glass-panel"
              style={{
                padding: '1.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--theme-primary)',
                  letterSpacing: '0.04em'
                }}
              >
                01 / SPRINT_TIMELINE
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-white)', fontWeight: 600 }}>
                9-Week Structured Sprint
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                Running from 24 Oct to 27 Dec 2026. Month 1 is Portfolio Week; Months 2 and 3 are hands-on project contributions across curated community repositories.
              </p>
            </div>

            {/* Pillar 2 */}
            <div
              className="glass-panel"
              style={{
                padding: '1.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--theme-primary)',
                  letterSpacing: '0.04em'
                }}
              >
                02 / PARTICIPATION
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-white)', fontWeight: 600 }}>
                Open to Everyone
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                Open to students of {CONFIG.COLLEGE} as well as external participants worldwide. Everyone is welcome to learn, contribute, and collaborate.
              </p>
            </div>

            {/* Pillar 3 */}
            <div
              className="glass-panel"
              style={{
                padding: '1.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--theme-primary)',
                  letterSpacing: '0.04em'
                }}
              >
                03 / RECOGNITION
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-white)', fontWeight: 600 }}>
                Points, Badges & Finale
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                Earn points for merged pull requests, maintain streaks, track live standings on the leaderboard, and present achievements at the Grand Finale on 27 Dec.
              </p>
            </div>
          </div>

            {/* Countdown Badge & Secondary Navigation Links */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                width: '100%'
              }}
            >
              <Countdown targetDate={CONFIG.KICKOFF_ISO} />

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.65rem',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                <Link to="/portfolio" className="btn btn-secondary btn-sm">
                  <span>[ Portfolio Week ]</span>
                </Link>
                <Link to="/leaderboard" className="btn btn-secondary btn-sm">
                  <span>[ Leaderboard ]</span>
                </Link>
                <Link to="/projects" className="btn btn-secondary btn-sm">
                  <span>[ Browse Projects ]</span>
                </Link>
              </div>
            </div>

            {/* Quickstart Command Bar for Month 1 */}
            <div
              style={{
                width: '100%',
                maxWidth: '640px',
                margin: '0 auto',
                padding: '0.65rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--theme-card-bg)',
                border: '1px solid var(--theme-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                boxSizing: 'border-box'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  flex: 1,
                  minWidth: 0,
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  color: 'var(--color-text-main)',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <span style={{ color: 'var(--theme-primary)', fontWeight: 700, flexShrink: 0 }}>$</span>
                <span style={{ whiteSpace: 'nowrap' }}>{cloneCommand}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                <button
                  onClick={handleCopy}
                  aria-label="Copy clone command"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--theme-border)',
                    background: copied ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    color: copied ? 'var(--color-success)' : 'var(--color-text-muted)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      <style>{`
        .hero-cover-section {
          min-height: calc(100vh - 4.5rem);
          min-height: calc(100dvh - 4.5rem);
          min-height: calc(100svh - 4.5rem);
        }
        @media (max-width: 640px) {
          .hero-cover-section {
            min-height: calc(100svh - 4.5rem) !important;
            padding: 1.5rem 0 1rem 0 !important;
          }
          .hero-eyebrow {
            margin-bottom: 1.1rem !important;
            font-size: 0.72rem !important;
            padding: 0.3rem 0.75rem !important;
          }
          .hero-heading {
            font-size: clamp(1.95rem, 7.5vw, 2.75rem) !important;
            margin-bottom: 1.25rem !important;
            line-height: 1.12 !important;
          }
          .hero-desktop-links {
            display: none !important;
          }
          .hero-scroll-hint {
            padding-top: 1.25rem !important;
            padding-bottom: 0.25rem !important;
          }
        }
      `}</style>

      {/* Stats Strip: Monospace counters showing dash for 0 or missing - Mobile friendly 2x2 grid */}
      <section style={{ padding: '2rem 0', borderBottom: '1px solid var(--theme-border)', background: 'var(--theme-card-bg)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
              gap: '1.25rem',
              fontFamily: 'var(--font-mono)',
              textAlign: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Registered Participants
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-white)', marginTop: '0.2rem' }}>
                <Counter value={stats.participants} />
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Showcase Portfolios Merged
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-white)', marginTop: '0.2rem' }}>
                <Counter value={stats.showcasePrs} />
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Project PRs Merged
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-white)', marginTop: '0.2rem' }}>
                <Counter value={stats.projectPrs} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Git Branch Architecture Calendar */}
      <section style={{ padding: '3.5rem 0', borderBottom: '1px solid var(--theme-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--theme-primary)', marginBottom: '0.3rem' }}>
              # season_branch_topology
            </div>
            <h2 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '0.4rem' }}>Season Calendar</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>
              Git branch visualization showing sprint merges and milestones from kickoff to demo day.
            </p>
          </div>

          <GitBranchCalendar />
        </div>
      </section>

      {/* 4-Step How It Works */}
      <section style={{ padding: '4rem 0 5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--theme-primary)', marginBottom: '0.3rem' }}>
              # workflow_phases
            </div>
            <h2 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '0.4rem' }}>How It Works</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', maxWidth: '540px', margin: '0 auto', textAlign: 'center' }}>
              Four progressive phases across October, November, and December.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.2rem'
            }}
          >
            {steps.map((step) => (
              <div
                key={step.code}
                style={{
                  padding: '1.6rem',
                  border: '1px solid var(--theme-border)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--theme-card-bg)',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--theme-primary)', fontWeight: 700, fontSize: '0.82rem' }}>
                    {step.code}
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-subtle)', marginBottom: '0.4rem' }}>
                  {step.dates}
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--color-white)' }}>
                  {step.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.4rem', flex: 1 }}>
                  {step.desc}
                </p>

                <Link
                  to={step.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--theme-primary)',
                    marginTop: 'auto'
                  }}
                >
                  <span>[{step.action}]</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
