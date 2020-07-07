import color from 'color';
import { useTheme } from '../ThemeProvider';

export const sizes = {
    lg: {
        thumb: '24px',
        trackHeight: '4px',
        innerThumb: '6px',
    },
    md: {
        thumb: '18px',
        trackHeight: '4px',
        innerThumb: '4px',
    },
    sm: {
        thumb: '14px',
        trackHeight: '2px',
        innerThumb: '2px',
    },
};

export const sliderStyle = ({ color: fillColor = 'primary', size = 'md', trackPercent }, theme) => {
    const centerProps = {
        position: 'absolute',
        top: '50%',
        transform: `translateY(-50%)`,
    };
    const { trackHeight, thumb: thumbSize } = sizes[size];
    const disabledTrackColor = color(theme.colors.track)
        .darken(0.1)
        .hex();

    return {
        style: {
            width: 'full',
            display: 'inline-block',
            position: 'relative',
            cursor: 'pointer',
            py: 3,
            _disabled: {
                opacity: 0.6,
                cursor: 'default',
                pointerEvents: 'none',
            },
        },
        track: {
            ...centerProps,
            height: trackHeight,
            borderRadius: 'radius',
            width: '100%',
            bg: 'track',
            _disabled: {
                bg: disabledTrackColor,
            },
        },
        filledTrack: {
            ...centerProps,
            height: trackHeight,
            bg: `${fillColor}.500`,
            width: `${trackPercent}%`,
            rounded: 'radius',
            zIndex: 1,
        },
        thumb: {
            ...centerProps,
            size: thumbSize,
            rounded: 'full',
            bg: 'white',
            boxShadow: 'sm',
            left: `calc(${trackPercent}% - ${thumbSize} / 2)`,
            border: '1px',
            borderColor: 'border',
            transition: 'transform 0.2s',
            zIndex: 2,
            _focus: {
                boxShadow: 'outline',
            },
            _disabled: {
                bg: disabledTrackColor,
            },
            _active: {
                transform: `translateY(-50%) scale(1.15)`,
            },
        },
    };
};

const useSliderStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].slider ? theme['styles'].slider(props, theme) : sliderStyle(props, theme);

    return {
        root: styles.style,
        track: styles.track,
        filledTrack: styles.filledTrack,
        thumb: styles.thumb,
    };
};

export default useSliderStyle;
