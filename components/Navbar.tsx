import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Instagram, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { EASE_OUT, revealItem } from './ui/motion';

interface NavbarProps {
  onPlayClick: () => void;
}

const navLinks = [
  { name: 'Hakkımda', href: '#about' },
  { name: 'Spor & Meslek', href: '#dual-life' },
  { name: 'Diyabet', href: '#diabetes' },
  { name: 'Basında', href: '#press' },
  { name: 'Mesajım', href: '#advocacy' },
];

const Navbar: React.FC<NavbarProps> = ({ onPlayClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const close = () => setIsOpen(false);

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-sugar"
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ${
          scrolled || isOpen
            ? 'border-b border-border bg-background/80 shadow-soft backdrop-blur-xl'
            : 'border-b border-transparent bg-background/45 backdrop-blur-xl'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <nav className="mx-auto flex max-w-page items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8" aria-label="Ana menü">
          <a href="#" className="relative z-50 font-serif text-lg font-semibold tracking-tight text-primary sm:text-xl">
            Dt. Bengi
          </a>

          <div className="hidden items-center gap-7 lg:flex xl:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative py-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-secondary transition-colors duration-200 hover:text-primary cursor-pointer"
              >
                {link.name}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-sugar transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}
            <ThemeToggle />
            <button
              type="button"
              onClick={onPlayClick}
              className="min-h-11 rounded-full bg-inverse px-5 py-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-on transition-colors duration-200 hover:bg-sugar hover:text-white cursor-pointer"
            >
              Oyun
            </button>
            <a
              href="https://www.instagram.com/bengiiozgur/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-primary transition-colors duration-200 hover:text-sugar cursor-pointer"
            >
              <Instagram size={20} strokeWidth={1.75} />
            </a>
          </div>

          <div className="relative z-50 flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-primary cursor-pointer"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobil menü"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="fixed inset-0 z-40 bg-background lg:hidden"
            style={{ paddingTop: 'calc(env(safe-area-inset-top) + 4.5rem)', paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
              }}
              className="flex h-full flex-col items-center justify-center gap-2 px-6"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={close}
                  variants={revealItem}
                  className="flex min-h-12 w-full max-w-sm items-center justify-center rounded-2xl font-serif text-3xl text-primary transition-colors duration-200 hover:text-sugar cursor-pointer"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                type="button"
                variants={revealItem}
                onClick={() => {
                  close();
                  onPlayClick();
                }}
                className="mt-4 flex min-h-12 w-full max-w-sm items-center justify-center rounded-full bg-inverse font-serif text-2xl text-on cursor-pointer"
              >
                Oyun
              </motion.button>
              <motion.a
                href="https://www.instagram.com/bengiiozgur/"
                target="_blank"
                rel="noopener noreferrer"
                variants={revealItem}
                className="mt-6 inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-sugar/10 text-sugar cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
