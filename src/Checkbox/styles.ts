import { useTheme } from '../ThemeProvider';

export const checkboxStyle = ({ color, type, isDisabled, isFullWidth, isChild, size }, { colors, shadows }) => ({
    style: {
        userSelect: 'none',
        border: '2px',
        rounded: '2px',
        borderColor: 'track',
        transition: 'background-color 120ms, box-shadow 250ms',
        color: 'white',
        _checked: {
            bg: `${color}.500`,
            borderColor: `${color}.500`,
        },
        _checkedAndDisabled: {
            borderColor: `${color}.500`,
            bg: `${color}.500`,
            color: 'disabled',
            opacity: 0.25,
        },
        _disabled: {
            bg: 'border',
            borderColor: 'border',
        },
        _focus: {
            boxShadow: 'outline',
        },
        _invalid: {
            borderColor: 'error.500',
        },
    },
    sizes: {
        lg: 5,
        md: 4,
        sm: type === 'radio' ? 3 : 'auto',
    },
    label: {
        ml: 'spacing-sm',
        userSelect: 'none',
        color: isDisabled ? 'disabled' : 'bodyText',
        whiteSpace: 'nowrap',
    },
    container: {
        display: 'flex',
        verticalAlign: 'top',
        alignItems: 'center',
        width: isFullWidth ? 'full' : undefined,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ml: isChild ? 'spacing-lg' : 0,
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
