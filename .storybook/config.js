import { addDecorator, configure } from '@storybook/react';
import React from 'react';
import { CSSReset, ThemeProvider } from '../src';

const req = require.context('../src', true, /examples\.(js|mdx)$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

const AppProvider = ({ children }) => {
    return (
        <ThemeProvider>
            <CSSReset />
            {children}
        </ThemeProvider>
    );
};

addDecorator(story => <AppProvider>{story()}</AppProvider>);

configure(loadStories, module);
