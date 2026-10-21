import React, { useState } from 'react';
import { useWinnersData } from '../hooks/useExtraData';
import { ExternalLink } from 'lucide-react';

export default function WinnersPage() {
  const { data, loading } = useWinnersData();
  const [activeTab, setActiveTab] = useState('overall');

  const tabLabels = {
    overall: 'Overall',
    october: 'October (Portfolio)',
    november: 'November',
    december: 'Christmas Eve (December)'
  };

  const currentWinners = data ? data[activeTab] || [] : [];

  return (
    <div className="section-spacing" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--theme-primary)', marginBottom: '0.4rem' }}>
            # winners
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Winners</h1>
          <p style={{ maxWidth: '640px', fontSize: '0.95rem' }}>
            Sprint and overall champions for FOSSSoC-S1. Prizes are to be announced.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {Object.entries(tabLabels).map(([key, label]) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid ' + (isActive ? 'var(--theme-primary)' : 'var(--theme-border)'),
                  background: isActive ? 'var(--theme-primary)' : 'transparent',
                  color: isActive ? '#000000' : 'var(--color-text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            Loading winners...
          </div>
        ) : currentWinners.length === 0 ? (
          /* Empty 'To be announced' state */
          <div
            style={{
              padding: '3.5rem 2rem',
              border: '1px solid var(--theme-border)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--theme-card-bg)',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <div style={{ fontSize: '1.1rem', color: 'var(--color-white)', marginBottom: '0.3rem' }}>
              To be announced
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Winners for {tabLabels[activeTab]} will be announced after judging concludes.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem'
            }}
          >
            {currentWinners.map((w, idx) => (
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
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                  Rank #{idx + 1}
                </div>
                <div style={{ color: 'var(--color-white)', fontWeight: 700, fontSize: '1.05rem' }}>
                  {w.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--theme-primary)', marginBottom: '0.6rem' }}>
                  @{w.user}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-white)' }}>
                  {w.points} pts
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
