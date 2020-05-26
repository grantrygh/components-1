import BellOutlineIcon from 'mdi-react/BellOutlineIcon';
import MenuIcon from 'mdi-react/MenuIcon';
import React from 'react';
import { Box, Icon, Input, InputGroup, InputLeftElement, Navigation } from '../../../../src';
import { CanvasContext } from '../../../../src/Canvas';
import { Logo } from '../Logo';
import useHeaderStyle from './styles';

export const NavPrimary = () => {
    const { headerSection: primaryStyle } = useHeaderStyle({
        kind: 'primary',
    });

    return (
        <Navigation.Primary>
            <CanvasContext.Consumer>
                {({ togglePanel }) => {
                    return (
                        <Box {...primaryStyle.icon}>
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
};

export const NavSecondary = () => {
    const { headerSection: secondaryStyle } = useHeaderStyle({
        kind: 'secondary',
    });
    return (
        <Navigation.Secondary {...secondaryStyle.root}>
            <InputGroup mb={0}>
                <InputLeftElement>
                    <Icon {...secondaryStyle.icon} />
                </InputLeftElement>
                <Input {...secondaryStyle.input} />
            </InputGroup>
        </Navigation.Secondary>
    );
};

export const NavTertiary = () => {
    const { headerSection: tertiaryStyle } = useHeaderStyle({
        kind: 'tertiary',
    });

    return (
        <Navigation.Tertiary>
            <CanvasContext.Consumer>
                {({ togglePanel }) => {
                    return (
                        <Box {...tertiaryStyle.icon}>
                            <BellOutlineIcon
                                onClick={() => {
                                    togglePanel('notifications');
                                }}
                            />
                        </Box>
                    );
                }}
            </CanvasContext.Consumer>
        </Navigation.Tertiary>
    );
};
