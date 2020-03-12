import React from 'react';
import { FormContext } from './context';

export function useFormField(props) {
    const { getFieldValue, onChange } = React.useContext(FormContext);

    const $onChange = React.useCallback(
        e => {
            onChange({
                value: e.target.value,
                name: props.name,
            });
        },
        [props.name]
    );

    return {
        onChange: $onChange,
        value: getFieldValue(props.name),
    };
}
