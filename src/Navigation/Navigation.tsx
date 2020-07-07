import React, { Children, cloneElement } from 'react';
import { Box } from '../Box';
import { BoxProps } from '../Box/types';
import { Flex } from '../Flex';
import { useRouter } from '../hooks/useRouter';
import { Link } from '../Link';
import { PseudoBox } from '../PseudoBox';
import useNavigationStyle from './styles';
import { NavigationItemMediaProps, NavigationItemProps } from './types';

export function Navigation(props) {
    const { root: style } = useNavigationStyle(props);

    return (
        <Flex
            as="header"
            role="banner"
            align="center"
            justify="space-between"
            direction="row"
            boxShadow="topNav"
            {...style}
            {...props}
        >
            {props.children}
        </Flex>
    );
}

Navigation.Primary = function NavigationPrimary(props: BoxProps) {
    return (
        <Flex display="inline-flex" align="center" mr="spacing-sm" {...props}>
            {props.children}
        </Flex>
    );
};

Navigation.Secondary = function NavigationSecondary(props: BoxProps) {
    return (
        <Flex flexGrow={1} {...props}>
            {props.children}
        </Flex>
    );
};

Navigation.Tertiary = function NavigationTertiary(props: BoxProps) {
    return (
        <Flex justify="flex-end" align="center" {...props}>
            {props.children}
        </Flex>
    );
};

Navigation.Item = function NavItem(props: NavigationItemProps) {
    const { href, exact, isSubmenuItem, isActive, isParent, isMinified, onClick, ...rest } = props;
    const { location } = useRouter();

    let isLinkActive = false;
    const pathname = location?.pathname;
    const path = `${pathname}${location.search}`;

    if (href && href === path && exact) {
        isLinkActive = true;
    } else if (href && path.indexOf(href) > -1 && !exact) {
        isLinkActive = true;
    }

    const { navItem: navItemStyleProps, activeBar: activeBarStyleProps } = useNavigationStyle({
        isActive: isActive || isLinkActive,
        isSubmenuItem,
        clickable: !!(href || onClick),
    });

    const NavElement = href ? Link : Flex;

    return (
        <NavElement
            href={!isParent || (isParent && isMinified) ? href : undefined}
            onClick={onClick}
            {...navItemStyleProps}
            {...rest}
        >
            {(isActive || isLinkActive) && !isSubmenuItem && <Box {...activeBarStyleProps} />}
            {/* Navigation.ItemMedia | Navigation.ItemText | Navigation.ItemMeta */}
            {Children.map(props.children, (child, index) => {
                if (child) {
                    return cloneElement(child as any, {
                        isActive: isLinkActive,
                    });
                }
                return null;
            })}
        </NavElement>
    );
};

Navigation.ItemMedia = function NavItemLeft(props: NavigationItemMediaProps) {
    const { icon, isActive, unstyled } = props;
    const MdiIcon = icon;

    const { navItemMedia: navItemMediaStyleProps } = useNavigationStyle({
        isActive,
        unstyled,
    });

    return (
        <PseudoBox w="32px" {...navItemMediaStyleProps} {...props}>
            {props.children || (MdiIcon && <MdiIcon color="currentColor" size={28} />) || null}
        </PseudoBox>
    );
};

Navigation.ItemText = function NavItemText(props: BoxProps) {
    return (
        <Box flex="1" whiteSpace="nowrap">
            {props.children}
        </Box>
    );
};

Navigation.ItemMeta = function NavItemRight(props: BoxProps) {
    return <Box>{props.children}</Box>;
};
