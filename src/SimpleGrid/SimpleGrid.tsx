import React, { forwardRef } from 'react';
import { Grid } from '../Grid';
import { SimpleGridProps } from './types';
import { countToColumns, widthToColumns } from './utils';

export const SimpleGrid = forwardRef(
    ({ columns, spacingX, spacingY, spacing, minChildWidth, ...props }: SimpleGridProps, ref) => {
        const templateColumns = minChildWidth ? widthToColumns(minChildWidth) : countToColumns(columns);

        return (
            <Grid
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
