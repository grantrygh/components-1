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
        <Flex
            // TODO: probably a better way to handle these breakpoints
            display={['inline-flex', 'inline-flex', 'inline-flex', 'none']}
            align="center"
            mr="spacing-sm"
            {...props}
        >
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
    const { href, exact = true, isSubmenuItem, isActive, isParent, ...rest } = props;

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
        <Flex as={href && Link} href={!isParent ? href : undefined} {...navItemStyleProps} {...rest}>
            {(isActive || isLinkActive) && !isSubmenuItem && <Box {...activeBarStyleProps} />}
            {/* Navigation.ItemMedia | Navigation.ItemText | Navigation.ItemMeta */}
            {props.children}
        </Flex>
    );
};

Navigation.ItemMedia = function NavItemLeft(props: NavigationItemMediaProps) {
    const MdiIcon = props.icon;
    return (
        <Box w="32px" {...props}>
            {props.children || (MdiIcon && <MdiIcon color="currentColor" size={28} />) || null}
        </Box>
    );
};

Navigation.ItemText = function NavItemText(props: BoxProps) {
    return (
        <Box flex="1" minW={100}>
            {props.children}
        </Box>
    );
};

Navigation.ItemMeta = function NavItemRight(props: BoxProps) {
    return <Box>{props.children}</Box>;
};
