# Dyna Touch Grid

A flexible and powerful React library for creating draggable and resizable grid layouts with touch support.

## Overview

The Touch Grid Library provides a set of components and a headless hook to easily build interactive grid-based UIs. It's designed to be highly customizable, allowing you to tailor the look, feel, and behavior to your specific needs.

**Features:**

- **Draggable and Resizable:** Items can be moved and resized within the grid.
- **Collision Detection:** Prevents items from overlapping.
- **Grid Snapping:** Ensures all movements and resizing align perfectly with the grid.
- **Customizable Rendering:** Override the default components to create a unique design.
- **Controlled and Uncontrolled Modes:** Use it as a self-contained component or manage the state from a parent.
- **Touch Support:** Works seamlessly on touch devices.

## Installation

To install the library, run the following command:

```bash
npm install dyna-touch-grid
```

## Core Components

### `TouchGridEditor`

The `TouchGridEditor` is the primary component for creating an interactive grid. It encapsulates all the logic for dragging, resizing, and collision detection, and it provides a default rendering implementation that can be easily customized. It's the component you'll typically use to make your grids interactive.

### `TouchGridRenderer`

The `TouchGridRenderer` is a "dumb" component that is responsible for rendering the static grid layout. It takes an array of items and a grid configuration and displays them as a simple CSS grid. The `TouchGridEditor` uses this component internally to display the final layout, but you could also use it on its own if you only need to display a static, non-interactive grid.

## Getting Started

Here's a basic example of how to use the `TouchGridEditor` to create a simple 2x2 grid with two items:

```tsx
import React, { useState } from 'react';
import { TouchGridEditor, TouchGridInstance } from 'dyna-touch-grid';

const MyComponent = ({ text }: { text: string }) => (
  <div style={{ padding: '1rem', textAlign: 'center' }}>{text}</div>
);

const App = () => {
  const [items, setItems] = useState<TouchGridInstance<any>[]>([
    {
      id: 'item-1',
      position: { x: 0, y: 0, xspan: 1, yspan: 1 },
      item: { Component: MyComponent, text: 'Item 1' },
    },
    {
      id: 'item-2',
      position: { x: 1, y: 1, xspan: 1, yspan: 1 },
      item: { Component: MyComponent, text: 'Item 2' },
    },
  ]);

  return (
    <div style={{ width: '500px', height: '500px', border: '1px solid #ccc' }}>
      <TouchGridEditor items={items} onChange={setItems} width={2} height={2} gap={10} />
    </div>
  );
};

export default App;
```

## Configuration (Props)

The `TouchGridEditor` component accepts the following props:

- `items`: An array of `TouchGridInstance` objects that define the grid's layout and content.
- `onChange`: A callback function that is fired whenever the layout changes. Providing this and `items` puts the component in "controlled" mode.
- `width`: The number of columns in the grid.
- `height`: The number of rows in the grid.
- `gap` (optional): The space (in pixels) between grid cells. This is applied to both the horizontal and vertical gaps.
- `renderers` (optional): An object that allows you to override the default components for the move overlay and resize handle.

### The `gap` Property

The `gap` property adds space between the grid cells, making the layout feel less crowded. When you set a `gap`, the library automatically adjusts the cell size and snapping calculations to ensure that all interactions remain perfectly aligned with the visible grid. The renderer uses CSS Grid's `gap` property, while the editor overlay calculates positions manually to account for the gap.

## Customization

You can customize the appearance of the drag overlay and the resize handle by providing your own components to the `renderers` prop. This allows you to match the editor's design to your application's look and feel.

### Example: Overriding Renderers

Here's an example of how to provide custom components for the move overlay and resize handle:

```tsx
import React, { useState } from 'react';
import {
  MoveOverlayProps,
  ResizeHandleProps,
  TouchGridEditor,
  TouchGridInstance,
} from 'dyna-touch-grid';

// A custom move overlay
const CustomMoveOverlay: React.FC<MoveOverlayProps> = ({ isMoving, children }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: isMoving ? 'rgba(0, 123, 255, 0.5)' : 'transparent',
      border: '2px dashed #007bff',
      borderRadius: '8px',
      boxSizing: 'border-box',
    }}
  >
    {children}
  </div>
);

// A custom resize handle
const CustomResizeHandle: React.FC<ResizeHandleProps> = ({ isResizing }) => (
  <div
    style={{
      position: 'absolute',
      bottom: '5px',
      right: '5px',
      width: '20px',
      height: '20px',
      backgroundColor: isResizing ? '#dc3545' : '#28a745',
      borderRadius: '50%',
      cursor: 'se-resize',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    }}
  />
);

const MyComponent = ({ text }: { text: string }) => (
  <div style={{ padding: '1rem', textAlign: 'center' }}>{text}</div>
);

const AppWithCustomRenderers = () => {
  const [items, setItems] = useState<TouchGridInstance<any>[]>([
    {
      id: 'item-1',
      position: { x: 0, y: 0, xspan: 1, yspan: 1 },
      item: { Component: MyComponent, text: 'Item 1' },
    },
  ]);

  return (
    <div style={{ width: '500px', height: '500px', border: '1px solid #ccc' }}>
      <TouchGridEditor
        items={items}
        onChange={setItems}
        width={2}
        height={2}
        gap={10}
        renderers={{
          MoveOverlay: CustomMoveOverlay,
          ResizeHandle: CustomResizeHandle,
        }}
      />
    </div>
  );
};

export default AppWithCustomRenderers;
```

In this example, we've created two custom components: `CustomMoveOverlay` and `CustomResizeHandle`. We then pass these components to the `renderers` prop of the `TouchGridEditor`. The editor will now use our custom components instead of the default ones, giving you full control over the editing experience.
