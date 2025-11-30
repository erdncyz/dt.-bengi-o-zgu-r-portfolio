import React, { useState } from 'react';
import { Home, Gamepad2, BookOpen, Star, ArrowLeft } from 'lucide-react';
import { AppScreen } from './types';
import { FoodGame } from './components/FoodGame';
import { Education } from './components/Education';

interface GameAppProps {
  onBack: () => void;
}

const GameApp: React.FC<GameAppProps> = ({ onBack }) => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.HOME);

  const quote = {
    text: "Hastalığı bahane edip eve kapanmayın. Koşullarınız ne olursa olsun, tutkularınızdan vazgeçmeyin.",
    author: "Dt. Bengi Özgür"
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.HOME:
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 animate-fade-in relative z-10">

            <button
              onClick={onBack}
              className="absolute top-0 left-0 p-2 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white/80 transition-colors z-50"
              title="Siteye Dön"
            >
              <ArrowLeft className="w-6 h-6 text-slate-700" />
            </button>

            {/* Header / Logo Area */}
            <div className="text-center mb-8 relative">
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-full shadow-2xl mb-6 inline-block animate-float-fast border-4 border-blue-100">
                <span className="text-7xl">🦸‍♂️</span>
              </div>
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-2 tracking-tight drop-shadow-sm">
                Diyabet Dostu
              </h1>
            </div>

            {/* Daily Quote Card */}
            <div className="w-full max-w-xs bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl shadow-sm mb-8 transform -rotate-1 transition-transform hover:rotate-0 hover:scale-105 cursor-pointer">
              <div className="flex items-start gap-2">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" fill="currentColor" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider">Günün Sözü</span>
                  <p className="text-sm text-yellow-800 font-medium italic leading-snug mb-2">"{quote.text}"</p>
                  <p className="text-xs text-yellow-700 font-bold text-right">- {quote.author}</p>
                </div>
              </div>
            </div>

            {/* Navigation Grid */}
            <div className="grid grid-cols-1 gap-4 w-full max-w-xs">
              <button
                onClick={() => setCurrentScreen(AppScreen.GAME)}
                className="relative overflow-hidden flex items-center p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-3xl shadow-lg shadow-green-200 transition-all hover:scale-105 active:scale-95 group"
              >
                <div className="bg-white/20 p-3 rounded-2xl mr-4 group-hover:rotate-12 transition-transform">
                  <Gamepad2 className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <span className="block text-2xl font-black">Oyun Oyna</span>
                  <span className="text-xs text-green-100 opacity-90">Sağlıklı yiyecekleri topla!</span>
                </div>
                <div className="absolute -right-4 -bottom-4 bg-white/10 w-20 h-20 rounded-full"></div>
              </button>

              <button
                onClick={() => setCurrentScreen(AppScreen.LEARN)}
                className="relative overflow-hidden flex items-center p-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-3xl shadow-lg shadow-orange-200 transition-all hover:scale-105 active:scale-95 group"
              >
                <div className="bg-white/20 p-3 rounded-2xl mr-4 group-hover:rotate-12 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <span className="block text-2xl font-black">Bilgi & Sözlük</span>
                  <span className="text-xs text-orange-100 opacity-90">Terimleri öğren, yarış!</span>
                </div>
                <div className="absolute -right-4 -bottom-4 bg-white/10 w-20 h-20 rounded-full"></div>
              </button>
            </div>
          </div>
        );
      case AppScreen.GAME:
        return <FoodGame />;
      case AppScreen.LEARN:
        return <Education />;
      default:
        return <div>Bulunamadı</div>;
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 flex flex-col relative">
      {/* Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto md:p-6 overflow-hidden relative z-10">
        <div className="h-full">
          {renderScreen()}
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="glass-panel border-t border-white/50 pb-safe pt-2 px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] sticky bottom-0 z-50 rounded-t-3xl backdrop-blur-xl bg-white/80">
        <div className="flex justify-around items-center max-w-md mx-auto h-16">
          <button
            onClick={() => setCurrentScreen(AppScreen.HOME)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${currentScreen === AppScreen.HOME ? 'text-blue-600 scale-110' : 'text-gray-400 hover:text-blue-400'}`}
          >
            <Home className="w-6 h-6" strokeWidth={currentScreen === AppScreen.HOME ? 3 : 2} />
            <span className="text-[10px] font-bold">Ana Sayfa</span>
          </button>

          <button
            onClick={() => setCurrentScreen(AppScreen.GAME)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 relative ${currentScreen === AppScreen.GAME ? 'text-green-500' : 'text-gray-400 hover:text-green-400'}`}
          >
            <div className={`p-3 rounded-full -mt-8 border-4 border-[#F0F9FF] shadow-lg transition-transform ${currentScreen === AppScreen.GAME ? 'bg-gradient-to-tr from-green-500 to-emerald-400 text-white scale-110' : 'bg-gray-100 text-gray-400'}`}>
              <Gamepad2 className="w-6 h-6" strokeWidth={2} />
            </div>
            <span className="text-[10px] font-bold mt-1">Oyun</span>
          </button>

          <button
            onClick={() => setCurrentScreen(AppScreen.LEARN)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${currentScreen === AppScreen.LEARN ? 'text-orange-500 scale-110' : 'text-gray-400 hover:text-orange-400'}`}
          >
            <BookOpen className="w-6 h-6" strokeWidth={currentScreen === AppScreen.LEARN ? 3 : 2} />
            <span className="text-[10px] font-bold">Öğren</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default GameApp;