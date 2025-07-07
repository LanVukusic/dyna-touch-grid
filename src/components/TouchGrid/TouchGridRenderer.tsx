import React from 'react';
import { TouchGridProps } from './TouchGridTypes';

export const TouchGridRenderer = ({ settings }: { settings: TouchGridProps }) => {
  const { width, height, items } = settings;

  const gridContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`,
    width: '100%',
    height: '100%',
    gap: '0.5rem',
    // padding: '10px',
    boxSizing: 'border-box',
  };

  return (
    <div style={gridContainerStyle}>
      {items.map((gridItem, _) => {
        const position = gridItem.position;
        // Destructure Component out and pass the rest of the item properties to it.
        const { Component, ...itemProps } = gridItem.item;

        const itemStyle: React.CSSProperties = {
          gridColumnStart: position.x + 1,
          gridColumnEnd: `span ${position.xspan}`,
          gridRowStart: position.y + 1,
          gridRowEnd: `span ${position.yspan}`,
          border: '1px solid #ddd',
          // borderRadius: '8px',
          // padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        };

        return (
          <div key={gridItem.item.id} style={itemStyle}>
            <Component {...itemProps} />
          </div>
        );
      })}
    </div>
  );
};
