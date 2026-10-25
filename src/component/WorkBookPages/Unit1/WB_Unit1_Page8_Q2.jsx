import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

import { FaVolumeUp } from "react-icons/fa";

/* =====================================================
   INSTRUCTION AUDIO
===================================================== */

import sound from "../../../assets/audio/ClassBook/Grade 3/cd1pg8instruction-adult-lady_nlyjQBM0.mp3";

/* =====================================================
   IMAGES
===================================================== */

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 6.svg";

/* =====================================================
   ANSWER AUDIO
===================================================== */

import longIAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise B/Item_001_long_i.mp3";
import shortAAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise B/Item_002_short_a.mp3";
import longEAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise B/Item_003_long_e.mp3";
import shortUAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise B/Item_004_short_u.mp3";
import longUAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise B/Item_005_long_u.mp3";
import longOAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise B/Item_006_long_o.mp3";
import ExerciseHeader from "../../ExerciseHeader";

/* =====================================================
   COLORS
===================================================== */

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#f39b42";
const INACTIVE_COLOR = "#a3a3a3";

/* =====================================================
   DATA
===================================================== */

const EXERCISE_DATA = {
  top: [
    {
      id: 1,
      img: img1,
      alt: "A picture representing the long u sound.",
    },

    {
      id: 2,
      img: img2,
      alt: "A picture representing the long o sound.",
    },

    {
      id: 3,
      img: img3,
      alt: "A picture representing the short a sound.",
    },

    {
      id: 4,
      img: img4,
      alt: "A picture representing the long e sound.",
    },

    {
      id: 5,
      img: img5,
      alt: "A picture representing the short u sound.",
    },

    {
      id: 6,
      img: img6,
      alt: "A picture representing the long i sound.",
    },
  ],

  bottom: [
    {
      id: 1,
      text: "long i",
      audio: longIAudio,
    },

    {
      id: 2,
      text: "short a",
      audio: shortAAudio,
    },

    {
      id: 3,
      text: "long e",
      audio: longEAudio,
    },

    {
      id: 4,
      text: "short u",
      audio: shortUAudio,
    },

    {
      id: 5,
      text: "long u",
      audio: longUAudio,
    },

    {
      id: 6,
      text: "long o",
      audio: longOAudio,
    },
  ],

  correctMatches: {
    1: 5,
    2: 6,
    3: 2,
    4: 3,
    5: 4,
    6: 1,
  },
};

/* =====================================================
   STYLES
===================================================== */

const styles = {
  matchArea: {
    position: "relative",

    width: "100%",

    display: "flex",

    flexDirection: "column",

    gap: "clamp(100px, 20vw, 125px)",

    touchAction: "none",
  },

  topRow: {
    display: "grid",

    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",

    gap: "clamp(8px, 1.8vw, 22px)",

    alignItems: "start",

    width: "100%",
  },

  topItem: {
    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "clamp(8px, 1.3vw, 10px)",

    position: "relative",

    minWidth: 0,
  },

  topNumber: {
    width: "100%",

    paddingLeft: "clamp(2px, 0.5vw, 6px)",

    boxSizing: "border-box",

    fontSize: "clamp(14px, 1.4vw, 18px)",

    fontWeight: "700",

    color: "#111",

    lineHeight: 1,
  },

  topImageBox: {
    width: "clamp(42px, 9vw, 120px)",

    aspectRatio: "1 / 1",

    display: "flex",

    alignItems: "flex-start",

    justifyContent: "center",

    cursor: "pointer",

    borderRadius: "clamp(8px, 1vw, 14px)",

    border: "2px solid transparent",

    transition: "0.2s ease",

    boxSizing: "border-box",

    padding: "4px",

    maxWidth: "100%",

    gap: "10px",

    outline: "none",

    position: "relative",
  },

  topImage: {
    width: "85%",

    height: "100%",

    objectFit: "contain",

    display: "block",

    pointerEvents: "none",
  },

  dot: {
    width: "clamp(10px, 1.4vw, 16px)",

    height: "clamp(10px, 1.4vw, 16px)",

    borderRadius: "50%",

    cursor: "pointer",

    flexShrink: 0,

    position: "relative",

    zIndex: 4,
  },

  bottomRow: {
    display: "grid",

    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",

    gap: "clamp(8px, 1.8vw, 22px)",

    alignItems: "start",

    width: "100%",
  },

  bottomItem: {
    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "clamp(8px, 1.3vw, 10px)",

    position: "relative",

    minWidth: 0,
  },

  bottomLabel: {
    width: "100%",

    minHeight: "clamp(34px, 5vw, 54px)",

    padding: "0 clamp(4px, 1vw, 10px)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "clamp(12px, 1.4vw, 18px)",

    fontWeight: "500",

    color: "#222",

    textAlign: "center",

    lineHeight: 1.1,

    borderRadius: "clamp(8px, 1vw, 14px)",

    border: "2px solid transparent",

    cursor: "pointer",

    boxSizing: "border-box",

    background: "transparent",

    wordBreak: "break-word",

    overflowWrap: "anywhere",

    outline: "none",

    position: "relative",
  },

  wrongBadge: {
    position: "absolute",

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

    border: "2px solid #fff",

    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",

    zIndex: 8,
  },

  buttonsWrap: {
    display: "flex",

    justifyContent: "center",

    width: "100%",
  },
};

