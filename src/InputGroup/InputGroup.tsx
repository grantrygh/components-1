import React, { Children, cloneElement, isValidElement } from 'react';
import { Box } from '../Box';
import { useFormField } from '../Form';
import { FormControlWrapper } from '../FormControl';
import { InputLeftElement, InputRightElement } from '../InputElement';
import { useTheme } from '../ThemeProvider';
import useInputGroupStyle from './styles';
import { InputGroupProps } from './types';

export const InputGroup = ({
    isFullWidth,
    children,
    size = 'md',
    name,
    isInline,
    schema,
    ...props
}: InputGroupProps) => {
    const { space } = useTheme();
    let pl = null;
    let pr = null;
    const spacingProps = isInline ? { mr: 'spacing' } : { mb: 'spacing' };
    const inputGroupStyle = useInputGroupStyle({ isFullWidth });

    const { errors, disabled } = useFormField({
        name,
        schema,
    });

    return (
        <FormControlWrapper id={name} error={errors} {...spacingProps} {...inputGroupStyle} {...props}>
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
                        disabled,
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
