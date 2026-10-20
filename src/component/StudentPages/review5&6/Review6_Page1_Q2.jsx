import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Button from "../../Button";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import ValidationAlert from "../../Popup/ValidationAlert";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import useWorkbookMatchingKeyboard from "../../WorkBookPages/Unit4/useWorkbookMatchingKeyboard";
import "../unit4/unit4Interactions.css";

const AUDIO_MODULES = import.meta.glob(
  "../../../assets/audio/ClassBook/Unit 6/Page 54 - Exercise B/*.mp3",
  { eager: true, query: "?url", import: "default" },
);
const audioEndingWith = (ending) =>
  Object.entries(AUDIO_MODULES).find(([path]) => path.endsWith(ending))?.[1];

const LEFT = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"].map((text, index) => ({ id: index + 1, text }));
const RIGHT = ["3rd", "4th", "1st", "2nd", "8th", "6th", "9th", "10th", "7th", "5th"].map((text, index) => ({ id: index + 1, text, letter: String.fromCharCode(97 + index) }));
const CORRECT = { 1: 3, 2: 4, 3: 1, 4: 2, 5: 10, 6: 6, 7: 9, 8: 5, 9: 7, 10: 8 };
const AUDIO = {
  first: audioEndingWith("Item_001_first.mp3"), "3rd": audioEndingWith("Item_002_3rd.mp3"),
  second: audioEndingWith("Item_003_second.mp3"), "4th": audioEndingWith("Item_004_4th.mp3"),
  third: audioEndingWith("Item_005_third.mp3"), "1st": audioEndingWith("Item_006_1st.mp3"),
  fourth: audioEndingWith("Item_007_fourth.mp3"), "2nd": audioEndingWith("Item_008_2nd.mp3"),
  fifth: audioEndingWith("Item_009_fifth.mp3"), "8th": audioEndingWith("Item_010_8th.mp3"),
  sixth: audioEndingWith("Item_011_sixth.mp3"), "6th": audioEndingWith("Item_012_6th.mp3"),
  seventh: audioEndingWith("Item_013_seventh.mp3"), "9th": audioEndingWith("Item_014_9th.mp3"),
  eighth: audioEndingWith("Item_015_eighth.mp3"), "10th": audioEndingWith("Item_016_10th.mp3"),
  ninth: audioEndingWith("Item_017_ninth.mp3"), "7th": audioEndingWith("Item_018_7th.mp3"),
  tenth: audioEndingWith("Item_019_tenth.mp3"), "5th": audioEndingWith("Item_020_5th.mp3"),
};
const ORANGE = "#f39b42";

