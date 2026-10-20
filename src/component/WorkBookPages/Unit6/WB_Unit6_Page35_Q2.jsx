import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import useWorkbookMatchingKeyboard from "../Unit4/useWorkbookMatchingKeyboard";
import seventhNumberAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise F/Item_001_7th.mp3";
import tenthWordAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise F/Item_002_tenth.mp3";
import eighthNumberAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise F/Item_003_8th.mp3";
import secondWordAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise F/Item_004_second.mp3";
import ninthNumberAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise F/Item_005_9th.mp3";
import seventhWordAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise F/Item_006_seventh.mp3";
import tenthNumberAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise F/Item_007_10th.mp3";
import firstWordAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise F/Item_008_first.mp3";
import ninthWordAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise F/Item_009_ninth.mp3";
import firstNumberAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise F/Item_010_1st.mp3";
import secondNumberAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise F/Item_011_2nd.mp3";
import eighthWordAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise F/Item_012_eighth.mp3";

const DOT_COLOR = "#9ca3af";
const ACTIVE_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const PATH_COLOR = "#f39b42";
const TEXT_COLOR = "#111";

const LEFT_ITEMS = [
  { id: 1, text: "7th" },
  { id: 2, text: "8th" },
  { id: 3, text: "9th" },
  { id: 4, text: "10th" },
  { id: 5, text: "1st" },
  { id: 6, text: "2nd" },
];

const RIGHT_ITEMS = [
  { id: 1, text: "tenth" },
  { id: 2, text: "second" },
  { id: 3, text: "seventh" },
  { id: 4, text: "first" },
  { id: 5, text: "ninth" },
  { id: 6, text: "eighth" },
];

// 7th→seventh, 8th→eighth, 9th→ninth, 10th→tenth, 1st→first, 2nd→second
const CORRECT_MATCHES = { 1: 3, 2: 6, 3: 5, 4: 1, 5: 4, 6: 2 };
const LEFT_AUDIO = {
  1: seventhNumberAudio,
  2: eighthNumberAudio,
  3: ninthNumberAudio,
  4: tenthNumberAudio,
  5: firstNumberAudio,
  6: secondNumberAudio,
};
const RIGHT_AUDIO = {
  1: tenthWordAudio,
  2: secondWordAudio,
  3: seventhWordAudio,
  4: firstWordAudio,
  5: ninthWordAudio,
  6: eighthWordAudio,
};
const IDS = LEFT_ITEMS.map((item) => item.id);

