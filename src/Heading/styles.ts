import { componentStyleDef } from '../theme/types';
import { useTheme } from '../ThemeProvider';
import { HeadingProps } from './types';

const scaleRatio = 1.16;
const sizeBase = 14;

function reverseNumber(n, min, max) {
    return max + min - n;
}

export const getKind = (kind, scale = scaleRatio) => {
    const fontSize = scale ** kind * sizeBase;
    return {
        fontSize: [0.9 * fontSize, null, fontSize],
        lineHeight: '1.5',
        color: 'titleText',
        mb: '0.4em',
    };
};

export const headingStyle: componentStyleDef<HeadingProps> = ({ kind }, theme) => ({
    scaleRatio,
    style: {
        fontWeight: 'bold',
        fontFamily: 'heading',

        ...getKind(reverseNumber(Number(kind.replace('h', '')) - 1, 0, 5)),
    },
});

const useHeadingStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].heading ? theme['styles'].heading(props, theme) : headingStyle(props, theme);

    return styles.style;
};

export default useHeadingStyle;
