import { jsx as _jsx } from "react/jsx-runtime";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HomePage } from './pages/HomePage';
export default function App() {
    return (_jsx(DndProvider, { backend: HTML5Backend, children: _jsx(HomePage, {}) }));
}
