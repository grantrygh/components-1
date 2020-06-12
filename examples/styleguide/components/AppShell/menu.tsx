import CartIcon from 'mdi-react/CartIcon';
import HomeIcon from 'mdi-react/HomeIcon';
import React from 'react';
import { Avatar, Badge } from '../../../../src';
import { LogoIcon, LogoText } from '../Logo';

export const menuItems = {
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
