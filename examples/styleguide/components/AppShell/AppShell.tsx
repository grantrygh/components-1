import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { CSSReset, Navigation, theme, ThemeProvider } from '../../../../src';
import { CanvasWrapper } from '../../../../src/Canvas';
import { NavPrimary, NavSecondary, NavTertiary } from '../Header';
import { Menu, TestMenu } from '../Menu';

const initialCanvasState = {
    menu: {
        name: 'menu',
        position: 'left',
        bg: 'canvasBg',
        isMinifiable: true,
        isMinified: false,
        isVisible: true,
        isStackable: true,
        render: componentProps => <Menu {...componentProps} />,
        type: 'inline',
    },
    main: {
        isMinifiable: false,
        name: 'main',
        bg: 'pageBg',
        render: componentProps => {
            return (
                <>
                    <Navigation>
                        <NavPrimary />
                        <NavSecondary />
                        <NavTertiary />
                    </Navigation>

                    {componentProps.children}
                </>
            );
        },
    },
    filter: {
        name: 'filter',
        position: 'right',
        bg: 'navBg',
        isMinifiable: false,
        isVisible: false,
        width: '250px',
        render: componentProps => <TestMenu {...componentProps} />,
        type: 'overlay',
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
                <CanvasWrapper initialCanvasState={initialCanvasState}>
                    {/* <Box overflow="hidden" maxWidth="100vw"> */}
                    {children}
                    {/* </Box> */}
                </CanvasWrapper>
            </ThemeProvider>
        </HelmetProvider>
    );
};
