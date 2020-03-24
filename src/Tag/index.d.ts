import * as React from 'react';
import { IBadge } from '../Badge';
import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';
import { IconProps } from '../Icon';
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
export interface ITagCloseButton {
    isDisabled?: boolean;
}
export type TagProps = ITag & Omit<PseudoBoxProps, 'size'>;
declare const Tag: React.FC<TagProps>;
export default Tag;

export const TagLabel: React.FC<BoxProps>;
export const TagCloseButton: React.FC<PseudoBoxProps> & ITagCloseButton;

type TagIconProps = Omit<IconProps, 'name'> & {
    icon: IconProps['name'] | React.ComponentType;
};
export const TagIcon: React.FC<TagIconProps>;
