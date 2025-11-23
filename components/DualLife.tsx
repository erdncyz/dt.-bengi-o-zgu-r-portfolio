import React from 'react';
import FadeIn from './ui/FadeIn';

interface DualLifeProps {
  bootsImage: string;
  lockerImage: string;
}

const DualLife: React.FC<DualLifeProps> = ({ bootsImage, lockerImage }) => {
  return (
    <section id="dual-life" className="bg-background">
      
      {/* 1. Full Width Locker Room Parallax */}
      <div className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden">
        <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${lockerImage})` }}
        >
             <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <FadeIn>
                <h2 className="text-5xl lg:text-7xl font-serif text-white mb-6">Takım Ruhu</h2>
                <p className="text-white/80 text-xl max-w-2xl mx-auto font-light">
                    Malatya Bayanlar Spor Kulübü'nde geçen yıllar, soyunma odasındaki dostluklar ve sahada verilen omuz omuza mücadele.
                </p>
            </FadeIn>
        </div>
      </div>

      {/* 2. Detail Section with Boots */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
                <FadeIn direction="left">
                    <div className="relative aspect-[4/5] rounded-none lg:rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                        <img 
                            src={bootsImage} 
                            alt="Hanging Football Boots" 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-6 shadow-lg border-l-4 border-sugar">
                            <p className="font-serif italic text-primary text-lg">
                                "Şekerim düşer mi korkusuyla kenarda beklemedim. Oyunun içinde kaldım."
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </div>

            <div className="lg:col-span-1 hidden lg:block"></div>

            <div className="lg:col-span-6">
                <FadeIn delay={200}>
                    <div className="flex items-center space-x-4 mb-8">
                         <span className="text-6xl font-serif text-primary/10 font-bold">10</span>
                         <span className="text-sm font-bold tracking-widest uppercase text-primary">Numara Mücadele</span>
                    </div>
                    
                    <h3 className="text-4xl font-serif text-primary mb-6">
                        Yarı Profesyonel Tutku
                    </h3>
                    
                    <div className="prose prose-lg text-secondary font-light">
                        <p className="mb-6">
                            Futbol onun için bir hobi değil, bir yaşam biçimidir. Teknik direktörü Mikail Tutuk'un da övgüyle bahsettiği o mücadeleci ruh, sahada sadece rakibe karşı değil, metabolizmasına karşı da bir zafer kazanır.
                        </p>
                        <p className="mb-6">
                            Maç öncesi insülinini ayarlar, kramponlarını bağlar ve sahaya çıkar. Diyabetli bir bireyin neleri başarabileceğinin canlı kanıtıdır.
                        </p>
                        <div className="pl-6 border-l border-primary/20 italic text-subtle">
                             "Ben diş hekimi de oldum, futbolcu da oldum. Siz de olabilirsiniz."
                        </div>
                    </div>
                </FadeIn>
            </div>

        </div>
      </div>
    </section>
  );
};

export default DualLife;