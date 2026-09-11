export type LevelNumber = 1 | 2 | 3 | 4 | 5;

export type ScreenStep = 'setup' | 'p1_turn' | 'handover' | 'p2_turn' | 'results';

export interface Question {
  id: number;
  level: number;
  question: string;
  options: string[];
}

export interface LevelInfo {
  level: LevelNumber;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tag: string;
  accentColor: string;
}

export interface ComparisonResult {
  questionId: number;
  question: string;
  p1Answer: string;
  p2Answer: string;
  isMatch: boolean;
  options: string[];
}

export interface ScoreSummary {
  matchedCount: number;
  totalCount: number;
  percentage: number;
  message: string;
  tier: '0-20' | '30-40' | '50-60' | '70-80' | '90-100';
}

export interface GameContextType {
  player1Name: string;
  player2Name: string;
  setPlayer1Name: (name: string) => void;
  setPlayer2Name: (name: string) => void;
  selectedLevel: LevelNumber;
  setSelectedLevel: (level: LevelNumber) => void;
  screen: ScreenStep;
  currentQuestionIndex: number;
  levelQuestions: Question[];
  p1Answers: Record<number, string>;
  p2Answers: Record<number, string>;
  activePlayerAnswers: Record<number, string>;
  answeredCount: number;
  isCurrentTurnComplete: boolean;
  startGame: () => void;
  selectAnswer: (option: string) => void;
  goToQuestion: (index: number) => void;
  goToPrevQuestion: () => void;
  goToNextQuestion: () => void;
  finishCurrentTurn: () => boolean;
  startP2Turn: () => void;
  restartCurrentLevel: () => void;
  playNextLevel: () => void;
  returnToSetup: () => void;
  scoreSummary: ScoreSummary;
  comparisons: ComparisonResult[];
  activePlayerName: string;
}
