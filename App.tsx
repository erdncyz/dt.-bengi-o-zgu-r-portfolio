import React, { lazy, Suspense, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { ThemeProvider } from './components/ThemeProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import DualLife from './components/DualLife';
import DiabetesJourney from './components/DiabetesJourney';
import Advocacy from './components/Advocacy';
import Footer from './components/Footer';

const GameApp = lazy(() => import('./game/GameApp'));

const IMAGES = {
  dentistProfile: '/dentist-bengi.jpg',
  piggyback: '/diabetes-friend.jpg',
  lockerRoom: '/team.jpg',
  boots: '/shoes.jpg',
};

const App: React.FC = () => {
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  if (showGame) {
    return (
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <GameApp onBack={() => setShowGame(false)} />
          </Suspense>
        </MotionConfig>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
        <div className="relative z-10 min-h-screen bg-background">
          <Navbar onPlayClick={() => setShowGame(true)} />
          <main id="main">
            <Hero image={IMAGES.dentistProfile} />
            <About image={IMAGES.piggyback} />
            <DualLife bootsImage={IMAGES.boots} lockerImage={IMAGES.lockerRoom} />
            <DiabetesJourney />
            <Advocacy />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
};

export default App;
