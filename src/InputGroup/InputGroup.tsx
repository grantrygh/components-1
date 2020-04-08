/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Children, cloneElement, isValidElement } from 'react';
import { InputLeftElement, InputRightElement } from '..';
import Box from '../Box';
import Input from '../Input';
import { useTheme } from '../ThemeProvider';
import { InputGroupProps } from './types';

export const InputGroup = ({ children, size = 'md', isInline, ...props }: InputGroupProps) => {
    const { space } = useTheme();
    let pl = null;
    let pr = null;
    const spacingProps = isInline ? { mr: 'input.spacing' } : { mb: 'input.spacing' };

    return (
        <Box display="flex" position="relative" {...spacingProps} {...props}>
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
                if (child.type === Input) {
                    return cloneElement(child, {
                        size,
                        pl: child.props.pl || pl,
                        pr: child.props.pr || pr,
                    });
                }
                return cloneElement(child, { size });
            })}
        </Box>
    );
};
