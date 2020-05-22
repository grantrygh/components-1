import * as React from 'react';
import { IBadge } from '../Badge/types';
import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';
import { IconProps } from '../Icon/types';
import { PseudoBoxProps } from '../PseudoBox';

export interface ITag {
    /**
     * The variant of the tag.
     */
    variant?: IBadge['variant'];
    /**
     * The size of the tag.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * The color scheme of the tag.
     */
    variantColor?: IBadge['variantColor'];
}

export type TagProps = ITag & Omit<PseudoBoxProps, 'size'>;

export type TagLabelProps = BoxProps;

export interface ITagCloseButton {
    isDisabled?: boolean;
}
export type TagCloseButtonProps = PseudoBoxProps & ITagCloseButton;

export type TagIconProps = Omit<IconProps, 'name'> & {
    icon: IconProps['name'] | React.ComponentType;
};
