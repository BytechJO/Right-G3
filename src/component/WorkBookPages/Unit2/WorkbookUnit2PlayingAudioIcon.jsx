import { FaVolumeUp } from "react-icons/fa";

export default function WorkbookUnit2PlayingAudioIcon({ active }) {
  if (!active) return null;

  return (
    <span className="wb-unit2-playing-audio-icon" aria-hidden="true">
      <FaVolumeUp />
    </span>
  );
}
