import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { BackgroundLayout } from './components/BackgroundLayout';
import { SetupScreen } from './components/SetupScreen';
import { PlayerTurnScreen } from './components/PlayerTurnScreen';
import { HandoverScreen } from './components/HandoverScreen';
import { ResultScreen } from './components/ResultScreen';

function GameContent() {
  const { screen, startGame } = useGame();
  const {
    isPlaying,
    isMuted,
    isLoading,
    currentTrack,
    toggleMute,
    startAudio,
    switchNextTrack,
  } = useAudioPlayer();

  const handleStartGame = () => {
    // Start background music seamlessly upon user gesture
    startAudio();
    startGame();
  };

  return (
    <BackgroundLayout
      isPlaying={isPlaying}
      isMuted={isMuted}
      isLoading={isLoading}
      currentTrack={currentTrack}
      onToggleAudio={toggleMute}
      onNextTrack={switchNextTrack}
    >
      {screen === 'setup' && <SetupScreen onStartGame={handleStartGame} />}
      {screen === 'p1_turn' && <PlayerTurnScreen />}
      {screen === 'handover' && <HandoverScreen />}
      {screen === 'p2_turn' && <PlayerTurnScreen />}
      {screen === 'results' && <ResultScreen />}
    </BackgroundLayout>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
