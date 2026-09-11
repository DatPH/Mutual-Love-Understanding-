import { useEffect, useRef, useState, useCallback } from 'react';

export interface AudioTrack {
  id: string;
  title: string;
  composer: string;
  url: string;
}

export const ROMANTIC_PLAYLIST: AudioTrack[] = [
  {
    id: 'chopin-nocturne',
    title: 'Nocturne Op. 9 No. 2',
    composer: 'Frédéric Chopin',
    url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5c/Frederic_Chopin_-_Nocturne_Eb_major_Opus_9%2C_number_2.ogg/Frederic_Chopin_-_Nocturne_Eb_major_Opus_9%2C_number_2.ogg.mp3',
  },
  {
    id: 'satie-gymnopedie',
    title: 'Gymnopédie No. 1',
    composer: 'Erik Satie',
    url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/9/90/Erik_Satie_-_gymnopedies_-_la_1_ere._lent_et_douloureux.ogg/Erik_Satie_-_gymnopedies_-_la_1_ere._lent_et_douloureux.ogg.mp3',
  },
];

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStartedOnce, setHasStartedOnce] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentTrack = ROMANTIC_PLAYLIST[currentTrackIndex] || ROMANTIC_PLAYLIST[0];

  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = 0.4;
    audio.src = currentTrack.url;
    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleError = (e: Event) => {
      console.warn('Audio track loading error, trying fallback track:', e);
      setIsLoading(false);
      // Try next track if current fails
      if (currentTrackIndex < ROMANTIC_PLAYLIST.length - 1) {
        setCurrentTrackIndex((prev) => prev + 1);
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [currentTrack.url, currentTrackIndex]);

  const startAudio = useCallback(() => {
    if (!audioRef.current) return;
    setHasStartedOnce(true);
    audioRef.current.muted = false;
    setIsMuted(false);
    setIsLoading(true);

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.warn('Audio playback waiting for direct user gesture:', err);
      });
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;

    if (!hasStartedOnce || !isPlaying) {
      startAudio();
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsMuted(true);
    }
  }, [hasStartedOnce, isPlaying, startAudio]);

  const switchNextTrack = useCallback(() => {
    const nextIdx = (currentTrackIndex + 1) % ROMANTIC_PLAYLIST.length;
    setCurrentTrackIndex(nextIdx);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 100);
  }, [currentTrackIndex]);

  return {
    isPlaying,
    isMuted,
    isLoading,
    hasStartedOnce,
    currentTrack,
    startAudio,
    toggleMute,
    switchNextTrack,
  };
}
