import { isExternalUrl } from '@audentio/utils/src/isExternalUrl';
import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { PseudoBox } from '../PseudoBox';
import { LinkProps } from './types';

const baseStyleProps = {
    transition: `all 0.15s ease-out`,
    cursor: 'pointer',
    textDecoration: 'none',
    outline: 'none',
    color: 'bodyText',
    _hover: { color: 'titleText' },
    _focus: {
        boxShadow: 'outline',
    },
    _disabled: {
        opacity: '0.4',
        cursor: 'not-allowed',
        textDecoration: 'none',
    },
};

export const Link = forwardRef(({ isDisabled, onClick, href, ...rest }: LinkProps, ref: any) => {
    function getHref() {
        if (href && href.indexOf(window?.location.origin) === 0) {
            return href.replace(window?.location.origin, '');
        }
        return href;
    }

    const linkHref = getHref();
    const isExternal = isExternalUrl(linkHref);

    const externalProps =
        isExternal || !linkHref
            ? { as: 'a', href: linkHref, target: '_blank', rel: 'noopener noreferrer' }
            : { as: NavLink, to: linkHref };

    return (
        // @ts-ignore
        <PseudoBox
            ref={ref}
            tabIndex={isDisabled ? -1 : undefined}
            aria-disabled={isDisabled}
            onClick={isDisabled ? event => event.preventDefault() : onClick}
            {...externalProps}
            {...baseStyleProps}
            {...rest}
        />
    );
});
