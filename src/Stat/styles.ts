import { useTheme } from '../ThemeProvider';

export const statStyle = (props, theme) => ({
    style: {
        flex: 1,
        pr: 4,
    },
    arrow: {
        style: {
            mr: 1,
            size: 4,
            verticalAlign: 'middle',
        },
        types: {
            increase: {
                name: 'triangle-up',
                color: 'success.500',
            },
            decrease: {
                name: 'triangle-down',
                color: 'error.500',
            },
        },
    },
    label: {
        fontWeight: 'medium',
        fontSize: 'sm',
    },
    help: {
        fontSize: 'sm',
        opacity: 0.8,
        mb: 2,
    },
    number: {
        fontSize: '2xl',
        verticalAlign: 'baseline',
        fontWeight: 'semibold',
    },
    group: {
        wrap: 'wrap',
        justify: 'space-around',
        align: 'flex-start',
    },
});

const useStatStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].stat ? theme['styles'].stat(props, theme) : statStyle(props, theme);

    return {
        stat: styles.style,
        arrow: {
            ...styles.arrow.style,
            ...styles.arrow.types[props.type],
        },
        label: styles.label,
        help: styles.help,
        number: styles.number,
        group: styles.group,
    };
};

export default useStatStyle;
