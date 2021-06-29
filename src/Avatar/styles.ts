import { componentStyleDef } from '../theme/types';
import { useTheme } from '../ThemeProvider';
import { AvatarProps } from './types';

// Found this on StackOverflow :)
function string2Hex(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    let color = '#';
    for (let j = 0; j < 3; j++) {
        const value = (hash >> (j * 8)) & 255;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}

export const avatarSizes = {
    '2xs': 4,
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
    full: 'full',
};

export const avatarStyle: componentStyleDef<AvatarProps> = ({ size, showBorder, name, borderColor="white" }, theme) => ({
    style: {
        display: 'inline-flex',
        verticalAlign: 'top',
        rounded: 'full',
        alignItems: 'center',
        flexShrink: '0',
        justifyContent: 'center',
        position: 'relative',
        bg: name ? string2Hex(name) : 'gray.400',
        size: avatarSizes[size],
        ...(showBorder && {
            border: '2px',
            borderColor,
        }),
        fontSize: `calc(${theme.sizes[avatarSizes[size]]} / 2.5)`,
        // lineHeight: avatarSizes[size],
    },
});

const useAvatarStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].avatar ? theme['styles'].avatar(props, theme) : avatarStyle(props, theme);

    return styles.style;
};

export const useAvatarBadgeStyle = ({ color = 'success', borderColor = 'pageBg' }) => {
    return {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translate(25%, 25%)',
        bottom: '0',
        right: '0',
        border: '0.2em solid',
        borderColor,
        bg: `${color}.500`,
        rounded: 'full',
    };
    // const borderColor = { light: 'white', dark: 'gray.800' };
};

export default useAvatarStyle;
