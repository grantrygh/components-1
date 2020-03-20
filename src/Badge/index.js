/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { forwardRef } from 'react';
import Box from '../Box';
import { useVariantColorWarning } from '../utils';
import useBadgeStyle from './styles';

const Badge = forwardRef(({ variantColor = 'gray', variant = 'subtle', size, children, ...props }, ref) => {
    // Wrong usage of `variantColor` prop is quite common
    // Let's add a warning hook that validates the passed variantColor
    useVariantColorWarning('Badge', variantColor);

    const badgeStyleProps = useBadgeStyle({ color: variantColor, variant, size });

    let child = children;

    // Hexagonal Badge
    const hexContent = {
        position: 'absolute',
        fontSize: 'xl',
    };
    if (variant === 'hexagon') {
        child = (
            <React.Fragment>
                <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" width={size}>
                    <defs></defs>
                    <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" />
                </svg>
                <Box {...hexContent}>{children}</Box>
            </React.Fragment>
        );
    }

    return (
        <Box
            ref={ref}
            display="inline-block"
            px={1}
            textTransform="uppercase"
            fontSize="xs"
            borderRadius="sm"
            fontWeight="bold"
            whiteSpace="nowrap"
            verticalAlign="middle"
            {...badgeStyleProps}
            {...props}
        >
            {child}
        </Box>
    );
});

Badge.displayName = 'Badge';

export default Badge;
