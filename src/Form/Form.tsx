import React, { useCallback, useEffect, useState } from 'react';
import { FormContext } from './context';
import { validate } from './formValidation';
import { FormProps } from './types';

/** Keep track of form fields and generate validation schema from fields */
const useFormFieldsValidator = () => {
    const [fields, setFields] = React.useState({});

    /**
     * Register a form field
     * saves it in fields state to allow using asynchronously
     */
    const registerField = React.useCallback((props) => {
        setFields(($fields) => ({ ...$fields, [props.name]: props.schema }));
    }, []);

    return {
        fields,
        registerField,
    };
};

export function Form(props: FormProps) {
    const { onSubmit, initialValue = {}, onChange: onFormChange, disabled, ...rest } = props;

    const { fields, registerField } = useFormFieldsValidator();

    const [value, setValue] = useState(initialValue);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (props.errors !== errors) {
            setErrors({
                ...errors,
                ...props.errors,
            });
        }
    }, [props.errors]);

    const getFormValue = () => value;
    const getFieldValue = (name) => value[name] || '';
    const clearForm = () => setValue(initialValue);
    const getFormFieldError = (name) => (errors ? errors[name] : null);
    const deleteFormFieldError = (name) => {
        if (errors && errors[name]) {
            setErrors((prevErrors) => {
                const updated = prevErrors;
                delete updated[name];
                return updated;
            });
        }
    };

    const onChange = useCallback((data) => {
        // supports a single {name: value} or an array of {name: value} pairs
        const { name, value: changeValue } = data;

        if (Array.isArray(data)) {
            const newValues = {};
            data.forEach((item) => {
                newValues[item.name] = item.value;
            });
            setValue((val) => ({ ...val, ...newValues }));
        } else {
            setValue((val) => ({ ...val, [name]: changeValue }));
        }
        if (onFormChange) {
            onFormChange(data);
        }
    }, []);

    const formOnSubmit = React.useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            e.stopPropagation();

            const onValidate = ({ isValid: isSubmitValid, errors: submitErrors }) => {
                if (isSubmitValid) {
                    if (onSubmit) {
                        onSubmit(e, { getFormValue, clearForm });
                    }
                } else {
                    setErrors(submitErrors);
                }
            };

            await validate(value, fields, onValidate);
        },
        [value, fields]
    );

    return (
        <FormContext.Provider
            value={{
                fields,
                registerField,
                getFormValue,
                getFieldValue,
                onChange,
                clearForm,
                getFormFieldError,
                deleteFormFieldError,
                formDisabled: disabled,
            }}
        >
            <form onSubmit={formOnSubmit} noValidate {...rest}>
                {props.children}
            </form>
        </FormContext.Provider>
    );
}
