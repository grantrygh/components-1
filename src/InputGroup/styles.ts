import { useTheme } from '../ThemeProvider';

export const inputGroupStyle = ({ isFullWidth = true }, theme) => ({
    style: {
        width: isFullWidth ? 'full' : 'input.width',
    },
});

const useInputGroupStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].inputGroup ? theme['styles'].inputGroup(props, theme) : inputGroupStyle(props, theme);

    return {
        // base style
        ...styles.style,
    };
};

export default useInputGroupStyle;
