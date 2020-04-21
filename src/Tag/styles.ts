import { useTheme } from '../ThemeProvider';

export const tagStyle = (props, theme) => ({
    style: {
        rounded: 'full',
        border: '1px',
        borderColor: 'border',
        fontWeight: 'medium',
    },
    sizes: {
        sm: {
            minH: 6,
            minW: 6,
            px: 2,
        },
        md: {
            minH: '1.75rem',
            minW: '1.75rem',
            px: 2,
        },
        lg: {
            minH: 8,
            minW: 8,
            px: 3,
        },
    },
});

const useTagStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].tag ? theme['styles'].tag(props, theme) : tagStyle(props, theme);

    return {
        ...styles.style,

        ...styles.sizes[props.size],
    };
};

export const useTagIconStyle = () => {
    return {
        mx: 2,
        css: {
            '&:first-child': { marginLeft: 0 },
            '&:last-child': { marginRight: 0 },
        },
    };
};

export default useTagStyle;
