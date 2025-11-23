import React from 'react';
import { ArrowRight } from 'lucide-react';
import FadeIn from './ui/FadeIn';

const Advocacy: React.FC = () => {
  return (
    <section id="advocacy" className="py-32 bg-background border-t border-primary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <FadeIn>
            <h2 className="text-4xl lg:text-6xl font-serif text-primary mb-8">
                Geleceğe Not
            </h2>
            <p className="text-xl text-secondary font-light leading-relaxed mb-12">
                Bengi Özgür, Turgut Özal Tıp Merkezi'ndeki "Diyabet Gönüllüleri" etkinliklerinde ailelere sesleniyor: <br/>
                <span className="text-sugar font-medium">"Çocuklarınızı geri çekmeyin."</span>
            </p>
        </FadeIn>

        <FadeIn delay={200}>
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-secondary/5 mx-auto">
                <p className="text-lg md:text-xl text-primary font-serif italic mb-6">
                    "Onları spora, sanata yönlendirin. Biz hayatın içinde oldukça bu durumu yönetmeyi daha iyi öğreniyoruz. Diyabet engel değil, sadece biraz daha dikkatli yaşamaktır."
                </p>
                <div className="flex justify-center mt-8">
                    <a href="https://www.instagram.com/bengiiozgur/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-sugar hover:text-primary transition-colors">
                        Bize Katılın <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </FadeIn>

      </div>
    </section>
  );
};

export default Advocacy;