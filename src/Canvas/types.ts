import React from 'react';
import { BoxProps } from '../Box/types';

type CanvasState = { [key: string]: boolean };

export interface ICanvasContext {
    canvasState: { [key: string]: boolean };
    setCanvasState: React.Dispatch<React.SetStateAction<CanvasState>>;
    toggleCanvasInline: (dir: string) => void;
    toggleCanvasOverlay: (dir: string) => void;
}

interface IPanelChild {
    name: string;
    render: (componentProps) => React.ReactNode;
    position?: 'left' | 'right' | string;
    // [min, max] viewport ranges.
    ranges?: {
        // TODO: set typescript type for number[] with fixed length at 2 numbers.
        // if within range, panel will render as visible
        defaultVisible: boolean | number[];
        // if within range, panel will render as an overlay. otherwise will display inline.
        isOverlay: boolean | number[];
        // sets the range in which the panel can be minified. pass 'false' to never all minified panel
        allowMinify: boolean | number[];
        // if within this range and the allowMinify range, panel will render as minfied, rather than expanded
        defaultMinified: boolean | number[]; // --> isMinified
    };
}

export interface ICanvasWrapper {
    children?: React.ReactNode;
    initialCanvasState: {
        // Main section is always visible, inline, and non-minifiable. Must be named 'main'
        main: Omit<IPanelChild, 'name | position | ranges'> & { name: 'main' | string } & BoxProps;
        [panelName: string]: IPanelChild & BoxProps;
    };

    // optional. to render a header above panels, rather than part of the page panel itself.
    header?: React.ReactNode;
}

export type CanvasWrapperProps = ICanvasWrapper;
