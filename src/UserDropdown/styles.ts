import { useTheme } from '../ThemeProvider';

export const userDropdownStyle = (props, theme) => ({
    style: {
        main: {
            display: { _: 'none', lg: 'flex' },
            alignItems: 'center',
            _hover: { textDecor: 'none' },
        },
    },

    variants: {
        compact: {
            main: {
                display: 'none',
            },
        },
    },
});

export default function useUserDropdownStyle(props) {
    const theme = useTheme();
    const styles = theme.styles.userDropdown
        ? theme.styles.userDropdown(props, theme)
        : userDropdownStyle(props, theme);

    return {
        ...styles.style,
        ...styles.variants[props.variant],
    };
}
