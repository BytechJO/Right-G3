import { useCallback, useEffect, useRef, useState } from "react";

export default function useUnit3Audio() {
  const audioRef = useRef(null);
  const tokenRef = useRef(0);
  const [activeAudioKey, setActiveAudioKey] = useState(null);

  const stopAudio = useCallback(() => {
    tokenRef.current += 1;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }

    setActiveAudioKey(null);
  }, []);

  const playAudio = useCallback(
    (key, source) => {
      if (!source) return;

      stopAudio();
      const token = tokenRef.current;
      const audio = new Audio(source);
      audioRef.current = audio;
      setActiveAudioKey(key);

      const finish = () => {
        if (tokenRef.current === token && audioRef.current === audio) {
          audioRef.current = null;
          setActiveAudioKey(null);
        }
      };

      audio.onended = finish;
      audio.onerror = finish;
      audio.play().catch(finish);
    },
    [stopAudio],
  );

  useEffect(() => stopAudio, [stopAudio]);

  return { activeAudioKey, playAudio, stopAudio };
}
