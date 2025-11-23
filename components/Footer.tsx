import React from 'react';
import { Instagram, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-white py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-12 border-b border-white/10 pb-12">
            <div>
                <h3 className="text-4xl font-serif mb-4">Dt. Bengi Özgür</h3>
                <p className="text-white/60 max-w-sm font-light">
                    Malatya'da yaşayan Diş Hekimi, Sporcu ve Diyabet savunucusu. İrade ve tutkunun birleştiği nokta.
                </p>
            </div>
            
            <a 
              href="https://www.instagram.com/bengiiozgur/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-white hover:text-sugar transition-colors"
            >
              <span className="text-lg font-serif italic">Instagram</span>
              <div className="p-3 bg-white/10 rounded-full group-hover:bg-sugar group-hover:text-white transition-colors">
                  <Instagram size={20} />
              </div>
            </a>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-white/40 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Tüm hakları saklıdır.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="p-4 bg-white/5 rounded-full hover:bg-white/20 transition-colors text-white"
            aria-label="Yukarı çık"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;