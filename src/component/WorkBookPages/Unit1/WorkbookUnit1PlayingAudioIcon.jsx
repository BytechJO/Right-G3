import { FaVolumeUp } from "react-icons/fa";

export default function WorkbookUnit1PlayingAudioIcon({ active }) {
  if (!active) return null;
  return (
    <span className="wb-unit1-playing-audio-icon" aria-hidden="true">
      <FaVolumeUp />
    </span>
  );
}
