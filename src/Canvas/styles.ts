import { componentStyleDef } from '../theme/types';
import { useTheme } from '../ThemeProvider';

function canvasPanelStyle({ type, isInline, isOverlay }, theme) {}

export const canvasStyle: componentStyleDef = (props, theme) => ({
    style: {
        minHeight: '100vh',
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    panel: {
        // background: '#444',
    },
});

const useCanvasStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].canvas ? theme['styles'].canvas(props, theme) : canvasStyle(props, theme);

    return styles;
};

export default useCanvasStyle;
