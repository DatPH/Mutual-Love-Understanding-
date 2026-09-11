import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Home, AlertCircle } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const ExitRoomButton: React.FC = () => {
  const { screen, returnToSetup } = useGame();
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Only display when inside a room / game flow
  if (screen === 'setup') {
    return null;
  }

  const handleBackClick = () => {
    // If on results screen, exit directly without warning
    if (screen === 'results') {
      returnToSetup();
      return;
    }
    // If playing, confirm first to prevent accidental progress loss
    setShowConfirmModal(true);
  };

  const handleConfirmExit = () => {
    setShowConfirmModal(false);
    returnToSetup();
  };

  return (
    <>
      <button
        id="exit-room-btn"
        type="button"
        onClick={handleBackClick}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-rose-500/40 backdrop-blur-md shadow-xl shadow-black/50 transition-all duration-200 active:scale-95 cursor-pointer group"
        title="Thoát khỏi phòng chơi và về trang chủ"
        aria-label="Thoát phòng chơi về trang chủ"
      >
        <ArrowLeft className="w-4 h-4 text-rose-400 transition-transform duration-200 group-hover:-translate-x-0.5" />
        <span className="text-xs font-medium tracking-wide">
          <span className="hidden sm:inline">Về </span>Trang chủ
        </span>
      </button>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl shadow-black/80 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <AlertCircle className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">Thoát khỏi phòng chơi?</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Tiến trình trả lời của phòng này chưa được hoàn tất. Nếu thoát ra, câu trả lời sẽ bị đặt lại và bạn sẽ quay về trang chủ.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors cursor-pointer"
                >
                  Ở lại chơi tiếp
                </button>
                <button
                  type="button"
                  onClick={handleConfirmExit}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-950/50 transition-colors cursor-pointer"
                >
                  Thoát phòng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
