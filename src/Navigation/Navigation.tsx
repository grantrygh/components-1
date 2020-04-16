import React from 'react';
import { Box } from '../Box';
import { BoxProps } from '../Box/types';
import { Flex } from '../Flex';
import Link from '../Link';
import useNavigationStyle from './styles';
import { NavigationItemMediaProps, NavigationItemProps } from './types';

export default function Navigation(props) {
    const { root: style } = useNavigationStyle(props);

    return (
        <Flex as="header" align="center" justify="space-between" direction="row" {...style} {...props}>
            {props.children}
        </Flex>
    );
}

Navigation.Primary = function NavigationPrimary(props: BoxProps) {
    return (
        <Flex minWidth={['none', '200px']} fontWeight="bold" fontSize="4" mr="3" {...props}>
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
        <Flex minWidth={['none', '200px']} justify="flex-end" ml="3" {...props}>
            {props.children}
        </Flex>
    );
};

Navigation.Item = function NavItem(props: NavigationItemProps) {
    const { href, exact = true, isSubmenuItem, isActive } = props;

    let isLinkActive = false;
    const path = window.location.pathname;
    if (href && href === path && exact) {
        isLinkActive = true;
    } else if (href && path.indexOf(href) > -1 && !exact) {
        isLinkActive = true;
    }

    const { navItem: navItemStyleProps, activeBar: activeBarStyleProps } = useNavigationStyle({
        isActive: isActive || isLinkActive,
        isSubmenuItem,
        href,
    });

    return (
        <Flex as={href && Link} href={href} {...navItemStyleProps} {...props}>
            {(isActive || isLinkActive) && !isSubmenuItem && <Box {...activeBarStyleProps} />}
            {/* Navigation.ItemMedia | Navigation.ItemText | Navigation.ItemMeta */}
            {props.children}
        </Flex>
    );
};

Navigation.ItemMedia = function NavItemLeft(props: NavigationItemMediaProps) {
    const MdiIcon = props.icon;
    return (
        <Box w="32px" mr={4}>
            {props.children || (MdiIcon && <MdiIcon color="currentColor" size={28} />) || null}
        </Box>
    );
};

Navigation.ItemText = function NavItemText(props: BoxProps) {
    return <Box flex="1">{props.children}</Box>;
};

Navigation.ItemMeta = function NavItemRight(props: BoxProps) {
    return <Box>{props.children}</Box>;
};
