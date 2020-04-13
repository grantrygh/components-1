/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Children, cloneElement, isValidElement } from 'react';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, InputLeftElement, InputRightElement } from '..';
import { Box } from '../Box';
import { Input } from '../Input';
import { useTheme } from '../ThemeProvider';
import { InputGroupProps } from './types';

export const InputGroup = ({
    children,
    size = 'md',
    isInline,
    id,
    label,
    isInvalid,
    isRequired,
    error,
    helperText,
    ...props
}: InputGroupProps) => {
    const { space } = useTheme();
    let pl = null;
    let pr = null;
    const spacingProps = isInline ? { mr: 'input.spacing.lg' } : { mb: 'input.spacing.lg' };

    return (
        <FormControl isInvalid={isInvalid} isRequired={isRequired} {...spacingProps}>
            {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
            <Box display="flex" position="relative" {...props}>
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
                            size: child.props.size || size,
                            id,
                            pl: child.props.pl || pl,
                            pr: child.props.pr || pr,
                        });
                    }
                    return cloneElement(child, { size: child.props.size || size });
                })}
            </Box>
            {helperText && <FormHelperText id={`${id}-help`}>{helperText}</FormHelperText>}
            {error && <FormErrorMessage id={`${id}-error`}>{error}</FormErrorMessage>}
        </FormControl>
    );
};
