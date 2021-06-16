import { useTheme } from '../ThemeProvider';

export const modalStyle = ({ isCentered }, theme) => ({
    style: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
        outline: 0,
    },
    scrollBehavior: {
        outside: {
            maxHeight: '100%',
            top: 0,
        },
    },
});

export const modalWrapperStyle = ({ isCentered }, theme) => ({
    style: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        '@supports(height: -webkit-fill-available)': {
            height: '-webkit-fill-available',
        },
        // pointerEvents: 'all',
        position: 'fixed',
        left: 0,
        top: 0,
        p: 'spacing',
        justifyContent: 'center',
    },
    scrollBehavior: {
        outside: {
            maxHeight: '100vh',
            overflow: 'auto',
        },
    },
    props: {
        ...(isCentered && {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }),
    },
});

export const modalOverlayStyle = (props, theme) => ({
    style: {
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100vw',
        height: '100vh',
        zIndex: theme.zIndices.overlay,
        backgroundColor: theme.colors.overlay,
    },
});

const useModalStyle = (props) => {
    const theme = useTheme();
    const styles = theme['styles'].modal ? theme['styles'].modal(props, theme) : modalStyle(props, theme);

    if (props.noStyles) {
        return {
            ...styles.style,
        };
    }

    return {
        // base style
        ...styles.style,

        ...styles.scrollBehavior[props.scrollBehavior],
        ...styles.props,
    };
};

export const useModalWrapperStyle = (props) => {
    const theme = useTheme();
    const styles = theme['styles'].modalWrapper
        ? theme['styles'].modalWrapper(props, theme)
        : modalWrapperStyle(props, theme);

    if (props.noStyles) {
        return {};
    }

    return {
        // base style
        ...styles.style,

        ...styles.scrollBehavior[props.scrollBehavior],
        ...styles.props,
    };
};

export const useModalOverlayStyle = (props) => {
    const theme = useTheme();
    const styles = theme['styles'].modalOverlay
        ? theme['styles'].modalOverlay(props, theme)
        : modalOverlayStyle(props, theme);

    return {
        // base style
        ...styles.style,
    };
};

export default useModalStyle;
