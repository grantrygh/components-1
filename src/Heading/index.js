/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import Box from '../Box';
import { useColorMode } from '../ColorModeProvider';
import { useTheme } from '../ThemeProvider';

const sizes = {
    '2xl': ['4xl', null, '5xl'],
    xl: ['3xl', null, '4xl'],
    lg: ['xl', null, '2xl'],
    md: 'xl',
    sm: 'md',
    xs: 'sm',
};

const Heading = forwardRef(({ size = 'xl', ...props }, ref) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const textColors = { light: colors.black, dark: colors.white };

    return (
        <Box
            ref={ref}
            as="h2"
            fontSize={sizes[size]}
            lineHeight="shorter"
            fontWeight="bold"
            fontFamily="heading"
            color={textColors[colorMode]}
            {...props}
        />
    );
});

Heading.displayName = 'Heading';

export default Heading;
