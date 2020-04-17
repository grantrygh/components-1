import * as React from 'react';
import { BoxProps } from '../Box/types';

export interface IFormControl {
    /**
     * Content of the form control.
     */
    children?: React.ReactNode;
    /**
     * If `true` set the form control to the invalid state.
     */
    isInvalid?: boolean;
    /**
     * If `true` set the form control to be required.
     */
    isRequired?: boolean;
    /**
     * If `true` set the form control to the disabled state.
     */
    isDisabled?: boolean;

    isReadOnly?: boolean;

    /**
     * Helper text to be display if FormControl contains <FormHelperText> child
     */
    helperText?: string;
    /**
     * Error message to be displayed if isInvalid is true and contains <FormErrorMessage> child
     */
    error?: string;
    /**
     * Form input label to be display if FormControl contains <FormLabel> child
     */
    label?: string;
}

export type FormControlProps = IFormControl & BoxProps;
