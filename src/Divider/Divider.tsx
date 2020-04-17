/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import { Box } from '../Box';
import useDividerStyle from './styles';
import { DividerProps } from './types';

export const Divider = forwardRef(({ orientation = 'horizontal', ...props }: DividerProps, ref) => {
    const borderStyleProps = useDividerStyle({
        orientation,
    });
    return <Box ref={ref} as="hr" aria-orientation={orientation} border="0" {...borderStyleProps} {...props} />;
});
