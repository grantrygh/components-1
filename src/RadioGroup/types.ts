import * as React from 'react';
import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';
import { IRadio } from '../Radio/types';

export interface IRadioGroup {
    id?: string;
    name?: string;
    children?: React.ReactNodeArray;
    defaultValue?: IRadio['value'];
    value?: IRadio['value'];
    variantColor?: IRadio['variantColor'];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: IRadio['value']) => void;
    spacing?: BoxProps['margin'];
    isInline?: boolean;
}

export type RadioGroupProps = IRadioGroup & Omit<BoxProps, 'onChange'>;
