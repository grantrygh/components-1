import React from 'react';

type CanvasState = { [key: string]: boolean };

export interface ICanvasContext {
    canvasState: { [key: string]: boolean };
    setCanvasState: React.Dispatch<React.SetStateAction<CanvasState>>;
    toggleCanvasInline: (dir: string) => void;
    toggleCanvasOverlay: (dir: string) => void;
}
