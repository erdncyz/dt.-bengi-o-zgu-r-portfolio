import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Play, RotateCcw, Trophy, Info } from 'lucide-react';
import { GameState, FoodItem, INITIAL_GAME_STATE } from '../types';

export const FoodGame: React.FC = () => {
  const [state, setState] = useState<GameState>(INITIAL_GAME_STATE);
  const [items, setItems] = useState<FoodItem[]>([]);
  const [basketX, setBasketX] = useState(50); // Percentage 0-100
  const [activeFact, setActiveFact] = useState<{text: string, id: number} | null>(null);
  const [gameOverReason, setGameOverReason] = useState<string>("");
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);

  // Constants
  const SPAWN_RATE = 1200; 
  const BASKET_WIDTH_PERCENT = 22;

  // Specific Facts Database with Carbohydrate Info
  const SPECIFIC_FACTS: Record<string, string> = {
    '🥦': "1 kase Brokoli: ~6g Karbonhidrat. Şekeri çok az etkiler! 🛡️",
    '🥕': "1 Havuç: ~6g Karbonhidrat. Şekeri yavaşça yükseltir. 🐇",
    '🍎': "1 Elma: ~15g Karbonhidrat. Yaklaşık 1 dilim ekmek kadar şeker yapar. 🍏",
    '🍗': "Tavuk: 0g Karbonhidrat. Şekeri doğrudan yükseltmez! 💪",
    '💧': "Su: 0g Şeker. Şekeri dengeler, bol bol iç! 💧",
    '🥗': "Salata: Çok az karbonhidrat. Şekeri yükseltmez, tok tutar. 🥗",
    '🥑': "Avokado: Sağlıklı yağ içerir, şekerin hızlı çıkmasını engeller. 🥑",
    '🧀': "Peynir: 0-1g Karbonhidrat. Harika bir atıştırmalık! 🧀",
    '🍩': "1 Donut: ~30g Karbonhidrat + Yağ. Şekeri HIZLA fırlatır! 🚀",
    '🥤': "1 Kutu Kola: ~35g Şeker. Roket hızıyla kana karışır! ⚡",
    '🍬': "Şekerleme: Saf şeker. Sadece şekerin düştüğünde yemelisin. 🍬",
    '🍰': "1 Dilim Pasta: ~50g Karbonhidrat. Çok fazla insülin gerekir! 🎂",
    '🍭': "Lolipop: Hızlı şeker. Acil durumlar için sakla. 🚑",
    '🍫': "Çikolata: Yağlı olduğu için şekeri yavaş ama uzun süre yükseltir. 🍫",
    '🧁': "Cupcake: ~30g Karbonhidrat. Küçük ama etkisi büyük! 🧁",
    '💉': "İnsülin: Hücrelerin kapısını açar ve şekeri düşürür. Süper kahraman! 🦸‍♂️"
  };

  // Fallback generic facts
  const GENERIC_FACTS = {
    healthy: [
        "Lifli gıdalar şekerin hızlı yükselmesini önler. 🛡️",
        "Protein kaslarını güçlendirir ve tok tutar. 💪",
        "Su içmek vücudunu temizler ve ferahlatır. 💧"
    ],
    sugary: [
        "Dikkat! Şekerli yiyecekler kan şekerini hızla zıplatır. 🐇",
        "Tatlı yedikten sonra şekerin düşebilir (Reaktif Hipoglisemi).",
        "Çok fazla tatlı yemek seni yorgun hissettirebilir."
    ],
    insulin: [
        "İnsülin anahtardır! Şekeri hücreye sokar. 🔑",
        "Süper hamle! Şekeri dengeledin."
    ]
  };

  const showFact = (item: FoodItem) => {
      // Try to find specific fact for the emoji
      let text = SPECIFIC_FACTS[item.emoji];
      
      // If no specific fact, use generic fallback
      if (!text) {
          const list = GENERIC_FACTS[item.type];
          text = list[Math.floor(Math.random() * list.length)];
      }

      setActiveFact({ text, id: Date.now() });
      
      // Clear after 4 seconds for readability
      setTimeout(() => {
          setActiveFact(prev => (prev && prev.text === text ? null : prev));
      }, 4000);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!gameAreaRef.current || !state.isPlaying) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    let newX = (touchX / rect.width) * 100;
    newX = Math.max(BASKET_WIDTH_PERCENT / 2, Math.min(100 - BASKET_WIDTH_PERCENT / 2, newX));
    setBasketX(newX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gameAreaRef.current || !state.isPlaying) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    let newX = (mouseX / rect.width) * 100;
    newX = Math.max(BASKET_WIDTH_PERCENT / 2, Math.min(100 - BASKET_WIDTH_PERCENT / 2, newX));
    setBasketX(newX);
  };

  const spawnItem = useCallback(() => {
    const random = Math.random();
    let type: 'healthy' | 'sugary' | 'insulin' = 'healthy';
    let emoji = '🥦';
    
    // Balanced spawn rates
    if (random < 0.55) {
        type = 'healthy';
        const foods = ['🥦', '🥕', '🍎', '🍗', '💧', '🥗', '🥑', '🧀'];
        emoji = foods[Math.floor(Math.random() * foods.length)];
    } else if (random < 0.85) {
        type = 'sugary';
        const sweets = ['🍩', '🥤', '🍬', '🍰', '🍭', '🍫', '🧁'];
        emoji = sweets[Math.floor(Math.random() * sweets.length)];
    } else {
        type = 'insulin';
        emoji = '💉';
    }

    const newItem: FoodItem = {
      id: Date.now() + Math.random(),
      emoji,
      type,
      x: Math.random() * 80 + 10, 
      y: -10,
      speed: Math.random() * 0.2 + 0.25, 
    };
    
    setItems(prev => [...prev, newItem]);
  }, []);

  const gameLoop = useCallback((time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    setState((currentState) => {
        if (!currentState.isPlaying || currentState.gameOver) return currentState;
        
        if (currentState.bloodSugar >= 240) {
            setGameOverReason("Çok fazla şekerli yiyecek yedin ve insülin almayı unuttun! Şekerin çok yükseldi.");
            return { ...currentState, gameOver: true, message: "Şekerin Çok Yükseldi! 📈" };
        }
        if (currentState.bloodSugar < 50) {
             setGameOverReason("Şekerin çok düştü! Bazen insülin yaparken dikkatli olmalı ve yanında meyve suyu bulundurmalısın.");
             return { ...currentState, gameOver: true, message: "Şekerin Çok Düştü! 📉" };
        }
        return currentState;
    });

    if (spawnTimerRef.current > SPAWN_RATE) {
        spawnItem();
        spawnTimerRef.current = 0;
    } else {
        spawnTimerRef.current += deltaTime;
    }

    setItems((prevItems) => {
      const nextItems: FoodItem[] = [];
      const caughtItems: FoodItem[] = [];

      prevItems.forEach((item) => {
        const nextY = item.y + item.speed * (deltaTime / 10); 

        // Collision Box
        const basketTop = 82;
        const basketBottom = 95;
        const basketLeft = basketX - BASKET_WIDTH_PERCENT / 2;
        const basketRight = basketX + BASKET_WIDTH_PERCENT / 2;

        const isCaught = 
            nextY > basketTop && 
            nextY < basketBottom && 
            item.x > basketLeft && 
            item.x < basketRight;

        if (isCaught) {
          caughtItems.push(item);
        } else if (nextY < 105) {
          nextItems.push({ ...item, y: nextY });
        }
      });

      if (caughtItems.length > 0) {
        setState(prev => {
            let newScore = prev.score;
            let newBS = prev.bloodSugar;
            let msg = prev.message;

            caughtItems.forEach(item => {
                showFact(item);

                if (item.type === 'healthy') {
                    newScore += 10;
                    if (newBS > 100) newBS -= 2; 
                } else if (item.type === 'sugary') {
                    newBS += 35;
                    msg = "Eyvah! Şeker yükseliyor! 🚀";
                } else if (item.type === 'insulin') {
                    if (newBS > 100) {
                        newBS -= 50;
                        newScore += 5; 
                        msg = "Süper! Dengeledin. 📉";
                    } else {
                        // Taking insulin when already low decreases it further
                         newBS -= 30; 
                         msg = "Dikkat et! Şekerin zaten düşüktü.";
                    }
                }
            });
            
            return {
                ...prev,
                score: newScore,
                bloodSugar: newBS,
                message: msg
            };
        });
      }

      return nextItems;
    });

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [spawnItem, basketX]);

  useEffect(() => {
    if (state.isPlaying && !state.gameOver) {
      requestRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
       if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [state.isPlaying, state.gameOver, gameLoop]);

  const startGame = () => {
    setState({ ...INITIAL_GAME_STATE, isPlaying: true, bloodSugar: 100, score: 0 });
    setItems([]);
    setBasketX(50);
    setActiveFact(null);
    setGameOverReason("");
    lastTimeRef.current = performance.now();
  };

  const getBSColor = (bs: number) => {
      if (bs > 180) return 'text-red-500';
      if (bs < 70) return 'text-yellow-500';
      return 'text-green-500';
  };

  return (
    <div className="flex flex-col h-full items-center justify-center p-2 relative overflow-hidden">
      
      {/* Game HUD */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-3 mb-4 flex justify-between items-center border-b-4 border-blue-200 z-10">
        <div className="flex items-center gap-2 pl-2">
             <div className="bg-yellow-100 p-2 rounded-xl">
                 <Trophy className="w-5 h-5 text-yellow-600" />
             </div>
             <div>
                 <span className="text-[10px] text-gray-400 font-bold block">PUAN</span>
                 <span className="text-xl font-black text-gray-800 leading-none">{state.score}</span>
             </div>
        </div>
        
        <div className="flex-1 px-4 mx-2 border-l border-r border-gray-100 flex flex-col items-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">Kan Şekeri</span>
            {/* Visual Bar for Blood Sugar */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden relative">
                <div 
                    className={`h-full transition-all duration-500 ${state.bloodSugar > 180 ? 'bg-red-500' : state.bloodSugar < 70 ? 'bg-yellow-400' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(100, (state.bloodSugar / 240) * 100)}%` }}
                />
                {/* Ideal Range Marker */}
                <div className="absolute top-0 bottom-0 left-[30%] w-1 bg-white/50 z-10"></div>
                <div className="absolute top-0 bottom-0 left-[70%] w-1 bg-white/50 z-10"></div>
            </div>
            <div className="flex items-center gap-1 mt-1">
                <span className={`text-sm font-black ${getBSColor(state.bloodSugar)}`}>
                    {Math.round(state.bloodSugar)}
                </span>
                <span className="text-[10px] text-gray-400">mg/dL</span>
            </div>
        </div>
      </div>

      {/* Game Canvas */}
      <div 
        ref={gameAreaRef}
        className="relative w-full max-w-md h-[65vh] bg-gradient-to-b from-sky-100 to-white rounded-3xl overflow-hidden border-4 border-white shadow-xl cursor-pointer select-none"
        onTouchMove={handleTouchMove}
        onMouseMove={handleMouseMove}
      >
        {!state.isPlaying && !state.gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 z-30 backdrop-blur-sm">
                <div className="bg-white p-8 rounded-[2rem] shadow-2xl text-center max-w-xs animate-float-fast border-4 border-green-100">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                         <span className="text-4xl">🍎</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 mb-2">Sağlık Avcısı</h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Sağlıklı yiyecekleri (🥦) topla, şekeri (🍩) dengede tut! Şeker artarsa İnsülin (💉) kullan.
                    </p>
                    <button 
                        onClick={startGame}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-green-200"
                    >
                        <Play className="w-6 h-6 fill-current" />
                        BAŞLA
                    </button>
                </div>
            </div>
        )}

        {state.gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50/90 z-30 backdrop-blur-sm p-4">
                <div className="bg-white p-6 rounded-[2rem] shadow-2xl text-center w-full max-w-xs animate-bounce-slight border-4 border-red-100">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                         <Info className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-black text-red-500 mb-1">Oyun Bitti!</h2>
                    <p className="text-gray-800 font-bold mb-2">{state.message}</p>
                    
                    {gameOverReason && (
                        <div className="bg-orange-50 p-3 rounded-xl mb-4 border border-orange-100">
                            <p className="text-xs text-orange-700 italic">
                                "{gameOverReason}"
                            </p>
                        </div>
                    )}
                    
                    <div className="bg-blue-50 p-3 rounded-xl mb-4">
                        <p className="text-xs text-blue-400 font-bold uppercase">SKORUN</p>
                        <p className="text-4xl font-black text-blue-600">{state.score}</p>
                    </div>

                    <button 
                        onClick={startGame}
                        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-200"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Tekrar Dene
                    </button>
                </div>
            </div>
        )}

        {/* Player Basket */}
        <div 
            className="absolute bottom-[5%] transition-transform duration-75 z-10"
            style={{ 
                left: `${basketX}%`, 
                transform: 'translateX(-50%)',
                width: `${BASKET_WIDTH_PERCENT}%` 
            }}
        >
            <div className="relative">
                 {/* Character Avatar as Basket */}
                 <div className="absolute bottom-0 w-full flex justify-center transform scale-150 -translate-y-2">
                    <span className="text-5xl drop-shadow-lg filter">🦸</span>
                 </div>
            </div>
        </div>

        {/* Falling Items */}
        {items.map(item => (
            <div
                key={item.id}
                className="absolute text-4xl transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow drop-shadow-md"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
                {item.emoji}
            </div>
        ))}
        
        {/* Educational Pop-up (Fact Bubble) - Mobile Optimized */}
        {activeFact && (
            <div className="absolute top-28 left-[5%] right-[5%] w-[90%] bg-white/95 px-5 py-4 rounded-2xl shadow-xl z-50 animate-bounce-slight border-2 border-blue-400 pointer-events-none flex flex-col items-center justify-center text-center">
                <div className="bg-blue-100 p-2 rounded-full mb-1">
                   <Info className="w-5 h-5 text-blue-500 fill-blue-100" />
                </div>
                <span className="text-sm md:text-base font-black text-gray-800 leading-snug drop-shadow-sm break-words w-full">
                    {activeFact.text}
                </span>
            </div>
        )}
        
      </div>
    </div>
  );
};
