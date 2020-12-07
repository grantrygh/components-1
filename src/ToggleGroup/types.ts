import * as React from 'react';
import { BoxProps } from '../Box/types';
import { ButtonProps } from '../Button/types';
import { Omit } from '../common-types';
import { FormFieldProps } from '../Form/types';
import { IFormControl } from '../FormControl/types';
import { IRadio } from '../Radio/types';

export interface IToggleGroup {
    name?: IRadio['name'];
    children?: React.ReactElement[];
    defaultValue?: IRadio['value'];
    value?: IRadio['value'];
    onChange?: (value: IRadio['value']) => void;
    isInline?: boolean;

    // 100% width and toggle buttons flex
    isFullWidth?: boolean;
}

export type ToggleGroupProps = Omit<BoxProps, 'onChange'> & IToggleGroup & IFormControl & FormFieldProps;

export type ToggleButtonProps = ButtonProps & { isChecked?: boolean; value?: any };
