import React from 'react';
import { Volume2, VolumeX, SkipForward, Loader2, Music2 } from 'lucide-react';
import { AudioTrack } from '../hooks/useAudioPlayer';

interface AudioToggleProps {
  isPlaying: boolean;
  isMuted: boolean;
  isLoading?: boolean;
  currentTrack?: AudioTrack;
  onToggle: () => void;
  onNextTrack?: () => void;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({
  isPlaying,
  isMuted,
  isLoading = false,
  currentTrack,
  onToggle,
  onNextTrack,
}) => {
  const active = isPlaying && !isMuted;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-1.5 p-1 rounded-full bg-neutral-900/90 border border-rose-500/30 backdrop-blur-md shadow-xl shadow-black/50">
      <button
        id="audio-toggle-btn"
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-neutral-800/80 text-neutral-200 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer group"
        title={
          active
            ? `Đang phát: ${currentTrack?.composer} - ${currentTrack?.title} (Bấm để tạm dừng)`
            : 'Bật nhạc nền lãng mạn (Chopin / Satie)'
        }
        aria-label={active ? 'Tắt nhạc nền' : 'Bật nhạc nền lãng mạn'}
      >
        <div className="relative flex items-center justify-center w-4 h-4 text-rose-400 group-hover:text-rose-300">
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-400" />
          ) : active ? (
            <Volume2 className="w-4 h-4 text-rose-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-neutral-400" />
          )}
        </div>

        <div className="text-left">
          {active ? (
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5">
                <span className="inline-block w-0.5 h-2.5 bg-rose-400 animate-pulse" />
                <span className="inline-block w-0.5 h-3.5 bg-rose-400 animate-pulse delay-75" />
                <span className="inline-block w-0.5 h-2 bg-rose-400 animate-pulse delay-150" />
              </span>
              <span className="text-[11px] font-medium text-rose-200 truncate max-w-[120px] sm:max-w-[160px]">
                {currentTrack?.title || 'Nhạc lãng mạn'}
              </span>
            </div>
          ) : (
            <span className="text-xs font-medium text-neutral-300 flex items-center gap-1">
              <Music2 className="w-3 h-3 text-rose-400" />
              <span>Bật nhạc</span>
            </span>
          )}
        </div>
      </button>

      {onNextTrack && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNextTrack();
          }}
          className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-rose-300 transition-colors cursor-pointer"
          title="Đổi bài nhạc tiếp theo"
          aria-label="Đổi bài nhạc"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

