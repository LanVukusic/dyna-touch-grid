// Generic TouchGridItem that can be used with any type of data or component
export interface TouchGridItem<T> {
  id: number;
  label: string;
  description?: string;
  Component: React.FC<T>;
}

export interface TouchGridPosition {
  x: number;
  y: number;
  xspan: number;
  yspan: number;
}

export interface TouchGridInstance<T> {
  id: string; // A unique identifier for this specific instance
  item: TouchGridItem<T>;
  position: TouchGridPosition;
}

export interface TouchGridProps {
  width: number;
  height: number;
  items: TouchGridInstance<any>[];
}
