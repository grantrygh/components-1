import React from 'react';
import Box from '../Box';
import { useColorMode } from '../ColorModeProvider';
import { useTheme } from '../ThemeProvider';

const Text = React.forwardRef((props, ref) => {
    const { colorMode } = useColorMode();
    const { colors } = useTheme();
    const color = { light: colors.black, dark: colors.white };

    return <Box ref={ref} as="p" fontFamily="body" color={color[colorMode]} {...props} />;
});

Text.displayName = 'Text';

export default Text;
