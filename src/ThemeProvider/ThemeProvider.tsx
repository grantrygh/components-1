/** @jsx jsx */
import { jsx, ThemeContext } from '@emotion/core';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { useContext } from 'react';
import { baseTheme, theme, ThemeType } from '../theme';
import { ITheme } from '../theme/types';

interface IThemeProvider {
    theme?: ITheme;
    children?: React.ReactNode;
}

// TODO: check into providerTheme type tslint error when ITHemeProvider is used
// @ts-ignore
export const ThemeProvider = ({ theme: providerTheme, children }: IThemeProvider) => {
    const emotionTheme = baseTheme(providerTheme);
    return <EmotionThemeProvider theme={emotionTheme as ThemeType}>{children}</EmotionThemeProvider>;
};

export function useTheme(): ITheme {
    const _theme = useContext(ThemeContext);
    if (theme === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    // @ts-ignore
    return _theme;
}
