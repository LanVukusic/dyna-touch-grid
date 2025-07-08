import React from 'react';

// Core Data Structures
// =================================================================

// Generic TouchGridItem that can be used with any type of data or component.
export interface TouchGridItem<T> {
  label: string;
  description?: string;
  Component: React.FC<T>;
}

// Defines the position and size of an item on the grid.
export interface TouchGridPosition {
  x: number;
  y: number;
  xspan: number;
  yspan: number;
}

// Represents a specific instance of an item placed on the grid.
export interface TouchGridInstance<T> {
  id: string; // A unique identifier for this specific instance (e.g., a UUID)
  item: TouchGridItem<T>;
  position: TouchGridPosition;
}

// The main configuration object for the entire grid.
export interface TouchGridProps {
  width: number;
  height: number;
  items: TouchGridInstance<any>[];
}

export interface TouchGridStyleProps {
  gap?: number;
}

// Render Prop and Customization Types
// =================================================================

export interface ResizeHandleProps {
  isResizing: boolean;
}

export interface MoveOverlayProps {
  isMoving: boolean;
}

/**
 * An object containing optional custom components to override the default
 * rendering of the editor's interactive elements.
 */
export interface TouchGridRenderers {
  ResizeHandle?: React.FC<ResizeHandleProps>;
  MoveOverlay?: React.FC<MoveOverlayProps>;
}

// Component Prop Types
// =================================================================

/**
 * Props for the non-interactive TouchGrid display component.
 */
export interface TouchGridComponentProps {
  items: TouchGridInstance<any>[];
  width: number;
  height: number;
}

/**
 * Props for the interactive TouchGridEditor component.
 */
export interface TouchGridEditorProps {
  /** The initial grid layout and configuration. */
  items: TouchGridInstance<any>[];
  width: number;
  height: number;
  gap?: number;
  /** An optional callback that is fired whenever the layout changes. */
  onChange?: (items: TouchGridInstance<any>[]) => void;
  onItemChange?: (item: TouchGridInstance<any>, type: 'resize' | 'move') => void;
  /** Optional custom components to override the default editor visuals. */
  renderers?: TouchGridRenderers;
}
