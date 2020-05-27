import { FlexProps } from '../Flex/types';
import { INavItemMedia, NavigationItemProps } from '../Navigation/types';

interface INavItem {
    isAccordion?: boolean;
    label?: React.ReactNode;
    href?: string;
    icon?: INavItemMedia['icon'];
    media?: React.ReactNode;
    meta?: React.ReactNode;
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
