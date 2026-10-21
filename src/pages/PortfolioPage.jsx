import React, { useState } from 'react';
import { PORTFOLIO_TEMPLATE_URL, PORTFOLIO_DEADLINE_ISO, PORTFOLIO_POINTS } from '../constants/config';
import { useLeaderboardData } from '../hooks/useLeaderboardData';
import { useCountdown } from '../hooks/useCountdown';
import {
  FolderGit2,
  GitFork,
  GitCommit,
  Globe,
  GitPullRequest,
  Award,
  ExternalLink,
  Check,
  Clock,
  Search,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  User
} from 'lucide-react';

export default function PortfolioPage() {
  const { data, loading, error } = useLeaderboardData();
  const deadlineCountdown = useCountdown(PORTFOLIO_DEADLINE_ISO);
  const [searchTerm, setSearchTerm] = useState('');
  const [hallFilter, setHallFilter] = useState('');

  const users = data?.users || [];
  const hall = data?.hall || [];

  // Filter portfolio board users
  const filteredUsers = users.filter((u) => {
    const q = searchTerm.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.user.toLowerCase().includes(q) ||
      (u.department && u.department.toLowerCase().includes(q))
    );
  });

  // Filter hall of portfolios (only valid https:// links)
  const filteredHall = hall.filter((item) => {
    // CRITICAL: Only render links that start with https://
    if (!item.site || typeof item.site !== 'string' || !item.site.startsWith('https://')) {
      return false;
    }
    const q = hallFilter.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.department.toLowerCase().includes(q) ||
      item.github.toLowerCase().includes(q)
    );
  });

  return (
    <div className="section-spacing" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Header & Deadline Banner */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            className="chip chip-warning"
            style={{ marginBottom: '1rem', padding: '0.45rem 1.1rem' }}
          >
            <Clock size={15} />
            <span>
              Deadline: 31 Oct 2026, 11:59 PM IST
              {!deadlineCountdown.isLive && (
                <> ({deadlineCountdown.days}d {deadlineCountdown.hours}h {deadlineCountdown.minutes}m remaining)</>
              )}
            </span>
          </div>

          <h1 style={{ marginBottom: '1rem' }}>Portfolio Week</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto 2rem auto', fontSize: '1.05rem' }}>
            Month 1 is all about crafting your public developer persona. Fork our responsive portfolio template,
            personalize your bio and projects, publish to GitHub Pages, and submit your showcase pull request.
          </p>

          <a
            href={PORTFOLIO_TEMPLATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.85rem 1.8rem' }}
          >
            <GitFork size={18} />
            <span>Fork Portfolio Template</span>
            <ExternalLink size={15} />
          </a>
        </div>

        {/* 50 Points Breakdown Table */}
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem 2rem',
            marginBottom: '4rem',
            background: 'var(--theme-card-bg)',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
            <Award size={24} color="var(--theme-primary)" />
            <h2 style={{ fontSize: '1.5rem' }}>Points Breakdown (Total: 50 pts)</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.2rem'
            }}
          >
            <div
              style={{
                padding: '1.2rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--theme-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Action 1</span>
                <span className="chip" style={{ fontWeight: 800 }}>+{PORTFOLIO_POINTS.fork} pts</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Fork Template</h4>
              <p style={{ fontSize: '0.82rem' }}>Fork tkmfoss/portfolio-template to your GitHub profile.</p>
            </div>

            <div
              style={{
                padding: '1.2rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--theme-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Action 2</span>
                <span className="chip" style={{ fontWeight: 800 }}>+{PORTFOLIO_POINTS.commits} pts</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>3+ Meaningful Commits</h4>
              <p style={{ fontSize: '0.82rem' }}>Add your bio, tech stack, avatar, and projects across 3+ commits.</p>
            </div>

            <div
              style={{
                padding: '1.2rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--theme-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Action 3</span>
                <span className="chip" style={{ fontWeight: 800 }}>+{PORTFOLIO_POINTS.live} pts</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Live Site Deployment</h4>
              <p style={{ fontSize: '0.82rem' }}>Deploy via GitHub Pages with an active public HTTPS URL.</p>
            </div>

            <div
              style={{
                padding: '1.2rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--theme-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Action 4</span>
                <span className="chip" style={{ fontWeight: 800 }}>+{PORTFOLIO_POINTS.showcase} pts</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Showcase PR Merged</h4>
              <p style={{ fontSize: '0.82rem' }}>Submit and get your showcase entry PR merged to the main repo.</p>
            </div>

            <div
              style={{
                padding: '1.2rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 119, 0, 0.06)',
                border: '1px solid var(--theme-primary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--theme-primary)' }}>Review</span>
                <span className="chip chip-success" style={{ fontWeight: 800 }}>Up to +{PORTFOLIO_POINTS.rubricMax} pts</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Mentor Rubric</h4>
              <p style={{ fontSize: '0.82rem' }}>Evaluated for visual polish, responsiveness, accessibility, and content depth.</p>
            </div>
          </div>
        </div>

        {/* Section: Live Portfolio Board */}
        <div style={{ marginBottom: '5rem' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1.8rem'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>Portfolio Verification Board</h2>
              <p style={{ fontSize: '0.9rem' }}>
                Live verification checks for all registered participants from leaderboard.json.
              </p>
            </div>

            {/* Search Filter */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 1rem',
                background: 'var(--theme-card-bg)',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-md)',
                minWidth: '260px'
              }}
            >
              <Search size={16} color="var(--color-text-muted)" />
              <input
                type="text"
                placeholder="Search participant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-white)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>
          </div>

          {loading ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
              <p>Loading portfolio submissions...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
              <p>No participant matching "{searchTerm}".</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.2rem'
              }}
            >
              {filteredUsers.map((user) => {
                const port = user.portfolio || {};
                const isForkDone = port.fork > 0;
                const isCommitsDone = port.commits > 0;
                const isLiveDone = port.live > 0;
                const isShowcaseDone = port.showcase > 0;
                const isEligible = port.eligible;

                return (
                  <div
                    key={user.user}
                    className="glass-panel"
                    style={{
                      padding: '1.4rem',
                      background: 'var(--theme-card-bg)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem'
                    }}
                  >
                    {/* User header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={`https://github.com/${user.user}.png?size=80`}
                          alt={user.name}
                          style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div>
                          <h4 style={{ fontSize: '1rem', marginBottom: '0.1rem' }}>{user.name}</h4>
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                            @{user.user}
                          </span>
                        </div>
                      </div>

                      {/* Prize Eligible Badge */}
                      {isEligible && (
                        <span className="chip chip-success" title="Meets portfolio prize threshold">
                          <ShieldCheck size={13} />
                          <span>Prize-Eligible</span>
                        </span>
                      )}
                    </div>

                    {/* Check Chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      <span className={`chip ${isForkDone ? 'chip-success' : 'chip-muted'}`}>
                        {isForkDone ? <Check size={12} /> : null}
                        <span>Fork {isForkDone ? '+5' : '0/5'}</span>
                      </span>
                      <span className={`chip ${isCommitsDone ? 'chip-success' : 'chip-muted'}`}>
                        {isCommitsDone ? <Check size={12} /> : null}
                        <span>3+ Commits {isCommitsDone ? '+5' : '0/5'}</span>
                      </span>
                      <span className={`chip ${isLiveDone ? 'chip-success' : 'chip-muted'}`}>
                        {isLiveDone ? <Check size={12} /> : null}
                        <span>Live Site {isLiveDone ? '+10' : '0/10'}</span>
                      </span>
                      <span className={`chip ${isShowcaseDone ? 'chip-success' : 'chip-muted'}`}>
                        {isShowcaseDone ? <Check size={12} /> : null}
                        <span>Showcase PR {isShowcaseDone ? '+10' : '0/10'}</span>
                      </span>
                    </div>

                    {/* Score summary row */}
                    <div
                      style={{
                        marginTop: 'auto',
                        paddingTop: '0.8rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div>
                        <span style={{ color: 'var(--color-text-muted)' }}>Mentor Rubric: </span>
                        <strong style={{ color: port.rubric !== null ? 'var(--theme-primary)' : 'var(--color-text-subtle)' }}>
                          {port.rubric !== null ? `${port.rubric}/20` : 'Pending'}
                        </strong>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>Total:</span>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.2rem',
                            fontWeight: 800,
                            color: 'var(--color-white)'
                          }}
                        >
                          {port.total || 0}
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                            /50
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Section: Hall of Portfolios Gallery */}
        <div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1.8rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <Sparkles size={20} color="var(--theme-primary)" />
                <h2 style={{ fontSize: '1.8rem' }}>Hall of Portfolios</h2>
              </div>
              <p style={{ fontSize: '0.9rem' }}>
                Explore live published portfolios created by students during Season 1.
              </p>
            </div>

            {/* Filter */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 1rem',
                background: 'var(--theme-card-bg)',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-md)',
                minWidth: '240px'
              }}
            >
              <Search size={16} color="var(--color-text-muted)" />
              <input
                type="text"
                placeholder="Filter showcases..."
                value={hallFilter}
                onChange={(e) => setHallFilter(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-white)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>
          </div>

          {filteredHall.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3.5rem', textAlign: 'center' }}>
              <p>No verified showcase portfolios matching current criteria.</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}
            >
              {filteredHall.map((item, idx) => (
                <div
                  key={item.github || idx}
                  className="glass-panel"
                  style={{
                    padding: '1.5rem',
                    background: 'var(--theme-card-bg)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <img
                      src={`https://github.com/${item.github}.png?size=80`}
                      alt={item.name}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        border: '2px solid var(--theme-border)'
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div>
                      <h4 style={{ fontSize: '1.05rem', marginBottom: '0.15rem' }}>{item.name}</h4>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        {item.department} {item.year ? `• Year ${item.year}` : ''}
                      </div>
                    </div>
                  </div>

                  {/* Visit Site Button - Strictly validated to start with https:// */}
                  <a
                    href={item.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{
                      marginTop: 'auto',
                      width: '100%',
                      justifyContent: 'space-between',
                      borderColor: 'var(--theme-border)'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Globe size={14} color="var(--theme-primary)" />
                      <span>Visit site</span>
                    </span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
