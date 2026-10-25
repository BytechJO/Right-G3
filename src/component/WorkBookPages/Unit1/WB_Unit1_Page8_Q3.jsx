import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import { FaVolumeUp } from "react-icons/fa";

/* =====================================================
   IMAGES
===================================================== */

import imgBoat from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 7.svg";
import imgKate from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 8.svg";
import imgHansel from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 9.svg";

/* =====================================================
   AUDIO
===================================================== */

import sentence1 from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise C/Item_001_Kate_wants_a_bike,_coat,_and_cake.mp3";

import sentence2 from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise C/Item_002_Hansel_likes_the_cat_and_ducks.mp3";

import sentence3 from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise C/Item_003_There_are_two_flags_on_the_top_of_the_boat.mp3";
import ExerciseHeader from "../../ExerciseHeader";

/* =====================================================
   COLORS
===================================================== */

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#f39b42";
const INACTIVE_COLOR = "#a9a9a9";
const ACTIVE_BG = "rgba(243, 155, 66, 0.08)";

/* =====================================================
   DATA
===================================================== */

const exerciseData = {
  left: [
    {
      id: 1,
      text: "Kate wants a bike, coat, and cake.",
      audio: sentence1,
    },

    {
      id: 2,
      text: "Hansel likes the cat and ducks.",
      audio: sentence2,
    },

    {
      id: 3,
      text: "There are two flags on the top of the boat.",
      audio: sentence3,
    },
  ],

  right: [
    {
      id: 1,
      image: imgBoat,
      alt: "A boat with two flags on the top.",
    },

    {
      id: 2,
      image: imgKate,
      alt: "Kate with a bike, a coat, and a cake.",
    },

    {
      id: 3,
      image: imgHansel,
      alt: "Hansel with a cat and ducks.",
    },
  ],

  correctMatches: {
    1: 2,
    2: 3,
    3: 1,
  },
};

/* =====================================================
   COMPONENT
===================================================== */

