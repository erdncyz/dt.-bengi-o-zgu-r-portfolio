import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { ThemeProvider } from './components/ThemeProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import DualLife from './components/DualLife';
import DiabetesJourney from './components/DiabetesJourney';
import Advocacy from './components/Advocacy';
import Footer from './components/Footer';
import GameApp from './game/GameApp';

const IMAGES = {
  dentistProfile: '/dentist-bengi.jpg',
  piggyback: '/diabetes-friend.jpg',
  lockerRoom: '/team.jpg',
  boots: '/shoes.jpg',
};

const App: React.FC = () => {
  const [showGame, setShowGame] = useState(false);

  if (showGame) {
    return (
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <GameApp onBack={() => setShowGame(false)} />
        </MotionConfig>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
        <div className="relative z-10 min-h-svh overflow-x-hidden bg-background">
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
