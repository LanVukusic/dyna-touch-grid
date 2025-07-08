import { useLayoutEffect, useRef, useState } from 'react';
/**
 * Checks if two grid positions are colliding (overlapping).
 * @param p1 The first position.
 * @param p2 The second position.
 * @returns True if they collide, false otherwise.
 */
const isColliding = (p1, p2) => {
    return (p1.x < p2.x + p2.xspan &&
        p1.x + p1.xspan > p2.x &&
        p1.y < p2.y + p2.yspan &&
        p1.y + p1.yspan > p2.y);
};
/**
 * A headless hook that encapsulates all the logic for a draggable and resizable grid.
 * It manages state, collision detection, and boundary checks, returning the necessary
 * props and data for a component to render the UI.
 *
 * @param layout - The initial grid layout and configuration.
 * @param onChange - An optional callback fired when the layout is updated.
 */
export const useTouchGrid = ({ width, height, items, onChange, onItemChange, gap = 0, }) => {
    const isControlled = items !== undefined && onChange !== undefined;
    const [internalItems, setInternalItems] = useState(items || []);
    const currItems = isControlled ? items : internalItems;
    const [cellSize, setCellSize] = useState({ width: 0, height: 0 });
    const gridContainerRef = useRef(null);
    // Calculate the pixel dimensions of a grid cell whenever the container size or grid dimensions change.
    useLayoutEffect(() => {
        if (gridContainerRef.current) {
            const { clientWidth, clientHeight } = gridContainerRef.current;
            setCellSize({
                width: (clientWidth - (width - 1) * gap) / width,
                height: (clientHeight - (height - 1) * gap) / height,
            });
        }
    }, [width, height, gap]);
    /**
     * A dnd-kit modifier that snaps drag movements to the calculated grid cell size.
     */
    const snapToGridModifier = ({ transform }) => {
        if (cellSize.width === 0 || cellSize.height === 0) {
            return transform;
        }
        const totalCellWidth = cellSize.width + gap;
        const totalCellHeight = cellSize.height + gap;
        return {
            ...transform,
            x: Math.round(transform.x / totalCellWidth) * totalCellWidth,
            y: Math.round(transform.y / totalCellHeight) * totalCellHeight,
        };
    };
    /**
     * The core logic that processes the end of a drag operation.
     */
    const handleDragEnd = (event) => {
        const { active, delta } = event;
        const { instance, type } = active.data.current || {};
        if (!instance || !type || cellSize.width === 0 || cellSize.height === 0) {
            return;
        }
        const draggedItemIndex = currItems.findIndex((i) => i.id === instance.id);
        if (draggedItemIndex === -1) {
            return;
        }
        const draggedItem = currItems[draggedItemIndex];
        const newPosition = { ...draggedItem.position };
        const dx = Math.round(delta.x / (cellSize.width + gap));
        const dy = Math.round(delta.y / (cellSize.height + gap));
        if (type === 'resize') {
            newPosition.xspan = Math.max(1, newPosition.xspan + dx);
            newPosition.yspan = Math.max(1, newPosition.yspan + dy);
        }
        else if (type === 'move') {
            newPosition.x += dx;
            newPosition.y += dy;
        }
        // Boundary checks
        newPosition.x = Math.max(0, newPosition.x);
        newPosition.y = Math.max(0, newPosition.y);
        newPosition.xspan = Math.min(newPosition.xspan, width - newPosition.x);
        newPosition.yspan = Math.min(newPosition.yspan, height - newPosition.y);
        // Collision check
        const hasCollision = currItems.some((item) => item.id !== draggedItem.id && isColliding(newPosition, item.position));
        if (hasCollision) {
            return; // Revert if collision is detected
        }
        const newItems = [...currItems];
        newItems[draggedItemIndex] = { ...draggedItem, position: newPosition };
        if (isControlled) {
            onChange(newItems);
        }
        else {
            setInternalItems(newItems);
        }
        onItemChange?.(newItems[draggedItemIndex], type);
    };
    return {
        items: currItems,
        gridContainerRef,
        handleDragEnd,
        snapToGridModifier,
        cellSize,
        gap,
    };
};
