import * as React from 'react';
import * as StyledSystem from 'styled-system';
import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';
import { IconProps } from '../Icon';
import { PseudoBoxProps } from '../PseudoBox';

interface IList {
    /**
     * The `list-style-type` of the list
     */
    styleType?: StyledSystem.ResponsiveValue<React.CSSProperties['listStyleType']>;
    /**
     * The `list-style-position` of the list
     */
    stylePos?: StyledSystem.ResponsiveValue<React.CSSProperties['listStylePosition']>;
    /**
     * The space between each list item
     */
    spacing?: StyledSystem.MarginBottomProps['marginBottom'];
}

export type ListProps = IList & BoxProps;

export type ListItemProps = PseudoBoxProps;

export type ListIconProps = Omit<IconProps, 'name'> & {
    icon: IconProps['name'] | React.ComponentType;
};
