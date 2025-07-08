/**
 * Main entry point for the dyna-touch-grid library.
 */

// Core Components
export { TouchGridEditor } from './components/TouchGrid/TouchGridEditor';
export { TouchGridRenderer } from './components/TouchGrid/TouchGridRenderer';

// Headless Hook
export { useTouchGrid } from './hooks/useTouchGrid';

// Type Definitions
export type {
  TouchGridEditorProps,
  TouchGridInstance,
  TouchGridItem,
  TouchGridPosition,
  TouchGridProps,
  TouchGridRenderers,
  TouchGridStyleProps,
  MoveOverlayProps,
  ResizeHandleProps,
} from './components/TouchGrid/TouchGridTypes';
