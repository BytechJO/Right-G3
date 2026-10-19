import { useRef, useState } from "react";

/* =====================================================
   HELPERS
===================================================== */

const isActivateKey = (event) => event.key === "Enter" || event.key === " ";

const focusAndReveal = (element) => {
  if (!element) return;

  element.focus({
    preventScroll: true,
  });

  element.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "nearest",
  });
};

/* =====================================================
   HOOK
===================================================== */

export default function useUnit4TabDrag({
  /* ===================================================
     DRAG OPTIONS
  =================================================== */

  itemIds = [],
  targetIds = [],

  getTargetIds,
  getItemIdsForItem,

  isItemDisabled = () => false,
  isTargetDisabled = () => false,

  onPick,
  onPlace,

  /* ===================================================
     DRAW OPTIONS
  =================================================== */

  defaultTool = "pen",

  defaultColor = "#111827",

  penWidth = 3,

  eraserWidth = 20,

  keyboardStep = 4,

  keyboardFastStep = 12,
}) {
  /* =====================================================
     DRAG STATE
  ===================================================== */

  const [keyboardItemId, setKeyboardItemId] = useState(null);

  const [keyboardTargetId, setKeyboardTargetId] = useState(null);

  const itemRefs = useRef({});

  const targetRefs = useRef({});

  const isItemDisabledRef = useRef(isItemDisabled);

  const getItemIdsForItemRef = useRef(getItemIdsForItem);

  isItemDisabledRef.current = isItemDisabled;

  getItemIdsForItemRef.current = getItemIdsForItem;

  /* =====================================================
     DRAW STATE
  ===================================================== */

  const [drawingTool, setDrawingTool] = useState(defaultTool);

  const [drawingColor, setDrawingColor] = useState(defaultColor);

  /*
    الـcanvas اللي عليه focus بالكيبورد
  */

  const [keyboardCanvasId, setKeyboardCanvasId] = useState(null);

  /*
    الـcanvas اللي حاليًا بوضع Drawing
  */

  const [keyboardDrawingCanvasId, setKeyboardDrawingCanvasId] = useState(null);

  /*
    لازم state حتى نقدر نرسم الـcursor بصريًا
  */

  const [keyboardCursorPositions, setKeyboardCursorPositions] = useState({});

  /* =====================================================
     DRAW REFS
  ===================================================== */

  const canvasRefs = useRef({});

  const canvasDrawingRefs = useRef({});

  const canvasLastPositions = useRef({});

  const keyboardPositions = useRef({});

  /*
    History منفصل لكل Canvas
  */

  const canvasHistory = useRef({});

  /* =====================================================
     DRAG HELPERS
  ===================================================== */

  const focusItem = (id) =>
    window.requestAnimationFrame(() => focusAndReveal(itemRefs.current[id]));

  const focusTarget = (id) =>
    window.requestAnimationFrame(() => focusAndReveal(targetRefs.current[id]));

  const availableTargets = (itemId = keyboardItemId) =>
    (getTargetIds ? getTargetIds(itemId) : targetIds).filter(
      (id) => !isTargetDisabled(id),
    );

  /* =====================================================
     DRAG PICK
  ===================================================== */

  const pickItem = (id) => {
    if (isItemDisabled(id)) {
      return;
    }

    const targets = availableTargets(id);

    if (!targets.length) {
      return;
    }

    onPick?.(id);

    setKeyboardItemId(id);

    setKeyboardTargetId(targets[0]);

    focusTarget(targets[0]);
  };

  /* =====================================================
     DRAG CANCEL
  ===================================================== */

  const cancel = () => {
    const origin = keyboardItemId;

    setKeyboardItemId(null);

    setKeyboardTargetId(null);

    if (origin != null) {
      focusItem(origin);
    }
  };

  /* =====================================================
     DRAG FOCUS FIRST UNUSED
  ===================================================== */

  const focusFirstUnused = (placedId) => {
    window.requestAnimationFrame(() => {
      const candidates = getItemIdsForItemRef.current
        ? getItemIdsForItemRef.current(placedId)
        : itemIds;

      const first = candidates.find((id) => !isItemDisabledRef.current(id));

      if (first != null) {
        focusAndReveal(itemRefs.current[first]);
      }
    });
  };

  /* =====================================================
     DRAG TARGET KEYBOARD
  ===================================================== */

  const handleTargetKeyDown = (event, targetId) => {
    if (keyboardItemId == null) {
      return;
    }

    /* ESCAPE */

    if (event.key === "Escape") {
      event.preventDefault();

      cancel();

      return;
    }

    /* TAB / SHIFT TAB */

    if (event.key === "Tab") {
      event.preventDefault();

      const targets = availableTargets();

      if (!targets.length) {
        return;
      }

      const index = targets.indexOf(targetId);

      const direction = event.shiftKey ? -1 : 1;

      const next =
        targets[(index + direction + targets.length) % targets.length];

      setKeyboardTargetId(next);

      focusTarget(next);

      return;
    }

    /* ENTER / SPACE */

    if (isActivateKey(event)) {
      event.preventDefault();

      event.stopPropagation();

      const placedId = keyboardItemId;

      onPlace?.(placedId, targetId);

      setKeyboardItemId(null);

      setKeyboardTargetId(null);

      focusFirstUnused(placedId);
    }
  };

  /* =====================================================
     DRAWING - REGISTER CANVAS
  ===================================================== */

  const registerCanvas = (id, element) => {
    canvasRefs.current[id] = element;

    if (!canvasHistory.current[id]) {
      canvasHistory.current[id] = [];
    }
  };

  /* =====================================================
     DRAWING - CONFIGURE CONTEXT
  ===================================================== */

  const configureCanvasContext = (context) => {
    context.lineCap = "round";

    context.lineJoin = "round";

    if (drawingTool === "eraser") {
      context.globalCompositeOperation = "destination-out";

      context.lineWidth = eraserWidth;
    } else {
      context.globalCompositeOperation = "source-over";

      context.strokeStyle = drawingColor;

      context.lineWidth = penWidth;
    }
  };

  /* =====================================================
     DRAWING - SAVE HISTORY

     مرة واحدة ببداية الـstroke
  ===================================================== */

  const saveCanvasHistory = (id) => {
    const canvas = canvasRefs.current[id];

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!canvasHistory.current[id]) {
      canvasHistory.current[id] = [];
    }

    canvasHistory.current[id].push(
      context.getImageData(0, 0, canvas.width, canvas.height),
    );
  };

  /* =====================================================
     DRAWING - POINTER POSITION

     Mouse / Touch / iPad / Pencil
  ===================================================== */

  const getCanvasPointerPosition = (event, canvas) => {
    const rect = canvas.getBoundingClientRect();

    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,

      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  /* =====================================================
     DRAWING - POINTER DOWN
  ===================================================== */

  const handleCanvasPointerDown = (event, id) => {
    const canvas = canvasRefs.current[id];

    if (!canvas) {
      return;
    }

    event.preventDefault();

    event.stopPropagation();

    /*
      Mouse + touch + pencil
    */

    canvas.setPointerCapture?.(event.pointerId);

    const context = canvas.getContext("2d");

    saveCanvasHistory(id);

    configureCanvasContext(context);

    const point = getCanvasPointerPosition(event, canvas);

    canvasDrawingRefs.current[id] = true;

    canvasLastPositions.current[id] = point;
  };

  /* =====================================================
     DRAWING - POINTER MOVE
  ===================================================== */

  const handleCanvasPointerMove = (event, id) => {
    if (!canvasDrawingRefs.current[id]) {
      return;
    }

    const canvas = canvasRefs.current[id];

    if (!canvas) {
      return;
    }

    event.preventDefault();

    event.stopPropagation();

    const context = canvas.getContext("2d");

    const previous = canvasLastPositions.current[id];

    if (!previous) {
      return;
    }

    const next = getCanvasPointerPosition(event, canvas);

    configureCanvasContext(context);

    context.beginPath();

    context.moveTo(previous.x, previous.y);

    context.lineTo(next.x, next.y);

    context.stroke();

    canvasLastPositions.current[id] = next;
  };

  /* =====================================================
     DRAWING - POINTER END
  ===================================================== */

  const handleCanvasPointerUp = (event, id) => {
    event?.stopPropagation?.();

    canvasDrawingRefs.current[id] = false;

    canvasLastPositions.current[id] = null;
  };

  /* =====================================================
     DRAWING - UNDO

     Canvas محدد فقط
  ===================================================== */

  const undoCanvas = (id) => {
    const canvas = canvasRefs.current[id];

    if (!canvas) {
      return;
    }

    const history = canvasHistory.current[id] || [];

    const previous = history.pop();

    if (!previous) {
      return;
    }

    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.putImageData(previous, 0, 0);
  };

  /* =====================================================
     DRAWING - CLEAR
  ===================================================== */

  const clearCanvas = (id, { saveHistory = true, redraw } = {}) => {
    const canvas = canvasRefs.current[id];

    if (!canvas) {
      return;
    }

    if (saveHistory) {
      saveCanvasHistory(id);
    }

    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    /*
      إذا الـcanvas نفسه عليه صورة tracing
      مرري redraw callback.
    */

    redraw?.(canvas, context);

    if (keyboardDrawingCanvasId === id) {
      setKeyboardDrawingCanvasId(null);
    }
  };

  /* =====================================================
     DRAWING - INITIAL KEYBOARD CURSOR
  ===================================================== */

  const initializeCanvasKeyboardCursor = (id) => {
    const canvas = canvasRefs.current[id];

    if (!canvas) {
      return;
    }

    const existing = keyboardPositions.current[id];

    const position = existing || {
      x: canvas.width / 2,

      y: canvas.height / 2,
    };

    keyboardPositions.current[id] = position;

    setKeyboardCursorPositions((previous) => ({
      ...previous,

      [id]: position,
    }));
  };

  /* =====================================================
     DRAWING - FOCUS
  ===================================================== */

  const handleCanvasFocus = (id) => {
    setKeyboardCanvasId(id);

    initializeCanvasKeyboardCursor(id);
  };

  /* =====================================================
     DRAWING - BLUR
  ===================================================== */

  const handleCanvasBlur = (id) => {
    canvasDrawingRefs.current[id] = false;

    canvasLastPositions.current[id] = null;

    setKeyboardDrawingCanvasId((current) => (current === id ? null : current));

    setKeyboardCanvasId((current) => (current === id ? null : current));
  };

  /* =====================================================
     DRAWING - KEYBOARD
  ===================================================== */

  const handleCanvasKeyDown = (event, id) => {
    const canvas = canvasRefs.current[id];

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    const position = keyboardPositions.current[id] || {
      x: canvas.width / 2,

      y: canvas.height / 2,
    };

    /* ===============================================
       ENTER / SPACE

       يبدأ أو يوقف الرسم
    =============================================== */

    if (isActivateKey(event)) {
      event.preventDefault();

      event.stopPropagation();

      if (keyboardDrawingCanvasId === id) {
        /*
          Stop drawing
        */

        setKeyboardDrawingCanvasId(null);
      } else {
        /*
          Start new keyboard stroke
        */

        saveCanvasHistory(id);

        configureCanvasContext(context);

        setKeyboardDrawingCanvasId(id);
      }

      return;
    }

    /* ===============================================
       ESCAPE
    =============================================== */

    if (event.key === "Escape") {
      event.preventDefault();

      event.stopPropagation();

      setKeyboardDrawingCanvasId(null);

      return;
    }

    /* ===============================================
       ARROWS
    =============================================== */

    const directions = {
      ArrowLeft: [-1, 0],

      ArrowRight: [1, 0],

      ArrowUp: [0, -1],

      ArrowDown: [0, 1],
    };

    if (!directions[event.key]) {
      return;
    }

    event.preventDefault();

    event.stopPropagation();

    const distance = event.shiftKey ? keyboardFastStep : keyboardStep;

    const [horizontal, vertical] = directions[event.key];

    const next = {
      x: Math.min(
        canvas.width,
        Math.max(0, position.x + horizontal * distance),
      ),

      y: Math.min(canvas.height, Math.max(0, position.y + vertical * distance)),
    };

    /* ===============================================
       DRAW IF ACTIVE
    =============================================== */

    if (keyboardDrawingCanvasId === id) {
      configureCanvasContext(context);

      context.beginPath();

      context.moveTo(position.x, position.y);

      context.lineTo(next.x, next.y);

      context.stroke();
    }

    /* ===============================================
       UPDATE VISIBLE CURSOR
    =============================================== */

    keyboardPositions.current[id] = next;

    setKeyboardCursorPositions((previous) => ({
      ...previous,

      [id]: next,
    }));
  };

  /* =====================================================
     DRAWING - CURSOR DATA

     استخدميها لعرض النقطة داخل Canvas wrapper
  ===================================================== */

  const getCanvasCursorState = (id) => {
    const canvas = canvasRefs.current[id];

    const position = keyboardCursorPositions[id];

    if (!canvas || !position) {
      return {
        visible: false,

        drawing: false,

        left: "50%",

        top: "50%",
      };
    }

    return {
      visible: keyboardCanvasId === id,

      drawing: keyboardDrawingCanvasId === id,

      left: `${(position.x / canvas.width) * 100}%`,

      top: `${(position.y / canvas.height) * 100}%`,
    };
  };

  /* =====================================================
     RETURN
  ===================================================== */

  return {
    /* =================================================
       DRAG API - SAME AS BEFORE
    ================================================= */

    keyboardItemId,

    keyboardTargetId,

    pickItem,

    handleTargetKeyDown,

    registerItem: (id, element) => {
      itemRefs.current[id] = element;
    },

    registerTarget: (id, element) => {
      targetRefs.current[id] = element;
    },

    focusItem,

    cancel,

    /* =================================================
       DRAW API
    ================================================= */

    drawingTool,

    setDrawingTool,

    drawingColor,

    setDrawingColor,

    keyboardCanvasId,

    keyboardDrawingCanvasId,

    keyboardCursorPositions,

    registerCanvas,

    handleCanvasPointerDown,

    handleCanvasPointerMove,

    handleCanvasPointerUp,

    handleCanvasPointerCancel: handleCanvasPointerUp,

    handleCanvasFocus,

    handleCanvasBlur,

    handleCanvasKeyDown,

    undoCanvas,

    clearCanvas,

    saveCanvasHistory,

    getCanvasCursorState,
  };
}
