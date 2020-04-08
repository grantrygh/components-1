/** @jsx jsx */
import { jsx } from '@emotion/core';
import CheckBoldIcon from 'mdi-react/CheckBoldIcon';
import MinusIcon from 'mdi-react/MinusIcon';
import { forwardRef, useEffect, useRef } from 'react';
import Box from '../Box';
import ControlBox from '../ControlBox';
import { useFormField } from '../Form';
import { useForkRef } from '../hooks/useForkRef';
import { useVariantColorWarning } from '../hooks/useVariantColorWarning';
import VisuallyHidden from '../VisuallyHidden';
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
            isChecked,
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

        const { root: rootStyleProps, label: labelStyleProps, container: containerStyleProps } = useCheckboxStyle({
            color: variantColor,
            size,
            isDisabled,
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

        const defChecked = defaultIsChecked ? undefined : isChecked;
        const checkedState = isReadOnly ? Boolean(isChecked) : defChecked;

        // Form control
        const { onChange: formOnChange } = useFormField({
            name,
            onChange,
        });
        useEffect(() => {
            if (formOnChange && typeof formOnChange === 'function') {
                formOnChange({ value: checkedState || isIndeterminate });
            }
        }, [checkedState]);

        const IconTag = isIndeterminate ? MinusIcon : CheckBoldIcon;

        return (
            <Box as="label" {...containerStyleProps} {...rest}>
                <VisuallyHidden
                    as="input"
                    type="checkbox"
                    aria-label={ariaLabel}
                    id={id}
                    ref={_ref}
                    name={name}
                    value={value}
                    onChange={isReadOnly ? undefined : onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    defaultChecked={isReadOnly ? undefined : defaultIsChecked}
                    checked={checkedState}
                    disabled={isDisabled}
                    readOnly={isReadOnly}
                    aria-readonly={isReadOnly}
                    aria-invalid={isInvalid}
                    aria-checked={isIndeterminate ? 'mixed' : isChecked}
                />
                <ControlBox opacity={isReadOnly ? 0.8 : 1} {...rootStyleProps}>
                    <IconTag size={iconSize} color={iconColor} />
                </ControlBox>
                {children && <Box {...labelStyleProps}>{children}</Box>}
            </Box>
        );
    }
);
