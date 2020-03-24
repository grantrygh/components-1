import { componentStyleDef } from '../theme/types';
import { useTheme } from '../ThemeProvider';
import { HeadingProps } from './types';

const kinds = {
    h1: {
        fontSize: ['3rem', null, '4rem'],
        lineHeight: '5.28rem',
    },
    h2: {
        fontSize: ['2.375rem', null, '3rem'],
        lineHeight: '4.28rem',
    },
    h3: {
        fontSize: ['1.875rem', null, '2.375rem'],
        lineHeight: '4.07rem',
    },
    h4: {
        fontSize: '1.875rem',
        lineHeight: '3.21rem',
        fontWeight: 'medium',
    },
    h5: {
        fontSize: '1.5rem',
        lineHeight: '2.57rem',
    },
    h6: {
        fontSize: '1.25rem',
        lineHeight: '2.14rem',
        fontWeight: 'medium',
    },
    subtitle: {
        fontSize: '1rem',
        lineHeight: '1.5rem',
        fontWeight: 'medium',
    },
};

export const headingStyle: componentStyleDef<HeadingProps> = ({ kind }) => ({
    style: {
        fontWeight: 'bold',
        fontFamily: 'heading',
        ...kinds[kind],
    },
});

const useHeadingStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].heading ? theme['styles'].heading(props, theme) : headingStyle(props, theme);

    return styles.style;
};

export default useHeadingStyle;
