import { isDarkColor } from '../theme/colors-utils';
import { useTheme } from '../ThemeProvider';

export const fullTagStyle = ({ color }, theme) => ({
    style: {
        //
    },
    variants: {
        subtle: {
            bg: `${color}.100`,
            color: `${color}.500`,
        },
        solid: {
            bg: `${color}.500`,
            color: 'white',
        },
    },
});

const useFullTagStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].fullTag ? theme['styles'].fullTag(props, theme) : fullTagStyle(props, theme);

    return {
        // base style
        ...styles.style,
        // variant style
        ...styles.variants[props.variant || 'subtle'],
    };
};

export const useFullTagLabelStyle = ({ variant, color }) => {
    const theme = useTheme();
    if (['solid'].includes(variant)) {
        const bg = theme.colors[color][100];
        return {
            bg,
            color: isDarkColor(bg) && 'white',
        };
    }

    return {};
};

export default useFullTagStyle;
