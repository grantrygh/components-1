import React from 'react';
import { Box } from '../Box';
import { BoxProps } from '../Box/types';
import { Flex } from '../Flex';
import useNavigationStyle from './styles';

export default function Navigation(props) {
    const style = useNavigationStyle(props);

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

Navigation.Item = function NavItem(props: BoxProps) {
    return <Box {...props} />;
};
