import { forwardRef, RefObject } from 'react';
import { Box } from '../Box';
import useCheckboxStyle from '../Checkbox/styles';
import { ControlBox } from '../ControlBox';
import { useFormField } from '../Form';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
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
        ref: RefObject<HTMLDivElement>
    ) => {
        const { onChange: formOnChange, value: initialSwitchValue } = useFormField({
            name,
            onChange,
        });
        const { defaultIsChecked = initialSwitchValue } = rest;

        const { label: labelStyleProps, container: containerStyleProps } = useCheckboxStyle({
            size,
        });
        const switchStyleProps = useSwitchStyle({
            size,
            color,
        });
        const height = switchStyleProps['height'];
        const rounded = switchStyleProps['rounded'] || 'full';

        const onSwitchChange = v => {
            if (onChange) {
                onChange(v);
            }
            if (formOnChange && typeof formOnChange === 'function') {
                formOnChange(v, v.target.checked);
            }
        };

        return (
            <Box as="label" {...containerStyleProps} {...rest}>
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
                    onChange={onSwitchChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    checked={isChecked}
                    disabled={isDisabled}
                />
                <ControlBox {...switchStyleProps}>
                    <Box bg="white" transition="transform 250ms" rounded={rounded} size={height} />
                </ControlBox>
                {children && <Text {...labelStyleProps}>{children}</Text>}
            </Box>
        );
    }
);
