import { BoxProps } from '../Box/types';

export interface IProgress {
    color?: string;
    // pass an end color to style the progress bar with a linear gradient
    endColor?: string;
    baseColor?: string;
    value?: number;
    min?: number;
    max?: number;
    size?: 'lg' | 'md' | 'sm';
    hasStripe?: boolean;
    isAnimated?: boolean;
    isIndeterminate?: boolean;
    inView?: boolean;
}

export type ProgressProps = IProgress & BoxProps;
