import { BoxProps } from '../Box/types';

export interface IProgress {
    color?: string;
    value?: number;
    min?: number;
    max?: number;
    size?: 'lg' | 'md' | 'sm';
    hasStripe?: boolean;
    isAnimated?: boolean;

    isIndeterminate?: boolean;
}

export type ProgressProps = IProgress & BoxProps;
