import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit3PlayingAudioIcon from "./WorkbookUnit3PlayingAudioIcon";
import useWorkbookUnit3Audio from "./useWorkbookUnit3Audio";
import "./workbookUnit3Interactions.css";
import left1Audio from "../../../assets/audio/WorkBook/unit3/Page 15 - Exercise A/Item_001_Does_he_have_any_ink.mp3";
import right1Audio from "../../../assets/audio/WorkBook/unit3/Page 15 - Exercise A/Item_002_Yes,_he_has_some.mp3";
import left2Audio from "../../../assets/audio/WorkBook/unit3/Page 15 - Exercise A/Item_003_Does_she_have_any_paper.mp3";
import right2Audio from "../../../assets/audio/WorkBook/unit3/Page 15 - Exercise A/Item_004_No,_he_hasn't_any.mp3";
import left3Audio from "../../../assets/audio/WorkBook/unit3/Page 15 - Exercise A/Item_005_Does_he_have_any_eggplants.mp3";
import right3Audio from "../../../assets/audio/WorkBook/unit3/Page 15 - Exercise A/Item_006_Yes,_she_has_some.mp3";
import left4Audio from "../../../assets/audio/WorkBook/unit3/Page 15 - Exercise A/Item_007_Does_he_have_any_grapes.mp3";
import right4Audio from "../../../assets/audio/WorkBook/unit3/Page 15 - Exercise A/Item_008_Yes,_he_has_a_little.mp3";
import char1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 1.svg";
import char2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 2.svg";
import char3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 3.svg";
import char4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 4.svg";

const DOT_COLOR = "#9ca3af";
const ACTIVE_COLOR = "#f39b42";
const BORDER_COLOR = "#e0e0e0";
const WRONG_COLOR = "red";
const PATH_COLOR = "#f39b42";
const TEXT_COLOR = "#111";

const LEFT_ITEMS = [
  { id: 1, img: char1, text: "Does he have any ink?", audio: left1Audio, alt: "A boy holding an ink bottle" },
  { id: 2, img: char2, text: "Does she have any paper?", audio: left2Audio, alt: "A girl holding paper" },
  { id: 3, img: char3, text: "Does he have any eggplants?", audio: left3Audio, alt: "A boy holding scissors" },
  { id: 4, img: char4, text: "Does he have any grapes?", audio: left4Audio, alt: "A boy holding grapes" },
];

const RIGHT_ITEMS = [
  { id: 1, text: "Yes, he has some.", audio: right1Audio },
  { id: 2, text: "No, he hasn't any.", audio: right2Audio },
  { id: 3, text: "Yes, she has some.", audio: right3Audio },
  { id: 4, text: "Yes, he has a little.", audio: right4Audio },
];

const CORRECT_MATCHES = { 1: 4, 2: 3, 3: 2, 4: 1 };

