import { useTheme } from '../ThemeProvider';

export const inputAddonStyle = (props, theme) => ({
    style: {
        bg: 'border',
        flex: '0 0 auto',
        whiteSpace: 'nowrap',
        width: 'fit-content',
    },
    placement: {
        left: {
            roundedRight: 0,
            borderRightColor: 'transparent',
        },
        right: {
            order: 1,
            roundedLeft: 0,
            borderLeftColor: 'transparent',
        },
    },
});

const useInputAddonStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].inputAddon
        ? theme['styles'].inputAddon(props, theme)
        : inputAddonStyle(props, theme);

    return {
        // base style
        ...styles.style,

        // variant style
        ...styles.placement[props.placement],
    };
};

export default useInputAddonStyle;
