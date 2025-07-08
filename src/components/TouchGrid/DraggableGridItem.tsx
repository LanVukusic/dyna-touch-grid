import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { DefaultMoveOverlay } from './DefaultMoveOverlay';
import { DefaultResizeHandle } from './DefaultResizeHandle';
import { TouchGridInstance, TouchGridRenderers } from './TouchGridTypes';

interface DraggableGridItemProps {
  instance: TouchGridInstance<any>;
  gridWidth: number;
  gridHeight: number;
  renderers?: TouchGridRenderers;
  cellSize: { width: number; height: number };
  gap?: number;
}

/**
 * A presentational component that provides a draggable and resizable overlay
 * for a single grid item. It uses a render prop pattern to allow for custom
 * visuals for the move overlay and resize handle.
 */
export const DraggableGridItem: React.FC<DraggableGridItemProps> = ({
  instance,
  renderers,
  cellSize,
  gap = 0,
}) => {
  const { id, position } = instance;

  // Draggable hook for moving the entire item.
  const {
    attributes: moveAttributes,
    listeners: moveListeners,
    setNodeRef: setMoveNodeRef,
    isDragging: isMoving,
    transform: moveTransform,
  } = useDraggable({
    id: `move-${id}`,
    data: { type: 'move', instance },
  });

  // Draggable hook specifically for the resize handle.
  const {
    attributes: resizeAttributes,
    listeners: resizeListeners,
    setNodeRef: setResizeNodeRef,
    isDragging: isResizing,
    transform: resizeTransform,
  } = useDraggable({
    id: `resize-${id}`,
    data: { type: 'resize', instance },
  });

  // Determine which components to render, falling back to defaults.
  const MoveOverlay = renderers?.MoveOverlay || DefaultMoveOverlay;
  const ResizeHandle = renderers?.ResizeHandle || DefaultResizeHandle;

  // Calculate the base position and size using absolute pixel values.
  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x * (cellSize.width + gap)}px`,
    top: `${position.y * (cellSize.height + gap)}px`,
    width: `${position.xspan * cellSize.width + Math.max(0, position.xspan - 1) * gap}px`,
    height: `${position.yspan * cellSize.height + Math.max(0, position.yspan - 1) * gap}px`,
    touchAction: 'none',
    boxSizing: 'border-box',
    zIndex: isMoving || isResizing ? 10 : 1, // Bring to front when active
  };

  // Apply visual changes based on the drag type.
  if (isResizing && resizeTransform) {
    // During resize, adjust width/height directly using calc().
    style.width = `calc(${style.width} + ${resizeTransform.x}px)`;
    style.height = `calc(${style.height} + ${resizeTransform.y}px)`;
  } else if (isMoving && moveTransform) {
    // During move, apply a transform to translate the entire element.
    style.transform = CSS.Translate.toString(moveTransform);
  }

  return (
    // This is the main draggable area for MOVE operations.
    <div ref={setMoveNodeRef} style={style} {...moveListeners} {...moveAttributes}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <MoveOverlay isMoving={isMoving}>
          {/* This is the handle for RESIZE operations */}
        </MoveOverlay>
        <div ref={setResizeNodeRef} {...resizeListeners} {...resizeAttributes}>
          <ResizeHandle isResizing={isResizing} />
        </div>
      </div>
    </div>
  );
};
