import * as React from 'react';
import { BoxProps } from '../Box/types';
import { IInput } from '../Input/types';

export interface IInputGroup {
    size?: IInput['size'];
    children: React.ReactNodeArray;

    isInline?: boolean;
}

export type InputGroupProps = IInputGroup & BoxProps;
