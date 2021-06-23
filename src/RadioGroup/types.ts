import * as React from 'react';
import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';
import { FormFieldProps } from '../Form/types';
import { IFormControl } from '../FormControl/types';
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

    // additional content to be rendered outside of a radio item. allows for data between radio items for example
    // based on item index, pass object such as content={{0: <Box />, 1: <Text />}}
    content?: Object;

    // don't update the form field value.
    // Used in cases where just the functionality is needed, or handled externally, rather than storing value in the form.
    skipFormChange?: boolean;
}

export type RadioGroupProps = IRadioGroup & IFormControl & FormFieldProps & Omit<BoxProps, 'onChange'>;
