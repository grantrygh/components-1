import { useTheme } from '../ThemeProvider';

export const kbdStyle = ({ color }, theme) => ({
    style: {
        bg: '',
        rounded: 'radius',
        border: '1px',
        borderColor: 'inherit',
        borderBottomWidth: '3px',
        fontWeight: 'bold',
        px: 'spacing-sm',
        whiteSpace: 'nowrap',
    },
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
