import React from 'react';
import { Quote, Droplet } from 'lucide-react';
import FadeIn from './ui/FadeIn';

const DiabetesJourney: React.FC = () => {
  return (
    <section id="diabetes" className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-sugar/5 -skew-x-12 translate-x-1/3"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            <div>
                <FadeIn>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-sugar/10 rounded-full text-sugar">
                            <Droplet size={24} fill="currentColor" />
                        </div>
                        <h2 className="text-sm font-bold tracking-widest uppercase text-sugar">Tip 1 Diyabet</h2>
                    </div>
                    
                    <h3 className="text-4xl lg:text-5xl font-serif text-primary mb-8">
                        Düşman Değil, <br/>
                        <span className="text-sugar italic">Yol Arkadaşı</span>
                    </h3>

                    <div className="space-y-8 text-lg text-secondary font-light">
                        <p>
                            Henüz 17-18 yaşlarında, üniversite sınavlarına hazırlandığı en stresli dönemde Tip 1 Diyabet tanısı aldı. İlk soru herkes gibi "Neden ben?" oldu.
                        </p>
                        <p>
                            Ancak Bengi Özgür için bu süreç bir son değil, yeni bir disiplinin başlangıcıydı. Hastalığı yönetmeyi öğrendi, onunla yaşamayı bir sanata dönüştürdü. Ne diş hekimliği fakültesinin ağır ders yükü, ne de futbolun fiziksel zorluğu onu durdurabildi.
                        </p>
                    </div>
                </FadeIn>
            </div>

            <div className="flex flex-col justify-center">
                 <FadeIn delay={200} direction="up">
                    <div className="bg-primary text-white p-12 rounded-[2rem] relative shadow-2xl">
                        <Quote className="absolute top-8 left-8 text-white/20" size={64} />
                        
                        <blockquote className="relative z-10 text-2xl lg:text-3xl font-serif leading-relaxed mb-8">
                            "Hastalığı bahane edip eve kapanmayın. Koşullarınız ne olursa olsun, tutkularınızdan vazgeçmeyin."
                        </blockquote>
                        
                        <div className="flex items-center gap-4">
                            <div className="h-px w-12 bg-sugar"></div>
                            <span className="text-sm tracking-widest uppercase font-medium text-white/80">Dt. Bengi Özgür</span>
                        </div>
                    </div>
                 </FadeIn>
            </div>

        </div>
      </div>
    </section>
  );
};

export default DiabetesJourney;