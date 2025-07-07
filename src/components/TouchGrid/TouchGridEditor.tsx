import React, { useLayoutEffect, useRef, useState } from 'react';
import { DndContext, DragEndEvent, Modifiers } from '@dnd-kit/core';
import { DraggableGridItem } from './DraggableGridItem';
import { TouchGridRenderer } from './TouchGridRenderer';
import { TouchGridInstance, TouchGridPosition, TouchGridProps } from './TouchGridTypes';

/**
 * Checks if two grid positions are colliding (overlapping).
 * @param p1 The first position.
 * @param p2 The second position.
 * @returns True if they collide, false otherwise.
 */
const isColliding = (p1: TouchGridPosition, p2: TouchGridPosition): boolean => {
  return (
    p1.x < p2.x + p2.xspan &&
    p1.x + p1.xspan > p2.x &&
    p1.y < p2.y + p2.yspan &&
    p1.y + p1.yspan > p2.y
  );
};

/**
 * The TouchGridEditor component provides a user interface for editing
 * the layout of a TouchGrid. It allows moving and resizing items using
 * drag-and-drop with snap-to-grid functionality.
 */
export const TouchGridEditor: React.FC<TouchGridProps> = (props) => {
  const [items, setItems] = useState<TouchGridInstance<any>[]>(props.items);
  const [cellSize, setCellSize] = useState({ width: 0, height: 0 });
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Calculate the pixel dimensions of a grid cell whenever the container size or grid dimensions change.
  useLayoutEffect(() => {
    if (gridContainerRef.current) {
      const { clientWidth, clientHeight } = gridContainerRef.current;
      setCellSize({
        width: clientWidth / props.width,
        height: clientHeight / props.height,
      });
    }
  }, [props.width, props.height]);

  /**
   * A dnd-kit modifier that snaps drag movements to the calculated grid cell size.
   * This ensures all interactions are perfectly aligned with the grid.
   */
  const snapToGridModifier: Modifiers[0] = ({ transform }) => {
    if (cellSize.width === 0 || cellSize.height === 0) {
      return transform; // Avoid division by zero if cell size isn't calculated yet.
    }
    return {
      ...transform,
      x: Math.round(transform.x / cellSize.width) * cellSize.width,
      y: Math.round(transform.y / cellSize.height) * cellSize.height,
    };
  };

  /**
   * This function is the core of the editor's logic. It is called at the end of a
   * drag operation and is responsible for updating the grid's state.
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const { instance, type } = active.data.current || {};

    // Exit if the drag was invalid or the cell size is not yet calculated.
    if (!instance || !type || cellSize.width === 0 || cellSize.height === 0) {
      return;
    }

    const draggedItemIndex = items.findIndex((i) => i.id === instance.id);
    if (draggedItemIndex === -1) return;

    const draggedItem = items[draggedItemIndex];
    const newPosition = { ...draggedItem.position };

    // The modifier has already snapped the pixel delta, so we can reliably convert it to grid units.
    const dx = Math.round(delta.x / cellSize.width);
    const dy = Math.round(delta.y / cellSize.height);

    // Apply changes based on the drag type (move or resize).
    if (type === 'resize') {
      newPosition.xspan = Math.max(1, newPosition.xspan + dx);
      newPosition.yspan = Math.max(1, newPosition.yspan + dy);
    } else if (type === 'move') {
      newPosition.x += dx;
      newPosition.y += dy;
    }

    // Boundary checks to ensure the item stays within the grid.
    newPosition.x = Math.max(0, newPosition.x);
    newPosition.y = Math.max(0, newPosition.y);
    newPosition.xspan = Math.min(newPosition.xspan, props.width - newPosition.x);
    newPosition.yspan = Math.min(newPosition.yspan, props.height - newPosition.y);

    // Collision checks against all other items.
    const hasCollision = items.some(
      (item) => item.id !== draggedItem.id && isColliding(newPosition, item.position)
    );

    if (hasCollision) {
      console.warn('Collision detected! Reverting move/resize.');
      return; // Revert the change.
    }

    // If no collision, update the state with the new item position.
    const newItems = [...items];
    newItems[draggedItemIndex] = { ...draggedItem, position: newPosition };
    setItems(newItems);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[snapToGridModifier]}>
      <div ref={gridContainerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* The renderer acts as the visual background for the editor. */}
        <TouchGridRenderer {...props} items={items} />

        {/* Render a draggable overlay for each item in the grid. */}
        {items.map((instance) => (
          <DraggableGridItem
            key={instance.id}
            instance={instance}
            gridWidth={props.width}
            gridHeight={props.height}
          />
        ))}
      </div>
    </DndContext>
  );
};
