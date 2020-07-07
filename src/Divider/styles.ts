import { useTheme } from '../ThemeProvider';

export const dividerStyle = ({ size = 1 }, theme) => ({
    style: {
        borderColor: 'border',
    },
    orientation: {
        horizontal: {
            borderBottom: `${size}px`,
            width: 'auto',
            my: 'spacing-sm',
        },
        vertical: {
            borderLeft: `${size}px`,
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
