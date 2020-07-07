import React from 'react';
import { FormContext } from './context';
import { FormProps } from './types';

/** Keep track of form fields and generate validation schema from fields */
const useFormFields = () => {
    const [fields, setFields] = React.useState({});

    /**
     * Register a form field
     * saves it in fields state to allow using asynchronously
     */
    const registerField = React.useCallback(props => {
        setFields($fields => ({ ...$fields, [props.name]: props }));
    }, []);

    return {
        fields,
        registerField,
    };
};

export function Form(props: FormProps) {
    const { onSubmit, initialValue = {}, onChange: onFormChange, ...rest } = props;
    const [value, setValue] = React.useState(initialValue);

    const { fields, registerField } = useFormFields();

    const onChange = React.useCallback(data => {
        // supports a single {name: value} or an array of {name: value} pairs
        const { name, value: changeValue } = data;
        if (Array.isArray(data)) {
            const newValues = {};
            data.forEach(item => {
                newValues[item.name] = item.value;
            });
            setValue(val => ({ ...val, ...newValues }));
        } else {
            setValue(val => ({ ...val, [name]: changeValue }));
        }
        if (onFormChange) {
            onFormChange(data);
        }
    }, []);

    const getFormValue = () => value;
    const getFieldValue = name => value[name] || '';
    const clearForm = () => setValue(initialValue);

    const formOnSubmit = React.useCallback(
        e => {
            onSubmit(e, { getFormValue });
        },
        [value]
    );

    return (
        <FormContext.Provider value={{ fields, registerField, getFormValue, getFieldValue, onChange, clearForm }}>
            <form onSubmit={formOnSubmit} {...rest}>
                {props.children}
            </form>
        </FormContext.Provider>
    );
}