export default function Review6_Page1_Q2() {
  const [matches, setMatches] = useState({});
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [lines, setLines] = useState([]);
  const boardRef = useRef(null);
  const refs = useRef({});
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const isLeftLocked = useCallback((id) => locked.includes(id), [locked]);
  const isRightLocked = useCallback((id) => Object.keys(matches).some((key) => matches[key] === id && locked.includes(Number(key))), [locked, matches]);

  const commit = (leftId, rightId) => {
    if (showAnswer || isLeftLocked(leftId) || isRightLocked(rightId)) return;
    setMatches((previous) => {
      const updated = { ...previous };
      Object.keys(updated).forEach((key) => { if (updated[key] === rightId && !locked.includes(Number(key))) delete updated[key]; });
      updated[leftId] = rightId;
      return updated;
    });
    setWrong((previous) => previous.filter((id) => id !== leftId));
    setSelected(null);
  };

  const choose = (side, id) => {
    if (showAnswer || (side === "left" ? isLeftLocked(id) : isRightLocked(id))) return;
    if (!selected || selected.side === side) { setSelected({ side, id }); return; }
    commit(side === "left" ? id : selected.id, side === "right" ? id : selected.id);
  };

  const getElement = useCallback((side, id) => refs.current[`${side}-button-${id}`], []);
  const getAnchor = useCallback((side, id) => refs.current[`${side}-dot-${id}`], []);
  const keyboard = useWorkbookMatchingKeyboard({
    boardRef, leftIds: LEFT.map((item) => item.id), rightIds: RIGHT.map((item) => item.id),
    getElement, getAnchorElement: getAnchor, isLeftLocked, isRightLocked, onCommit: commit,
    onStart: (side, id) => {
      setSelected({ side, id });
      const item = (side === "left" ? LEFT : RIGHT).find((entry) => entry.id === id);
      if (item) playAudio(`${side}-${id}`, AUDIO[item.text]);
    },
    onCancel: () => setSelected(null),
  });

  useLayoutEffect(() => {
    const update = () => {
      if (!boardRef.current) return;
      const board = boardRef.current.getBoundingClientRect();
      setLines(Object.entries(matches).flatMap(([leftId, rightId]) => {
        const from = getAnchor("left", Number(leftId)); const to = getAnchor("right", rightId);
        if (!from || !to) return [];
        const a = from.getBoundingClientRect(); const b = to.getBoundingClientRect();
        return [{ id: `${leftId}-${rightId}`, x1: a.left + a.width / 2 - board.left, y1: a.top + a.height / 2 - board.top, x2: b.left + b.width / 2 - board.left, y2: b.top + b.height / 2 - board.top }];
      }));
    };
    update(); window.addEventListener("resize", update); return () => window.removeEventListener("resize", update);
  }, [getAnchor, matches]);

  const check = () => {
    if (showAnswer || locked.length === LEFT.length) return;
    if (Object.keys(matches).length !== LEFT.length) { ValidationAlert.info("Please connect all items first."); return; }
    keyboard.clear(); setSelected(null);
    const correct = LEFT.flatMap((item) => matches[item.id] === CORRECT[item.id] ? [item.id] : []);
    setLocked(correct); setWrong(LEFT.flatMap((item) => matches[item.id] !== CORRECT[item.id] ? [item.id] : []));
    if (correct.length === LEFT.length) ValidationAlert.success(`Score: ${correct.length} / ${LEFT.length}`);
    else if (correct.length) ValidationAlert.warning(`Score: ${correct.length} / ${LEFT.length}`);
    else ValidationAlert.error(`Score: 0 / ${LEFT.length}`);
  };
  const reveal = () => { keyboard.clear(); setMatches(CORRECT); setLocked(LEFT.map((item) => item.id)); setWrong([]); setSelected(null); setShowAnswer(true); stopAudio(); };
  const reset = () => { keyboard.clear(); setMatches({}); setLocked([]); setWrong([]); setSelected(null); setShowAnswer(false); stopAudio(); };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: 28 }}>
        <ExerciseHeaderReview sectionLetter="B" title="Match." subTitle="Start with one word or picture, then connect it to the partner that means the same thing." />
        <div ref={boardRef} style={{ position: "relative", width: "100%" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible", zIndex: 1 }} aria-hidden="true">
            {lines.map((line) => <line key={line.id} {...line} stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />)}
            {keyboard.preview && <line {...keyboard.preview} stroke={ORANGE} strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round" />}
          </svg>
          <div style={{ display: "grid", gridTemplateColumns: "auto auto 1fr auto", columnGap: "clamp(8px,2vw,24px)", rowGap: 11, alignItems: "center", width: "100%" }}>
            {LEFT.map((leftItem, index) => {
              const rightItem = RIGHT[index];
              const leftHeld = selected?.side === "left" && selected.id === leftItem.id;
              const rightHeld = selected?.side === "right" && selected.id === rightItem.id;
              return (
                <React.Fragment key={leftItem.id}>
                  <div ref={(el) => { refs.current[`left-button-${leftItem.id}`] = el; }} role="button" tabIndex={isLeftLocked(leftItem.id) ? -1 : 0} aria-disabled={isLeftLocked(leftItem.id) || showAnswer} draggable={!isLeftLocked(leftItem.id) && !showAnswer} onDragStart={() => choose("left", leftItem.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => selected?.side === "right" && commit(leftItem.id, selected.id)} onClick={() => { playAudio(`left-${leftItem.id}`, AUDIO[leftItem.text]); choose("left", leftItem.id); }} onKeyDown={(event) => keyboard.handleKeyDown(event, "left", leftItem.id)} onFocus={() => keyboard.handleFocus("left", leftItem.id)} className="unit4-audio-control unit4-interactive" style={{ position: "relative", fontSize: "clamp(16px,1.5vw,20px)", padding: "6px 14px", borderRadius: 10, border: leftHeld ? `2px solid ${ORANGE}` : "2px solid transparent", background: leftHeld ? "rgba(243,155,66,.1)" : "transparent", zIndex: 2 }}><Unit4PlayingAudioIcon active={activeAudioKey === `left-${leftItem.id}`} /><b className="mr-2">{leftItem.id}</b>{leftItem.text}{wrong.includes(leftItem.id) && <span style={{ position: "absolute", right: -8, top: -6, color: "red", fontWeight: 700 }}>✕</span>}</div>
                  <span ref={(el) => { refs.current[`left-dot-${leftItem.id}`] = el; }} onClick={() => choose("left", leftItem.id)} style={{ width: 16, height: 16, borderRadius: "50%", background: leftHeld || matches[leftItem.id] ? ORANGE : "#9ca3af", zIndex: 2, cursor: "pointer" }} />
                  <span ref={(el) => { refs.current[`right-dot-${rightItem.id}`] = el; }} onClick={() => choose("right", rightItem.id)} style={{ justifySelf: "end", width: 16, height: 16, borderRadius: "50%", background: rightHeld || Object.values(matches).includes(rightItem.id) ? ORANGE : "#9ca3af", zIndex: 2, cursor: "pointer" }} />
                  <div ref={(el) => { refs.current[`right-button-${rightItem.id}`] = el; }} role="button" tabIndex={isRightLocked(rightItem.id) ? -1 : 0} aria-disabled={isRightLocked(rightItem.id) || showAnswer} draggable={!isRightLocked(rightItem.id) && !showAnswer} onDragStart={() => choose("right", rightItem.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => selected?.side === "left" && commit(selected.id, rightItem.id)} onClick={() => { playAudio(`right-${rightItem.id}`, AUDIO[rightItem.text]); choose("right", rightItem.id); }} onKeyDown={(event) => keyboard.handleKeyDown(event, "right", rightItem.id)} onFocus={() => keyboard.handleFocus("right", rightItem.id)} className="unit4-audio-control unit4-interactive" style={{ fontSize: "clamp(16px,1.4vw,20px)", padding: "6px 14px", borderRadius: 10, border: rightHeld ? `2px solid ${ORANGE}` : "2px solid transparent", background: rightHeld ? "rgba(243,155,66,.1)" : "transparent", zIndex: 2 }}><Unit4PlayingAudioIcon active={activeAudioKey === `right-${rightItem.id}`} /><b className="mr-2">{rightItem.letter}</b>{rightItem.text}</div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <Button checkAnswers={check} handleShowAnswer={reveal} handleStartAgain={reset} />
      </div>
    </div>
  );
}
