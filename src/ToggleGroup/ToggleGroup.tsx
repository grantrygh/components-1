import { useId } from '@reach/auto-id';
import React, { Children, cloneElement, useRef, useState } from 'react';
import { Button, FormControlWrapper } from '..';
import { Box } from '../Box';
import { useFormField } from '../Form';
import useToggleGroupStyle from './styles';
import { ToggleButtonProps, ToggleGroupProps } from './types';

export const ToggleButton = React.forwardRef((props: ToggleButtonProps, ref) => {
    const { isChecked, isDisabled, isFullWidth, children, ...rest } = props;
    const { toggleButton: toggleButtonStyleProps } = useToggleGroupStyle({
        isChecked,
        isFullWidth,
    });
    return (
        <Button
            ref={ref}
            aria-checked={isChecked}
            role="radio"
            id={rest.value}
            isDisabled={isDisabled}
            {...toggleButtonStyleProps}
            {...rest}
        >
            {children}
        </Button>
    );
});

export const ToggleGroup = ({
    name,
    children,
    defaultValue,
    value: controlledValue,
    isFullWidth,
    onChange,
    isInline,
    ...rest
}: ToggleGroupProps) => {
    const fallbackName = `radio-${useId()}`;
    const _name = name || fallbackName;

    const { onChange: formOnChange, value: initialToggleValue } = useFormField({
        name: _name,
        onChange,
    });

    const isControlled = controlledValue != null;
    const [value, setValue] = useState(defaultValue || initialToggleValue || null);
    const _value = isControlled ? controlledValue : value;

    const { root: toggleGroupStyleProps } = useToggleGroupStyle({
        isFullWidth,
    });

    const allNodes = useRef([]);

    const focusableValues = Children.map(children, child =>
        child.props.isDisabled === true ? null : child.props.value
    ).filter(val => val != null);

    const allValues = Children.map(children, child => child.props.value);

    const updateIndex = (index, event) => {
        const childValue = focusableValues[index];
        const _index = allValues.indexOf(childValue);
        allNodes.current[_index].focus();

        if (!isControlled) {
            setValue(childValue);
        }
        if (onChange) {
            onChange(childValue);
        }
        if (formOnChange) {
            formOnChange(event, focusableValues[index]);
        }
    };

    const handleKeyDown = event => {
        if (event.key === 'Tab') {
            return;
        }

        // Disable page scrolling while navigating with keys
        event.preventDefault();

        const count = focusableValues.length;
        let enabledCheckedIndex = focusableValues.indexOf(_value);

        if (enabledCheckedIndex === -1) {
            enabledCheckedIndex = 0;
        }

        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowDown': {
                const nextIndex = (enabledCheckedIndex + 1) % count;
                updateIndex(nextIndex, event);
                break;
            }
            case 'ArrowLeft':
            case 'ArrowUp': {
                const nextIndex = (enabledCheckedIndex - 1 + count) % count;
                updateIndex(nextIndex, event);
                break;
            }
            default:
                break;
        }
    };

    const clones = Children.map(children, (child, index) => {
        const isFirstChild = index === 0;

        const isChecked = child.props.value === _value;

        const handleClick = e => {
            if (!isControlled) {
                setValue(child.props.value);
            }
            if (onChange) {
                onChange(child.props.value);
            }
            if (formOnChange) {
                formOnChange(e);
            }
        };

        const getTabIndex = () => {
            // If a ToggleGroup has no toggle button selected, the first enabled toggle should be focusable
            if (_value == null) {
                return isFirstChild ? 0 : -1;
            }

            return isChecked ? 0 : -1;
        };

        return cloneElement(child, {
            ref: node => {
                allNodes.current[index] = node;
            },
            name: _name,
            onClick: handleClick,
            tabIndex: getTabIndex(),
            isChecked,
            isFullWidth,
        });
    });

    const spacingProps = isInline ? { mr: 'spacing' } : { mb: 'spacing' };

    return (
        <FormControlWrapper {...spacingProps} {...rest}>
            <Box role="radiogroup" onKeyDown={handleKeyDown} {...toggleGroupStyleProps} {...rest}>
                {clones}
            </Box>
        </FormControlWrapper>
    );
};
