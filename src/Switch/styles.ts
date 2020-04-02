import { useTheme } from '../ThemeProvider';

export const switchStyle = ({ color = 'primary', size = 'md' }, theme) => {
    const sizes = {
        sm: {
            width: '1.5rem',
            height: '0.75rem',
        },
        md: {
            width: '2rem',
            height: '1rem',
        },
        lg: {
            width: '3rem',
            height: '1.5rem',
        },
    };

    const { width, height } = sizes[size];
    return {
        style: {
            height,
            width,
            rounded: 'full',
            justifyContent: 'flex-start',
            bg: 'track',
            boxSizing: 'content-box',
            p: '3px',
            _checked: {
                bg: `${color}.500`,
            },
            _child: {
                transform: `translateX(0)`,
            },
            _checkedAndChild: {
                transform: `translateX(calc(${width} - ${height}))`,
            },
            _focus: {
                boxShadow: 'outline',
            },
            _hover: {
                cursor: 'pointer',
            },
            _checkedAndHover: {
                cursor: 'pointer',
            },
            _disabled: {
                opacity: 0.4,
                cursor: 'not-allowed',
            },
        },
    };
};

const useSwitchStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].switch ? theme['styles'].switch(props, theme) : switchStyle(props, theme);

    return {
        // base style
        ...styles.style,
    };
};

export default useSwitchStyle;
