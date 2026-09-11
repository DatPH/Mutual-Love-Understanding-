import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { ComparisonResult, GameContextType, LevelNumber, Question, ScoreSummary, ScreenStep } from '../types/game';
import rawQuestions from '../data/questions.json';
import { calculateScore, compareAnswers } from '../utils/scoreUtils';

const allQuestions = rawQuestions as Question[];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [player1Name, setPlayer1Name] = useState<string>('Anh');
  const [player2Name, setPlayer2Name] = useState<string>('Em');
  const [selectedLevel, setSelectedLevel] = useState<LevelNumber>(1);
  const [screen, setScreen] = useState<ScreenStep>('setup');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const [p1Answers, setP1Answers] = useState<Record<number, string>>({});
  const [p2Answers, setP2Answers] = useState<Record<number, string>>({});

  // Filter questions for the selected level (10 questions per level)
  const levelQuestions = useMemo(() => {
    return allQuestions.filter((q) => q.level === selectedLevel);
  }, [selectedLevel]);

  // Start game from setup
  const startGame = useCallback(() => {
    setP1Answers({});
    setP2Answers({});
    setCurrentQuestionIndex(0);
    setScreen('p1_turn');
  }, []);

  // Active player answers for current turn
  const activePlayerAnswers = useMemo(() => {
    if (screen === 'p1_turn') return p1Answers;
    if (screen === 'p2_turn') return p2Answers;
    return {};
  }, [screen, p1Answers, p2Answers]);

  // Number of questions answered by active player
  const answeredCount = useMemo(() => {
    return levelQuestions.filter((q) => !!activePlayerAnswers[q.id]).length;
  }, [levelQuestions, activePlayerAnswers]);

  // Turn is complete only when all questions in the room have been answered
  const isCurrentTurnComplete = useMemo(() => {
    return levelQuestions.length > 0 && answeredCount === levelQuestions.length;
  }, [levelQuestions.length, answeredCount]);

  // Direct navigation between questions
  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < levelQuestions.length) {
        setCurrentQuestionIndex(index);
      }
    },
    [levelQuestions.length]
  );

  const goToPrevQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.min(levelQuestions.length - 1, prev + 1));
  }, [levelQuestions.length]);

  // Answer or re-answer current question
  const selectAnswer = useCallback(
    (option: string) => {
      const currentQ = levelQuestions[currentQuestionIndex];
      if (!currentQ) return;

      if (screen === 'p1_turn') {
        setP1Answers((prev) => ({ ...prev, [currentQ.id]: option }));
      } else if (screen === 'p2_turn') {
        setP2Answers((prev) => ({ ...prev, [currentQ.id]: option }));
      }

      // Automatically advance to the next question if available to keep gameplay flow smooth
      if (currentQuestionIndex < levelQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    },
    [currentQuestionIndex, levelQuestions, screen]
  );

  // Submit and finish current player's turn only after all 10 questions have been answered
  const finishCurrentTurn = useCallback(() => {
    const targetAnswers = screen === 'p1_turn' ? p1Answers : p2Answers;
    const unansweredIndex = levelQuestions.findIndex((q) => !targetAnswers[q.id]);

    if (unansweredIndex !== -1) {
      // If any question is unanswered, automatically focus on the first missing question
      setCurrentQuestionIndex(unansweredIndex);
      return false;
    }

    if (screen === 'p1_turn') {
      setCurrentQuestionIndex(0);
      setScreen('handover');
      return true;
    } else if (screen === 'p2_turn') {
      setScreen('results');
      return true;
    }

    return false;
  }, [levelQuestions, p1Answers, p2Answers, screen]);

  // Transition from Handover screen to P2 turn
  const startP2Turn = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScreen('p2_turn');
  }, []);

  // Replay the current level
  const restartCurrentLevel = useCallback(() => {
    setP1Answers({});
    setP2Answers({});
    setCurrentQuestionIndex(0);
    setScreen('p1_turn');
  }, []);

  // Move forward to the next level
  const playNextLevel = useCallback(() => {
    if (selectedLevel < 5) {
      setSelectedLevel((prev) => (prev + 1) as LevelNumber);
      setP1Answers({});
      setP2Answers({});
      setCurrentQuestionIndex(0);
      setScreen('p1_turn');
    }
  }, [selectedLevel]);

  // Return to setup screen
  const returnToSetup = useCallback(() => {
    setP1Answers({});
    setP2Answers({});
    setCurrentQuestionIndex(0);
    setScreen('setup');
  }, []);

  // Calculate detailed comparison list
  const comparisons: ComparisonResult[] = useMemo(() => {
    return compareAnswers(levelQuestions, p1Answers, p2Answers);
  }, [levelQuestions, p1Answers, p2Answers]);

  // Calculate total score summary & dynamic witty message
  const scoreSummary: ScoreSummary = useMemo(() => {
    return calculateScore(comparisons, selectedLevel);
  }, [comparisons, selectedLevel]);

  const activePlayerName = useMemo(() => {
    if (screen === 'p1_turn') return player1Name.trim() || 'Người chơi 1';
    if (screen === 'p2_turn') return player2Name.trim() || 'Người chơi 2';
    return '';
  }, [screen, player1Name, player2Name]);

  const value: GameContextType = {
    player1Name,
    player2Name,
    setPlayer1Name,
    setPlayer2Name,
    selectedLevel,
    setSelectedLevel,
    screen,
    currentQuestionIndex,
    levelQuestions,
    p1Answers,
    p2Answers,
    activePlayerAnswers,
    answeredCount,
    isCurrentTurnComplete,
    startGame,
    selectAnswer,
    goToQuestion,
    goToPrevQuestion,
    goToNextQuestion,
    finishCurrentTurn,
    startP2Turn,
    restartCurrentLevel,
    playNextLevel,
    returnToSetup,
    scoreSummary,
    comparisons,
    activePlayerName,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
