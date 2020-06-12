/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Children, cloneElement, isValidElement } from 'react';
import { InputLeftElement, InputRightElement } from '..';
import { Box } from '../Box';
import { FormControlWrapper } from '../FormControl';
import { useTheme } from '../ThemeProvider';
import { InputGroupProps } from './types';

export const InputGroup = ({ children, size = 'md', name, isInline, ...props }: InputGroupProps) => {
    const { space } = useTheme();
    let pl = null;
    let pr = null;
    const spacingProps = isInline ? { mr: 'spacing' } : { mb: 'spacing' };

    return (
        <FormControlWrapper id={name} {...spacingProps} {...props}>
            <Box display="flex" position="relative">
                {Children.map(children, (child, index) => {
                    if (!isValidElement(child)) {
                        return null;
                    }

                    if (child.type === InputLeftElement) {
                        pl = `calc(${space.input[size]} + ${space['spacing-xs']})`;
                    }
                    if (child.type === InputRightElement) {
                        pr = `calc(${space.input[size]} + ${space['spacing-xs']})`;
                    }

                    const isElement = child.type === InputLeftElement || child.type === InputRightElement;

                    return cloneElement(child, {
                        size: child.props.size || size,
                        id: child.props.id || name,
                        name: child.props.name || name,
                        ...(!isElement && {
                            pl: child.props.pl || pl,
                            pr: child.props.pr || pr,
                        }),
                    });
                })}
            </Box>
        </FormControlWrapper>
    );
};
