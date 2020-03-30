/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import Box from '../Box';
import ControlBox from '../ControlBox';
import VisuallyHidden from '../VisuallyHidden';
import useSwitchStyle from './styles';
import { SwitchProps } from './types';

export const Switch = forwardRef(
    (
        {
            id,
            name,
            value,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledBy,
            color,
            defaultIsChecked,
            isChecked,
            size,
            isDisabled,
            isInvalid,
            onChange,
            onBlur,
            onFocus,
            children,
            ...rest
        }: SwitchProps,
        ref
    ) => {
        const switchStyleProps = useSwitchStyle({
            size,
        });
        const height = switchStyleProps['height'];
        const rounded = switchStyleProps['rounded'] || 'full';

        return (
            <Box as="label" display="inline-block" verticalAlign="middle" {...rest}>
                <VisuallyHidden
                    as="input"
                    type="checkbox"
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
                <ControlBox {...switchStyleProps}>
                    <Box bg="white" transition="transform 250ms" rounded={rounded} size={height} />
                </ControlBox>
            </Box>
        );
    }
);
