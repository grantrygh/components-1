import { useTheme } from '../ThemeProvider';

export const textareaStyle = (props, theme) => ({
    style: {
        py: 2,
        minHeight: 20,
        lineHeight: 'short',
    },
});

const useTextareaStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].textarea ? theme['styles'].textarea(props, theme) : textareaStyle(props, theme);

    return {
        // base style
        ...styles.style,
    };
};

export default useTextareaStyle;
