import React, { createContext, useState } from 'react';
import { CanvasContainer } from '../Canvas';

const WrapperContext = createContext<any>({});

export default function Wrapper(props) {
    const [canvasState, setCanvasState] = useState({ leftVisible: false, rightVisible: false });

    return (
        <WrapperContext.Provider value={{ canvasState, setCanvasState }}>
            <CanvasContainer>{props.children}</CanvasContainer>
        </WrapperContext.Provider>
    );
}
