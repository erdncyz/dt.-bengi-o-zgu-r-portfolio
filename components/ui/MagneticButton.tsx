import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { EASE_OUT } from './motion';

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const isExternal = (href: string) => href.startsWith('http');

const MagneticButton: React.FC<MagneticButtonProps> = ({ href, children, className = '' }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion || !ref.current) return;
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches === false) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.28);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
      target={isExternal(href) ? '_blank' : undefined}
      rel={isExternal(href) ? 'noopener noreferrer' : undefined}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-inverse px-7 py-3.5 text-sm font-semibold tracking-wide text-on shadow-soft transition-colors duration-200 hover:bg-sugar hover:text-white hover:shadow-glow cursor-pointer ${className}`}
    >
      {children}
    </motion.a>
  );
};

export default MagneticButton;
