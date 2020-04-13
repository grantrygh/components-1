/**
 * FormControl provides context such as `isInvalid`, `isRequired`, `isDisabled` to it's children.
 */

import React, { createContext, forwardRef, useContext } from 'react';
import { Box } from '../Box';
import { FormControlProps } from './types';

const FormControlContext = createContext(null);

export const useFormControlContext = () => {
    const context = useContext(FormControlContext);
    return context;
};

export const useFormControl = props => {
    const context = useFormControlContext();
    if (!context) {
        return props;
    }
    const keys = Object.keys(context);
    return keys.reduce((acc, prop) => {
        /** Giving precedence to `props` over `context` */
        acc[prop] = props[prop];

        if (context) {
            if (props[prop] == null) {
                acc[prop] = context[prop];
            }
        }

        return acc;
    }, {});
};

export const FormControl = forwardRef(
    ({ isInvalid, isRequired, isDisabled, isReadOnly, ...rest }: FormControlProps, ref) => {
        const context = {
            isRequired,
            isDisabled,
            isInvalid,
            isReadOnly,
        };

        return (
            <FormControlContext.Provider value={context}>
                <Box role="group" ref={ref} {...rest} />
            </FormControlContext.Provider>
        );
    }
);
