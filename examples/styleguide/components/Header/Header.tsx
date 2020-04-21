import MenuIcon from 'mdi-react/MenuIcon';
import NotificationsIcon from 'mdi-react/NotificationsIcon';
import React from 'react';
import { Box, Icon, Input, InputGroup, InputLeftElement, Navigation, UserDropdown } from '../../../../src';
import { CanvasContext } from '../../../../src/Canvas';
import { Logo } from '../Logo';

export const NavPrimary = () => (
    <Navigation.Primary>
        <CanvasContext.Consumer>
            {({ togglePanel }) => {
                return (
                    <Box mr="2">
                        <MenuIcon
                            onClick={() => {
                                togglePanel('menu');
                            }}
                        />
                    </Box>
                );
            }}
        </CanvasContext.Consumer>
        <Logo />
    </Navigation.Primary>
);

export const NavSecondary = () => (
    <Navigation.Secondary display={{ _: 'none', lg: 'flex' }}>
        <InputGroup mb={0}>
            <InputLeftElement>
                <Icon name="search" color="gray.300" />
            </InputLeftElement>
            <Input bg="gray.50" size="md" placeholder="Search..." />
        </InputGroup>
    </Navigation.Secondary>
);

export const NavTertiary = () => (
    <Navigation.Tertiary>
        <CanvasContext.Consumer>
            {({ togglePanel }) => {
                return (
                    <Box mr="2">
                        <NotificationsIcon
                            onClick={() => {
                                togglePanel('notifications');
                            }}
                        />
                    </Box>
                );
            }}
        </CanvasContext.Consumer>
        <UserDropdown />
    </Navigation.Tertiary>
);
