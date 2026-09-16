import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface DissolveImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  children?: React.ReactNode;
}

const DissolveImage: React.FC<DissolveImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0.08, 0.38, 0.78], [0.2, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.08, 0.4, 0.9], [1.14, 1, 1.08]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {reduceMotion ? (
        <img src={src} alt={alt} className={`h-full w-full object-cover ${imgClassName}`} loading="lazy" />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          style={{ opacity, scale }}
          className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
          loading="lazy"
        />
      )}
      {children}
    </div>
  );
};

export default DissolveImage;