export default function WB_ReadAndMatch_PageF() {
  const [selected, setSelected] = useState(null);
  const [matches, setMatches] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [paths, setPaths] = useState([]);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const boardRef = useRef(null);
  const pointRefs = useRef({});
  const endpointRefs = useRef({});
  const isLeftLocked = useCallback((id) => lockedIds.includes(id), [lockedIds]);
  const isRightLocked = useCallback(
    (id) =>
      Object.keys(matches).some(
        (key) => matches[key] === id && lockedIds.includes(Number(key)),
      ),
    [lockedIds, matches],
  );
  const getElement = useCallback(
    (side, id) => endpointRefs.current[`${side}-${id}`],
    [],
  );
  const getAnchor = useCallback(
    (side, id) => pointRefs.current[`${side}-${id}`],
    [],
  );

  const playEndpoint = (side, id) =>
    playAudio(
      `${side}-${id}`,
      side === "left" ? LEFT_AUDIO[id] : RIGHT_AUDIO[id],
    );

  const commit = (leftId, rightId) => {
    if (showAns || isLeftLocked(leftId) || isRightLocked(rightId)) return;
    setMatches((previous) => {
      const updated = { ...previous };
      Object.keys(updated).forEach((key) => {
        if (updated[key] === rightId && !lockedIds.includes(Number(key)))
          delete updated[key];
      });
      updated[leftId] = rightId;
      return updated;
    });
    setWrongIds((previous) => previous.filter((id) => id !== leftId));
    setSelected(null);
  };

  const choose = (side, id) => {
    playEndpoint(side, id);
    if (showAns || (side === "left" ? isLeftLocked(id) : isRightLocked(id)))
      return;
    if (!selected || selected.side === side) {
      setSelected({ side, id });
      return;
    }
    commit(
      side === "left" ? id : selected.id,
      side === "right" ? id : selected.id,
    );
  };

  const keyboard = useWorkbookMatchingKeyboard({
    boardRef,
    leftIds: IDS,
    rightIds: IDS,
    getElement,
    getAnchorElement: getAnchor,
    isLeftLocked,
    isRightLocked,
    onCommit: commit,
    onStart: (side, id) => {
      setSelected({ side, id });
      playEndpoint(side, id);
    },
    onCancel: () => setSelected(null),
  });

  // ── SVG paths ──
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

          const isWrong = wrongIds.includes(Number(leftId));

          return {
            id: `path-${leftId}-${rightId}`,
            d: `M ${x1} ${y1} C ${x1 + dx * 0.45} ${y1}, ${x2 - dx * 0.45} ${y2}, ${x2} ${y2}`,
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
  }, [matches, wrongIds]);

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
    const correctIds = LEFT_ITEMS.filter(
      (item) => matches[item.id] === CORRECT_MATCHES[item.id],
    ).map((item) => item.id);
    setLockedIds((previous) => [...new Set([...previous, ...correctIds])]);
    setWrongIds(
      LEFT_ITEMS.filter(
        (item) => matches[item.id] !== CORRECT_MATCHES[item.id],
      ).map((item) => item.id),
    );
    setSelected(null);
    keyboard.clear();
    const total = LEFT_ITEMS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    setMatches({ ...CORRECT_MATCHES });
    setShowResults(true);
    setShowAns(true);
    setSelected(null);
    setLockedIds(IDS);
    setWrongIds([]);
    keyboard.clear();
    stopAudio();
  };

  const handleStartAgain = () => {
    setSelected(null);
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

  const WrongBadge = () => (
    <div
      style={{
        position: "absolute",
        top: "-7px",
        right: "-7px",
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        background: "red",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: "bold",
        border: "2px solid white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      ✕
    </div>
  );
  const handleBoardTabOrder = (event) => {
    if (event.key !== "Tab") return;

    // أثناء التوصيل بالكيبورد، خلي الـ hook يتحكم بالتنقل
    if (keyboard.preview) return;

    const order = [
      ...LEFT_ITEMS.map((item) => `left-${item.id}`),
      ...RIGHT_ITEMS.map((item) => `right-${item.id}`),
    ];

    const currentIndex = order.findIndex(
      (key) => endpointRefs.current[key] === event.target,
    );

    if (currentIndex === -1) return;

    const nextIndex = event.shiftKey ? currentIndex - 1 : currentIndex + 1;

    // السماح بالخروج من التمرين طبيعيًا
    if (nextIndex < 0 || nextIndex >= order.length) return;

    event.preventDefault();
    event.stopPropagation();

    const nextElement = endpointRefs.current[order[nextIndex]];

    if (nextElement) {
      nextElement.focus({ preventScroll: true });
      nextElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  };
  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "28px",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="F"
          title="Read and match."
          subTitle="Read each ordinal numeral to its word first, then connect it to the matching picture or answer one pair at a time."
        />

        {/* Board */}
        <div
          ref={boardRef}
          onKeyDownCapture={handleBoardTabOrder}
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          {" "}
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
                {...keyboard.preview}
                className="unit4-keyboard-preview"
                stroke={ACTIVE_COLOR}
                strokeWidth="2"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            )}
          </svg>
          {/* Grid: left text | left dot | right dot | right text */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto 1fr auto",
              columnGap: "clamp(8px,2vw,24px)",
              rowGap: "clamp(14px,2.2vw,28px)",
              alignItems: "center",
              width: "100%",
            }}
          >
            {LEFT_ITEMS.map((lItem, idx) => {
              const rItem = RIGHT_ITEMS[idx];
              const lConn = getLeftConn(lItem.id);
              const rConn = getRightConn(rItem.id);
              const lSelected =
                selected?.side === "left" && selected.id === lItem.id;
              const rSelected =
                selected?.side === "right" && selected.id === rItem.id;
              const wrong = isWrongMatch(lItem.id);

              return (
                <React.Fragment key={lItem.id}>
                  {/* ── Left text ── */}
                  <div
                    ref={(element) => {
                      endpointRefs.current[`left-${lItem.id}`] = element;
                    }}
                    onClick={() => choose("left", lItem.id)}
                    onKeyDown={(event) => {
                      if (
                        isLeftLocked(lItem.id) &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        playEndpoint("left", lItem.id);
                      } else keyboard.handleKeyDown(event, "left", lItem.id);
                    }}
                    onFocus={() => keyboard.handleFocus("left", lItem.id)}
                    role="button"
                    tabIndex={0}
                    aria-disabled={isLeftLocked(lItem.id) || showAns}
                    className="unit4-audio-control unit4-interactive"
                    style={{
                      position: "relative",
                      fontSize: "clamp(16px,2.2vw,30px)",
                      // fontWeight:   700,
                      color: wrong
                        ? TEXT_COLOR
                        : lSelected
                          ? ACTIVE_COLOR
                          : TEXT_COLOR,
                      lineHeight: 1,
                      cursor: isLeftLocked(lItem.id) ? "default" : "pointer",
                      userSelect: "none",
                      padding: "clamp(4px,0.6vw,8px) clamp(10px,1.2vw,16px)",
                      borderRadius: "clamp(8px,1vw,12px)",
                      border: lSelected
                        ? `1px solid ${ACTIVE_COLOR}`
                        : lConn
                          ? `2px solid ${wrong ? WRONG_COLOR : "transparent"}`
                          : "2px solid transparent",
                      background: lSelected
                        ? "rgba(243,155,66,0.08)"
                        : "transparent",
                      transition:
                        "border-color 0.2s, color 0.2s, background 0.2s",
                      whiteSpace: "nowrap",
                      zIndex: 2,
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `left-${lItem.id}`}
                    />
                    {lItem.text}
                    {wrong && <WrongBadge />}
                  </div>

                  {/* ── Left dot ── */}
                  <div
                    ref={(el) => (pointRefs.current[`left-${lItem.id}`] = el)}
                    onClick={() => choose("left", lItem.id)}
                    style={{
                      width: "clamp(10px,1.4vw,16px)",
                      height: "clamp(10px,1.4vw,16px)",
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: lSelected
                        ? ACTIVE_COLOR
                        : lConn
                          ? wrong
                            ? ACTIVE_COLOR
                            : ACTIVE_COLOR
                          : DOT_COLOR,
                      cursor: isLeftLocked(lItem.id) ? "default" : "pointer",
                      transition: "background 0.2s",
                      boxShadow: lSelected
                        ? `0 0 0 3px rgba(243,155,66,0.3)`
                        : "none",
                      zIndex: 2,
                    }}
                  />

                  {/* ── Right dot ── */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      zIndex: 2,
                    }}
                  >
                    <div
                      ref={(el) =>
                        (pointRefs.current[`right-${rItem.id}`] = el)
                      }
                      onClick={() => choose("right", rItem.id)}
                      style={{
                        width: "clamp(10px,1.4vw,16px)",
                        height: "clamp(10px,1.4vw,16px)",
                        borderRadius: "50%",
                        background: rConn ? ACTIVE_COLOR : DOT_COLOR,
                        cursor: isRightLocked(rItem.id) ? "default" : "pointer",
                        transition: "background 0.2s",
                        zIndex: 2,
                      }}
                    />
                  </div>

                  {/* ── Right text ── */}
                  <div
                    ref={(element) => {
                      endpointRefs.current[`right-${rItem.id}`] = element;
                    }}
                    onClick={() => choose("right", rItem.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        if (isRightLocked(rItem.id) || showAns) {
                          event.preventDefault();
                          playEndpoint("right", rItem.id);
                          return;
                        }

                        // الصوت عند اختيار الكلمة بالكيبورد
                        playEndpoint("right", rItem.id);
                      }

                      keyboard.handleKeyDown(event, "right", rItem.id);
                    }}
                    onFocus={() => keyboard.handleFocus("right", rItem.id)}
                    role="button"
                    tabIndex={0}
                    aria-disabled={isRightLocked(rItem.id) || showAns}
                    className="unit4-audio-control unit4-interactive"
                    style={{
                      position: "relative",
                      fontSize: "clamp(16px,2.2vw,30px)",
                      fontWeight: 500,
                      color: TEXT_COLOR,
                      lineHeight: 1,
                      cursor: isRightLocked(rItem.id) ? "default" : "pointer",
                      userSelect: "none",
                      whiteSpace: "nowrap",
                      zIndex: 2,
                      padding: "clamp(4px,0.6vw,8px) clamp(10px,1.2vw,16px)",
                      borderRadius: "clamp(8px,1vw,12px)",
                      border: rSelected
                        ? `1px solid ${ACTIVE_COLOR}`
                        : "2px solid transparent",
                      background: rSelected
                        ? "rgba(243,155,66,0.08)"
                        : "transparent",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `right-${rItem.id}`}
                    />
                    {rItem.text}
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
