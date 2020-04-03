/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { forwardRef } from 'react';
import Box from '../Box';
import { useVariantColorWarning } from '../hooks/useVariantColorWarning';
import useBadgeStyle from './styles';
import { BadgeProps } from './types';

/**
 * The Badge component is used for state, general text, and number labels.
 */
export const Badge = forwardRef(
    ({ variantColor = 'gray', variant = 'subtle', size, children, ...props }: BadgeProps, ref) => {
        // Wrong usage of `variantColor` prop is quite common
        // Let's add a warning hook that validates the passed variantColor
        useVariantColorWarning('Badge', variantColor);

        const badgeStyleProps = useBadgeStyle({ color: variantColor, variant, size });

        let child = children;

        // Hexagonal Badge
        if (variant === 'hexagon') {
            const hexContent = {
                position: 'absolute',
                fontSize: 'xl',
            };
            child = (
                <React.Fragment>
                    <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" width={Number(size)}>
                        <defs />
                        <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" />
                    </svg>
                    <Box {...hexContent}>{children}</Box>
                </React.Fragment>
            );
        }

        return (
            <Box ref={ref} textTransform="uppercase" {...badgeStyleProps} {...props} size={size}>
                {child}
            </Box>
        );
    }
);
