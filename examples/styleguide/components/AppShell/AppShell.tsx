import CartIcon from 'mdi-react/CartIcon';
import HomeIcon from 'mdi-react/HomeIcon';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Avatar, Badge, Box, CSSReset, Navigation, theme, ThemeProvider } from '../../../../src';
import { CanvasWrapper } from '../../../../src/Canvas';
import { CanvasMenu } from '../../../../src/CanvasMenu';
import { PageFooter } from '../../../../src/Page';
import { NavPrimary, NavSecondary, NavTertiary } from '../Header';
import { LogoIcon, LogoText } from '../Logo';

const menuItems = {
    header: [
        {
            label: <LogoText />,
            media: <LogoIcon />,
            href: null,
        },
    ],
    content: [
        {
            label: 'Home',
            icon: HomeIcon,
            href: '/',
        },
        {
            label: 'Shop',
            icon: CartIcon,
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
    ],
    footer: [
        {
            label: 'Uchiha Itachi',
            media: <Avatar size="sm" name="Uchiha Itachi" src="https://bit.ly/uchiha-itachi" />,
            href: '/profile',
            meta: (
                <Badge variant="solid" variantColor="error">
                    3
                </Badge>
            ),
            mb: 0,
        },
    ],
};

const initialCanvasState = {
    overview: {
        name: 'overview',
        position: 'left',
        type: 'inline',
        isMinifiable: false,
        isMinified: true,
        isVisible: true,
        isStackable: true,
        render: componentProps => <Box />,
        bg: 'primary.500',
        width: 72,
        borderRight: 0,
    },
    menu: {
        name: 'menu',
        position: 'left',
        type: 'inline',
        isMinifiable: true,
        isMinified: false,
        isVisible: true,
        isStackable: true,
        render: componentProps => <CanvasMenu as="nav" items={menuItems} {...componentProps} />,
        bg: 'canvasBg',
    },
    main: {
        name: 'main',
        isMinifiable: false,
        render: componentProps => {
            return (
                <>
                    {/* Header */}
                    <Navigation>
                        <NavPrimary />
                        <NavSecondary />
                        <NavTertiary />
                    </Navigation>

                    {/* Main */}
                    {componentProps.children}

                    {/* Footer */}
                    <PageFooter>Footer</PageFooter>
                </>
            );
        },
        bg: 'pageBg',
    },
    notification: {
        name: 'notifications',
        position: 'right',
        type: 'overlay',
        isMinifiable: false,
        isVisible: false,
        render: componentProps => <Box>Notifications</Box>,
        bg: 'navBg',
        width: '250px',
    },
};

export const AppShell = props => {
    const { children } = props;
    return (
        <HelmetProvider>
            <ThemeProvider theme={{ ...theme, fonts: { ...theme.fonts, heading: 'Poppins' } }}>
                <CSSReset />

                <Helmet>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,500;0,700;1,400&display=swap"
                        rel="stylesheet"
                    />
                </Helmet>
                <CanvasWrapper initialCanvasState={initialCanvasState}>{children}</CanvasWrapper>
            </ThemeProvider>
        </HelmetProvider>
    );
};
