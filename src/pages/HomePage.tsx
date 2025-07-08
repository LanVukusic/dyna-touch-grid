import { useState } from 'react';
import { Box, Button } from '@mantine/core';
import { exampleTouchGridProps } from '@/components/TouchGrid/TouchGrid.example';
import { TouchGridEditor } from '@/components/TouchGrid/TouchGridEditor';
import { TouchGridRenderer } from '@/components/TouchGrid/TouchGridRenderer';
import { TouchGridInstance } from '@/components/TouchGrid/TouchGridTypes';

// import { TouchGridRenderer } from '@/components/TouchGrid/TouchGridRenderer';

export function HomePage() {
  const { items: exampleItems, height, width } = exampleTouchGridProps;

  const [items, setItems] = useState<TouchGridInstance<any>[]>(exampleItems);
  const [render, setRender] = useState(false);
  return (
    <Box w="100%" h="100%">
      <Button
        onClick={() => {
          setRender(!render);
        }}
      >
        Toggle
      </Button>
      {render && <TouchGridRenderer items={items} gap={2} height={height} width={width} />}
      {!render && (
        <TouchGridEditor
          items={items}
          onChange={setItems}
          height={height}
          width={width}
          gap={20}
          renderers={{
            ResizeHandle: () => (
              <Box
                bg="blue"
                p="lg"
                style={{
                  position: 'absolute',
                  // these styles are to position the resize handle div wrapper
                  // the handle itself is the child component
                  bottom: 0,
                  right: 0,
                  cursor: 'nwse-resize',
                }}
              >
                |||
              </Box>
            ),
          }}
        />
      )}
    </Box>
    //
  );
}
