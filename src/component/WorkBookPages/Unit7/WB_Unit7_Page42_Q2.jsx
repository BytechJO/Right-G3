import { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import roomImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 42/SVG/2.svg";

const leftItems = [
  { id: 1, text: "The bag" },
  { id: 2, text: "The guitar" },
  { id: 3, text: "The cat" },
  { id: 4, text: "The game" },
  { id: 5, text: "The shirt" },
  { id: 6, text: "The doll" },
  { id: 7, text: "The teddy bear" },
  { id: 8, text: "The table lamp" },
];

const rightItems = [
  { id: "a", text: "is on the bed." },
  { id: "b", text: "is next to the chair." },
  { id: "c", text: "is next to the bed." },
  { id: "d", text: "is on the chair." },
  { id: "e", text: "is under the bed." },
  { id: "f", text: "is on the table." },
  { id: "g", text: "is in front of the pillow." },
  { id: "h", text: "is under the table." },
];

const correctAnswers = { 1:"d", 2:"e", 3:"h", 4:"f", 5:"a", 6:"g", 7:"b", 8:"c" };

// Row height in px — both columns use the same value so they align perfectly
const ROW_H = 44;

export default function WB_Unit7_Page42_Q2() {
  const [answers, setAnswers]         = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAnswer, setShowAnswer]   = useState(false);
  const [dragging, setDragging]       = useState(null);

  const usedLetters = Object.values(answers);

  const onDragStart    = (letter) => setDragging(letter);
  const onDragOver     = (e) => e.preventDefault();

  const onDropBox = (e, leftId) => {
    e.preventDefault();
    if (!dragging || showAnswer) return;
    setAnswers((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => { if (updated[k] === dragging) delete updated[k]; });
      updated[leftId] = dragging;
      return updated;
    });
    setDragging(null);
  };

  const onDropPool = (e) => {
    e.preventDefault();
    if (!dragging) return;
    setAnswers((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => { if (updated[k] === dragging) delete updated[k]; });
      return updated;
    });
    setDragging(null);
  };

  const checkAnswers = () => {
    if (Object.keys(answers).length < leftItems.length) {
      ValidationAlert.info("كمّل كل الفراغات أولاً");
      return;
    }
    let correct = 0;
    leftItems.forEach((q) => { if (answers[q.id] === correctAnswers[q.id]) correct++; });
    setShowResults(true);
    ValidationAlert.success(`Score: ${correct}/${leftItems.length}`);
  };

  const handleShowAnswer = () => {
    setAnswers({ ...correctAnswers });
    setShowAnswer(true);
    setShowResults(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowAnswer(false);
    setShowResults(false);
  };

  const getStatus = (leftId) => {
    if (!showResults || !answers[leftId]) return "empty";
    return answers[leftId] === correctAnswers[leftId] ? "correct" : "wrong";
  };

  const boxStyle = (leftId) => {
    const s = getStatus(leftId);
    const placed = answers[leftId];
    const base = {
      width: 38, height: 38,
      borderRadius: 6,
      border: "2px solid",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: "0.95rem",
      flexShrink: 0,
      userSelect: "none",
      transition: "all 0.2s",
      cursor: placed && !showAnswer ? "grab" : "default",
    };
    if (s === "correct") return { ...base, borderColor: "#198754", color: "#198754", background: "#d1e7dd" };
    if (s === "wrong")   return { ...base, borderColor: "#dc3545", color: "#dc3545", background: "#f8d7da" };
    if (placed)          return { ...base, borderColor: "#0d6efd", color: "#0d6efd", background: "#cfe2ff" };
    return               { ...base, borderColor: "#adb5bd", color: "transparent", background: "#f8f9fa" };
  };

  return (
    <div className="container-fluid px-3 px-md-4 py-3 " style={{ maxWidth: 740 }}>

      {/* Title */}
      <h1
        className="text-center fw-bold mb-3"
        style={{ color: "#5b2d8e", fontSize: "clamp(1rem,3vw,1.4rem)" }}
      >
        Look, read, and match.
      </h1>

      {/* ── Image centered, reasonable size ── */}
      <div className="text-center mb-3">
        <img
          src={roomImg}
          alt="bedroom"
          className="img-fluid rounded shadow-sm"
          style={{ maxWidth: 340, width: "100%", objectFit: "contain" }}
        />
      </div>

      {/* ── Letters pool ── */}
      <div
        className="d-flex flex-wrap justify-content-center gap-2 mb-3 p-2 rounded"
        style={{ background: "#f0ebfa", minHeight: 50 }}
        onDragOver={onDragOver}
        onDrop={onDropPool}
      >
        {rightItems.map((item) => {
          const isUsed = usedLetters.includes(item.id);
          return (
            <div
              key={item.id}
              draggable={!isUsed && !showAnswer}
              onDragStart={() => onDragStart(item.id)}
              className="d-flex align-items-center justify-content-center fw-bold rounded border"
              style={{
                width: 38, height: 38,
                borderColor: isUsed ? "#dee2e6" : "#5b2d8e",
                color:       isUsed ? "#dee2e6" : "#5b2d8e",
                background:  isUsed ? "#f8f9fa" : "#fff",
                cursor:      isUsed || showAnswer ? "default" : "grab",
                fontSize: "1rem",
                userSelect: "none",
                opacity: isUsed ? 0.35 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {item.id}
            </div>
          );
        })}
      </div>

      {/* ── Match table: both columns same row height ── */}
      <div className="row g-0">

        {/* LEFT column */}
        <div className="col-6">
          {leftItems.map((item) => {
            const placed = answers[item.id];
            const status = getStatus(item.id);
            return (
              <div
                key={item.id}
                className="d-flex align-items-center gap-2"
                style={{ height: ROW_H }}
              >
                {/* Number */}
                <span
                  className="text-secondary fw-bold"
                  style={{ minWidth: 16, fontSize: "clamp(0.78rem,2vw,0.95rem)" }}
                >
                  {item.id}
                </span>

                {/* Drop box */}
                <div
                  style={boxStyle(item.id)}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDropBox(e, item.id)}
                  draggable={!!placed && !showAnswer}
                  onDragStart={() => placed && onDragStart(placed)}
                >
                  {placed || ""}
                </div>

                {/* Item text */}
                <span
                  className="fw-semibold"
                  style={{
                    fontSize: "clamp(0.78rem,2vw,0.95rem)",
                    color:
                      status === "correct" ? "#198754" :
                      status === "wrong"   ? "#dc3545" : "#212529",
                  }}
                >
                  {item.text}
                </span>

                {/* Tick / Cross */}
                {status === "correct" && <span className="text-success fw-bold ms-auto">✓</span>}
                {status === "wrong"   && <span className="text-danger  fw-bold ms-auto">✕</span>}
              </div>
            );
          })}
        </div>

        {/* RIGHT column — same ROW_H so rows line up */}
        <div className="col-6 ps-3">
          {rightItems.map((item) => (
            <div
              key={item.id}
              className="d-flex align-items-center gap-2"
              style={{ height: ROW_H }}
            >
              <span
                className="fw-bold"
                style={{ minWidth: 16, fontSize: "clamp(0.78rem,2vw,0.95rem)", color: "#5b2d8e" }}
              >
                {item.id}
              </span>
              <span style={{ fontSize: "clamp(0.78rem,2vw,0.95rem)", color: "#212529" }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4">
        <Button
          checkAnswers={checkAnswers}
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleStartAgain}
        />
      </div>
    </div>
  );
}