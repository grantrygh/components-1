import { useTheme } from '../ThemeProvider';

export const formLabelStyle = ({ isDisabled }, theme) => ({
    style: {
        fontSize: 'md',
        pr: '12px',
        pb: '4px',
        opacity: isDisabled ? '0.4' : '1',
        fontWeight: 'medium',
        textAlign: 'left',
    },
    requiredIndicator: {
        ml: 1,
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
