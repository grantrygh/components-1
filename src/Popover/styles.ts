import { useTheme } from '../ThemeProvider';

export const popoverStyle = (props, theme) => ({
    style: {
        bg: 'popoverBg',
        borderWidth: '1px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        rounded: 'md',
        shadow: 'menu',
        maxWidth: 'xs',
        modifiers: { offset: { enabled: true, offset: `0, 4` } },
        _focus: { outline: 0, shadow: 'outline' },
    },
});

const usePopoverStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].popover ? theme['styles'].popover(props, theme) : popoverStyle(props, theme);

    return {
        // base style
        ...styles.style,
    };
};

export default usePopoverStyle;
