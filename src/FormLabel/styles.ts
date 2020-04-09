import { useTheme } from '../ThemeProvider';

export const formLabelStyle = ({ isDisabled }, theme) => ({
    style: {
        fontSize: 'sm',
        pr: 'input.spacing.sm',
        pb: 'input.spacing.sm',
        color: isDisabled ? 'disabled' : 'faintText',
        fontWeight: 'medium',
        textAlign: 'left',
        cursor: 'pointer',
    },
    requiredIndicator: {
        color: 'error.500',
    },
});

const useFormLabelStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].formLabel ? theme['styles'].formLabel(props, theme) : formLabelStyle(props, theme);

    return {
        // base style
        root: styles.style,
        requiredIndicator: styles.requiredIndicator,
    };
};

export default useFormLabelStyle;
