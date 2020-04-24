import { useTheme } from '../../../../src/ThemeProvider';

export const HeaderStyle = (props, theme) => ({
    style: {
        //
    },
    kinds: {
        primary: {
            icon: {
                mr: 'spacing',
                color: 'faintText',
                cursor: 'pointer',
            },
        },
        secondary: {
            root: {
                display: { _: 'none', lg: 'flex' },
            },
            icon: {
                name: 'search',
                color: 'faintText',
            },
            input: {
                placeholder: 'Search...',
            },
        },
        tertiary: {
            icon: {
                mr: 'spacing',
                color: 'faintText',
                cursor: 'pointer',
            },
        },
    },
});

const useHeaderStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].Header ? theme['styles'].Header(props, theme) : HeaderStyle(props, theme);

    return {
        // base style
        root: styles.style,

        headerSection: styles.kinds[props.kind],
    };
};

export default useHeaderStyle;
