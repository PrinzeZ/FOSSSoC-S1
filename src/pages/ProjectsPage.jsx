import React, { useState } from 'react';
import { useProjectsData } from '../hooks/useProjectsData';
import { UNLOCK_DATES } from '../constants/config';
import {
  FolderGit2,
  Lock,
  Unlock,
  ExternalLink,
  Code2,
  Tag,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export default function ProjectsPage() {
  const { data, loading, error, isUnlockedBypass } = useProjectsData();
  const [selectedMonth, setSelectedMonth] = useState('october');
  const [selectedField, setSelectedField] = useState('All');

  // Check month lock status
  const isMonthLocked = (monthKey) => {
    if (isUnlockedBypass) return false;
    const unlockDateStr = UNLOCK_DATES[monthKey];
    if (!unlockDateStr) return false;
    const unlockTime = new Date(unlockDateStr).getTime();
    return new Date().getTime() < unlockTime;
  };

  const monthConfig = {
    october: { title: 'October', subtitle: 'Portfolio Week', unlockText: 'Unlocked' },
    november: { title: 'November', subtitle: 'Campus & Utilities', unlockText: 'November 1' },
    december: { title: 'December', subtitle: 'Winter & Deep Tech', unlockText: 'December 1' }
  };

  const currentMonthData = data ? data[selectedMonth] : null;
  const repos = currentMonthData?.repos || [];
  const isLocked = isMonthLocked(selectedMonth);

  // Extract all distinct fields
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
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="chip" style={{ marginBottom: '1rem', padding: '0.45rem 1.1rem' }}>
            <FolderGit2 size={15} />
            <span>Curated Open-Source Repositories</span>
          </div>
          <h1 style={{ marginBottom: '1rem' }}>Projects Directory</h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem' }}>
            Explore repositories maintained by FOSS TKMCE for Season 1. Filter by monthly sprint,
            field of engineering, or tech stack to start hacking.
          </p>

          {isUnlockedBypass && (
            <div
              className="chip chip-warning"
              style={{ marginTop: '1rem', padding: '0.4rem 0.9rem' }}
            >
              <Unlock size={14} />
              <span>Admin Preview Active: All months unlocked (?unlock=1)</span>
            </div>
          )}
        </div>

        {/* Month Selector Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.8rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap'
          }}
        >
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
                className="glass-panel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.8rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--theme-badge-bg)' : 'var(--theme-card-bg)',
                  borderColor: isActive ? 'var(--theme-primary)' : 'var(--theme-border)',
                  color: isActive ? 'var(--color-white)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {locked ? <Lock size={16} color="var(--color-warning)" /> : <FolderGit2 size={16} color="var(--theme-primary)" />}
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{cfg.title}</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>{cfg.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Field Filter Chips */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '3rem'
          }}
        >
          {allFields.map((field) => {
            const isFieldActive = selectedField === field;
            return (
              <button
                key={field}
                onClick={() => setSelectedField(field)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isFieldActive ? '1px solid var(--theme-primary)' : '1px solid var(--theme-border)',
                  background: isFieldActive ? 'var(--theme-primary)' : 'var(--theme-card-bg)',
                  color: isFieldActive ? '#0b0813' : 'var(--color-text-muted)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {field}
              </button>
            );
          })}
        </div>

        {/* Repos Grid / Locked View */}
        {loading ? (
          <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
            <p>Loading projects list...</p>
          </div>
        ) : isLocked ? (
          /* Locked Month Blur View */
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              minHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Blurred Mock Cards Background */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                filter: 'blur(14px) brightness(0.4)',
                opacity: 0.6,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                pointerEvents: 'none'
              }}
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-panel" style={{ height: '220px', background: 'var(--theme-card-bg)' }} />
              ))}
            </div>

            {/* Lock Modal Card */}
            <div
              className="glass-panel"
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '3rem 2.5rem',
                textAlign: 'center',
                maxWidth: '480px',
                background: 'rgba(11, 8, 19, 0.92)',
                border: '1px solid var(--color-warning)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.7)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--color-warning-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  color: 'var(--color-warning)'
                }}
              >
                <Lock size={30} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>
                Unlocks on {monthConfig[selectedMonth]?.unlockText}
              </h3>
              <p style={{ fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                Repositories for {monthConfig[selectedMonth]?.title} will be officially revealed on{' '}
                {monthConfig[selectedMonth]?.unlockText} at 12:00 AM IST. Prepare your skills during Portfolio Week!
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)' }}>
                Tip: Append <code>?unlock=1</code> to the URL for preview testing.
              </div>
            </div>
          </div>
        ) : repos.length === 0 ? (
          /* Empty Repos Notice */
          <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
            <Sparkles size={36} color="var(--theme-primary)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Announced soon</h3>
            <p style={{ maxWidth: '450px', margin: '0 auto' }}>
              Project repositories for this sprint will be listed here shortly. Stay tuned to the FOSS TKMCE announcements!
            </p>
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3.5rem', textAlign: 'center' }}>
            <p>No repository found in "{selectedMonth}" under field "{selectedField}".</p>
          </div>
        ) : (
          /* Active Project Cards Grid */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.6rem'
            }}
          >
            {filteredRepos.map((repo) => (
              <div
                key={repo.name}
                className="glass-panel"
                style={{
                  padding: '1.8rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--theme-card-bg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'all var(--transition-smooth)'
                }}
              >
                {/* Header: Field badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="chip" style={{ fontSize: '0.75rem' }}>
                    <Tag size={12} />
                    <span>{repo.field}</span>
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)'
                    }}
                  >
                    tkmfoss /
                  </span>
                </div>

                {/* Repo Name */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    color: 'var(--color-white)',
                    lineHeight: 1.2
                  }}
                >
                  {repo.name}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.88rem', lineHeight: 1.6, flex: 1 }}>
                  {repo.desc}
                </p>

                {/* Tech Stack Pills */}
                {repo.stack && repo.stack.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {repo.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.06)',
                          color: 'var(--color-text-main)',
                          border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* GitHub Repo Link: https://github.com/tkmfoss/<name> */}
                <a
                  href={`https://github.com/tkmfoss/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{
                    marginTop: '0.5rem',
                    width: '100%',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Code2 size={15} color="var(--theme-primary)" />
                    <span>View Repository</span>
                  </span>
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
