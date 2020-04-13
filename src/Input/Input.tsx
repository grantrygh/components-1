/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import { useFormField } from '../Form';
import { useFormControl } from '../FormControl';
import { PseudoBox } from '../PseudoBox';
import useInputStyle from './styles';
import { InputProps } from './types';

export const Input = forwardRef((props: InputProps, ref) => {
    const {
        size = 'md',
        variant = 'outline',
        as = 'input',
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedby,
        isReadOnly,
        isFullWidth,
        isDisabled,
        isInvalid,
        isRequired,
        ...rest
    } = props;

    const inputStyleProps = useInputStyle({
        variant,
        size,
        isFullWidth,
    });
    const formControl = useFormControl(props);
    const formField = useFormField(props);

    return (
        <PseudoBox
            ref={ref}
            as={as}
            readOnly={formControl.isReadOnly}
            aria-readonly={isReadOnly}
            disabled={formControl.isDisabled}
            aria-label={ariaLabel}
            aria-invalid={formControl.isInvalid}
            required={formControl.isRequired}
            aria-required={formControl.isRequired}
            aria-disabled={formControl.isDisabled}
            aria-describedby={ariaDescribedby}
            onChange={formField.onChange}
            value={formField.value}
            {...inputStyleProps}
            {...rest}
        />
    );
});
