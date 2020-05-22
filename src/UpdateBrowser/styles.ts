import { useTheme } from 'emotion-theming';
import { componentStyleDef, DefaultTheme } from '../theme/types';
import { UpdateBrowserProps } from './types';

export const updateBrowserStyle: componentStyleDef<UpdateBrowserProps> = () => ({
    style: {
        bg: 'transparent',
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        textAlign: 'center' as const,
        display: 'table',
    },
});

// explicitly set px units - IE 6-8 doesn't support rem
const browserBoxStyle = {
    bg: 'gray.50',
    padding: '32px',
    margin: '16px',
    height: '175px',
    width: '200px',
    textAlign: 'center' as const,
    display: 'inline-block',
    boxSizing: 'border-box' as const,
};

const useUpdateBrowserStyle = props => {
    const theme = useTheme() as DefaultTheme;
    const styles = theme['styles'].updateBrowser
        ? theme['styles'].updateBrowser(props, theme)
        : updateBrowserStyle(props, theme);

    return {
        updateBrowserStyleProps: styles.style,
        browserBoxStyleProps: browserBoxStyle,
    };
};

export default useUpdateBrowserStyle;
