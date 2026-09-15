export interface Word {
  id: string;
  word: string;
  start: number; // seconds
  end: number;   // seconds
  highlightColor?: string;
  isCustomEmphasis?: boolean;
}

export type Category = 
  | 'Popular' 
  | 'Real Estate'
  | 'Behind the Person' 
  | 'Playful'
  | 'Multiline' 
  | 'Dynamic' 
  | 'Editorial'
  | 'Social'
  | 'Neon & FX' 
  | 'Retro' 
  | 'Creators' 
  | 'Desi'
  | 'Speakers'
  | 'AI Edits';

export interface CaptionStyle {
  id: string;
  name: string;
  category: Category;
  fontFamily: string;
  primaryColor: string;
  highlightColor: string;
  backgroundColor?: string;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  strokeColor?: string;
  strokeWidth?: number;
  shadow?: string;
  animationStyle: 'karaoke' | 'bounce' | 'glow' | 'box' | 'typewriter' | 'behind-depth' | 'multiline';
  fontSize: number; // relative size factor
  positionY: number; // % from top (e.g. 70 = lower third)
  posterUrl?: string;
  badgeText?: string;
  description: string;
}

export interface AIHook {
  id: string;
  text: string;
  score: number; // 0 - 100 virality score
  category: string;
}

export interface ThumbnailConcept {
  id: string;
  title: string;
  subtitle: string;
  style: string;
  bgGradient: string;
}
