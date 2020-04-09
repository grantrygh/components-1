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
    const { onSubmit } = props;
    const [value, setValue] = React.useState({});

    const { fields, registerField } = useFormFields();

    const onChange = React.useCallback(({ name, value: changeValue }) => {
        setValue(val => ({ ...val, [name]: changeValue }));
    }, []);

    const getFormValue = () => value;
    const getFieldValue = name => value[name] || '';

    const formOnSubmit = React.useCallback(
        e => {
            onSubmit(e, { getFormValue });
        },
        [value]
    );

    return (
        <FormContext.Provider value={{ fields, registerField, getFormValue, getFieldValue, onChange }}>
            <form onSubmit={formOnSubmit}>{props.children}</form>
        </FormContext.Provider>
    );
}
