import * as React from 'react';
import { Omit } from '../common-types';
import { FlexProps } from '../Flex/types';
import { UseNumberInputProps } from '../hooks/useNumberInput/types';
import { InputProps } from '../Input/types';
import { PseudoBoxProps } from '../PseudoBox';

type InputAttributes = React.InputHTMLAttributes<HTMLInputElement>;

export interface INumberInput extends UseNumberInputProps {
    isFullWidth?: boolean;
    size?: InputProps['size'];
}

export type NumberInputProps = INumberInput &
    Omit<FlexProps, 'onChange' | 'ref' | 'size'> &
    React.RefAttributes<HTMLInputElement>;

export type NumberInputFieldProps = InputProps;
export type NumberInputStepperProps = FlexProps;
export type NumberIncrementStepperProps = PseudoBoxProps;
export type NumberDecrementStepperProps = PseudoBoxProps;

interface INumberContextProps {
    size?: INumberInput['size'];
    isDisabled?: boolean;
    incrementStepper?: any;
    decrementStepper?: any;
    input?: any;
}

export type NumberInputContextProps = INumberContextProps;
