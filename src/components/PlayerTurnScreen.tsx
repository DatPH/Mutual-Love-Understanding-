import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  EyeOff,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ROOMS } from '../data/messages';

export const PlayerTurnScreen: React.FC = () => {
  const {
    screen,
    player1Name,
    player2Name,
    selectedLevel,
    currentQuestionIndex,
    levelQuestions,
    activePlayerAnswers,
    answeredCount,
    isCurrentTurnComplete,
    selectAnswer,
    goToQuestion,
    goToPrevQuestion,
    goToNextQuestion,
    finishCurrentTurn,
  } = useGame();

  const [temporarySelection, setTemporarySelection] = useState<string | null>(null);

  const isP1 = screen === 'p1_turn';
  const activeName = isP1 ? (player1Name.trim() || 'Người chơi 1') : (player2Name.trim() || 'Người chơi 2');
  const otherName = isP1 ? (player2Name.trim() || 'Người chơi 2') : (player1Name.trim() || 'Người chơi 1');

  const currentRoom = ROOMS.find((r) => r.level === selectedLevel) || ROOMS[0];
  const currentQuestion = levelQuestions[currentQuestionIndex];
  const totalQuestions = levelQuestions.length;

  if (!currentQuestion) {
    return null;
  }

  const currentAnswer = temporarySelection || activePlayerAnswers[currentQuestion.id] || null;
  const isCurrentAnswered = !!activePlayerAnswers[currentQuestion.id];

  const handleSelect = (option: string) => {
    setTemporarySelection(option);

    // Brief smooth feedback before auto-advancing
    setTimeout(() => {
      selectAnswer(option);
      setTemporarySelection(null);
    }, 180);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 sm:py-8 space-y-5">
      {/* Top Banner: Active Player Indicator */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-4 shadow-lg shadow-black/40">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shadow-md ${
              isP1
                ? 'bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-rose-900/30'
                : 'bg-gradient-to-tr from-pink-600 to-fuchsia-500 text-white shadow-pink-900/30'
            }`}
          >
            {isP1 ? 'P1' : 'P2'}
          </div>
          <div>
            <div className="text-xs text-neutral-400 font-medium">Lượt trả lời của:</div>
            <div className="text-base font-semibold text-white flex items-center gap-1.5">
              <span>{activeName}</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs bg-neutral-950/70 border border-neutral-800 px-3 py-1.5 rounded-full text-neutral-300">
          <EyeOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            <strong className="text-rose-300">{otherName}</strong> quay mặt đi chỗ khác nhé!
          </span>
        </div>
      </div>

      {/* Room Title & Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs px-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-medium">
            {currentRoom.title}
          </span>
          <span className="text-neutral-400 hidden sm:inline">{currentRoom.subtitle}</span>
        </div>

        <div className="flex items-center gap-2 font-medium">
          <span className="text-neutral-400">Đã trả lời:</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              isCurrentTurnComplete
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-neutral-800 text-rose-300 border border-neutral-700'
            }`}
          >
            {answeredCount}/{totalQuestions} câu
          </span>
        </div>
      </div>

      {/* Interactive 1..10 Question Navigation Bar */}
      <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-2.5 shadow-lg shadow-black/30">
        <div className="flex items-center justify-between gap-1 mb-2 px-1">
          <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
            Danh sách câu hỏi
          </span>
          <span className="text-[11px] text-neutral-500">
            {isCurrentTurnComplete ? '✓ Đã hoàn tất 10 câu' : 'Nhấp vào số câu để xem lại'}
          </span>
        </div>

        <div className="grid grid-cols-10 gap-1 sm:gap-1.5">
          {levelQuestions.map((q, idx) => {
            const isCurrent = currentQuestionIndex === idx;
            const isAnswered = !!activePlayerAnswers[q.id];

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => goToQuestion(idx)}
                className={`relative flex flex-col items-center justify-center py-2 sm:py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-rose-500 text-white ring-2 ring-rose-400 shadow-md shadow-rose-950/60 scale-[1.03]'
                    : isAnswered
                    ? 'bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 hover:bg-emerald-500/25'
                    : 'bg-neutral-950/60 border border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
                title={`Câu ${idx + 1}: ${isAnswered ? 'Đã trả lời' : 'Chưa trả lời'}`}
                aria-label={`Đi tới câu ${idx + 1}`}
              >
                <span>{idx + 1}</span>
                {isAnswered && !isCurrent && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Question & Options Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-black/50"
        >
          {/* Question Text Header */}
          <div className="mb-5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-rose-400/90 font-medium uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Câu hỏi số {currentQuestionIndex + 1} / {totalQuestions}</span>
              </div>

              {isCurrentAnswered ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <Check className="w-3 h-3" /> Đã trả lời
                </span>
              ) : (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400">
                  Chưa trả lời
                </span>
              )}
            </div>

            <h2 className="text-lg sm:text-xl font-serif-display font-medium text-white leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((option, index) => {
              const letter = optionLetters[index] || `${index + 1}`;
              const isSelected = currentAnswer === option;

              return (
                <button
                  key={`${currentQuestion.id}-opt-${index}`}
                  id={`q-${currentQuestion.id}-opt-${index}`}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-200 flex items-start gap-3 border cursor-pointer active:scale-[0.99] group ${
                    isSelected
                      ? 'bg-rose-500/25 border-rose-400 ring-2 ring-rose-400/50 text-white shadow-lg shadow-rose-950/60'
                      : 'bg-neutral-950/60 hover:bg-neutral-800/80 border-neutral-800 hover:border-neutral-700 text-neutral-200'
                  }`}
                >
                  <span
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs transition-colors ${
                      isSelected
                        ? 'bg-rose-500 text-white shadow'
                        : 'bg-neutral-800 text-neutral-400 group-hover:bg-neutral-700 group-hover:text-neutral-200'
                    }`}
                  >
                    {letter}
                  </span>

                  <span className="text-xs sm:text-sm font-normal leading-relaxed pt-0.5 flex-1">
                    {option}
                  </span>

                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0 self-center animate-in zoom-in-50 duration-150" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Prev / Next Question Navigation Buttons */}
          <div className="mt-5 pt-4 border-t border-neutral-800/70 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goToPrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                currentQuestionIndex === 0
                  ? 'text-neutral-600 bg-neutral-950/40 border border-neutral-900 cursor-not-allowed'
                  : 'text-neutral-300 hover:text-white bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 cursor-pointer active:scale-95'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Câu trước</span>
            </button>

            <span className="text-xs text-neutral-500">
              Có thể đổi câu trả lời bất kỳ lúc nào
            </span>

            <button
              type="button"
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                currentQuestionIndex === totalQuestions - 1
                  ? 'text-neutral-600 bg-neutral-950/40 border border-neutral-900 cursor-not-allowed'
                  : 'text-neutral-300 hover:text-white bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 cursor-pointer active:scale-95'
              }`}
            >
              <span>Câu sau</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Turn Submission Section: ONLY enabled when all 10 questions have been answered */}
      <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xl shadow-black/40">
        {isCurrentTurnComplete ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cả 10/10 câu hỏi đã được trả lời xong! Bạn có thể kiểm tra lại hoặc hoàn thành lượt.</span>
            </div>

            <button
              id="submit-turn-btn"
              type="button"
              onClick={finishCurrentTurn}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-950/60 transition-all duration-200 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Hoàn tất & Lưu câu trả lời của {activeName}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-amber-300/90 text-left">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Cần trả lời đủ cả 10 câu để lưu kết quả (Còn thiếu{' '}
                <strong className="text-amber-200">{totalQuestions - answeredCount} câu</strong>).
              </span>
            </div>

            <button
              type="button"
              onClick={finishCurrentTurn}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium border border-neutral-700 transition-colors cursor-pointer shrink-0"
              title="Chuyển đến câu hỏi chưa trả lời tiếp theo"
            >
              Làm câu còn thiếu →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

