import BellOutlineIcon from 'mdi-react/BellOutlineIcon';
import MenuIcon from 'mdi-react/MenuIcon';
import React from 'react';
import { Button, Icon, Input, InputGroup, InputLeftElement, Navigation } from '../../../../src';
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
            <Button
                onClick={() => {
                    togglePanel('menu');
                }}
                iconOnly
                leftIcon={MenuIcon}
                variant="unstyled"
                ariaLabel="Toggle menu"
                {...primaryStyle.icon}
            />
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
            <Button
                onClick={() => {
                    togglePanel('notifications');
                }}
                iconOnly
                leftIcon={BellOutlineIcon}
                variant="unstyled"
                ariaLabel="Toggle notifications"
                {...tertiaryStyle.icon}
            />
        </Navigation.Tertiary>
    );
};
