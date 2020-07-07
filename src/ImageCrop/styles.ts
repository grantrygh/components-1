import { useTheme } from '../ThemeProvider';

export const imageCropStyle = (props, theme) => ({
    style: {
        position: 'relative',
        width: '100%',
        height: [200, 400],
        // background: '#333',
    },
    controls: {
        pt: 'spacing-lg',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'stretch',
        // [theme.breakpoints.up('sm')]: {
        //     flexDirection: 'row',
        //     alignItems: 'center',
        // },
    },
});

const useImageCropStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].imageCrop ? theme['styles'].imageCrop(props, theme) : imageCropStyle(props, theme);

    return {
        // base style
        root: styles.style,

        controls: styles.controls,
    };
};

export default useImageCropStyle;
