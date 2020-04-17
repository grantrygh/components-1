/** @jsx jsx */
import { jsx } from '@emotion/core';
import WarningIcon from 'mdi-react/WarningIcon';
import { forwardRef } from 'react';
import { Flex } from '../Flex';
import { useFormControl } from '../FormControl';
import { Text } from '../Text';
import useFormErrorMessageStyle from './styles';
import { FormErrorMessageProps } from './types';

export const FormErrorMessage = forwardRef(({ children, Icon, ...props }: FormErrorMessageProps, ref) => {
    const formControl = useFormControl(props);

    const formErrorMessageStyleProps = useFormErrorMessageStyle({});

    if (!formControl.isInvalid) {
        return null;
    }

    const IconTag = Icon || WarningIcon;

    return (
        <Flex
            ref={ref}
            id={formControl.id ? `${formControl.id}-error-message` : null}
            {...formErrorMessageStyleProps}
            {...props}
        >
            <IconTag aria-hidden />
            <Text lineHeight="normal" ml={2}>
                {children}
            </Text>
        </Flex>
    );
});
