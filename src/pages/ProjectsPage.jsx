import React, { useState } from 'react';
import { useProjectsData } from '../hooks/useProjectsData';
import { UNLOCK_DATES } from '../config';
import { Lock, Unlock, ExternalLink } from 'lucide-react';

export default function ProjectsPage() {
  const { data, loading, isUnlockedBypass } = useProjectsData();
  const [selectedMonth, setSelectedMonth] = useState('october');
  const [selectedField, setSelectedField] = useState('All');

  const isMonthLocked = (monthKey) => {
    if (isUnlockedBypass) return false;
    const unlockDateStr = UNLOCK_DATES[monthKey];
    if (!unlockDateStr) return false;
    return new Date().getTime() < new Date(unlockDateStr).getTime();
  };

  const monthConfig = {
    october: { title: 'October', subtitle: 'Portfolio Week', unlockText: 'Unlocked' },
    november: { title: 'November', subtitle: 'Build Month', unlockText: 'November 1' },
    december: { title: 'December', subtitle: 'Christmas Eve Month', unlockText: 'December 1' }
  };

  const currentMonthData = data ? data[selectedMonth] : null;
  const repos = currentMonthData?.repos || [];
  const isLocked = isMonthLocked(selectedMonth);

  const allFields = ['All'];
  if (data) {
    Object.values(data).forEach((m) => {
      m.repos?.forEach((r) => {
        if (r.field && !allFields.includes(r.field)) {
          allFields.push(r.field);
        }
      });
    });
  }

  const filteredRepos = repos.filter((r) => {
    if (selectedField === 'All') return true;
    return r.field === selectedField;
  });

  return (
    <div className="section-spacing" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--theme-primary)', marginBottom: '0.4rem' }}>
            # repositories
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Projects Directory</h1>
          <p style={{ maxWidth: '640px', fontSize: '0.95rem' }}>
            Official repositories maintained by FOSS TKMCE for Season 1. Only issues tagged by mentors count towards points.
          </p>

          {isUnlockedBypass && (
            <div
              style={{
                marginTop: '0.8rem',
                padding: '0.3rem 0.6rem',
                border: '1px solid var(--color-warning)',
                borderRadius: 'var(--radius-sm)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-warning)'
              }}
            >
              <Unlock size={12} />
              <span>Preview active: locked months unlocked via ?unlock=1</span>
            </div>
          )}
        </div>

        {/* Month Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['october', 'november', 'december'].map((monthKey) => {
            const isActive = selectedMonth === monthKey;
            const locked = isMonthLocked(monthKey);
            const cfg = monthConfig[monthKey];

            return (
              <button
                key={monthKey}
                onClick={() => {
                  setSelectedMonth(monthKey);
                  setSelectedField('All');
                }}
                style={{
                  padding: '0.55rem 1.1rem',
                  border: '1px solid ' + (isActive ? 'var(--theme-primary)' : 'var(--theme-border)'),
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'var(--theme-card-bg)' : 'transparent',
                  color: isActive ? 'var(--color-white)' : 'var(--color-text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {locked ? <Lock size={13} color="var(--color-warning)" /> : null}
                <span>{cfg.title}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-subtle)' }}>({cfg.subtitle})</span>
              </button>
            );
          })}
        </div>

        {/* Field Filters */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {allFields.map((field) => {
            const isFieldActive = selectedField === field;
            return (
              <button
                key={field}
                onClick={() => setSelectedField(field)}
                style={{
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid ' + (isFieldActive ? 'var(--theme-primary)' : 'var(--theme-border)'),
                  background: isFieldActive ? 'var(--theme-primary)' : 'transparent',
                  color: isFieldActive ? '#000000' : 'var(--color-text-muted)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer'
                }}
              >
                {field}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            Loading repositories...
          </div>
        ) : isLocked ? (
          /* Blurred locked card */
          <div
            style={{
              padding: '3rem 2rem',
              border: '1px solid var(--theme-border)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--theme-card-bg)',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <div style={{ color: 'var(--color-warning)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
              <Lock size={24} />
            </div>
            <div style={{ fontSize: '1.1rem', color: 'var(--color-white)', marginBottom: '0.3rem' }}>
              Unlocks on {monthConfig[selectedMonth]?.unlockText}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Projects for {monthConfig[selectedMonth]?.title} will be revealed on {monthConfig[selectedMonth]?.unlockText}.
            </p>
          </div>
        ) : repos.length === 0 ? (
          /* Empty repos: 'Announced soon' */
          <div
            style={{
              padding: '3rem 2rem',
              border: '1px solid var(--theme-border)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--theme-card-bg)',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <div style={{ fontSize: '1.05rem', color: 'var(--color-white)', marginBottom: '0.3rem' }}>
              Announced soon
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Repositories for this sprint will be published here.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {filteredRepos.map((repo) => (
              <div
                key={repo.name}
                style={{
                  padding: '1.2rem',
                  border: '1px solid var(--theme-border)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--theme-card-bg)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <a
                      href={`https://github.com/tkmfoss/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        color: 'var(--theme-primary)'
                      }}
                    >
                      tkmfoss/{repo.name}
                    </a>
                    {repo.field && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          border: '1px solid var(--theme-border)',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '2px',
                          color: 'var(--color-text-muted)'
                        }}
                      >
                        {repo.field}
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.6rem' }}>
                    {repo.desc}
                  </p>

                  {repo.stack && (
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {repo.stack.map((s) => (
                        <span
                          key={s}
                          style={{
                            fontSize: '0.72rem',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--color-text-subtle)',
                            background: 'rgba(255, 255, 255, 0.03)',
                            padding: '0.1rem 0.35rem',
                            borderRadius: '2px'
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <a
                  href={`https://github.com/tkmfoss/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
                >
                  <span>Repository</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
