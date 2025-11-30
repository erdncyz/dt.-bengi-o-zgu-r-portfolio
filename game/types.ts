export enum AppScreen {
  HOME = 'HOME',
  GAME = 'GAME',
  LEARN = 'LEARN',
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

export interface FoodItem {
  id: number;
  emoji: string;
  type: 'healthy' | 'sugary' | 'insulin';
  x: number;
  y: number;
  speed: number;
}

export interface GameState {
  score: number;
  bloodSugar: number; // 70-180 is ideal. >180 high. <70 low.
  isPlaying: boolean;
  gameOver: boolean;
  message: string;
}

export const INITIAL_GAME_STATE: GameState = {
  score: 0,
  bloodSugar: 100, // Ideal start
  isPlaying: false,
  gameOver: false,
  message: "Hazır mısın? Sağlıklı yiyecekleri topla!",
};