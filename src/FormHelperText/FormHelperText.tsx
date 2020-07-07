import React, { forwardRef } from 'react';
import { useFormControl } from '../FormControl';
import { Text } from '../Text';
import useFormHelperTextStyle from './styles';
import { FormHelperTextProps } from './types';

export const FormHelperText = forwardRef((props: FormHelperTextProps, ref) => {
    const formControl = useFormControl(props);
    const formHelperTextStyleProps = useFormHelperTextStyle({});

    return (
        <Text
            kind="small"
            state="faint"
            ref={ref}
            id={formControl.id ? `${formControl.id}-help-text` : null}
            {...formHelperTextStyleProps}
            {...props}
        />
    );
});
