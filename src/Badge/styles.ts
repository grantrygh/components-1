import { useTheme } from '../ThemeProvider';

export const badgeStyle = ({ color, size = 40 }, theme) => ({
    style: {
        display: 'inline-block',
        px: 1,
        textTransform: 'uppercase',
        fontSize: 'xs',
        borderRadius: 'sm',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
    },

    variants: {
        subtle: {
            bg: `${color}.50`,
            color: `${color}.500`,
        },
        solid: {
            bg: `${color}.500`,
            color: 'white',
        },
        outline: {
            color: `${color}.500`,
            boxShadow: 'inset 0 0 0px 1px' + theme.colors[color][500],
        },
        hexagon: {
            fontSize: `${size}px`,
            lineHeight: `${size}px`,
            style: { fill: theme.colors[color][500] },
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
        },
    },
});

const useBadgeStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].badge ? theme['styles'].badge(props, theme) : badgeStyle(props, theme);

    return {
        // base style
        ...styles.style,

        // variant style
        ...styles.variants[props.variant || 'subtle'],
    };
};

// export const useAlertIconStyle = ({ variant, color }) => {
//     if (['left-accent', 'top-accent', 'subtle'].includes(variant)) {
//         return {
//             color: `${color}.500`,
//         };
//     }

//     return {};
// };

export default useBadgeStyle;
