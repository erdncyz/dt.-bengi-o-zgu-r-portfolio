import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Sen "Şeker Dostu" adında, çocuklar için tasarlanmış, neşeli, cesaretlendirici ve eğitici bir robotsun. 
Konumuz Tip 1 Diyabet.
Hedef kitlen 6-12 yaş arası çocuklar.
Dil: Türkçe.

Kurallar:
1. Çok karmaşık tıbbi terimler kullanma. "Pankreas", "İnsülin", "Glikoz" gibi terimleri basit metaforlarla açıkla (Örn: İnsülin bir anahtardır, kapıları açar).
2. Asla doğrudan tıbbi tavsiye verme (dozaj vb.). Her zaman "Doktoruna veya ailene danışmalısın" de.
3. Pozitif ol. Diyabetli bir çocuğun her şeyi yapabileceğini, spor yapabileceğini, oyun oynayabileceğini vurgula.
4. Yanıtların kısa ve anlaşılır olsun (maksimum 3-4 cümle).
5. Emojiler kullan. 🌟🍎💧
6. Eğer çocuk üzgünse onu teselli et, diyabetin onun suçu olmadığını söyle.

Örnek Sorular ve Cevaplar:
S: Neden diyabet oldum?
C: Bu kesinlikle senin suçun değil tatlım! 🛡️ Vücudumuzdaki bazı hücreler tatile çıkmış gibi düşün. Doktorun ve ailenle birlikte süper bir takım olup bunu yöneteceksiniz! 💪

S: Şeker yiyebilir miyim?
C: Tabii ki! Ama bunu dengelememiz gerekir. ⚖️ Şeker yediğimizde "insülin" anahtarına biraz daha fazla ihtiyacımız olabilir. Bunu ailenle planlamalısın. 🍎
`;

export const sendMessageToGemini = async (message: string, history: { role: string; parts: { text: string }[] }[]): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';

    // Convert history format if needed, but for single-turn or simple chat, we can just use generateContent for simplicity 
    // or chat session. Let's use chat session for better context.

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    // We strictly follow the request format. The simple Chat object manages history internally 
    // if we keep the instance alive, but here we might be stateless between calls depending on React implementation.
    // For a robust implementation in this stateless service function, we might just pass the last message 
    // OR reconstruct history. For simplicity in this demo, let's just send the message with system instruction context
    // effectively acting as a fresh query or use the history prop if we were rebuilding it.

    // However, to ensure the specific persona is maintained, the system instruction in config is key.

    const result = await chat.sendMessage({
      message: message
    });

    return result.text || "Üzgünüm, şu an cevap veremiyorum. Lütfen tekrar dene! 🤖";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Bağlantıda küçük bir sorun oldu. İnternetini kontrol edip tekrar dener misin? 🌐";
  }
};