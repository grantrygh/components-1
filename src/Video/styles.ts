import { useTheme } from '../ThemeProvider';

export const videoStyle = (props, theme) => ({
    style: {
        position: 'relative',
        overflow: 'hidden',
        backgroundSize: 'cover',
        maxWidth: '100%',
        height: 'auto',
        minHeight: '200px',
        width: 'fit-content',
    },
    stuck: {
        zIndex: 100,
        maxWidth: '350px',
        maxHeight: '200px',
        bottom: 4,
        right: 4,
        position: 'fixed',
        borderRadius: 2,
        boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.2), 0 3px 7px 0 rgba(0, 0, 0, 0.26)',
    },
    full: {
        width: '100%',
        maxHeight: 'calc(100vh - 8rem - 48px)',
        height: 0,
        paddingBottom: 'calc(100vh - 8rem - 48px)',
        mx: [4, 4, '8rem'],
    },
    iframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    native: {
        width: '100%',
        height: '100%',
        background: 'black',
        position: 'absolute',
        top: 0,
        left: 0,
    },
});

const useVideoStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].video ? theme['styles'].video(props, theme) : videoStyle(props, theme);

    return {
        root: styles.style,
        stuck: styles.stuck,
        full: styles.full,
        iframe: styles.iframe,
        native: styles.native,
    };
};

export default useVideoStyle;
