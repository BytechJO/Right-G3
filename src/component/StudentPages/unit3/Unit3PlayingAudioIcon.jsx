import { FaVolumeUp } from "react-icons/fa";

export default function Unit3PlayingAudioIcon({ active }) {
  if (!active) return null;

  return (
    <span className="unit3-playing-audio-icon" aria-hidden="true">
      <FaVolumeUp />
    </span>
  );
}
