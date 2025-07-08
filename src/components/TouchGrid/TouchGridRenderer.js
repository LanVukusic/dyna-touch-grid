import { jsx as _jsx } from "react/jsx-runtime";
export const TouchGridRenderer = ({ items, height, width, gap, }) => {
    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `repeat(${height}, 1fr)`,
        width: '100%',
        height: '100%',
        gap,
        // padding: '10px',
        boxSizing: 'border-box',
    };
    return (_jsx("div", { style: gridContainerStyle, children: items.map((gridItem, _) => {
            const position = gridItem.position;
            // Destructure Component out and pass the rest of the item properties to it.
            const { Component, ...itemProps } = gridItem.item;
            const itemStyle = {
                gridColumnStart: position.x + 1,
                gridColumnEnd: `span ${position.xspan}`,
                gridRowStart: position.y + 1,
                gridRowEnd: `span ${position.yspan}`,
                // border:   '1px solid #ddd',
                // borderRadius: '8px',
                // padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            };
            return (_jsx("div", { style: itemStyle, children: _jsx(Component, { ...itemProps }) }, gridItem.id));
        }) }));
};
