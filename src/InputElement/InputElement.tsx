import React, { forwardRef } from 'react';
import { Box } from '../Box';
import useInputElementStyle from './styles';
import { InputElementProps, InputLeftElementProps, InputRightElementProps } from './types';

const InputElement = forwardRef(
    ({ size, children, placement, disablePointerEvents = false, ...props }: InputElementProps, ref) => {
        const inputElementStyleProps = useInputElementStyle({
            placement,
            disablePointerEvents,
            size,
        });

        return (
            <Box ref={ref} {...inputElementStyleProps} {...props}>
                {children}
            </Box>
        );
    }
);

const InputLeftElement = forwardRef((props: InputLeftElementProps, ref) => (
    <InputElement ref={ref} placement="left" {...props} />
));

const InputRightElement = forwardRef((props: InputRightElementProps, ref) => (
    <InputElement ref={ref} placement="right" {...props} />
));

export { InputElement, InputLeftElement, InputRightElement };
