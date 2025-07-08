import React from 'react';
import { TouchGridInstance, TouchGridItem, TouchGridProps } from './TouchGridTypes';

// 1. Define some simple, flat-colored components.
const RedComponent: React.FC = () => (
  <div
    style={{
      backgroundColor: 'hsl(0, 80%, 70%)',
      width: '100%',
      height: '100%',
      border: '1px solid hsl(0, 80%, 50%)',
      borderRadius: '4px',
    }}
  />
);
const BlueComponent: React.FC = () => (
  <div
    style={{
      backgroundColor: 'hsl(210, 80%, 70%)',
      width: '100%',
      height: '100%',
      border: '1px solid hsl(210, 80%, 50%)',
      borderRadius: '4px',
    }}
  />
);
const GreenComponent: React.FC = () => (
  <div
    style={{
      backgroundColor: 'hsl(120, 80%, 70%)',
      width: '100%',
      height: '100%',
      border: '1px solid hsl(120, 80%, 50%)',
      borderRadius: '4px',
    }}
  />
);
const YellowComponent: React.FC = () => (
  <div
    style={{
      backgroundColor: 'hsl(60, 80%, 70%)',
      width: '100%',
      height: '100%',
      border: '1px solid hsl(60, 80%, 50%)',
      borderRadius: '4px',
    }}
  />
);
const PurpleComponent: React.FC = () => (
  <div
    style={{
      backgroundColor: 'hsl(270, 80%, 70%)',
      width: '100%',
      height: '100%',
      border: '1px solid hsl(270, 80%, 50%)',
      borderRadius: '4px',
    }}
  />
);
const OrangeComponent: React.FC = () => (
  <div
    style={{
      backgroundColor: 'hsl(30, 80%, 70%)',
      width: '100%',
      height: '100%',
      border: '1px solid hsl(30, 80%, 50%)',
      borderRadius: '4px',
    }}
  />
);

// 2. Define the items that can be placed on the grid.
const items: TouchGridItem<any>[] = [
  { label: 'Red', Component: RedComponent },
  { label: 'Blue', Component: BlueComponent },
  { label: 'Green', Component: GreenComponent },
  { label: 'Yellow', Component: YellowComponent },
  { label: 'Purple', Component: PurpleComponent },
  { label: 'Orange', Component: OrangeComponent },
];

// 3. Define the instances of the items on the grid, with their positions and spans.
const instances: TouchGridInstance<any>[] = [
  // A few items to demonstrate the layout
  { id: crypto.randomUUID(), item: items[0], position: { x: 0, y: 0, xspan: 2, yspan: 2 } }, // Red
  { id: crypto.randomUUID(), item: items[1], position: { x: 2, y: 0, xspan: 3, yspan: 1 } }, // Blue
  { id: crypto.randomUUID(), item: items[2], position: { x: 0, y: 2, xspan: 1, yspan: 4 } }, // Green
  { id: crypto.randomUUID(), item: items[3], position: { x: 5, y: 0, xspan: 4, yspan: 3 } }, // Yellow
  { id: crypto.randomUUID(), item: items[4], position: { x: 1, y: 2, xspan: 2, yspan: 2 } }, // Purple
  { id: crypto.randomUUID(), item: items[5], position: { x: 9, y: 0, xspan: 3, yspan: 5 } }, // Orange

  { id: crypto.randomUUID(), item: items[0], position: { x: 3, y: 3, xspan: 6, yspan: 2 } }, // Red
  { id: crypto.randomUUID(), item: items[1], position: { x: 0, y: 6, xspan: 5, yspan: 2 } }, // Blue
  { id: crypto.randomUUID(), item: items[2], position: { x: 5, y: 5, xspan: 2, yspan: 3 } }, // Green

  { id: crypto.randomUUID(), item: items[3], position: { x: 0, y: 8, xspan: 2, yspan: 4 } }, // Yellow
  { id: crypto.randomUUID(), item: items[4], position: { x: 7, y: 5, xspan: 5, yspan: 5 } }, // Purple

  { id: crypto.randomUUID(), item: items[5], position: { x: 2, y: 8, xspan: 5, yspan: 4 } }, // Orange
];

// 4. Combine everything into the final TouchGridProps object.
export const exampleTouchGridProps: TouchGridProps = {
  width: 12,
  height: 12,
  items: instances,
};
