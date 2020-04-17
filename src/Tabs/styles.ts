/** @jsx jsx */
import { useTheme } from '../ThemeProvider';

export const tabStyle = ({ color = 'primary' }, theme) => ({
    style: {
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
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
            fontSize: 'sm',
        },
        md: {
            fontSize: 'md',
            padding: '0.5rem 1rem',
        },
        lg: {
            fontSize: 'lg',
            padding: '0.75rem 1rem',
        },
    },
    variants: {
        line: {
            borderBottom: '2px',
            borderColor: 'transparent',
            mb: '-2px',
            _selected: {
                // const _color = { light: `${color}.600`, dark: `${color}.300` };
                color: `${color}.600`,
                borderColor: 'currentColor',
            },
            _active: {
                bg: 'gray.200',
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
                // { light: `${color}.600`, dark: `${color}.300` };
                color: `${color}.600`,
                borderColor: 'inherit',
                // { light: '#fff', dark: theme.colors.gray[800] };
                borderBottomColor: 'white',
            },
        },
        'enclosed-colored': {
            border: '1px',
            borderColor: 'inherit',
            //  { light: 'gray.50', dark: 'whiteAlpha.50' };
            bg: 'gray.50',
            mb: '-1px',
            _notLast: {
                mr: '-1px',
            },
            _selected: {
                //  { light: `#fff`, dark: `gray.800` };
                bg: 'white',
                // { light: `${color}.600`, dark: `${color}.300` };
                color: `${color}.600`,
                borderColor: 'inherit',
                borderTopColor: 'currentColor',
                borderBottomColor: 'transparent',
            },
        },
        'soft-rounded': {
            rounded: 'full',
            fontWeight: 'semibold',
            color: 'gray.600',
            _selected: {
                color: `${color}.700`,
                bg: `${color}.100`,
            },
        },
        'solid-rounded': {
            rounded: 'full',
            fontWeight: 'semibold',
            // { light: 'gray.600', dark: 'inherit' };
            color: 'gray.600',
            _selected: {
                // { light: `#fff`, dark: `gray.800` };
                color: 'white',
                // { light: `${color}.600`, dark: `${color}.300` };
                bg: `${color}.600`,
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
    style: {},
    orientation: {
        horizontal: {
            alignItems: 'center',
            justifyContent: alignments[align],
            maxWidth: 'full',
        },
        vertical: {
            flexDirection: 'column',
        },
    },
    variants: {
        line: {
            borderBottom: '2px',
            borderColor: 'inherit',
        },
        enclosed: {
            mb: '-1px',
            borderBottom: '1px',
            borderColor: 'inherit',
        },
        'enclosed-colored': {
            mb: '-1px',
            borderBottom: '1px',
            borderColor: 'inherit',
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
        ...styles.style,
        ...styles.orientation[props.orientation],
        ...styles.variants[props.variant],
    };
};

export default useTabStyle;
