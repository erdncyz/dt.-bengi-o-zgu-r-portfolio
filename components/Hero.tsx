import React from 'react';
import { ArrowDown } from 'lucide-react';
import FadeIn from './ui/FadeIn';

interface HeroProps {
  image: string;
}

const Hero: React.FC<HeroProps> = ({ image }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center">
          
          {/* Typography Side */}
          <div className="lg:col-span-7 z-10 py-12 lg:py-0 order-2 lg:order-1">
            <FadeIn delay={100}>
              <div className="inline-flex items-center space-x-2 mb-8">
                <span className="w-12 h-[1px] bg-primary"></span>
                <span className="text-sm tracking-[0.2em] uppercase font-medium text-secondary">Malatya</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif text-primary leading-[0.9] mb-8">
                Dt. Bengi <br/>
                <span className="italic text-secondary">Özgür</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={300}>
              <p className="text-xl text-secondary max-w-lg font-light leading-relaxed mb-10">
                Klinikte hassas bir hekim, sahada mücadeleci bir sporcu. <br/>
                <strong className="font-medium text-primary">Tip 1 Diyabet</strong> ile sınırları yeniden tanımlayan bir irade öyküsü.
              </p>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="flex flex-wrap gap-4">
                <a href="#about" className="group flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full transition-all hover:bg-sugar hover:scale-105">
                  <span>Hikayeyi Keşfet</span>
                  <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Image Side - Modern Card */}
          <div className="lg:col-span-5 h-full relative order-1 lg:order-2 mb-8 lg:mb-0">
             <FadeIn direction="left" delay={500} className="h-full">
              <div className="relative h-[60vh] lg:h-[80vh] w-full rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                  src={image} 
                  alt="Dt. Bengi Özgür Working" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white max-w-[200px]">
                  <p className="font-serif text-2xl italic">"Engel Yok."</p>
                </div>
              </div>
             </FadeIn>
          </div>

        </div>
      </div>
      
      {/* Decorative Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif font-black text-secondary/5 whitespace-nowrap -z-10 pointer-events-none select-none">
        BENGİ
      </div>
    </section>
  );
};

export default Hero;