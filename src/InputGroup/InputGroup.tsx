/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Children, cloneElement, isValidElement } from 'react';
import { InputLeftElement, InputRightElement } from '..';
import Box from '../Box';
import Input from '../Input';
import { InputGroupProps } from './types';

export const InputGroup = ({ children, size = 'md', ...props }: InputGroupProps) => {
    let pl = null;
    let pr = null;
    return (
        <Box display="flex" position="relative" {...props}>
            {Children.map(children, child => {
                if (!isValidElement(child)) {
                    return null;
                }

                if (child.type === InputLeftElement) {
                    pl = 'input.spacing';
                }
                if (child.type === InputRightElement) {
                    pr = 'input.spacing';
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
