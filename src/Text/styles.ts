import { useTheme } from '../ThemeProvider';

export const textStyle = (props, theme) => ({
    style: {
        fontFamily: 'body',
    },
    kinds: {
        body: {
            color: 'bodyText',
        },
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
    };
};

export default useTextStyle;
