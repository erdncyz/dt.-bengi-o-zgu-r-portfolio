import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Reveal, { RevealChild, RevealGroup } from './ui/Reveal';
import DissolveImage from './ui/DissolveImage';
import { viewportOnce } from './ui/motion';

interface DualLifeProps {
  bootsImage: string;
  lockerImage: string;
}

const DualLife: React.FC<DualLifeProps> = ({ bootsImage, lockerImage }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-12%', '12%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.18, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0.08, 0.35, 0.82], [0.2, 1, 0]);
  const copyOpacity = useTransform(scrollYProgress, [0.12, 0.36, 0.72], [0, 1, 0]);

  return (
    <section id="dual-life" className="bg-background">
      <div ref={sceneRef} className="relative h-[62vh] overflow-hidden sm:h-[70vh] lg:h-[86vh]">
        <motion.img
          src={lockerImage}
          alt="Malatya Bayanlar Spor Kulübü soyunma odası"
          style={{
            y: imageY,
            scale: imageScale,
            opacity: reduceMotion ? 1 : imageOpacity,
          }}
          className="absolute inset-0 h-[130%] w-full object-cover will-change-transform"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          style={{ opacity: reduceMotion ? 1 : copyOpacity }}
          className="absolute inset-0 flex items-center justify-center px-4 text-center"
        >
          <Reveal className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-white/70">Saha</p>
            <h2 className="font-serif text-[clamp(2.4rem,7vw,4.5rem)] text-white">Takım ruhu</h2>
            <p className="mt-5 text-base font-normal leading-relaxed text-white/85 sm:text-lg">
              Malatya Bayanlar Spor Kulübü’nde geçen yıllar, soyunma odasındaki dostluklar ve sahada verilen omuz omuza
              mücadele.
            </p>
          </Reveal>
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-page grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-28">
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative overflow-hidden rounded-[1.5rem] shadow-lift lg:rounded-[2rem]">
            <DissolveImage
              src={bootsImage}
              alt="Askıdaki futbol kramponları"
              className="aspect-[4/5] w-full"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border-l-4 border-sugar bg-surface/95 p-5 shadow-soft backdrop-blur-sm sm:inset-x-6 sm:bottom-6 sm:p-6">
              <p className="font-serif text-base italic leading-relaxed text-primary sm:text-lg">
                “Şekerim düşer mi korkusuyla kenarda beklemedim. Oyunun içinde kaldım.”
              </p>
            </div>
          </div>
        </motion.div>

        <RevealGroup className="lg:col-span-6 lg:col-start-7">
          <RevealChild>
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-serif text-6xl font-semibold leading-none text-primary/10 sm:text-7xl">10</span>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Numara mücadele</span>
            </div>
            <h3 className="font-serif text-[clamp(1.85rem,4vw,2.75rem)] text-primary">Yarı profesyonel tutku</h3>
          </RevealChild>

          <RevealChild>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-secondary sm:text-lg">
              <p>
                Futbol onun için bir hobi değil, bir yaşam biçimidir. Teknik direktörü Mikail Tutuk’un da övgüyle bahsettiği
                mücadeleci ruh, sahada yalnızca rakibe karşı değil metabolizmasına karşı da zafer kazanır.
              </p>
              <p>
                Maç öncesi insülinini ayarlar, kramponlarını bağlar ve sahaya çıkar. Diyabetli bir bireyin neleri
                başarabileceğinin canlı kanıtıdır.
              </p>
            </div>
          </RevealChild>

          <RevealChild>
            <p className="mt-8 border-l-2 border-accent pl-5 font-serif text-lg italic text-secondary">
              “Ben diş hekimi de oldum, futbolcu da oldum. Siz de olabilirsiniz.”
            </p>
          </RevealChild>
        </RevealGroup>
      </div>
    </section>
  );
};

export default DualLife;
