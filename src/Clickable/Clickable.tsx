import { isExternalUrl } from '@audentio/utils/lib/isExternalUrl';
import React from 'react';
import { Box } from '../Box';
import { useRouter } from '../utils/router';
import { ClickableProps } from './types';

export const Clickable = ({ onClick, target, href, as, staticContext, innerRef, ...props }: ClickableProps) => {
    const { router } = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
        if (onClick) {
            onClick(e);
        }

        if (!href) return;

        const el = e.target as HTMLAnchorElement;

        if (
            // not anchor
            !el.href &&
            !(el.parentNode as HTMLAnchorElement).href &&
            // not button
            el.nodeName !== 'BUTTON' &&
            el.parentNode.nodeName !== 'BUTTON'
        ) {
            const isExternal = isExternalUrl(href);
            const fullUrl = isExternal ? href : window.location.origin + href;

            if (e.metaKey && !isExternal) {
                // cmd+click internal link – open in new tab
                window.open(fullUrl, '_blank');
            } else if (typeof target === 'string') {
                // target prop was passed. use that
                window.open(fullUrl, target);
            } else if (isExternal) {
                // external link open in new tab by default
                // pass target="_self" to override this
                window.open(href, '_blank');
            } else {
                // internal link with no target or metaKey
                // push to history
                router.push(href);
            }
        }

        // don't do anything if a nested anchor or button was clicked
    };
    return <Box as={as} onClick={handleClick} ref={innerRef} cursor={(href || onClick) && 'pointer'} {...props} />;
};
