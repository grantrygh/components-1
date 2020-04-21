import { useTheme } from '../ThemeProvider';

const pageStyle = (props, theme) => ({
    style: {
        // bg: 'pageBg',
        p: 4,
        flex: 1,
    },
});

const usePageStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].page ? theme['styles'].page(props, theme) : pageStyle(props, theme);

    return styles.style;
};

export default usePageStyle;
