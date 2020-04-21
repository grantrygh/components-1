import { useTheme } from '../ThemeProvider';

export const graphStyle = (props, { colors }) => ({
    style: {},
    legend: {
        verticalAlign: 'top',
        align: 'right',
        height: 36,
        iconType: 'circle',
    },
    axis: {
        tick: {
            fill: colors.faintText,
        },
        tickMargin: 10,
    },
    variants: {
        bar: {
            radius: [10, 10, 0, 0],
        },
        area: {
            strokeWidth: 3,
            fillOpacity: 1,
            type: 'monotone',
            dot: { strokeWidth: 3, r: 7, fill: '#fff' },
        },
    },
    colors: [
        colors.primary[300],
        colors.secondary[300],
        colors.pink[300],
        colors.purple[300],
        colors.teal[300],
        colors.red[300],
        colors.green[300],
        colors.cyan[300],
        colors.orange[300],
    ],
});

const useGraphStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].graph ? theme['styles'].graph(props, theme) : graphStyle(props, theme);

    return {
        // base style
        root: styles.style,
        // variant style
        graph: styles.variants[props.variant || 'area'],
        axis: styles.axis,
        legend: styles.legend,
        colors: styles.colors,
    };
};

export default useGraphStyle;
