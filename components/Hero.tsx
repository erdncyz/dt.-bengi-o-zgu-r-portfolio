import React, { useRef } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, MapPin } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import { useTheme } from './ThemeProvider';
import { EASE_OUT } from './ui/motion';

interface HeroProps {
  image: string;
}

const roles = ['Diş Hekimi', 'Sporcu', 'Tip 1 Savunucusu'];

const Hero: React.FC<HeroProps> = ({ image }) => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imgOpacity = useTransform(scrollYProgress, [0, 0.42, 0.78], [1, 0.45, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 0.85], [1.06, 1.24]);
  const blur = useTransform(scrollYProgress, [0.28, 0.8], [0, 20]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  const veil = useTransform(scrollYProgress, [0.22, 0.72], [0, 1]);
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 0.4, 0]);
  const titleColor = useTransform(
    scrollYProgress,
    [0.28, 0.68],
    theme === 'dark' ? ['#FAFAF9', '#EDEDEF'] : ['#FFFFFF', '#1C1917']
  );

  return (
    <section
      ref={ref}
      className="hero-pin bg-background"
    >
      <div className="hero-stage">
        {reduceMotion ? (
          <img
            src={image}
            alt="Dt. Bengi Özgür klinik çalışırken"
            className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
          />
        ) : (
          <motion.img
            src={image}
            alt="Dt. Bengi Özgür klinik çalışırken"
            style={{ opacity: imgOpacity, scale: imgScale, filter }}
            className="absolute inset-0 h-full w-full object-cover object-[center_18%] will-change-transform"
            fetchPriority="high"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        {!reduceMotion && (
          <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-background" />
        )}

        <div className="relative z-10 mx-auto flex h-full min-h-full max-w-page flex-col justify-end px-4 pb-10 pt-[calc(env(safe-area-inset-top)+5.5rem)] sm:px-6 lg:justify-center lg:px-8 lg:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
            className={`mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] sm:text-sm ${reduceMotion ? 'text-white' : ''}`}
            style={{ color: reduceMotion ? undefined : titleColor }}
          >
            <span className="h-px w-8 bg-current sm:w-12" />
            <MapPin size={14} aria-hidden="true" />
            Malatya
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.22 }}
            style={{ color: reduceMotion ? undefined : titleColor }}
            className={`font-serif text-[clamp(2.6rem,10.5vw,7.5rem)] font-semibold leading-[0.88] tracking-tight ${reduceMotion ? 'text-white' : ''}`}
          >
            Dt. Bengi
            <br />
            <span className="italic font-normal">Özgür</span>
          </motion.h1>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.38 }}
            style={reduceMotion ? undefined : { opacity: quoteOpacity }}
            className="mt-5 flex flex-wrap gap-2"
            aria-label="Roller"
          >
            {roles.map((role) => (
              <li
                key={role}
                className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md"
              >
                {role}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.48 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton href="#about">
              <span>Hikayeyi keşfet</span>
              <ArrowDown size={16} className="transition-transform duration-200 group-hover:translate-y-0.5" />
            </MagneticButton>
            <a
              href="https://www.instagram.com/bengiiozgur/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-inverse/40 bg-background/40 px-6 text-sm font-semibold text-primary backdrop-blur-md transition-colors duration-200 hover:border-accent hover:text-accent cursor-pointer"
            >
              Instagram
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.58 }}
            className="mt-6 hidden max-w-lg text-base leading-relaxed text-white/85 sm:mt-8 sm:block sm:text-lg"
            style={reduceMotion ? undefined : { opacity: quoteOpacity }}
          >
            Klinikte hassas bir hekim, sahada mücadeleci bir sporcu.
            <span className="mt-1 block font-medium text-white">
              Tip 1 diyabet ile sınırları yeniden tanımlayan bir irade öyküsü.
            </span>
          </motion.p>

          {!reduceMotion && (
            <motion.p
              style={{ opacity: quoteOpacity }}
              className="pointer-events-none absolute right-6 top-[28%] hidden font-serif text-3xl italic text-white/90 lg:block xl:right-16 xl:text-4xl"
            >
              “Engel yok.”
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
