import React from 'react';
import FadeIn from './ui/FadeIn';
import { MapPin, School } from 'lucide-react';

interface AboutProps {
  image: string;
}

const About: React.FC<AboutProps> = ({ image }) => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="relative order-2 lg:order-1">
            <FadeIn direction="right">
              <div className="relative">
                {/* Image Frame */}
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] z-10">
                  <img 
                    src={image} 
                    alt="Bengi Özgür with child" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                  <div className="absolute bottom-8 left-8 text-white max-w-xs">
                     <p className="font-serif italic text-lg opacity-90">"Hayatın içinde oldukça, diyabeti yönetmeyi daha iyi öğreniyoruz."</p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-12 -left-12 w-full h-full border border-secondary/10 rounded-[2rem] -z-0 hidden md:block"></div>
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-sugar/5 rounded-full blur-3xl -z-0"></div>
              </div>
            </FadeIn>
          </div>

          <div className="order-1 lg:order-2">
            <FadeIn>
              <h2 className="text-sm font-bold tracking-widest text-sugar uppercase mb-4">Malatya'nın Azimli Yüzü</h2>
              <h3 className="text-4xl lg:text-5xl font-serif text-primary mb-8 leading-tight">
                Şehrin Dokusuyla <br/>
                <span className="italic text-secondary">Bütünleşmiş Bir Yaşam</span>
              </h3>
            </FadeIn>
            
            <FadeIn delay={100}>
              <div className="space-y-6 text-lg text-secondary font-light leading-relaxed">
                <p>
                  Bengi Özgül, Malatyalıdır. Hayatının büyük bir bölümünü, ailesi ve sosyal çevresiyle birlikte bu şehrin sokaklarında, kampüslerinde ve sahalarında geçirmiştir.
                </p>
                <p>
                  Yerel kültürü modern bir vizyonla birleştiren Özgür, İnönü Üniversitesi Diş Hekimliği Fakültesi'nden mezun olurken, aynı zamanda şehrin bayan futbol takımında ter dökmüştür.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-background hover:bg-sugar/5 transition-colors group">
                  <div className="p-3 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary">Malatya</h4>
                    <p className="text-sm text-subtle">Doğum ve Yaşam</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 rounded-xl bg-background hover:bg-sugar/5 transition-colors group">
                   <div className="p-3 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                    <School className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary">İnönü Üni.</h4>
                    <p className="text-sm text-subtle">Diş Hekimliği Fakültesi</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;