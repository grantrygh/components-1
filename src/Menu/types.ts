import * as React from 'react';
import { BoxProps } from '../Box/types';
import { PopperProps } from '../Popper';
import { PseudoBoxProps } from '../PseudoBox/types';

interface InternalState {
    isOpen?: boolean;
    onClose?: () => void;
}

type MenuChildren =
    | {
          children: React.ReactNode;
      }
    | { children: (props: InternalState) => React.ReactNode };

export interface IMenu {
    isOpen?: boolean;
    autoSelect?: boolean;
    closeOnBlur?: boolean;
    closeOnSelect?: boolean;

    defaultIsOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    defaultActiveIndex?: number;
    placement?: PopperProps['placement'];
}

export type MenuProps = IMenu & MenuChildren;

export interface IMenuButton {
    onClick?: React.MouseEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    variantColor?: string;
}
export type MenuButtonProps = PseudoBoxProps & IMenuButton;

export interface IMenuList {
    onKeydown?: React.KeyboardEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
}
export type MenuListProps = IMenuList & PopperProps;

interface IMenuItem {
    isDisabled?: boolean;
    role?: 'menuitem' | 'menuitemradio' | 'menuitemcheckbox';
    onClick?: React.KeyboardEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
}
export type MenuItemProps = IMenuItem & PseudoBoxProps;

interface IMenuGroup {
    title?: string;
    children: React.ReactNode;
}
export type MenuGroupProps = IMenuGroup & BoxProps;

export * from './MenuOption';
