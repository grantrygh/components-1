import { useTheme } from '../ThemeProvider';

export const menuStyle = (props, theme) => ({
    style: {
        color: 'inherit',
        borderWidth: '1px',
        bg: '#fff',
        shadow: 'sm',
        py: 2,
        minW: '3xs',
        rounded: 'md',
        tabIndex: 1,
        zIndex: 1,
        _focus: { outline: 0 },
    },
});

export const useMenuStyle = props => {
    const theme = useTheme();

    const styles = theme['styles'].menu ? theme['styles'].menu(props, theme) : menuStyle(props, theme);

    return {
        // base style
        ...styles.style,
    };
};

/**
|--------------------------------------------------
| Styles for MenuItem
|--------------------------------------------------
*/

export const menuItemStyle = (props, theme) => ({
    style: {
        display: 'flex',
        textDecoration: 'none',
        color: 'inherit',
        minHeight: '32px',
        alignItems: 'center',
        textAlign: 'left',
        outline: 'none',
        px: 4,
        width: 'full',
        flex: ' 0 0 auto',
        userSelect: 'none',
        transition: 'background-color 220ms, color 220ms',
        _active: {
            bg: 'gray.200',
        },
        _focus: {
            bg: 'altBg',
            outline: 0,
        },
        _disabled: {
            opacity: 0.4,
            cursor: 'not-allowed',
        },
    },
});

export const useMenuItemStyle = props => {
    const theme = useTheme();

    const styles = theme['styles'].menuItem ? theme['styles'].menuItem(props, theme) : menuItemStyle(props, theme);

    return {
        // base style
        ...styles.style,
    };
};
