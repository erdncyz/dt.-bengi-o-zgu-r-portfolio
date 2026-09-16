import React, { ReactNode } from 'react';
import Reveal from './Reveal';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, direction = 'up', className = '' }) => (
  <Reveal delay={delay / 1000} direction={direction === 'none' ? 'up' : direction} className={className}>
    {children}
  </Reveal>
);

export default FadeIn;
