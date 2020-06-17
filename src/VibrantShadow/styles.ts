import { useTheme } from '../ThemeProvider';

export const vibrantShadowStyle = ({ offset, opacity, size, radius, vibrancy }, theme) => ({
    style: {
        position: 'relative',
        display: 'inline-block',
    },
    image: {
        zIndex: 2,
        position: 'relative',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)', // cssfilters image none
    },
    shadow: {
        display: 'none', // cssfilters image block
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        backgroundSize: 'cover',
        top: offset ? offset.top : '5px',
        left: offset ? offset.left : 0,
        opacity,
        transform: `scale(${size})`,
        filter: `blur(${radius}px) brightness(90%) saturate(${2 * vibrancy})`,
    },
});

const useVibrantShadowStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].vibrantShadow
        ? theme['styles'].vibrantShadow(props, theme)
        : vibrantShadowStyle(props, theme);

    return {
        root: styles.style,
        image: styles.image,
        shadow: styles.root,
    };
};

export default useVibrantShadowStyle;
