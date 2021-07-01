import * as React from 'react';
import { BoxProps } from '../Box/types';
import { IButton } from '../Button/types';
import { PopperProps } from '../Popper/types';
import { PseudoBoxProps } from '../PseudoBox/types';

type InternalState = {
    isOpen?: boolean;
    onClose?: () => void;
};

type MenuChildren =
    | {
          children: React.ReactNode;
      }
    | { children: (props: InternalState) => React.ReactNode };

export type IMenu = {
    isOpen?: boolean;
    autoSelect?: boolean;
    closeOnBlur?: boolean;
    closeOnSelect?: boolean;

    defaultIsOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    defaultActiveIndex?: number;
    placement?: PopperProps['placement'];
};

export type MenuProps = IMenu & MenuChildren;

export type IMenuButton = {
    onClick?: React.MouseEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    variantColor?: IButton['variantColor'];
    variant?: IButton['variant'];
};
export type MenuButtonProps = PseudoBoxProps & IMenuButton;

export type IMenuList = {
    onKeydown?: React.KeyboardEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
};
export type MenuListProps = IMenuList & PopperProps;

type IMenuItem = {
    isDisabled?: boolean;
    role?: 'menuitem' | 'menuitemradio' | 'menuitemcheckbox';
    onClick?: React.KeyboardEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
};
export type MenuItemProps = IMenuItem & PseudoBoxProps;

type IMenuGroup = {
    title?: string;
    children: React.ReactNode;
};
export type MenuGroupProps = IMenuGroup & BoxProps;

export type IMenuContext = {
    activeIndex?: number;
    isOpen?: boolean;
    focusAtIndex?: (index: number) => void;
    focusOnFirstItem?: () => void;
    focusOnLastItem?: () => void;
    closeMenu?: () => void;
    openMenu?: () => void;
    focusableItems?: React.RefObject<any>;
    buttonRef?: React.RefObject<any>;
    menuId?: string;
    buttonId?: string;
    menuRef?: React.RefObject<any>;
    closeOnBlur?: boolean;
    autoSelect?: IMenu['autoSelect'];
    placement?: IMenu['placement'];
};

export type MenuContextProps = IMenuContext;
