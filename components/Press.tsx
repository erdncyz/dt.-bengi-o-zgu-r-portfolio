import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote, X } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import Reveal, { RevealChild, RevealGroup } from './ui/Reveal';
import { EASE_OUT, viewportOnce } from './ui/motion';

const NEWS = {
  url: 'https://www.inonu.edu.tr/inuhaber/haber/8934/dunya-diyabet-gunune-ozel-etkinlik-duzenlendi',
  source: 'İNÜHABER',
  org: 'İnönü Üniversitesi',
  title: "Dünya Diyabet Günü'ne Özel Etkinlik Düzenlendi",
  date: '15 Kasım 2025',
  reporter: 'Yağmur Sayın',
  venue: 'Turgut Özal Kongre ve Kültür Merkezi',
  event: '6. Geleneksel Diyabet Günü',
};

const PHOTOS = [
  {
    src: '/press-stage.jpg',
    alt: 'Dt. Bengi Özgür, kırmızı perdeli sahnede konuşurken; arkada Düşlerden Gülüşlere logosu yansıtılıyor',
    caption: 'Sahne',
    detail: 'Düşlerden Gülüşlere · Turgut Özal salonu',
  },
  {
    src: '/press-podium.jpg',
    alt: 'Dt. Bengi Özgür kürsüde. Kürsü ekranında Diş Hekimi Bengi Özgür yazıyor',
    caption: 'Kürsü',
    detail: 'Diş Hekimi Bengi Özgür',
  },
  {
    src: '/press-hall.jpg',
    alt: 'Salon önünde beyaz çiçekler ve dinleyicilerle Dt. Bengi Özgür’ün konuşması',
    caption: 'Salon',
    detail: '14 Kasım Dünya Diyabet Günü',
  },
] as const;

const QUOTES = [
  'Biz hayata diyabetimizi yönetebilmek için değil, bu hayatta diyabetimizle beraber yaşamak için geldik.',
  'Bunları yaparken hiçbir zaman diyabetime rağmen bunları yaptım demedim. Diyabetimle beraber yaptım.',
  'Lütfen çocuklarınıza diyabet yönetiminden önce hayata karşı motive edin.',
];

