import { addDecorator, configure } from '@storybook/react';
import React, { useState } from 'react';
import Box from '../src/Box';
import Button from '../src/Button';
import { DarkMode, LightMode } from '../src/ColorModeProvider';
import CSSReset from '../src/CSSReset';
import { ThemeProvider } from '../src/ThemeProvider';

const req = require.context('../src', true, /examples\.(js|mdx|ts|tsx)$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

const storyStyle = {
    light: {
        pageBg: 'white',
        switchTo: {
            label: 'Dark',
            value: DarkMode,
        },
        buttonBg: 'black',
        buttonColor: 'white',
    },
    dark: {
        pageBg: 'gray.800',
        switchTo: {
            label: 'Light',
            value: LightMode,
        },
        buttonBg: 'white',
        buttonColor: 'black',
    },
};

const AppProvider = ({ children }) => {
    const [CurrentColorMode, setCurrentColorMode] = useState(() => LightMode);
    const color = CurrentColorMode().props.value;
    const story = storyStyle[color];

    return (
        <ThemeProvider>
            <CSSReset />
            <CurrentColorMode>
                <Box position="fixed" right={4} top={4} zIndex={1}>
                    <Button
                        onClick={() => {
                            setCurrentColorMode(() => story.switchTo.value);
                        }}
                        size="sm"
                        bg={story.buttonBg}
                        color={story.buttonColor}
                    >
                        Switch to {story.switchTo.label} mode
                    </Button>
                </Box>
                <Box bg={story.pageBg} minHeight="100vh">
                    {children}
                </Box>
            </CurrentColorMode>
        </ThemeProvider>
    );
};

addDecorator(story => <AppProvider>{story()}</AppProvider>);

configure(loadStories, module);
