import * as React from 'react';
import { BoxProps } from '../Box/types';

type ILabelProps = {
    isInvalid?: boolean;
    /**
     * This prop is read from the `FormControl` context but can be passed as well.
     * If passed, it'll override the context and give the `label` look disabled
     */
    isDisabled?: boolean;
    children: React.ReactNode;
};

export type FormLabelProps = ILabelProps & BoxProps & React.LabelHTMLAttributes<any>;
