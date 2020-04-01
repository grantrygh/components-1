/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import { VisuallyHidden } from '..';
import Box from '../Box';
import useCheckboxStyle from '../Checkbox/styles';
import ControlBox from '../ControlBox';
import { useVariantColorWarning } from '../utils';
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

        const styleProps = useCheckboxStyle({
            color: variantColor,
            size,
            type: 'radio',
        });

        return (
            <Box
                as="label"
                display="inline-flex"
                verticalAlign="top"
                htmlFor={id}
                alignItems="center"
                width={isFullWidth ? 'full' : undefined}
                cursor={isDisabled ? 'not-allowed' : 'pointer'}
                {...rest}
            >
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
                <ControlBox {...styleProps} type="radio" rounded="full">
                    <Box bg="currentColor" as="span" rounded="full" size="50%" />
                </ControlBox>
                {children && (
                    <Box ml={2} fontSize={size} userSelect="none" color={isDisabled && 'disabled'}>
                        {children}
                    </Box>
                )}
            </Box>
        );
    }
);
