import React from 'react';
import { ArrowUp, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-footer text-white" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">Dt. Bengi Özgür</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70 sm:text-base">
              Malatya’da yaşayan diş hekimi, sporcu ve diyabet savunucusu. İrade ve tutkunun kesiştiği nokta.
            </p>
          </div>

          <a
            href="https://www.instagram.com/bengiiozgur/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 items-center gap-4 text-white transition-colors duration-200 hover:text-white cursor-pointer"
          >
            <span className="font-serif text-lg italic">Instagram</span>
            <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 transition-colors duration-200 group-hover:bg-sugar">
              <Instagram size={18} />
            </span>
          </a>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-6 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">
            © {new Date().getFullYear()} Tüm hakları saklıdır.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 cursor-pointer"
            aria-label="Sayfanın başına dön"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
