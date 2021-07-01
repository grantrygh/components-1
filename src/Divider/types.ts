import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';

type IDivider = {
    orientation?: BoxProps['aria-orientation'];
    size?: number;
};

export type DividerProps = IDivider & Omit<BoxProps, 'aria-orientation'>;
