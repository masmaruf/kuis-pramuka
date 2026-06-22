/**
 * Type definitions untuk Quiz Engine
 * Kuis Pramuka - TypeScript Definitions
 */

// ============================================
// QUESTION TYPES
// ============================================

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  image?: string;
  audio?: string;
  video?: string;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // seconds for time-based questions
}

export interface QuestionPool {
  [key: string]: Question[];
}

// ============================================
// QUIZ MODULE TYPES
// ============================================

export type QuizDifficulty = 'easy' | 'medium' | 'hard' | 'mix';
export type QuizColor = 'green' | 'red' | 'yellow' | 'blue' | 'purple' | 'orange' | 'pink';

export interface QuizHelpContent {
  title: string;
  content: string;
}

export interface QuizMetadata {
  id: string;
  title: string;
  description: string;
  category: string;
  group?: string;
  difficulty: QuizDifficulty;
  xpPerQuestion: number;
  totalQuestions: number;
  color: QuizColor;
  icon: string;
  helpContent?: QuizHelpContent;
  hasLevels?: boolean;
  badgeId?: string;
}

export interface QuizLevel {
  id: string;
  title: string;
  file: string;
  difficulty: QuizDifficulty;
  color: QuizColor;
  icon: string;
  ageRange?: string;
}

export interface QuizModule extends QuizMetadata {
  levels?: QuizLevel[];
  questions: Question[];
}

// For multi-level quizzes (like SKU with siaga/penggalang/penegak)
export interface MultiLevelQuiz extends QuizMetadata {
  hasLevels: true;
  levels: QuizLevel[];
  badges?: Record<string, Badge>;
}

// ============================================
// GAME STATE TYPES
// ============================================

export interface QuizState {
  currentQuestionIndex: number;
  selectedOptionIndex: number | null;
  correctAnswersCount: number;
  totalQuestions: number;
  questions: Question[];
  isAnswered: boolean;
  isCorrect: boolean | null;
  score: number;
  xpEarned: number;
  timeLeft?: number; // For timed modes
  lives?: number; // For no-mistake mode
}

export interface QuizConfig {
  totalQuestions: number;
  timeLimit?: number; // seconds
  lives?: number;
  xpMultiplier: number;
  mode: GameModeType;
}

// ============================================
// GAME MODE TYPES
// ============================================

export type GameModeType = 'standard' | 'time_attack' | 'no_mistake' | 'daily' | 'duel' | 'survival';

export interface GameMode {
  id: GameModeType;
  name: string;
  description: string;
  xpMultiplier: number;
  timeLimit?: number;
  lives?: number;
  targetScore?: number;
  dailyDate?: string; // YYYY-MM-DD for daily mode
}

// ============================================
// BADGE & ACHIEVEMENT TYPES
// ============================================

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpRequired?: number;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserBadge {
  badgeId: string;
  unlockedAt: string; // ISO date
  progress?: number; // For multi-stage badges
}

// ============================================
// USER DATA TYPES
// ============================================

export interface UserStats {
  xp: number;
  level: number;
  badges: string[]; // badge IDs
  streak: number;
  lastVisit: string; // ISO date
  highScores: Record<string, number>; // quizId -> score
  unlockedModules: string[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  sound: boolean;
  animations: boolean;
}

// ============================================
// QUIZ CATEGORY TYPES
// ============================================

export type QuizCategory = 
  | 'Komunikasi & Isyarat'
  | 'Teknik Kepramukaan'
  | 'Pengetahuan Umum'
  | 'Keterampilan'
  | 'Survival'
  | 'Organisasi';

export interface QuizCategoryConfig {
  id: QuizCategory;
  name: string;
  description: string;
  color: string;
  icon: string;
  modules: string[];
}

// ============================================
// EVENT TYPES
// ============================================

export interface QuizEvent {
  type: 'question_answered' | 'quiz_completed' | 'badge_unlocked' | 'xp_earned';
  data: any;
  timestamp: number;
}

export interface QuizEventListener {
  (event: QuizEvent): void;
}

// ============================================
// COMPONENT PROPS TYPES
// ============================================

export interface QuizEngineProps {
  quizId: string;
  level?: string;
  totalQuestions?: number;
  mode?: GameModeType;
  showHelp?: boolean;
  onComplete?: (results: QuizResults) => void;
  onBadgeUnlocked?: (badge: Badge) => void;
}

export interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: number | null;
  isAnswered: boolean;
  isCorrect: boolean | null;
  onSelect: (index: number) => void;
  onSubmit: () => void;
  showExplanation?: boolean;
}

export interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
}

export interface ResultOverlayProps {
  score: number;
  totalQuestions: number;
  xpEarned: number;
  badgesUnlocked: Badge[];
  onRestart: () => void;
  onBack: () => void;
  message: string;
  emoji: string;
}

export interface QuizResults {
  quizId: string;
  level?: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  xpEarned: number;
  badgesUnlocked: Badge[];
  timeTaken?: number; // milliseconds
  completedAt: string; // ISO date
}

// ============================================
// LEADERBOARD TYPES
// ============================================

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  score: number;
  quizId: string;
  level?: string;
  mode?: GameModeType;
  timestamp: string; // ISO date
  avatar?: string;
}

export interface LeaderboardData {
  entries: LeaderboardEntry[];
  lastUpdated: string;
  period: 'daily' | 'weekly' | 'monthly' | 'all_time';
}

// ============================================
// UTILITY TYPES
// ============================================

export type DifficultyColors = Record<QuizDifficulty, string>;
export type DifficultyLabels = Record<QuizDifficulty, string>;

export interface QuizFilters {
  difficulty?: QuizDifficulty[];
  category?: QuizCategory[];
  tags?: string[];
  search?: string;
}

export interface ShuffledResult<T> {
  original: T[];
  shuffled: T[];
  seed: string;
}