export default function WB_Unit3_Page8_QC() {
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
     CHECK STATE
  ===================================================== */

  const [lockedLeft, setLockedLeft] = useState(new Set());

  const [wrongLeft, setWrongLeft] = useState([]);

  const [showAns, setShowAns] = useState(false);

  const [checkCompleted, setCheckCompleted] = useState(false);

  /* =====================================================
     AUDIO
  ===================================================== */

  const audioRef = useRef(null);

  const [playingId, setPlayingId] = useState(null);

  /* =====================================================
     REFS
  ===================================================== */

  const containerRef = useRef(null);

  const elementRefs = useRef({});

  const leftControlRefs = useRef({});

  const rightControlRefs = useRef({});

  /* =====================================================
     RIGHT -> LEFT LOOKUP
  ===================================================== */

  const rightToLeft = Object.fromEntries(
    Object.entries(matches).map(([leftId, rightId]) => [
      Number(rightId),
      Number(leftId),
    ]),
  );

  /* =====================================================
     AUDIO
  ===================================================== */

  const stopAudio = () => {
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

    setPlayingId(null);
  };

  const playSentenceAudio = (item) => {
    if (!item?.audio) return;

    stopAudio();

    const audio = new Audio(item.audio);

    audioRef.current = audio;

    setPlayingId(item.id);

    audio.play().catch(() => {
      if (audioRef.current === audio) {
        audioRef.current = null;
      }

      setPlayingId(null);
    });

    audio.onended = () => {
      if (audioRef.current === audio) {
        audioRef.current = null;
      }

      setPlayingId(null);
    };

    audio.onerror = audio.onended;
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  /* =====================================================
     LOCK HELPERS
  ===================================================== */

  const isLeftLocked = (leftId) => lockedLeft.has(Number(leftId));

  const isRightLocked = (rightId) => {
    const connectedLeft = rightToLeft[Number(rightId)];

    return connectedLeft ? isLeftLocked(connectedLeft) : false;
  };

  /* =====================================================
     GET DOT CENTER
  ===================================================== */

  const getCenter = (element) => {
    if (!element || !containerRef.current) {
      return null;
    }

    const rect = element.getBoundingClientRect();

    const containerRect = containerRef.current.getBoundingClientRect();

    return {
      x: rect.left - containerRect.left + rect.width / 2,

      y: rect.top - containerRect.top + rect.height / 2,
    };
  };

  /* =====================================================
     PERMANENT LINES
  ===================================================== */

  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;

      const newLines = Object.entries(matches)
        .map(([leftId, rightId]) => {
          const leftEl = elementRefs.current[`left-${leftId}`];

          const rightEl = elementRefs.current[`right-${rightId}`];

          const leftPoint = getCenter(leftEl);
          const rightPoint = getCenter(rightEl);

          if (!leftPoint || !rightPoint) {
            return null;
          }

          return {
            id: `${leftId}-${rightId}`,

            x1: leftPoint.x,
            y1: leftPoint.y,

            x2: rightPoint.x,
            y2: rightPoint.y,
          };
        })
        .filter(Boolean);

      setLines(newLines);
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
     COMMIT MATCH
     ONE TO ONE
  ===================================================== */

  const commitMatch = (leftId, rightId) => {
    const numericLeft = Number(leftId);

    const numericRight = Number(rightId);

    if (showAns || checkCompleted || isLeftLocked(numericLeft)) {
      return;
    }

    const existingLeft = Object.keys(matches).find(
      (key) => Number(matches[key]) === numericRight,
    );

    /*
      Target connected to correct locked source
      cannot be replaced.
    */

    if (
      existingLeft &&
      Number(existingLeft) !== numericLeft &&
      isLeftLocked(Number(existingLeft))
    ) {
      return;
    }

    setMatches((previous) => {
      const next = {
        ...previous,
      };

      /*
        Remove old target from this source.
      */

      delete next[numericLeft];

      /*
        Remove old source using same target.
      */

      Object.keys(next).forEach((key) => {
        if (Number(next[key]) === numericRight) {
          delete next[key];
        }
      });

      next[numericLeft] = numericRight;

      return next;
    });

    /*
      Editing wrong connection clears
      only affected X states.
    */

    setWrongLeft((previous) =>
      previous.filter(
        (id) => id !== numericLeft && id !== Number(existingLeft),
      ),
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
     MOUSE CLICK MATCHING
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

    if (side === "left" && isLeftLocked(numericId)) {
      return;
    }

    if (side === "right" && isRightLocked(numericId)) {
      return;
    }

    setKeyboardMatching(false);

    setKeyboardOrigin(null);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);

    /* First endpoint */

    if (!selectedEndpoint) {
      setSelectedEndpoint({
        side,
        id: numericId,
      });

      return;
    }

    /* Same side changes selection */

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

    /* Opposite side -> commit */

    const leftId = side === "left" ? numericId : selectedEndpoint.id;

    const rightId = side === "right" ? numericId : selectedEndpoint.id;

    commitMatch(leftId, rightId);
  };

  /* =====================================================
     AVAILABLE KEYBOARD TARGETS
  ===================================================== */

  const getAvailableTargets = (origin) => {
    if (!origin) {
      return [];
    }

    /* Left -> Right */

    if (origin.side === "left") {
      return exerciseData.right
        .filter((rightItem) => {
          const connectedLeft = rightToLeft[rightItem.id];

          if (!connectedLeft) {
            return true;
          }

          if (connectedLeft === origin.id) {
            return true;
          }

          return !isLeftLocked(connectedLeft);
        })
        .map((item) => item.id);
    }

    /* Right -> Left */

    return exerciseData.left
      .filter((leftItem) => !isLeftLocked(leftItem.id))
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

    if (side === "left" && isLeftLocked(numericId)) {
      return;
    }

    if (side === "right" && isRightLocked(numericId)) {
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

    const firstId = available[0];

    requestAnimationFrame(() => {
      if (side === "left") {
        rightControlRefs.current[firstId]?.focus();
      } else {
        leftControlRefs.current[firstId]?.focus();
      }
    });
  };

  /* =====================================================
     KEYBOARD HANDLER
  ===================================================== */

  const handleEndpointKeyDown = (event, side, id) => {
    const numericId = Number(id);

    /* =============================================
       NO ACTIVE MATCH
    ============================================= */

    if (!keyboardMatching) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        event.stopPropagation();

        /*
          Sentence audio on left.
        */

        if (side === "left") {
          const item = exerciseData.left.find(
            (entry) => entry.id === numericId,
          );

          playSentenceAudio(item);

          /*
            Correct locked sentence remains
            audio-only.
          */

          if (isLeftLocked(numericId)) {
            return;
          }
        }

        startKeyboardMatch(side, numericId);
      }

      return;
    }

    /*
      Once matching has started,
      only the opposite side acts as targets.
    */

    if (keyboardOrigin?.side === side) {
      return;
    }

    /* =============================================
       TAB / SHIFT TAB
    ============================================= */

    if (event.key === "Tab") {
      event.preventDefault();

      event.stopPropagation();

      const available = getAvailableTargets(keyboardOrigin);

      if (!available.length) {
        return;
      }

      const currentIndex = available.indexOf(numericId);

      let nextIndex;

      if (event.shiftKey) {
        nextIndex = currentIndex <= 0 ? available.length - 1 : currentIndex - 1;
      } else {
        nextIndex =
          currentIndex === -1 || currentIndex === available.length - 1
            ? 0
            : currentIndex + 1;
      }

      const nextId = available[nextIndex];

      if (keyboardOrigin.side === "left") {
        rightControlRefs.current[nextId]?.focus();
      } else {
        leftControlRefs.current[nextId]?.focus();
      }

      return;
    }

    /* =============================================
       ENTER / SPACE COMMIT
    ============================================= */

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      event.stopPropagation();

      if (side === "left") {
        const item = exerciseData.left.find((entry) => entry.id === numericId);

        playSentenceAudio(item);
      }

      const origin = keyboardOrigin;

      const leftId = side === "left" ? numericId : origin.id;

      const rightId = side === "right" ? numericId : origin.id;

      commitMatch(leftId, rightId);

      requestAnimationFrame(() => {
        if (origin.side === "left") {
          leftControlRefs.current[origin.id]?.focus();
        } else {
          rightControlRefs.current[origin.id]?.focus();
        }
      });

      return;
    }

    /* =============================================
       ESCAPE
    ============================================= */

    if (event.key === "Escape") {
      event.preventDefault();

      event.stopPropagation();

      const origin = keyboardOrigin;

      setKeyboardMatching(false);

      setKeyboardOrigin(null);

      setKeyboardTarget(null);

      setKeyboardPreviewLine(null);

      requestAnimationFrame(() => {
        if (origin.side === "left") {
          leftControlRefs.current[origin.id]?.focus();
        } else {
          rightControlRefs.current[origin.id]?.focus();
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
     POINTER DRAG START
  ===================================================== */

  const handlePointerDown = (event, side, id) => {
    const numericId = Number(id);

    if (showAns || checkCompleted) {
      return;
    }

    if (side === "left" && isLeftLocked(numericId)) {
      return;
    }

    if (side === "right" && isRightLocked(numericId)) {
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

    /*
      Starting from sentence also plays audio.
    */

    if (side === "left") {
      const item = exerciseData.left.find((entry) => entry.id === numericId);

      playSentenceAudio(item);
    }
  };

  /* =====================================================
     POINTER MOVE / UP
     Mouse + Touch + Stylus
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
          const leftId = dragOrigin.side === "left" ? dragOrigin.id : targetId;

          const rightId =
            dragOrigin.side === "right" ? dragOrigin.id : targetId;

          commitMatch(leftId, rightId);

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
  }, [dragOrigin, matches, lockedLeft, showAns, checkCompleted]);

  /* =====================================================
     CHECK
  ===================================================== */

  const checkAnswers = () => {
    if (showAns || checkCompleted) {
      return;
    }

    const allConnected = exerciseData.left.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");

      return;
    }

    let score = 0;

    const wrong = [];

    const nextLocked = new Set(lockedLeft);

    exerciseData.left.forEach((item) => {
      const isCorrect =
        Number(matches[item.id]) ===
        Number(exerciseData.correctMatches[item.id]);

      if (isCorrect) {
        score++;

        nextLocked.add(item.id);
      } else {
        wrong.push(item.id);
      }
    });

    setLockedLeft(nextLocked);

    setWrongLeft(wrong);

    setSelectedEndpoint(null);

    setKeyboardMatching(false);

    setKeyboardOrigin(null);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);

    setDragOrigin(null);

    setDragPreviewLine(null);

    const total = exerciseData.left.length;

    if (score === total) {
      setCheckCompleted(true);

      setWrongLeft([]);

      setLockedLeft(new Set(exerciseData.left.map((item) => item.id)));

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
    stopAudio();

    setMatches({
      ...exerciseData.correctMatches,
    });

    setLockedLeft(new Set(exerciseData.left.map((item) => item.id)));

    setWrongLeft([]);

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
    stopAudio();

    setMatches({});

    setLines([]);

    setSelectedEndpoint(null);

    setKeyboardMatching(false);

    setKeyboardOrigin(null);

    setKeyboardTarget(null);

    setKeyboardPreviewLine(null);

    setDragOrigin(null);

    setDragPreviewLine(null);

    setLockedLeft(new Set());

    setWrongLeft([]);

    setShowAns(false);

    setCheckCompleted(false);
  };

  /* =====================================================
     VISUAL HELPERS
  ===================================================== */

  const getDotColor = (side, id) => {
    const numericId = Number(id);

    const selected =
      selectedEndpoint?.side === side && selectedEndpoint?.id === numericId;

    const keyboardSelected =
      keyboardOrigin?.side === side && keyboardOrigin?.id === numericId;

    const dragging = dragOrigin?.side === side && dragOrigin?.id === numericId;

    if (selected || keyboardSelected || dragging) {
      return ACTIVE_COLOR;
    }

    const connected =
      side === "left"
        ? !!matches[numericId]
        : Object.values(matches).some((value) => Number(value) === numericId);

    return connected ? ACTIVE_COLOR : INACTIVE_COLOR;
  };

  const isLeftSelected = (id) =>
    (selectedEndpoint?.side === "left" && selectedEndpoint?.id === id) ||
    (keyboardOrigin?.side === "left" && keyboardOrigin?.id === id) ||
    (keyboardTarget?.side === "left" && keyboardTarget?.id === id) ||
    (dragOrigin?.side === "left" && dragOrigin?.id === id);

  const isRightSelected = (id) =>
    (selectedEndpoint?.side === "right" && selectedEndpoint?.id === id) ||
    (keyboardOrigin?.side === "right" && keyboardOrigin?.id === id) ||
    (keyboardTarget?.side === "right" && keyboardTarget?.id === id) ||
    (dragOrigin?.side === "right" && dragOrigin?.id === id);

  const isRightConnected = (id) =>
    Object.values(matches).some((value) => Number(value) === Number(id));

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="main-container-component">
      <style>{`
        /* =================================================
           BOARD
        ================================================= */

        .wb-c-board {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          touch-action: none;
        }

        /* =================================================
           GRID
        ================================================= */

        .wb-c-grid {
          position: relative;
          z-index: 2;

          display: flex;
          flex-direction: column;

          gap: clamp(18px, 2.6vw, 30px);
        }

        .wb-c-row {
          display: grid;

          grid-template-columns:
            minmax(0, 1.2fr)
            34px
            minmax(60px, 0.35fr)
            34px
            minmax(170px, 0.8fr);

          align-items: center;

          min-height: clamp(70px, 9vw, 100px);
        }

        /* =================================================
           LEFT
        ================================================= */

        .wb-c-left-cell {
          display: flex;

          align-items: center;

          position: relative;

          min-width: 0;

          padding-right: 4px;
        }

        .wb-c-left-num {
          font-size: 22px;

          font-weight: 700;

          color: #111;

          line-height: 1;

          flex-shrink: 0;
        }

        .wb-c-left-text {
          position: relative;

          font-size: 18px;

          color: #111;

          line-height: 1.4;

          width: 100%;

          border: 2px solid transparent;

          border-radius: 12px;

          padding: 8px 28px 8px 10px;

          transition:
            border 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;

          box-sizing: border-box;

          min-width: 0;

          cursor: pointer;

          outline: none;

          user-select: none;
        }

        .wb-c-left-text.active {
          border-color: ${ACTIVE_COLOR};

          background: ${ACTIVE_BG};
        }

        .wb-c-left-text:focus-visible {
          outline: 3px solid #2563eb;

          outline-offset: 4px;
        }

        /* =================================================
           AUDIO
        ================================================= */

        .wb-c-audio-icon {
          position: absolute;

          top: 4px;
          right: 5px;

          width: 14px;
          height: 14px;

          pointer-events: none;

          z-index: 10;
        }

        /* =================================================
           DOT
        ================================================= */

        .wb-c-dot-cell {
          display: flex;

          align-items: center;

          justify-content: center;

          height: 100%;
        }

        .wb-c-dot {
          width: 14px;

          height: 14px;

          border-radius: 50%;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background-color 0.2s ease;

          flex-shrink: 0;

          cursor: pointer;

          box-sizing: border-box;

          position: relative;

          z-index: 4;
        }

        .wb-c-dot.selected {
          transform: scale(1.15);

          box-shadow:
            0 0 0 5px
            rgba(243, 155, 66, 0.22);
        }

        /* =================================================
           SPACER
        ================================================= */

        .wb-c-spacer {
          height: 100%;
        }

        /* =================================================
           RIGHT IMAGE ENDPOINT
        ================================================= */

        .wb-c-right-cell {
          display: flex;

          align-items: center;

          justify-content: flex-start;

          height: 100%;

          min-width: 0;

          gap: 10px;

          padding:
            6px
            clamp(8px, 1vw, 14px);

          cursor: pointer;

          border: 2px solid transparent;

          border-radius: 12px;

          outline: none;

          transition:
            border 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;

          box-sizing: border-box;

          user-select: none;
        }

        .wb-c-right-cell.active {
          border-color: ${ACTIVE_COLOR};

          background: ${ACTIVE_BG};
        }

        .wb-c-right-cell:focus-visible {
          outline: 3px solid #2563eb;

          outline-offset: 4px;
        }

        .wb-c-right-img {
          display: block;

          width: auto;

          height: clamp(60px, 9vw, 100px);

          max-width: 100%;

          object-fit: contain;

          user-select: none;

          pointer-events: none;
        }

        /* =================================================
           WRONG
        ================================================= */

        .wb-c-wrong {
          position: absolute;

          top: -7px;

          right: -7px;

          width: 22px;

          height: 22px;

          border-radius: 50%;

          background: red;

          color: #fff;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 12px;

          font-weight: 700;

          border: 2px solid #fff;

          box-shadow:
            0 2px 6px
            rgba(0, 0, 0, 0.18);

          z-index: 8;
        }

        /* =================================================
           SVG
        ================================================= */

        .wb-c-svg-lines {
          position: absolute;

          inset: 0;

          width: 100%;

          height: 100%;

          pointer-events: none;

          overflow: visible;

          z-index: 1;
        }

        /* =================================================
           BUTTONS
        ================================================= */

        .wb-c-buttons {
          display: flex;

          justify-content: center;

          margin-top: 8px;
        }

        /* =================================================
           TOUCH
        ================================================= */

        [data-match-side] {
          touch-action: none;
        }

        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 820px) {
          .wb-c-row {
            grid-template-columns:
              minmax(0, 1.2fr)
              24px
              minmax(40px, 0.3fr)
              24px
              minmax(130px, 0.7fr);
          }

          .wb-c-left-num,
          .wb-c-left-text {
            font-size: 18px;
          }

          .wb-c-right-img {
            height: clamp(50px, 8vw, 80px);
          }
        }

        @media (max-width: 640px) {
          .wb-c-row {
            grid-template-columns:
              minmax(0, 1fr)
              20px
              minmax(30px, 0.25fr)
              20px
              minmax(100px, auto);
          }

          .wb-c-left-num,
          .wb-c-left-text {
            font-size: 16px;
          }

          .wb-c-right-img {
            height: clamp(44px, 7vw, 65px);
          }
        }

        @media (max-width: 480px) {
          .wb-c-row {
            grid-template-columns:
              minmax(0, 1fr)
              16px
              24px
              16px
              minmax(80px, auto);
          }

          .wb-c-dot {
            width: 11px;

            height: 11px;
          }

          .wb-c-left-num,
          .wb-c-left-text {
            font-size: 13px;
          }

          .wb-c-right-img {
            height: clamp(36px, 6vw, 52px);
          }
        }
      `}</style>

      <div className="div-forall">
        {/* =================================================
            HEADER
        ================================================= */}

        <ExerciseHeader
          sectionLetter="C"
          title="Read, look, and match."
          subTitle="Read each sentence to the matching picture first, then connect it to the matching picture or answer one pair at a time."
        />
        {/* =================================================
            BOARD
        ================================================= */}

        <div ref={containerRef} className="wb-c-board w-full">
          {/* =================================================
              SVG LINES
          ================================================= */}

          <svg className="wb-c-svg-lines">
            {/* PERMANENT */}

            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={LINE_COLOR}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ))}

            {/* MOUSE / TOUCH DRAG PREVIEW */}

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

            {/* KEYBOARD PREVIEW */}

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
              ROWS
          ================================================= */}

          <div className="wb-c-grid">
            {exerciseData.left.map((leftItem, index) => {
              const rightItem = exerciseData.right[index];

              const leftSelected = isLeftSelected(leftItem.id);

              const rightSelected = isRightSelected(rightItem.id);

              const leftLocked = isLeftLocked(leftItem.id);

              const rightLocked = isRightLocked(rightItem.id);

              const wrong = wrongLeft.includes(leftItem.id);

              const connected = isRightConnected(rightItem.id);

              return (
                <div key={leftItem.id} className="wb-c-row">
                  {/* =====================================
                        LEFT TEXT
                    ===================================== */}

                  <div className="wb-c-left-cell">
                    <div className="wb-c-left-num">{leftItem.id}</div>

                    <div
                      ref={(element) => {
                        leftControlRefs.current[leftItem.id] = element;
                      }}
                      role="button"
                      tabIndex={0}
                      data-match-side="left"
                      data-match-id={leftItem.id}
                      aria-label={
                        leftLocked
                          ? `${leftItem.text} Correct. Press Enter or Space to hear the sentence.`
                          : `${leftItem.text} Press Enter or Space to hear the sentence and start matching.`
                      }
                      className={`wb-c-left-text ${
                        leftSelected ? "active" : ""
                      }`}
                      onFocus={() => handleTargetFocus("left", leftItem.id)}
                      onPointerDown={(event) => {
                        if (leftLocked) {
                          return;
                        }

                        handlePointerDown(event, "left", leftItem.id);
                      }}
                      onClick={() => {
                        playSentenceAudio(leftItem);

                        if (leftLocked) {
                          return;
                        }

                        handleEndpointClick("left", leftItem.id);
                      }}
                      onKeyDown={(event) =>
                        handleEndpointKeyDown(event, "left", leftItem.id)
                      }
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {leftItem.text}

                      {playingId === leftItem.id && (
                        <FaVolumeUp
                          aria-hidden="true"
                          className="wb-c-audio-icon"
                        />
                      )}

                      {wrong && (
                        <div className="wb-c-wrong" aria-hidden="true">
                          ✕
                        </div>
                      )}
                    </div>
                  </div>

                  {/* =====================================
                        LEFT DOT
                    ===================================== */}

                  <div className="wb-c-dot-cell">
                    <div
                      ref={(element) => {
                        elementRefs.current[`left-${leftItem.id}`] = element;
                      }}
                      className={`wb-c-dot ${leftSelected ? "selected" : ""}`}
                      aria-hidden="true"
                      onPointerDown={(event) => {
                        if (leftLocked) {
                          return;
                        }

                        handlePointerDown(event, "left", leftItem.id);
                      }}
                      onClick={() => {
                        if (leftLocked) {
                          playSentenceAudio(leftItem);

                          return;
                        }

                        handleEndpointClick("left", leftItem.id);
                      }}
                      style={{
                        backgroundColor: getDotColor("left", leftItem.id),

                        cursor: leftLocked ? "default" : "pointer",
                      }}
                    />
                  </div>

                  {/* =====================================
                        SPACER
                    ===================================== */}

                  <div className="wb-c-spacer" />

                  {/* =====================================
                        RIGHT DOT
                    ===================================== */}

                  <div className="wb-c-dot-cell">
                    <div
                      ref={(element) => {
                        elementRefs.current[`right-${rightItem.id}`] = element;
                      }}
                      className={`wb-c-dot ${rightSelected ? "selected" : ""}`}
                      aria-hidden="true"
                      onPointerDown={(event) => {
                        if (rightLocked) {
                          return;
                        }

                        handlePointerDown(event, "right", rightItem.id);
                      }}
                      onClick={() => {
                        if (rightLocked) {
                          return;
                        }

                        handleEndpointClick("right", rightItem.id);
                      }}
                      style={{
                        backgroundColor: getDotColor("right", rightItem.id),

                        cursor: rightLocked ? "default" : "pointer",

                        boxShadow: connected
                          ? "0 0 0 5px rgba(243, 155, 66, 0.18)"
                          : "none",
                      }}
                    />
                  </div>

                  {/* =====================================
                        RIGHT IMAGE
                    ===================================== */}

                  <div
                    ref={(element) => {
                      rightControlRefs.current[rightItem.id] = element;
                    }}
                    role="button"
                    tabIndex={rightLocked || showAns || checkCompleted ? -1 : 0}
                    data-match-side="right"
                    data-match-id={rightItem.id}
                    aria-label={`${rightItem.alt} Press Enter or Space to start or complete matching.`}
                    className={`wb-c-right-cell ${
                      rightSelected ? "active" : ""
                    }`}
                    onFocus={() => handleTargetFocus("right", rightItem.id)}
                    onPointerDown={(event) => {
                      if (rightLocked) {
                        return;
                      }

                      handlePointerDown(event, "right", rightItem.id);
                    }}
                    onClick={() => {
                      if (rightLocked) {
                        return;
                      }

                      handleEndpointClick("right", rightItem.id);
                    }}
                    onKeyDown={(event) =>
                      handleEndpointKeyDown(event, "right", rightItem.id)
                    }
                    style={{
                      cursor: rightLocked ? "default" : "pointer",
                    }}
                  >
                    <img
                      src={rightItem.image}
                      alt={rightItem.alt}
                      className="wb-c-right-img"
                      draggable={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="wb-c-buttons">
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
}
