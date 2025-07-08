import { useState } from 'react';
import { exampleTouchGridProps } from '@/components/TouchGrid/TouchGrid.example';
import { TouchGridEditor } from '@/components/TouchGrid/TouchGridEditor';
import { TouchGridRenderer } from '@/components/TouchGrid/TouchGridRenderer';
import { TouchGridInstance } from '@/components/TouchGrid/TouchGridTypes';

export function HomePage() {
  const { items: exampleItems, height, width } = exampleTouchGridProps;

  const [items, setItems] = useState<TouchGridInstance<any>[]>(exampleItems);
  const [render, setRender] = useState(false);
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <button type="button" onClick={() => setRender(!render)}>
        Toggle Render
      </button>
      {render && <TouchGridRenderer items={items} gap={2} height={height} width={width} />}
      {!render && (
        <TouchGridEditor items={items} onChange={setItems} height={height} width={width} gap={20} />
      )}
    </div>
    //
  );
}
