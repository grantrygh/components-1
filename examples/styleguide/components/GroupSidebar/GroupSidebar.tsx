import HomeIcon from 'mdi-react/HomeIcon';
import React from 'react';
import { PseudoBox } from '../../../../PseudoBox';
import { Stack, useTheme } from '../../../../src';
import { AudentioAgency, AudentioCommunity, AudentioGaming, Nova, Themehouse } from './icons';

const getGroupIcon = id => {
    switch (id) {
        case 'audentio_gaming':
            return <AudentioGaming />;
        case 'audentio_community':
            return <AudentioCommunity />;
        case 'audentio_agency':
            return <AudentioAgency />;
        case 'themehouse':
            return <Themehouse />;
        case 'nova':
            return <Nova />;
        default:
            return HomeIcon;
    }
};

export const GroupSidebar = props => {
    const { colors } = useTheme();
    const iconList = [
        { href: 'https://audent.io', id: 'audentio_agency' },
        { href: 'https://audent.io', id: 'audentio_community' },
        { href: 'https://audent.io', id: 'audentio_gaming' },
        { href: 'https://themehouse.com', id: 'themehouse' },
        { href: 'https://audent.io', id: 'nova' },
    ];

    const menuItems = {
        content: iconList.map(icon => ({
            media: getGroupIcon(icon.id),
            href: icon.href,
        })),
    };

    const boxProps = {
        bg: colors.titleText,
        rounded: 16,
        _even: {
            svg: {
                h: '100%',
                w: '100%',
            },
            path: {
                fill: colors.pageBg,
            },
        },
        _odd: {
            svg: {
                h: '100%',
                w: '100%',
            },
            path: {
                fill: colors.pageBg,
            },
        },
    };

    return (
        <Stack spacing={4}>
            {iconList.map(icon => {
                // const Media = getGroupIcon(icon.id)
                return (
                    <PseudoBox {...boxProps} key={icon.id}>
                        {getGroupIcon(icon.id)}
                    </PseudoBox>
                );
            })}
        </Stack>
    );

    // return <CanvasMenu items={menuItems} color="green.500" bg="green" {...props} />;
};
