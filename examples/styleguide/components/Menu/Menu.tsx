import HomeIcon from 'mdi-react/HomeIcon';
import React from 'react';
import {
    Accordion,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Badge,
    Box,
    Flex,
    Navigation,
} from '../../../../src';
import { LogoIcon, LogoText } from '../Logo';

const menuItems = [
    {
        label: 'Home',
        icon: HomeIcon,
        href: '/',
    },
    {
        label: 'Shop',
        icon: HomeIcon,
        href: '/shop',
        isAccordion: true,
        children: [
            {
                label: 'Sales',
                icon: null,
                href: '/shop/sales',
                meta: 37,
            },
            {
                label: 'Product List',
                icon: null,
                href: '/shop/products',
                meta: 8,
            },
        ],
    },
    {
        label: 'Uchiha Itachi',
        position: 'bottom',
        media: <Avatar size="sm" name="Uchiha Itachi" src="https://bit.ly/uchiha-itachi" />,
        href: '/profile',
        meta: (
            <Badge variant="solid" variantColor="error">
                3
            </Badge>
        ),
        mb: 0,
    },
];

export function Menu(props) {
    const { isMinified = true, items } = props;

    const renderNavItem = ({ label, href, icon = null, media = null, meta = null, isAccordion = false, ...rest }) => {
        if (isMinified && rest.isSubmenuItem) {
            return null;
        }

        return (
            <Navigation.Item href={href} exact={!isAccordion} {...rest}>
                <Navigation.ItemMedia icon={icon} mr={!isMinified && 4}>
                    {media}
                </Navigation.ItemMedia>
                {!isMinified && <Navigation.ItemText>{label}</Navigation.ItemText>}
                {meta && !isMinified && <Navigation.ItemMeta>{meta}</Navigation.ItemMeta>}
            </Navigation.Item>
        );
    };

    const renderAccordion = accProps => {
        return (
            <Navigation.Item>
                <Accordion allowToggle>
                    <AccordionItem>
                        <AccordionHeader>
                            {renderNavItem({
                                ...accProps,
                                mb: 0,
                                isParent: true,
                            })}
                            {!isMinified && <AccordionIcon />}
                        </AccordionHeader>
                        {accProps.children &&
                            accProps.children.map(child => (
                                <AccordionPanel>
                                    {renderNavItem({
                                        ...child,
                                        isSubmenuItem: true,
                                    })}
                                </AccordionPanel>
                            ))}
                    </AccordionItem>
                </Accordion>
            </Navigation.Item>
        );
    };

    const primaryItems = [];
    const secondaryItems = [];

    menuItems.forEach(item => {
        if (item.position === 'bottom') {
            secondaryItems.push(item);
        } else {
            primaryItems.push(item);
        }
    });

    return (
        <Flex as="nav" h="100%" direction="column">
            {/* Menu Header */}
            <Box>
                {renderNavItem({
                    media: <LogoIcon />,
                    label: <LogoText />,
                    href: null,
                })}
            </Box>

            {/* Main navigation links */}
            <Box flexGrow="1">
                {primaryItems.map(item => {
                    if (item.isAccordion) {
                        return renderAccordion(item);
                    }

                    return renderNavItem(item);
                })}
            </Box>

            {/* Menu Footer */}
            <Box>
                {secondaryItems.map(item => {
                    if (item.isAccordion) {
                        return renderAccordion(item);
                    }

                    return renderNavItem(item);
                })}
            </Box>
        </Flex>
    );
}
