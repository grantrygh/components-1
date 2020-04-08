import { useTheme } from '../ThemeProvider';

export const checkboxStyle = ({ color, type, isDisabled, isFullWidth, isChild, size }, { colors, shadows }) => ({
    style: {
        userSelect: 'none',
        border: '2px',
        rounded: '2px',
        borderColor: 'inherit',
        transition: 'background-color 120ms, box-shadow 250ms',
        color: 'white',
        _checked: {
            backgroundColor: colors[color][500],
            borderColor: colors[color][500],
        },
        _checkedAndDisabled: {
            borderColor: colors[color][500],
            backgroundColor: colors[color][500],
            color: colors.disabled,
            opacity: 0.25,
        },
        _disabled: {
            backgroundColor: colors.border,
            borderColor: colors.border,
        },
        _focus: {
            boxShadow: shadows.outline,
        },
        _invalid: {
            borderColor: colors.error[500],
        },
    },
    sizes: {
        lg: 5,
        md: 4,
        sm: type === 'radio' ? 3 : 'auto',
    },
    label: {
        ml: 2,
        fontSize: size,
        userSelect: 'none',
        opacity: isDisabled ? 0.4 : 1,
    },
    container: {
        display: 'inline-flex',
        verticalAlign: 'top',
        alignItems: 'center',
        width: isFullWidth ? 'full' : undefined,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ml: isChild ? 6 : 0,
    },
});

const useCheckboxStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].checkbox ? theme['styles'].checkbox(props, theme) : checkboxStyle(props, theme);

    return {
        root: {
            ...styles.style,
            size: styles.sizes[props.size],
        },
        label: styles.label,
        container: styles.container,
    };
};

export default useCheckboxStyle;
