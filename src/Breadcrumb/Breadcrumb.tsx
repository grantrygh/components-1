/** @jsx jsx */
import { jsx } from '@emotion/core';
import { LinkProps } from 'Link/types';
import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { Box } from '../Box';
import { Link } from '../Link';
import { BreadcrumbProps } from './types';

const BreadcrumbSeparator = forwardRef((props: BoxProps, ref) => {
    return (
        <Box ref={ref} role="presentation" as="span" mx="input.spacing.sm" {...props}>
            {props.children}
        </Box>
    );
});

const Span = forwardRef((props, ref) => <Box ref={ref} as="span" {...props} />);

const BreadcrumbLink = forwardRef(({ isCurrentPage, ...props }: LinkProps, ref) => {
    const Comp = isCurrentPage ? Span : Link;

    return <Comp ref={ref} aria-current={isCurrentPage ? 'page' : null} {...props} />;
});

const BreadcrumbItem = ({
    isCurrentPage,
    separator,
    isLastChild,
    addSeparator,
    spacing,
    children,
    ...rest
}: BreadcrumbItemProps) => {
    const clones = Children.map(children, child => {
        if (!isValidElement(child)) {
            return null;
        }

        if (child.type === BreadcrumbLink) {
            return cloneElement(child, { isCurrentPage });
        }

        if (child.type === BreadcrumbSeparator) {
            return cloneElement(child, {
                children: child.props.children || separator,
            });
        }

        return child;
    });

    return (
        <Box display="inline-flex" alignItems="center" as="li" {...rest}>
            {clones}
            {!isLastChild && addSeparator && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
        </Box>
    );
};

const Breadcrumb = ({ children, spacing = 2, addSeparator = true, separator = '/', ...rest }: BreadcrumbProps) => {
    const clones = Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
            return null;
        }

        return cloneElement(child, {
            addSeparator,
            separator,
            spacing,
            isLastChild: Children.count(children) === index + 1,
        });
    });

    return (
        <Box as="nav" aria-label="breadcrumb" {...rest}>
            <Box as="ol">{clones}</Box>
        </Box>
    );
};

export { Breadcrumb, BreadcrumbLink, BreadcrumbItem, BreadcrumbSeparator };
