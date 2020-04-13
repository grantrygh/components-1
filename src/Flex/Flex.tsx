import React, { forwardRef } from 'react';
import { Box } from '../Box';
import { FlexProps } from './types';

export const Flex = forwardRef(({ align, justify, wrap, direction, ...rest }: FlexProps, ref) => (
    <Box
        ref={ref}
        display="flex"
        flexDirection={direction}
        alignItems={align}
        justifyContent={justify}
        flexWrap={wrap}
        {...rest}
    />
));
