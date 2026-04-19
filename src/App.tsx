/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, History, Moon, User, Star } from 'lucide-react';
import Home from './pages/Home';
import Draw from './pages/Draw';
import ReadingDetails from './pages/ReadingDetails';
import ReadingHistory from './pages/ReadingHistory';
import Profile from './pages/Profile';
import { Button } from './components/ui/button';

function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8 md:pb-6 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div className="glass rounded-full px-6 py-4 flex items-center justify-between shadow-2xl">
          <Link to="/draw" className={`flex flex-col items-center gap-1 transition-colors ${location.pathname === '/draw' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            <Sparkles size={20} />
            <span className="text-[10px] font-medium uppercase tracking-widest">Draw</span>
          </Link>
          <Link to="/history" className={`flex flex-col items-center gap-1 transition-colors ${location.pathname === '/history' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            <History size={20} />
            <span className="text-[10px] font-medium uppercase tracking-widest">History</span>
          </Link>
          <Link to="/profile" className={`flex flex-col items-center gap-1 transition-colors ${location.pathname === '/profile' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            <User size={20} />
            <span className="text-[10px] font-medium uppercase tracking-widest">Profile</span>
          </Link>
          <div className="flex flex-col items-center gap-1 text-primary animate-pulse">
            <Star size={20} fill="currentColor" />
            <span className="text-[10px] font-medium uppercase tracking-widest">Sovereign</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-arcana font-sans selection:bg-primary/30">
        {/* Ambient background particles could go here */}
        
        <main className="pb-32 md:pb-24">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/draw" element={<Draw />} />
              <Route path="/reading/:id" element={<ReadingDetails />} />
              <Route path="/history" element={<ReadingHistory />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Navigation />
      </div>
    </Router>
  );
}

