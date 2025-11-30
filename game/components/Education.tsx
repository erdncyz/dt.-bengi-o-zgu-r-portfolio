import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Lightbulb, Activity, Utensils, Syringe, Brain, CheckCircle, XCircle, Trophy, Star, Book, ChevronDown, ChevronUp } from 'lucide-react';

// --- DATA ---
const cards = [
    {
        title: "Tip 1 Diyabet Nedir?",
        icon: <Lightbulb className="w-10 h-10 text-yellow-500" />,
        content: "Vücudumuz bir araba gibidir 🚗. Gitmek için benzine (şekere) ihtiyacı vardır. Ancak şekerin hücrelere girmesi için bir anahtara ihtiyaç duyarız. Bu anahtarın adı 'İnsülin'. Tip 1 diyabette bu anahtar kayıptır, bu yüzden onu dışarıdan alırız!",
        color: "bg-yellow-50 border-yellow-300"
    },
    {
        title: "Kan Şekeri Ölçümü",
        icon: <Activity className="w-10 h-10 text-red-500" />,
        content: "Kan şekerini ölçmek, arabanın hız göstergesine bakmak gibidir 🏎️. Hızlı mı gidiyoruz yoksa yavaş mı? Bunu bilmek bizi güvende tutar. Günde birkaç kez küçük bir parmak dokunuşuyla bunu kontrol ederiz.",
        color: "bg-red-50 border-red-300"
    },
    {
        title: "Karbonhidrat Sayımı",
        icon: <Utensils className="w-10 h-10 text-orange-500" />,
        content: "Ekmek, makarna, meyve... Bunların hepsi vücudumuzda şekere dönüşür 🍞🍎. Tabağımızdaki karbonhidratları saymak, ne kadar insülin yapmamız gerektiğini hesaplamamızı sağlar. Bu bir matematik oyunudur!",
        color: "bg-orange-50 border-orange-300"
    },
    {
        title: "Hipoglisemi (Düşük Şeker)",
        icon: <Activity className="w-10 h-10 text-purple-500" />,
        content: "Bazen şekerimiz düşebilir (Titreme, terleme hissedebilirsin 🥶). Bu durumda 'Hızlı Şeker' (meyve suyu veya şeker) almalıyız. Bu, arabaya acil yakıt koymak gibidir!",
        color: "bg-purple-50 border-purple-300"
    }
];

const glossaryTerms = [
    {
        term: "HbA1c",
        emoji: "📊",
        desc: "3 aylık karne notu gibidir. Şekerinin son 3 ayda ortalama ne kadar iyi gittiğini gösterir."
    },
    {
        term: "Pankreas",
        emoji: "🏭",
        desc: "Midenin arkasında saklanan bir organ. Normalde insülin burada üretilir ama bizde tatile çıkmıştır."
    },
    {
        term: "İnsülin",
        emoji: "🔑",
        desc: "Şekerin (enerjinin) hücre kapısından içeri girmesini sağlayan sihirli anahtar."
    },
    {
        term: "Bolus",
        emoji: "🍽️",
        desc: "Yemek yerken yaptığımız insülin. Tıpkı yemeğin sosu gibi, yemeğe eşlik eder!"
    },
    {
        term: "Bazal",
        emoji: "🌊",
        desc: "Arka planda sürekli akan minik insülin. Vücudun uyurken bile buna ihtiyacı vardır."
    },
    {
        term: "Keton",
        emoji: "⚠️",
        desc: "Vücut şeker bulamayınca yağları yakar ve ortaya çıkan 'çöp' madde. Su içerek onu atmalıyız!"
    },
    {
        term: "Glukometre",
        emoji: "📟",
        desc: "Şeker ölçüm cihazı. Bize o anki şeker durumumuzu söyleyen akıllı arkadaş."
    }
];

