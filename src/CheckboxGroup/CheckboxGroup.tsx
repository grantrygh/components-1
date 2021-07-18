import { useId } from '@reach/auto-id';
import React, { Children, cloneElement, isValidElement, useRef, useState } from 'react';
import { Box } from '../Box';
import { useFormField } from '../Form';
import { FormControlWrapper } from '../FormControl';
import { CheckboxGroupProps } from './types';

export const CheckboxGroup = ({
    onChange,
    name,
    variantColor,
    size,
    defaultValue,
    isInline,
    value: valueProp,
    schema,
    children,
    ...rest
}: CheckboxGroupProps) => {
    const {
        onChange: formOnChange,
        value: initialCheckboxGroupValues,
        errors,
    } = useFormField({
        name,
        onChange,
        schema,
    });

    const [values, setValues] = useState(defaultValue || initialCheckboxGroupValues || []);
    const { current: isControlled } = useRef(valueProp != null);
    const _values = isControlled ? valueProp : values;

    const _onChange = (event, boxName) => {
        const { checked } = event.target;
        let newValues;

        if (checked) {
            newValues = [..._values, boxName];
        } else {
            newValues = _values.filter((val) => val !== boxName);
        }

        // If CheckboxGroup is passed a name, child checkbox values are contained within one array.
        if (name && formOnChange) {
            formOnChange(null, newValues);
        }
        if (!isControlled) {
            setValues(newValues);
        }
        if (onChange) {
            onChange(newValues);
        }
    };

    // If no name is passed, we'll generate a random, unique name
    const fallbackName = `checkbox-${useId()}`;
    const _name = name || fallbackName;
    let firstChildName = null;

    const clones = Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
            return null;
        }

        if (!firstChildName) {
            firstChildName = child.props.name;
        }

        const defCheckboxName = `${_name}-${index}`;

        return (
            <Box display={isInline ? 'inline-block' : 'block'}>
                {cloneElement(child, {
                    size,
                    variantColor,
                    name: child.props.name || defCheckboxName,
                    onChange: (e) => {
                        _onChange(e, child.props.name || defCheckboxName);
                        if (typeof child.props.onChange === 'function') {
                            child.props.onChange(e);
                        }
                    },
                    isChecked:
                        child.props.isChild || name
                            ? _values.includes(child.props.name || defCheckboxName)
                            : child.props.isChecked,
                    skipFormChange: !!name,
                })}
            </Box>
        );
    });

    return (
        <FormControlWrapper id={firstChildName} error={errors} {...rest}>
            {clones}
        </FormControlWrapper>
    );
};
