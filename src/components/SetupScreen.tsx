import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, User, Users, Play, ShieldAlert, Compass } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ROOMS } from '../data/messages';
import { LevelNumber } from '../types/game';

interface SetupScreenProps {
  onStartGame: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame }) => {
  const {
    player1Name,
    player2Name,
    setPlayer1Name,
    setPlayer2Name,
    selectedLevel,
    setSelectedLevel,
  } = useGame();

  const handleLevelSelect = (level: LevelNumber) => {
    setSelectedLevel(level);
  };

  const currentRoom = ROOMS.find((r) => r.level === selectedLevel) || ROOMS[0];

  return (
    <motion.div
      key="setup-screen"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12"
    >
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium tracking-wide mb-3 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Game tương tác Pass & Play dành cho cặp đôi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-semibold text-white tracking-tight leading-tight">
          Đồng Điệu Bí Mật
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 mt-2.5 max-w-md mx-auto leading-relaxed">
          Cùng luân phiên trả lời trên một thiết bị để khám phá xem tâm hồn hai bạn thấu hiểu nhau đến mức nào.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 space-y-7">
        {/* Step 1: Couple Names */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-rose-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
              1. Tên hai bạn
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Player 1 Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="player1-name-input"
                className="text-xs font-medium text-neutral-400 flex items-center justify-between"
              >
                <span>Người chơi 1 (Chơi trước)</span>
                <span className="text-rose-400/80 font-semibold">P1</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="player1-name-input"
                  type="text"
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                  placeholder="VD: Anh / Tuấn / Chàng ngố"
                  maxLength={24}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-950/70 border border-neutral-700/80 rounded-xl text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all"
                />
              </div>
            </div>

            {/* Player 2 Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="player2-name-input"
                className="text-xs font-medium text-neutral-400 flex items-center justify-between"
              >
                <span>Người chơi 2 (Chơi sau)</span>
                <span className="text-pink-400/80 font-semibold">P2</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <Heart className="w-4 h-4" />
                </div>
                <input
                  id="player2-name-input"
                  type="text"
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value)}
                  placeholder="VD: Em / Mai / Bé iu"
                  maxLength={24}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-950/70 border border-neutral-700/80 rounded-xl text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Level Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-rose-400" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
                2. Chọn Phòng Thử Thách
              </h2>
            </div>
            <span className="text-xs text-neutral-400">10 câu hỏi / phòng</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {ROOMS.map((room) => {
              const isSelected = selectedLevel === room.level;
              return (
                <button
                  key={room.level}
                  id={`select-room-${room.level}-btn`}
                  type="button"
                  onClick={() => handleLevelSelect(room.level)}
                  className={`relative p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? 'bg-rose-500/15 border-rose-500 ring-1 ring-rose-500/40 shadow-lg shadow-rose-950/50'
                      : 'bg-neutral-950/50 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      R{room.level}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                    )}
                  </div>
                  <div className="font-semibold text-sm text-neutral-100 leading-snug">
                    {room.title.replace(`Room ${room.level}: `, '')}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
                    {room.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Room Detail Preview */}
          <div className="mt-3.5 p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/70 text-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-300 flex items-center justify-center shrink-0 font-bold text-sm">
              #{currentRoom.level}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-200 text-sm">{currentRoom.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950/60 text-rose-300 border border-rose-800/50">
                  {currentRoom.tag}
                </span>
              </div>
              <p className="text-neutral-400 leading-relaxed">{currentRoom.description}</p>
            </div>
          </div>
        </div>

        {/* Rules note */}
        <div className="p-3.5 rounded-xl bg-neutral-950/40 border border-neutral-800/60 flex items-center gap-2.5 text-xs text-neutral-400">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Luật chơi bí mật: <strong className="text-neutral-200">{player1Name || 'P1'}</strong> trả lời trước, sau đó chuyển máy cho <strong className="text-neutral-200">{player2Name || 'P2'}</strong> mà không nhìn trộm!
          </span>
        </div>

        {/* Start Game Action Button */}
        <button
          id="start-game-btn"
          type="button"
          onClick={onStartGame}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-base shadow-lg shadow-rose-900/40 hover:shadow-rose-900/60 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>
            Bắt đầu với lượt của <span className="underline decoration-rose-300 underline-offset-2">{player1Name || 'Người chơi 1'}</span>
          </span>
        </button>
      </div>
    </motion.div>
  );
};
