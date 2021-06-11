import { useTheme } from '../ThemeProvider';

const readOnly = {
    _readOnly: {
        bg: 'transparent',
        boxShadow: 'none',
        userSelect: 'all',
    },
};

export const inputStyle = ({ isFullWidth = true }, theme) => ({
    style: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        transition: 'all 0.2s',
        outline: 'none',
        appearance: 'none',
        borderRadius: 'radius',
        boxSizing: 'border-box',
        px: 'spacing',
        width: isFullWidth ? 'full' : 'input.width',
    },
    sizes: {
        xl: {
            height: 'input.xl',
        },
        lg: {
            height: 'input.lg',
        },
        md: {
            height: 'input.md',
        },
        sm: {
            height: 'input.sm',
        },
    },
    variants: {
        flushed: {
            borderBottom: '1px',
            borderColor: 'border',
            rounded: 0,
            px: undefined,
            bg: 'transparent',
            _focus: {
                zIndex: 1,
                borderColor: 'inputFocus',
            },
            _invalid: {
                borderColor: 'error.500',
            },
            ...readOnly,
        },
        filled: {
            border: '1px',
            borderColor: 'border',
            bg: 'inputBg',
            _hover: {
                bg: 'inputHover',
            },
            _disabled: {
                opacity: '0.4',
                cursor: 'not-allowed',
            },
            _focus: {
                zIndex: 1,
                bg: 'inputHover',
                borderColor: 'inputFocus',
            },
            _invalid: {
                borderColor: 'error.500',
            },
            ...readOnly,
        },
        outline: {
            border: '1px',
            borderColor: 'border',
            bg: 'transparent',
            _hover: {
                borderColor: 'inputHover',
            },
            _disabled: {
                opacity: '0.4',
                cursor: 'not-allowed',
            },
            _focus: {
                zIndex: 1,
                borderColor: 'inputFocus',
                boxShadow: `0 0 0 1px ${theme.colors.inputFocus}`,
            },
            _invalid: {
                borderColor: 'error.500',
                boxShadow: `0 0 0 1px ${theme.colors.error[500]}`,
            },
            ...readOnly,
        },
        unstyled: {
            bg: 'transparent',
            px: undefined,
            height: undefined,
        },
    },
});

const useInputStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].input ? theme['styles'].input(props, theme) : inputStyle(props, theme);

    return {
        // base style
        ...styles.style,

        // variant style
        ...styles.variants[props.variant],

        // sizes style
        ...styles.sizes[props.size],
    };
};

export default useInputStyle;
