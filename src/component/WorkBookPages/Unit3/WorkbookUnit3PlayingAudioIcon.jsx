import { FaVolumeUp } from "react-icons/fa";

export default function WorkbookUnit3PlayingAudioIcon({ active }) {
  if (!active) return null;

  return (
    <span className="wb-unit3-playing-audio-icon" aria-hidden="true">
      <FaVolumeUp />
    </span>
  );
}
