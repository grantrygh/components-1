import React, { forwardRef } from 'react';
import { PseudoBox } from '../PseudoBox';
import { LinkProps } from './types';

const baseStyleProps = {
    transition: `all 0.15s ease-out`,
    cursor: 'pointer',
    textDecoration: 'none',
    outline: 'none',
    color: 'bodyText',
    _hover: { textDecoration: 'underline' },
    _focus: {
        boxShadow: 'outline',
    },
    _disabled: {
        opacity: '0.4',
        cursor: 'not-allowed',
        textDecoration: 'none',
    },
};

export const Link = forwardRef(({ isDisabled, isExternal, onClick, href, ...rest }: LinkProps, ref) => {
    function getHref() {
        if (href && href.indexOf(window.location.origin) === 0) {
            return href.replace(window.location.origin, '');
        }
        return href;
    }

    const linkHref = getHref();
    const externalProps = isExternal
        ? { href: linkHref, target: '_blank', rel: 'noopener noreferrer' }
        : { href: linkHref };
    // : { as: NavLink, to: linkHref };

    return (
        <PseudoBox
            as="a"
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
