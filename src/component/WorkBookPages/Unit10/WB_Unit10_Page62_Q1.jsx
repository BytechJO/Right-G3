import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useWorkbookMatchingKeyboard from "../Unit4/useWorkbookMatchingKeyboard";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 62/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 62/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 62/SVG/3.svg";
import sentence1Audio from "../../../assets/audio/WorkBook/unit10/Page 62 - Exercise A/Item_001_A_bear_is_in_a_dress_and_dreams_at_its_desk.mp3";
import sentence2Audio from "../../../assets/audio/WorkBook/unit10/Page 62 - Exercise A/Item_002_Tracy_and_Trudy_trade_trucks_on_the_tree.mp3";
import sentence3Audio from "../../../assets/audio/WorkBook/unit10/Page 62 - Exercise A/Item_003_The_crabs_cry_as_they_cross_the_creek.mp3";

const DOT_COLOR = "#9ca3af";
const ACTIVE_COLOR = "#f39b42";
const BORDER_COLOR = "#e0e0e0";
const WRONG_COLOR = "red";
const PATH_COLOR = "#f39b42";
const TEXT_COLOR = "#111";

const LEFT_ITEMS = [
  {
    id: 1,
    text: "A bear is in a dress and dreams at its desk.",
    audio: sentence1Audio,
  },
  {
    id: 2,
    text: "Tracy and Trudy trade trucks on the tree.",
    audio: sentence2Audio,
  },
  {
    id: 3,
    text: "The crabs cry as they cross the creek.",
    audio: sentence3Audio,
  },
];

const RIGHT_ITEMS = [
  { id: 1, img: img1, alt: "Crabs crossing a creek" },
  { id: 2, img: img2, alt: "A bear in a dress dreaming at a desk" },
  { id: 3, img: img3, alt: "Tracy and Trudy trading trucks by a tree" },
];

const CORRECT_MATCHES = { 1: 2, 2: 3, 3: 1 };

