import React, { useState } from 'react';
import { TouchGridEditor } from './components/TouchGrid/TouchGridEditor';
import { TouchGridInstance } from './components/TouchGrid/TouchGridTypes';

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
