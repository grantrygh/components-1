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
    const spacingProps = isInline ? { mr: 'input.spacing.lg' } : { mb: 'input.spacing.lg' };

    return (
        <FormControlWrapper id={name} {...spacingProps} {...props}>
            <Box display="flex" position="relative">
                {Children.map(children, (child, index) => {
                    if (!isValidElement(child)) {
                        return null;
                    }

                    if (child.type === InputLeftElement) {
                        pl = `calc(${space.input[size]} + ${space.input['spacing']})`;
                    }
                    if (child.type === InputRightElement) {
                        pr = `calc(${space.input[size]} + ${space.input['spacing']})`;
                    }
                    return cloneElement(child, {
                        size: child.props.size || size,
                        pl: child.props.pl || pl,
                        pr: child.props.pr || pr,
                        id: child.props.id || name,
                        name: child.props.name || name,
                    });
                })}
            </Box>
        </FormControlWrapper>
    );
};
