import { FlexProps } from '../Flex/types';
import { INavItemMedia, NavigationItemProps } from '../Navigation/types';

interface INavItem {
    isAccordion?: boolean;
    label?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    icon?: INavItemMedia['icon'];
    media?: React.ReactNode;
    meta?: React.ReactNode;

    // set true to avoid any alterations to navItemMedia svg paths
    unstyled?: boolean;
}

export type NavItemProps = INavItem & NavigationItemProps;

interface ICanvasMenu {
    isMinified?: boolean;
    isVisible?: boolean;
    items?: {
        header?: Array<NavItemProps>;
        content?: Array<NavItemProps>;
        footer?: Array<NavItemProps>;
    };
    // as?: string;
    children?: React.ReactNode;
}

export type CanvasMenuProps = ICanvasMenu & FlexProps;
