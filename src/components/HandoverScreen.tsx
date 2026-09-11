import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, EyeOff, Sparkles, ArrowRight, Lock } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ROOMS } from '../data/messages';

export const HandoverScreen: React.FC = () => {
  const {
    player1Name,
    player2Name,
    selectedLevel,
    startP2Turn,
  } = useGame();

  const p1 = player1Name.trim() || 'Người chơi 1';
  const p2 = player2Name.trim() || 'Người chơi 2';
  const currentRoom = ROOMS.find((r) => r.level === selectedLevel) || ROOMS[0];

  return (
    <motion.div
      key="handover-screen"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-lg mx-auto px-4 py-8 sm:py-14 text-center"
    >
      <div className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/60 relative overflow-hidden">
        {/* Subtle decorative glow circle */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Handover Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hoàn thành 50% chặng đường</span>
        </div>

        {/* Big Handover Icon Art */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-rose-500/20 to-pink-500/10 animate-pulse" />
          <div className="w-20 h-20 rounded-2xl bg-neutral-950/80 border border-neutral-700/60 flex items-center justify-center text-rose-400 shadow-xl">
            <Smartphone className="w-10 h-10 animate-bounce" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-amber-400">
            <EyeOff className="w-4 h-4" />
          </div>
        </div>

        {/* Handover Notice Header */}
        <div className="space-y-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-serif-display font-semibold text-white tracking-tight leading-snug">
            Nhắm mắt lại và đưa máy cho{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
              {p2}
            </span>
            !
          </h1>
          <p className="text-sm text-neutral-300 leading-relaxed max-w-sm mx-auto">
            Tuyệt vời! <strong className="text-rose-300">{p1}</strong> đã hoàn thành phần thi bí mật của mình trong{' '}
            <span className="text-neutral-200 font-medium">{currentRoom.title}</span>.
          </p>
        </div>

        {/* Secret Privacy Box */}
        <div className="mb-8 p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Quy tắc bảo mật đồng điệu</span>
          </div>
          <ul className="text-xs text-neutral-400 space-y-1.5 pl-1 leading-relaxed">
            <li>• Toàn bộ câu trả lời của <strong className="text-neutral-300">{p1}</strong> đã được khóa lại bí mật.</li>
            <li>• <strong className="text-rose-300">{p1}</strong> tuyệt đối không được nhìn lén hoặc gợi ý đáp án cho <strong className="text-pink-300">{p2}</strong>.</li>
            <li>• Giờ là lúc xem hai bạn có chung tần số thật sự hay không!</li>
          </ul>
        </div>

        {/* P2 Confirmation Button */}
        <button
          id="p2-start-turn-btn"
          type="button"
          onClick={startP2Turn}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-base shadow-xl shadow-pink-950/50 hover:shadow-pink-900/70 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <span>Tôi là {p2}, bắt đầu!</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};