const quizQuestions = [
    {
        question: "Kendini titrek ve terli hissediyorsun. Şekerin düşmüş olabilir. Ne yapmalısın?",
        options: [
            "Hemen uyumalıyım",
            "Meyve suyu içmeli veya şekerli bir şey yemeliyim",
            "Su içip beklemeliyim",
            "Koşuya çıkmalıyım"
        ],
        correct: 1,
        explanation: "Doğru! Şeker düştüğünde (Hipoglisemi), vücudun hızlıca şekere ihtiyaç duyar. Meyve suyu süper bir çözümdür! 🧃"
    },
    {
        question: "İnsülin vücudumuzda ne işe yarar?",
        options: [
            "Bizi daha hızlı koşturur",
            "Karnımızı doyurur",
            "Şekerin hücrelere girmesini sağlayan bir anahtardır",
            "Hiçbir işe yaramaz"
        ],
        correct: 2,
        explanation: "Harika! İnsülin bir anahtar gibidir 🗝️. O olmadan şeker hücreye giremez ve enerji veremez."
    },
    {
        question: "Hangi yiyecek kan şekerini daha hızlı yükseltir?",
        options: [
            "Salatalık 🥒",
            "Tavuk 🍗",
            "Meyve Suyu 🧃",
            "Peynir 🧀"
        ],
        correct: 2,
        explanation: "Aynen öyle! Meyve suları ve şekerli içecekler kana çok hızlı karışır. Bu yüzden şekerimiz düştüğünde bunları içeriz."
    },
    {
        question: "Spor yaparken neye dikkat etmeliyiz?",
        options: [
            "Şekerimizi kontrol etmeliyiz ve yanımıza atıştırmalık almalıyız",
            "Spor yapmamalıyız",
            "Sadece uyumalıyız",
            "Hiç su içmemeliyiz"
        ],
        correct: 0,
        explanation: "Süpersin! Diyabetli çocuklar harika sporcular olabilir. Sadece şekerini kontrol et ve enerjini (atıştırmalığını) yanında tut! ⚽"
    }
];

