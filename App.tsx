import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import DualLife from './components/DualLife';
import DiabetesJourney from './components/DiabetesJourney';
import Advocacy from './components/Advocacy';
import Footer from './components/Footer';

// --- YOUR IMAGES ---
// Replace these URLs with the actual links to the images you uploaded.
// I have used high-quality placeholders that match your description for now.

const IMAGES = {
  // Image 3: Dentist action shot
  dentistProfile: "/dentist-bengi.jpg",

  // Image 4: Piggyback with child (Casual/Human side)
  piggyback: "/diabetes-friend.jpg",

  // Image 1: Locker room (Black & White team photo)
  lockerRoom: "/team.jpg",

  // Image 2: Hanging football boots
  boots: "/shoes.jpg",
};

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Scroll Progress Bar */}
      <div
        style={{ transform: `scaleX(${scrollProgress})` }}
        className="fixed top-0 left-0 right-0 h-1 bg-sugar z-50 origin-left transition-transform duration-100 ease-out"
      />

      <Navbar />

      <main>
        <Hero image={IMAGES.dentistProfile} />
        <About image={IMAGES.piggyback} />
        <DualLife bootsImage={IMAGES.boots} lockerImage={IMAGES.lockerRoom} />
        <DiabetesJourney />
        <Advocacy />
      </main>

      <Footer />
    </div>
  );
};

export default App;