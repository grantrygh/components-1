import { avatarSizes } from '../Avatar/styles';
import { useTheme } from '../ThemeProvider';

export const avatarGroup = ({ color, size }, theme) => ({
    style: {
        borderColor: '#fff',
        bg: 'gray.200',
        color: 'inherit',
        rounded: 'full',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: '2px',
        size: avatarSizes[size],
        fontSize: `calc(${theme.sizes[avatarSizes[size]]} / 2.75)`,
    },
    // const borderColor = { light: '#fff', dark: 'gray.800' };
    // const bg = { light: 'gray.200', dark: 'whiteAlpha.400' };
});

const useAvatarGroupStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].avatarGroup ? theme['styles'].avatarGroup(props, theme) : avatarGroup(props, theme);

    return {
        // base style
        ...styles.style,
    };
};

export default useAvatarGroupStyle;