export default function WB_ReadAndMatch_PageA() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [paths, setPaths] = useState([]);
  const [lockedIds, setLockedIds] = useState([]);
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
          const x1 = sr.left + sr.width / 2 - br.left;
          const y1 = sr.top + sr.height / 2 - br.top;
          const x2 = er.left + er.width / 2 - br.left;
          const y2 = er.top + er.height / 2 - br.top;
          const dx = Math.abs(x2 - x1);

          return {
            id: `path-${leftId}-${rightId}`,
            d: `M ${x1} ${y1} C ${x1 + dx * 0.42} ${y1}, ${x2 - dx * 0.42} ${y2}, ${x2} ${y2}`,
            color: PATH_COLOR,
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
    if (showAns || lockedIds.includes(Number(leftId))) return;
    if (lockedIds.some((id) => matches[id] === Number(rightId))) return;
    const upd = { ...matches };
    Object.keys(upd).forEach((key) => {
      if (upd[key] === Number(rightId) && !lockedIds.includes(Number(key)))
        delete upd[key];
    });
    upd[leftId] = Number(rightId);
    setMatches(upd);
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const handleLeftSelect = (id) => {
    if (showAns || lockedIds.includes(id)) return;
    if (selectedRight !== null) {
      commitMatch(id, selectedRight);
      return;
    }
    setSelectedLeft((prev) => (prev === id ? null : id));
    setSelectedRight(null);
    setShowResults(false);
  };

  const handleRightSelect = (rightId) => {
    if (showAns || lockedIds.some((id) => matches[id] === rightId)) return;
    if (selectedLeft !== null) commitMatch(selectedLeft, rightId);
    else {
      setSelectedRight((prev) => (prev === rightId ? null : rightId));
      setSelectedLeft(null);
    }
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === LEFT_ITEMS.length) return;
    const allConnected = LEFT_ITEMS.every((i) => matches[i.id]);
    if (!allConnected) {
      ValidationAlert.info("Please connect all sentences first.");
      return;
    }
    let score = 0;
    LEFT_ITEMS.forEach((i) => {
      if (matches[i.id] === CORRECT_MATCHES[i.id]) score++;
    });
    setShowResults(true);
    setLockedIds(
      LEFT_ITEMS.filter(
        (item) => matches[item.id] === CORRECT_MATCHES[item.id],
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
  };

  const handleStartAgain = () => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setPaths([]);
    setLockedIds([]);
    keyboard.clear();
    stopAudio();
  };

  const getLeftConn = (id) => !!matches[id];
  const getRightConn = (id) => Object.values(matches).includes(id);
  const isWrongMatch = (leftId) =>
    showResults &&
    !showAns &&
    !!matches[leftId] &&
    matches[leftId] !== CORRECT_MATCHES[leftId];

  const getEndpoint = useCallback(
    (side, id) =>
      pointRefs.current[`${side}-group-${id}`] ||
      pointRefs.current[`${side}-${id}`],
    [],
  );
  const getAnchorElement = useCallback(
    (side, id) => pointRefs.current[`${side}-${id}`],
    [],
  );
  const isRightLocked = (id) =>
    lockedIds.some((leftId) => matches[leftId] === id);
  const keyboard = useWorkbookMatchingKeyboard({
    boardRef,
    leftIds: LEFT_ITEMS.map((item) => item.id),
    rightIds: RIGHT_ITEMS.map((item) => item.id),
    getElement: getEndpoint,
    getAnchorElement,
    isLeftLocked: (id) => showAns || lockedIds.includes(id),
    isRightLocked: (id) => showAns || isRightLocked(id),
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
        top: "-7px",
        left: "-7px",
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

        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      ✕
    </div>
  );

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "50px",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="A"
          title="Read and match."
          subTitle="Read each cr, dr, or tr sentence to the matching picture first, then connect it to the matching picture or answer one pair at a time."
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
              // overflow: "visible",
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
                strokeDasharray="7 7"
                className="unit4-matching-preview"
              />
            )}
          </svg>

          {/* Grid: sentence | left-dot | right-dot | image */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "clamp(10px,2vw,28px)",
              rowGap: "clamp(18px,3vw,36px)",
              alignItems: "center",
              width: "100%",
            }}
          >
            {LEFT_ITEMS.map((lItem, idx) => {
              const rItem = RIGHT_ITEMS[idx];
              const lConn = getLeftConn(lItem.id);
              const rConn = getRightConn(rItem.id);
              const lSelected = selectedLeft === lItem.id;
              const wrong = isWrongMatch(lItem.id);
              const rSelected = selectedRight === rItem.id;
              return (
                <React.Fragment key={lItem.id}>
                  {/* ── sentence ── */}
                  <div
                    ref={(el) => {
                      pointRefs.current[`left-group-${lItem.id}`] = el;
                    }}
                    role="button"
                    tabIndex={showAns || lockedIds.includes(lItem.id) ? -1 : 0}
                    aria-disabled={showAns || lockedIds.includes(lItem.id)}
                    aria-label={`Match: ${lItem.text}`}
                    className="unit4-interactive unit4-audio-control"
                    onClick={() => {
                      if (showAns || lockedIds.includes(lItem.id)) return;
                      playAudio(`sentence-${lItem.id}`, lItem.audio);
                      handleLeftSelect(lItem.id);
                    }}
                    onKeyDown={(event) => {
                      keyboard.handleKeyDown(event, "left", lItem.id);
                      if (
                        (event.key === "Enter" || event.key === " ") &&
                        !showAns &&
                        !lockedIds.includes(lItem.id)
                      )
                        playAudio(`sentence-${lItem.id}`, lItem.audio);
                    }}
                    onFocus={() => keyboard.handleFocus("left", lItem.id)}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(6px,0.9vw,12px)",
                      minWidth: 0,
                      zIndex: 2,
                      padding: "clamp(4px,0.6vw,8px) clamp(8px,1vw,14px)",
                      borderRadius: "clamp(8px,1vw,12px)",
                      border: lSelected
                        ? `1px solid ${ACTIVE_COLOR}`
                        : wrong
                          ? "2px solid red"
                          : "1px solid transparent",
                      background: lSelected
                        ? "rgba(243,155,66,0.08)"
                        : "transparent",
                      cursor: showAns ? "default" : "pointer",
                      transition: "border-color 0.2s, background 0.2s",
                      userSelect: "none",
                    }}
                  >
                    {/* number */}
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: 500,
                        color: TEXT_COLOR,
                        lineHeight: 1,
                        // flexShrink: 0,
                      }}
                    >
                      {lItem.id}
                    </span>

                    {/* text */}
                    <span
                      style={{
                        fontSize: "18px",
                        // fontWeight: 500,
                        color: lSelected ? ACTIVE_COLOR : TEXT_COLOR,
                        lineHeight: 1.3,
                        width: "100%",
                        wordBreak: "break-word",
                        transition: "color 0.2s",
                      }}
                    >
                      {lItem.text}
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `sentence-${lItem.id}`}
                      />
                    </span>

                    {/* wrong badge يسار */}
                    {wrong && <WrongBadge />}
                    {/* ── left dot ── */}
                    <div
                      ref={(el) => (pointRefs.current[`left-${lItem.id}`] = el)}
                      style={{
                        width: "clamp(10px,1.3vw,16px)",
                        height: "clamp(10px,1.3vw,16px)",
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: lSelected
                          ? ACTIVE_COLOR
                          : lConn
                            ? ACTIVE_COLOR
                            : DOT_COLOR,
                        cursor: showAns ? "default" : "pointer",
                        transition: "background 0.2s",
                        boxShadow: lSelected
                          ? `0 0 0 3px rgba(243,155,66,0.3)`
                          : "none",
                        zIndex: 2,
                      }}
                    />
                  </div>

                  <div className="flex justify-center items-center gap-2">
                    {/* ── right dot ── */}
                    <div
                      ref={(el) =>
                        (pointRefs.current[`right-${rItem.id}`] = el)
                      }
                      style={{
                        width: "clamp(10px,1.3vw,16px)",
                        height: "clamp(10px,1.3vw,16px)",
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: rConn ? ACTIVE_COLOR : DOT_COLOR,
                        cursor:
                          showAns || selectedLeft === null
                            ? "default"
                            : "pointer",
                        transition: "background 0.2s",
                        zIndex: 2,
                      }}
                    />
                    {/* ── image ── */}
                    <div
                      ref={(el) => {
                        pointRefs.current[`right-group-${rItem.id}`] = el;
                      }}
                      role="button"
                      tabIndex={showAns || isRightLocked(rItem.id) ? -1 : 0}
                      aria-disabled={showAns || isRightLocked(rItem.id)}
                      aria-label={`Match picture: ${rItem.alt}`}
                      className="unit4-interactive"
                      onClick={() => handleRightSelect(rItem.id)}
                      onKeyDown={(event) =>
                        keyboard.handleKeyDown(event, "right", rItem.id)
                      }
                      onFocus={() => keyboard.handleFocus("right", rItem.id)}
                      style={{
                        width: "clamp(100px,18vw,200px)",

                        cursor:
                          showAns || isRightLocked(rItem.id)
                            ? "default"
                            : "pointer",

                        border: rSelected
                          ? `2px solid ${ACTIVE_COLOR}`
                          : "2px solid transparent",

                        backgroundColor: rSelected
                          ? "rgba(243,155,66,0.08)"
                          : "transparent",

                        borderRadius: "12px",

                        padding: "5px",

                        transform: rSelected ? "scale(1.04)" : "scale(1)",

                        boxShadow: rSelected
                          ? "0 0 0 3px rgba(243,155,66,0.20)"
                          : "none",

                        transition:
                          "border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s",

                        boxSizing: "border-box",
                        zIndex: 2,
                      }}
                    >
                      <img
                        src={rItem.img}
                        alt={rItem.alt}
                        style={{
                          width: "100%",
                          height: "100%",

                          display: "block",
                          userSelect: "none",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
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
            marginTop: "clamp(8px,1.5vw,16px)",
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
