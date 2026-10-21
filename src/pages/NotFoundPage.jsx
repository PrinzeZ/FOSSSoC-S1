import React from 'react';
import { Link } from 'react-router-dom';
import Mascot from '../components/common/Mascot';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '65vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <Mascot size={130} />
      </div>

      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '3.5rem',
          fontWeight: 900,
          color: 'var(--theme-primary)',
          lineHeight: 1,
          marginBottom: '0.5rem',
          letterSpacing: '-0.03em'
        }}
      >
        404
      </span>

      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h1>

      <p style={{ maxWidth: '460px', margin: '0 auto 2rem auto', fontSize: '1rem', color: 'var(--color-text-muted)' }}>
        The commit or route you're looking for was either squashed, moved to another branch, or doesn't exist.
      </p>

      <Link to="/" className="btn btn-primary" style={{ padding: '0.8rem 1.8rem' }}>
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
