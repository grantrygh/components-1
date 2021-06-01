import React, { createContext, useContext, useState } from 'react';
import { IThemeProvider } from '../ThemeProvider';

export interface IColorModeProvider {
    defaultMode?: IThemeProvider['defaultMode'];
    children?: React.ReactNode;
}

export const ColorModeContext = createContext<any>(null);

export const ColorModeProvider = ({ children, defaultMode }: IColorModeProvider) => {
    const [mode, updateMode] = useState(defaultMode);
    const setMode = newMode => {
        updateMode(newMode);
        if (typeof window !== 'undefined' && localStorage) {
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
