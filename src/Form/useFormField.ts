import React, { useEffect } from 'react';
import { FormContext } from './context';
import { validate } from './formValidation';

export function useFormField(props) {
    const { getFieldValue, onChange, registerField, getFormFieldError, fields, deleteFormFieldError, formDisabled } =
        React.useContext(FormContext);

    const errors = getFormFieldError && getFormFieldError(props.name);

    const onValidate = ({ isValid: isSubmitValid }) => {
        if (isSubmitValid && typeof deleteFormFieldError === 'function') {
            deleteFormFieldError(props.name);
        }
    };

    // Register the form field into Form Validator
    useEffect(() => {
        if (props.schema) {
            registerField(props);
        }
    }, [props.schema]);

    const $onChange = React.useCallback(
        (e, value = null) => {
            if (onChange) {
                const newValue = value || typeof value === 'boolean' ? value : e && e.target && e.target.value;
                onChange({
                    value: newValue,
                    name: props.name,
                });
                const formValue = {
                    [props.name]: newValue,
                };
                // setTimeout((): void => {
                // need to run validation *after* the update from field change
                // since that can potentially change schema
                // if anyone has better ideas i'm all ears - tushar
                validate(formValue, fields, onValidate);
                // }, 0);
            }
        },
        [props.name, errors]
    );

    return {
        onChange: $onChange,
        value: getFieldValue && getFieldValue(props.name),
        errors,
        disabled: formDisabled,
    };
}
