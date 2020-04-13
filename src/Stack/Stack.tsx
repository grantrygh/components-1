/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Children, cloneElement, isValidElement } from 'react';
import { Box } from '../Box';
import Flex from '../Flex';
import { StackProps } from './types';

// TODO: Reduce complexity by deprecating isInline and isReversed prop
export const Stack = ({
    direction,
    isInline = false,
    isReversed = false,
    children,
    align,
    justify,
    shouldWrapChildren,
    ...rest
}: StackProps) => {
    const _isReversed = isReversed || (direction && direction.toString().endsWith('reverse'));
    const _isInline = isInline || (direction && direction.toString().startsWith('row'));
    let _direction;

    if (_isInline) {
        _direction = 'row';
    }

    if (_isReversed) {
        _direction = isInline ? 'row-reverse' : 'column-reverse';
    }

    if (direction) {
        _direction = direction;
    }

    if (!_isInline && !_isReversed && !direction) {
        _direction = 'column';
    }

    const validChildrenArray = Children.toArray(children).filter(isValidElement);

    return (
        <Flex align={align} justify={justify} direction={_direction} {...rest}>
            {validChildrenArray.map((child, index) => {
                const isLastChild = validChildrenArray.length === index + 1;
                const spacingProps = _isInline
                    ? { [_isReversed ? 'ml' : 'mr']: isLastChild ? null : 'input.spacing.sm' }
                    : { [_isReversed ? 'mt' : 'mb']: isLastChild ? null : 'input.spacing.sm' };

                if (shouldWrapChildren) {
                    return (
                        <Box d="inline-block" {...spacingProps} key={`stack-box-wrapper-${index}`}>
                            {child}
                        </Box>
                    );
                }
                return cloneElement(child, spacingProps);
            })}
        </Flex>
    );
};
