import { useTheme } from '../ThemeProvider';

export const textStyle = (props, theme) => ({
    style: {
        fontFamily: 'body',
        color: 'bodyText',
        fontWeight: 'normal',
    },
    kinds: {
        small: {
            fontSize: 'xs',
            lineHeight: 'shorter',
        },
        body: {
            fontSize: 'sm',
            lineHeight: 'base',
        },
        large: {
            fontSize: 'md',
            lineHeight: 'short',
        },
    },
    state: {
        faint: {
            color: 'faintText',
        },
    },
});

const useTextStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].text ? theme['styles'].text(props, theme) : textStyle(props, theme);

    return {
        // base style
        ...styles.style,

        ...styles.kinds[props.kind],

        ...styles.state[props.state],
    };
};

export default useTextStyle;
