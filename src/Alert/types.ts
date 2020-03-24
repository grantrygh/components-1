import { BoxProps } from '../Box/Box.types';

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

export interface IAlertContext {
    status?: IAlert['status'];
    variant?: string;
}

export type AlertProps = IAlert & BoxProps;
