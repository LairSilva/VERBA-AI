export type SupportedLanguage = 'en-US' | 'pt-BR' | 'es-ES' | 'de-DE' | 'it-IT' | 'ru-RU';

export interface ScriptLine {
  id: string;
  original: string; // The text in the target language
  translation: string; // The text in Portuguese (or interface language)
  context: string; // Context for the user (e.g., "Greeting the barista")
  phoneticTips?: string; // Optional phonetic help
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  systemInstruction: string;
  color: string;
  script?: ScriptLine[]; // Made optional for dynamic roleplays
  hints?: string[]; // Quick conversational hints
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface AudioVisualizerProps {
  isActive: boolean;
  mode: 'listening' | 'speaking' | 'idle';
}

export enum AppView {
  HOME = 'HOME',
  LIVE_SESSION = 'LIVE_SESSION',
  CHAT_SESSION = 'CHAT_SESSION',
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  points: number;
  completedScenarios: string[]; // List of Scenario IDs that are finished
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
  reward: number;
  type: 'chat' | 'live' | 'perfect_grammar';
}

export interface Translation {
  welcome: string;
  hero_title_1: string;
  hero_title_2: string;
  hero_desc: string;
  start_btn: string;
  level: string;
  streak: string;
  xp: string;
  streak_msg: string;
  xp_msg: string;
  daily_quests: string;
  practice_scenarios: string;
  choose_scenario: string;
  all: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  live_btn: string;
  chat_btn: string;
  footer: string;
  api_missing: string;
  api_missing_desc: string;
  toast_level: string;
  toast_quest: string;
  input_placeholder: string;
  ai_disclaimer: string;
  suggested_responses: string;
  feedback_title: string;
  listening: string;
  speaking: string;
  ready: string;
  connecting: string;
  error_conn: string;
  retry: string;
  interface_lang: string;
  learning_lang: string;
  next_phrase: string;
  prev_phrase: string;
  script_mode: string;
  hint_button: string;
  locked: string;
  complete_prev: string;
  finish_lesson: string;
  lesson_complete: string;
  continue: string;
}