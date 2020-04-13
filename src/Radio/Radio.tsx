/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import { VisuallyHidden } from '..';
import { Box } from '../Box';
import useCheckboxStyle from '../Checkbox/styles';
import { ControlBox } from '../ControlBox';
import { useVariantColorWarning } from '../hooks/useVariantColorWarning';
import { RadioProps } from './types';

export const Radio = forwardRef(
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
            size = 'md',
            isDisabled,
            isInvalid,
            onChange,
            onBlur,
            onFocus,
            children,
            ...rest
        }: RadioProps,
        ref
    ) => {
        // Wrong usage of `variantColor` prop is quite common
        // Let's add a warning hook that validates the passed variantColor
        useVariantColorWarning('Radio', variantColor);

        const { root: rootStyleProps, label: labelStyleProps, container: containerStyleProps } = useCheckboxStyle({
            color: variantColor,
            size,
            type: 'radio',
        });

        return (
            <Box as="label" htmlFor={id} {...containerStyleProps} {...rest}>
                <VisuallyHidden
                    as="input"
                    type="radio"
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledBy}
                    id={id}
                    ref={ref}
                    name={name}
                    value={value}
                    aria-invalid={isInvalid}
                    defaultChecked={defaultIsChecked}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    checked={isChecked}
                    disabled={isDisabled}
                />
                <ControlBox {...rootStyleProps} type="radio" rounded="full">
                    <Box bg="currentColor" as="span" rounded="full" size="50%" />
                </ControlBox>
                {children && <Box {...labelStyleProps}>{children}</Box>}
            </Box>
        );
    }
);
