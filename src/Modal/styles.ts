import { useTheme } from '../ThemeProvider';

export const modalStyle = ({ isCentered }, theme) => ({
    style: {
        bg: 'popoverBg',
        shadow: 'modal',
        m: 4,
        mx: [4, 'auto'],
    },
    scrollBehavior: {
        inside: {
            height: '100%',
            top: 0,
        },
        outside: {
            my: 16,
            top: 0,
        },
    },
});

export const modalWrapperStyle = ({ isCentered }, theme) => ({
    style: {},
    scrollBehavior: {
        inside: {
            maxHeight: '100vh',
            overflow: 'hidden',
        },
        outside: {
            overflowY: 'auto',
            overflowX: 'hidden',
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

const useModalStyle = props => {
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

export const useModalWrapperStyle = props => {
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

export default useModalStyle;
