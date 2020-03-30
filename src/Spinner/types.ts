import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';

export interface ISpinnerProps {
    /**
     * The size of the spinner
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * The color of the empty area in the spinner
     */
    emptyColor?: string;
    /**
     * The color of the spinner
     */
    color?: string;
    /**
     * The thickness of the spinner
     * @example
     * ```jsx
     * <Spinner thickness="4px"/>
     * ```
     */
    thickness?: string;
    /**
     * The speed of the spinner.
     * @example
     * ```jsx
     * <Spinner speed="0.2s"/>
     * ```
     */
    speed?: string;
    /**
     * For accessibility, it's important to add a fallback loading text.
     * This text will be visible to screen readers.
     */
    label?: string;
}

export type SpinnerProps = Omit<BoxProps, 'size'> & ISpinnerProps;
