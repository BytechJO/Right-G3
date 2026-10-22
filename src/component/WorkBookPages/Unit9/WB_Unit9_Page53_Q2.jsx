import React, { useCallback, useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Button from "../Button";
import useWorkbookMatchingKeyboard from "../Unit4/useWorkbookMatchingKeyboard";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/9.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/12.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/11.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/10.svg";
import left1Audio from "../../../assets/audio/WorkBook/unit 9/Page 53 - Exercise F/Item_001_Where_were_they_this_morning.mp3";
import left2Audio from "../../../assets/audio/WorkBook/unit 9/Page 53 - Exercise F/Item_002_Where_is_she_now.mp3";
import left3Audio from "../../../assets/audio/WorkBook/unit 9/Page 53 - Exercise F/Item_003_Where_was_she_this_morning.mp3";
import left4Audio from "../../../assets/audio/WorkBook/unit 9/Page 53 - Exercise F/Item_004_Where_is_he_now.mp3";
import right1Audio from "../../../assets/audio/WorkBook/unit 9/Page 53 - Exercise F/Item_005_She_was_in_the_computer_lab.mp3";
import right2Audio from "../../../assets/audio/WorkBook/unit 9/Page 53 - Exercise F/Item_006_She_is_on_the_playground.mp3";
import right3Audio from "../../../assets/audio/WorkBook/unit 9/Page 53 - Exercise F/Item_007_He_is_at_the_swimming_pool.mp3";
import right4Audio from "../../../assets/audio/WorkBook/unit 9/Page 53 - Exercise F/Item_008_They_were_at_the_circus.mp3";

const DOT_COLOR = "#9ca3af";
const ACTIVE_COLOR = "#f39b42";
const BORDER_COLOR = "#e0e0e0";
const WRONG_COLOR = "red";
const PATH_COLOR = "#f39b42";
const TEXT_COLOR = "#111";

const LEFT_ITEMS = [
  {
    id: 1,
    img: img1,
    alt: "Children at a circus",
    text: "Where were they this morning?",
    audio: left1Audio,
  },
  {
    id: 2,
    img: img2,
    alt: "A girl on a playground",
    text: "Where is she now?",
    audio: left2Audio,
  },
  {
    id: 3,
    img: img3,
    alt: "A girl in a computer lab",
    text: "Where was she this morning?",
    audio: left3Audio,
  },
  {
    id: 4,
    img: img4,
    alt: "A boy at a swimming pool",
    text: "Where is he now?",
    audio: left4Audio,
  },
];

const RIGHT_ITEMS = [
  { id: 1, text: "She was in the computer lab.", audio: right1Audio },
  { id: 2, text: "She is on the playground.", audio: right2Audio },
  { id: 3, text: "He is at the swimming pool.", audio: right3Audio },
  { id: 4, text: "They were at the circus.", audio: right4Audio },
];

const CORRECT_MATCHES = { 1: 4, 2: 2, 3: 1, 4: 3 };

export default function WB_ReadLookMatch_PageA() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [paths, setPaths] = useState([]);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const boardRef = useRef(null);
  const pointRefs = useRef({});

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
          const isWrong =
            showResults && matches[leftId] !== CORRECT_MATCHES[Number(leftId)];

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
  }, [matches, showResults]);

  const commitMatch = (leftId, rightId) => {
    if (showAns || lockedIds.includes(leftId)) return;
    const occupyingLeft = Number(
      Object.keys(matches).find((key) => matches[key] === rightId),
    );
    if (occupyingLeft && lockedIds.includes(occupyingLeft)) return;
    const upd = { ...matches };
    Object.keys(upd).forEach((k) => {
      if (upd[k] === rightId) delete upd[k];
    });
    upd[leftId] = rightId;
    setMatches(upd);
    setSelectedLeft(null);
    setSelectedRight(null);
    setWrongIds((prev) =>
      prev.filter((id) => id !== leftId && id !== occupyingLeft),
    );
  };
  const handleLeftSelect = (id) => {
    if (showAns || lockedIds.includes(id)) return;
    if (selectedRight !== null) commitMatch(id, selectedRight);
    else {
      setSelectedLeft(id);
      setSelectedRight(null);
    }
  };

  const isRightLocked = useCallback(
    (rightId) =>
      showAns ||
      Object.entries(matches).some(
        ([leftId, value]) =>
          Number(value) === rightId && lockedIds.includes(Number(leftId)),
      ),
    [lockedIds, matches, showAns],
  );
  const handleRightSelect = (rightId) => {
    if (isRightLocked(rightId)) return;
    if (selectedLeft !== null) commitMatch(selectedLeft, rightId);
    else {
      setSelectedRight(rightId);
      setSelectedLeft(null);
    }
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === LEFT_ITEMS.length) return;
    const allConnected = LEFT_ITEMS.every((i) => matches[i.id]);
    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }
    let score = 0;
    LEFT_ITEMS.forEach((i) => {
      if (matches[i.id] === CORRECT_MATCHES[i.id]) score++;
    });
    setShowResults(true);
    setLockedIds((prev) => [
      ...new Set([
        ...prev,
        ...LEFT_ITEMS.filter(
          (item) => matches[item.id] === CORRECT_MATCHES[item.id],
        ).map((item) => item.id),
      ]),
    ]);
    setWrongIds(
      LEFT_ITEMS.filter(
        (item) => matches[item.id] !== CORRECT_MATCHES[item.id],
      ).map((item) => item.id),
    );
    const total = LEFT_ITEMS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    setMatches({ ...CORRECT_MATCHES });
    setShowResults(true);
    setShowAns(true);
    setSelectedLeft(null);
    setSelectedRight(null);
    setLockedIds(LEFT_ITEMS.map((item) => item.id));
    setWrongIds([]);
    keyboard.clear();
    stopAudio();
  };

  const handleStartAgain = () => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setPaths([]);
    setLockedIds([]);
    setWrongIds([]);
    keyboard.clear();
    stopAudio();
  };

  const getLeftConn = (id) => !!matches[id];
  const getRightConn = (id) => Object.values(matches).includes(id);
  const isWrongMatch = (leftId) => wrongIds.includes(leftId);

  const getEndpoint = useCallback(
    (side, id) => pointRefs.current[`${side}-${id}`],
    [],
  );
  const keyboard = useWorkbookMatchingKeyboard({
    boardRef,
    leftIds: LEFT_ITEMS.map((item) => item.id),
    rightIds: RIGHT_ITEMS.map((item) => item.id),
    getElement: getEndpoint,
    getAnchorElement: getEndpoint,
    isLeftLocked: (id) => showAns || lockedIds.includes(id),
    isRightLocked,
    onCommit: commitMatch,
    onStart: (side, id) => {
      setSelectedLeft(side === "left" ? id : null);
      setSelectedRight(side === "right" ? id : null);
    },
    onCancel: () => {
      setSelectedLeft(null);
      setSelectedRight(null);
    },
  });

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
      "auto auto 1fr clamp(14px,2vw,22px) clamp(40px, 9vw, 110px) clamp(14px,2vw,22px) 1fr",
    /*                                    ↑ left-dot             ↑ gap spacer          ↑ right-dot  */
    columnGap: "clamp(8px,1.2vw,16px)",
    rowGap: "clamp(14px,2vw,28px)",
    alignItems: "center",
    width: "100%",
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "40px" }}>
        {/* Title */}
        <ExerciseHeader
          sectionLetter="F"
          title="Look, read, and match."
          subTitle="Read each where/when question to the correct answer first, then connect it to the matching picture or answer one pair at a time."
        />

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
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
            {keyboard.preview && (
              <line
                x1={keyboard.preview.x1}
                y1={keyboard.preview.y1}
                x2={keyboard.preview.x2}
                y2={keyboard.preview.y2}
                stroke={ACTIVE_COLOR}
                strokeWidth="3"
                strokeDasharray="7 6"
                strokeLinecap="round"
              />
            )}
          </svg>

          <div style={GRID}>
            {LEFT_ITEMS.map((lItem, idx) => {
              const rItem = RIGHT_ITEMS[idx];
              const lConn = getLeftConn(lItem.id);
              const rConn = getRightConn(rItem.id);
              const lSelected = selectedLeft === lItem.id;
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
                    onClick={() => handleLeftSelect(lItem.id)}
                    style={{
                      zIndex: 2,
                      cursor:
                        showAns || lockedIds.includes(lItem.id)
                          ? "default"
                          : "pointer",
                      overflow: "hidden",
                      // borderRadius: "clamp(6px,0.8vw,12px)",
                      border: `1px solid ${lSelected ? ACTIVE_COLOR : "transparent"}`,
                      // background: "#f7f7f7",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src={lItem.img}
                      alt={lItem.alt}
                      style={{
                        width: "auto",
                        height: "90px",
                        objectFit: "contain",
                        display: "block",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    />
                  </div>

                  {/* col 3 – left sentence */}
                  <div
                    onClick={() => {
                      playAudio(`left-audio-${lItem.id}`, lItem.audio);
                      handleLeftSelect(lItem.id);
                    }}
                    className="unit4-audio-control unit4-interactive"
                    role="button"
                    tabIndex={0}
                    aria-label={`Play: ${lItem.text}`}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        playAudio(`left-audio-${lItem.id}`, lItem.audio);
                      }
                    }}
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
                      cursor: showAns || showResults ? "default" : "pointer",
                      transition: "border-color 0.2s, background 0.2s",
                      userSelect: "none",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(13px,1.4vw,18px)",
                        // fontWeight: 500,
                        // color: wrong
                        //   ? WRONG_COLOR
                        //   : lSelected
                        //     ? ACTIVE_COLOR
                        //     : TEXT_COLOR,
                        lineHeight: 1.3,
                        wordBreak: "break-word",
                        transition: "color 0.2s",
                      }}
                    >
                      {lItem.text}
                    </span>
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `left-audio-${lItem.id}`}
                    />
                    {wrong && <WrongBadge />}
                  </div>

                  {/* col 4 – left dot */}
                  <div
                    ref={(el) => (pointRefs.current[`left-${lItem.id}`] = el)}
                    onClick={() => handleLeftSelect(lItem.id)}
                    role="button"
                    tabIndex={showAns || lockedIds.includes(lItem.id) ? -1 : 0}
                    aria-disabled={showAns || lockedIds.includes(lItem.id)}
                    aria-label={`Match ${lItem.text}`}
                    onKeyDown={(event) =>
                      keyboard.handleKeyDown(event, "left", lItem.id)
                    }
                    onFocus={() => keyboard.handleFocus("left", lItem.id)}
                    className="unit4-interactive"
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
                      cursor:
                        showAns || lockedIds.includes(lItem.id)
                          ? "default"
                          : "pointer",
                      transition: "background 0.2s",
                      boxShadow: lSelected
                        ? "0 0 0 3px rgba(243,155,66,0.3)"
                        : "none",
                      zIndex: 2,
                    }}
                  />

                  {/* col 5 – spacer (المسافة الفعلية بين النقطتين) */}
                  <div style={{ height: "100%" }} />

                  {/* col 6 – right dot */}
                  <div
                    ref={(el) => (pointRefs.current[`right-${rItem.id}`] = el)}
                    onClick={() => handleRightSelect(rItem.id)}
                    role="button"
                    tabIndex={isRightLocked(rItem.id) ? -1 : 0}
                    aria-disabled={isRightLocked(rItem.id)}
                    aria-label={`Match ${rItem.text}`}
                    onKeyDown={(event) =>
                      keyboard.handleKeyDown(event, "right", rItem.id)
                    }
                    onFocus={() => keyboard.handleFocus("right", rItem.id)}
                    className="unit4-interactive"
                    style={{
                      width: "clamp(10px,1.3vw,16px)",
                      height: "clamp(10px,1.3vw,16px)",
                      borderRadius: "50%",
                      justifySelf: "start", // ← يلتصق بيسار الخلية
                      flexShrink: 0,
                      background:
                        selectedRight === rItem.id || rConn
                          ? ACTIVE_COLOR
                          : DOT_COLOR,
                      cursor: isRightLocked(rItem.id) ? "default" : "pointer",
                      transition: "background 0.2s",
                      zIndex: 2,
                    }}
                  />

                  {/* col 7 – right sentence */}
                  <div
                    onClick={() => {
                      playAudio(`right-audio-${rItem.id}`, rItem.audio);
                      handleRightSelect(rItem.id);
                    }}
                    className="unit4-audio-control unit4-interactive"
                    role="button"
                    tabIndex={0}
                    aria-label={`Play: ${rItem.text}`}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        playAudio(`right-audio-${rItem.id}`, rItem.audio);
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      minWidth: 0,
                      zIndex: 2,
                      padding: "clamp(4px,0.6vw,8px) clamp(8px,1vw,14px)",
                      cursor: showAns || showResults ? "default" : "pointer",

                      border:
                        selectedRight === rItem.id
                          ? `1.5px solid ${ACTIVE_COLOR}`
                          : "2px solid transparent",

                      background:
                        selectedRight === rItem.id
                          ? "rgba(243,155,66,0.08)"
                          : "transparent",

                      borderRadius: "clamp(8px,1vw,12px)",
                      transition: "border-color 0.2s, background 0.2s",

                      userSelect: "none",
                    }}
                  >
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
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `right-audio-${rItem.id}`}
                    />
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
