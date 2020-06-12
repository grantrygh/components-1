import { MdiReactIconComponentType } from 'mdi-react';
import { BoxProps } from '../Box/types';
import { FlexProps } from '../Flex/types';

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
    isMinified?: boolean;
    clickable?: boolean;
}

export interface INavItemMedia {
    icon?: MdiReactIconComponentType;
    isActive?: boolean;
    unstyled?: boolean;
}

export type NavigationProps = INavigation & BoxProps;
export type NavigationItemProps = INavItem & FlexProps;
export type NavigationItemMediaProps = INavItemMedia & BoxProps;
