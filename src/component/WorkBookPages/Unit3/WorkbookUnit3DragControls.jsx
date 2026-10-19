import { useRef } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import WorkbookUnit3PlayingAudioIcon from "./WorkbookUnit3PlayingAudioIcon";

export function WorkbookUnit3DragItem({
  id,
  disabled,
  registerItem,
  onPlayAudio,
  onKeyboardPick,
  activeAudio,
  ariaLabel,
  className,
  style,
  children,
}) {
  const pointerStart = useRef(null);
  const pointerMoved = useRef(false);
  const { attributes, listeners, setNodeRef } = useDraggable({ id, disabled });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        registerItem(id, element);
      }}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      onPointerDownCapture={(event) => {
        pointerStart.current = { x: event.clientX, y: event.clientY };
        pointerMoved.current = false;
      }}
      onPointerMoveCapture={(event) => {
        if (!pointerStart.current) return;
        if (
          Math.hypot(
            event.clientX - pointerStart.current.x,
            event.clientY - pointerStart.current.y,
          ) > 5
        ) {
          pointerMoved.current = true;
        }
      }}
      onClick={(event) => {
        if (event.detail === 0 || pointerMoved.current) return;
        onPlayAudio?.();
        pointerStart.current = null;
        pointerMoved.current = false;
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        if (disabled) onPlayAudio?.();
        else onKeyboardPick();
      }}
      className={className}
      style={{ ...style, touchAction: "none" }}
    >
      {children}
      <WorkbookUnit3PlayingAudioIcon active={activeAudio} />
    </div>
  );
}

export function WorkbookUnit3DropTarget({
  id,
  registerTarget,
  locked,
  tabIndex,
  ariaLabel,
  onRemove,
  onKeyDown,
  className,
  getStyle,
  value,
  preview,
  wrongNode,
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        registerTarget(id, element);
      }}
      role="button"
      tabIndex={tabIndex}
      aria-disabled={locked}
      aria-label={ariaLabel}
      onClick={() => value && !locked && onRemove()}
      onKeyDown={onKeyDown}
      className={className}
      style={getStyle(isOver)}
    >
      <span className={preview ? "wb-unit3-keyboard-preview" : undefined}>
        {preview || value}
      </span>
      {wrongNode}
    </div>
  );
}
