import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DndContext } from '@dnd-kit/core';
import { useTouchGrid } from '../../hooks/useTouchGrid';
import { DraggableGridItem } from './DraggableGridItem';
import { TouchGridRenderer } from './TouchGridRenderer';
/**
 * The TouchGridEditor is a user-friendly component for building interactive,
 * draggable, and resizable grid layouts. It is built on top of the headless
 * `useTouchGrid` hook and provides a default rendering implementation.
 */
export const TouchGridEditor = ({ items: inputItems, height, width, onChange, renderers, gap, }) => {
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
    _jsx(DndContext, { onDragEnd: handleDragEnd, modifiers: [snapToGridModifier], children: _jsxs("div", { ref: gridContainerRef, style: { position: 'relative', width: '100%', height: '100%' }, children: [_jsx(TouchGridRenderer, { items: items, height: height, width: width, gap: gap }), items.map((instance) => (_jsx(DraggableGridItem, { instance: instance, gridWidth: width, gridHeight: height, renderers: renderers, cellSize: cellSize, gap: gap }, instance.id)))] }) }));
};
