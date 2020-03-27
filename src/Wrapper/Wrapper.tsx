import React, { createContext, useState } from 'react';
import CanvasContainer, { CanvasPanel } from '../Canvas';

const WrapperContext = createContext<any>({});

export default function Wrapper(props) {
    const [canvasState, setCanvasState] = useState({ leftVisible: false, rightVisible: false });

    return (
        <WrapperContext.Provider value={{ canvasState, setCanvasState }}>
            <CanvasContainer>
                <CanvasPanel>Left</CanvasPanel>

                <CanvasPanel flex="1">{props.children}</CanvasPanel>
            </CanvasContainer>
        </WrapperContext.Provider>
    );
}
