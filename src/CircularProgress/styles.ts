import { useTheme } from '../ThemeProvider';

export const circularProgressStyle = (
    {
        size = 48,
        min = 0,
        max = 100,
        color = 'progress',
        trackColor = 'track',
        isIndeterminate,
        value,
        thickness = 0.2,
        angle = 0,
        capIsRound,
        spin,
        circularProgressCircle,
    },
    theme
) => {
    const radius = 50;
    const diameter = radius * 2;
    const circumference = diameter * Math.PI;
    const strokeDasharray = Math.round(circumference * 1000) / 1000;

    const viewBox = diameter / (1 - thickness / 2);
    const viewBoxAttr = `${viewBox / 2} ${viewBox / 2} ${viewBox} ${viewBox}`;
    const strokeWidth = (thickness / 2) * viewBox;
    const progress = 1 - (value - min) / (max - min);
    const strokeDashoffset = progress * circumference;

    function getCircleProps({ thickness: circleThickness, offset, color: circleColor }) {
        return {
            as: 'circle',
            color: circleColor,
            fill: 'transparent',
            stroke: 'currentColor',
            strokeWidth: circleThickness,
            strokeDasharray,
            strokeDashoffset: offset,
            cx: viewBox,
            cy: viewBox,
            r: radius,
        };
    }

    return {
        style: {
            size: '1em',
            fontSize: size,
            display: 'inline-block',
            position: 'relative',
            veriticalAlign: 'middle',
            role: 'progressbar',
            'aria-valuemin': min,
            'aria-valuemax': max,
            'aria-valuenow': isIndeterminate ? null : value,
        },
        svg: {
            as: 'svg',
            viewBox: viewBoxAttr,
            verticalAlign: 'top',
            transform: `rotate3d(0, 0, 1, ${angle - 90}deg)`,
            size: '100%',
            ...(isIndeterminate && {
                transformOrigin: '50% 50%',
                animation: `${spin} 2s linear infinite`,
            }),
        },
        track: getCircleProps({
            thickness: strokeWidth,
            offset: 0,
            color: trackColor,
        }),
        indicator: {
            stroke: 'currentColor',
            ...getCircleProps({
                thickness: strokeWidth,
                offset: strokeDashoffset,
                color,
            }),
            ...(capIsRound && { strokeLinecap: 'round' }),
            ...(isIndeterminate && {
                transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease',
                animation: `${circularProgressCircle} 1.5s ease-in-out infinite`,
                strokeDasharray: '1 400',
                strokeDashoffset: '0',
            }),
        },
    };
};

const useCircularProgressStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].circularProgress
        ? theme['styles'].circularProgress(props, theme)
        : circularProgressStyle(props, theme);

    return {
        // base style
        root: styles.style,
        svg: styles.svg,
        track: styles.track,
        indicator: styles.indicator,
    };
};

export default useCircularProgressStyle;
