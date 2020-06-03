import BellOutlineIcon from 'mdi-react/BellOutlineIcon';
import MenuIcon from 'mdi-react/MenuIcon';
import React from 'react';
import { Box, Icon, Input, InputGroup, InputLeftElement, Navigation } from '../../../../src';
import { useCanvasContext } from '../../../../src/Canvas';
import { Logo } from '../Logo';
import useHeaderStyle from './styles';

export const NavPrimary = () => {
    const { togglePanel } = useCanvasContext();
    const { headerSection: primaryStyle } = useHeaderStyle({
        kind: 'primary',
    });

    return (
        <Navigation.Primary>
            <Box {...primaryStyle.icon}>
                <MenuIcon
                    onClick={() => {
                        togglePanel('menu');
                    }}
                />
            </Box>
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
    const { togglePanel } = useCanvasContext();
    const { headerSection: tertiaryStyle } = useHeaderStyle({
        kind: 'tertiary',
    });

    return (
        <Navigation.Tertiary>
            <Box {...tertiaryStyle.icon}>
                <BellOutlineIcon
                    onClick={() => {
                        togglePanel('notifications');
                    }}
                />
            </Box>
        </Navigation.Tertiary>
    );
};
