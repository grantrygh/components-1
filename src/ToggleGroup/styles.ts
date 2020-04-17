import { useTheme } from '../ThemeProvider';

export const toggleGroupStyle = ({ isChecked }, theme) => ({
    style: {
        width: 'fit-content',
        border: '1px',
        borderColor: 'border',
        borderRadius: 'lg',
    },
    toggleButton: {
        variant: isChecked ? 'primary' : 'secondary',
        borderRadius: 'lg',
        boxShadow: 0,
        _focus: null,
        _hover: null,
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
