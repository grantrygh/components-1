/** @jsx jsx */
import { jsx } from '@emotion/core';
import useBadgeStyle from '../Badge/styles';
import Box from '../Box';
import { useVariantColorWarning } from '../utils';
import { CodeProps } from './types';

export const Code = ({ variantColor = 'gray', ...props }: CodeProps) => {
    useVariantColorWarning('Code', variantColor);
    const badgeStyle = useBadgeStyle({ variant: 'subtle', color: variantColor });

    return (
        <Box
            as="code"
            display="inline-block"
            fontFamily="mono"
            fontSize="sm"
            px="0.2em"
            rounded="sm"
            {...badgeStyle}
            {...props}
        />
    );
};
