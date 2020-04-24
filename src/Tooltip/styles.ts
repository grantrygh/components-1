import { useTheme } from '../ThemeProvider';

export const tooltipStyle = ({ placement = 'auto' }, theme) => ({
    style: {
        timeout: 200,
        arrowSize: '10px',
        p: 'spacing-sm',
        placement,
        borderRadius: 'radius',
        bg: 'tooltip',
        shadow: 'menu',
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
