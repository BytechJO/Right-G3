import { useRef, useState } from "react";

const isActivateKey = (event) => event.key === "Enter" || event.key === " ";

export default function useWorkbookUnit1TabDrag({
  itemIds,
  targetIds,
  getTargetIds,
  getItemIdsForItem,
  isItemDisabled,
  isTargetDisabled,
  onPick,
  onPlace,
}) {
  const [keyboardItemId, setKeyboardItemId] = useState(null);
  const [keyboardTargetId, setKeyboardTargetId] = useState(null);
  const itemRefs = useRef({});
  const targetRefs = useRef({});

  const focusItem = (id) =>
    window.requestAnimationFrame(() => itemRefs.current[id]?.focus());
  const focusTarget = (id) =>
    window.requestAnimationFrame(() => targetRefs.current[id]?.focus());
  const availableTargets = (itemId = keyboardItemId) =>
    (getTargetIds ? getTargetIds(itemId) : targetIds).filter(
      (id) => !isTargetDisabled(id),
    );

  const pickItem = (id) => {
    if (isItemDisabled(id)) return;
    const targets = availableTargets(id);
    if (!targets.length) return;
    onPick?.(id);
    setKeyboardItemId(id);
    setKeyboardTargetId(targets[0]);
    focusTarget(targets[0]);
  };

  const handleItemKeyDown = (event, id) => {
    if (!isActivateKey(event)) return;
    event.preventDefault();
    event.stopPropagation();
    pickItem(id);
  };

  const cancel = () => {
    const origin = keyboardItemId;
    setKeyboardItemId(null);
    setKeyboardTargetId(null);
    if (origin) focusItem(origin);
  };

  const focusFirstUnused = (placedId) => {
    const candidates = getItemIdsForItem ? getItemIdsForItem(placedId) : itemIds;
    const first = candidates.find((id) => id !== placedId && !isItemDisabled(id));
    focusItem(first || placedId);
  };

  const handleTargetKeyDown = (event, targetId) => {
    if (!keyboardItemId) return;
    if (event.key === "Escape") {
      event.preventDefault();
      cancel();
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      const targets = availableTargets();
      const index = targets.indexOf(targetId);
      const direction = event.shiftKey ? -1 : 1;
      const next = targets[(index + direction + targets.length) % targets.length];
      setKeyboardTargetId(next);
      focusTarget(next);
      return;
    }
    if (isActivateKey(event)) {
      event.preventDefault();
      event.stopPropagation();
      const placedId = keyboardItemId;
      onPlace(placedId, targetId);
      setKeyboardItemId(null);
      setKeyboardTargetId(null);
      focusFirstUnused(placedId);
    }
  };

  return {
    keyboardItemId,
    keyboardTargetId,
    pickItem,
    handleItemKeyDown,
    handleTargetKeyDown,
    registerItem: (id, element) => {
      itemRefs.current[id] = element;
    },
    registerTarget: (id, element) => {
      targetRefs.current[id] = element;
    },
    focusItem,
    cancel,
  };
}
