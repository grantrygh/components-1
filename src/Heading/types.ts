import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';

interface IHeading {
    kind?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle';
}

export type HeadingProps = IHeading & Omit<BoxProps, 'size'>;
