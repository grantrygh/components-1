import { useTheme } from '../ThemeProvider';

export const passwordStrengthStyle = (props, theme) => ({
    style: {
        flex: 1,
        h: '4px',
        rounded: 'radius',
        bg: 'inputBg',
    },
    strength: {
        // too weak with pw value
        0: {
            bg: 'error.500',
        },
        // weak
        1: {
            bg: 'error.500',
        },
        // medium
        2: {
            bg: 'warning.500',
        },
        // strong
        3: {
            bg: 'success.500',
        },
    },
});

const usePasswordStrengthStyle = (props) => {
    const theme = useTheme();
    const styles = theme['styles'].passwordStrength
        ? theme['styles'].passwordStrength(props, theme)
        : passwordStrengthStyle(props, theme);

    return {
        // base style
        barStyle: styles.style,
        strengthStyle: styles.strength[props.id],
    };
};

export default usePasswordStrengthStyle;
