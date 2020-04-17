import { useTheme } from '../ThemeProvider';

export const tooltipStyle = ({ placement = 'auto' }, theme) => ({
    style: {
        timeout: 200,
        arrowSize: '10px',
        px: 2,
        py: 1,
        placement,
        borderRadius: 'radius',
        bg: 'tooltip',
        shadow: 'menu',
        fontSize: 'sm',
        fontWeight: 'medium',
        pointerEvents: 'none',
        color: 'white',
        maxW: '320px',
    },
});

const useTooltipStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].tooltip ? theme['styles'].tooltip(props, theme) : tooltipStyle(props, theme);

    return {
        ...styles.style,
    };
};

export default useTooltipStyle;
