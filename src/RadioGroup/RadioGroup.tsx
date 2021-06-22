import { useId } from '@reach/auto-id';
import React, {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    RefObject,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { useFormField } from '../Form';
import { FormControlWrapper } from '../FormControl';
import { RadioGroupProps } from './types';

export const RadioGroup = forwardRef(
    (
        {
            onChange,
            name,
            variantColor,
            size,
            defaultValue,
            isInline,
            skipFormChange,
            value: valueProp,
            schema,
            content,
            children,
            ...rest
        }: RadioGroupProps,
        ref
    ) => {
        const { current: isControlled } = useRef(valueProp != null);
        const [value, setValue] = useState(defaultValue || null);
        const _value = isControlled ? valueProp : value;

        // If no name is passed, we'll generate a random, unique name
        const fallbackName = `radio-${useId()}`;
        const _name = name || fallbackName;

        const { onChange: formOnChange, value: initialRadioValue, errors } = useFormField({
            name: _name,
            onChange,
            schema,
        });

        const rootRef: RefObject<any> = useRef();

        const _onChange = (event) => {
            if (!isControlled) {
                setValue(event.target.value);
            }

            if (onChange) {
                onChange(event, event.target.value);
            }

            if (formOnChange && typeof formOnChange === 'function' && !skipFormChange) {
                formOnChange(event);
            }
        };

        const clones = Children.map(children, (child, index) => {
            if (!isValidElement(child)) {
                return null;
            }
            const isChecked = child.props.value === _value ? true : undefined;

            return (
                <>
                    {cloneElement(child, {
                        size: child.props.size || size,
                        variantColor: child.props.variantColor || variantColor,
                        name: _name,
                        onChange: _onChange,
                        isChecked,
                        // set undefined to avoid having values for both isChecked and defaultIsChecked
                        defaultIsChecked: !isChecked ? child.props.value === initialRadioValue : undefined,
                    })}
                    {content && content[index]}
                </>
            );
        });

        // Calling focus() on the radiogroup should focus on the selected option or first enabled option
        useImperativeHandle(
            ref,
            () => ({
                focus: () => {
                    let input = rootRef.current.querySelector('input:not(:disabled):checked');

                    if (!input) {
                        input = rootRef.current.querySelector('input:not(:disabled)');
                    }

                    if (input) {
                        input.focus();
                    }
                },
            }),
            []
        );

        return (
            <FormControlWrapper id={name} error={errors} ref={rootRef} role="radiogroup" {...rest}>
                {clones}
            </FormControlWrapper>
        );
    }
);
