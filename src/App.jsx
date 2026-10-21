import React, { useEffect } from 'react';
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

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

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
      {/* Hand-written 2D seasonal canvas background */}
      <SeasonalCanvas />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Area with AnimatePresence route transitions */}
      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
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

      {/* Organization Footer */}
      <Footer />
    </div>
  );
}
