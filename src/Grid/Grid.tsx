import React, { forwardRef } from 'react';
import { FullGrid } from '../FullGrid';
import { GridProps } from './types';
import { countToColumns, widthToColumns } from './utils';

export const Grid = forwardRef(
    (
        {
            columns,
            spacingX = 'spacing',
            spacingY = 'spacing',
            spacing = 'spacing',
            minChildWidth,
            ...props
        }: GridProps,
        ref
    ) => {
        const templateColumns = minChildWidth ? widthToColumns(minChildWidth) : countToColumns(columns);

        return (
            <FullGrid
                ref={ref}
                gap={spacing}
                columnGap={spacingX}
                rowGap={spacingY}
                templateColumns={templateColumns}
                {...props}
            />
        );
    }
);
