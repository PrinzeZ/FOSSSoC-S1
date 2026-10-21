import React, { useState } from 'react';
import { useWinnersData } from '../hooks/useExtraData';
import { Trophy, Sparkles, Clock, ExternalLink, Award } from 'lucide-react';

export default function WinnersPage() {
  const { data, loading, error } = useWinnersData();
  const [activeTab, setActiveTab] = useState('overall');

  const tabLabels = {
    overall: 'Overall Season',
    october: 'October (Portfolio)',
    november: 'November Sprint',
    december: 'December Sprint'
  };

  const currentWinners = data ? data[activeTab] || [] : [];
  const allEmpty = !data || Object.values(data).every((arr) => !arr || arr.length === 0);

  return (
    <div className="section-spacing" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="chip" style={{ marginBottom: '1rem', padding: '0.45rem 1.1rem' }}>
            <Trophy size={15} />
            <span>Honors & Seasonal Awards</span>
          </div>
          <h1 style={{ marginBottom: '1rem' }}>Hall of Winners</h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem' }}>
            Celebrating top open source contributors, maintainers' choice awards, and seasonal sprint champions.
          </p>
        </div>

        {/* Tab Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}
        >
          {Object.entries(tabLabels).map(([key, label]) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: '0.6rem 1.3rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 700 : 500,
                  background: isActive ? 'var(--theme-primary)' : 'var(--theme-card-bg)',
                  color: isActive ? '#0b0813' : 'var(--color-text-muted)',
                  border: isActive ? '1px solid var(--theme-primary)' : '1px solid var(--theme-border)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
            <p>Loading winners records...</p>
          </div>
        ) : currentWinners.length === 0 ? (
          /* Empty 'To be announced' State */
          <div
            className="glass-panel"
            style={{
              padding: '4.5rem 2rem',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto',
              background: 'var(--theme-card-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--theme-border)'
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'var(--theme-badge-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                color: 'var(--theme-primary)'
              }}
            >
              <Trophy size={36} />
            </div>

            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem', color: 'var(--color-white)' }}>
              To be announced
            </h3>

            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.8rem', color: 'var(--color-text-muted)' }}>
              The winners for <strong>{tabLabels[activeTab]}</strong> will be published following the conclusion
              of the sprint evaluation period. Keep submitting quality pull requests and watch the live leaderboard!
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.82rem',
                color: 'var(--color-text-subtle)'
              }}
            >
              <Clock size={14} />
              <span>Sprint evaluations currently in progress</span>
            </div>
          </div>
        ) : (
          /* Winners Podium / List */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {currentWinners.map((winner, idx) => (
              <div
                key={winner.user || idx}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  background: 'var(--theme-card-bg)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '1rem',
                  borderTop: idx === 0 ? '4px solid #FFD166' : idx === 1 ? '4px solid #E2E8F0' : '4px solid #CD7F32'
                }}
              >
                <div style={{ fontSize: '2rem' }}>
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                </div>

                <img
                  src={`https://github.com/${winner.user}.png?size=120`}
                  alt={winner.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    border: '2px solid var(--theme-border)'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{winner.name}</h4>
                  <a
                    href={`https://github.com/${winner.user}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      color: 'var(--theme-primary)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <span>@{winner.user}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: 'var(--color-white)',
                    marginTop: 'auto'
                  }}
                >
                  {winner.points} pts
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
