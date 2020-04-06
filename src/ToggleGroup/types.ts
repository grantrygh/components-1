import * as React from 'react';
import { BoxProps } from '../Box/types';
import { ButtonProps } from '../Button/types';
import { Omit } from '../common-types';
import { IRadio } from '../Radio/types';

export interface IToggleGroup {
    name?: IRadio['name'];
    children?: React.ReactElement[];
    defaultValue?: IRadio['value'];
    value?: IRadio['value'];
    onChange?: (value: IRadio['value']) => void;
    isInline?: boolean;
}

export type ToggleGroupProps = Omit<BoxProps, 'onChange'> & IToggleGroup;

export type ToggleButtonProps = ButtonProps & { isChecked?: boolean; value?: any };
