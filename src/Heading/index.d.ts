import * as React from 'react';
import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';

interface IHeading {
    /**
     * The size of the Heading.
     */
    size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
}

export type HeadingProps = IHeading & Omit<BoxProps, 'size'>;

declare const Heading: React.FC<HeadingProps>;

export default Heading;
