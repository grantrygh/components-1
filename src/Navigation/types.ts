import { MdiReactIconComponentType } from 'mdi-react';
import { BoxProps } from '../Box/types';

export interface INavigation {
    logo?: string;

    /**
     * make toolbar sticky
     */
    isSticky?: boolean;
}

interface INavItem {
    href?: string;
    exact?: boolean;
    isActive?: boolean;
    isParent?: boolean;
    isSubmenuItem?: boolean;
}

interface INavItemMedia {
    icon?: MdiReactIconComponentType;
}

export type NavigationProps = INavigation & BoxProps;
export type NavigationItemProps = INavItem & BoxProps;
export type NavigationItemMediaProps = INavItemMedia & BoxProps;
