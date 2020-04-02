import { useTheme } from '../ThemeProvider';

export const dropzoneStyle = ({ color = 'gray', disabled }, theme) => ({
    style: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '125px',
        padding: 4,
        borderWidth: 2,
        borderRadius: 'radius',
        borderColor: `${color}.400`,
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

export const useDropzoneTextStyle = ({ color = 'gray' }) => {
    return {
        color: `${color}.400`,
    };
};

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
