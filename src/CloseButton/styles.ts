import { useTheme } from '../ThemeProvider';

export const closeButtonStyle = ({ color }, theme) => ({
    style: {
        display: 'inline-flex',
        outline: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        rounded: 'md',
        transition: 'all 0.2s',
        flex: '0 0 auto',
        _hover: { bg: 'blackAlpha.100' },
        _active: { bg: 'blackAlpha.200' },
        _disabled: {
            cursor: 'not-allowed',
        },
        _focus: {
            boxShadow: 'outline',
        },
    },
    sizes: {
        lg: {
            size: 10,
        },
        md: {
            size: 8,
        },
        sm: {
            size: 6,
        },
    },
});

const useCloseButtonStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].closeButton
        ? theme['styles'].closeButton(props, theme)
        : closeButtonStyle(props, theme);

    return {
        // base style
        ...styles.style,

        // size style
        ...styles.sizes[props.size || 'md'],
    };
};

export default useCloseButtonStyle;
