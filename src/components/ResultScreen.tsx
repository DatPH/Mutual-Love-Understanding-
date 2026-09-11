import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Home,
  CheckCircle,
  XCircle,
  Award,
  Filter,
  Flame,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ROOMS } from '../data/messages';

export const ResultScreen: React.FC = () => {
  const {
    player1Name,
    player2Name,
    selectedLevel,
    scoreSummary,
    comparisons,
    restartCurrentLevel,
    playNextLevel,
    returnToSetup,
  } = useGame();

  const [filterMode, setFilterMode] = useState<'all' | 'match' | 'mismatch'>('all');

  const p1 = player1Name.trim() || 'Người chơi 1';
  const p2 = player2Name.trim() || 'Người chơi 2';
  const currentRoom = ROOMS.find((r) => r.level === selectedLevel) || ROOMS[0];

  const filteredComparisons = comparisons.filter((c) => {
    if (filterMode === 'match') return c.isMatch;
    if (filterMode === 'mismatch') return !c.isMatch;
    return true;
  });

  const isLevel5 = selectedLevel === 5;
  const isHighMatch = scoreSummary.percentage >= 70;

  return (
    <motion.div
      key="result-screen"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8"
    >
      {/* Result Hero Card */}
      <div className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/60 relative overflow-hidden text-center">
        {/* Glow effect */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Room & Level Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-5">
          <Award className="w-3.5 h-3.5 text-rose-400" />
          <span>Kết quả {currentRoom.title}</span>
        </div>

        {/* Big Percentage Display */}
        <div className="mb-5">
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-36 h-36 sm:w-44 sm:h-44 -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="40%"
                stroke="currentColor"
                strokeWidth="10"
                className="text-neutral-800"
                fill="transparent"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="40%"
                stroke="currentColor"
                strokeWidth="10"
                className={isHighMatch ? 'text-rose-500' : 'text-amber-500'}
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset="251.2"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{
                  strokeDashoffset: 251.2 - (251.2 * scoreSummary.percentage) / 100,
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {scoreSummary.percentage}%
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-300 mt-0.5">
                Đồng Điệu
              </span>
            </div>
          </div>
        </div>

        {/* Score Breakdown Pill */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-neutral-950/70 border border-neutral-800 text-xs font-medium text-neutral-300 mb-6">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Trùng khớp: {scoreSummary.matchedCount}/{scoreSummary.totalCount}</span>
          </span>
          <span className="text-neutral-600">|</span>
          <span className="flex items-center gap-1 text-rose-400">
            <XCircle className="w-3.5 h-3.5" />
            <span>Lệch sóng: {scoreSummary.totalCount - scoreSummary.matchedCount}/{scoreSummary.totalCount}</span>
          </span>
        </div>

        {/* Dynamic Witty Result Message Banner */}
        <div className="relative p-5 sm:p-6 rounded-2xl bg-neutral-950/80 border border-rose-500/30 text-left max-w-xl mx-auto shadow-inner">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
              <Flame className="w-5 h-5 fill-rose-400/20" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-rose-400">
                  Thông điệp vũ trụ gửi {p1} & {p2}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <p className="text-base sm:text-lg font-serif-display italic text-neutral-100 leading-relaxed font-normal">
                "{scoreSummary.message}"
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons Group */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-neutral-800">
          <button
            id="restart-level-btn"
            type="button"
            onClick={restartCurrentLevel}
            className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi lại Phòng này</span>
          </button>

          {!isLevel5 ? (
            <button
              id="next-level-btn"
              type="button"
              onClick={playNextLevel}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50 transition-all cursor-pointer active:scale-95"
            >
              <span>Tiến vào Phòng {selectedLevel + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="py-3 px-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-sm font-semibold flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>Đã hoàn thành 5 Phòng!</span>
            </div>
          )}

          <button
            id="return-setup-btn"
            type="button"
            onClick={returnToSetup}
            className="py-3 px-4 rounded-xl bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Chọn Phòng khác</span>
          </button>
        </div>
      </div>

      {/* Detailed Question Review List */}
      <div className="space-y-4">
        {/* Section Header & Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
          <div>
            <h2 className="text-xl font-serif-display font-semibold text-white tracking-tight">
              Chi tiết câu trả lời của hai bạn
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Đối chiếu từng lựa chọn giữa <strong className="text-neutral-200">{p1}</strong> và{' '}
              <strong className="text-neutral-200">{p2}</strong>
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs">
            <button
              id="filter-all-btn"
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-neutral-700 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Tất cả ({comparisons.length})
            </button>
            <button
              id="filter-match-btn"
              type="button"
              onClick={() => setFilterMode('match')}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                filterMode === 'match'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Trùng ({scoreSummary.matchedCount})
            </button>
            <button
              id="filter-mismatch-btn"
              type="button"
              onClick={() => setFilterMode('mismatch')}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                filterMode === 'mismatch'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Lệch ({scoreSummary.totalCount - scoreSummary.matchedCount})
            </button>
          </div>
        </div>

        {/* Questions Cards */}
        <div className="space-y-3.5">
          {filteredComparisons.map((item, index) => {
            return (
              <div
                key={item.questionId}
                className={`p-5 rounded-2xl backdrop-blur-md border transition-all ${
                  item.isMatch
                    ? 'bg-neutral-900/80 border-emerald-500/30 hover:border-emerald-500/50 shadow-md shadow-emerald-950/20'
                    : 'bg-neutral-900/80 border-rose-500/30 hover:border-rose-500/50 shadow-md shadow-rose-950/20'
                }`}
              >
                {/* Question title & Badge */}
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="text-sm font-medium text-white flex-1 leading-snug">
                    <span className="text-neutral-400 font-bold mr-1.5">
                      #{index + 1}.
                    </span>
                    {item.question}
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 border ${
                      item.isMatch
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {item.isMatch ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Trùng khớp</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-rose-400" />
                        <span>Lệch sóng</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Answers Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-neutral-800/80 text-xs">
                  {/* P1 Answer */}
                  <div
                    className={`p-3 rounded-xl border ${
                      item.isMatch
                        ? 'bg-emerald-950/20 border-emerald-500/20 text-neutral-200'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-300'
                    }`}
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-1 flex items-center justify-between">
                      <span>{p1} đã chọn:</span>
                      <span className="text-neutral-500 font-normal">P1</span>
                    </div>
                    <div className="text-neutral-200 font-medium leading-relaxed">
                      {item.p1Answer || '(Chưa chọn)'}
                    </div>
                  </div>

                  {/* P2 Answer */}
                  <div
                    className={`p-3 rounded-xl border ${
                      item.isMatch
                        ? 'bg-emerald-950/20 border-emerald-500/20 text-neutral-200'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-300'
                    }`}
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-pink-400 mb-1 flex items-center justify-between">
                      <span>{p2} đã chọn:</span>
                      <span className="text-neutral-500 font-normal">P2</span>
                    </div>
                    <div className="text-neutral-200 font-medium leading-relaxed">
                      {item.p2Answer || '(Chưa chọn)'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
