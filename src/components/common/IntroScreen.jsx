import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CONFIG } from '../../config';

export default function IntroScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Sequence loads and finishes, but NEVER automatically exits to home screen
    const timers = [
      setTimeout(() => {
        setStep(1);
        setProgress(25);
      }, 250),
      setTimeout(() => {
        setStep(2);
        setProgress(55);
      }, 650),
      setTimeout(() => {
        setStep(3);
        setProgress(85);
      }, 1050),
      setTimeout(() => {
        setStep(4);
        setProgress(100);
      }, 1450)
    ];

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (onComplete) onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
      transition={{ duration: 0.35 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(9, 9, 11, 0.98)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        color: 'var(--color-white)',
        fontFamily: 'var(--font-mono)'
      }}
    >
      {/* Terminal Window */}
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'var(--theme-card-bg)',
          border: '1px solid var(--theme-border)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden'
        }}
      >
        {/* Terminal Title Bar */}
        <div
          style={{
            padding: '0.65rem 1rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderBottom: '1px solid var(--theme-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--color-text-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
            <span style={{ marginLeft: '0.5rem', fontFamily: 'var(--font-mono)' }}>tkmfoss@terminal: ~</span>
          </div>

          <button
            onClick={onComplete}
            style={{
              fontSize: '0.72rem',
              color: 'var(--theme-primary)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              padding: '0.2rem 0.4rem'
            }}
          >
            [ Skip ↵ ]
          </button>
        </div>

        {/* Terminal Body */}
        <div style={{ padding: '1.4rem 1.25rem', minHeight: '230px', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {/* Command */}
          <div style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--theme-primary)', fontWeight: 700 }}>$</span>
            <span style={{ color: 'var(--color-text-main)' }}>git init {CONFIG.NAME.toLowerCase()} --season 2026</span>
          </div>

          {/* Line 2 */}
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span style={{ color: 'var(--color-success)' }}>✓</span>
              <span>Initialized repository for {CONFIG.ORGANIZER}</span>
            </motion.div>
          )}

          {/* Line 3 */}
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span style={{ color: 'var(--color-success)' }}>✓</span>
              <span>Loaded Sprints: [01/Portfolio] [02/Build] [03/Christmas]</span>
            </motion.div>
          )}

          {/* Line 4 */}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span style={{ color: 'var(--theme-primary)' }}>⚡</span>
              <span>Kickoff: 24 Oct 2026 // Status: Ready</span>
            </motion.div>
          )}

          {/* Event Branded Display */}
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                marginTop: '0.5rem',
                padding: '0.9rem',
                border: '1px solid var(--theme-border)',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255, 255, 255, 0.02)',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: 'var(--color-white)',
                  marginBottom: '0.2rem'
                }}
              >
                {CONFIG.NAME}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--theme-primary)', fontWeight: 600 }}>
                {CONFIG.FULL_NAME}
              </div>
            </motion.div>
          )}

          {/* Progress Bar */}
          <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.72rem',
                color: 'var(--color-text-subtle)',
                marginBottom: '0.35rem'
              }}
            >
              <span>{progress === 100 ? 'ENVIRONMENT READY' : 'LOADING SEASON MODULES...'}</span>
              <span>{progress}%</span>
            </div>
            <div
              style={{
                width: '100%',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
                style={{
                  height: '100%',
                  background: 'var(--theme-primary)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Action Footer with prominent Enter button */}
        <div
          style={{
            padding: '0.9rem 1.25rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderTop: '1px solid var(--theme-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.8rem'
          }}
        >
          <span style={{ fontSize: '0.75rem', color: step >= 4 ? 'var(--color-success)' : 'var(--color-text-subtle)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: step >= 4 ? 'var(--color-success)' : 'var(--color-text-subtle)' }} />
            <span>{step >= 4 ? 'Ready to launch' : 'Loading modules...'}</span>
          </span>

          <button
            onClick={onComplete}
            className="btn btn-primary"
            style={{
              padding: '0.55rem 1.25rem',
              fontSize: '0.84rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer'
            }}
          >
            <span>[ Enter Site ↵ ]</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
