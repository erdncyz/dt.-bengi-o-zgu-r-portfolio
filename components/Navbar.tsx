import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Hakkımda', href: '#about' },
    { name: 'Spor & Meslek', href: '#dual-life' },
    { name: 'Diyabet', href: '#diabetes' },
    { name: 'Mesajım', href: '#advocacy' },
  ];

  return (
    <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-primary/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <a href="#" className="text-xl tracking-tighter font-serif font-bold text-primary z-50">
            DT. BENGİ
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium uppercase tracking-widest text-secondary hover:text-sugar transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sugar transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="https://www.instagram.com/bengiiozgur/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-sugar transition-colors"
            >
              <Instagram size={22} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 text-primary p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col items-center space-y-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-serif text-primary hover:text-sugar transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://www.instagram.com/bengiiozgur/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 p-4 rounded-full bg-sugar/10 text-sugar"
          >
            <Instagram size={32} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;