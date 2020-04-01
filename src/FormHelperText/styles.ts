import { useTheme } from '../ThemeProvider';

export const formHelperTextStyle = ({ color }, theme) => ({
    style: {
        color: 'faintText',
        lineHeight: 'normal',
        fontSize: 'sm',
        mt: 2,
    },
});

const useFormHelperTextStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].formHelperText
        ? theme['styles'].formHelperText(props, theme)
        : formHelperTextStyle(props, theme);

    return {
        ...styles.style,
    };
};

export default useFormHelperTextStyle;
