import { BoxProps } from '../Box/types';

export interface IAlert {
    /**
     * The status of the alert
     */
    status?: 'error' | 'success' | 'warning' | 'info';
    /**
     * The variant of the alert style to use.
     */
    variant?: 'subtle' | 'solid' | 'left-accent' | 'top-accent';
}

export type AlertProps = IAlert & BoxProps;
