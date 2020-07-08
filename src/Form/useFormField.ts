import React from 'react';
import { FormContext } from './context';

export function useFormField(props) {
    const { getFieldValue, onChange, context, clearForm } = React.useContext(FormContext);

    const $onChange = React.useCallback(
        (e, value = null) => {
            if (onChange) {
                if (value || typeof value === 'boolean') {
                    onChange({
                        value,
                        name: props.name,
                    });
                } else {
                    onChange({
                        // support e for NumberInput (direct value)
                        value: e && e.target && e.target.value,
                        name: props.name,
                    });
                }
            }
        },
        [props.name]
    );

    return {
        clearForm,
        context,
        onChange: $onChange,
        value: getFieldValue && getFieldValue(props.name),
    };
}
