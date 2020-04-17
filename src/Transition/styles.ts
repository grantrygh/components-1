import { useTheme } from '../ThemeProvider';

export const transitionStyle = ({ finalHeight = 'auto', finalWidth }, theme) => ({
    style: {
        //
    },
    slide: {
        root: {
            duration: 250,
        },
        placements: {
            bottom: {
                maxWidth: '100vw',
                height: finalHeight,
                bottom: 0,
                left: 0,
                right: 0,
            },
            top: {
                maxWidth: '100vw',
                height: finalHeight,
                top: 0,
                left: 0,
                right: 0,
            },
            left: {
                ...(finalWidth && { maxWidth: finalWidth }),
                height: '100vh',
                left: 0,
                top: 0,
            },
            right: {
                ...(finalWidth && { maxWidth: finalWidth }),
                right: 0,
                top: 0,
                height: '100vh',
            },
        },
        transitionOptions: {
            bottom: {
                offset: '100%',
                transform: y => `translateY(${y})`,
            },
            top: {
                offset: '-100%',
                transform: y => `translateY(${y})`,
            },
            left: {
                offset: '-100%',
                transform: x => `translateX(${x})`,
            },
            right: {
                offset: '100%',
                transform: x => `translateX(${x})`,
            },
        },
    },
    scale: {
        initialScale: 0.97,
        duration: 150,
    },
    slideIn: {
        duration: 150,
        offset: '10px',
    },
});

const useTransitionStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].transition
        ? theme['styles'].transition(props, theme)
        : transitionStyle(props, theme);

    return {
        // base style
        root: styles.style,

        // variant style
        slide: {
            root: styles.slide.root,
            placement: styles.slide.placements[props.from],
            transitionOption: styles.slide.transitionOptions[props.from],
        },
        scale: styles.scale,
        slideIn: styles.slideIn,
    };
};

export default useTransitionStyle;
