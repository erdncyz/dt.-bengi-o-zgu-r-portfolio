import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, MapPin, ShieldPlus, Trophy } from 'lucide-react';
import { RevealChild, RevealGroup } from './ui/Reveal';
import DissolveImage from './ui/DissolveImage';
import { viewportOnce } from './ui/motion';

interface AboutProps {
  image: string;
}

const facts = [
  { icon: MapPin, title: 'Malatya', text: 'Doğum ve yaşam' },
  { icon: GraduationCap, title: 'İnönü Üniversitesi', text: 'Diş Hekimliği Fakültesi' },
];

const strip = [
  { label: 'Şehir', value: 'Malatya' },
  { label: 'Meslek', value: 'Diş Hekimi' },
  { label: 'Saha', value: 'Bayanlar SK' },
  { label: 'Savunu', value: 'Tip 1 Diyabet' },
];

const About: React.FC<AboutProps> = ({ image }) => {
  return (
    <section id="about" className="overflow-hidden bg-surface">
      <div className="border-y border-border">
        <RevealGroup className="mx-auto grid max-w-page grid-cols-2 lg:grid-cols-4">
          {strip.map((item, index) => (
            <RevealChild
              key={item.label}
              className={`border-border ${index % 2 === 0 ? 'border-r' : ''} ${
                index < 2 ? 'border-b lg:border-b-0' : ''
              } lg:border-r lg:last:border-r-0`}
            >
              <div className="flex min-h-[5.5rem] flex-col justify-center gap-1 px-4 py-5 sm:min-h-[6.5rem] sm:px-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle">{item.label}</p>
                <p className="font-serif text-lg text-primary sm:text-xl">{item.value}</p>
              </div>
            </RevealChild>
          ))}
        </RevealGroup>
      </div>

      <div className="mx-auto grid max-w-page grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-28">
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-lift lg:rounded-[2rem]">
              <DissolveImage src={image} alt="Bengi Özgür, bir çocukla birlikte" className="h-full w-full" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <p className="pointer-events-none absolute bottom-5 left-5 right-5 font-serif text-sm italic leading-relaxed text-white sm:bottom-6 sm:left-6 sm:right-6 sm:text-lg">
                “Hayatın içinde oldukça, diyabeti yönetmeyi daha iyi öğreniyoruz.”
              </p>
            </div>
            <div className="absolute -left-6 -top-6 hidden h-full w-full rounded-[2rem] border border-primary/10 md:block" aria-hidden="true" />
          </motion.div>
        </div>

        <RevealGroup className="lg:col-span-7">
          <RevealChild>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-sugar">Malatya’nın azimli yüzü</p>
            <h2 className="max-w-xl font-serif text-[clamp(1.85rem,4vw,3.15rem)] leading-tight text-primary">
              Şehrin dokusuyla
              <span className="block italic text-secondary">bütünleşmiş bir yaşam</span>
            </h2>
          </RevealChild>

          <RevealChild>
            <div className="mt-7 max-w-xl space-y-5 text-base leading-relaxed text-secondary sm:text-lg">
              <p>
                Bengi Özgür, Malatyalıdır. Hayatının büyük bölümünü ailesi ve sosyal çevresiyle bu şehrin sokaklarında,
                kampüslerinde ve sahalarında geçirmiştir.
              </p>
              <p>
                Yerel kültürü modern bir vizyonla birleştiren Özgür, İnönü Üniversitesi Diş Hekimliği Fakültesi’nden mezun
                olurken şehrin bayan futbol takımında da ter dökmüştür.
              </p>
            </div>
          </RevealChild>

          <RevealChild>
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {facts.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-2xl bg-background p-4 transition-colors duration-200 hover:bg-muted"
                >
                  <div className="flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-surface shadow-soft">
                    <Icon className="text-accent" size={20} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-primary">{title}</h3>
                    <p className="text-sm text-subtle">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealChild>

          <RevealChild>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-subtle">
              <span className="inline-flex items-center gap-2">
                <Trophy size={16} className="text-accent" aria-hidden="true" />
                Saha disiplini
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldPlus size={16} className="text-sugar" aria-hidden="true" />
                Klinik hassasiyet
              </span>
            </div>
          </RevealChild>
        </RevealGroup>
      </div>
    </section>
  );
};

export default About;
