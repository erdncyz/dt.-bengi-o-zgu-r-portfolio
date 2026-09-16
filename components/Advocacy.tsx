import React from 'react';
import { ArrowRight, Instagram } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import Reveal, { RevealChild, RevealGroup } from './ui/Reveal';

const Advocacy: React.FC = () => {
  return (
    <section id="advocacy" className="border-t border-border bg-background py-20 lg:py-28">
      <RevealGroup className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <RevealChild>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-accent">Geleceğe not</p>
          <h2 className="font-serif text-[clamp(2rem,6vw,3.75rem)] leading-tight text-primary">
            Çocuklarınızı geri çekmeyin
          </h2>
        </RevealChild>

        <RevealChild>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
            Bengi Özgür, Turgut Özal Tıp Merkezi’ndeki Diyabet Gönüllüleri etkinliklerinde ailelere sesleniyor. Tutku,
            disiplin ve hayatın içinde kalmak; diyabeti yönetmenin en sağlam yolu.
          </p>
        </RevealChild>
      </RevealGroup>

      <Reveal className="mx-auto mt-12 max-w-3xl px-4 sm:px-6 lg:px-8">
        <figure className="rounded-[1.5rem] border border-border bg-surface p-7 text-center shadow-soft sm:p-12 lg:rounded-[2rem]">
          <blockquote className="font-serif text-lg italic leading-relaxed text-primary sm:text-2xl">
            “Onları spora, sanata yönlendirin. Biz hayatın içinde oldukça bu durumu yönetmeyi daha iyi öğreniyoruz.
            Diyabet engel değil, sadece biraz daha dikkatli yaşamaktır.”
          </blockquote>
          <figcaption className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <MagneticButton href="https://www.instagram.com/bengiiozgur/" className="w-full sm:w-auto">
              <Instagram size={16} aria-hidden="true" />
              <span>Bize katılın</span>
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </MagneticButton>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
};

export default Advocacy;
