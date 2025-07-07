import '@mantine/core/styles.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <MantineProvider theme={theme}>
        <Box
          w="100vw"
          h="100vh"
          style={{
            overflow: 'hidden',
          }}
        >
          <Router />
        </Box>
      </MantineProvider>
    </DndProvider>
  );
}
