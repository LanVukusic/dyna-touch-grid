import { jsx as _jsx } from "react/jsx-runtime";
/**
 * The default component rendered as the resize handle for a draggable grid item.
 * It's a small circle in the bottom-right corner.
 */
export const DefaultResizeHandle = ({ isResizing }) => {
    return (_jsx("div", { style: {
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
            // The handle can visually react to being actively dragged.
            transform: isResizing ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.1s ease-in-out',
        } }));
};
