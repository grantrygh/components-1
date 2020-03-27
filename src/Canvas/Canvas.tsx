import React, { createContext, useCallback, useContext, useState } from 'react';
import Flex from '../Flex';
import useCanvasStyle from './styles';
import { ICanvasContext } from './types';

export const CanvasContext = createContext<ICanvasContext>(null);

export default function CanvasContainer({ initialState = {}, ...props }) {
    const [canvasState, setCanvasState] = useState(initialState);
    const style = useCanvasStyle(props);
    const toggleCanvas = useCallback((name: string) => {
        setCanvasState(state => ({
            ...state,
            [name]: !state[name],
        }));
    }, []);

    return (
        <CanvasContext.Provider value={{ canvasState, setCanvasState, toggleCanvas }}>
            <Flex {...style} {...props} />
        </CanvasContext.Provider>
    );
}

export function CanvasPanel(props) {
    const { canvasState } = useContext(CanvasContext);

    if (!canvasState[props.name]) return null;

    return <Flex direction="column" {...props} />;
}