const Press: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['0%', '12%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.08, 1.18]);

  useEffect(() => {
    if (active === null) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') setActive((index) => (index === null ? 0 : (index + 1) % PHOTOS.length));
      if (event.key === 'ArrowLeft') {
        setActive((index) => (index === null ? 0 : (index - 1 + PHOTOS.length) % PHOTOS.length));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  const openPhoto = (index: number) => setActive(index);

  return (
    <section id="press" className="bg-[#050506] text-white">
      <div ref={heroRef} className="relative isolate min-h-[88vh] overflow-hidden sm:min-h-[92vh]">
        <motion.img
          src={PHOTOS[0].src}
          alt={PHOTOS[0].alt}
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 h-[118%] w-full object-cover object-[30%_52%] will-change-transform lg:object-[52%_42%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/10" />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-page flex-col justify-between px-4 py-8 sm:min-h-[92vh] sm:px-6 lg:px-8 lg:py-12">
          <div className="flex flex-wrap items-center justify-between gap-4 pt-[calc(env(safe-area-inset-top)+4.5rem)]">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">
              <span className="rounded-full bg-[#1B6B7D] px-3 py-1 tracking-[0.2em] text-white">İNÜHABER</span>
              <span className="hidden sm:inline">İnönü Üniversitesi Haber Merkezi</span>
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">{NEWS.date}</p>
          </div>

          <div className="max-w-4xl pb-6 lg:pb-10">
            <p className="mb-4 max-w-2xl text-xs font-bold uppercase tracking-[0.18em] text-accent sm:tracking-[0.22em]">
              {NEWS.event}
              <span className="mt-1 block font-semibold tracking-[0.14em] text-white/55 sm:mt-0 sm:ml-3 sm:inline">
                {NEWS.venue}
              </span>
            </p>
            <h2 className="font-serif text-[clamp(2.4rem,8vw,6.4rem)] font-semibold leading-[0.9] tracking-tight text-white">
              Kürsüde
              <span className="block italic font-normal">bir irade.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              14 Kasım Dünya Diyabet Günü’nde Malatya, diş hekimi, sporcu ve Tip 1 diyabetli Dt. Bengi Özgür’ü dinledi.
            </p>
            <button
              type="button"
              onClick={() => openPhoto(0)}
              className="mt-8 inline-flex min-h-11 items-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white"
            >
              Sahneyi büyüt
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#050506]">
        <div className="mx-auto grid max-w-page grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-28">
          <RevealGroup className="lg:col-span-6">
            <RevealChild>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                Ruhsal dayanıklılık
              </p>
              <h3 className="font-serif text-[clamp(1.9rem,4vw,3.1rem)] leading-tight text-white">
                İNÜHABER’in sayfalarında
                <span className="block italic text-white/70">onun satırları</span>
              </h3>
            </RevealChild>
            <RevealChild>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-white/72 sm:text-lg">
                <p>
                  İnönü Üniversitesi Tıp Fakültesi Çocuk Endokrinoloji ve Diyabet Ekibi ile Düşlerden Gülüşlere
                  Topluluğu, 14 Kasım’da 6. Geleneksel Diyabet Günü’nü Turgut Özal Kongre ve Kültür Merkezi’nde
                  topladı.
                </p>
                <p>
                  İNÜHABER’in haberine göre çocukluktan beri Tip 1 diyabetli olan Diş Hekimi Bengi Özgür, kürsüde
                  ruhsal dayanıklılığın ve psikolojik desteğin hayatın merkezinde olduğunu anlattı. İnsülin pompası
                  ile Kadınlar 3. Ligi’nde sahaya çıktığını söyleyen Özgür, ailelerden çocuklarını diyabet yüzünden
                  hiçbir faaliyetten uzak tutmamalarını istedi.
                </p>
              </div>
            </RevealChild>
            <RevealChild>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
                {[
                  ['Rol', 'Konuşmacı'],
                  ['Lig', 'Kadınlar 3.'],
                  ['Araç', 'İnsülin pompası'],
                  ['Çağrı', 'Geri çekmeyin'],
                ].map(([label, value]) => (
                    <div key={label} className="bg-[#050506] px-4 py-4">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">{label}</dt>
                    <dd className="mt-1 font-serif text-sm text-white sm:text-base">{value}</dd>
                  </div>
                ))}
              </dl>
            </RevealChild>
          </RevealGroup>

          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="lg:col-span-6"
          >
            <button
              type="button"
              onClick={() => openPhoto(1)}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[1.5rem] shadow-lift lg:rounded-[2rem]"
              aria-label="Kürsü fotoğrafını büyüt"
            >
              <img
                src={PHOTOS[1].src}
                alt={PHOTOS[1].alt}
                className="aspect-[4/3] w-full object-cover object-[42%_38%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-left">
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    02 — {PHOTOS[1].caption}
                  </span>
                  <span className="mt-1 block font-serif text-lg text-white">{PHOTOS[1].detail}</span>
                </span>
                <span className="hidden rounded-full border border-white/25 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/80 sm:inline">
                  Büyüt
                </span>
              </span>
            </button>
          </motion.figure>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#070708]">
        <div className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <RevealGroup className="mb-10 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
            <RevealChild>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Kürsüden</p>
              <h3 className="mt-3 font-serif text-[clamp(1.8rem,4vw,2.8rem)] text-white">Ailelere bıraktığı cümleler</h3>
            </RevealChild>
            <RevealChild>
              <p className="max-w-sm text-sm leading-relaxed text-white/55">
                Aynı sahnede kayda geçen sözler. İNÜHABER’in haberleştirdiği günün, salonda kalan yankısı.
              </p>
            </RevealChild>
          </RevealGroup>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {QUOTES.map((quote, index) => (
              <Reveal key={quote} delay={index * 0.08}>
                <blockquote className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7 lg:p-8">
                  <Quote className="text-accent" size={22} strokeWidth={1.5} aria-hidden="true" />
                  <p className="mt-6 font-serif text-xl leading-snug text-white sm:text-[1.35rem]">“{quote}”</p>
                  <footer className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                    0{index + 1} — Dt. Bengi Özgür
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#050506]">
        <div className="mx-auto grid max-w-page grid-cols-1 items-end gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-24">
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="lg:col-span-5"
          >
            <button
              type="button"
              onClick={() => openPhoto(2)}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[1.5rem] shadow-lift lg:rounded-[2rem]"
              aria-label="Salon fotoğrafını büyüt"
            >
              <img
                src={PHOTOS[2].src}
                alt={PHOTOS[2].alt}
                className="aspect-[3/4] w-full object-cover object-[48%_28%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
              <span className="absolute bottom-5 left-5 right-5 text-left">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  03 — {PHOTOS[2].caption}
                </span>
                <span className="mt-1 block font-serif text-lg text-white">{PHOTOS[2].detail}</span>
              </span>
            </button>
          </motion.figure>

          <Reveal className="lg:col-span-7 lg:pb-4">
            <p className="font-serif text-[clamp(1.6rem,3.4vw,2.55rem)] leading-snug text-white">
              “Çocukların sırf diyabetli diye bir şeylerden geri kalmasına izin vermeyin.”
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Üniversiteyi Tip 1 ile kazandı, beş yıl diş hekimliğini onunla okudu, beyaz önlüğü onunla giydi, insülin
              pompasıyla sahaya çıktı. İNÜHABER’in kayda aldığı gün, bu hayatın ailelere uzanan haliydi.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#070708]">
        <Reveal className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <article className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] lg:rounded-[2rem]">
            <div className="h-1.5 w-full bg-[#1B6B7D]" />
            <div className="grid grid-cols-1 gap-8 p-7 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-12">
              <div className="lg:col-span-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7eb8c4]">
                  Kaynak · {NEWS.org}
                </p>
                <h3 className="mt-3 font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-tight text-white">
                  {NEWS.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                  Resmi haber, İNÜHABER Merkezi’nde yayımlandı. Muhabir {NEWS.reporter}. Dt. Bengi Özgür’ün
                  konuşması, ruhsal dayanıklılık ve psikolojik destek başlığıyla kayda geçti.
                </p>
                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.16em] text-white/45">
                  <div>
                    <dt className="text-white/30">Tarih</dt>
                    <dd className="mt-1 text-white/70">{NEWS.date}</dd>
                  </div>
                  <div>
                    <dt className="text-white/30">Mekân</dt>
                    <dd className="mt-1 text-white/70">{NEWS.venue}</dd>
                  </div>
                  <div>
                    <dt className="text-white/30">Kaynak</dt>
                    <dd className="mt-1 text-white/70">inonu.edu.tr / inuhaber</dd>
                  </div>
                </dl>
              </div>
              <div className="lg:col-span-5 lg:justify-self-end">
                <MagneticButton href={NEWS.url} className="w-full sm:w-auto">
                  <span>Haberi oku</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </MagneticButton>
                <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/40">
                  İnönü Üniversitesi resmi haber portalı — İNÜHABER.
                </p>
              </div>
            </div>
          </article>
        </Reveal>
      </div>

      {createPortal(
        <AnimatePresence>
          {active !== null && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Etkinlik fotoğrafı"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
              onClick={() => setActive(null)}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-4 top-[calc(env(safe-area-inset-top)+1rem)] z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Kapat"
              >
                <X size={20} />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActive((index) => (index === null ? 0 : (index - 1 + PHOTOS.length) % PHOTOS.length));
                }}
                className="absolute left-3 top-1/2 z-10 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Önceki fotoğraf"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActive((index) => (index === null ? 0 : (index + 1) % PHOTOS.length));
                }}
                className="absolute right-3 top-1/2 z-10 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Sonraki fotoğraf"
              >
                <ChevronRight size={22} />
              </button>
              <motion.figure
                key={PHOTOS[active].src}
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="max-h-[86vh] max-w-5xl px-12"
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={PHOTOS[active].src}
                  alt={PHOTOS[active].alt}
                  className="max-h-[78vh] w-full rounded-2xl object-contain shadow-lift"
                />
                <figcaption className="mt-4 text-center text-sm text-white/70">
                  {PHOTOS[active].caption} — {PHOTOS[active].detail}
                </figcaption>
              </motion.figure>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Press;
