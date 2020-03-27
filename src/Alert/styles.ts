import { useTheme } from '../ThemeProvider';

export const alertStyle = ({ color }, theme) => ({
    style: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        pl: 4,
        pr: 4,
        pt: 3,
        pb: 3,
    },

    variants: {
        subtle: {
            bg: `${color}.100`,
        },
        solid: {
            bg: `${color}.400`,
            color: 'white',
        },
        leftAccent: {
            pl: 3,
            bg: `${color}.100`,
            borderLeft: '2px',
            borderColor: `${color}.500`,
        },
        topAccent: {
            pl: 2,
            bg: `${color}.100`,
            borderTop: '2px',
            borderColor: `${color}.500`,
        },
    },
});

const useAlertStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].alert ? theme['styles'].alert(props, theme) : alertStyle(props, theme);

    return {
        // base style
        ...styles.style,

        // variant style
        ...styles.variants[props.variant || 'leftAccent'],
    };
};

export const useAlertIconStyle = ({ variant, color }) => {
    if (['left-accent', 'top-accent', 'subtle'].includes(variant)) {
        return {
            color: `${color}.500`,
        };
    }

    return {};
};

export default useAlertStyle;
