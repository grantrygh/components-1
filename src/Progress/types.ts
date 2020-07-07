import { BoxProps } from '../Box/types';

export interface IProgress {
    color?: string;
    // pass an end color to style the progress bar with a linear gradient
    endColor?: string;
    value?: number;
    min?: number;
    max?: number;
    size?: 'lg' | 'md' | 'sm';
    hasStripe?: boolean;
    isAnimated?: boolean;

    isIndeterminate?: boolean;
}

export type ProgressProps = IProgress & BoxProps;