/* =====================================================
   COMPONENT
===================================================== */

const WB_Unit1_Page8_Q2 = () => {
  /* =====================================================
     MATCHES
  ===================================================== */

  const [matches, setMatches] = useState({});

  const [lines, setLines] = useState([]);

  /* =====================================================
     CLICK SELECTION
  ===================================================== */

  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  /* =====================================================
     DRAG
  ===================================================== */

  const [dragOrigin, setDragOrigin] = useState(null);

  const [dragPreviewLine, setDragPreviewLine] = useState(null);

  const dragMovedRef = useRef(false);

  const suppressClickRef = useRef(false);

  /* =====================================================
     KEYBOARD
  ===================================================== */

  const [keyboardMatching, setKeyboardMatching] = useState(false);

  const [keyboardOrigin, setKeyboardOrigin] = useState(null);

  const [keyboardTarget, setKeyboardTarget] = useState(null);

  const [keyboardPreviewLine, setKeyboardPreviewLine] = useState(null);

  /* =====================================================
     CHECK
  ===================================================== */

  const [lockedTop, setLockedTop] = useState(new Set());

  const [wrongTop, setWrongTop] = useState([]);

  const [showAns, setShowAns] = useState(false);

  const [checkCompleted, setCheckCompleted] = useState(false);

  /* =====================================================
     REFS
  ===================================================== */

  const containerRef = useRef(null);

  const elementRefs = useRef({});

  const topControlRefs = useRef({});

  const bottomControlRefs = useRef({});

  /* =====================================================
     AUDIO
  ===================================================== */

  const audioRef = useRef(null);

  const [playingBottomId, setPlayingBottomId] = useState(null);

  /* =====================================================
     QUESTION AUDIO
  ===================================================== */

  const stopAtSecond = 6.35;

  const captions = [
    {
      start: 0.6,
      end: 3.44,
      text: "Page eight. Phonics exercise B.",
    },

    {
      start: 4.48,
      end: 5.68,
      text: "Listen and match.",
    },

    {
      start: 6.74,
      end: 9.1,
      text: "1- tube.",
    },

    {
      start: 9.1,
      end: 11.62,
      text: "2- coat.",
    },

    {
      start: 11.62,
      end: 13.34,
      text: "3- jam.",
    },

    {
      start: 13.34,
      end: 15.98,
      text: "4- bee.",
    },

    {
      start: 15.98,
      end: 18.78,
      text: "5- nuts.",
    },

    {
      start: 19.8,
      end: 21.56,
      text: "6- kite.",
    },
  ];

  /* =====================================================
     LOOKUPS
  ===================================================== */

  const bottomToTop = Object.fromEntries(
    Object.entries(matches).map(([topId, bottomId]) => [
      Number(bottomId),
      Number(topId),
    ]),
  );

  /* =====================================================
     LOCK HELPERS
  ===================================================== */

  const isTopLocked = (topId) => lockedTop.has(Number(topId));

  const isBottomLocked = (bottomId) => {
    const connectedTop = bottomToTop[Number(bottomId)];

    return connectedTop ? isTopLocked(connectedTop) : false;
  };

  /* =====================================================
     AUDIO
  ===================================================== */

  const stopBottomAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();

      try {
        audioRef.current.currentTime = 0;
      } catch {
        // ignore
      }

      audioRef.current.onended = null;

      audioRef.current.onerror = null;

      audioRef.current = null;
    }

    setPlayingBottomId(null);
  };

  const playBottomAudio = (item) => {
    if (!item?.audio) {
      return;
    }

    stopBottomAudio();

    const audio = new Audio(item.audio);

    audioRef.current = audio;

    setPlayingBottomId(item.id);

    audio.play().catch(() => {
      if (audioRef.current === audio) {
        audioRef.current = null;
      }

      setPlayingBottomId(null);
    });

    audio.onended = () => {
      if (audioRef.current === audio) {
        audioRef.current = null;
      }

      setPlayingBottomId(null);
    };

    audio.onerror = audio.onended;
  };

  useEffect(() => {
    return () => {
      stopBottomAudio();
    };
  }, []);

  /* =====================================================
     CENTER
  ===================================================== */

  const getCenter = (element) => {
    if (!element || !containerRef.current) {
      return null;
    }

    const elementRect = element.getBoundingClientRect();

    const containerRect = containerRef.current.getBoundingClientRect();

    return {
      x: elementRect.left - containerRect.left + elementRect.width / 2,

      y: elementRect.top - containerRect.top + elementRect.height / 2,
    };
  };

  /* =====================================================
     LINES
  ===================================================== */

  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) {
        return;
      }

      const computed = Object.entries(matches)
        .map(([topId, bottomId]) => {
          const topElement = elementRefs.current[`top-${topId}`];

          const bottomElement = elementRefs.current[`bottom-${bottomId}`];

          const topPoint = getCenter(topElement);

          const bottomPoint = getCenter(bottomElement);

          if (!topPoint || !bottomPoint) {
            return null;
          }

          return {
            id: `line-${topId}-${bottomId}`,

            x1: topPoint.x,

            y1: topPoint.y,

            x2: bottomPoint.x,

            y2: bottomPoint.y,
          };
        })
        .filter(Boolean);

      setLines(computed);
    };

    const rafUpdate = () => requestAnimationFrame(updateLines);

    rafUpdate();

    window.addEventListener("resize", rafUpdate);

    let resizeObserver;

    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(rafUpdate);

      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", rafUpdate);

      resizeObserver?.disconnect();
    };
  }, [matches]);

  /* =====================================================
     COMMIT
     ONE TO ONE
  ===================================================== */

  const commitMatch = (topId, bottomId) => {
    const numericTop = Number(topId);

    const numericBottom = Number(bottomId);

    if (showAns || checkCompleted || isTopLocked(numericTop)) {
      return;
    }

    const existingTop = Object.keys(matches).find(
      (key) => Number(matches[key]) === numericBottom,
    );

    if (
      existingTop &&
      Number(existingTop) !== numericTop &&
      isTopLocked(Number(existingTop))
    ) {
      return;
    }

    setMatches((previous) => {
      const next = {
        ...previous,
      };

      delete next[numericTop];

      Object.keys(next).forEach((key) => {
        if (Number(next[key]) === numericBottom) {
          delete next[key];
        }
      });

      next[numericTop] = numericBottom;

      return next;
    });

    setWrongTop((previous) =>
      previous.filter((id) => id !== numericTop && id !== Number(existingTop)),
    );

    setSelectedEndpoint(null);

    setKeyboardMatching(false);

    setKeyboardOrigin(null);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);

    setDragOrigin(null);

    setDragPreviewLine(null);
  };

  /* =====================================================
     CLICK MATCHING
     BOTH DIRECTIONS
  ===================================================== */

  const handleEndpointClick = (side, id) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;

      return;
    }

    const numericId = Number(id);

    if (showAns || checkCompleted) {
      return;
    }

    if (side === "top" && isTopLocked(numericId)) {
      return;
    }

    if (side === "bottom" && isBottomLocked(numericId)) {
      return;
    }

    setKeyboardMatching(false);

    setKeyboardOrigin(null);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);

    if (!selectedEndpoint) {
      setSelectedEndpoint({
        side,
        id: numericId,
      });

      return;
    }

    if (selectedEndpoint.side === side) {
      if (selectedEndpoint.id === numericId) {
        setSelectedEndpoint(null);
      } else {
        setSelectedEndpoint({
          side,
          id: numericId,
        });
      }

      return;
    }

    const topId = side === "top" ? numericId : selectedEndpoint.id;

    const bottomId = side === "bottom" ? numericId : selectedEndpoint.id;

    commitMatch(topId, bottomId);
  };

  /* =====================================================
     AVAILABLE TARGETS
  ===================================================== */

  const getAvailableTargets = (origin) => {
    if (!origin) {
      return [];
    }

    if (origin.side === "top") {
      return EXERCISE_DATA.bottom
        .filter((bottomItem) => {
          const connectedTop = bottomToTop[bottomItem.id];

          if (!connectedTop) {
            return true;
          }

          if (connectedTop === origin.id) {
            return true;
          }

          return !isTopLocked(connectedTop);
        })
        .map((item) => item.id);
    }

    return EXERCISE_DATA.top
      .filter((topItem) => !isTopLocked(topItem.id))
      .map((item) => item.id);
  };

  /* =====================================================
     KEYBOARD PREVIEW
  ===================================================== */

  const updateKeyboardPreview = (targetSide, targetId) => {
    if (!keyboardMatching || !keyboardOrigin) {
      setKeyboardPreviewLine(null);

      return;
    }

    const originElement =
      elementRefs.current[`${keyboardOrigin.side}-${keyboardOrigin.id}`];

    const targetElement = elementRefs.current[`${targetSide}-${targetId}`];

    const p1 = getCenter(originElement);

    const p2 = getCenter(targetElement);

    if (!p1 || !p2) {
      return;
    }

    setKeyboardPreviewLine({
      x1: p1.x,
      y1: p1.y,

      x2: p2.x,
      y2: p2.y,
    });
  };

  /* =====================================================
     START KEYBOARD MATCH
  ===================================================== */

  const startKeyboardMatch = (side, id) => {
    const numericId = Number(id);

    if (showAns || checkCompleted) {
      return;
    }

    if (side === "top" && isTopLocked(numericId)) {
      return;
    }

    if (side === "bottom" && isBottomLocked(numericId)) {
      return;
    }

    const origin = {
      side,
      id: numericId,
    };

    setSelectedEndpoint(null);

    setKeyboardOrigin(origin);

    setKeyboardMatching(true);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);

    const available = getAvailableTargets(origin);

    if (!available.length) {
      return;
    }

    requestAnimationFrame(() => {
      if (side === "top") {
        bottomControlRefs.current[available[0]]?.focus();
      } else {
        topControlRefs.current[available[0]]?.focus();
      }
    });
  };

  /* =====================================================
     KEYBOARD HANDLER
  ===================================================== */

  const handleEndpointKeyDown = (event, side, id) => {
    const numericId = Number(id);

    /* no active matching */

    if (!keyboardMatching) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        event.stopPropagation();

        if (side === "bottom") {
          const item = EXERCISE_DATA.bottom.find(
            (entry) => entry.id === numericId,
          );

          playBottomAudio(item);

          if (isBottomLocked(numericId)) {
            return;
          }
        }

        startKeyboardMatch(side, numericId);
      }

      return;
    }

    if (keyboardOrigin?.side === side) {
      return;
    }

    /* Tab / Shift Tab */

    if (event.key === "Tab") {
      event.preventDefault();

      event.stopPropagation();

      const available = getAvailableTargets(keyboardOrigin);

      if (!available.length) {
        return;
      }

      const currentIndex = available.indexOf(numericId);

      const nextIndex = event.shiftKey
        ? currentIndex <= 0
          ? available.length - 1
          : currentIndex - 1
        : currentIndex === -1 || currentIndex === available.length - 1
          ? 0
          : currentIndex + 1;

      const nextId = available[nextIndex];

      if (keyboardOrigin.side === "top") {
        bottomControlRefs.current[nextId]?.focus();
      } else {
        topControlRefs.current[nextId]?.focus();
      }

      return;
    }

    /* Enter / Space */

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      event.stopPropagation();

      if (side === "bottom") {
        const item = EXERCISE_DATA.bottom.find(
          (entry) => entry.id === numericId,
        );

        playBottomAudio(item);
      }

      const origin = keyboardOrigin;

      const topId = side === "top" ? numericId : origin.id;

      const bottomId = side === "bottom" ? numericId : origin.id;

      commitMatch(topId, bottomId);

      requestAnimationFrame(() => {
        if (origin.side === "top") {
          topControlRefs.current[origin.id]?.focus();
        } else {
          bottomControlRefs.current[origin.id]?.focus();
        }
      });

      return;
    }

    /* Escape */

    if (event.key === "Escape") {
      event.preventDefault();

      event.stopPropagation();

      const origin = keyboardOrigin;

      setKeyboardMatching(false);

      setKeyboardOrigin(null);

      setKeyboardTarget(null);

      setKeyboardPreviewLine(null);

      requestAnimationFrame(() => {
        if (origin.side === "top") {
          topControlRefs.current[origin.id]?.focus();
        } else {
          bottomControlRefs.current[origin.id]?.focus();
        }
      });
    }
  };

  /* =====================================================
     TARGET FOCUS
  ===================================================== */

  const handleTargetFocus = (side, id) => {
    if (!keyboardMatching || !keyboardOrigin || keyboardOrigin.side === side) {
      return;
    }

    setKeyboardTarget({
      side,
      id,
    });

    updateKeyboardPreview(side, id);
  };

  /* =====================================================
     DRAG START
  ===================================================== */

  const handlePointerDown = (event, side, id) => {
    const numericId = Number(id);

    if (showAns || checkCompleted) {
      return;
    }

    if (side === "top" && isTopLocked(numericId)) {
      return;
    }

    if (side === "bottom" && isBottomLocked(numericId)) {
      return;
    }

    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    dragMovedRef.current = false;

    setDragOrigin({
      side,
      id: numericId,

      pointerId: event.pointerId,
    });

    setDragPreviewLine(null);

    if (side === "bottom") {
      const item = EXERCISE_DATA.bottom.find((entry) => entry.id === numericId);

      playBottomAudio(item);
    }
  };

  /* =====================================================
     POINTER MOVE / UP
  ===================================================== */

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!dragOrigin) {
        return;
      }

      if (
        dragOrigin.pointerId !== undefined &&
        event.pointerId !== dragOrigin.pointerId
      ) {
        return;
      }

      dragMovedRef.current = true;

      const originElement =
        elementRefs.current[`${dragOrigin.side}-${dragOrigin.id}`];

      const p1 = getCenter(originElement);

      if (!p1 || !containerRef.current) {
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();

      setDragPreviewLine({
        x1: p1.x,
        y1: p1.y,

        x2: event.clientX - containerRect.left,

        y2: event.clientY - containerRect.top,
      });
    };

    const handlePointerUp = (event) => {
      if (!dragOrigin) {
        return;
      }

      if (
        dragOrigin.pointerId !== undefined &&
        event.pointerId !== dragOrigin.pointerId
      ) {
        return;
      }

      const target = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest("[data-match-side]");

      if (dragMovedRef.current && target) {
        const targetSide = target.dataset.matchSide;

        const targetId = Number(target.dataset.matchId);

        if (targetSide !== dragOrigin.side) {
          const topId = dragOrigin.side === "top" ? dragOrigin.id : targetId;

          const bottomId =
            dragOrigin.side === "bottom" ? dragOrigin.id : targetId;

          commitMatch(topId, bottomId);

          suppressClickRef.current = true;
        }
      }

      setDragOrigin(null);

      setDragPreviewLine(null);

      dragMovedRef.current = false;
    };

    const handlePointerCancel = () => {
      setDragOrigin(null);

      setDragPreviewLine(null);

      dragMovedRef.current = false;
    };

    window.addEventListener("pointermove", handlePointerMove);

    window.addEventListener("pointerup", handlePointerUp);

    window.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", handlePointerUp);

      window.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [dragOrigin, matches, lockedTop, showAns, checkCompleted]);

  /* =====================================================
     CHECK
  ===================================================== */

  const checkAnswers = () => {
    if (showAns || checkCompleted) {
      return;
    }

    const allConnected = EXERCISE_DATA.top.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");

      return;
    }

    let score = 0;

    const wrong = [];

    const nextLocked = new Set(lockedTop);

    EXERCISE_DATA.top.forEach((item) => {
      const correct =
        Number(matches[item.id]) ===
        Number(EXERCISE_DATA.correctMatches[item.id]);

      if (correct) {
        score++;

        nextLocked.add(item.id);
      } else {
        wrong.push(item.id);
      }
    });

    setLockedTop(nextLocked);

    setWrongTop(wrong);

    setSelectedEndpoint(null);

    setKeyboardMatching(false);

    setKeyboardOrigin(null);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);

    setDragOrigin(null);

    setDragPreviewLine(null);

    const total = EXERCISE_DATA.top.length;

    if (score === total) {
      setCheckCompleted(true);

      setLockedTop(new Set(EXERCISE_DATA.top.map((item) => item.id)));

      setWrongTop([]);

      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score === 0) {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    }
  };

  /* =====================================================
     SHOW ANSWER
  ===================================================== */

  const handleShowAnswer = () => {
    stopBottomAudio();

    setMatches({
      ...EXERCISE_DATA.correctMatches,
    });

    setLockedTop(new Set(EXERCISE_DATA.top.map((item) => item.id)));

    setWrongTop([]);

    setShowAns(true);

    setCheckCompleted(true);

    setSelectedEndpoint(null);

    setKeyboardMatching(false);

    setKeyboardOrigin(null);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);

    setDragOrigin(null);

    setDragPreviewLine(null);
  };

  /* =====================================================
     START AGAIN
  ===================================================== */

  const handleStartAgain = () => {
    stopBottomAudio();

    setMatches({});

    setLines([]);

    setSelectedEndpoint(null);

    setKeyboardMatching(false);

    setKeyboardOrigin(null);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);

    setDragOrigin(null);

    setDragPreviewLine(null);

    setLockedTop(new Set());

    setWrongTop([]);

    setShowAns(false);

    setCheckCompleted(false);
  };

  /* =====================================================
     VISUAL HELPERS
  ===================================================== */

  const getTopDotColor = (topId) => {
    const selected =
      selectedEndpoint?.side === "top" && selectedEndpoint?.id === topId;

    const keyboardSelected =
      keyboardOrigin?.side === "top" && keyboardOrigin?.id === topId;

    const dragging = dragOrigin?.side === "top" && dragOrigin?.id === topId;

    return selected || keyboardSelected || dragging || matches[topId]
      ? ACTIVE_COLOR
      : INACTIVE_COLOR;
  };

  const getBottomDotColor = (bottomId) => {
    const connected = Object.values(matches).some(
      (value) => Number(value) === bottomId,
    );

    const selected =
      selectedEndpoint?.side === "bottom" && selectedEndpoint?.id === bottomId;

    const keyboardSelected =
      keyboardOrigin?.side === "bottom" && keyboardOrigin?.id === bottomId;

    const dragging =
      dragOrigin?.side === "bottom" && dragOrigin?.id === bottomId;

    return connected || selected || keyboardSelected || dragging
      ? ACTIVE_COLOR
      : INACTIVE_COLOR;
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="main-container-component">
      <style>{`
        [data-match-side] {
          touch-action: none;
        }

        .wb-u1-p8-b-focus {
          outline: none;
        }

        .wb-u1-p8-b-focus:focus-visible {
          outline: 3px solid #2563eb !important;
          outline-offset: 4px;
        }

        .wb-u1-p8-b-audio-icon {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 14px;
          height: 14px;
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        <ExerciseHeader
          sectionLetter="B"
          title="Listen and match."
          subTitle="Listen to the full audio once, then replay as needed and match each picture to the vowel sound heard only after you hear the key sound or word."
        />

        <div className="flex flex-col gap-10 w-full">
          {/* =================================================
              QUESTION AUDIO
          ================================================= */}

          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={stopAtSecond}
          />

          {/* =================================================
              MATCH AREA
          ================================================= */}

          <div ref={containerRef} style={styles.matchArea} className="w-full">
            {/* =============================================
                SVG
            ============================================= */}

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
              {/* permanent */}

              {lines.map((line) => (
                <line
                  key={line.id}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={LINE_COLOR}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              ))}

              {/* pointer drag preview */}

              {dragPreviewLine && (
                <line
                  x1={dragPreviewLine.x1}
                  y1={dragPreviewLine.y1}
                  x2={dragPreviewLine.x2}
                  y2={dragPreviewLine.y2}
                  stroke={LINE_COLOR}
                  strokeWidth="3.5"
                  strokeDasharray="7 5"
                  strokeLinecap="round"
                />
              )}

              {/* keyboard preview */}

              {keyboardMatching && keyboardPreviewLine && (
                <line
                  x1={keyboardPreviewLine.x1}
                  y1={keyboardPreviewLine.y1}
                  x2={keyboardPreviewLine.x2}
                  y2={keyboardPreviewLine.y2}
                  stroke={LINE_COLOR}
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />
              )}
            </svg>

            {/* =================================================
                TOP IMAGES
            ================================================= */}

            <div style={styles.topRow}>
              {EXERCISE_DATA.top.map((item) => {
                const locked = isTopLocked(item.id);

                const wrong = wrongTop.includes(item.id);

                const selected =
                  (selectedEndpoint?.side === "top" &&
                    selectedEndpoint?.id === item.id) ||
                  (keyboardOrigin?.side === "top" &&
                    keyboardOrigin?.id === item.id) ||
                  (dragOrigin?.side === "top" && dragOrigin?.id === item.id);

                const connected = !!matches[item.id];

                return (
                  <div key={item.id} style={styles.topItem}>
                    {/* IMAGE CONTROL */}

                    <div
                      ref={(element) => {
                        topControlRefs.current[item.id] = element;
                      }}
                      role="button"
                      tabIndex={locked || showAns || checkCompleted ? -1 : 0}
                      data-match-side="top"
                      data-match-id={item.id}
                      aria-label={`Picture ${item.id}. ${item.alt} Press Enter or Space to start or complete matching.`}
                      className="wb-u1-p8-b-focus"
                      onFocus={() => handleTargetFocus("top", item.id)}
                      onPointerDown={(event) =>
                        handlePointerDown(event, "top", item.id)
                      }
                      onClick={() => {
                        if (locked) {
                          return;
                        }

                        handleEndpointClick("top", item.id);
                      }}
                      onKeyDown={(event) =>
                        handleEndpointKeyDown(event, "top", item.id)
                      }
                      style={{
                        ...styles.topImageBox,

                        border: selected
                          ? `3px solid ${ACTIVE_COLOR}`
                          : connected
                            ? "2px solid #f5d0a8"
                            : "2px solid transparent",

                        background: selected
                          ? "rgba(243,155,66,0.08)"
                          : "transparent",

                        cursor: locked ? "default" : "pointer",
                      }}
                    >
                      <div style={styles.topNumber}>{item.id}</div>

                      <img
                        src={item.img}
                        alt={item.alt}
                        style={styles.topImage}
                        draggable={false}
                      />
                    </div>

                    {/* TOP DOT */}

                    <div
                      ref={(element) => {
                        elementRefs.current[`top-${item.id}`] = element;
                      }}
                      aria-hidden="true"
                      onPointerDown={(event) => {
                        if (locked) {
                          return;
                        }

                        handlePointerDown(event, "top", item.id);
                      }}
                      onClick={() => {
                        if (locked) {
                          return;
                        }

                        handleEndpointClick("top", item.id);
                      }}
                      style={{
                        ...styles.dot,

                        backgroundColor: getTopDotColor(item.id),

                        cursor: locked ? "default" : "pointer",
                      }}
                    />

                    {wrong && (
                      <div
                        aria-hidden="true"
                        style={{
                          ...styles.wrongBadge,

                          right: "clamp(-9px, 0.8vw, -12px)",

                          top: "clamp(-8px, 3vw, -15px)",
                        }}
                      >
                        ✕
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* =================================================
                BOTTOM LABELS
            ================================================= */}

            <div style={styles.bottomRow}>
              {EXERCISE_DATA.bottom.map((item) => {
                const connectedTop = bottomToTop[item.id];

                const locked = isBottomLocked(item.id);

                const connected = !!connectedTop;

                const selected =
                  (selectedEndpoint?.side === "bottom" &&
                    selectedEndpoint?.id === item.id) ||
                  (keyboardOrigin?.side === "bottom" &&
                    keyboardOrigin?.id === item.id) ||
                  (keyboardTarget?.side === "bottom" &&
                    keyboardTarget?.id === item.id) ||
                  (dragOrigin?.side === "bottom" && dragOrigin?.id === item.id);

                return (
                  <div key={item.id} style={styles.bottomItem}>
                    {/* BOTTOM DOT */}

                    <div
                      ref={(element) => {
                        elementRefs.current[`bottom-${item.id}`] = element;
                      }}
                      aria-hidden="true"
                      onPointerDown={(event) => {
                        if (locked) {
                          return;
                        }

                        handlePointerDown(event, "bottom", item.id);
                      }}
                      onClick={() => {
                        if (locked) {
                          playBottomAudio(item);

                          return;
                        }

                        handleEndpointClick("bottom", item.id);
                      }}
                      style={{
                        ...styles.dot,

                        backgroundColor: getBottomDotColor(item.id),

                        cursor: locked ? "default" : "pointer",
                      }}
                    />

                    {/* TEXT CONTROL */}

                    <div
                      ref={(element) => {
                        bottomControlRefs.current[item.id] = element;
                      }}
                      role="button"
                      tabIndex={0}
                      data-match-side="bottom"
                      data-match-id={item.id}
                      aria-label={
                        locked
                          ? `${item.text}. Correct. Press Enter or Space to hear the sound.`
                          : `${item.text}. Press Enter or Space to hear the sound and start or complete matching.`
                      }
                      className="wb-u1-p8-b-focus"
                      onFocus={() => handleTargetFocus("bottom", item.id)}
                      onPointerDown={(event) => {
                        if (locked) {
                          return;
                        }

                        handlePointerDown(event, "bottom", item.id);
                      }}
                      onClick={() => {
                        playBottomAudio(item);

                        if (locked) {
                          return;
                        }

                        handleEndpointClick("bottom", item.id);
                      }}
                      onKeyDown={(event) =>
                        handleEndpointKeyDown(event, "bottom", item.id)
                      }
                      style={{
                        ...styles.bottomLabel,

                        border: selected
                          ? `3px solid ${ACTIVE_COLOR}`
                          : connected
                            ? "2px solid #f5d0a8"
                            : "2px solid transparent",

                        background: selected
                          ? "rgba(243,155,66,0.08)"
                          : "transparent",

                        cursor: "pointer",
                      }}
                    >
                      {item.text}

                      {playingBottomId === item.id && (
                        <FaVolumeUp
                          aria-hidden="true"
                          className="wb-u1-p8-b-audio-icon"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div style={styles.buttonsWrap}>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
};

export default WB_Unit1_Page8_Q2;
