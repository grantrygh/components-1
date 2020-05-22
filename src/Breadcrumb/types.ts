import * as React from 'react';
import * as StyledSystem from 'styled-system';
import { BoxProps } from '../Box/types';

interface IBreadcrumb {
    children?: React.ReactNode;
    /**
     * The visual separator between each breadcrumb item
     */
    separator?: string | React.ReactNode;
    /**
     * If `true`, the breadcrumb will add the separator automatically
     */
    addSeparator?: boolean;
    /**
     * The left and right margin applied to the separator
     */
    spacing?: StyledSystem.MarginProps['margin'];
}

export type BreadcrumbProps = BoxProps & IBreadcrumb;

export type BreadcrumbItemProps = BreadcrumbProps & {
    /**
     * If `true`, indicates that the breadcrumb item is active, adds
     * `aria-current=page` and renders a `span`
     */
    isCurrentPage?: boolean;
    isLastChild?: boolean;
};
