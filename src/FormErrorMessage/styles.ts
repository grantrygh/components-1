import { useTheme } from '../ThemeProvider';

export const formErrorMessageStyle = ({ color }, theme) => ({
    style: {
        color: 'error.500',
        mt: 2,
        fontSize: 'sm',
        align: 'center',
    },
});

const useFormErrorMessageStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].formErrorMessage
        ? theme['styles'].formErrorMessage(props, theme)
        : formErrorMessageStyle(props, theme);

    return {
        ...styles.style,
    };
};

export default useFormErrorMessageStyle;
