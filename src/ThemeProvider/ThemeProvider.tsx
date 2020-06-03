/** @jsx jsx */
import { jsx, ThemeContext } from '@emotion/core';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { createContext, useContext, useState } from 'react';
import { baseTheme, theme, ThemeType } from '../theme';
import { ITheme } from '../theme/types';

interface IThemeProvider {
    theme?: ITheme;
    children?: React.ReactNode;
    defaultMode?: 'light' | 'dark';
}

interface IColorModeProvider {
    defaultMode?: IThemeProvider['defaultMode'];
    children?: React.ReactNode;
}

export const ColorModeContext = createContext<any>(null);

export const ColorModeProvider = ({ children, defaultMode }: IColorModeProvider) => {
    const [mode, updateMode] = useState(defaultMode);
    const setMode = newMode => {
        updateMode(newMode);
        if (__BROWSER__ && localStorage) {
            localStorage.setItem('themeMode', newMode); // save theme selection
        }
    };
    const context = { mode, setMode };
    return <ColorModeContext.Provider value={context}>{children}</ColorModeContext.Provider>;
};

export function useColorMode() {
    const _colorMode = useContext(ColorModeContext);

    if (_colorMode === undefined) {
        // will use light theme by default
        console.log('useColorMode must be used within a ColorModeProvider');
        return null;
    }

    // @ts-ignore
    return _colorMode;
}

// TODO: check into providerTheme type tslint error when ITHemeProvider is used
// @ts-ignore
const BaseThemeProvider = ({ theme: providedTheme, children }: IThemeProvider) => {
    const colorMode = useColorMode();

    // needs more work still to override existing styles, but still allow dependencies.
    // i.e, "button" color prop depends on primary, so passing a different primary color should change all props dependent on primary
    const emotionTheme = baseTheme({
        providedTheme,
        mode: colorMode?.mode,
    });
    return <EmotionThemeProvider theme={emotionTheme as ThemeType}>{children}</EmotionThemeProvider>;
};

export const ThemeProvider = ({ theme: providedTheme, children, defaultMode }: IThemeProvider) => {
    const mode = (defaultMode ||
        (__BROWSER__ && localStorage?.getItem('themeMode')) ||
        'light') as IColorModeProvider['defaultMode'];
    return (
        <ColorModeProvider defaultMode={mode}>
            <BaseThemeProvider theme={providedTheme}>{children}</BaseThemeProvider>
        </ColorModeProvider>
    );
};

export function useTheme(): ITheme {
    const _theme = useContext(ThemeContext);
    if (theme === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    // @ts-ignore
    return _theme;
}
