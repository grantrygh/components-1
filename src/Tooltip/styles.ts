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
        maxW: '320px',
        zIndex: 'tooltip',
        color: 'titleText',
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
