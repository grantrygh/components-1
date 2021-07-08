import CheckBoldIcon from 'mdi-react/CheckBoldIcon';
import MinusIcon from 'mdi-react/MinusIcon';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Box } from '../Box';
import { ControlBox } from '../ControlBox';
import { useFormField } from '../Form';
import { useForkRef } from '../hooks/useForkRef';
import { useVariantColorWarning } from '../hooks/useVariantColorWarning';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import useCheckboxStyle from './styles';
import { CheckboxProps } from './types';

export const Checkbox = forwardRef(
    (
        {
            id,
            name,
            value,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledBy,
            variantColor = 'primary',
            defaultIsChecked,
            isFullWidth,
            isChild,
            size = 'md',
            isDisabled,
            isInvalid,
            isReadOnly,
            onChange,
            onBlur,
            onFocus,
            isIndeterminate,
            renderCustomControl,
            skipFormChange,
            children,
            iconColor,
            iconSize = '12px',
            ...rest
        }: CheckboxProps,
        ref
    ) => {
        // Wrong usage of `variantColor` prop is quite common
        // Let's add a warning hook that validates the passed variantColor
        useVariantColorWarning('Checkbox', variantColor);

        const {
            onChange: formOnChange,
            value: initialCheckboxValue,
            disabled,
        } = useFormField({
            name,
            onChange,
        });
        const { isChecked = initialCheckboxValue } = rest;

        const {
            root: rootStyleProps,
            label: labelStyleProps,
            container: containerStyleProps,
        } = useCheckboxStyle({
            color: variantColor,
            size,
            isDisabled: disabled,
            isFullWidth,
            isChild,
        });

        const ownRef = useRef();
        const _ref: any = useForkRef(ownRef, ref);

        useEffect(() => {
            if (_ref.current) {
                _ref.current.indeterminate = Boolean(isIndeterminate);
            }
        }, [isIndeterminate, _ref]);

        const onSwitchChange = (v) => {
            if (!skipFormChange && formOnChange && typeof formOnChange === 'function') {
                formOnChange(v, v.target.checked);
            }
            if (onChange) {
                onChange(v);
            }
        };

        const IconTag = isIndeterminate ? MinusIcon : CheckBoldIcon;

        return (
            <Box as="label" {...containerStyleProps} {...rest}>
                <VisuallyHidden
                    as="input"
                    type="checkbox"
                    aria-label={ariaLabel}
                    id={name}
                    ref={_ref}
                    name={name}
                    value={value}
                    onChange={isReadOnly ? undefined : onSwitchChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    defaultChecked={isReadOnly ? undefined : defaultIsChecked}
                    checked={isChecked}
                    disabled={disabled ? true : isDisabled}
                    readOnly={isReadOnly}
                    aria-readonly={isReadOnly}
                    aria-invalid={isInvalid}
                    aria-checked={isIndeterminate ? 'mixed' : isChecked}
                />
                {renderCustomControl ? (
                    renderCustomControl({ isChecked, ...rootStyleProps })
                ) : (
                    <ControlBox opacity={isReadOnly ? 0.8 : 1} {...rootStyleProps}>
                        <IconTag size={iconSize} color={iconColor} />
                    </ControlBox>
                )}
                {children && <Text {...labelStyleProps}>{children}</Text>}
            </Box>
        );
    }
);
