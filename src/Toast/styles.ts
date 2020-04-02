import { useTheme } from '../ThemeProvider';

export const toastStyle = ({ color }, theme) => ({
    style: {
        textAlign: 'left',
        boxShadow: 'toast',
        rounded: 'md',
        alignItems: 'start',
        m: 2,
        pr: 8,
    },
});

const useToastStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].toast ? theme['styles'].toast(props, theme) : toastStyle(props, theme);

    return {
        // base style
        ...styles.style,
    };
};

export default useToastStyle;
