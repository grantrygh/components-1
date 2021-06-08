import { isExternalUrl } from '@audentio/utils/lib/isExternalUrl';
import React, { forwardRef } from 'react';
import { PseudoBox } from '../PseudoBox';
import { useRouter } from '../utils/router';
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
    const { Link: RouterLink, id } = useRouter();

    function getHref() {
        if (href && typeof window !== 'undefined' && href.indexOf(window?.location.origin) === 0) {
            return href.replace(window?.location.origin, '');
        }
        return href;
    }

    const linkHref = getHref();
    const isExternal = isExternalUrl(linkHref);

    let linkProps = {};

    if (isExternal || !linkHref) {
        // use normal anchor for external links
        linkProps = { as: 'a', href: linkHref, target: '_blank', rel: 'noopener noreferrer' };
    } else if (id === 'next') {
        // use next/link inside next apps
        linkProps = { as: RouterLink, href: linkHref };
    } else {
        // use react-router as fallback
        linkProps = { as: RouterLink, to: linkHref };
    }

    return (
        // @ts-ignore
        <PseudoBox
            ref={ref}
            tabIndex={isDisabled ? -1 : undefined}
            aria-disabled={isDisabled}
            onClick={isDisabled ? event => event.preventDefault() : onClick}
            {...baseStyleProps}
            {...linkProps}
            {...rest}
        />
    );
});
