import React from 'react';
import { Heart } from 'lucide-react';
import { AudioToggle } from './AudioToggle';
import { ExitRoomButton } from './ExitRoomButton';
import { AudioTrack } from '../hooks/useAudioPlayer';

interface BackgroundLayoutProps {
  children: React.ReactNode;
  isPlaying: boolean;
  isMuted: boolean;
  isLoading?: boolean;
  currentTrack?: AudioTrack;
  onToggleAudio: () => void;
  onNextTrack?: () => void;
}

export const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({
  children,
  isPlaying,
  isMuted,
  isLoading,
  currentTrack,
  onToggleAudio,
  onNextTrack,
}) => {
  return (
    <div className="relative min-h-screen w-full bg-neutral-950 text-neutral-100 flex flex-col justify-between overflow-x-hidden">
      {/* Fixed Fullscreen Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1920&auto=format&fit=crop"
          alt="Romantic couple ambient background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.35] saturate-[0.85] contrast-[1.1] scale-105"
        />
        {/* Soft romantic gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/85 via-neutral-950/70 to-neutral-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Floating Exit Button in Top Left */}
      <ExitRoomButton />

      {/* Floating Audio Controller in Top Right */}
      <AudioToggle
        isPlaying={isPlaying}
        isMuted={isMuted}
        isLoading={isLoading}
        currentTrack={currentTrack}
        onToggle={onToggleAudio}
        onNextTrack={onNextTrack}
      />


      {/* Main Interactive Screen Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full py-6">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-neutral-500 flex items-center justify-center gap-1.5 pointer-events-none">
        <span>Đồng Điệu Bí Mật</span>
        <span>•</span>
        <span className="flex items-center gap-1">
          Dành riêng cho hai bạn <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
        </span>
      </footer>
    </div>
  );
};
