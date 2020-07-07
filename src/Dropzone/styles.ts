import { useTheme } from '../ThemeProvider';

export const dropzoneStyle = ({ disabled }, theme) => ({
    style: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '75px',
        padding: 4,
        borderWidth: 2,
        borderRadius: 'radius',
        borderColor: `border`,
        borderStyle: 'dashed',
        transition: 'border 0.24s ease-in-out',
        width: '100%',
        boxSizing: 'border-box',
        _hover: !disabled && {
            cursor: 'pointer',
            borderColor: 'info.500',
        },
    },
    states: {
        active: {
            borderColor: 'info.500',
        },
        accept: {
            borderColor: 'success.500',
        },
        reject: {
            borderColor: 'error.500',
        },
    },
});

const useDropzoneStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].dropzoneStyle
        ? theme['styles'].dropzoneStyle(props, theme)
        : dropzoneStyle(props, theme);

    return {
        // base style
        ...styles.style,

        ...styles.states[props.state],
    };
};

export default useDropzoneStyle;
