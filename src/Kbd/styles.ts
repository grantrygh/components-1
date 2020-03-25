import { useTheme } from '../ThemeProvider';

export const kbdStyle = ({ color }, theme) => ({
    style: {
        bg: 'gray.100',
        rounded: 'md',
        border: '1px',
        borderColor: 'inherit',
        borderBottomWidth: '3px',
        fontSize: '0.8em',
        fontWeight: 'bold',
        lineHeight: 'normal',
        px: '0.4em',
        whiteSpace: 'nowrap',
    },
    // const bg = { light: 'gray.100', dark: 'whiteAlpha.50' };
});

const useKbdStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].kbd ? theme['styles'].kbd(props, theme) : kbdStyle(props, theme);

    return {
        // base style
        ...styles.style,
    };
};

export default useKbdStyle;
