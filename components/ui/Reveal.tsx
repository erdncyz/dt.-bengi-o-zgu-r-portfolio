import React, { ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import { revealContainer, revealFrom, revealItem, viewportOnce } from './motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  className?: string;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) => {
  const variants: Variants = revealFrom[direction] ?? revealItem;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
}

export const RevealGroup: React.FC<RevealGroupProps> = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={revealContainer}
    initial="hidden"
    whileInView="show"
    viewport={viewportOnce}
  >
    {children}
  </motion.div>
);

export const RevealChild: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.div className={className} variants={revealItem}>
    {children}
  </motion.div>
);

export default Reveal;
