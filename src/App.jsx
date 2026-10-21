import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SeasonalCanvas from './components/common/SeasonalCanvas';
import ThemeSwitcher from './components/common/ThemeSwitcher';

import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectsPage from './pages/ProjectsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import RulesPage from './pages/RulesPage';
import WinnersPage from './pages/WinnersPage';
import TeamSchedulePage from './pages/TeamSchedulePage';
import NotFoundPage from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const search = window.location.search;
    const hash = window.location.hash;
    setIsDemo(search.includes('demo=1') || hash.includes('demo=1'));
  }, [location]);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden'
      }}
    >
      <ScrollToTop />

      {/* Visible DEMO DATA banner when ?demo=1 is active */}
      {isDemo && (
        <div
          role="alert"
          style={{
            background: 'var(--color-warning)',
            color: '#000000',
            textAlign: 'center',
            padding: '0.4rem 1rem',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem'
          }}
        >
          <span>[DEMO DATA ACTIVE] Showing generated mock participants for preview testing.</span>
          <a
            href={window.location.href.replace(/(\?|&)demo=1/, '')}
            style={{
              textDecoration: 'underline',
              color: '#000000',
              fontWeight: 800
            }}
          >
            Exit demo mode
          </a>
        </div>
      )}

      {/* Seasonal Canvas */}
      <SeasonalCanvas />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Area */}
      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/winners" element={<WinnersPage />} />
              <Route path="/team" element={<TeamSchedulePage />} />
              <Route path="/schedule" element={<TeamSchedulePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Theme Switcher */}
      <ThemeSwitcher />

      {/* Footer */}
      <Footer />
    </div>
  );
}
