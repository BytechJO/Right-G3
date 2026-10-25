import { useCallback, useEffect, useState } from "react";

const focusAndReveal = (element) => {
  if (!element) return;
  element.focus({ preventScroll: true });
  element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
};

export default function useWorkbookMatchingKeyboard({
  boardRef,
  leftIds,
  rightIds,
  getElement,
  getAnchorElement = getElement,
  isLeftLocked = () => false,
  isRightLocked = () => false,
  onCommit,
  onStart,
  onCancel,
}) {
  const [origin, setOrigin] = useState(null);
  const [target, setTarget] = useState(null);
  const [preview, setPreview] = useState(null);

  const available = useCallback(
    (side) =>
      (side === "left" ? rightIds : leftIds).filter((id) =>
        side === "left" ? !isRightLocked(id) : !isLeftLocked(id),
      ),
    [isLeftLocked, isRightLocked, leftIds, rightIds],
  );

  const updatePreview = useCallback(
    (nextTarget) => {
      if (!origin || !nextTarget || origin.side === nextTarget.side) {
        setPreview(null);
        return;
      }
      const board = boardRef.current;
      const from = getAnchorElement(origin.side, origin.id);
      const to = getAnchorElement(nextTarget.side, nextTarget.id);
      if (!board || !from || !to) return;
      const boardRect = board.getBoundingClientRect();
      const fromRect = from.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();
      setPreview({
        x1: fromRect.left + fromRect.width / 2 - boardRect.left,
        y1: fromRect.top + fromRect.height / 2 - boardRect.top,
        x2: toRect.left + toRect.width / 2 - boardRect.left,
        y2: toRect.top + toRect.height / 2 - boardRect.top,
      });
    },
    [boardRef, getAnchorElement, origin],
  );

  const clear = useCallback(() => {
    setOrigin(null);
    setTarget(null);
    setPreview(null);
  }, []);

  const start = (side, id) => {
    if ((side === "left" && isLeftLocked(id)) || (side === "right" && isRightLocked(id))) return;
    const targets = available(side);
    if (!targets.length) return;
    const nextOrigin = { side, id };
    const nextTarget = { side: side === "left" ? "right" : "left", id: targets[0] };
    setOrigin(nextOrigin);
    setTarget(nextTarget);
    onStart?.(side, id);
    window.requestAnimationFrame(() => focusAndReveal(getElement(nextTarget.side, nextTarget.id)));
  };

  useEffect(() => {
    updatePreview(target);
    const refresh = () => updatePreview(target);
    window.addEventListener("resize", refresh);
    return () => window.removeEventListener("resize", refresh);
  }, [target, updatePreview]);

  const handleKeyDown = (event, side, id) => {
    if (!origin) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        start(side, id);
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      const savedOrigin = origin;
      clear();
      onCancel?.();
      window.requestAnimationFrame(() => focusAndReveal(getElement(savedOrigin.side, savedOrigin.id)));
      return;
    }

    if (origin.side === side) return;

    if (event.key === "Tab") {
      event.preventDefault();
      event.stopPropagation();
      const targets = available(origin.side);
      const current = Math.max(0, targets.indexOf(id));
      const direction = event.shiftKey ? -1 : 1;
      const nextId = targets[(current + direction + targets.length) % targets.length];
      const nextTarget = { side, id: nextId };
      setTarget(nextTarget);
      window.requestAnimationFrame(() => focusAndReveal(getElement(side, nextId)));
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      const savedOrigin = origin;
      const leftId = side === "left" ? id : savedOrigin.id;
      const rightId = side === "right" ? id : savedOrigin.id;
      onCommit(leftId, rightId);
      clear();
      window.requestAnimationFrame(() => focusAndReveal(getElement(savedOrigin.side, savedOrigin.id)));
    }
  };

  const handleFocus = (side, id) => {
    if (!origin || origin.side === side) return;
    const nextTarget = { side, id };
    setTarget(nextTarget);
    updatePreview(nextTarget);
  };

  return { origin, target, preview, clear, handleKeyDown, handleFocus };
}
