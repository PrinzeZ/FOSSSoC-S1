import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { REG_FORM_URL, KICKOFF_ISO } from '../constants/config';
import { useLeaderboardData } from '../hooks/useLeaderboardData';
import Countdown from '../components/common/Countdown';
import Counter from '../components/common/Counter';
import Mascot from '../components/common/Mascot';
import {
  ExternalLink,
  ChevronRight,
  Sparkles,
  Users,
  GitPullRequest,
  Code2,
  FolderGit2,
  CheckCircle2,
  Trophy,
  Flame,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const { stats, loading } = useLeaderboardData();

  // Letter-by-letter animation variants
  const titleText = 'FOSS Season of Commit';
  const subtitleText = 'Season 1 • Oct 24 – Dec 27, 2026';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const steps = [
    {
      num: '01',
      title: 'Portfolio Week',
      dates: 'Oct 24 – Oct 31',
      desc: 'Fork the official template, customize your personal developer showcase, deploy live on GitHub Pages, and submit your showcase PR for up to 50 points.',
      icon: FolderGit2,
      link: '/portfolio',
      linkText: 'Explore Portfolio Rules'
    },
    {
      num: '02',
      title: 'Pick Open Source Repos',
      dates: 'Nov 1 – Dec 27',
      desc: 'Browse curated campus web portals, mobile apps, and deep-tech repositories. Issues are tagged Easy (10 pts), Medium (25 pts), and Hard (50 pts).',
      icon: Code2,
      link: '/projects',
      linkText: 'Browse Repositories'
    },
    {
      num: '03',
      title: 'Submit PRs & Earn Bonuses',
      dates: 'Weekly sprints',
      desc: 'Collaborate with student mentors. Earn +5 first-week bonus for early PRs in Nov & Dec, plus +5 mentor quality bonus for clean, well-tested code.',
      icon: GitPullRequest,
      link: '/rules',
      linkText: 'View Scoring System'
    },
    {
      num: '04',
      title: 'Climb Leaderboard & Win',
      dates: 'Dec 27 Finale',
      desc: 'Achieve tier badges (Participant, Contributor, Core Hacker), reach monthly and overall prize-eligibility thresholds, and win seasonal awards.',
      icon: Trophy,
      link: '/leaderboard',
      linkText: 'View Live Board'
    }
  ];

  return (
    <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '4.5rem 0 3.5rem 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Seasonal Mascot */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ marginBottom: '1.2rem' }}
          >
            <Mascot size={110} />
          </motion.div>

          {/* Season Pill Badge */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="chip"
            style={{
              marginBottom: '1.2rem',
              padding: '0.45rem 1.1rem',
              fontSize: '0.82rem',
              gap: '0.5rem'
            }}
          >
            <Sparkles size={14} />
            <span>FOSS TKMCE • Official Open Source Season</span>
          </motion.div>

          {/* Letter by letter animated Hero Title */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.35rem',
              maxWidth: '900px',
              margin: '0 auto 1rem auto'
            }}
          >
            {titleText.split(' ').map((word, wordIdx) => (
              <span key={wordIdx} style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
                {word.split('').map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={letterVariants}
                    style={{
                      display: 'inline-block',
                      color: wordIdx === 3 ? 'var(--theme-primary)' : 'var(--color-white)',
                      textShadow: wordIdx === 3 ? '0 0 25px var(--theme-glow)' : 'none'
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                {/* Space between words */}
                <span style={{ display: 'inline-block', width: '0.35em' }}>&nbsp;</span>
              </span>
            ))}
          </motion.h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              maxWidth: '680px',
              margin: '0 auto 2.2rem auto',
              lineHeight: 1.6
            }}
          >
            A 9-week high-energy open source journey. Build your web developer portfolio in Week 1,
            then contribute real code to community repositories across November & December.
          </p>

          {/* Countdown to Kickoff */}
          <div style={{ marginBottom: '2.5rem' }}>
            <Countdown targetDate={KICKOFF_ISO} />
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3rem'
            }}
          >
            <a
              href={REG_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
            >
              <span>Register Now</span>
              <ExternalLink size={16} />
            </a>

            <Link
              to="/portfolio"
              className="btn btn-secondary"
              style={{ padding: '0.85rem 1.6rem', fontSize: '1rem' }}
            >
              <span>Portfolio Week</span>
              <ChevronRight size={16} />
            </Link>

            <Link
              to="/leaderboard"
              className="btn btn-secondary"
              style={{ padding: '0.85rem 1.6rem', fontSize: '1rem' }}
            >
              <span>Leaderboard</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ padding: '1rem 0 3.5rem 0' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: '2rem 1.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.8rem',
              background: 'var(--theme-card-bg)',
              border: '1px solid var(--theme-border)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            {/* Stat 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--theme-badge-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--theme-primary)',
                  border: '1px solid var(--theme-border)'
                }}
              >
                <Users size={26} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: 'var(--color-white)'
                  }}
                >
                  <Counter value={stats.participants} />
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Registered Participants
                </span>
              </div>
            </div>

            {/* Stat 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(16, 185, 129, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-success)',
                  border: '1px solid rgba(16, 185, 129, 0.25)'
                }}
              >
                <FolderGit2 size={26} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: 'var(--color-white)'
                  }}
                >
                  <Counter value={stats.showcasePrs} />
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Merged Showcase Portfolios
                </span>
              </div>
            </div>

            {/* Stat 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(0, 187, 249, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00bbf9',
                  border: '1px solid rgba(0, 187, 249, 0.25)'
                }}
              >
                <GitPullRequest size={26} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: 'var(--color-white)'
                  }}
                >
                  <Counter value={stats.projectPrs} />
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Merged Project PRs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step How It Works Section */}
      <section className="section-spacing">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span
              className="chip"
              style={{ marginBottom: '0.8rem', padding: '0.4rem 1rem' }}
            >
              The Season Roadmap
            </span>
            <h2 style={{ marginBottom: '0.8rem' }}>How FOSSSoC Works</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              A progressive 4-step path designed for all engineering students, from beginners crafting their first git commit to seasoned open-source hackers.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.8rem'
            }}
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="glass-panel"
                  style={{
                    padding: '2rem 1.6rem',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    background: 'var(--theme-card-bg)',
                    borderRadius: 'var(--radius-lg)'
                  }}
                >
                  {/* Step number badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: 'var(--theme-primary)',
                        opacity: 0.85
                      }}
                    >
                      {step.num}
                    </span>
                    <div
                      style={{
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--theme-badge-bg)',
                        color: 'var(--theme-primary)'
                      }}
                    >
                      <Icon size={20} />
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--theme-accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '0.4rem'
                    }}
                  >
                    {step.dates}
                  </span>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem' }}>
                    {step.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                    {step.desc}
                  </p>

                  <Link
                    to={step.link}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--theme-primary)',
                      marginTop: 'auto'
                    }}
                  >
                    <span>{step.linkText}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Banner Callout */}
      <section style={{ padding: '2rem 0 5rem 0' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              background: 'radial-gradient(circle at 50% 50%, var(--theme-surface-hover) 0%, var(--theme-card-bg) 100%)',
              border: '1px solid var(--theme-border-hover)',
              borderRadius: 'var(--radius-lg)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: '1rem' }}>
              Ready to leave your mark in Open Source?
            </h2>
            <p style={{ maxWidth: '650px', margin: '0 auto 2rem auto', fontSize: '1rem' }}>
              Registration is open to all students across all batches and branches. Join your peers, get assigned mentors, and begin your open-source journey.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={REG_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ padding: '0.85rem 2rem' }}
              >
                <span>Register for Season 1</span>
                <ExternalLink size={16} />
              </a>
              <Link to="/rules" className="btn btn-secondary" style={{ padding: '0.85rem 1.6rem' }}>
                <span>Read Official Rules</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
