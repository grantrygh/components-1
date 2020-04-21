import { useTheme } from '../ThemeProvider';

export const spinnerStyle = ({ color = 'primary.500', thickness = 2, emptyColor = 'transparent' }, theme) => ({
    style: {
        rounded: 'full',
        borderStyle: 'solid',
        borderColor: 'currentColor',
        color,
        borderWidth: thickness,
        borderBottomColor: emptyColor,
        borderLeftColor: emptyColor,
    },
    sizes: {
        xs: 3,
        sm: 'spacing',
        md: 6,
        lg: 8,
        xl: 12,
    },
});

const useSpinnerStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].spinner ? theme['styles'].spinner(props, theme) : spinnerStyle(props, theme);

    return {
        // base style
        ...styles.style,

        // variant style
        size: styles.sizes[props.size] || props.size,
    };
};

export default useSpinnerStyle;
