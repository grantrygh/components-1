import React, { forwardRef } from 'react';
import { Box } from '../Box';
import { FullGridProps } from './types';

export const FullGrid = forwardRef(
    (
        {
            gap,
            rowGap,
            columnGap,
            autoFlow,
            autoRows,
            autoColumns,
            templateRows,
            templateColumns,
            templateAreas,
            area,
            column,
            row,
            ...props
        }: FullGridProps,
        ref: any
    ) => (
        <Box
            ref={ref}
            display="grid"
            gridArea={area}
            gridTemplateAreas={templateAreas}
            gridGap={gap}
            gridRowGap={rowGap}
            gridColumnGap={columnGap}
            gridAutoColumns={autoColumns}
            gridColumn={column}
            gridRow={row}
            gridAutoFlow={autoFlow}
            gridAutoRows={autoRows}
            gridTemplateRows={templateRows}
            gridTemplateColumns={templateColumns}
            {...props}
        />
    )
);
