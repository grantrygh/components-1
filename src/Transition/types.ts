import * as React from 'react';
import { TransitionProps } from 'react-spring/renderprops';
import { BoxProps } from '../Box/types';

interface ISlideIn {
    in: boolean;
    offset?: string;
    duration?: number;
    children: (styles: Object) => React.ReactNode;
}

export type SlideInProps = ISlideIn & TransitionProps<boolean>;

interface IScale {
    in: boolean;
    initialScale?: number;
    duration?: number;
    children: (styles: Object) => React.ReactNode;
}

export type ScaleProps = IScale & Partial<TransitionProps<boolean>>;

interface ISlide {
    in: boolean;
    finalHeight?: BoxProps['height'];
    finalWidth?: BoxProps['maxWidth'];
    duration?: number;
    from: 'bottom' | 'top' | 'left' | 'right';
}

export type SlideProps = ISlide & TransitionProps<boolean>;
