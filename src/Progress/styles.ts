import { useTheme } from '../ThemeProvider';

export const progressStyle = ({ borderRadius = 'radius', startColor, endColor, isIndeterminate }, { colors }) => ({
    style: {
        bg: 'track',
        borderRadius,
        overflow: 'hidden',
    },
    sizes: {
        lg: {
            height: '1rem',
        },
        md: {
            height: '0.75rem',
        },
        sm: {
            height: '0.5rem',
        },
    },
    indicator: {
        [endColor ? 'background' : 'bg']: !endColor
            ? startColor || colors.progress
            : `linear-gradient(90deg, ${startColor || colors.progress} 0%, ${endColor} 100%)`,
        borderRadius,
        ...(isIndeterminate && {
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            willChange: 'left, right',
        }),
    },
});

const useProgressStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].progress ? theme['styles'].progress(props, theme) : progressStyle(props, theme);

    return {
        // base style
        ...styles.style,

        // variant style
        ...styles.sizes[props.size || 'md'],
    };
};

export const useProgressIndicatorStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].progress ? theme['styles'].progress(props, theme) : progressStyle(props, theme);

    return {
        // indicator style
        ...styles.indicator,
    };
};

export default useProgressStyle;
