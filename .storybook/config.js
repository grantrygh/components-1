import { addDecorator, configure } from '@storybook/react';
import React, { useState } from 'react';
import { CSSReset, ThemeProvider } from '../src';
import Box from '../src/Box';
import Button from '../src/Button';
import { DarkMode, LightMode } from '../src/ColorModeProvider';

const req = require.context('../src', true, /examples\.(js|mdx)$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

const StorybookBg = {
    light: 'white',
    dark: 'gray.800',
};

const AppProvider = ({ children }) => {
    const [CurrentColorMode, setCurrentColorMode] = useState(() => LightMode);
    const color = CurrentColorMode().props.value;

    return (
        <ThemeProvider>
            <CSSReset />
            <CurrentColorMode>
                <Box position="fixed" right={4} top={4} zIndex={1}>
                    <Button
                        onClick={() => {
                            setCurrentColorMode(() => LightMode);
                        }}
                        size="sm"
                        bg="white"
                        color="black"
                    >
                        Light
                    </Button>

                    <Button
                        onClick={() => {
                            setCurrentColorMode(() => DarkMode);
                        }}
                        size="sm"
                        bg="black"
                        color="white"
                    >
                        Dark
                    </Button>
                </Box>
                <Box bg={StorybookBg[color]} minHeight="100vh">
                    {children}
                </Box>
            </CurrentColorMode>
        </ThemeProvider>
    );
};

addDecorator(story => <AppProvider>{story()}</AppProvider>);

configure(loadStories, module);
