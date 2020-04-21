import { useTheme } from '../ThemeProvider';

// style for PageContent
const pageStyle = (props, theme) => ({
    style: {
        //
    },
    content: {
        p: 4,
        flex: 1,
    },
    footer: {
        //
    },
});

const usePageStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].page ? theme['styles'].page(props, theme) : pageStyle(props, theme);

    return {
        root: styles.style,
        content: styles.content,
        footer: styles.footer,
    };
};

export default usePageStyle;
