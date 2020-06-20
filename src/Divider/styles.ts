import { useTheme } from '../ThemeProvider';

export const dividerStyle = (props, theme) => ({
    style: {
        borderColor: 'border',
    },
    orientation: {
        horizontal: {
            borderBottom: '1px',
            width: 'auto',
            my: 'spacing-sm',
        },
        vertical: {
            borderLeft: '1px',
            height: 'auto',
            mx: 'spacing-sm',
        },
    },
});

const useDividerStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].divider ? theme['styles'].divider(props, theme) : dividerStyle(props, theme);

    return {
        // orientation set before root style to avoid borderColor override
        ...styles.orientation[props.orientation],

        ...styles.style,
    };
};

export default useDividerStyle;