export const Education: React.FC = () => {
    const [mode, setMode] = useState<'cards' | 'quiz' | 'glossary'>('cards');
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Quiz State
    const [quizIndex, setQuizIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Glossary State
    const [openTermIndex, setOpenTermIndex] = useState<number | null>(null);

    // Card Navigation
    const nextCard = () => setCurrentIndex((prev) => (prev + 1) % cards.length);
    const prevCard = () => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);

    // Quiz Logic
    const handleAnswer = (optionIndex: number) => {
        if (showExplanation) return;
        
        setSelectedOption(optionIndex);
        setShowExplanation(true);
        
        if (optionIndex === quizQuestions[quizIndex].correct) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (quizIndex < quizQuestions.length - 1) {
            setQuizIndex(prev => prev + 1);
            setShowExplanation(false);
            setSelectedOption(null);
        } else {
            setQuizCompleted(true);
        }
    };

    const restartQuiz = () => {
        setQuizIndex(0);
        setScore(0);
        setShowExplanation(false);
        setSelectedOption(null);
        setQuizCompleted(false);
    };

    return (
        <div className="flex flex-col h-full p-4 md:p-6">
            {/* Header / Tabs */}
            <div className="flex justify-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                <button 
                    onClick={() => setMode('cards')}
                    className={`px-4 py-2 rounded-full font-bold transition-all whitespace-nowrap ${mode === 'cards' ? 'bg-blue-500 text-white shadow-lg scale-105' : 'bg-white text-gray-500 border border-gray-200'}`}
                >
                    Kartlar
                </button>
                <button 
                    onClick={() => setMode('glossary')}
                    className={`px-4 py-2 rounded-full font-bold transition-all whitespace-nowrap flex items-center gap-1 ${mode === 'glossary' ? 'bg-purple-500 text-white shadow-lg scale-105' : 'bg-white text-gray-500 border border-gray-200'}`}
                >
                   <Book className="w-4 h-4" /> Sözlük
                </button>
                <button 
                    onClick={() => setMode('quiz')}
                    className={`px-4 py-2 rounded-full font-bold transition-all whitespace-nowrap ${mode === 'quiz' ? 'bg-accent text-white shadow-lg scale-105' : 'bg-white text-gray-500 border border-gray-200'}`}
                >
                    Yarışma
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-start overflow-y-auto pb-20">
                
                {/* --- CARDS MODE --- */}
                {mode === 'cards' && (
                    <div className="w-full max-w-md flex flex-col items-center animate-fade-in mt-4">
                        <div className={`w-full ${cards[currentIndex].color} border-4 rounded-[2rem] p-8 shadow-xl relative min-h-[350px] flex flex-col transition-all duration-500`}>
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-md border-4 border-white">
                                {cards[currentIndex].icon}
                            </div>
                            
                            <div className="mt-8 flex-1 flex flex-col items-center text-center">
                                <h3 className="text-2xl font-black text-gray-800 mb-4 font-sans">{cards[currentIndex].title}</h3>
                                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                                    {cards[currentIndex].content}
                                </p>
                            </div>

                            <div className="flex justify-center gap-2 mt-6">
                                {cards.map((_, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-gray-800 w-6' : 'bg-gray-400'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-6 mt-8 w-full justify-center">
                            <button onClick={prevCard} className="bg-white hover:bg-gray-50 text-gray-700 p-4 rounded-full shadow-lg border-2 border-gray-100 transition-transform active:scale-90">
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <button onClick={nextCard} className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-200 transition-transform active:scale-90">
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                )}

                {/* --- GLOSSARY MODE --- */}
                {mode === 'glossary' && (
                    <div className="w-full max-w-md animate-fade-in space-y-3">
                        <div className="bg-purple-100 p-4 rounded-xl mb-4 border border-purple-200">
                             <p className="text-purple-800 text-sm font-medium text-center">
                                 Doktorların kullandığı kelimelerin süper kahraman dilindeki anlamları! 🦸‍♂️
                             </p>
                        </div>
                        {glossaryTerms.map((item, idx) => (
                            <div 
                                key={idx} 
                                className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 overflow-hidden ${openTermIndex === idx ? 'border-purple-400 shadow-md' : 'border-gray-100'}`}
                            >
                                <button 
                                    onClick={() => setOpenTermIndex(openTermIndex === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-4 bg-white"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl bg-gray-50 p-2 rounded-lg">{item.emoji}</span>
                                        <span className="font-bold text-gray-800 text-lg">{item.term}</span>
                                    </div>
                                    {openTermIndex === idx ? <ChevronUp className="text-purple-500" /> : <ChevronDown className="text-gray-400" />}
                                </button>
                                
                                <div className={`px-4 bg-purple-50 overflow-hidden transition-all duration-300 ${openTermIndex === idx ? 'max-h-32 py-4' : 'max-h-0'}`}>
                                    <p className="text-gray-700 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* --- QUIZ MODE --- */}
                {mode === 'quiz' && !quizCompleted && (
                    <div className="w-full max-w-md animate-fade-in">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <span className="font-bold text-gray-500 text-sm">SORU {quizIndex + 1} / {quizQuestions.length}</span>
                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                <Star className="w-4 h-4 fill-current" /> {score} Puan
                            </span>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-xl border-b-8 border-blue-100 relative overflow-hidden">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 leading-tight">
                                {quizQuestions[quizIndex].question}
                            </h3>

                            <div className="space-y-3">
                                {quizQuestions[quizIndex].options.map((option, idx) => {
                                    let btnClass = "w-full p-4 rounded-xl text-left font-semibold transition-all border-2 ";
                                    if (showExplanation) {
                                        if (idx === quizQuestions[quizIndex].correct) btnClass += "bg-green-100 border-green-500 text-green-800";
                                        else if (idx === selectedOption) btnClass += "bg-red-100 border-red-500 text-red-800 opacity-70";
                                        else btnClass += "bg-gray-50 border-transparent text-gray-400";
                                    } else {
                                        btnClass += "bg-gray-50 border-transparent hover:bg-blue-50 hover:border-blue-200 text-gray-700 active:scale-[0.98]";
                                    }

                                    return (
                                        <button 
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            disabled={showExplanation}
                                            className={btnClass}
                                        >
                                            <div className="flex justify-between items-center">
                                                {option}
                                                {showExplanation && idx === quizQuestions[quizIndex].correct && <CheckCircle className="w-5 h-5 text-green-600" />}
                                                {showExplanation && idx === selectedOption && idx !== quizQuestions[quizIndex].correct && <XCircle className="w-5 h-5 text-red-600" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {showExplanation && (
                                <div className="mt-6 pt-4 border-t border-gray-100 animate-slide-up">
                                    <p className="text-sm text-gray-600 italic mb-4">
                                        💡 {quizQuestions[quizIndex].explanation}
                                    </p>
                                    <button 
                                        onClick={nextQuestion}
                                        className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-600 transition-colors"
                                    >
                                        {quizIndex < quizQuestions.length - 1 ? 'Sonraki Soru' : 'Sonucu Gör'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* --- QUIZ COMPLETED --- */}
                {mode === 'quiz' && quizCompleted && (
                    <div className="text-center animate-bounce-slight max-w-sm w-full bg-white p-8 rounded-[2rem] shadow-2xl">
                        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4 drop-shadow-lg" />
                        <h2 className="text-3xl font-black text-gray-800 mb-2">Tebrikler!</h2>
                        <p className="text-gray-500 mb-6">Bilgi Yarışmasını Tamamladın</p>
                        
                        <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                            <span className="block text-sm text-gray-500 font-bold mb-1">TOPLAM PUAN</span>
                            <span className="text-5xl font-black text-blue-600">{score} / {quizQuestions.length}</span>
                        </div>

                        <p className="text-gray-600 mb-8 font-medium">
                            {score === quizQuestions.length 
                                ? "Mükemmel! Sen gerçek bir Diyabet Uzmanısın! 🎓" 
                                : "Harika çaba! Bir dahaki sefere hepsini doğru yapacağına eminim! 💪"}
                        </p>

                        <button 
                            onClick={restartQuiz}
                            className="w-full bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 hover:bg-green-600 transition-transform active:scale-95"
                        >
                            Tekrar Oyna
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};