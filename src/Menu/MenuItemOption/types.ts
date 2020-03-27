import * as React from 'react';
import { PseudoBoxProps } from '../../PseudoBox/types';
import { MenuGroupProps } from '../types';

type stringOrNumber = string | number | Array<number | string>;

interface IMenuOptionGroup {
    children?: React.ReactNode;
    type?: 'radio' | 'checkbox';
    name?: string;
    title?: string;
    value?: stringOrNumber;
    defaultValue?: stringOrNumber;
    onChange?: (value: stringOrNumber) => void;
}

export type MenuOptionGroupProps = MenuGroupProps & IMenuOptionGroup;

interface IMenuItemOption {
    children: React.ReactNode;
    isDisabled?: boolean;
    isChecked?: boolean;
    type?: 'radio' | 'checkbox';
    onClick?: React.KeyboardEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    onMouseMove?: React.MouseEventHandler<HTMLElement>;
    value?: string | number;
}

export type MenuItemOptionProps = PseudoBoxProps & IMenuItemOption;
