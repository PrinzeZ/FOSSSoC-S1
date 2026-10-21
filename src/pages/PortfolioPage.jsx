import React, { useState } from 'react';
import { TEMPLATE_REPO_URL } from '../config';
import { POINTS } from '../rules';
import { useLeaderboardData } from '../hooks/useLeaderboardData';
import {
  GitFork,
  ExternalLink,
  Search,
  Globe
} from 'lucide-react';

export default function PortfolioPage() {
  const { data, loading } = useLeaderboardData();
  const [searchTerm, setSearchTerm] = useState('');
  const [hallFilter, setHallFilter] = useState('');

  const users = data?.users || [];
  const hall = data?.hall || [];

  const filteredUsers = users.filter((u) => {
    const q = searchTerm.toLowerCase();
    return (
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.user && u.user.toLowerCase().includes(q)) ||
      (u.department && u.department.toLowerCase().includes(q))
    );
  });

  const filteredHall = hall.filter((item) => {
    if (!item.site || typeof item.site !== 'string' || !item.site.startsWith('https://')) {
      return false;
    }
    const q = hallFilter.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.department && item.department.toLowerCase().includes(q)) ||
      (item.github && item.github.toLowerCase().includes(q))
    );
  });

  const steps = [
    'Fork tkmfoss/portfolio-template to your GitHub account',
    'Edit profile.json with your bio, projects, and skills',
    'Make 3 or more meaningful git commits',
    'Enable GitHub Pages in your repository settings',
    'Open one pull request adding showcase/<username>.json',
    'Submit before the deadline: 31 Oct 2026, 11:59 PM IST'
  ];

  return (
    <div className="section-spacing" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Portfolio Week</h1>
          <p style={{ maxWidth: '640px', fontSize: '0.95rem', marginBottom: '1.2rem' }}>
            Deadline: 31 Oct 2026, 11:59 PM IST. Build and publish your developer portfolio to kick off Season 1.
          </p>
          <a
            href={TEMPLATE_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
          >
            <GitFork size={14} />
            <span>tkmfoss/portfolio-template</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Steps & Points */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Steps */}
          <div
            style={{
              padding: '1.5rem',
              border: '1px solid var(--theme-border)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--theme-card-bg)'
            }}
          >
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
              Execution Steps
            </h3>
            <ol style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--color-text-muted)' }}>
              {steps.map((s, idx) => (
                <li key={idx}><span style={{ color: 'var(--color-text-main)' }}>{s}</span></li>
              ))}
            </ol>
          </div>

          {/* Points Table */}
          <div
            style={{
              padding: '1.5rem',
              border: '1px solid var(--theme-border)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--theme-card-bg)'
            }}
          >
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
              Scoring Rubric (Total: {POINTS.portfolio.total} pts)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.3rem' }}>
                <span>Fork template</span>
                <span style={{ color: 'var(--theme-primary)' }}>+{POINTS.portfolio.fork} pts</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.3rem' }}>
                <span>{POINTS.portfolio.minCommits}+ commits</span>
                <span style={{ color: 'var(--theme-primary)' }}>+{POINTS.portfolio.commits} pts</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.3rem' }}>
                <span>Live GitHub Pages site</span>
                <span style={{ color: 'var(--theme-primary)' }}>+{POINTS.portfolio.liveSite} pts</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.3rem' }}>
                <span>Showcase PR merged</span>
                <span style={{ color: 'var(--theme-primary)' }}>+{POINTS.portfolio.showcasePR} pts</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.3rem' }}>
                <span>Mentor rubric</span>
                <span style={{ color: 'var(--theme-primary)' }}>up to +{POINTS.portfolio.rubricMax} pts</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.3rem', fontWeight: 700, color: 'var(--color-white)' }}>
                <span>Maximum Total</span>
                <span>{POINTS.portfolio.total} pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submissions Board */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.8rem' }}>
            <h2 style={{ fontSize: '1.4rem' }}>Submissions Board</h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.75rem',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(0,0,0,0.2)'
              }}
            >
              <Search size={13} color="var(--color-text-muted)" />
              <input
                type="text"
                placeholder="filter by user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-white)',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none',
                  width: '180px'
                }}
              />
            </div>
          </div>

          {users.length === 0 ? (
            <div
              style={{
                padding: '3rem 1.5rem',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--theme-card-bg)',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem'
              }}
            >
              No submissions yet. Portfolio Week begins 24 Oct 2026.
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem'
              }}
            >
              {filteredUsers.map((u) => {
                const port = u.portfolio || {};
                return (
                  <div
                    key={u.user}
                    style={{
                      padding: '1rem',
                      border: '1px solid var(--theme-border)',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--theme-card-bg)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                      <span style={{ color: 'var(--color-white)', fontWeight: 600 }}>{u.name}</span>
                      <span style={{ color: 'var(--color-text-muted)' }}>@{u.user}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.8rem', fontSize: '0.72rem' }}>
                      <span style={{ border: '1px solid var(--theme-border)', padding: '0.1rem 0.4rem' }}>
                        fork: {port.fork ? '5' : '0'}/5
                      </span>
                      <span style={{ border: '1px solid var(--theme-border)', padding: '0.1rem 0.4rem' }}>
                        commits: {port.commits ? '5' : '0'}/5
                      </span>
                      <span style={{ border: '1px solid var(--theme-border)', padding: '0.1rem 0.4rem' }}>
                        live: {port.live ? '10' : '0'}/10
                      </span>
                      <span style={{ border: '1px solid var(--theme-border)', padding: '0.1rem 0.4rem' }}>
                        showcase: {port.showcase ? '10' : '0'}/10
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>
                        Rubric: {port.rubric !== null ? `${port.rubric}/20` : 'pending'}
                      </span>
                      <span style={{ color: 'var(--theme-primary)', fontWeight: 700 }}>
                        {port.total || 0}/50 pts
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Hall of Portfolios */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.8rem' }}>
            <h2 style={{ fontSize: '1.4rem' }}>Hall of Portfolios</h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.75rem',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(0,0,0,0.2)'
              }}
            >
              <Search size={13} color="var(--color-text-muted)" />
              <input
                type="text"
                placeholder="filter hall..."
                value={hallFilter}
                onChange={(e) => setHallFilter(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-white)',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none',
                  width: '180px'
                }}
              />
            </div>
          </div>

          {hall.length === 0 ? (
            <div
              style={{
                padding: '3rem 1.5rem',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--theme-card-bg)',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem'
              }}
            >
              No portfolios published in the hall yet.
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1rem'
              }}
            >
              {filteredHall.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.2rem',
                    border: '1px solid var(--theme-border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--theme-card-bg)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  <div style={{ color: 'var(--color-white)', fontWeight: 600, fontSize: '0.95rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.8rem' }}>
                    {item.department} {item.year ? `• Year ${item.year}` : ''}
                  </div>
                  <a
                    href={item.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'space-between', fontSize: '0.78rem' }}
                  >
                    <span>Visit site</span>
                    <ExternalLink size={12} />
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
