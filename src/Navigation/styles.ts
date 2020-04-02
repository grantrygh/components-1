import { BoxProps } from '../Box/types';
import { componentStyleDef } from '../theme/types';
import { useTheme } from '../ThemeProvider';
import { NavigationProps } from './types';

export const navigationStyles: componentStyleDef<NavigationProps> = (props, theme) => {
    const style: BoxProps = {
        bg: 'white',
        boxShadow: 'sm',
        height: '4rem',
        px: '4',
    };

    if (props.isSticky) {
        style.position = 'sticky';
        style.top = 0;
        style.zIndex = theme.zIndices.sticky;
    }

    return { style };
};

export default function useNavigationStyle(props) {
    const theme = useTheme();
    const styles = theme.navigation ? theme.navigation(props, theme) : navigationStyles(props, theme);

    return styles.style;
}
