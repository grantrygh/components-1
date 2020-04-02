import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';

interface IDivider {
    orientation?: BoxProps['aria-orientation'];
}

export type DividerProps = IDivider & Omit<BoxProps, 'aria-orientation'>;