export default function WB_ReadLookMatch_PageA() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [matches, setMatches] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [paths, setPaths] = useState([]);
  const [lockedLeftIds, setLockedLeftIds] = useState([]);
  const [wrongLeftIds, setWrongLeftIds] = useState([]);
  const [keyboardOrigin, setKeyboardOrigin] = useState(null);
  const [keyboardTarget, setKeyboardTarget] = useState(null);
  const [keyboardPreview, setKeyboardPreview] = useState(null);
  const [dragOrigin, setDragOrigin] = useState(null);
  const [dragPreview, setDragPreview] = useState(null);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit3Audio();

  const boardRef = useRef(null);
  const pointRefs = useRef({});
  const leftRefs = useRef({});
  const rightRefs = useRef({});
  const dragMovedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const commitMatchRef = useRef(null);

  useLayoutEffect(() => {
    const update = () => {
      if (!boardRef.current) return;
      const br = boardRef.current.getBoundingClientRect();

      const newPaths = Object.entries(matches)
        .map(([leftId, rightId]) => {
          const s = pointRefs.current[`left-${leftId}`];
          const e = pointRefs.current[`right-${rightId}`];
          if (!s || !e) return null;

          const sr = s.getBoundingClientRect();
          const er = e.getBoundingClientRect();
          const x1 = sr.right - br.left; // ← من يمين الـ dot اليسار
          const y1 = sr.top + sr.height / 2 - br.top;
          const x2 = er.left - br.left; // ← من يسار الـ dot اليمين
          const y2 = er.top + er.height / 2 - br.top;
          const dx = Math.abs(x2 - x1);
          const isWrong = wrongLeftIds.includes(Number(leftId));

          return {
            id: `path-${leftId}-${rightId}`,
            d: `M ${x1} ${y1} C ${x1 + dx * 0.42} ${y1}, ${x2 - dx * 0.42} ${y2}, ${x2} ${y2}`,
            color: isWrong ? WRONG_COLOR : PATH_COLOR,
          };
        })
        .filter(Boolean);

      setPaths(newPaths);
    };

    update();
    window.addEventListener("resize", update);
    let obs;
    if (boardRef.current && typeof ResizeObserver !== "undefined") {
      obs = new ResizeObserver(update);
      obs.observe(boardRef.current);
    }
    return () => {
      window.removeEventListener("resize", update);
      obs?.disconnect();
    };
  }, [matches, wrongLeftIds]);

  const focusAndReveal = (element) => window.requestAnimationFrame(() => {
    element?.focus({ preventScroll: true });
    element?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  const getCenter = (side, id) => {
    const element = pointRefs.current[`${side}-${id}`];
    const board = boardRef.current;
    if (!element || !board) return null;
    const rect = element.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();
    return {
      x: rect.left - boardRect.left + rect.width / 2,
      y: rect.top - boardRect.top + rect.height / 2,
    };
  };

  const isLeftLocked = (id) => lockedLeftIds.includes(Number(id));
  const isRightLocked = (id) =>
    Object.entries(matches).some(
      ([leftId, rightId]) => Number(rightId) === Number(id) && isLeftLocked(leftId),
    );
  const isEndpointLocked = (side, id) =>
    side === "left" ? isLeftLocked(id) : isRightLocked(id);

  const clearMatchingModes = () => {
    setSelectedEndpoint(null);
    setKeyboardOrigin(null);
    setKeyboardTarget(null);
    setKeyboardPreview(null);
    setDragOrigin(null);
    setDragPreview(null);
  };

  const commitMatch = (leftId, rightId) => {
    const numericLeft = Number(leftId);
    const numericRight = Number(rightId);
    if (showAns || isLeftLocked(numericLeft) || isRightLocked(numericRight)) return;
    const displacedLeft = Number(
      Object.keys(matches).find(
        (key) => Number(key) !== numericLeft && Number(matches[key]) === numericRight,
      ),
    ) || null;
    setMatches((prev) => {
      const next = { ...prev };
      delete next[numericLeft];
      Object.keys(next).forEach((key) => {
        if (Number(next[key]) === numericRight) {
          delete next[key];
        }
      });
      next[numericLeft] = numericRight;
      return next;
    });
    setWrongLeftIds((prev) =>
      prev.filter((id) => id !== numericLeft && id !== displacedLeft),
    );
    clearMatchingModes();
  };
  commitMatchRef.current = commitMatch;

  const getAvailableTargets = (origin) =>
    origin.side === "left"
      ? RIGHT_ITEMS.filter((item) => !isRightLocked(item.id)).map((item) => item.id)
      : LEFT_ITEMS.filter((item) => !isLeftLocked(item.id)).map((item) => item.id);

  const handleEndpointClick = (side, id) => {
    const numericId = Number(id);
    if (showAns || isEndpointLocked(side, numericId)) return;
    if (side === "left") {
      setWrongLeftIds((prev) => prev.filter((entry) => entry !== numericId));
    }
    if (!selectedEndpoint) {
      setSelectedEndpoint({ side, id: numericId });
      return;
    }
    if (selectedEndpoint.side === side) {
      setSelectedEndpoint(
        selectedEndpoint.id === numericId ? null : { side, id: numericId },
      );
      return;
    }
    const leftId = side === "left" ? numericId : selectedEndpoint.id;
    const rightId = side === "right" ? numericId : selectedEndpoint.id;
    commitMatch(leftId, rightId);
  };

  const startKeyboardMatch = (side, id) => {
    const numericId = Number(id);
    if (showAns || isEndpointLocked(side, numericId)) return;
    const origin = { side, id: numericId };
    const available = getAvailableTargets(origin);
    if (!available.length) return;
    setSelectedEndpoint(null);
    setKeyboardOrigin(origin);
    setKeyboardTarget(null);
    setKeyboardPreview(null);
    const first = available[0];
    focusAndReveal(
      side === "left" ? rightRefs.current[first] : leftRefs.current[first],
    );
  };

  const updateKeyboardPreview = (side, id) => {
    if (!keyboardOrigin || keyboardOrigin.side === side) return;
    const from = getCenter(keyboardOrigin.side, keyboardOrigin.id);
    const to = getCenter(side, id);
    if (!from || !to) return;
    setKeyboardTarget({ side, id: Number(id) });
    setKeyboardPreview({ x1: from.x, y1: from.y, x2: to.x, y2: to.y });
  };

  const playEndpointAudio = (side, id) => {
    const item = side === "left"
      ? LEFT_ITEMS.find((entry) => entry.id === Number(id))
      : RIGHT_ITEMS.find((entry) => entry.id === Number(id));
    playAudio(`${side}-${id}`, item?.audio);
  };

  const handleEndpointKeyDown = (event, side, id) => {
    const numericId = Number(id);
    if (!keyboardOrigin) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        playEndpointAudio(side, numericId);
        startKeyboardMatch(side, numericId);
      }
      return;
    }
    if (keyboardOrigin.side === side) return;
    if (event.key === "Tab") {
      event.preventDefault();
      event.stopPropagation();
      const available = getAvailableTargets(keyboardOrigin);
      const current = available.indexOf(numericId);
      const direction = event.shiftKey ? -1 : 1;
      const next = available[(current + direction + available.length) % available.length];
      focusAndReveal(
        keyboardOrigin.side === "left" ? rightRefs.current[next] : leftRefs.current[next],
      );
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      playEndpointAudio(side, numericId);
      const origin = keyboardOrigin;
      const leftId = side === "left" ? numericId : origin.id;
      const rightId = side === "right" ? numericId : origin.id;
      commitMatch(leftId, rightId);
      focusAndReveal(
        origin.side === "left" ? leftRefs.current[origin.id] : rightRefs.current[origin.id],
      );
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      const origin = keyboardOrigin;
      clearMatchingModes();
      focusAndReveal(
        origin.side === "left" ? leftRefs.current[origin.id] : rightRefs.current[origin.id],
      );
    }
  };

  const beginPointerMatch = (event, side, id) => {
    if (event.button !== undefined && event.button !== 0) return;
    if (showAns || isEndpointLocked(side, id)) return;
    dragMovedRef.current = false;
    setDragOrigin({
      side,
      id: Number(id),
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    });
    setDragPreview(null);
  };

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!dragOrigin || dragOrigin.pointerId !== event.pointerId) return;
      if (Math.hypot(event.clientX - dragOrigin.x, event.clientY - dragOrigin.y) <= 5) return;
      dragMovedRef.current = true;
      const from = getCenter(dragOrigin.side, dragOrigin.id);
      const boardRect = boardRef.current?.getBoundingClientRect();
      if (!from || !boardRect) return;
      setDragPreview({
        x1: from.x,
        y1: from.y,
        x2: event.clientX - boardRect.left,
        y2: event.clientY - boardRect.top,
      });
    };
    const finishPointerMatch = (event) => {
      if (!dragOrigin || dragOrigin.pointerId !== event.pointerId) return;
      if (dragMovedRef.current) {
        const target = document
          .elementFromPoint(event.clientX, event.clientY)
          ?.closest("[data-match-side]");
        if (target && target.dataset.matchSide !== dragOrigin.side) {
          const targetId = Number(target.dataset.matchId);
          const leftId = dragOrigin.side === "left" ? dragOrigin.id : targetId;
          const rightId = dragOrigin.side === "right" ? dragOrigin.id : targetId;
          commitMatchRef.current?.(leftId, rightId);
          suppressClickRef.current = true;
        }
      }
      setDragOrigin(null);
      setDragPreview(null);
      dragMovedRef.current = false;
      window.setTimeout(() => { suppressClickRef.current = false; }, 0);
    };
    const cancelPointerMatch = () => {
      setDragOrigin(null);
      setDragPreview(null);
      dragMovedRef.current = false;
    };
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", finishPointerMatch);
    window.addEventListener("pointercancel", cancelPointerMatch);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", finishPointerMatch);
      window.removeEventListener("pointercancel", cancelPointerMatch);
    };
  }, [dragOrigin, lockedLeftIds, matches, showAns]);

  const handleCheck = () => {
    if (showAns || lockedLeftIds.length === LEFT_ITEMS.length) return;
    const allConnected = LEFT_ITEMS.every((i) => matches[i.id]);
    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }
    clearMatchingModes();
    let score = 0;
    LEFT_ITEMS.forEach((i) => {
      if (matches[i.id] === CORRECT_MATCHES[i.id]) score++;
    });
    setShowResults(true);
    setLockedLeftIds(LEFT_ITEMS.filter((item) => matches[item.id] === CORRECT_MATCHES[item.id]).map((item) => item.id));
    setWrongLeftIds(LEFT_ITEMS.filter((item) => matches[item.id] !== CORRECT_MATCHES[item.id]).map((item) => item.id));
    const total = LEFT_ITEMS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    setMatches({ ...CORRECT_MATCHES });
    setShowResults(true);
    setShowAns(true);
    clearMatchingModes();
    setLockedLeftIds(LEFT_ITEMS.map((item) => item.id));
    setWrongLeftIds([]);
    stopAudio();
  };

  const handleStartAgain = () => {
    clearMatchingModes();
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setPaths([]);
    setLockedLeftIds([]);
    setWrongLeftIds([]);
    stopAudio();
  };

  const getLeftConn = (id) => !!matches[id];
  const getRightConn = (id) => Object.values(matches).includes(id);
  const isWrongMatch = (leftId) =>
    wrongLeftIds.includes(leftId);

  const WrongBadge = () => (
    <div
      style={{
        position: "absolute",
        top: "-10px",
        right: "-10px",
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        backgroundColor: "red",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "700",
        border: "2px solid white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
      }}
    >
      ✕
    </div>
  );

  /* ─────────────────────────────────────────────
     Grid layout (6 cols):
     [num] [img] [left-sentence] [left-dot]   [right-dot] [right-sentence]
     ↑auto  ↑auto  ↑1fr           ↑dot-col      ↑dot-col    ↑1fr

     المشكلة الأصلية: الـ dot-cols كانوا "auto" بدون gap كافي بينهم
     الحل: نعطي المنطقة الوسطى عرض ثابت clamp يحكم المسافة بين النقطتين
  ───────────────────────────────────────────── */
  const GRID = {
    display: "grid",
    gridTemplateColumns:
      "auto auto 1fr clamp(14px,2vw,22px) clamp(40px, 9vw, 88px) clamp(14px,2vw,22px) 1fr",
    /*                                    ↑ left-dot             ↑ gap spacer          ↑ right-dot  */
    columnGap: "clamp(8px,1.2vw,16px)",
    rowGap: "clamp(14px,2vw,28px)",
    alignItems: "center",
    width: "100%",
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{gap:"40px"}}>
        <ExerciseHeader sectionLetter="A" title="Read, look, and match." subTitle="Read each any/some question to the correct answer first, then connect it to the matching picture or answer one pair at a time." />

        {/* Board */}
        <div ref={boardRef} style={{ position: "relative", width: "100%" }}>
          {/* SVG lines */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
              zIndex: 1,
            }}
          >
            {paths.map((p) => (
              <path
                key={p.id}
                d={p.d}
                fill="none"
                stroke={p.color}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            ))}
            {dragPreview && (
              <line
                x1={dragPreview.x1}
                y1={dragPreview.y1}
                x2={dragPreview.x2}
                y2={dragPreview.y2}
                stroke={PATH_COLOR}
                strokeWidth="3.5"
                strokeDasharray="7 5"
                strokeLinecap="round"
              />
            )}
            {keyboardOrigin && keyboardTarget && keyboardPreview && (
              <line
                x1={keyboardPreview.x1}
                y1={keyboardPreview.y1}
                x2={keyboardPreview.x2}
                y2={keyboardPreview.y2}
                stroke={PATH_COLOR}
                strokeWidth="3.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            )}
          </svg>

          <div style={GRID}>
            {LEFT_ITEMS.map((lItem, idx) => {
              const rItem = RIGHT_ITEMS[idx];
              const lConn = getLeftConn(lItem.id);
              const rConn = getRightConn(rItem.id);
              const activeEndpoint = selectedEndpoint || keyboardOrigin;
              const lSelected = activeEndpoint?.side === "left" && activeEndpoint.id === lItem.id;
              const rSelected = activeEndpoint?.side === "right" && activeEndpoint.id === rItem.id;
              const leftLocked = isLeftLocked(lItem.id);
              const rightLocked = isRightLocked(rItem.id);
              const wrong = isWrongMatch(lItem.id);

              return (
                <React.Fragment key={lItem.id}>
                  {/* col 1 – number */}
                  <span
                    style={{
                      fontSize: "clamp(16px,1.7vw,20px)",
                      fontWeight: 700,
                      color: TEXT_COLOR,
                      lineHeight: 1,
                      flexShrink: 0,
                      zIndex: 2,
                    }}
                  >
                    {lItem.id}
                  </span>

                  {/* col 2 – image */}
                  <div
                    data-match-side="left"
                    data-match-id={lItem.id}
                    onPointerDown={(event) => beginPointerMatch(event, "left", lItem.id)}
                    onClick={() => { if (!suppressClickRef.current) handleEndpointClick("left", lItem.id); }}
                    style={{
                      width: "clamp(52px,7vw,90px)",
                      aspectRatio: "1 / 1",
                      flexShrink: 0,
                      zIndex: 2,
                      cursor: showAns || leftLocked ? "default" : "pointer",
                      overflow: "hidden",
                      borderRadius: "clamp(6px,0.8vw,12px)",
                      border: `1px solid ${lSelected ? ACTIVE_COLOR : "transparent"}`,
                      background: "#f7f7f7",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                      touchAction: "none",
                    }}
                  >
                    <img
                      src={lItem.img}
                      alt={lItem.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    />
                  </div>

                  {/* col 3 – left sentence */}
                  <div
                    ref={(element) => { leftRefs.current[lItem.id] = element; }}
                    className="wb-unit3-audio-control wb-unit3-interactive"
                    role="button"
                    tabIndex={0}
                    data-match-side="left"
                    data-match-id={lItem.id}
                    aria-label={leftLocked ? `${lItem.text} Correct. Press Enter or Space to hear it.` : `${lItem.text} Press Enter or Space to hear it and start matching.`}
                    aria-pressed={lSelected}
                    aria-disabled={leftLocked}
                    onFocus={() => updateKeyboardPreview("left", lItem.id)}
                    onClick={() => {
                      if (suppressClickRef.current) return;
                      playEndpointAudio("left", lItem.id);
                      handleEndpointClick("left", lItem.id);
                    }}
                    onPointerDown={(event) => beginPointerMatch(event, "left", lItem.id)}
                    onKeyDown={(event) => handleEndpointKeyDown(event, "left", lItem.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      minWidth: 0,
                      zIndex: 2,
                      padding: "clamp(4px,0.6vw,8px) clamp(8px,1vw,14px)",
                      borderRadius: "clamp(8px,1vw,12px)",
                      border: lSelected
                        ? `1.5px solid ${ACTIVE_COLOR}`
                        : "2px solid transparent",
                      background: lSelected
                        ? "rgba(243,155,66,0.08)"
                        : "transparent",
                      cursor: showAns || leftLocked ? "default" : "pointer",
                      transition: "border-color 0.2s, background 0.2s",
                      userSelect: "none",
                      position: "relative",
                      touchAction: "none",
                    }}
                  >
                    <WorkbookUnit3PlayingAudioIcon active={activeAudioKey === `left-${lItem.id}`} />
                    <span
                      style={{
                        fontSize: "clamp(13px,1.4vw,18px)",
                        // fontWeight: 500,
                        color: wrong
                          ? WRONG_COLOR
                          : lSelected
                            ? ACTIVE_COLOR
                            : TEXT_COLOR,
                        lineHeight: 1.3,
                        wordBreak: "break-word",
                        transition: "color 0.2s",
                      }}
                    >
                      {lItem.text}
                    </span>
                    {wrong && <WrongBadge />}
                  </div>

                  {/* col 4 – left dot */}
                  <div
                    ref={(el) => (pointRefs.current[`left-${lItem.id}`] = el)}
                    data-match-side="left"
                    data-match-id={lItem.id}
                    aria-hidden="true"
                    onPointerDown={(event) => beginPointerMatch(event, "left", lItem.id)}
                    onClick={() => { if (!suppressClickRef.current) handleEndpointClick("left", lItem.id); }}
                    style={{
                      width: "clamp(10px,1.3vw,16px)",
                      height: "clamp(10px,1.3vw,16px)",
                      borderRadius: "50%",
                      justifySelf: "end", // ← يلتصق بيمين الخلية
                      flexShrink: 0,
                      background: lSelected
                        ? ACTIVE_COLOR
                        : lConn
                          ? wrong
                            ? WRONG_COLOR
                            : ACTIVE_COLOR
                          : DOT_COLOR,
                      cursor: showAns || leftLocked ? "default" : "pointer",
                      transition: "background 0.2s",
                      boxShadow: lSelected
                        ? "0 0 0 3px rgba(243,155,66,0.3)"
                        : "none",
                      zIndex: 2,
                      touchAction: "none",
                    }}
                  />

                  {/* col 5 – spacer (المسافة الفعلية بين النقطتين) */}
                  <div style={{ height: "100%" }} />

                  {/* col 6 – right dot */}
                  <div
                    ref={(el) => (pointRefs.current[`right-${rItem.id}`] = el)}
                    data-match-side="right"
                    data-match-id={rItem.id}
                    aria-hidden="true"
                    onPointerDown={(event) => beginPointerMatch(event, "right", rItem.id)}
                    onClick={() => { if (!suppressClickRef.current) handleEndpointClick("right", rItem.id); }}
                    style={{
                      width: "clamp(10px,1.3vw,16px)",
                      height: "clamp(10px,1.3vw,16px)",
                      borderRadius: "50%",
                      justifySelf: "start", // ← يلتصق بيسار الخلية
                      flexShrink: 0,
                      background: rSelected || rConn ? ACTIVE_COLOR : DOT_COLOR,
                      cursor: showAns || rightLocked ? "default" : "pointer",
                      transition: "background 0.2s",
                      zIndex: 2,
                      boxShadow: rSelected ? "0 0 0 3px rgba(243,155,66,0.3)" : "none",
                      touchAction: "none",
                    }}
                  />

                  {/* col 7 – right sentence */}
                  <div
                    ref={(element) => { rightRefs.current[rItem.id] = element; }}
                    data-match-side="right"
                    data-match-id={rItem.id}
                    className="wb-unit3-audio-control wb-unit3-interactive"
                    role="button"
                    tabIndex={0}
                    aria-label={rightLocked ? `${rItem.text} Correct and locked.` : `${rItem.text} Press Enter or Space to start or complete matching.`}
                    aria-pressed={rSelected}
                    aria-disabled={rightLocked}
                    onFocus={() => updateKeyboardPreview("right", rItem.id)}
                    onClick={() => {
                      if (suppressClickRef.current) return;
                      playEndpointAudio("right", rItem.id);
                      handleEndpointClick("right", rItem.id);
                    }}
                    onPointerDown={(event) => beginPointerMatch(event, "right", rItem.id)}
                    onKeyDown={(event) => handleEndpointKeyDown(event, "right", rItem.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      minWidth: 0,
                      zIndex: 2,
                      padding: "clamp(4px,0.6vw,8px) clamp(8px,1vw,14px)",
                      cursor: showAns || rightLocked ? "default" : "pointer",
                      userSelect: "none",
                      borderRadius: "clamp(8px,1vw,12px)",
                      border: rSelected ? `1.5px solid ${ACTIVE_COLOR}` : "2px solid transparent",
                      background: rSelected ? "rgba(243,155,66,0.08)" : "transparent",
                      position: "relative",
                      touchAction: "none",
                    }}
                  >
                    <WorkbookUnit3PlayingAudioIcon active={activeAudioKey === `right-${rItem.id}`} />
                    <span
                      style={{
                        fontSize: "clamp(13px,1.4vw,18px)",
                        // fontWeight: 500,
                        color: TEXT_COLOR,
                        lineHeight: 1.3,
                        wordBreak: "break-word",
                      }}
                    >
                      {rItem.text}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // marginTop: "clamp(8px,1.5vw,16px)",
            zIndex: 100,
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}
