import * as React from 'react';
import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';
import { IRadio } from '../Radio/types';

export interface IRadioGroup {
    id?: string;
    // form submit value will use radio group name as the key
    name?: string;

    children?: React.ReactNodeArray;
    defaultValue?: IRadio['value'];
    value?: IRadio['value'];
    variantColor?: IRadio['variantColor'];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: IRadio['value']) => void;
    isInline?: boolean;
}

export type RadioGroupProps = IRadioGroup & Omit<BoxProps, 'onChange'>;
