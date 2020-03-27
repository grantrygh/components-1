import { componentStyleDef } from '../theme/types';
import { useTheme } from '../ThemeProvider';

export const canvasStyle: componentStyleDef = ({ kind }, theme) => ({
    canvasPanel: {},
    style: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const useCanvasStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].canvas ? theme['styles'].canvas(props, theme) : canvasStyle(props, theme);

    return {
        ...styles.style,
        canvasPanel: styles.canvasPanel,
    };
};

export default useCanvasStyle;
