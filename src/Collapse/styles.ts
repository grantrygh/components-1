import { useTheme } from '../ThemeProvider';

export const collapseStyle = (
    { duration, easing = 'ease', isOpen, startingHeight = 0, endingHeight = 'auto' },
    theme
) => ({
    style: {
        duration,
        easing,
        height: isOpen ? endingHeight : startingHeight,
        css: {
            transition: 'height .2s ease,opacity .2s ease-in-out,transform .2s ease-in-out',
            '&.rah-animating--to-height-zero': {
                opacity: 0,
                transform: 'translateY(-0.625rem)',
            },
        },
    },
});

const useCollapseStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].collapse ? theme['styles'].collapse(props, theme) : collapseStyle(props, theme);

    return {
        // base style
        ...styles.style,
    };
};

export default useCollapseStyle;
