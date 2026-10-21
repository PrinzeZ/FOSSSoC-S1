import React, { useState } from 'react';
import { useLeaderboardData } from '../hooks/useLeaderboardData';
import { TIER_CONFIG } from '../constants/config';
import {
  Trophy,
  Search,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  X,
  GitPullRequest,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Award,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function LeaderboardPage() {
  const { data, loading, error, lastRefreshed, refetch, isDemoMode } = useLeaderboardData();
  const [activeTab, setActiveTab] = useState('overall'); // 'overall' | 'october' | 'november' | 'december'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const users = data?.users || [];
  const thresholds = data?.thresholds || {
    october: { total: 35, rubric: 10 },
    month: { points: 50, prs: 2, mediumPlus: 1 },
    overall: { points: 120, months: 2, repos: 2 }
  };

  // Compute row data depending on the active tab
  const rows = users.map((u) => {
    let tabPoints = 0;
    let tabPrs = 0;
    let tabEligible = false;

    if (activeTab === 'overall') {
      tabPoints = u.total || 0;
      tabPrs = (u.portfolio?.showcase > 0 ? 1 : 0) + (u.projects?.merged || 0);
      tabEligible = u.overall?.eligible || false;
    } else if (activeTab === 'october') {
      tabPoints = u.portfolio?.total || 0;
      tabPrs = u.portfolio?.showcase > 0 ? 1 : 0;
      tabEligible = u.portfolio?.eligible || false;
    } else if (activeTab === 'november') {
      const nov = u.months ? u.months['2026-11'] : null;
      tabPoints = nov?.points || 0;
      tabPrs = nov?.prs || 0;
      tabEligible = nov?.eligible || false;
    } else if (activeTab === 'december') {
      const dec = u.months ? u.months['2026-12'] : null;
      tabPoints = dec?.points || 0;
      tabPrs = dec?.prs || 0;
      tabEligible = dec?.eligible || false;
    }

    return {
      ...u,
      tabPoints,
      tabPrs,
      tabEligible
    };
  });

  // Sort by tabPoints descending
  rows.sort((a, b) => b.tabPoints - a.tabPoints);

  // Filter by search query
  const filteredRows = rows.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.user.toLowerCase().includes(q) ||
      (r.department && r.department.toLowerCase().includes(q))
    );
  });

  return (
    <div className="section-spacing" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="chip" style={{ marginBottom: '1rem', padding: '0.45rem 1.1rem' }}>
            <Trophy size={15} />
            <span>Season 1 Standings</span>
          </div>
          <h1 style={{ marginBottom: '1rem' }}>Live Leaderboard</h1>
          <p style={{ maxWidth: '680px', margin: '0 auto 1.5rem auto', fontSize: '1.05rem' }}>
            Live performance tracking across Portfolio Week and Project Contribution Sprints.
            Click any row to open the full contributor breakdown and pull request log.
          </p>

          {isDemoMode && (
            <div
              className="chip chip-warning"
              style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
            >
              <Sparkles size={14} />
              <span>Viewing Generated Sample Data (?demo=1)</span>
            </div>
          )}
        </div>

        {/* Tab Controls, Search, and Auto-Refresh status bar */}
        <div
          className="glass-panel"
          style={{
            padding: '1.2rem',
            background: 'var(--theme-card-bg)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.8rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {[
              { id: 'overall', label: 'Overall' },
              { id: 'october', label: 'October (Portfolio)' },
              { id: 'november', label: 'November' },
              { id: 'december', label: 'December' }
            ].map((t) => {
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    padding: '0.55rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? 'var(--theme-primary)' : 'rgba(255, 255, 255, 0.05)',
                    color: isActive ? '#0b0813' : 'var(--color-text-muted)',
                    border: isActive ? '1px solid var(--theme-primary)' : '1px solid var(--theme-border)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Right controls: Search & Refresh */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.9rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-md)',
                minWidth: '220px'
              }}
            >
              <Search size={15} color="var(--color-text-muted)" />
              <input
                type="text"
                placeholder="Search participant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-white)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>

            <button
              onClick={() => refetch()}
              title="Refresh Leaderboard (auto-refreshes every 5 mins)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.8rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text-muted)',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} className={loading ? 'spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Last updated timestamp indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.78rem',
            color: 'var(--color-text-subtle)',
            marginBottom: '1rem',
            padding: '0 0.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={13} />
            <span>
              Last updated:{' '}
              {data?.updated ? new Date(data.updated).toLocaleTimeString() : 'Just now'} (Auto-refreshes every 5 mins)
            </span>
          </div>
          <div>Showing {filteredRows.length} participants</div>
        </div>

        {/* Error State */}
        {error && (
          <div
            className="glass-panel"
            style={{
              padding: '2rem',
              textAlign: 'center',
              border: '1px solid var(--color-danger)',
              marginBottom: '2rem'
            }}
          >
            <AlertTriangle size={32} color="var(--color-danger)" style={{ margin: '0 auto 0.8rem auto' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Unable to load leaderboard</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.2rem' }}>{error}</p>
            <button onClick={() => refetch()} className="btn btn-primary btn-sm">
              Try Again
            </button>
          </div>
        )}

        {/* Leaderboard Table */}
        <div
          className="glass-panel"
          style={{
            overflowX: 'auto',
            background: 'var(--theme-card-bg)',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          {loading && !data ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <p>Loading leaderboard standings...</p>
            </div>
          ) : filteredRows.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <p>No participant matches "{searchQuery}".</p>
            </div>
          ) : (
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '0.92rem'
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: '1px solid var(--theme-border)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  <th style={{ padding: '1rem 1.2rem', width: '60px' }}>Rank</th>
                  <th style={{ padding: '1rem 1.2rem' }}>Participant</th>
                  <th style={{ padding: '1rem 1.2rem' }}>Tier</th>
                  <th style={{ padding: '1rem 1.2rem', textAlign: 'center' }}>PRs</th>
                  <th style={{ padding: '1rem 1.2rem', textAlign: 'right' }}>Points</th>
                  <th style={{ padding: '1rem 1.2rem', textAlign: 'center' }}>Prize Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => {
                  const rank = index + 1;
                  const tierInfo = TIER_CONFIG[row.tier] || TIER_CONFIG.none;
                  const pendingPrs = row.projects?.pending || 0;

                  return (
                    <tr
                      key={row.user}
                      onClick={() => setSelectedUser(row)}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        cursor: 'pointer',
                        transition: 'background var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--theme-surface-hover)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      {/* Rank */}
                      <td style={{ padding: '1rem 1.2rem' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: rank <= 3 ? '1.25rem' : '1rem',
                            color:
                              rank === 1
                                ? '#FFD166'
                                : rank === 2
                                ? '#E2E8F0'
                                : rank === 3
                                ? '#CD7F32'
                                : 'var(--color-text-muted)'
                          }}
                        >
                          {rank === 1 ? '🥇 1' : rank === 2 ? '🥈 2' : rank === 3 ? '🥉 3' : `#${rank}`}
                        </span>
                      </td>

                      {/* Participant: Avatar + Name + @username */}
                      <td style={{ padding: '1rem 1.2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <img
                            src={`https://github.com/${row.user}.png?size=80`}
                            alt={row.name}
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: '1px solid var(--theme-border)'
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 700, color: 'var(--color-white)' }}>
                              {row.name}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                              @{row.user} {row.department ? `• ${row.department}` : ''}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Tier Badge */}
                      <td style={{ padding: '1rem 1.2rem' }}>
                        <span
                          className="chip"
                          style={{
                            color: tierInfo.color,
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            fontSize: '0.75rem'
                          }}
                        >
                          {tierInfo.label}
                        </span>
                      </td>

                      {/* Merged PRs + Pending badge */}
                      <td style={{ padding: '1rem 1.2rem', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontWeight: 600 }}>{row.tabPrs}</span>
                          {pendingPrs > 0 && activeTab !== 'october' && (
                            <span
                              className="chip chip-warning"
                              style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}
                              title={`${pendingPrs} pull request(s) under mentor review`}
                            >
                              +{pendingPrs} pending
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Points */}
                      <td style={{ padding: '1rem 1.2rem', textAlign: 'right' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            color: 'var(--theme-primary)'
                          }}
                        >
                          {row.tabPoints}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: '0.2rem' }}>
                          pts
                        </span>
                      </td>

                      {/* Prize Eligible Badge */}
                      <td style={{ padding: '1rem 1.2rem', textAlign: 'center' }}>
                        {row.tabEligible ? (
                          <span className="chip chip-success" style={{ fontSize: '0.74rem' }}>
                            <ShieldCheck size={13} />
                            <span>Prize-Eligible</span>
                          </span>
                        ) : (
                          <span
                            style={{
                              fontSize: '0.75rem',
                              color: 'var(--color-text-subtle)'
                            }}
                          >
                            In progress
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Slide-over Profile Drawer Panel */}
      {selectedUser && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'flex-end',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(6px)'
          }}
          onClick={() => setSelectedUser(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '650px',
              height: '100%',
              background: '#0b0813',
              borderLeft: '1px solid var(--theme-border)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)',
              overflowY: 'auto',
              padding: '2rem'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={`https://github.com/${selectedUser.user}.png?size=100`}
                  alt={selectedUser.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    border: '2px solid var(--theme-primary)'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{selectedUser.name}</h3>
                  <a
                    href={`https://github.com/${selectedUser.user}`}
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
                    <span>@{selectedUser.user}</span>
                    <ExternalLink size={13} />
                  </a>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                    {selectedUser.department} {selectedUser.year ? `• Year ${selectedUser.year}` : ''}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                aria-label="Close contributor profile"
                style={{
                  color: 'var(--color-text-muted)',
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Prize Eligibility Progress Bars */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.8rem', color: 'var(--color-white)' }}>
                Prize Eligibility Thresholds
              </h4>

              {/* October Threshold Progress */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '0.7rem',
                  border: '1px solid var(--theme-border)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                  <span>October Portfolio: {selectedUser.portfolio?.total || 0} / {thresholds.october.total} pts</span>
                  <span style={{ color: selectedUser.portfolio?.eligible ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                    {selectedUser.portfolio?.eligible ? 'Eligible ✓' : 'In Progress'}
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.min(100, ((selectedUser.portfolio?.total || 0) / thresholds.october.total) * 100)}%`,
                      background: 'var(--theme-primary)',
                      borderRadius: '3px'
                    }}
                  />
                </div>
              </div>

              {/* Overall Season Threshold Progress */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--theme-border)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                  <span>Season Overall: {selectedUser.total || 0} / {thresholds.overall.points} pts</span>
                  <span style={{ color: selectedUser.overall?.eligible ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                    {selectedUser.overall?.eligible ? 'Eligible ✓' : 'In Progress'}
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.min(100, ((selectedUser.total || 0) / thresholds.overall.points) * 100)}%`,
                      background: '#10b981',
                      borderRadius: '3px'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Portfolio Week Breakdown */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.8rem', color: 'var(--color-white)' }}>
                Portfolio Breakdown (Total: {selectedUser.portfolio?.total || 0}/50)
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '0.6rem'
                }}
              >
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.7rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Fork Template</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{selectedUser.portfolio?.fork || 0}/5</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.7rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>3+ Commits</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{selectedUser.portfolio?.commits || 0}/5</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.7rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Live Pages Site</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{selectedUser.portfolio?.live || 0}/10</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.7rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Showcase PR</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{selectedUser.portfolio?.showcase || 0}/10</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.7rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Mentor Rubric</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                    {selectedUser.portfolio?.rubric !== null ? `${selectedUser.portfolio?.rubric}/20` : 'Pending'}
                  </div>
                </div>
              </div>
            </div>

            {/* PR History Table */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--color-white)' }}>
                  Scored Pull Requests ({selectedUser.projects?.prs?.length || 0})
                </h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Points credited on merge
                </span>
              </div>

              {(!selectedUser.projects?.prs || selectedUser.projects.prs.length === 0) ? (
                <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ fontSize: '0.85rem' }}>No pull requests recorded yet for project months.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {selectedUser.projects.prs.map((pr, idx) => (
                    <div
                      key={pr.number || idx}
                      style={{
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--theme-border)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.8rem' }}>
                        <div>
                          <a
                            href={pr.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '0.92rem',
                              fontWeight: 600,
                              color: 'var(--color-white)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}
                          >
                            <span>{pr.repo} #{pr.number}</span>
                            <ExternalLink size={13} color="var(--theme-primary)" />
                          </a>
                          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                            {pr.title}
                          </div>
                        </div>

                        {/* Capped Badge or Points */}
                        {pr.capped ? (
                          <span
                            className="chip chip-warning"
                            style={{ fontSize: '0.75rem', fontWeight: 700 }}
                            title="Only first 5 scored PRs per repo count"
                          >
                            capped, 0 pts
                          </span>
                        ) : (
                          <span
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 800,
                              fontSize: '1.15rem',
                              color: 'var(--theme-primary)'
                            }}
                          >
                            +{pr.points} pts
                          </span>
                        )}
                      </div>

                      {/* Details row: Opened date, level, bonuses */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          alignItems: 'center',
                          fontSize: '0.75rem',
                          color: 'var(--color-text-subtle)',
                          marginTop: '0.3rem',
                          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                          paddingTop: '0.5rem'
                        }}
                      >
                        <span>Opened: {pr.opened}</span>
                        <span>•</span>
                        <span style={{ textTransform: 'uppercase', color: 'var(--color-text-main)' }}>
                          Level: {pr.level} ({pr.base} pts)
                        </span>
                        {pr.firstWeek > 0 && (
                          <span className="chip" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}>
                            +5 First-Week
                          </span>
                        )}
                        {pr.quality > 0 && (
                          <span className="chip chip-success" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}>
                            +{pr.quality} Quality
                          </span>
                        )}
                        <span>•</span>
                        <span style={{ color: 'var(--color-success)' }}>Merged: {pr.merged}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
