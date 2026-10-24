import React, { useState } from 'react';
import { useTeamData, useScheduleData, useFaqData } from '../hooks/useExtraData';
import { CONFIG } from '../config';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  Phone
} from 'lucide-react';

export default function TeamSchedulePage() {
  const { data: teamData } = useTeamData();
  const { milestones } = useScheduleData();
  const { data: faqs } = useFaqData();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const organizers = teamData?.organizers || teamData?.leads || [];
  const mentors = teamData?.mentors || [];
  const hasTeamEntries = organizers.length > 0 || mentors.length > 0;

  return (
    <div className="section-spacing" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Schedule */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Schedule</h1>
            <p style={{ maxWidth: '640px', margin: '0 auto', fontSize: '0.95rem', textAlign: 'center' }}>
              Official dates for FOSSSoC Season 1. Proposed dates are subject to maintainer consensus.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '850px', margin: '0 auto' }}>
            {milestones.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.2rem',
                  border: '1px solid var(--theme-border)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--theme-card-bg)',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1.5rem',
                  flexWrap: 'wrap'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--theme-primary)',
                    minWidth: '200px',
                    fontWeight: 700
                  }}
                >
                  {item.endDate ? `${item.date} to ${item.endDate}` : item.date}
                </div>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-white)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span>{item.title}</span>
                    {item.proposed && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-warning)', border: '1px solid var(--color-warning)', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)' }}>
                        proposed
                      </span>
                    )}
                  </div>
                  {item.detail && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      {item.detail}
                    </div>
                  )}
                  {item.title.toLowerCase().includes('kickoff') && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)', marginTop: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                      Venue: {CONFIG.VENUE || 'To be announced'} | Time: {CONFIG.KICKOFF_TIME_LABEL || 'To be announced'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section (Only displayed when teamData has entries) */}
        {hasTeamEntries && (
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', textAlign: 'center' }}>Maintainers</h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.2rem',
                maxWidth: '850px',
                margin: '0 auto'
              }}
            >
              {[...organizers, ...mentors].map((member, idx) => {
                const rawAvatar =
                  member.avatar ||
                  member.image ||
                  (member.github ? `https://avatars.githubusercontent.com/${member.github}` : null);
                
                const avatarUrl = rawAvatar
                  ? rawAvatar.startsWith('http://') || rawAvatar.startsWith('https://') || rawAvatar.startsWith('data:')
                    ? rawAvatar
                    : `${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/${rawAvatar.replace(/^\//, '')}`
                  : null;

                return (
                  <div
                    key={idx}
                    style={{
                      padding: '1.3rem',
                      border: '1px solid var(--theme-border)',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--theme-card-bg)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1.2rem'
                    }}
                  >
                    {avatarUrl && (
                      <div
                        style={{
                          width: '68px',
                          height: '68px',
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                          border: '1px solid var(--theme-border)',
                          background: 'rgba(255, 255, 255, 0.04)',
                          flexShrink: 0
                        }}
                      >
                        <img
                          src={avatarUrl}
                          alt={member.name}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                          onError={(e) => {
                            e.currentTarget.parentElement.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-white)', fontSize: '1.1rem', lineHeight: 1.25 }}>
                        {member.name}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--theme-primary)', fontWeight: 600, marginTop: '0.2rem' }}>
                        {member.role}
                      </div>
                      {member.focus && (
                        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                          {member.focus}
                        </div>
                      )}
                      {member.department && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                          {member.department}
                        </div>
                      )}
                      {((member.phone || member.mobile) || member.github) && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '0.85rem',
                            marginTop: '0.65rem'
                          }}
                        >
                          {member.github && (
                            <a
                              href={`https://github.com/${member.github}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                fontSize: '0.78rem',
                                color: 'var(--color-text-muted)',
                                fontFamily: 'var(--font-mono)',
                                textDecoration: 'none',
                                transition: 'color 0.2s ease'
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-primary)'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                            >
                              <Github size={13} />
                              <span>@{member.github}</span>
                            </a>
                          )}
                          {(member.phone || member.mobile) && (
                            <a
                              href={`tel:${String(member.phone || member.mobile).replace(/[^0-9+]/g, '')}`}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                fontSize: '0.78rem',
                                color: 'var(--color-text-muted)',
                                fontFamily: 'var(--font-mono)',
                                textDecoration: 'none',
                                transition: 'color 0.2s ease'
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-primary)'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                            >
                              <Phone size={13} />
                              <span>{member.phone || member.mobile}</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* FAQ - Centered Header and Centered Container */}
        <div style={{ marginBottom: '5rem', maxWidth: '850px', margin: '0 auto 5rem auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
              Official answers from FOSS TKMCE organizers.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid var(--theme-border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--theme-card-bg)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '1.1rem 1.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      color: 'var(--color-white)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} color="var(--theme-primary)" /> : <ChevronDown size={16} />}
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.4rem 1.2rem 1.4rem',
                        fontSize: '0.88rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.65,
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Register Section - Centered Box & Centered Content */}
        <div
          style={{
            padding: '2.5rem 2rem',
            border: '1px solid var(--theme-border)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--theme-card-bg)',
            maxWidth: '720px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--theme-primary)', marginBottom: '0.4rem' }}>
            # registration
          </div>
          <h2 style={{ fontSize: '1.7rem', marginBottom: '0.6rem', textAlign: 'center' }}>Join FOSSSoC-S1</h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.65, maxWidth: '560px', textAlign: 'center' }}>
            Open to students of {CONFIG.COLLEGE} and external participants worldwide. Free registration.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center' }}>
            {CONFIG.REG_FORM_URL ? (
              <a
                href={CONFIG.REG_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <span>[ Register ]</span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <button
                disabled
                className="btn btn-disabled"
                title="Registration link will be announced soon"
              >
                <span>[ Registration: Coming Soon ]</span>
              </button>
            )}

            {CONFIG.COMMUNITY_URL && (
              <a
                href={CONFIG.COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <span>[ Join Community ]</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
          {CONFIG.CONTACT && (
            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
              Contact: {CONFIG.CONTACT}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
