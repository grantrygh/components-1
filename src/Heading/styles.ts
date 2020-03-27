import { componentStyleDef } from '../theme/types';
import { useTheme } from '../ThemeProvider';
import { HeadingProps } from './types';

const scaleRatio = 1.25;
const sizeBase = 14;

function reverseNumber(n, min, max) {
    return max + min - n;
}

const getKind = kind => ({
    fontSize: scaleRatio ** kind * sizeBase,
    lineHeight: '1.4',
});

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
