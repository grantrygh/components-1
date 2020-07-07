import { useTheme } from '../ThemeProvider';

export const tabStyle = ({ color = 'button' }, theme) => ({
    style: {
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        color: 'faintText',
        whiteSpace: 'nowrap',
        _focus: {
            zIndex: '1',
            boxShadow: 'outline',
        },
        _disabled: {
            opacity: 0.4,
            cursor: 'not-allowed',
        },
        borderRadius: 'radius',
    },
    orientation: {
        horizontal: {
            height: '100%',
        },
        vertical: {
            width: '100%',
        },
    },
    sizes: {
        sm: {
            padding: '0.25rem 1rem',
        },
        md: {
            padding: '0.5rem 1rem',
        },
        lg: {
            padding: '0.75rem 1.25rem',
        },
    },
    variants: {
        line: {
            borderBottom: '2px',
            borderColor: 'transparent',
            borderRadius: 0,
            _selected: {
                color: 'titleText',
                borderColor: `${color}.500`,
                boxShadow: 'none',
                svg: {
                    color: `${color}.500`,
                },
            },
            _disabled: {
                opacity: 0.4,
                cursor: 'not-allowed',
            },
        },
        enclosed: {
            roundedTop: 'md',
            border: '1px',
            borderColor: 'transparent',
            mb: '-1px',
            _selected: {
                color: `${color}.500`,
                borderColor: 'inherit',
                borderBottomColor: 'transparent',
            },
        },
        'enclosed-colored': {
            border: '1px',
            borderColor: 'inherit',
            bg: 'gray.50',
            mb: '-1px',
            _notLast: {
                mr: '-1px',
            },
            _selected: {
                bg: 'white',
                color: `${color}.500`,
                borderColor: 'inherit',
                borderTopColor: 'currentColor',
                borderBottomColor: 'transparent',
            },
        },
        'soft-rounded': {
            rounded: 'full',
            fontWeight: 'semibold',
            color: 'gray.500',
            _selected: {
                color: `${color}.700`,
                bg: `${color}.100`,
            },
        },
        'solid-rounded': {
            rounded: 'full',
            fontWeight: 'semibold',
            color: 'gray.500',
            _selected: {
                color: 'white',
                bg: `${color}.500`,
            },
        },
        unstyled: {
            // unstyled
        },
    },
});

const useTabStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].tab ? theme['styles'].tab(props, theme) : tabStyle(props, theme);

    return {
        ...styles.style,
        ...styles.orientation[props.orientation],
        ...styles.sizes[props.size],
        ...styles.variants[props.variant],
        ...(props.isFitted && { flex: 1 }),
    };
};

const alignments = {
    end: 'flex-end',
    center: 'center',
    start: 'flex-start',
};

export const tabListStyle = ({ align = 'start' }, theme) => ({
    style: {
        borderColor: 'transparent',
    },
    orientation: {
        horizontal: {
            alignItems: 'center',
            justifyContent: alignments[align],
            minWidth: 'fit-content',
        },
        vertical: {
            flexDirection: 'column',
        },
    },
    variants: {
        line: {
            //
        },
        enclosed: {
            mb: '-1px',
            borderBottom: '1px',
        },
        'enclosed-colored': {
            mb: '-1px',
            borderBottom: '1px',
        },
        'soft-rounded': {
            // unstyled
        },
        'solid-rounded': {
            // unstyled
        },
        unstyled: {
            // unstyled
        },
    },
});

export const useTabListStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].tabList ? theme['styles'].tabList(props, theme) : tabListStyle(props, theme);

    return {
        ...styles.orientation[props.orientation],
        ...styles.variants[props.variant],
        ...styles.style,
    };
};

export default useTabStyle;
