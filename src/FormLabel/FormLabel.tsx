/**
 * FormLabel is used for form inputs and controls.
 * It reads from the `FormControl` context to handle it's styles for
 * the various form states.
 */

import React, { forwardRef } from 'react';
import Box from '../Box';
import { useFormControl } from '../FormControl';
import useFormLabelStyle from './styles';
import { FormLabelProps } from './types';

export const RequiredIndicator = props => {
    const { requiredIndicator: requiredIndicatorStyleProps } = useFormLabelStyle({});
    return (
        <Box as="span" aria-hidden="true" {...requiredIndicatorStyleProps} {...props}>
            *
        </Box>
    );
};

export const FormLabel = forwardRef(({ children, ...props }: FormLabelProps, ref) => {
    const formControl = useFormControl(props);

    const { root: formLabelStyleProps } = useFormLabelStyle({
        isDisabled: formControl.isDisabled,
    });
    return (
        <Box ref={ref} verticalAlign="middle" display="inline-block" as="label" {...formLabelStyleProps} {...props}>
            {children}
            {formControl.isRequired && <RequiredIndicator />}
        </Box>
    );
});
