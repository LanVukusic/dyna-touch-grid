import { exampleTouchGridProps } from '@/components/TouchGrid/TouchGrid.example';
import { TouchGridEditor } from '@/components/TouchGrid/TouchGridEditor';

// import { TouchGridRenderer } from '@/components/TouchGrid/TouchGridRenderer';

export function HomePage() {
  return <TouchGridEditor settings={exampleTouchGridProps} />;
}
