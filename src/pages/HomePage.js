import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Button } from '@mantine/core';
import { exampleTouchGridProps } from '@/components/TouchGrid/TouchGrid.example';
import { TouchGridEditor } from '@/components/TouchGrid/TouchGridEditor';
import { TouchGridRenderer } from '@/components/TouchGrid/TouchGridRenderer';
// import { TouchGridRenderer } from '@/components/TouchGrid/TouchGridRenderer';
export function HomePage() {
    const { items: exampleItems, height, width } = exampleTouchGridProps;
    const [items, setItems] = useState(exampleItems);
    const [render, setRender] = useState(false);
    return (_jsxs(Box, { w: "100%", h: "100%", children: [_jsx(Button, { onClick: () => {
                    setRender(!render);
                }, children: "Toggle" }), render && _jsx(TouchGridRenderer, { items: items, gap: 2, height: height, width: width }), !render && (_jsx(TouchGridEditor, { items: items, onChange: setItems, height: height, width: width, gap: 20, renderers: {
                    ResizeHandle: () => (_jsx(Box, { bg: "blue", p: "lg", style: {
                            position: 'absolute',
                            // these styles are to position the resize handle div wrapper
                            // the handle itself is the child component
                            bottom: 0,
                            right: 0,
                            cursor: 'nwse-resize',
                        }, children: "|||" })),
                } }))] })
    //
    );
}
