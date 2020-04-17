import * as React from 'react';
import { BoxProps } from '../Box/types';
import { FormControlProps } from '../FormControl/types';
import { IInput } from '../Input/types';

export interface IInputGroup {
    size?: IInput['size'];
    children: React.ReactNode;
    isInline?: boolean;

    name?: string;
}

export type InputGroupProps = IInputGroup & FormControlProps & BoxProps;
