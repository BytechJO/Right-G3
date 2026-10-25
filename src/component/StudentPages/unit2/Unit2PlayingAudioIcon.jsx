import { FaVolumeUp } from "react-icons/fa";

export default function Unit2PlayingAudioIcon({ active }) {
  if (!active) return null;

  return (
    <span className="unit2-playing-audio-icon" aria-hidden="true">
      <FaVolumeUp />
    </span>
  );
}
