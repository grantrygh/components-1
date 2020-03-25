import { useTheme } from '../ThemeProvider';

// TODO: revisit this
export const lightboxStyle = ({ color = 'white' }, theme) => ({
    style: {
        // display: 'flex',
        // alignItems: 'center',
        // position: 'relative',
        // overflow: 'hidden',
        // pl: 4,
        // pr: 4,
        // pt: 3,
        // pb: 3,
    },
    control: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        margin: 'auto',
        zIndex: theme.zIndices.modal + 1,
        size: 'lg',
        variant: 'outline',
        color,
    },
});

const useLightboxStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].lightbox ? theme['styles'].lightbox(props, theme) : lightboxStyle(props, theme);

    return {
        // base style
        baseStyles: styles.style,

        // variant style
        controlStyles: styles.control,
    };
};

export default useLightboxStyle;
