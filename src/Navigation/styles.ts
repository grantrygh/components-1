import { BoxProps } from '../Box/types';
import { componentStyleDef } from '../theme/types';
import { useTheme } from '../ThemeProvider';
import { INavItemMedia, NavigationItemProps, NavigationProps } from './types';

export const navigationStyle: componentStyleDef<NavigationProps & NavigationItemProps & INavItemMedia> = (
    { isSticky = true, isActive, isSubmenuItem, clickable, unstyled },
    { zIndices, sizes, colors }
) => {
    const style: BoxProps = {
        bg: 'navBg',
        boxShadow: 'topNav',
        minHeight: 'header',
        height: 'header',
        width: '100%',
        px: ['spacing', 'spacing', 'spacing-lg'],
    };

    if (isSticky) {
        style.position = 'sticky';
        style.top = 0;
        style.zIndex = zIndices.sticky;
    }

    return {
        style,
        navItem: {
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            minHeight: 50,
            mb: !isSubmenuItem && 3,
            textAlign: 'left',
            position: 'relative',
            color: isActive && 'activeLink',
            fontWeight: isActive && !isSubmenuItem && 'bold',
            cursor: clickable && 'pointer',
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
        navItemMedia: {
            textAlign: 'center',
            _even: !unstyled && { path: { fill: isActive ? colors.primary[500] : colors.bodyText } },
            _odd: !unstyled && { path: { fill: isActive ? colors.primary[500] : colors.bodyText } },
        },
    };
};

export default function useNavigationStyle(props) {
    const theme = useTheme();
    const styles = theme['styles'].navigation
        ? theme['styles'].navigation(props, theme)
        : navigationStyle(props, theme);

    return {
        root: styles.style,
        navItem: styles.navItem,
        activeBar: styles.activeBar,
        navItemMedia: styles.navItemMedia,
    };
}
