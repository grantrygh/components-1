import { BoxProps } from '../Box/types';
import { FlexProps } from '../Flex';
import { IconProps } from '../Icon';

export type StatLabelProps = BoxProps;

export type StatHelpTextProps = BoxProps;

export type StatNumberProps = BoxProps;

interface IStatArrow {
    type?: 'increase' | 'decrease';
    'aria-label'?: string;
}
export type StatArrowProps = IStatArrow & IconProps;

export type StatProps = BoxProps;

export type StatGroupProps = FlexProps;
