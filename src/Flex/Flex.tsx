import React, { forwardRef } from 'react';
import Box from '../Box';
import { FlexProps } from './types';

const Flex = forwardRef(({ align, justify, wrap, direction, ...rest }: FlexProps, ref) => (
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

Flex.displayName = 'Flex';

export default Flex;
