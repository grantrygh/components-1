import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import React from 'react';
import { IColorModeProvider } from '../ColorModeProvider';
import { baseTheme, ThemeType } from '../theme';
import { ITheme } from '../theme/types';

export interface IThemeProvider {
    theme?: ITheme;
    children?: React.ReactNode;
    defaultMode?: 'light' | 'dark';
}

// TODO: check into providerTheme type tslint error when ITHemeProvider is used
// @ts-ignore
const BaseThemeProvider = ({ theme: providedTheme, children }: IThemeProvider) => {
    // const colorMode = useColorMode();

    // needs more work still to override existing styles, but still allow dependencies.
    // i.e, "button" color prop depends on primary, so passing a different primary color should change all props dependent on primary
    const emotionTheme = baseTheme({
        providedTheme,
        mode: 'dark',
    });

    return <EmotionThemeProvider theme={emotionTheme as ThemeType}>{children}</EmotionThemeProvider>;
};

export const ThemeProvider = ({ theme: providedTheme, children, defaultMode }: IThemeProvider) => {
    const mode = ((typeof window !== 'undefined' && localStorage?.getItem('themeMode')) ||
        defaultMode ||
        'light') as IColorModeProvider['defaultMode'];

    return (
        // <ColorModeProvider defaultMode={mode}>
        <BaseThemeProvider theme={providedTheme}>{children}</BaseThemeProvider>
        // </ColorModeProvider>
    );
};

export { useTheme } from '@emotion/react';
