import BellOutlineIcon from 'mdi-react/BellOutlineIcon';
import MenuIcon from 'mdi-react/MenuIcon';
import React from 'react';
import { Avatar, AvatarBadge } from '../../../../Avatar';
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '../../../../Menu';
import { Button, Icon, Input, InputGroup, InputLeftElement, Navigation } from '../../../../src';
import { useCanvasContext } from '../../../../src/Canvas';
import { Logo } from '../Logo';
import useHeaderStyle from './styles';

const NavPrimary = ({ title }) => {
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
            {title}
        </Navigation.Primary>
    );
};

const NavSecondary = () => {
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

const NavTertiary = () => {
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

            {/* "left" | "right" | "auto-start" | "auto" | "auto-end" | "top-start" | "top" | "top-end" | "right-start" | "right-end" | "bottom-end" | "bottom" | "bottom-start" | "left-end" | "left-start" */}
            <Menu placement="right">
                <MenuButton as={Button} variant="unstyled" iconOnly>
                    <Avatar size="sm" name="Uchiha Itachi" src="https://bit.ly/uchiha-itachi">
                        <AvatarBadge size="1.25em" />
                    </Avatar>
                </MenuButton>

                <MenuList minWidth="200px">
                    <MenuItem>Share</MenuItem>
                    <MenuItem>Move</MenuItem>
                    <MenuDivider />
                    <MenuItem>Rename</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </MenuList>
            </Menu>
        </Navigation.Tertiary>
    );
};

export const Header = ({ title, transparent }) => {
    let headerProps = {};
    if (transparent) {
        headerProps = {
            bg: 'transparent',
            boxShadow: 0,
        };
    }
    return (
        <Navigation {...headerProps}>
            <NavPrimary title={title} />
            <NavSecondary />
            <NavTertiary />
        </Navigation>
    );
};
