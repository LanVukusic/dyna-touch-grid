import { jsx as _jsx } from "react/jsx-runtime";
/**
 * The default component rendered as an overlay on a draggable grid item.
 * It provides a visual cue to the user, indicating that the item can be moved.
 */
export const DefaultMoveOverlay = ({ isMoving }) => {
    return (_jsx("div", { style: {
            width: '100%',
            height: '100%',
            border: '2px dashed rgba(255, 255, 255, 0.7)',
            boxSizing: 'border-box',
            // The overlay is more prominent during a drag operation.
            opacity: isMoving ? 1 : 0.5,
            transition: 'opacity 0.2s ease-in-out',
        } }));
};
