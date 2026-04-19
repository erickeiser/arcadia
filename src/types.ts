
export type ArcanaType = 'Major' | 'Minor';
export type Suit = 'Cups' | 'Pentacles' | 'Swords' | 'Wands' | 'None';

export interface TarotCard {
  id: string;
  name: string;
  arcana: ArcanaType;
  suit: Suit;
  number: number;
  keywords: string[];
  description: string;
  upright: string;
  reversed: string;
  image: string;
}

export interface CardInReading {
  cardId: string;
  isReversed: boolean;
  position: string;
  positionMeaning: string;
}

export type SpreadId = 'daily' | 'three-card' | 'love' | 'career' | 'decision' | 'celtic-cross' | 'shadow-work';

export interface Spread {
  id: SpreadId;
  name: string;
  description: string;
  cardCount: number;
  positions: string[];
  positionMeanings: string[];
  isPremium: boolean;
}

export interface Reading {
  id: string;
  userId?: string;
  question: string;
  spreadId: SpreadId;
  cards: CardInReading[];
  summary: string;
  aiGuidance: string;
  createdAt: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isPremium: boolean;
  streak: number;
  lastReadingAt?: number;
}
