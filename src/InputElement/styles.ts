import { useTheme } from '../ThemeProvider';

export const inputElementStyle = ({ placement = 'left', size, disablePointerEvents }, theme) => ({
    style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        height: `input.${size}`,
        width: `input.${size}`,
        pl: placement === 'left' && 'input.spacing.sm',
        pr: placement === 'right' && 'input.spacing.sm',
        top: 0,
        zIndex: 2,
        pointerEvents: disablePointerEvents && 'none',
        [placement]: '0',
    },
});

const useInputElementStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].inputElement
        ? theme['styles'].inputElement(props, theme)
        : inputElementStyle(props, theme);

    return {
        // base style
        ...styles.style,
    };
};

export default useInputElementStyle;
