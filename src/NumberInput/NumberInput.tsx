import MenuDownIcon from 'mdi-react/MenuDownIcon';
import MenuUpIcon from 'mdi-react/MenuUpIcon';
import React, { createContext, forwardRef, useContext } from 'react';
import { Flex } from '../Flex';
import { useForkRef } from '../hooks/useForkRef';
import { useNumberInput } from '../hooks/useNumberInput';
import { Input } from '../Input';
import { PseudoBox } from '../PseudoBox';
import { wrapEvent } from '../utils/wrapEvent';
import useNumberInputStyle from './styles';
import {
    NumberDecrementStepperProps,
    NumberIncrementStepperProps,
    NumberInputContextProps,
    NumberInputFieldProps,
    NumberInputProps,
    NumberInputStepperProps,
} from './types';

const NumberInputContext = createContext<NumberInputContextProps>({});
const useNumberInputContext = () => {
    const context = useContext(NumberInputContext);
    if (context == null) {
        throw new Error('This component must be used within the `NumberInput` ');
    }
    return context;
};

const NumberInput = forwardRef(
    (
        {
            value,
            onChange,
            defaultValue,
            focusInputOnChange,
            clampValueOnBlur,
            keepWithinRange,
            min,
            max,
            step,
            precision,
            getAriaValueText,
            isReadOnly,
            isInvalid,
            isDisabled,
            isFullWidth,
            size = 'md',
            children,
            ...rest
        }: NumberInputProps,
        ref
    ) => {
        const context = useNumberInput({
            value,
            onChange,
            defaultValue,
            focusInputOnChange,
            clampValueOnBlur,
            keepWithinRange,
            min,
            max,
            step,
            precision,
            getAriaValueText,
            isReadOnly,
            isInvalid,
            isDisabled,
        });
        const _children = children || (
            <>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </>
        );
        return (
            <NumberInputContext.Provider value={{ ...context, size }}>
                <Flex ref={ref} align="stretch" w={isFullWidth ? 'full' : null} pos="relative" {...rest}>
                    {_children}
                </Flex>
            </NumberInputContext.Provider>
        );
    }
);

const NumberInputField = forwardRef(
    ({ onBlur, onFocus, onKeyDown, onChange, ...props }: NumberInputFieldProps, ref) => {
        const {
            size,
            input: {
                ref: _ref,
                onBlur: _onBlur,
                onFocus: _onFocus,
                onChange: _onChange,
                onKeyDown: _onKeyDown,
                disabled: isDisabled,
                readOnly: isReadOnly,
                ...otherInputProps
            },
        } = useNumberInputContext();

        const inputRef = useForkRef(_ref, ref);
        const handleBlur = wrapEvent(onBlur, _onBlur);
        const handleFocus = wrapEvent(onFocus, _onFocus);
        const handleKeyDown = wrapEvent(onKeyDown, _onKeyDown);
        const handleChange = wrapEvent(onChange, _onChange);

        return (
            <Input
                ref={inputRef}
                isReadOnly={isReadOnly}
                isDisabled={isDisabled}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                size={size}
                {...otherInputProps}
                {...props}
            />
        );
    }
);

const NumberInputStepper = forwardRef((props: NumberInputStepperProps, ref) => {
    const { inputStepper: numberInputStepperStyleProps } = useNumberInputStyle({});
    return <Flex ref={ref} aria-hidden {...numberInputStepperStyleProps} {...props} />;
});

const StepperButton = forwardRef((props, ref) => {
    const { isDisabled, size } = useNumberInputContext();

    const { root: stepperButtonStyleProps } = useNumberInputStyle({
        size,
        isDisabled,
    });

    return <PseudoBox ref={ref} role="button" aria-disabled={isDisabled} {...stepperButtonStyleProps} {...props} />;
});

const NumberIncrementStepper = forwardRef((props: NumberIncrementStepperProps, ref) => {
    const { incrementStepper } = useNumberInputContext();
    const children = props.children || <MenuUpIcon size="0.75em" />;

    return (
        <StepperButton ref={ref} {...props} {...incrementStepper}>
            {children}
        </StepperButton>
    );
});

const NumberDecrementStepper = forwardRef((props: NumberDecrementStepperProps, ref) => {
    const { decrementStepper } = useNumberInputContext();
    const children = props.children || <MenuDownIcon size="0.75em" />;
    return (
        <StepperButton ref={ref} {...props} {...decrementStepper}>
            {children}
        </StepperButton>
    );
});

export { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper };
