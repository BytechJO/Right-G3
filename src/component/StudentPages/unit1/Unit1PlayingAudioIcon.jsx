import { FaVolumeUp } from "react-icons/fa";

export default function Unit1PlayingAudioIcon({ active }) {
  if (!active) return null;
  return (
    <span className="unit1-playing-audio-icon" aria-hidden="true">
      <FaVolumeUp />
    </span>
  );
}
