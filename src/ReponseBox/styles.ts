import { useTheme } from '../ThemeProvider';

export const responseBoxStyle = ({ color = 'primary' }, theme) => ({
    style: {
        size: 'md',
        focusBorderColor: `${color}.500`,
        my: 'spacing-sm',
    },
    cancel: {
        textTransform: 'uppercase',
        size: 'sm',
        variant: 'ghost',
        mr: 'spacing-sm',
    },
    submit: {
        textTransform: 'uppercase',
        size: 'sm',
        bg: `${color}.500`,
        color: 'white',
    },
});

const useResponseBoxStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].responseBox
        ? theme['styles'].responseBox(props, theme)
        : responseBoxStyle(props, theme);

    return {
        // base style
        text: styles.style,
        cancel: styles.cancel,
        submit: styles.submit,
    };
};

export default useResponseBoxStyle;
