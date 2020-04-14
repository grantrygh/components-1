/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    RefObject,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { Box } from '../Box';
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
            value: valueProp,
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

        const { onChange: formOnChange, value: initialRadioValue } = useFormField({
            name: _name,
            onChange,
        });

        const rootRef: RefObject<any> = useRef();

        const _onChange = event => {
            if (!isControlled) {
                setValue(event.target.value);
            }

            if (onChange) {
                onChange(event, event.target.value);
            }

            if (formOnChange && typeof formOnChange === 'function') {
                formOnChange(event);
            }
        };

        const clones = Children.map(children, (child, index) => {
            if (!isValidElement(child)) {
                return null;
            }

            const isLastRadio = children.length === index + 1;
            const spacingProps = isInline ? { mr: 'input.spacing.lg' } : { mb: 'input.spacing.sm' };
            const isChecked = child.props.value === _value ? true : undefined;

            return (
                <Box display={isInline ? 'inline-block' : 'block'} {...(!isLastRadio && spacingProps)}>
                    {cloneElement(child, {
                        size: child.props.size || size,
                        variantColor: child.props.variantColor || variantColor,
                        name: _name,
                        onChange: _onChange,
                        isChecked,
                        // set undefined to avoid having values for both isChecked and defaultIsChecked
                        defaultIsChecked: !isChecked ? child.props.value === initialRadioValue : undefined,
                    })}
                </Box>
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

        const spacingProps = isInline ? { mr: 'input.spacing.lg' } : { mb: 'input.spacing.lg' };

        return (
            <FormControlWrapper {...rest} {...spacingProps}>
                <Box ref={rootRef} role="radiogroup" {...rest}>
                    {clones}
                </Box>
            </FormControlWrapper>
        );
    }
);
