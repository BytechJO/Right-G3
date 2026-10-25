import { FaVolumeUp } from "react-icons/fa";

export default function Unit4PlayingAudioIcon({ active }) {
  if (!active) return null;
  return (
    <span className="unit4-playing-audio-icon" aria-hidden="true">
      <FaVolumeUp />
    </span>
  );
}
