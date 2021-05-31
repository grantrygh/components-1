import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { CSSReset, generateShades, Input, ThemeProvider, useTheme } from '../../../../src';
import { CanvasWrapper } from '../../../../src/Canvas';
import { CanvasMenu } from '../../../../src/CanvasMenu';
import { styleguideTheme } from '../../theme';
import { GroupSidebar } from '../GroupSidebar';
import { NotificationsPanel } from '../NotificationsPanel';
import { menuItems } from './menu';

export const AppShellBase = props => {
    const { children } = props;
    const { breakpoint } = useTheme();

    const initialCanvasState = {
        overview: {
            position: 'left',
            ranges: {
                defaultVisible: [breakpoint.stripped.md, 9999],
                isOverlay: [0, breakpoint.stripped.md], // --> type is Overlay and not visible by default
                allowMinify: [breakpoint.stripped.md, 9999], // --> isMinifiable
                defaultMinified: [0, 9999], // --> isMinified
            },
            render: renderProps => <GroupSidebar {...renderProps} />,
            bg: 'primary.500',
            width: 72,
            borderRight: 0,
            p: 4,
        },
        menu: {
            position: 'left',
            ranges: {
                defaultVisible: [breakpoint.stripped.md, 9999],
                isOverlay: [0, breakpoint.stripped.md],
                allowMinify: [breakpoint.stripped.md, 9999],
                defaultMinified: [breakpoint.stripped.md, breakpoint.stripped.lg],
            },
            render: renderProps => <CanvasMenu as="nav" items={menuItems} {...renderProps} />,
            bg: 'canvasBg',
        },
        main: {
            // Main section is always visible, inline, and non-minifiable
            render: renderProps => {
                return renderProps.children;
            },
            bg: 'pageBg',
            overflowY: 'scroll',
        },
        notifications: {
            position: 'right',
            ranges: {
                defaultVisible: false,
                isOverlay: [0, 9999],
                allowMinify: false,
                defaultMinified: false,
            },
            render: renderProps => <NotificationsPanel {...renderProps} />,
            bg: 'navBg',
        },
    };

    return (
        <HelmetProvider>
            <CSSReset />

            <Helmet>
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,500;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <CanvasWrapper initialCanvasState={initialCanvasState}>{children}</CanvasWrapper>
        </HelmetProvider>
    );
};

export const AppShell = props => {
    const [style, setStyle] = useState(styleguideTheme);

    const setPrimaryColor = color => {
        setStyle({
            ...styleguideTheme,
            colors: {
                ...styleguideTheme.colors,
                dark: {
                    ...styleguideTheme.colors.dark,
                    primary: generateShades(color),
                },
            },
        });
    };

    const setBackgroundColor = color => {
        setStyle({
            ...styleguideTheme,
            colors: {
                ...styleguideTheme.colors,
                dark: {
                    ...styleguideTheme.colors.dark,
                    pageBg: color,
                },
            },
        });
    };

    return (
        <ThemeProvider theme={style}>
            <AppShellBase {...props} />
            <div style={{ position: 'fixed', bottom: '50px', right: '50px', zIndex: 1000 }}>
                <Input
                    type="color"
                    // value={style?.colors?.dark?.primary['500']}
                    onChange={e => {
                        setPrimaryColor(e.target.value);
                    }}
                />

                <Input
                    type="color"
                    // value={style?.colors?.dark?.primary['500']}
                    onChange={e => {
                        setBackgroundColor(e.target.value);
                    }}
                />
            </div>
        </ThemeProvider>
    );
};
