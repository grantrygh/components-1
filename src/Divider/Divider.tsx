import React, { forwardRef } from 'react';
import { Box } from '../Box';
import useDividerStyle from './styles';
import { DividerProps } from './types';

export const Divider = forwardRef(({ orientation = 'horizontal', size, ...props }: DividerProps, ref) => {
    const borderStyleProps = useDividerStyle({
        orientation,
        size,
    });
    return <Box ref={ref} as="hr" aria-orientation={orientation} border="0" {...borderStyleProps} {...props} />;
});
