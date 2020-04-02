/** @jsx jsx */
import color from 'color';
import { useTheme } from '../ThemeProvider';

const sizes = {
    lg: {
        thumb: '16px',
        trackHeight: '4px',
    },
    md: {
        thumb: '14px',
        trackHeight: '4px',
    },
    sm: {
        thumb: '10px',
        trackHeight: '2px',
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
            rounded: 'sm',
        },
        thumb: {
            ...centerProps,
            zIndex: 1,
            size: thumbSize,
            rounded: 'full',
            bg: 'white',
            boxShadow: 'sm',
            left: `calc(${trackPercent}% - ${thumbSize} / 2)`,
            border: '1px',
            borderColor: 'border',
            transition: 'transform 0.2s',
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
