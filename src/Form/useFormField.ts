import React from 'react';
import { FormContext } from './context';

export function useFormField(props) {
    const { getFieldValue, onChange } = React.useContext(FormContext);

    const $onChange = React.useCallback(
        e => {
            if (onChange) {
                onChange({
                    // support e.value to handle Select, and array constructor for isMulti Select, e for NumberInput
                    value:
                        (e.target && e.target.value) ||
                        e.value ||
                        (e.constructor === Array && e.map(v => v.value)) ||
                        e,
                    name: props.name,
                });
            }
        },
        [props.name]
    );

    return {
        onChange: $onChange,
        value: getFieldValue && getFieldValue(props.name),
    };
}
