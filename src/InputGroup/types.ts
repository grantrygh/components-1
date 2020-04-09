import * as React from 'react';
import { BoxProps } from '../Box/types';
import { FormControlProps } from '../FormControl/types';
import { IInput } from '../Input/types';

export interface IInputGroup {
    size?: IInput['size'];
    children: React.ReactNodeArray;
    isInline?: boolean;

    // for form control

    // input label for accessibility
    label?: string;
    // error message to be displayed when the InputGroup has isInvalid true
    error?: string;
    // show a helper text below the Input
    helperText?: string;
}

export type InputGroupProps = IInputGroup & FormControlProps & BoxProps;
