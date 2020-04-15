import { addBlack, addOpacity, addWhite } from '../theme/colors-utils';
import { useTheme } from '../ThemeProvider';

export const buttonStyle = ({ color = 'button' }, theme) => ({
    style: {
        px: 6,
        borderRadius: 'radius',
        display: 'inline-flex',
        appearance: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 250ms',
        userSelect: 'none',
        position: 'relative',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        letterSpacing: 0,
        fontSize: 'xs',
        fontWeight: 'bold',
        lineHeight: 'short',
        outline: 'none',
        boxSizing: 'border-box',
        border: '1px',
        borderColor: 'transparent',
        _focus: {
            boxShadow: 'outline',
        },
    },
    variants: {
        primary: {
            color: 'buttonText',
            bg: `${color}.500`,
            boxShadow: 'button',
            _hover: {
                bg: addWhite(theme.colors[color][500], 0.12),
                boxShadow: 'raised',
            },
            _active: {
                bg: addBlack(theme.colors[color][500], 0.12),
                boxShadow: 'pressed',
                dataActive: 'true',
            },
        },
        secondary: {
            color: `${color}.500`,
            bg: 'secondaryButton',
            boxShadow: 'button',
            _hover: {
                boxShadow: 'raised',
            },
            _active: {
                boxShadow: 'pressed',
                bg: 'border',
                dataActive: 'true',
            },
        },
        tertiary: {
            color: `${color}.500`,
            bg: 'transparent',
            borderColor: `${color}.500`,
            _hover: {
                bg: addOpacity(theme.colors[color][500], 0.06),
            },
            _active: {
                bg: addOpacity(theme.colors[color][500], 0.12),
                dataActive: 'true',
            },
        },
        unstyled: {
            color: `${color}.500`,
            bg: 'transparent',
            _active: {
                bg: 'border',
                dataActive: 'true',
            },
        },
    },
    sizes: {
        lg: {
            height: 'input.lg',
            minWidth: 'input.lg',
        },
        md: {
            height: 'input.md',
            minWidth: 'input.md',
        },
        sm: {
            height: 'input.sm',
            minWidth: 'input.sm',
        },
    },
    isDisabled: {
        _disabled: {
            opacity: '40%',
            cursor: 'not-allowed',
            boxShadow: 'none',
            bg: 'disabled',
            color: 'bodyText',
            border: 0,
        },
    },
    isFullWidth: {
        width: 'full',
    },
    iconOnly: {
        borderRadius: 'full',
        px: 0,
    },
});

const useButtonStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].button ? theme['styles'].button(props, theme) : buttonStyle(props, theme);

    return {
        // base style
        ...styles.style,

        // variant style
        ...styles.variants[props.variant],

        // size style
        ...styles.sizes[props.size],

        ...(props.isDisabled && styles.isDisabled),
        ...(props.isFullWidth && styles.isFullWidth),
        ...(props.iconOnly && styles.iconOnly),
    };
};

export default useButtonStyle;
