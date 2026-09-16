import type { Transition, Variants } from 'motion/react';

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const duration = {
  micro: 0.2,
  enter: 0.5,
  section: 0.6,
} as const;

export const enterTransition: Transition = {
  duration: duration.enter,
  ease: EASE_OUT,
};

export const revealContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: enterTransition,
  },
};

export const revealFrom = {
  up: { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: enterTransition } },
  left: { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0, transition: enterTransition } },
  right: { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0, transition: enterTransition } },
} satisfies Record<string, Variants>;

export const viewportOnce = { once: true, amount: 0.18, margin: '0px 0px -8% 0px' } as const;
