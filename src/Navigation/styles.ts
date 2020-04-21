import { BoxProps } from '../Box/types';
import { componentStyleDef } from '../theme/types';
import { useTheme } from '../ThemeProvider';
import { NavigationItemProps, NavigationProps } from './types';

export const navigationStyles: componentStyleDef<NavigationProps & NavigationItemProps> = (
    { isSticky, isActive, isSubmenuItem },
    { zIndices, sizes }
) => {
    const style: BoxProps = {
        bg: 'navBg',
        boxShadow: 'topNav',
        height: '4rem',
        px: '4',
    };

    if (isSticky) {
        style.position = 'sticky';
        style.top = 0;
        style.zIndex = zIndices.sticky;
    }

    return {
        style,
        navItem: {
            align: 'center',
            flex: 1,
            minHeight: 50,
            mb: !isSubmenuItem && 3,
            textAlign: 'left',
            position: 'relative',
            color: isActive && 'activeLink',
            fontWeight: isActive && !isSubmenuItem && 'bold',
        },
        activeBar: {
            position: 'absolute',
            width: 1,
            rounded: 'full',
            roundedTopLeft: 0,
            roundedBottomLeft: 0,
            height: '75%',
            boxSizing: 'contain-box',
            backgroundColor: 'primary.500',
            left: `-${sizes.canvas.spacing}`,
        },
    };
};

export default function useNavigationStyle(props) {
    const theme = useTheme();
    const styles = theme.navigation ? theme.navigation(props, theme) : navigationStyles(props, theme);

    return {
        root: styles.style,
        navItem: styles.navItem,
        activeBar: styles.activeBar,
    };
}
