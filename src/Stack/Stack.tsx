import React, { Children, cloneElement, isValidElement } from 'react';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { StackProps } from './types';

// TODO: Reduce complexity by deprecating isInline and isReversed prop
export const Stack = ({
    direction,
    isInline = false,
    isReversed = false,
    spacing = 'spacing-xs',
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

    const stackSpacingProps = _direction === 'row' ? { mr: 'spacing' } : { mb: 'spacing' };

    return (
        <Flex align={align} justify={justify} direction={_direction} {...stackSpacingProps} {...rest}>
            {validChildrenArray.map((child, index) => {
                const isLastChild = validChildrenArray.length === index + 1;
                const spacingProps = _isInline
                    ? { [_isReversed ? 'ml' : 'mr']: isLastChild ? null : spacing }
                    : { [_isReversed ? 'mt' : 'mb']: isLastChild ? null : spacing };

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
