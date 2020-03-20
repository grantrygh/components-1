/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import { Box } from '../Box';
import { useVariantColorWarning } from '../utils';
import useBadgeStyle from './styles';

const Badge = forwardRef(({ variantColor = 'gray', variant = 'subtle', ...props }, ref) => {
    // Wrong usage of `variantColor` prop is quite common
    // Let's add a warning hook that validates the passed variantColor
    useVariantColorWarning('Badge', variantColor);

    const badgeStyleProps = useBadgeStyle({ color: variantColor, variant });

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
        />
    );
});

Badge.displayName = 'Badge';

export default Badge;
