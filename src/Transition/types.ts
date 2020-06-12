import { BoxProps } from '../Box/types';

export interface ISlideIn {
    in: boolean;
    offset?: string;
    duration?: number;
    children: any;
}

export type SlideInProps = ISlideIn;

interface IScale {
    in: boolean;
    initialScale?: number;
    duration?: number;
    children: any;
}

export type ScaleProps = IScale & BoxProps;

export interface ISlide {
    in: boolean;
    finalHeight?: BoxProps['height'];
    finalWidth?: BoxProps['maxWidth'];
    duration?: number;
    from: 'bottom' | 'top' | 'left' | 'right';
    children: any;
}

export type SlideProps = ISlide;
