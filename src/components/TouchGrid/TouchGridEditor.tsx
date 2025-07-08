import React from 'react';
import { DndContext } from '@dnd-kit/core';
import { useTouchGrid } from '../../hooks/useTouchGrid';
import { DraggableGridItem } from './DraggableGridItem';
import { TouchGridRenderer } from './TouchGridRenderer';
import { TouchGridEditorProps } from './TouchGridTypes';

/**
 * The TouchGridEditor is a user-friendly component for building interactive,
 * draggable, and resizable grid layouts. It is built on top of the headless
 * `useTouchGrid` hook and provides a default rendering implementation.
 */
export const TouchGridEditor: React.FC<TouchGridEditorProps> = ({
  items: inputItems,
  height,
  width,
  onChange,
  renderers,
  gap,
}) => {
  // All the complex state management and event handling is managed by the hook.
  const { items, gridContainerRef, handleDragEnd, snapToGridModifier, cellSize } = useTouchGrid({
    height,
    width,
    items: inputItems,
    onChange,
    gap,
  });

  return (
    // DndContext provides the drag-and-drop functionality.
    // The snapToGridModifier ensures all interactions are aligned to the grid.
    <DndContext onDragEnd={handleDragEnd} modifiers={[snapToGridModifier]}>
      <div ref={gridContainerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* First, render the actual components in their current positions. */}
        <TouchGridRenderer items={items} height={height} width={width} gap={gap} />

        {/*
          Then, render a draggable and resizable overlay for each item.
          These overlays are what the user actually interacts with.
        */}
        {items.map((instance) => (
          <DraggableGridItem
            key={instance.id}
            instance={instance}
            gridWidth={width}
            gridHeight={height}
            renderers={renderers}
            cellSize={cellSize}
            gap={gap}
          />
        ))}
      </div>
    </DndContext>
  );
};
