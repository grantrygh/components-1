import * as React from 'react';
import { BoxProps } from '../Box/types';
import { IButton } from '../Button/types';
import { Omit } from '../common-types';

export interface IButtonGroup {
    size?: IButton['size'];
    color?: string;
    variant?: IButton['variant'];
    variantColor?: IButton['variantColor'];
    /**
     * If `true`, the borderRadius of button that are direct children will be altered
     * to look flushed together
     */
    isAttached?: boolean;
    children?: React.ReactNode;
}

export type ButtonGroupProps = IButtonGroup & Omit<BoxProps, 'size'>;
