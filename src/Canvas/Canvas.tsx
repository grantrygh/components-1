import React, { createContext, useCallback, useContext, useState } from 'react';
import Box from '../Box';
import Flex from '../Flex';
import useCanvasStyle from './styles';
import { ICanvasContext } from './types';

export const CanvasContext = createContext<ICanvasContext>(null);

export default function CanvasContainer({ initialState = {}, ...props }) {
    const [canvasState, setCanvasState] = useState(initialState);

    const style = useCanvasStyle(props);
    const toggleCanvasOverlay = useCallback((name: string) => {
        setCanvasState(state => ({
            ...state,
            [name]: {
                overlay: !state[name].overlay,
                inline: state[name].inline,
            },
        }));
    }, []);

    const toggleCanvasInline = useCallback((name: string) => {
        setCanvasState(state => ({
            ...state,
            [name]: {
                overlay: state[name].overlay,
                inline: !state[name].inline,
            },
        }));
    }, []);

    return (
        <CanvasContext.Provider value={{ canvasState, setCanvasState, toggleCanvasInline, toggleCanvasOverlay }}>
            <Flex {...style} {...props} />
        </CanvasContext.Provider>
    );
}

export function CanvasPanel(props) {
    const { canvasState, toggleCanvasOverlay } = useContext(CanvasContext);
    const isOverlay = canvasState[props.type]?.overlay;
    const isInline = canvasState[props.type]?.inline;
    const style = useCanvasStyle({ ...props, isOverlay, isInline });

    if (props.type === 'drawer' || props.type === 'sidebar') {
        let width: string | number = 0;

        if (isInline) width = 'auto';

        return (
            <Flex width={width}>
                <Box
                    onClick={() => {
                        toggleCanvasOverlay(props.type);
                    }}
                    {...style.canvasOverlay}
                />
                <Flex {...style.canvasPanel} direction="column" {...props} />
            </Flex>
        );
    }

    return <Flex {...style.canvasPanel} direction="column" {...props} />;
}
