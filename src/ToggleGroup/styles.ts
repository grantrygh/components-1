import { useTheme } from '../ThemeProvider';

export const toggleGroupStyle = ({ isChecked, isFullWidth }, theme) => ({
    style: {
        width: isFullWidth ? '100%' : 'fit-content',
        border: '1px',
        borderColor: 'border',
        borderRadius: 'lg',
        d: 'inline-flex',
    },
    toggleButton: {
        variant: isChecked ? 'primary' : 'secondary',
        borderRadius: 'lg',
        boxShadow: 0,
        _focus: null,
        _hover: null,
        flex: isFullWidth && 1,
    },
});

const useToggleGroupStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].toggleGroup
        ? theme['styles'].toggleGroup(props, theme)
        : toggleGroupStyle(props, theme);

    return {
        // toggle group style
        root: styles.style,

        // single toggle button option style
        toggleButton: styles.toggleButton,
    };
};

export default useToggleGroupStyle;
