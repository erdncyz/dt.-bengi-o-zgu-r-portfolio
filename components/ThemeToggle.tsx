import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { EASE_OUT } from './ui/motion';

const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      className={`relative inline-flex min-h-11 min-w-11 items-center justify-center overflow-hidden rounded-full text-primary transition-colors duration-200 hover:text-accent cursor-pointer ${className}`}
      aria-label={isDark ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -40, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 40, scale: 0.6 }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
          className="flex"
        >
          {isDark ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
