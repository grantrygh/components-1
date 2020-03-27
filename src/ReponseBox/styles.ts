import { useTheme } from '../ThemeProvider';

export const responseBoxStyle = ({ color = 'blue' }, theme) => ({
    style: {
        size: 'md',
        focusBorderColor: `${color}.500`,
        my: 2,
    },
    cancel: {
        textTransform: 'uppercase',
        fontSize: 'xs',
        size: 'sm',
        variant: 'ghost',
        mr: 2,
    },
    submit: {
        textTransform: 'uppercase',
        fontSize: 'xs',
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
