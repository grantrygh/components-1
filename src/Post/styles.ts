import { useTheme } from '../ThemeProvider';

export const postStyle = (props, theme) => ({
    style: {
        author: {
            fontWeight: 'bold',
        },
        date: {
            mx: 2,
            color: 'gray.500', // TODO: change with theme faint color
        },
        avatar: {
            size: 'sm',
            mr: 'spacing',
        },
    },
});

const usePostStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].post ? theme['styles'].post(props, theme) : postStyle(props, theme);

    return {
        // base style
        ...styles.style,
    };
};

export default usePostStyle;
