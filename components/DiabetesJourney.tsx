import React from 'react';
import { Droplet } from 'lucide-react';
import Reveal, { RevealChild, RevealGroup } from './ui/Reveal';

const beats = [
  { year: '17–18', title: 'Tanı', text: 'Üniversite sınavına hazırlanırken Tip 1 diyabet tanısı. İlk soru: “Neden ben?”' },
  { year: 'Fakülte', title: 'Disiplin', text: 'Hastalığı yönetmeyi öğrendi. Klinik yük ve saha temposu onu durduramadı.' },
  { year: 'Bugün', title: 'Savunu', text: 'Diyabeti bahane değil, daha dikkatli bir yaşam biçimi olarak anlatıyor.' },
];

const DiabetesJourney: React.FC = () => {
  return (
    <section id="diabetes" className="relative overflow-hidden bg-surface py-20 lg:py-28">
      <svg
        className="pointer-events-none absolute -right-8 top-16 hidden h-64 w-[55%] text-sugar/25 lg:block"
        viewBox="0 0 640 180"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="glucose-path"
          d="M0 110 C40 110, 50 40, 90 40 S140 160, 180 110 S250 20, 300 70 S360 150, 420 90 S500 30, 560 80 S620 140, 640 110"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-page grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <RevealGroup className="lg:col-span-6">
          <RevealChild>
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-sugar/10 text-sugar">
                <Droplet size={18} fill="currentColor" aria-hidden="true" />
              </span>
              <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-sugar">Tip 1 Diyabet</h2>
            </div>
            <h3 className="font-serif text-[clamp(1.9rem,4vw,3.15rem)] leading-tight text-primary">
              Düşman değil,
              <span className="block italic text-sugar">yol arkadaşı</span>
            </h3>
          </RevealChild>

          <RevealChild>
            <div className="mt-7 max-w-xl space-y-5 text-base leading-relaxed text-secondary sm:text-lg">
              <p>
                Henüz 17–18 yaşlarında, üniversite sınavlarına hazırlandığı en stresli dönemde Tip 1 diyabet tanısı aldı.
                İlk soru herkes gibi “Neden ben?” oldu.
              </p>
              <p>
                Bu süreç bir son değil, yeni bir disiplinin başlangıcıydı. Ne diş hekimliği fakültesinin ağır ders yükü,
                ne de futbolun fiziksel zorluğu onu durdurabildi.
              </p>
            </div>
          </RevealChild>
        </RevealGroup>

        <Reveal className="lg:col-span-6">
          <blockquote className="relative overflow-hidden rounded-[1.5rem] bg-inverse p-8 text-on shadow-lift sm:p-12 lg:rounded-[2rem]">
            <p className="font-serif text-[clamp(1.45rem,3vw,2rem)] leading-snug">
              “Hastalığı bahane edip eve kapanmayın. Koşullarınız ne olursa olsun, tutkularınızdan vazgeçmeyin.”
            </p>
            <footer className="mt-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-on/70">
              <span className="h-px w-10 bg-sugar" />
              Dt. Bengi Özgür
            </footer>
          </blockquote>
        </Reveal>
      </div>

      <ol className="mx-auto mt-16 grid max-w-page grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {beats.map((beat, index) => (
          <Reveal key={beat.title} delay={index * 0.08}>
            <li className="h-full rounded-2xl border border-border bg-background p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">{beat.year}</p>
              <h4 className="mt-3 font-serif text-2xl text-primary">{beat.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-secondary sm:text-base">{beat.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
};

export default DiabetesJourney;
