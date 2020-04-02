import { BoxProps } from '../Box/types';

export interface INavigation {
    logo?: string;

    /**
     * make toolbar sticky
     */
    isSticky?: boolean;
}

export type NavigationProps = INavigation & BoxProps;
