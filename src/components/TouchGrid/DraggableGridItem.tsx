import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { TouchGridInstance } from './TouchGridTypes';

interface DraggableGridItemProps {
  instance: TouchGridInstance<any>;
  gridWidth: number;
  gridHeight: number;
}

/**
 * A component that provides a draggable and resizable overlay for a single
 * grid item. It correctly distinguishes between a move and a resize operation
 * for visual feedback. During a resize, the component's width/height are
 * adjusted, rather than applying a transform. This version uses the `transform`
 * object from `useDraggable` for more robust state management.
 */
export const DraggableGridItem: React.FC<DraggableGridItemProps> = ({
  instance,
  gridWidth,
  gridHeight,
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

  // Calculate the base position and size using percentages for responsiveness.
  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${(position.x / gridWidth) * 100}%`,
    top: `${(position.y / gridHeight) * 100}%`,
    width: `${(position.xspan / gridWidth) * 100}%`,
    height: `${(position.yspan / gridHeight) * 100}%`,
    touchAction: 'none',
    boxSizing: 'border-box',
    zIndex: isMoving || isResizing ? 10 : 1, // Bring to front when active
  };

  // Apply visual changes based on the drag type.
  if (isResizing && resizeTransform) {
    // During resize, adjust width/height directly using calc(). This makes
    // the item appear to stretch from its top-left corner.
    style.width = `calc(${style.width} + ${resizeTransform.x}px)`;
    style.height = `calc(${style.height} + ${resizeTransform.y}px)`;
  } else if (isMoving && moveTransform) {
    // During move, apply a transform to translate the entire element.
    style.transform = CSS.Translate.toString(moveTransform);
  }

  return (
    // This is the main draggable area for MOVE operations.
    <div ref={setMoveNodeRef} style={style} {...moveListeners} {...moveAttributes}>
      {/* A semi-transparent overlay to give a visual cue */}
      <div
        style={{
          width: '100%',
          height: '100%',
          border: '2px dashed rgba(255, 255, 255, 0.7)',
          boxSizing: 'border-box',
          opacity: isMoving || isResizing ? 1 : 0.5,
          transition: 'opacity 0.2s ease-in-out',
        }}
      />

      {/* This is the handle for RESIZE operations */}
      <div
        ref={setResizeNodeRef}
        style={{
          position: 'absolute',
          bottom: -8,
          right: -8,
          width: '24px',
          height: '24px',
          backgroundColor: 'rgba(0, 120, 255, 0.9)',
          border: '2px solid white',
          borderRadius: '50%',
          cursor: 'nwse-resize',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          zIndex: 11, // Ensure handle is on top of everything
        }}
        {...resizeListeners}
        {...resizeAttributes}
      />
    </div>
  );
};
