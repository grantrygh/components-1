/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { Children, cloneElement, isValidElement, useRef, useState } from 'react';
import Box from '../Box';
import { CheckboxGroupProps } from './types';

export const CheckboxGroup = ({
    onChange,
    name,
    variantColor,
    size,
    defaultValue,
    isInline,
    value: valueProp,
    spacing = 2,
    children,
    ...rest
}: CheckboxGroupProps) => {
    const [values, setValues] = useState(defaultValue || []);

    const { current: isControlled } = useRef(valueProp != null);
    const _values = isControlled ? valueProp : values;

    const _onChange = (event, boxName) => {
        const { checked } = event.target;
        let newValues;

        if (checked) {
            newValues = [..._values, boxName];
        } else {
            newValues = _values.filter(val => val !== boxName);
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

    const clones = Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
            return null;
        }

        const isLastCheckbox = children.length === index + 1;
        const spacingProps = isInline ? { mr: spacing } : { mb: spacing };

        const defCheckboxName = `${_name}-${index}`;

        return (
            <Box display={isInline ? 'inline-block' : 'block'} {...(!isLastCheckbox && spacingProps)}>
                {cloneElement(child, {
                    size,
                    variantColor,
                    name: child.props.name || defCheckboxName,
                    onChange: e => {
                        _onChange(e, child.props.name || defCheckboxName);
                        if (typeof child.props.onChange === 'function') {
                            child.props.onChange(e);
                        }
                    },
                    isChecked: child.props.isChecked || _values.includes(child.props.name || defCheckboxName),
                })}
            </Box>
        );
    });

    return (
        <Box role="group" {...rest}>
            {clones}
        </Box>
    );
};
