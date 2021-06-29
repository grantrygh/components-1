import * as React from 'react';
import { TLengthStyledSystem } from 'styled-system';
import { PseudoBoxProps } from '../../PseudoBox/types';
import { MenuGroupProps } from '../types';

type stringOrNumber = string | number | Array<number | string>;

interface IMenuOptionGroup {
    children?: React.ReactNode;
    type?: 'radio' | 'checkbox';
    name?: string;
    title?: string;
    value?: string | number | (string[] & TLengthStyledSystem[]);
    defaultValue?: stringOrNumber;
    onChange?: (value: stringOrNumber) => void;
}

export type MenuOptionGroupProps = MenuGroupProps & IMenuOptionGroup;

type IMenuItemOption = {
    children: React.ReactNode;
    isDisabled?: boolean;
    isChecked?: boolean;
    type?: 'radio' | 'checkbox';
    onClick?: React.KeyboardEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    onMouseMove?: React.MouseEventHandler<HTMLElement>;
    value?: string | number;
};

export type MenuItemOptionProps = PseudoBoxProps & IMenuItemOption;
