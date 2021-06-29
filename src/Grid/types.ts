import * as React from 'react';
import { GridProps as SSGridProps, ResponsiveValue } from 'styled-system';
import { BoxProps } from '../Box/types';

type IGrid = {
    /**
     * The width at which child elements will break into columns. Pass a number for pixel values or a string for any other valid CSS length.
     */
    minChildWidth?: ResponsiveValue<React.CSSProperties['minWidth']>;
    /**
     * The number of columns
     */
    columns?: ResponsiveValue<number>;
    /**
     * The gap between the grid items
     */
    spacing?: SSGridProps['gridGap'];
    /**
     * The column gap between the grid items
     */
    spacingX?: SSGridProps['gridGap'];
    /**
     * The row gap between the grid items
     */
    spacingY?: SSGridProps['gridGap'];
};

export type GridProps = BoxProps & IGrid;
