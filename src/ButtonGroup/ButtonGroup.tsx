/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Children, cloneElement, isValidElement } from 'react';
import Box from '../Box';
import { ButtonGroupProps } from './types';

export const ButtonGroup = ({
    size,
    variantColor = 'primary',
    variant,
    isAttached,
    spacing = 2,
    children,
    ...rest
}: ButtonGroupProps) => {
    const clones = Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
            return null;
        }

        const isFirst = index === 0;
        const isLast = index === Children.count(children) - 1;

        return cloneElement(child, {
            size: size || child.props.size,
            variantColor: child.props.variantColor || variantColor,
            variant: child.props.variant || variant,
            _focus: { boxShadow: 'outline', zIndex: 1 },

            ...(!isLast && !isAttached && { mr: spacing }),
            ...(isFirst && isAttached && { roundedRight: 0 }),
            ...(isLast && isAttached && { roundedLeft: 0 }),
            ...(!isLast && isAttached && { borderRight: 0 }),
            ...(!isFirst && !isLast && isAttached && { rounded: 0 }),
        });
    });

    return (
        <Box display="inline-block" {...rest}>
            {clones}
        </Box>
    );
};
